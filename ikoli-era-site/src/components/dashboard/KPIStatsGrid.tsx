import React from 'react';
import {
  TrendingDown,
  ShieldCheck,
} from 'lucide-react';
import type { StateData } from '../../data/surveillanceData';

interface KPIStatsGridProps {
  stateData: StateData;
}

export const KPIStatsGrid: React.FC<KPIStatsGridProps> = ({ stateData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      
      {/* ── KPI 1: Leprosy Diagnostics & Cure Cohort ───────── */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-gray-500 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#0082FF]" />
            <span>Leprosy Surveillance</span>
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            {stateData.leprosyCureRate}% Cure Rate
          </span>
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A0C10] tracking-tight">
              {stateData.leprosyCases.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 font-mono font-semibold">total cases</span>
          </div>
          <span className="text-xs text-gray-500 font-sans mt-0.5 block">
            Multidrug Therapy (MDT) Active Cohort
          </span>
        </div>

        {/* Sub-classification Progress Bar */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100 font-mono text-[11px]">
          <div className="flex items-center justify-between text-gray-600">
            <span>MB: <strong>{stateData.leprosyMB}</strong></span>
            <span>PB: <strong>{stateData.leprosyPB}</strong></span>
          </div>
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
            <span>Multibacillary (12m)</span>
            <span>Paucibacillary (6m)</span>
          </div>
        </div>
      </div>

      {/* ── KPI 2: Buruli Ulcer Staging & PCR Confirmation ─── */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#7d1a4a] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#7d1a4a]" />
            <span>Buruli Ulcer (IS2404)</span>
          </div>
          <span className="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
            {stateData.buruliPcrRate}% PCR Verified
          </span>
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A0C10] tracking-tight">
              {stateData.buruliCases.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 font-mono font-semibold">screened</span>
          </div>
          <span className="text-xs text-gray-500 font-sans mt-0.5 block">
            Category I (&lt;5cm) Early Shift: <strong>{Math.round((stateData.buruliCat1 / stateData.buruliCases) * 100)}%</strong>
          </span>
        </div>

        {/* Category Breakdown Bar */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100 font-mono text-[11px]">
          <div className="flex items-center justify-between text-gray-600 text-[10px]">
            <span>Cat I: <strong>{stateData.buruliCat1}</strong></span>
            <span>Cat II: <strong>{stateData.buruliCat2}</strong></span>
            <span>Cat III: <strong>{stateData.buruliCat3}</strong></span>
          </div>
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
            <span>Oral Rx (&lt;5cm)</span>
            <span>Ulceration (&gt;15cm)</span>
          </div>
        </div>
      </div>

      {/* ── KPI 3: Grade-2 Disability (G2D) Reduction Curve ─ */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-gray-500 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Disability Prevention</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>-5.4% vs 2024</span>
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A0C10] tracking-tight">
              {stateData.leprosyG2D}%
            </span>
            <span className="text-xs text-emerald-600 font-mono font-bold">Target: &lt;5%</span>
          </div>
          <span className="text-xs text-gray-500 font-sans mt-0.5 block">
            WHO 2030 Zero Disability Roadmap
          </span>
        </div>

        {/* Target Benchmark Progress */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100 font-mono text-[11px]">
          <div className="flex items-center justify-between text-gray-600">
            <span>Baseline (16.8%)</span>
            <span className="text-emerald-600 font-bold">Current ({stateData.leprosyG2D}%)</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden relative">
            <div
              style={{ width: `${(stateData.leprosyG2D / 20) * 100}%` }}
              className="bg-emerald-500 h-full rounded-full transition-all"
            />
            {/* Target 5% Marker Line */}
            <div className="absolute left-[25%] top-0 bottom-0 w-0.5 bg-black z-10" title="WHO 5% Target" />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>Early VMT & ST Screenings</span>
            <span>Prevented Nerve Clawing</span>
          </div>
        </div>
      </div>

      {/* ── KPI 4: Active Sentinel Nodes & Zero-PII Score ──── */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-purple-600 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span>Sentinel Telemetry</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>100% Zero-PII</span>
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A0C10] tracking-tight">
              {stateData.activeFacilities}
            </span>
            <span className="text-xs text-gray-400 font-mono font-semibold">clinics active</span>
          </div>
          <span className="text-xs text-gray-500 font-sans mt-0.5 block">
            {stateData.sentinelLabs} Reference Labs • {stateData.avgLabTurnaroundDays}d Avg Turnaround
          </span>
        </div>

        {/* System Health Indicators */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100 font-mono text-[11px]">
          <div className="flex items-center justify-between text-gray-600">
            <span>DHIS2 Sync Status</span>
            <span className="text-emerald-600 font-bold">98.4% Real-time</span>
          </div>
          <div className="flex items-center justify-between text-gray-500 text-[10px] pt-1">
            <span>LGAs Monitored: <strong>{stateData.lgasCovered}</strong></span>
            <span>Total Screened: <strong>{stateData.totalScreened.toLocaleString()}</strong></span>
          </div>
        </div>
      </div>

    </div>
  );
};
