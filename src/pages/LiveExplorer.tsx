import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useModel } from '../context/ModelContext';
import { PRECOMPUTED_GROUND_TRUTH, AnalysisResult } from '../data/groundTruth';
import { TokenBreakdownCard } from '../components/TokenBreakdownCard';
import { NextTokenPredictions } from '../components/NextTokenPredictions';

export const LiveExplorer: React.FC = () => {
  const { calculatePerplexity, isCalculating, status, statusMessage, errorMessage } = useModel();
  const [inputSentence, setInputSentence] = useState('I love Python');
  const [analysis, setAnalysis] = useState<AnalysisResult>(PRECOMPUTED_GROUND_TRUTH['I love Python']);
  const [localError, setLocalError] = useState<string | null>(null);

  const sampleChips = [
    'I love Python',
    'Python love I',
    'The capital of France is Paris'
  ];

  const handleAnalyze = async (textToAnalyze?: string) => {
    const text = (textToAnalyze ?? inputSentence).trim();
    if (!text) return;
    setLocalError(null);

    try {
      const result = await calculatePerplexity(text);
      setAnalysis(result);
    } catch (err: any) {
      console.error('Calculation failed:', err);
      // If precomputed exists, fallback cleanly
      if (PRECOMPUTED_GROUND_TRUTH[text]) {
        setAnalysis(PRECOMPUTED_GROUND_TRUTH[text]);
      } else {
        setLocalError(err?.message || 'Failed to analyze sentence with model.');
      }
    }
  };

  const handleSelectSample = (sample: string) => {
    setInputSentence(sample);
    handleAnalyze(sample);
  };

  // Run on mount if analysis is not set
  useEffect(() => {
    if (!analysis && PRECOMPUTED_GROUND_TRUTH['I love Python']) {
      setAnalysis(PRECOMPUTED_GROUND_TRUTH['I love Python']);
    }
  }, [analysis]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Editorial Page Header */}
      <div className="space-y-1.5 border-b border-[#E2D9C8]/80 dark:border-[#38312A]/80 pb-4">
        <div className="flex items-center gap-2">
          <span className="mono-tabular text-xs font-semibold px-2 py-0.5 rounded-full border border-[#C25934]/30 bg-[#C25934]/10 text-[#C25934] dark:text-[#E08A5E]">
            CORE LAB // MODULE 01
          </span>
          <span className="text-xs text-[#6E655A] dark:text-[#A89D8F] mono-tabular">
            EXACT IN-BROWSER DISTILGPT-2 (Q8) PIPELINE
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#231F1B] dark:text-[#F5EFE6]">
          Live Perplexity Explorer
        </h1>
        <p className="text-sm text-[#6E655A] dark:text-[#A89D8F] max-w-3xl leading-relaxed">
          Type any sequence to compute exact conditional probabilities <span className="font-mono text-xs font-semibold text-[#231F1B] dark:text-[#F5EFE6]">P(tᵢ | t₍&lt;ᵢ₎)</span> via in-browser forward inference.
        </p>
      </div>

      {/* Error Banner */}
      {(errorMessage || localError) && (
        <div className="p-4 rounded-xl border border-[#C94A4A]/40 bg-[#C94A4A]/10 text-[#C94A4A] dark:text-[#F87171] text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <div>
            <span className="font-semibold">Neural Inference Note: </span>
            {localError || errorMessage}
          </div>
        </div>
      )}

      {/* Card 1 – Type a sentence */}
      <div className="rounded-2xl transition-all duration-300 bg-[#FBF8F2]/75 dark:bg-[#221E1A]/75 backdrop-blur-2xl border border-[#E2D9C8] dark:border-[#38312A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_16px_36px_rgba(68,54,39,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_20px_40px_rgba(0,0,0,0.45)] p-5 sm:p-7 space-y-5">
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider uppercase text-[#C25934] dark:text-[#E08A5E] mono-tabular">
              Card 1 – Type a Sentence
            </span>
          </div>

          {/* Sample Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#6E655A] dark:text-[#A89D8F] mono-tabular text-[11px] mr-1">
              Samples:
            </span>
            {sampleChips.map(chip => (
              <button
                key={chip}
                onClick={() => handleSelectSample(chip)}
                className={`px-3 py-1 rounded-full border text-xs mono-tabular transition-all duration-150 ${
                  inputSentence === chip
                    ? 'border-[#C25934] bg-[#C25934]/10 text-[#C25934] dark:border-[#E08A5E] dark:text-[#E08A5E] font-medium'
                    : 'border-[#E2D9C8] bg-[#F5F0E6] text-[#6E655A] hover:border-[#C25934]/50 hover:text-[#231F1B] dark:border-[#38312A] dark:bg-[#161310] dark:text-[#A89D8F]'
                }`}
              >
                "{chip}"
              </button>
            ))}
          </div>
        </div>

        {/* Input & Action Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputSentence}
              onChange={(e) => setInputSentence(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAnalyze();
              }}
              placeholder="Type any sentence (e.g. I love Python)..."
              className="w-full px-4 py-3 rounded-xl border border-[#E2D9C8] dark:border-[#38312A] bg-[#F5F0E6]/90 dark:bg-[#161310]/90 text-[#231F1B] dark:text-[#F5EFE6] placeholder-[#6E655A]/50 focus:outline-none focus:ring-2 focus:ring-[#C25934]/40 font-mono text-sm shadow-inner transition-all"
            />
          </div>

          <button
            onClick={() => handleAnalyze()}
            disabled={isCalculating || !inputSentence.trim()}
            className="px-6 py-3 rounded-xl bg-[#C25934] hover:bg-[#A84725] text-white font-medium text-xs tracking-wide uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 cursor-pointer"
          >
            {isCalculating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Computing Logits…</span>
              </>
            ) : (
              <>
                <span>Calculate Perplexity</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center justify-between text-[11px] mono-tabular text-[#6E655A] dark:text-[#A89D8F] pt-1">
          <span>
            {status === 'not_loaded' && 'Model downloads on first click (~140MB Q8, cached in browser).'}
            {status === 'downloading' && `${statusMessage}`}
            {status === 'ready' && 'DistilGPT-2 engine online (82M params, Q8 quantized).'}
          </span>
          <span>Start token ID: 50256 (EOS)</span>
        </div>
      </div>

      {/* Card 2 – Probability of each token → perplexity */}
      {analysis && (
        <TokenBreakdownCard
          tokens={analysis.tokens}
          product={analysis.product}
          n={analysis.n}
          perplexity={analysis.perplexity}
          title="Card 2 – Probability of Each Token → Perplexity"
        />
      )}

      {/* Card 3 – What does the model predict next? */}
      {analysis && (
        <NextTokenPredictions candidates={analysis.nextCandidates} />
      )}
    </div>
  );
};
