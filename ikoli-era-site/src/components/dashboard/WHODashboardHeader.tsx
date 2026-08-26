import React from 'react';
import {
  Calendar,
  Sparkles,
  Search,
  ShieldCheck,
  FileSpreadsheet,
} from 'lucide-react';
import { STATES_DATA, type StateData } from '../../data/surveillanceData';

interface WHODashboardHeaderProps {
  selectedStateId: string;
  onSelectState: (stateId: string) => void;
  onExportCSV: () => void;
  onNavigate: (page: 'home' | 'dashboard' | 'diseases' | 'ask') => void;
  onOpenAudit: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const WHODashboardHeader: React.FC<WHODashboardHeaderProps> = ({
  selectedStateId,
  onSelectState,
  onExportCSV,
  onNavigate,
  onOpenAudit,
  searchQuery,
  onSearchChange,
}) => {
  const currentState: StateData = STATES_DATA[selectedStateId] || STATES_DATA.all;

  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 lg:p-10 space-y-6 text-left relative overflow-hidden">
      {/* Subtle ice-blue ambient accent in background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#0082FF]/8 via-transparent to-transparent rounded-full pointer-events-none" />

      {/* ── Breadcrumb & Metadata Topline ───────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-gray-500 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span
            onClick={() => onNavigate('home')}
            className="text-gray-600 hover:text-[#0082FF] cursor-pointer transition-colors"
          >
            Nigeria NTD Portal
          </span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-600">South-East Sentinel Hub</span>
          <span className="text-gray-300">/</span>
          <span className="text-[#0082FF] font-bold">{currentState.name}</span>
        </div>

        <div className="flex items-center gap-4 text-gray-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#0082FF]" />
            <span>Updated: <strong>{currentState.lastUpdated}</strong></span>
          </div>
          <span className="text-gray-200 hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center gap-1.5 text-emerald-600 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>312 Active Sentinel Nodes</span>
          </div>
        </div>
      </div>

      {/* ── Headline, Description & Primary CTA Row ─────────── */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-[#0082FF] uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              NATIONAL HEALTH SURVEILLANCE MATRIX
            </span>
            <span className="text-[10px] font-mono font-bold text-gray-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
              WHO 2030 ROADMAP COMPLIANT
            </span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#0A0C10] tracking-tight leading-tight">
            Skin NTDs Epidemiological Surveillance Dashboard
          </h1>

          <p className="text-sm sm:text-base text-gray-600 font-sans leading-relaxed pt-1">
            Authoritative public health intelligence, active case detection metrics, molecular PCR verification, and Grade-2 disability reduction trajectories across Nigeria's sentinel healthcare facilities.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={onExportCSV}
            title="Download full surveillance matrix CSV"
            className="bg-white hover:bg-slate-50 active:bg-slate-100 text-[#0A0C10] px-4 py-2.5 rounded-xl text-xs font-mono font-bold border border-slate-200 shadow-2xs flex items-center gap-2 transition-all cursor-pointer hover:border-slate-300"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#0082FF]" />
            <span>Export Dataset (.CSV)</span>
          </button>

          <button
            onClick={onOpenAudit}
            title="View Zero-PII Cryptographic Audit Ledger"
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero-PII Audit</span>
          </button>

          <button
            onClick={() => onNavigate('ask')}
            className="bg-[#0082FF] hover:bg-[#0066CC] text-white px-5 py-2.5 rounded-xl text-xs font-mono font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#00D2FF]" />
            <span>Ask Ikoli AI</span>
          </button>
        </div>
      </div>

      {/* ── Territory & State Filter Bar (WHO Style) ─────────── */}
      <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mr-2">
            Sentinel Territory:
          </span>
          {Object.values(STATES_DATA).map((s) => {
            const isSelected = selectedStateId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectState(s.id)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0A0C10] text-white shadow-xs'
                    : 'bg-slate-100 text-gray-600 hover:bg-slate-200 hover:text-black'
                }`}
              >
                {s.name.replace(' State', '')}
              </button>
            );
          })}
        </div>

        {/* Search Input for Quick Lookup */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search cases, LGAs, labs..."
            className="w-full bg-slate-50 text-xs text-slate-900 placeholder-gray-400 pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0082FF] transition-all font-sans"
          />
        </div>
      </div>
    </section>
  );
};
