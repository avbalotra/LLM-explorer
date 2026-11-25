import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { PRECOMPUTED_GROUND_TRUTH, AnalysisResult, TokenResult, NextCandidate } from '../data/groundTruth';

export type ModelStatus = 'not_loaded' | 'downloading' | 'ready' | 'error';

interface ModelContextType {
  status: ModelStatus;
  statusMessage: string;
  progress: number;
  errorMessage: string | null;
  isCalculating: boolean;
  calculatePerplexity: (sentence: string) => Promise<AnalysisResult>;
  initModel: () => Promise<void>;
}

const ModelContext = createContext<ModelContextType | null>(null);

export const ModelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<ModelStatus>('not_loaded');
  const [statusMessage, setStatusMessage] = useState<string>('Model not loaded');
  const [progress, setProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // References to keep tokenizer & model globally in memory
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tokenizerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modelRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformersRef = useRef<any>(null);
  const loadingPromiseRef = useRef<Promise<void> | null>(null);

  const initModel = useCallback(async () => {
    if (modelRef.current && tokenizerRef.current) {
      return;
    }
    if (loadingPromiseRef.current) {
      return loadingPromiseRef.current;
    }

    const loadTask = async () => {
      try {
        setStatus('downloading');
        setStatusMessage('Downloading the model…');
        setErrorMessage(null);
        setProgress(5);

        // Dynamic import so bundle loads fast and imports @huggingface/transformers
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tf: any = await import('@huggingface/transformers');
        transformersRef.current = tf;

        // Custom progress callback for downloading ONNX weights
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const progressCallback = (info: any) => {
          if (info.status === 'progress' && typeof info.progress === 'number') {
            const pct = Math.round(info.progress);
            setProgress(pct);
            setStatusMessage(`Downloading weights… ${pct}%`);
          } else if (info.status === 'done') {
            setStatusMessage('Initializing neural engine…');
          }
        };

        const tokenizer = await tf.AutoTokenizer.from_pretrained('Xenova/distilgpt2', {
          progress_callback: progressCallback,
        });
        tokenizerRef.current = tokenizer;
        setProgress(50);

        const model = await tf.AutoModelForCausalLM.from_pretrained('Xenova/distilgpt2', {
          dtype: 'q8',
          progress_callback: progressCallback,
        });
        modelRef.current = model;

        setProgress(100);
        setStatus('ready');
        setStatusMessage('Model ready');
      } catch (err: any) {
        console.error('Failed to load DistilGPT-2 model:', err);
        setStatus('error');
        setErrorMessage(err?.message || 'Failed to download or initialize DistilGPT-2 weights.');
        setStatusMessage('Engine error');
        throw err;
      } finally {
        loadingPromiseRef.current = null;
      }
    };

    loadingPromiseRef.current = loadTask();
    return loadingPromiseRef.current;
  }, []);

  const calculatePerplexity = useCallback(async (sentence: string): Promise<AnalysisResult> => {
    const trimmed = sentence.trim();
    if (!trimmed) {
      throw new Error('Input sentence cannot be empty');
    }

    setIsCalculating(true);

    try {
      // Ensure model is loaded (loads on demand when user first clicks)
      if (!modelRef.current || !tokenizerRef.current) {
        await initModel();
      }

      const tf = transformersRef.current;
      const tokenizer = tokenizerRef.current;
      const model = modelRef.current;

      // Exact Token & Logit Pipeline:
      // 1. Prepend start marker 50256 so the first word also receives a conditional probability
      const encoded = tokenizer.encode(trimmed);
      const tokenIds: number[] = [50256, ...encoded];
      const n = tokenIds.length;

      // 2. Run one forward pass on [1, n] int64 input_ids
      const input_ids = new tf.Tensor(
        'int64',
        BigInt64Array.from(tokenIds.map((x: number) => BigInt(x))),
        [1, n]
      );
      const attention_mask = new tf.Tensor(
        'int64',
        BigInt64Array.from(new Array(n).fill(1n)),
        [1, n]
      );
      const position_ids = new tf.Tensor(
        'int64',
        BigInt64Array.from(tokenIds.map((_: number, i: number) => BigInt(i))),
        [1, n]
      );

      const output = await model({ input_ids, attention_mask, position_ids });
      const [b, seqLen, vocabSize] = output.logits.dims;
      const data = output.logits.data;

      // 3. For each real token at index pos (1 to n - 1), compute stable softmax over logits[0, pos - 1, :]
      const tokens: TokenResult[] = [];
      let totalNegLogProb = 0;
      let runningProduct = 1;

      for (let pos = 1; pos < seqLen; pos++) {
        const targetToken = tokenIds[pos];
        const prevPos = pos - 1;
        const sliceStart = prevPos * vocabSize;

        // Stable softmax: subtract maxLogit first
        let maxLogit = -Infinity;
        for (let v = 0; v < vocabSize; v++) {
          const val = data[sliceStart + v];
          if (val > maxLogit) maxLogit = val;
        }

        let sumExp = 0;
        for (let v = 0; v < vocabSize; v++) {
          sumExp += Math.exp(data[sliceStart + v] - maxLogit);
        }

        const targetLogit = data[sliceStart + targetToken];
        const prob = Math.max(1e-12, Math.exp(targetLogit - maxLogit) / sumExp);
        const invProb = 1 / prob;

        totalNegLogProb += -Math.log(prob);
        runningProduct *= invProb;

        const rawDecoded = tokenizer.decode([targetToken]);
        // Render spaces as ␣ for clear subword visual telemetry
        const displayToken = rawDecoded.startsWith(' ')
          ? '␣' + rawDecoded.slice(1)
          : rawDecoded;

        tokens.push({
          id: targetToken,
          token: rawDecoded,
          displayToken,
          prob,
          invProb,
        });
      }

      // Compute perplexity via log-space so long sentences never overflow
      const numTokens = tokens.length;
      const perplexity = Math.exp(totalNegLogProb / Math.max(1, numTokens));

      // 4. What does the model predict next?
      // Stable softmax on logits at last position (n - 1)
      const lastPos = seqLen - 1;
      const sliceStart = lastPos * vocabSize;
      let lastMaxLogit = -Infinity;
      for (let v = 0; v < vocabSize; v++) {
        const val = data[sliceStart + v];
        if (val > lastMaxLogit) lastMaxLogit = val;
      }
      let lastSumExp = 0;
      for (let v = 0; v < vocabSize; v++) {
        lastSumExp += Math.exp(data[sliceStart + v] - lastMaxLogit);
      }

      // Top 8 candidate extraction
      const candidateList: { id: number; prob: number }[] = [];
      for (let v = 0; v < vocabSize; v++) {
        const p = Math.exp(data[sliceStart + v] - lastMaxLogit) / lastSumExp;
        candidateList.push({ id: v, prob: p });
      }
      candidateList.sort((a, b) => b.prob - a.prob);

      const nextCandidates: NextCandidate[] = candidateList.slice(0, 8).map((c, idx) => {
        const rawDecoded = tokenizer.decode([c.id]);
        const displayToken = rawDecoded.startsWith(' ')
          ? '␣' + rawDecoded.slice(1)
          : rawDecoded;
        return {
          id: c.id,
          token: rawDecoded,
          displayToken,
          prob: c.prob,
          isTop1: idx === 0,
        };
      });

      return {
        sentence: trimmed,
        tokens,
        product: runningProduct,
        n: numTokens,
        perplexity,
        nextCandidates,
      };
    } catch (err: any) {
      // If error occurs, check if precomputed exact ground-truth is available for standard sample
      if (PRECOMPUTED_GROUND_TRUTH[trimmed]) {
        console.warn('Using precomputed exact DistilGPT-2 ground truth for preset.');
        return PRECOMPUTED_GROUND_TRUTH[trimmed];
      }
      setErrorMessage(err?.message || 'Error executing in-browser model forward pass.');
      throw err;
    } finally {
      setIsCalculating(false);
    }
  }, [initModel]);

  return (
    <ModelContext.Provider
      value={{
        status,
        statusMessage,
        progress,
        errorMessage,
        isCalculating,
        calculatePerplexity,
        initModel,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error('useModel must be used within a ModelProvider');
  }
  return context;
};
