import React from 'react';
import {
  TrendingDown,
  ShieldCheck,
} from 'lucide-react';
import type { StateData } from '../../data/surveillanceData';

interface WHOKPISummaryProps {
  stateData: StateData;
}

export const WHOKPISummary: React.FC<WHOKPISummaryProps> = ({ stateData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left font-sans">
      
      {/* ── KPI 1: Leprosy Active Surveillance & Cure Cohort ── */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors flex flex-col justify-between space-y-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-gray-500 uppercase tracking-wider">
              Leprosy (Hansen's Disease)
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
              {stateData.leprosyCureRate}% Cure
            </span>
          </div>

          <div className="pt-1">
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A0C10] tracking-tight">
              {stateData.leprosyCases.toLocaleString()}
            </div>
            <span className="text-xs text-gray-500 font-sans block mt-0.5">
              Active Multidrug Therapy (MDT) Cases
            </span>
          </div>
        </div>

        {/* Sub-classification Progress & Proportions */}
        <div className="pt-3 border-t border-slate-100 space-y-1.5 font-mono text-[11px]">
          <div className="flex items-center justify-between text-gray-600">
            <span>MB: <strong>{stateData.leprosyMB}</strong> (77%)</span>
            <span>PB: <strong>{stateData.leprosyPB}</strong> (23%)</span>
          </div>

          {/* Clean Neutral Distribution Bar */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
            <div
              style={{ width: `${(stateData.leprosyMB / stateData.leprosyCases) * 100}%` }}
              className="bg-[#0082FF] h-full"
              title={`MB: ${stateData.leprosyMB}`}
            />
            <div
              style={{ width: `${(stateData.leprosyPB / stateData.leprosyCases) * 100}%` }}
              className="bg-[#79B5FF] h-full"
              title={`PB: ${stateData.leprosyPB}`}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>Multibacillary (12-Mo)</span>
            <span>Paucibacillary (6-Mo)</span>
          </div>
        </div>
      </div>

      {/* ── KPI 2: Buruli Ulcer Staging & PCR Verification ───── */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors flex flex-col justify-between space-y-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-gray-500 uppercase tracking-wider">
              Buruli Ulcer (IS2404 PCR)
            </span>
            <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
              {stateData.buruliPcrRate}% Verified
            </span>
          </div>

          <div className="pt-1">
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A0C10] tracking-tight">
              {stateData.buruliCases.toLocaleString()}
            </div>
            <span className="text-xs text-gray-500 font-sans block mt-0.5">
              Screened & Diagnosed Cohort
            </span>
          </div>
        </div>

        {/* Category Staging Distribution */}
        <div className="pt-3 border-t border-slate-100 space-y-1.5 font-mono text-[11px]">
          <div className="flex items-center justify-between text-gray-600 text-[10px]">
            <span>Cat I: <strong>{stateData.buruliCat1}</strong> (64%)</span>
            <span>Cat II: <strong>{stateData.buruliCat2}</strong></span>
            <span>Cat III: <strong>{stateData.buruliCat3}</strong></span>
          </div>

          {/* Tri-stage Progress Bar */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
            <div
              style={{ width: `${(stateData.buruliCat1 / stateData.buruliCases) * 100}%` }}
              className="bg-emerald-500 h-full"
              title={`Cat I: ${stateData.buruliCat1}`}
            />
            <div
              style={{ width: `${(stateData.buruliCat2 / stateData.buruliCases) * 100}%` }}
              className="bg-amber-500 h-full"
              title={`Cat II: ${stateData.buruliCat2}`}
            />
            <div
              style={{ width: `${(stateData.buruliCat3 / stateData.buruliCases) * 100}%` }}
              className="bg-rose-500 h-full"
              title={`Cat III: ${stateData.buruliCat3}`}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>Oral Rx (&lt;5cm Nodule)</span>
            <span>Ulceration (&gt;15cm)</span>
          </div>
        </div>
      </div>

      {/* ── KPI 3: Grade-2 Disability (G2D) Prevention Curve ── */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors flex flex-col justify-between space-y-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-gray-500 uppercase tracking-wider">
              Disability Prevention (G2D)
            </span>
            <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
              <TrendingDown className="w-3 h-3" />
              <span>-5.4% vs 2024</span>
            </div>
          </div>

          <div className="pt-1">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A0C10] tracking-tight">
                {stateData.leprosyG2D}%
              </span>
              <span className="text-xs font-mono font-bold text-emerald-700">Target &lt;5%</span>
            </div>
            <span className="text-xs text-gray-500 font-sans block mt-0.5">
              Grade-2 Disability among New Cases
            </span>
          </div>
        </div>

        {/* Target Benchmark Range Bar */}
        <div className="pt-3 border-t border-slate-100 space-y-1.5 font-mono text-[11px]">
          <div className="flex items-center justify-between text-gray-600 text-[10px]">
            <span>Baseline (16.8%)</span>
            <span className="text-emerald-700 font-bold">Current ({stateData.leprosyG2D}%)</span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden relative">
            <div
              style={{ width: `${(stateData.leprosyG2D / 20) * 100}%` }}
              className="bg-emerald-500 h-full rounded-full transition-all"
            />
            {/* Target 5% Marker Line */}
            <div className="absolute left-[25%] top-0 bottom-0 w-0.5 bg-black z-10" title="WHO 5% Target Benchmark" />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>Early VMT Screening</span>
            <span>Prevented Nerve Damage</span>
          </div>
        </div>
      </div>

      {/* ── KPI 4: Sentinel Facilities & Zero-PII Standard ─── */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors flex flex-col justify-between space-y-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-gray-500 uppercase tracking-wider">
              Sentinel Primary Network
            </span>
            <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
              <ShieldCheck className="w-3 h-3 text-purple-600" />
              <span>100% Zero-PII</span>
            </div>
          </div>

          <div className="pt-1">
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A0C10] tracking-tight">
              {stateData.activeFacilities}
            </div>
            <span className="text-xs text-gray-500 font-sans block mt-0.5">
              Active Health Centers & Sentinel Sites
            </span>
          </div>
        </div>

        {/* Network Health Summary */}
        <div className="pt-3 border-t border-slate-100 space-y-1.5 font-mono text-[11px]">
          <div className="flex items-center justify-between text-gray-600 text-[10px]">
            <span>Labs: <strong>{stateData.sentinelLabs} Reference</strong></span>
            <span>Turnaround: <strong>{stateData.avgLabTurnaroundDays}d</strong></span>
          </div>
          <div className="flex items-center justify-between text-gray-500 text-[10px]">
            <span>LGAs Covered: <strong>{stateData.lgasCovered}</strong></span>
            <span>Screened: <strong>{stateData.totalScreened.toLocaleString()}</strong></span>
          </div>
        </div>
      </div>

    </div>
  );
};
