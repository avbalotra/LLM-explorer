import { AutoTokenizer, AutoModelForCausalLM, Tensor } from '@huggingface/transformers';

async function run() {
  console.log('Loading tokenizer & model...');
  const tokenizer = await AutoTokenizer.from_pretrained('Xenova/distilgpt2');
  const model = await AutoModelForCausalLM.from_pretrained('Xenova/distilgpt2', { dtype: 'q8' });
  console.log('Model loaded.');

  const sentences = [
    'I love Python',
    'Python love I',
    'The capital of France is Paris',
    'The capital of France is Banana'
  ];

  for (const text of sentences) {
    const encoded = tokenizer.encode(text);
    const tokenIds = [50256, ...encoded];
    const n = tokenIds.length;
    const input_ids = new Tensor('int64', BigInt64Array.from(tokenIds.map(x => BigInt(x))), [1, n]);
    const attention_mask = new Tensor('int64', BigInt64Array.from(new Array(n).fill(1n)), [1, n]);
    const position_ids = new Tensor('int64', BigInt64Array.from(tokenIds.map((_, i) => BigInt(i))), [1, n]);
    const output = await model({ input_ids, attention_mask, position_ids });
    const [b, seqLen, vocabSize] = output.logits.dims;
    const data = output.logits.data;

    let totalNegLogProb = 0;
    const tokensResult = [];

    for (let pos = 1; pos < seqLen; pos++) {
      const targetToken = tokenIds[pos];
      const prevPos = pos - 1;
      const sliceStart = prevPos * vocabSize;
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
      const prob = Math.exp(targetLogit - maxLogit) / sumExp;
      totalNegLogProb += -Math.log(prob);
      const decoded = tokenizer.decode([targetToken]);
      tokensResult.push({
        id: targetToken,
        token: decoded,
        prob,
        invProb: 1 / prob
      });
    }

    const ppl = Math.exp(totalNegLogProb / tokensResult.length);
    console.log(`\nSentence: "${text}" | PPL = ${ppl.toFixed(2)}`);
    tokensResult.forEach((t, i) => {
      console.log(`  #${i+1} [${t.id}] "${t.token}": P=${(t.prob*100).toFixed(3)}%, 1/P=${t.invProb.toFixed(2)}`);
    });

    // Top 8 predictions for next token after sequence
    const lastPos = seqLen - 1;
    const sliceStart = lastPos * vocabSize;
    let maxLogit = -Infinity;
    for (let v = 0; v < vocabSize; v++) {
      const val = data[sliceStart + v];
      if (val > maxLogit) maxLogit = val;
    }
    let sumExp = 0;
    for (let v = 0; v < vocabSize; v++) {
      sumExp += Math.exp(data[sliceStart + v] - maxLogit);
    }
    // Pick top 8
    const candidates = [];
    for (let v = 0; v < vocabSize; v++) {
      const p = Math.exp(data[sliceStart + v] - maxLogit) / sumExp;
      candidates.push({ id: v, prob: p });
    }
    candidates.sort((a, b) => b.prob - a.prob);
    const top8 = candidates.slice(0, 8).map(c => ({
      id: c.id,
      token: tokenizer.decode([c.id]),
      prob: c.prob
    }));
    console.log('  Top 8 Next Predictions:');
    top8.forEach((c, idx) => {
      console.log(`    #${idx+1} "${c.token}": ${(c.prob*100).toFixed(2)}%`);
    });
  }
}

run().catch(console.error);
