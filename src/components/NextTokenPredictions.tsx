import React from 'react';
import { Sparkles, Trophy } from 'lucide-react';
import { NextCandidate } from '../data/groundTruth';

interface NextTokenPredictionsProps {
  candidates: NextCandidate[];
}

export const NextTokenPredictions: React.FC<NextTokenPredictionsProps> = ({ candidates }) => {
  if (!candidates || candidates.length === 0) return null;

  return (
    <div className="rounded-2xl transition-all duration-300 bg-[#FBF8F2]/75 dark:bg-[#221E1A]/75 backdrop-blur-2xl border border-[#E2D9C8] dark:border-[#38312A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_16px_36px_rgba(68,54,39,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_20px_40px_rgba(0,0,0,0.45)] p-5 sm:p-7 space-y-5">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2D9C8]/80 dark:border-[#38312A]/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-[#C25934]/15 dark:bg-[#E08A5E]/15 text-[#C25934] dark:text-[#E08A5E] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-[#231F1B] dark:text-[#F5EFE6]">
              Card 3 – What Does the Model Predict Next?
            </h3>
            <p className="text-[11px] mono-tabular text-[#6E655A] dark:text-[#A89D8F]">
              Stable softmax distribution over vocabulary at sequence termination (position n − 1)
            </p>
          </div>
        </div>

        <span className="mono-tabular text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[#3D7A5C]/30 bg-[#3D7A5C]/10 text-[#3D7A5C] dark:text-[#4ADE80]">
          TOP 8 CANDIDATES
        </span>
      </div>

      {/* Progress Bars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {candidates.map((cand, idx) => {
          const pct = cand.prob * 100;
          const pctFormatted = pct >= 1 ? pct.toFixed(1) + '%' : pct.toFixed(2) + '%';
          const isTop1 = cand.isTop1 || idx === 0;

          return (
            <div
              key={cand.id}
              className={`p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                isTop1
                  ? 'border-[#C25934]/60 bg-[#C25934]/5 dark:border-[#E08A5E]/60 dark:bg-[#E08A5E]/5 shadow-xs ring-1 ring-[#C25934]/20 dark:ring-[#E08A5E]/20'
                  : 'border-[#E2D9C8]/80 bg-[#F5F0E6]/50 dark:border-[#38312A]/80 dark:bg-[#161310]/50'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mono-tabular ${
                      isTop1
                        ? 'bg-[#C25934] text-white dark:bg-[#E08A5E] dark:text-[#161310]'
                        : 'bg-[#E2D9C8] text-[#6E655A] dark:bg-[#38312A] dark:text-[#A89D8F]'
                    }`}
                  >
                    {idx + 1}
                  </span>

                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded border border-[#E2D9C8] dark:border-[#4A3F35] bg-[#FBF8F2] dark:bg-[#221E1A] text-[#231F1B] dark:text-[#F5EFE6]">
                    {cand.displayToken}
                  </span>

                  {isTop1 && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#C25934] dark:text-[#E08A5E] mono-tabular">
                      <Trophy className="w-3 h-3" />
                      TOP PICK
                    </span>
                  )}
                </div>

                <span className={`font-mono font-bold text-xs ${
                  isTop1 ? 'text-[#C25934] dark:text-[#E08A5E]' : 'text-[#231F1B] dark:text-[#F5EFE6]'
                }`}>
                  {pctFormatted}
                </span>
              </div>

              {/* Horizontal Bar */}
              <div className="w-full h-2 bg-[#E2D9C8]/60 dark:bg-[#38312A] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isTop1
                      ? 'bg-gradient-to-r from-[#C25934] to-[#E08A5E]'
                      : 'bg-[#6E655A]/50 dark:bg-[#A89D8F]/50'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(3, pct))}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
