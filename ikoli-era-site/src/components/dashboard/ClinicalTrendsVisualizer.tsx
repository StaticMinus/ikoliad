import React, { useState } from 'react';
import { QUARTERLY_TRENDS } from '../../data/surveillanceData';
import { TrendingDown, BarChart2, CheckCircle2 } from 'lucide-react';

export const ClinicalTrendsVisualizer: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'cases' | 'rates'>('cases');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7 space-y-6 text-left font-sans">
      
      {/* ── Chart Header & Toggle ───────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-[#0082FF]" />
            <h3 className="font-display font-extrabold text-xl text-[#0A0C10]">
              10-Quarter Epidemiological Trajectory (2024 – 2026)
            </h3>
          </div>
          <p className="text-xs text-gray-500 font-sans mt-0.5">
            Longitudinal Skin NTD case identification, Category I Buruli shift, and Grade-2 disability reduction.
          </p>
        </div>

        {/* Metric Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl font-mono text-xs">
          <button
            onClick={() => setActiveMetric('cases')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeMetric === 'cases'
                ? 'bg-white text-[#0A0C10] shadow-xs'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Case Counts
          </button>
          <button
            onClick={() => setActiveMetric('rates')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeMetric === 'rates'
                ? 'bg-white text-[#0A0C10] shadow-xs'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Cure & G2D Rates (%)
          </button>
        </div>
      </div>

      {/* ── Visualizer Legend ────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-4">
          {activeMetric === 'cases' ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#0082FF]" />
                <span className="font-semibold text-gray-700">Leprosy Diagnosed (MDT)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#7d1a4a]" />
                <span className="font-semibold text-gray-700">Buruli Ulcer (IS2404)</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500" />
                <span className="font-semibold text-gray-700">MDT Cure Rate (%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-500" />
                <span className="font-semibold text-gray-700">PCR Verified (%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-rose-500" />
                <span className="font-semibold text-gray-700">Grade-2 Disability (%)</span>
              </div>
            </>
          )}
        </div>

        <span className="text-gray-400 text-[11px]">Source: Federal NTBLCP & WHO 2030 Portal</span>
      </div>

      {/* ── 10-Quarter Responsive Bar / Trend Visualization ─── */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 items-end min-h-[240px] pt-8 pb-4 border-b border-slate-100 font-mono">
        {QUARTERLY_TRENDS.map((q, idx) => {
          const maxVal = activeMetric === 'cases' ? 850 : 100;
          return (
            <div key={idx} className="flex flex-col items-center gap-2 group">
              
              <div className="flex items-end gap-1.5 w-full justify-center h-44">
                {activeMetric === 'cases' ? (
                  <>
                    {/* Leprosy Bar */}
                    <div
                      style={{ height: `${(q.leprosyCases / maxVal) * 100}%` }}
                      className="w-2.5 sm:w-4 bg-[#0082FF] rounded-t-sm group-hover:brightness-110 transition-all relative"
                      title={`${q.quarter} Leprosy: ${q.leprosyCases}`}
                    />
                    {/* Buruli Bar */}
                    <div
                      style={{ height: `${(q.buruliCases / maxVal) * 100}%` }}
                      className="w-2.5 sm:w-4 bg-[#7d1a4a] rounded-t-sm group-hover:brightness-110 transition-all relative"
                      title={`${q.quarter} Buruli: ${q.buruliCases}`}
                    />
                  </>
                ) : (
                  <>
                    {/* Cure Rate Bar */}
                    <div
                      style={{ height: `${(q.cureRate / maxVal) * 100}%` }}
                      className="w-2.5 sm:w-3.5 bg-emerald-500 rounded-t-sm group-hover:brightness-110 transition-all"
                      title={`${q.quarter} Cure: ${q.cureRate}%`}
                    />
                    {/* PCR Confirmation Bar */}
                    <div
                      style={{ height: `${(q.pcrRate / maxVal) * 100}%` }}
                      className="w-2.5 sm:w-3.5 bg-blue-500 rounded-t-sm group-hover:brightness-110 transition-all"
                      title={`${q.quarter} PCR: ${q.pcrRate}%`}
                    />
                    {/* G2D Disability Bar */}
                    <div
                      style={{ height: `${(q.g2dRate / maxVal) * 100}%` }}
                      className="w-2.5 sm:w-3.5 bg-rose-500 rounded-t-sm group-hover:brightness-110 transition-all"
                      title={`${q.quarter} G2D: ${q.g2dRate}%`}
                    />
                  </>
                )}
              </div>

              <span className="text-[10px] text-gray-500 rotate-45 sm:rotate-0 pt-2 font-semibold">
                {q.quarter.replace('20', "'")}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Key Epidemiological Insights Row ────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs font-sans text-gray-600">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
          <div className="flex items-center gap-1.5 text-[#0082FF] font-mono font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Active Case Finding Expansion</span>
          </div>
          <p className="leading-relaxed">
            Community outreach expanded early detection by <strong>+24.6%</strong> across Enugu & Ebonyi pilot clusters.
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
          <div className="flex items-center gap-1.5 text-[#7d1a4a] font-mono font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Buruli Category I Shift</span>
          </div>
          <p className="leading-relaxed">
            Early presentation shifted from <strong>38% to 64%</strong>, curtailing surgical debridement requirements.
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-600 font-mono font-bold">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Grade-2 Disability Curtailment</span>
          </div>
          <p className="leading-relaxed">
            Irreversible nerve damage dropped from <strong>16.8% down to 11.4%</strong>, tracking to WHO 2030 goal (&lt;5%).
          </p>
        </div>
      </div>

    </div>
  );
};
