import React, { useState } from 'react';
import { LogoIcon } from '../LogoIcon';
import {
  Search,
  Bell,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  FileSpreadsheet,
} from 'lucide-react';
import { STATES_DATA } from '../../data/surveillanceData';

interface DashboardHeaderProps {
  selectedStateId: string;
  onSelectState: (stateId: string) => void;
  onNavigate: (page: 'home' | 'dashboard' | 'diseases' | 'ask') => void;
  onExportCSV: () => void;
  onOpenAudit: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  selectedStateId,
  onSelectState,
  onNavigate,
  onExportCSV,
  onOpenAudit,
  searchQuery,
  onSearchChange,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const currentState = STATES_DATA[selectedStateId] || STATES_DATA.all;

  return (
    <header className="w-full bg-[#0A0D16] border-b border-white/10 text-white px-4 sm:px-6 py-3.5 sticky top-0 z-40 backdrop-blur-xl select-none">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity & Breadcrumb */}
        <div className="flex items-center gap-3.5">
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <LogoIcon className="w-8 h-8 group-hover:scale-105 transition-transform drop-shadow-md" />
            <div className="flex flex-col text-left">
              <span className="font-display font-black text-lg tracking-tight text-white group-hover:text-[#0082FF] transition-colors leading-none">
                IKOLI AI
              </span>
              <span className="font-mono text-[8px] font-bold text-[#0082FF] tracking-widest uppercase">
                Surveillance Hub
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/10 text-xs font-mono text-gray-400">
            <span>National NTBLCP</span>
            <span>/</span>
            <span className="text-[#0082FF] font-semibold">{currentState.name}</span>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search token hash, disease, LGA, facility..."
              className="w-full bg-[#121826] text-xs text-white placeholder-gray-500 pl-10 pr-12 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-[#0082FF] transition-all font-sans"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 text-[10px] font-mono text-gray-400 px-1.5 py-0.5 rounded">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right: State Selector, Actions & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* State Switcher Dropdown */}
          <div className="relative">
            <select
              value={selectedStateId}
              onChange={(e) => onSelectState(e.target.value)}
              className="bg-[#121826] hover:bg-[#182032] text-white text-xs font-mono font-bold pl-3 pr-8 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-[#0082FF] transition-all cursor-pointer appearance-none"
            >
              {Object.values(STATES_DATA).map((s) => (
                <option key={s.id} value={s.id} className="bg-[#0A0D16] text-white">
                  {s.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Live Node Telemetry Indicator */}
          <div className="hidden sm:flex items-center gap-2 bg-[#121826] px-3 py-1.5 rounded-xl border border-white/10 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-300">312 Nodes</span>
          </div>

          {/* Export CSV Action */}
          <button
            onClick={onExportCSV}
            title="Export National Surveillance CSV"
            className="hidden lg:inline-flex bg-[#121826] hover:bg-[#182032] text-white px-3 py-2 rounded-xl text-xs font-mono font-semibold border border-white/10 items-center gap-1.5 transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#00D2FF]" />
            <span>Export CSV</span>
          </button>

          {/* Zero-PII Audit Button */}
          <button
            onClick={onOpenAudit}
            className="bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/30 px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Zero-PII</span>
          </button>

          {/* Ask Ikoli Shortcut */}
          <button
            onClick={() => onNavigate('ask')}
            className="bg-[#0082FF] hover:bg-[#0066CC] text-white px-3.5 py-2 rounded-xl text-xs font-mono font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all hover:scale-105 shadow-md cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-9 h-9 rounded-xl bg-[#121826] border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#182032] transition-colors relative cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-[#0082FF] absolute top-2 right-2 ring-2 ring-[#0A0D16]" />
            </button>

            {/* Notification Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#0E1526] border border-white/15 rounded-2xl shadow-2xl p-4 z-50 space-y-3 font-sans">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-bold font-mono text-white">Live Surveillance Alerts</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    3 New
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/5 space-y-1">
                    <span className="font-bold text-[#0082FF] block">Oji River Cluster Verified</span>
                    <p className="text-gray-300 text-[11px]">
                      14 Category I Buruli Ulcer screenings confirmed via IS2404 PCR assay.
                    </p>
                    <span className="text-[9px] text-gray-500 font-mono">12 mins ago</span>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/5 space-y-1">
                    <span className="font-bold text-emerald-400 block">DHIS2 Aggregate Synced</span>
                    <p className="text-gray-300 text-[11px]">
                      South-East Q2 cohort data synchronized with zero validation errors.
                    </p>
                    <span className="text-[9px] text-gray-500 font-mono">45 mins ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Officer Profile Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <div className="w-8 h-8 rounded-xl bg-[#1A233A] border border-[#0082FF]/40 flex items-center justify-center text-[#0082FF] font-mono font-bold text-xs">
              CO
            </div>
            <div className="hidden xl:flex flex-col text-left font-sans">
              <span className="text-xs font-bold text-white leading-none">Dr. C. Okoli</span>
              <span className="text-[10px] text-gray-400 font-mono">NTBLCP Lead</span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
