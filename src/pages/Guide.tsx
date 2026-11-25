import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Sparkles, ArrowRight, Dices, HelpCircle, CheckCircle2 } from 'lucide-react';

export const Guide: React.FC = () => {
  // Coin flip state (bias from 0.5 to 0.99)
  const [coinBias, setCoinBias] = useState<number>(0.5);

  // Compute Shannon entropy and perplexity for 2-outcome coin
  const pHeads = coinBias;
  const pTails = 1 - coinBias;
  const coinEntropy =
    pHeads === 0 || pTails === 0
      ? 0
      : -(pHeads * Math.log2(pHeads) + pTails * Math.log2(pTails));
  const coinPerplexity = Math.pow(2, coinEntropy);

  // 8-sided fair die (uniform 1/8)
  const dieOutcomes = 8;
  const dieProb = 1 / dieOutcomes;
  const dieEntropy = Math.log2(dieOutcomes); // 3.0 bits
  const diePerplexity = Math.pow(2, dieEntropy); // exactly 8.0

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="space-y-1.5 border-b border-[#E2D9C8]/80 dark:border-[#38312A]/80 pb-4">
        <div className="flex items-center gap-2">
          <span className="mono-tabular text-xs font-semibold px-2 py-0.5 rounded-full border border-[#C25934]/30 bg-[#C25934]/10 text-[#C25934] dark:text-[#E08A5E]">
            THEORY // MODULE 04
          </span>
          <span className="text-xs text-[#6E655A] dark:text-[#A89D8F] mono-tabular">
            FIRST PRINCIPLES & BRANCHING FACTOR
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#231F1B] dark:text-[#F5EFE6]">
          Visual Intuition & First Principles
        </h1>
        <p className="text-sm text-[#6E655A] dark:text-[#A89D8F] max-w-3xl leading-relaxed">
          What is Perplexity really measuring? Strip away the mathematical jargon: Perplexity is the <em>effective branching factor</em> of a language model.
        </p>
      </div>

      {/* The Core Intuition Card */}
      <div className="rounded-2xl bg-[#FBF8F2]/75 dark:bg-[#221E1A]/75 backdrop-blur-2xl border border-[#E2D9C8] dark:border-[#38312A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_16px_36px_rgba(68,54,39,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_20px_40px_rgba(0,0,0,0.45)] p-5 sm:p-7 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C25934] dark:text-[#E08A5E] mono-tabular">
          <HelpCircle className="w-4 h-4" />
          <span>The Branching Factor Definition</span>
        </div>

        <p className="text-sm text-[#231F1B] dark:text-[#F5EFE6] leading-relaxed">
          If an LLM has a vocabulary of <strong>50,257 tokens</strong>, but achieves a Perplexity of <strong>4.0</strong> on a sentence, it means the model was, on average, guessing between just <strong>4 equally likely words</strong> at each step—not 50,000!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-[#3D7A5C]/30 bg-[#3D7A5C]/5 text-xs space-y-1.5">
            <span className="font-bold text-[#3D7A5C] dark:text-[#4ADE80] uppercase tracking-wider mono-tabular block">
              Low Perplexity (e.g. PPL ≈ 2–10)
            </span>
            <p className="text-[#231F1B] dark:text-[#F5EFE6] leading-relaxed">
              Fluent, predictable sequence. The model assigns high probability to the ground-truth tokens. The decision tree has very few viable branches.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#C94A4A]/30 bg-[#C94A4A]/5 text-xs space-y-1.5">
            <span className="font-bold text-[#C94A4A] dark:text-[#F87171] uppercase tracking-wider mono-tabular block">
              High Perplexity (e.g. PPL ≈ 500+)
            </span>
            <p className="text-[#231F1B] dark:text-[#F5EFE6] leading-relaxed">
              Confusing, ungrammatical, or bizarre sequence. The model is forced to choose among hundreds of candidates with low confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Probability Distribution Playground */}
      <div className="rounded-2xl bg-[#FBF8F2]/75 dark:bg-[#221E1A]/75 backdrop-blur-2xl border border-[#E2D9C8] dark:border-[#38312A] shadow-xs p-5 sm:p-7 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2D9C8]/80 dark:border-[#38312A]/80 pb-3">
          <div className="flex items-center gap-2">
            <Dices className="w-4 h-4 text-[#C25934] dark:text-[#E08A5E]" />
            <h3 className="text-sm font-semibold tracking-wide uppercase text-[#231F1B] dark:text-[#F5EFE6]">
              Interactive Distribution Playground: Coin vs 8-Sided Die
            </h3>
          </div>
          <span className="mono-tabular text-[10px] text-[#6E655A] dark:text-[#A89D8F]">
            PPL = 2^(Entropy)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Experiment 1: 2-Choice Coin Flip */}
          <div className="p-4 rounded-xl border border-[#E2D9C8] dark:border-[#38312A] bg-[#F5F0E6]/50 dark:bg-[#161310]/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#231F1B] dark:text-[#F5EFE6]">
                Case A: Two-Outcome Variable (Coin Flip)
              </span>
              <span className="text-xs font-mono font-bold text-[#C25934] dark:text-[#E08A5E]">
                PPL = {coinPerplexity.toFixed(2)}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs mono-tabular text-[#6E655A] dark:text-[#A89D8F]">
                <span>Heads Bias: {(coinBias * 100).toFixed(0)}%</span>
                <span>Tails: {((1 - coinBias) * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="0.99"
                step="0.01"
                value={coinBias}
                onChange={(e) => setCoinBias(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Probability Bars */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span>Heads (P = {coinBias.toFixed(2)})</span>
                <div className="w-32 h-2.5 bg-[#E2D9C8] dark:bg-[#38312A] rounded-full overflow-hidden">
                  <div className="h-full bg-[#3D7A5C] rounded-full" style={{ width: `${coinBias * 100}%` }} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Tails (P = {(1 - coinBias).toFixed(2)})</span>
                <div className="w-32 h-2.5 bg-[#E2D9C8] dark:bg-[#38312A] rounded-full overflow-hidden">
                  <div className="h-full bg-[#C8832A] rounded-full" style={{ width: `${(1 - coinBias) * 100}%` }} />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#6E655A] dark:text-[#A89D8F] leading-relaxed">
              When the coin is fair (50/50), Perplexity equals exactly <strong>2.00</strong> (2 equally likely options). As one outcome becomes certain, Perplexity drops toward 1.0.
            </p>
          </div>

          {/* Experiment 2: Fair 8-Sided Die */}
          <div className="p-4 rounded-xl border border-[#E2D9C8] dark:border-[#38312A] bg-[#F5F0E6]/50 dark:bg-[#161310]/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#231F1B] dark:text-[#F5EFE6]">
                Case B: Eight-Outcome Uniform Die (1/8 each)
              </span>
              <span className="text-xs font-mono font-bold text-[#3D7A5C] dark:text-[#4ADE80]">
                PPL = {diePerplexity.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 py-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="p-2 rounded-lg border border-[#E2D9C8] dark:border-[#38312A] bg-[#FBF8F2] dark:bg-[#221E1A] text-center font-mono text-[11px]"
                >
                  <div className="text-[#6E655A] dark:text-[#A89D8F] text-[9px]">#{i + 1}</div>
                  <div className="font-bold text-[#231F1B] dark:text-[#F5EFE6]">0.125</div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#6E655A] dark:text-[#A89D8F] leading-relaxed">
              When all 8 options have equal probability 1/8, each 1/P = 8. The product is 8⁸, and taking the 8-th root yields exactly <strong>Perplexity = 8.00</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Launch Cards linking to Live Explorer and Sandbox */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NavLink
          to="/"
          className="p-5 rounded-2xl bg-[#FBF8F2]/75 dark:bg-[#221E1A]/75 backdrop-blur-2xl border border-[#E2D9C8] dark:border-[#38312A] hover:border-[#C25934] transition-all duration-200 group flex items-center justify-between shadow-xs"
        >
          <div>
            <div className="text-xs font-bold text-[#C25934] dark:text-[#E08A5E] uppercase tracking-wider mono-tabular">
              Launch Core Engine
            </div>
            <div className="text-sm font-bold text-[#231F1B] dark:text-[#F5EFE6] mt-1">
              Test Real Sentences on DistilGPT-2
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-[#6E655A] group-hover:text-[#C25934] group-hover:translate-x-1 transition-all" />
        </NavLink>

        <NavLink
          to="/sandbox"
          className="p-5 rounded-2xl bg-[#FBF8F2]/75 dark:bg-[#221E1A]/75 backdrop-blur-2xl border border-[#E2D9C8] dark:border-[#38312A] hover:border-[#C25934] transition-all duration-200 group flex items-center justify-between shadow-xs"
        >
          <div>
            <div className="text-xs font-bold text-[#3D7A5C] dark:text-[#4ADE80] uppercase tracking-wider mono-tabular">
              Launch Sandbox
            </div>
            <div className="text-sm font-bold text-[#231F1B] dark:text-[#F5EFE6] mt-1">
              Simulate Probabilities By Hand
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-[#6E655A] group-hover:text-[#3D7A5C] group-hover:translate-x-1 transition-all" />
        </NavLink>
      </div>
    </div>
  );
};
