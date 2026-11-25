import React from 'react';
import { TokenResult } from '../data/groundTruth';

interface TokenBreakdownCardProps {
  tokens: TokenResult[];
  product: number;
  n: number;
  perplexity: number;
  title?: string;
  badge?: string;
}

export const TokenBreakdownCard: React.FC<TokenBreakdownCardProps> = ({
  tokens,
  product,
  n,
  perplexity,
  title = "Probability of each token → perplexity",
  badge
}) => {
  // Format numbers cleanly
  const formatProb = (p: number) => {
    if (p < 0.0001) return p.toExponential(3);
    return (p * 100).toFixed(3) + '%';
  };

  const formatProbDecimal = (p: number) => {
    if (p < 0.0001) return p.toExponential(4);
    return p.toFixed(4);
  };

  const formatInvProb = (inv: number) => {
    if (inv >= 1000000) return inv.toExponential(2);
    if (inv >= 100) return inv.toFixed(1);
    return inv.toFixed(2);
  };

  const formatProduct = (prod: number) => {
    if (prod >= 10000000 || prod < 0.001) return prod.toExponential(3);
    return prod.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const formatPerplexity = (ppl: number) => {
    if (isNaN(ppl) || !isFinite(ppl)) return '—';
    if (ppl >= 100000) return ppl.toExponential(2);
    return ppl.toFixed(2);
  };

  // Color coding helper based on probability
  const getConfidenceStyle = (p: number) => {
    if (p >= 0.15) {
      return {
        barColor: 'bg-[#3D7A5C]',
        textColor: 'text-[#3D7A5C] dark:text-[#4ADE80]',
        badgeBg: 'bg-[#3D7A5C]/10 border-[#3D7A5C]/25 text-[#3D7A5C] dark:text-[#4ADE80]',
        label: 'High Probability'
      };
    } else if (p >= 0.02) {
      return {
        barColor: 'bg-[#C8832A]',
        textColor: 'text-[#C8832A] dark:text-[#FBBF24]',
        badgeBg: 'bg-[#C8832A]/10 border-[#C8832A]/25 text-[#C8832A] dark:text-[#FBBF24]',
        label: 'Moderate'
      };
    } else {
      return {
        barColor: 'bg-[#C94A4A]',
        textColor: 'text-[#C94A4A] dark:text-[#F87171]',
        badgeBg: 'bg-[#C94A4A]/10 border-[#C94A4A]/25 text-[#C94A4A] dark:text-[#F87171]',
        label: 'High Surprise'
      };
    }
  };

  return (
    <div className="rounded-2xl transition-all duration-300 bg-[#FBF8F2]/75 dark:bg-[#221E1A]/75 backdrop-blur-2xl border border-[#E2D9C8] dark:border-[#38312A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_16px_36px_rgba(68,54,39,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_20px_40px_rgba(0,0,0,0.45)] p-5 sm:p-7 space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2D9C8]/80 dark:border-[#38312A]/80 pb-4">
        <div className="flex items-center gap-2.5">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-[#231F1B] dark:text-[#F5EFE6]">
            {title}
          </h2>
          {badge && (
            <span className="mono-tabular text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#C25934]/30 bg-[#C25934]/10 text-[#C25934] dark:text-[#E08A5E]">
              {badge}
            </span>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] mono-tabular text-[#6E655A] dark:text-[#A89D8F]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3D7A5C]" />
            <span>P ≥ 15%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C8832A]" />
            <span>2%–15%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C94A4A]" />
            <span>P &lt; 2%</span>
          </div>
        </div>
      </div>

      {/* Glass Data Table */}
      <div className="overflow-x-auto rounded-xl border border-[#E2D9C8]/70 dark:border-[#38312A]/70 bg-[#F5F0E6]/50 dark:bg-[#161310]/50">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#E2D9C8] dark:border-[#38312A] text-[#6E655A] dark:text-[#A89D8F] mono-tabular">
              <th className="py-3 px-3 sm:px-4 font-semibold w-12 text-center">#</th>
              <th className="py-3 px-3 sm:px-4 font-semibold">Token</th>
              <th className="py-3 px-3 sm:px-4 font-semibold text-right">Probability P</th>
              <th className="py-3 px-3 sm:px-4 font-semibold text-right">1 / P</th>
              <th className="py-3 px-3 sm:px-4 font-semibold w-36 sm:w-48 text-right">Confidence Bar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2D9C8]/60 dark:divide-[#38312A]/60 mono-tabular">
            {tokens.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[#6E655A] dark:text-[#A89D8F]">
                  No token telemetry available. Type a sentence and click Calculate.
                </td>
              </tr>
            ) : (
              tokens.map((tok, index) => {
                const conf = getConfidenceStyle(tok.prob);
                // Calculate percentage for progress bar (capped for visual clarity)
                const barWidth = Math.min(100, Math.max(2, tok.prob * 100));

                return (
                  <tr
                    key={`${tok.id}-${index}`}
                    className="hover:bg-[#EAE2D2]/50 dark:hover:bg-[#2B2520]/50 transition-colors duration-150"
                  >
                    {/* Position # */}
                    <td className="py-2.5 px-3 sm:px-4 text-center text-[#6E655A] dark:text-[#A89D8F] font-mono">
                      {index + 1}
                    </td>

                    {/* Token display with ␣ for whitespace */}
                    <td className="py-2.5 px-3 sm:px-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#E2D9C8] dark:border-[#4A3F35] bg-[#FBF8F2] dark:bg-[#221E1A] shadow-xs">
                        <span className="font-mono font-semibold text-[#231F1B] dark:text-[#F5EFE6]">
                          {tok.displayToken}
                        </span>
                        {tok.id !== undefined && (
                          <span className="text-[10px] text-[#6E655A] dark:text-[#A89D8F] font-mono opacity-60">
                            #{tok.id}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Probability P */}
                    <td className="py-2.5 px-3 sm:px-4 text-right">
                      <span className={`font-semibold ${conf.textColor}`}>
                        {formatProbDecimal(tok.prob)}
                      </span>
                      <span className="text-[10px] text-[#6E655A] dark:text-[#A89D8F] ml-1.5">
                        ({formatProb(tok.prob)})
                      </span>
                    </td>

                    {/* 1 / P */}
                    <td className="py-2.5 px-3 sm:px-4 text-right font-semibold text-[#231F1B] dark:text-[#F5EFE6]">
                      {formatInvProb(tok.invProb)}
                    </td>

                    {/* Subtle Inline Confidence Bar */}
                    <td className="py-2.5 px-3 sm:px-4">
                      <div className="flex items-center justify-end gap-2">
                        <div className="flex-1 max-w-[120px] sm:max-w-[160px] h-2 bg-[#E2D9C8]/60 dark:bg-[#38312A] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${conf.barColor}`}
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${conf.badgeBg} hidden sm:inline-block`}>
                          {conf.label}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Three-Step Breakdown Card */}
      {tokens.length > 0 && (
        <div className="rounded-xl border border-[#E2D9C8] dark:border-[#38312A] bg-[#F5F0E6]/70 dark:bg-[#161310]/70 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2D9C8]/70 dark:border-[#38312A]/70 pb-3">
            <span className="text-xs font-bold tracking-wider uppercase text-[#C25934] dark:text-[#E08A5E] mono-tabular">
              Three-Step Perplexity Breakdown
            </span>
            <span className="text-[11px] mono-tabular text-[#6E655A] dark:text-[#A89D8F]">
              Geometric Mean Formulation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Step 1: Multiply all 1/P values */}
            <div className="p-3.5 rounded-lg border border-[#E2D9C8]/80 dark:border-[#38312A]/80 bg-[#FBF8F2] dark:bg-[#221E1A] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6E655A] dark:text-[#A89D8F] mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#C25934]/15 text-[#C25934] dark:text-[#E08A5E] flex items-center justify-center text-[10px] font-bold">
                    1
                  </span>
                  <span>Multiply all 1/P values</span>
                </div>
                
                {/* Clean semantic HTML fraction chain */}
                <div className="text-xs font-mono text-[#231F1B] dark:text-[#F5EFE6] py-2 flex flex-wrap items-center gap-1 leading-relaxed">
                  {tokens.slice(0, 4).map((t, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <span className="text-[#6E655A]">×</span>}
                      <span className="inline-flex flex-col items-center align-middle text-[11px]">
                        <span className="border-b border-[#231F1B]/30 dark:border-[#F5EFE6]/30 px-1 leading-tight">1</span>
                        <span className="px-1 leading-tight text-[#6E655A] dark:text-[#A89D8F]">P_{idx+1}</span>
                      </span>
                    </React.Fragment>
                  ))}
                  {tokens.length > 4 && <span className="text-[#6E655A]">× …</span>}
                </div>
              </div>

              <div className="pt-2 border-t border-[#E2D9C8]/60 dark:border-[#38312A]/60 text-xs mono-tabular text-[#231F1B] dark:text-[#F5EFE6]">
                <span className="text-[#6E655A] dark:text-[#A89D8F]">Product ≈ </span>
                <span className="font-bold">{formatProduct(product)}</span>
              </div>
            </div>

            {/* Step 2: N = number of tokens */}
            <div className="p-3.5 rounded-lg border border-[#E2D9C8]/80 dark:border-[#38312A]/80 bg-[#FBF8F2] dark:bg-[#221E1A] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6E655A] dark:text-[#A89D8F] mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#C25934]/15 text-[#C25934] dark:text-[#E08A5E] flex items-center justify-center text-[10px] font-bold">
                    2
                  </span>
                  <span>Count Sequence Length</span>
                </div>
                <div className="text-xs font-mono text-[#6E655A] dark:text-[#A89D8F] py-2">
                  Number of evaluated tokens in sequence:
                </div>
              </div>

              <div className="pt-2 border-t border-[#E2D9C8]/60 dark:border-[#38312A]/60 text-xs mono-tabular text-[#231F1B] dark:text-[#F5EFE6]">
                <span className="text-[#6E655A] dark:text-[#A89D8F]">N = </span>
                <span className="font-bold text-base">{n} tokens</span>
              </div>
            </div>

            {/* Step 3: Perplexity = (product)^(1/N) */}
            <div className="p-3.5 rounded-lg border border-[#C25934]/40 bg-[#FBF8F2] dark:bg-[#221E1A] dark:border-[#E08A5E]/40 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C25934] dark:text-[#E08A5E] mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#C25934] text-white flex items-center justify-center text-[10px] font-bold">
                    3
                  </span>
                  <span>Calculate N-th Root</span>
                </div>
                <div className="text-xs font-mono text-[#6E655A] dark:text-[#A89D8F] py-1 flex items-center gap-1">
                  <span>Perplexity = (Product)</span>
                  <sup className="text-[10px] font-bold text-[#C25934] dark:text-[#E08A5E]">1/{n}</sup>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E2D9C8]/60 dark:border-[#38312A]/60 flex items-baseline justify-between">
                <span className="text-xs font-semibold text-[#6E655A] dark:text-[#A89D8F] mono-tabular">
                  Final PPL:
                </span>
                <span className="font-mono text-2xl font-extrabold text-[#C25934] dark:text-[#E08A5E] tracking-tight">
                  {formatPerplexity(perplexity)}
                </span>
              </div>
            </div>
          </div>

          {/* Plain-English Intuition Banner */}
          <div className="p-3.5 rounded-lg border border-[#E2D9C8] dark:border-[#38312A] bg-[#FBF8F2] dark:bg-[#221E1A] text-xs text-[#231F1B] dark:text-[#F5EFE6] flex items-center gap-2.5">
            <span className="text-lg">💡</span>
            <p className="leading-relaxed">
              <strong className="text-[#C25934] dark:text-[#E08A5E]">Plain-English Intuition: </strong>
              On average, the model was as unsure as choosing between about{' '}
              <span className="font-mono font-bold text-[#C25934] dark:text-[#E08A5E] px-1 py-0.5 rounded bg-[#C25934]/10 dark:bg-[#E08A5E]/10">
                {formatPerplexity(perplexity)}
              </span>{' '}
              equally likely tokens at each step of this sentence.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
