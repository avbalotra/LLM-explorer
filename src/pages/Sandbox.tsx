import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Sliders, RotateCcw, AlertTriangle } from 'lucide-react';
import { TokenResult } from '../data/groundTruth';
import { TokenBreakdownCard } from '../components/TokenBreakdownCard';

interface EditableToken {
  id: string;
  name: string;
  prob: number;
}

export const Sandbox: React.FC = () => {
  // Preset definitions
  const presets = {
    python: [
      { id: '1', name: 'I', prob: 0.5 },
      { id: '2', name: 'love', prob: 0.8 },
      { id: '3', name: 'Python', prob: 0.2 },
    ],
    uniform: Array.from({ length: 8 }, (_, i) => ({
      id: String(i + 1),
      name: `token_${i + 1}`,
      prob: 0.125,
    })),
    surprise: [
      { id: '1', name: 'The', prob: 0.9 },
      { id: '2', name: 'quantum', prob: 0.9 },
      { id: '3', name: 'thrusters', prob: 0.9 },
      { id: '4', name: 'banana', prob: 0.01 },
    ],
  };

  const [tokens, setTokens] = useState<EditableToken[]>(presets.python);

  // Synchronized calculation of product, N, and perplexity
  const { tokenResults, product, n, perplexity } = useMemo(() => {
    const valid = tokens.filter(t => t.prob > 0);
    const count = valid.length;
    if (count === 0) {
      return { tokenResults: [], product: 0, n: 0, perplexity: 0 };
    }

    let prod = 1;
    let sumNegLog = 0;

    const results: TokenResult[] = valid.map((t, index) => {
      const inv = 1 / t.prob;
      prod *= inv;
      sumNegLog += -Math.log(t.prob);

      return {
        id: index + 1,
        token: t.name,
        displayToken: t.name.startsWith(' ') ? '␣' + t.name.slice(1) : t.name,
        prob: t.prob,
        invProb: inv,
      };
    });

    const ppl = Math.exp(sumNegLog / count);

    return {
      tokenResults: results,
      product: prod,
      n: count,
      perplexity: ppl,
    };
  }, [tokens]);

  const handleUpdateProb = (id: string, newProb: number) => {
    const clamped = Math.max(0.001, Math.min(1.0, parseFloat(newProb.toFixed(4))));
    setTokens(prev =>
      prev.map(t => (t.id === id ? { ...t, prob: clamped } : t))
    );
  };

  const handleUpdateName = (id: string, newName: string) => {
    setTokens(prev =>
      prev.map(t => (t.id === id ? { ...t, name: newName } : t))
    );
  };

  const handleAddToken = () => {
    const nextId = String(Date.now());
    setTokens(prev => [
      ...prev,
      { id: nextId, name: `token_${prev.length + 1}`, prob: 0.5 },
    ]);
  };

  const handleRemoveToken = (id: string) => {
    if (tokens.length <= 1) return;
    setTokens(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header with Explicit Simulated Badge */}
      <div className="space-y-1.5 border-b border-[#E2D9C8]/80 dark:border-[#38312A]/80 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mono-tabular text-xs font-semibold px-2 py-0.5 rounded-full border border-[#C8832A]/30 bg-[#C8832A]/10 text-[#C8832A] dark:text-[#FBBF24]">
            SANDBOX // MODULE 03
          </span>
          <span className="mono-tabular text-xs font-bold px-2 py-0.5 rounded-full border border-[#C94A4A]/40 bg-[#C94A4A]/10 text-[#C94A4A] dark:text-[#F87171] uppercase tracking-wider">
            Simulated, not from the model
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#231F1B] dark:text-[#F5EFE6]">
          Try It By Hand (Manual Override)
        </h1>
        <p className="text-sm text-[#6E655A] dark:text-[#A89D8F] max-w-3xl leading-relaxed">
          Manipulate token conditional probabilities manually via precision sliders to observe how mathematical perplexity responds in real time at 60 FPS.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="rounded-2xl bg-[#FBF8F2]/75 dark:bg-[#221E1A]/75 backdrop-blur-2xl border border-[#E2D9C8] dark:border-[#38312A] shadow-xs p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C25934] dark:text-[#E08A5E] mono-tabular">
            Canonical Mathematical Presets
          </span>
          <span className="text-[11px] mono-tabular text-[#6E655A] dark:text-[#A89D8F]">
            Instant Ground Truth Verification
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setTokens(presets.python)}
            className="px-3.5 py-2 rounded-xl border border-[#E2D9C8] dark:border-[#38312A] bg-[#F5F0E6] dark:bg-[#161310] hover:border-[#C25934] text-xs mono-tabular transition-all text-[#231F1B] dark:text-[#F5EFE6] flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span className="font-semibold">"I love Python"</span>
            <span className="text-[#6E655A] dark:text-[#A89D8F]">(0.5, 0.8, 0.2 → PPL = 2.32)</span>
          </button>

          <button
            onClick={() => setTokens(presets.uniform)}
            className="px-3.5 py-2 rounded-xl border border-[#E2D9C8] dark:border-[#38312A] bg-[#F5F0E6] dark:bg-[#161310] hover:border-[#C25934] text-xs mono-tabular transition-all text-[#231F1B] dark:text-[#F5EFE6] flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span className="font-semibold">"All 1/8"</span>
            <span className="text-[#6E655A] dark:text-[#A89D8F]">(8 tokens @ 0.125 → PPL = 8.00)</span>
          </button>

          <button
            onClick={() => setTokens(presets.surprise)}
            className="px-3.5 py-2 rounded-xl border border-[#E2D9C8] dark:border-[#38312A] bg-[#F5F0E6] dark:bg-[#161310] hover:border-[#C25934] text-xs mono-tabular transition-all text-[#231F1B] dark:text-[#F5EFE6] flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span className="font-semibold">"One Surprising Word"</span>
            <span className="text-[#6E655A] dark:text-[#A89D8F]">(0.9, 0.9, 0.9, 0.01)</span>
          </button>
        </div>
      </div>

      {/* Interactive Token Sliders Editor */}
      <div className="rounded-2xl bg-[#FBF8F2]/75 dark:bg-[#221E1A]/75 backdrop-blur-2xl border border-[#E2D9C8] dark:border-[#38312A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_16px_36px_rgba(68,54,39,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_20px_40px_rgba(0,0,0,0.45)] p-5 sm:p-7 space-y-4">
        
        <div className="flex items-center justify-between border-b border-[#E2D9C8]/80 dark:border-[#38312A]/80 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#C25934] dark:text-[#E08A5E]" />
            <h3 className="text-sm font-semibold tracking-wide uppercase text-[#231F1B] dark:text-[#F5EFE6]">
              Interactive Token Probability Rows
            </h3>
          </div>

          <button
            onClick={handleAddToken}
            className="px-3 py-1.5 rounded-lg bg-[#C25934] hover:bg-[#A84725] text-white text-xs font-medium mono-tabular flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Token</span>
          </button>
        </div>

        {/* Rows */}
        <div className="space-y-3">
          {tokens.map((tok, idx) => (
            <div
              key={tok.id}
              className="p-3.5 rounded-xl border border-[#E2D9C8]/80 dark:border-[#38312A]/80 bg-[#F5F0E6]/60 dark:bg-[#161310]/60 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 transition-all"
            >
              {/* Position indicator */}
              <span className="w-6 h-6 rounded-full bg-[#E2D9C8] dark:bg-[#38312A] text-[#6E655A] dark:text-[#A89D8F] flex items-center justify-center font-mono text-xs font-bold flex-shrink-0">
                #{idx + 1}
              </span>

              {/* Token Name input */}
              <input
                type="text"
                value={tok.name}
                onChange={(e) => handleUpdateName(tok.id, e.target.value)}
                className="w-32 px-3 py-1.5 rounded-lg border border-[#E2D9C8] dark:border-[#38312A] bg-[#FBF8F2] dark:bg-[#221E1A] font-mono font-semibold text-xs text-[#231F1B] dark:text-[#F5EFE6] focus:outline-none focus:ring-1 focus:ring-[#C25934]"
                placeholder="Token name"
              />

              {/* Slider (0.01 to 1.00) */}
              <div className="flex-1 flex items-center gap-3">
                <input
                  type="range"
                  min="0.01"
                  max="1.00"
                  step="0.005"
                  value={tok.prob}
                  onChange={(e) => handleUpdateProb(tok.id, parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Synchronized exact Number input */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[11px] text-[#6E655A] dark:text-[#A89D8F] mono-tabular">
                  P =
                </span>
                <input
                  type="number"
                  min="0.001"
                  max="1.000"
                  step="0.01"
                  value={tok.prob}
                  onChange={(e) => handleUpdateProb(tok.id, parseFloat(e.target.value) || 0.01)}
                  className="w-20 px-2 py-1 rounded-lg border border-[#E2D9C8] dark:border-[#38312A] bg-[#FBF8F2] dark:bg-[#221E1A] font-mono text-xs text-[#231F1B] dark:text-[#F5EFE6] text-right font-bold focus:outline-none focus:ring-1 focus:ring-[#C25934]"
                />

                <span className="text-xs font-mono text-[#6E655A] dark:text-[#A89D8F] w-16 text-right">
                  1/P: {(1 / tok.prob).toFixed(1)}
                </span>

                {/* Remove button */}
                <button
                  onClick={() => handleRemoveToken(tok.id)}
                  disabled={tokens.length <= 1}
                  className="p-1.5 rounded-lg text-[#6E655A] hover:text-[#C94A4A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title="Remove token"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Synchronized Exact Table + Three-Step Perplexity Breakdown Component */}
      <TokenBreakdownCard
        tokens={tokenResults}
        product={product}
        n={n}
        perplexity={perplexity}
        title="Live Mathematical Simulation Breakdown"
        badge="SIMULATED // MANUAL OVERRIDE"
      />
    </div>
  );
};
