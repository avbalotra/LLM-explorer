import React, { useState } from 'react';
import { GitCompare, ArrowRight, Loader2, TrendingUp, AlertCircle } from 'lucide-react';
import { useModel } from '../context/ModelContext';
import { PRECOMPUTED_GROUND_TRUTH, AnalysisResult } from '../data/groundTruth';

export const Comparator: React.FC = () => {
  const { calculatePerplexity, isCalculating } = useModel();

  const [sentenceA, setSentenceA] = useState('The capital of France is Paris');
  const [sentenceB, setSentenceB] = useState('The capital of France is Banana');

  const [resultA, setResultA] = useState<AnalysisResult>(
    PRECOMPUTED_GROUND_TRUTH['The capital of France is Paris']
  );
  const [resultB, setResultB] = useState<AnalysisResult>(
    PRECOMPUTED_GROUND_TRUTH['The capital of France is Banana']
  );

  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);

  const presetPairs = [
    {
      title: 'Factual vs Absurd',
      a: 'The capital of France is Paris',
      b: 'The capital of France is Banana'
    },
    {
      title: 'Grammar Syntax Inversion',
      a: 'I love Python',
      b: 'Python love I'
    }
  ];

  const handleCompare = async () => {
    setLoadingA(true);
    setLoadingB(true);
    try {
      const pA = calculatePerplexity(sentenceA).catch(() => PRECOMPUTED_GROUND_TRUTH[sentenceA]);
      const pB = calculatePerplexity(sentenceB).catch(() => PRECOMPUTED_GROUND_TRUTH[sentenceB]);

      const [resA, resB] = await Promise.all([pA, pB]);
      if (resA) setResultA(resA);
      if (resB) setResultB(resB);
    } finally {
      setLoadingA(false);
      setLoadingB(false);
    }
  };

  const handleApplyPreset = (a: string, b: string) => {
    setSentenceA(a);
    setSentenceB(b);
    if (PRECOMPUTED_GROUND_TRUTH[a]) setResultA(PRECOMPUTED_GROUND_TRUTH[a]);
    if (PRECOMPUTED_GROUND_TRUTH[b]) setResultB(PRECOMPUTED_GROUND_TRUTH[b]);
  };

  // Compute surprise ratio
  const pplA = resultA?.perplexity ?? 1;
  const pplB = resultB?.perplexity ?? 1;
  const ratio = pplB > pplA ? pplB / pplA : pplA / pplB;
  const moreSurprising = pplB > pplA ? 'Sentence B' : 'Sentence A';

  // Find max 1/P for chart scaling
  const maxInvA = Math.max(...(resultA?.tokens.map(t => t.invProb) || [1]));
  const maxInvB = Math.max(...(resultB?.tokens.map(t => t.invProb) || [1]));
  const maxInv = Math.max(maxInvA, maxInvB, 10);

  // SVG Chart Dimensions
  const chartHeight = 180;
  const chartPadding = 30;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="space-y-1.5 border-b border-[#E2D9C8]/80 dark:border-[#38312A]/80 pb-4">
        <div className="flex items-center gap-2">
          <span className="mono-tabular text-xs font-semibold px-2 py-0.5 rounded-full border border-[#C25934]/30 bg-[#C25934]/10 text-[#C25934] dark:text-[#E08A5E]">
            ARENA // MODULE 02
          </span>
          <span className="text-xs text-[#6E655A] dark:text-[#A89D8F] mono-tabular">
            DUAL-SEQUENCE SURPRISE COMPARATOR
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#231F1B] dark:text-[#F5EFE6]">
          Sentence A/B Arena
        </h1>
        <p className="text-sm text-[#6E655A] dark:text-[#A89D8F] max-w-3xl leading-relaxed">
          Pit two sentences side-by-side through DistilGPT-2 to uncover the exact token position where sequence predictability collapses.
        </p>
      </div>

      {/* Preset Pairs */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[#6E655A] dark:text-[#A89D8F] mono-tabular text-[11px] mr-1">
          Preset Battles:
        </span>
        {presetPairs.map(preset => (
          <button
            key={preset.title}
            onClick={() => handleApplyPreset(preset.a, preset.b)}
            className="px-3 py-1.5 rounded-full border border-[#E2D9C8] dark:border-[#38312A] bg-[#F5F0E6] dark:bg-[#161310] text-[#6E655A] dark:text-[#A89D8F] hover:border-[#C25934] hover:text-[#231F1B] dark:hover:text-[#F5EFE6] mono-tabular transition-all text-xs"
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* Side-by-Side Sentence Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Sentence A Box */}
        <div className="rounded-2xl bg-[#FBF8F2]/75 dark:bg-[#221E1A]/75 backdrop-blur-2xl border border-[#E2D9C8] dark:border-[#38312A] p-5 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3D7A5C] dark:text-[#4ADE80] mono-tabular">
              Sequence A
            </span>
            <span className="text-xs font-mono font-bold text-[#3D7A5C] dark:text-[#4ADE80]">
              PPL: {resultA ? resultA.perplexity.toFixed(2) : '—'}
            </span>
          </div>
          <textarea
            rows={2}
            value={sentenceA}
            onChange={(e) => setSentenceA(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[#E2D9C8] dark:border-[#38312A] bg-[#F5F0E6]/90 dark:bg-[#161310]/90 text-[#231F1B] dark:text-[#F5EFE6] font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#3D7A5C]/40 shadow-inner resize-none"
            placeholder="Sequence A..."
          />
        </div>

        {/* Sentence B Box */}
        <div className="rounded-2xl bg-[#FBF8F2]/75 dark:bg-[#221E1A]/75 backdrop-blur-2xl border border-[#E2D9C8] dark:border-[#38312A] p-5 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C25934] dark:text-[#E08A5E] mono-tabular">
              Sequence B
            </span>
            <span className="text-xs font-mono font-bold text-[#C25934] dark:text-[#E08A5E]">
              PPL: {resultB ? resultB.perplexity.toFixed(2) : '—'}
            </span>
          </div>
          <textarea
            rows={2}
            value={sentenceB}
            onChange={(e) => setSentenceB(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[#E2D9C8] dark:border-[#38312A] bg-[#F5F0E6]/90 dark:bg-[#161310]/90 text-[#231F1B] dark:text-[#F5EFE6] font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#C25934]/40 shadow-inner resize-none"
            placeholder="Sequence B..."
          />
        </div>
      </div>

      {/* Compare Action Button & Relative Surprise Multiplier Badge */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Delta Multiplier Badge */}
        {resultA && resultB && (
          <div className="p-3.5 rounded-xl border border-[#C25934]/30 bg-[#C25934]/10 dark:border-[#E08A5E]/30 dark:bg-[#E08A5E]/10 flex items-center gap-3 w-full sm:w-auto">
            <div className="w-8 h-8 rounded-lg bg-[#C25934] dark:bg-[#E08A5E] text-white dark:text-[#161310] flex items-center justify-center font-bold text-xs flex-shrink-0">
              Δ
            </div>
            <div>
              <div className="text-xs font-bold text-[#231F1B] dark:text-[#F5EFE6]">
                {moreSurprising} is{' '}
                <span className="text-[#C25934] dark:text-[#E08A5E] font-mono text-sm underline decoration-2">
                  {ratio >= 100 ? ratio.toFixed(1) : ratio.toFixed(2)}× more surprising
                </span>
              </div>
              <div className="text-[10px] text-[#6E655A] dark:text-[#A89D8F] mono-tabular">
                Perplexity Ratio: {pplB.toFixed(2)} vs {pplA.toFixed(2)}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleCompare}
          disabled={loadingA || loadingB || isCalculating}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#C25934] hover:bg-[#A84725] text-white font-medium text-xs tracking-wide uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
        >
          {loadingA || loadingB ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing Both Sequences…</span>
            </>
          ) : (
            <>
              <GitCompare className="w-4 h-4" />
              <span>Compare Sequences</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive SVG Token-by-Token Surprise Chart (1/P across positions) */}
      <div className="rounded-2xl bg-[#FBF8F2]/75 dark:bg-[#221E1A]/75 backdrop-blur-2xl border border-[#E2D9C8] dark:border-[#38312A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_16px_36px_rgba(68,54,39,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_20px_40px_rgba(0,0,0,0.45)] p-5 sm:p-7 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2D9C8]/80 dark:border-[#38312A]/80 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#C25934] dark:text-[#E08A5E]" />
            <h3 className="text-sm font-semibold tracking-wide uppercase text-[#231F1B] dark:text-[#F5EFE6]">
              Token-by-Token Surprise Trajectory (1/P)
            </h3>
          </div>
          <div className="flex items-center gap-4 text-xs mono-tabular">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-[#3D7A5C] rounded-full" />
              <span className="text-[#3D7A5C] dark:text-[#4ADE80] font-medium">Sequence A</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-[#C25934] rounded-full" />
              <span className="text-[#C25934] dark:text-[#E08A5E] font-medium">Sequence B</span>
            </div>
          </div>
        </div>

        {/* SVG Chart */}
        <div className="relative w-full overflow-x-auto py-2">
          <svg
            className="w-full min-w-[500px]"
            height={chartHeight + chartPadding * 2}
            viewBox={`0 0 700 ${chartHeight + chartPadding * 2}`}
          >
            {/* Horizontal Grid lines */}
            <line
              x1="60"
              y1={chartPadding}
              x2="680"
              y2={chartPadding}
              stroke="currentColor"
              strokeDasharray="4 4"
              className="text-[#E2D9C8] dark:text-[#38312A]"
            />
            <line
              x1="60"
              y1={chartPadding + chartHeight / 2}
              x2="680"
              y2={chartPadding + chartHeight / 2}
              stroke="currentColor"
              strokeDasharray="4 4"
              className="text-[#E2D9C8] dark:text-[#38312A]"
            />
            <line
              x1="60"
              y1={chartPadding + chartHeight}
              x2="680"
              y2={chartPadding + chartHeight}
              stroke="currentColor"
              className="text-[#E2D9C8] dark:text-[#38312A]"
            />

            {/* Y-axis labels in log scale */}
            <text x="50" y={chartPadding + 4} textAnchor="end" className="text-[10px] font-mono fill-[#6E655A] dark:fill-[#A89D8F]">
              Max
            </text>
            <text x="50" y={chartPadding + chartHeight / 2 + 4} textAnchor="end" className="text-[10px] font-mono fill-[#6E655A] dark:fill-[#A89D8F]">
              Mid
            </text>
            <text x="50" y={chartPadding + chartHeight + 4} textAnchor="end" className="text-[10px] font-mono fill-[#6E655A] dark:fill-[#A89D8F]">
              1x
            </text>

            {/* Sequence A Plot (Log-scaled) */}
            {resultA && resultA.tokens.length > 0 && (() => {
              const count = resultA.tokens.length;
              const step = 600 / Math.max(1, count - 1);
              const points = resultA.tokens.map((t, i) => {
                const x = 70 + i * step;
                // Logarithmic normalization for wide dynamic range
                const logVal = Math.log10(Math.max(1, t.invProb));
                const maxLog = Math.log10(Math.max(10, maxInv));
                const y = chartPadding + chartHeight - (logVal / Math.max(1, maxLog)) * chartHeight;
                return { x, y, token: t.displayToken, inv: t.invProb };
              });
              const pathD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

              return (
                <g>
                  <path d={pathD} fill="none" stroke="#3D7A5C" strokeWidth="2.5" strokeLinecap="round" />
                  {points.map((p, i) => (
                    <g key={i}>
                      <circle cx={p.x} cy={p.y} r="4" fill="#3D7A5C" />
                      <text
                        x={p.x}
                        y={chartPadding + chartHeight + 18}
                        textAnchor="middle"
                        className="text-[10px] font-mono fill-[#3D7A5C]"
                      >
                        {p.token}
                      </text>
                    </g>
                  ))}
                </g>
              );
            })()}

            {/* Sequence B Plot (Log-scaled) */}
            {resultB && resultB.tokens.length > 0 && (() => {
              const count = resultB.tokens.length;
              const step = 600 / Math.max(1, count - 1);
              const points = resultB.tokens.map((t, i) => {
                const x = 70 + i * step;
                const logVal = Math.log10(Math.max(1, t.invProb));
                const maxLog = Math.log10(Math.max(10, maxInv));
                const y = chartPadding + chartHeight - (logVal / Math.max(1, maxLog)) * chartHeight;
                return { x, y, token: t.displayToken, inv: t.invProb };
              });
              const pathD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

              return (
                <g>
                  <path d={pathD} fill="none" stroke="#C25934" strokeWidth="2.5" strokeDasharray="3 3" strokeLinecap="round" />
                  {points.map((p, i) => (
                    <g key={i}>
                      <circle cx={p.x} cy={p.y} r="4" fill="#C25934" />
                      <text
                        x={p.x}
                        y={chartPadding + chartHeight + 30}
                        textAnchor="middle"
                        className="text-[10px] font-mono fill-[#C25934]"
                      >
                        {p.token}
                      </text>
                    </g>
                  ))}
                </g>
              );
            })()}
          </svg>
        </div>

        <div className="p-3 rounded-lg bg-[#F5F0E6] dark:bg-[#161310] border border-[#E2D9C8]/80 dark:border-[#38312A]/80 text-[11px] mono-tabular text-[#6E655A] dark:text-[#A89D8F] flex items-center gap-2">
          <span>Notice: Spikes along the curve indicate tokens with astronomical 1/P branching surprise.</span>
        </div>
      </div>
    </div>
  );
};
