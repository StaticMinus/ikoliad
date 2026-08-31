import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  MapPin,
  Package,
  FileSpreadsheet,
  Download,
  Check,
} from 'lucide-react';

interface GenUIBlockProps {
  type: 'chart' | 'map' | 'supply' | 'export' | string;
  data?: Record<string, unknown>;
  isDark?: boolean;
}

export const GenUIBlock: React.FC<GenUIBlockProps> = ({
  type,
  data: _data,
  isDark = true,
}) => {
  const [activeState, setActiveState] = useState<'Ebonyi' | 'Anambra' | 'Enugu'>('Ebonyi');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  // ── 0. AUTONOMOUS DATASET EXPORTER (genui:export) ─────────────────────────
  const handleTriggerExport = () => {
    const csvContent = `State,LGA,Year,Leprosy_MB,Leprosy_PB,Child_Cases,Grade2_Disability,SDR_PEP_Coverage_Pct,Buruli_Ulcer,MDT_Cure_Rate_Pct\n` +
      `Ebonyi,Izzi,2025,32,12,2,8,94.2%,6,88.5%\n` +
      `Ebonyi,Ivo,2025,12,3,1,4,88.0%,3,86.0%\n` +
      `Ebonyi,Ikwo,2025,8,4,0,2,89.5%,2,90.0%\n` +
      `Anambra,Oyi,2025,8,4,0,0,92.5%,2,100.0%\n` +
      `Anambra,Orumba North,2025,5,3,0,0,85.0%,1,100.0%\n` +
      `Anambra,Awka South,2025,3,2,0,0,95.0%,2,100.0%\n` +
      `Enugu,Oji River,2025,18,8,1,7,91.4%,2,92.0%\n` +
      `Enugu,Udi,2025,8,4,1,5,91.0%,0,91.0%\n` +
      `Abia,Uzuakoli,2025,24,6,0,5,88.4%,18,89.0%\n` +
      `Abia,Isiala Ngwa,2025,11,2,0,3,87.0%,20,88.0%\n` +
      `Imo,Oguta,2025,6,3,0,0,96.0%,2,100.0%`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `IKOLI_Surveillance_Dataset_2025.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setHasDownloaded(true);
  };

  useEffect(() => {
    if (type === 'export' || type.includes('export')) {
      // Auto-trigger export once on generation
      const timer = setTimeout(() => {
        handleTriggerExport();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [type]);

  if (type === 'export' || type.includes('export')) {
    return (
      <div className={`my-4 rounded-3xl p-5 border shadow-xl space-y-3 select-none transition-all ${
        isDark ? 'bg-[#141418] border-white/10 text-white' : 'bg-white border-black/8 text-[#1D1D1F]'
      }`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm">IKOLI_Surveillance_Dataset_2025.csv</h4>
              <p className="text-[11px] text-gray-400 font-mono">Excel-compatible tabular dataset &bull; 4.2 KB &bull; Zero-PII</p>
            </div>
          </div>

          <button
            onClick={handleTriggerExport}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
              hasDownloaded
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-[#0071E3] hover:bg-[#0077ED] text-white'
            }`}
          >
            {hasDownloaded ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
            <span>{hasDownloaded ? 'Downloaded' : 'Download'}</span>
          </button>
        </div>
      </div>
    );
  }

  // ── 1. EPIDEMIOLOGICAL TREND BENTO CARD (genui:chart) ─────────────────────
  if (type === 'chart' || type.includes('chart')) {
    const trendData: Record<string, { years: string[]; cases: number[]; pepCoverage: number[] }> = {
      Ebonyi: {
        years: ['2021', '2022', '2023', '2024', '2025'],
        cases: [142, 128, 98, 74, 52],
        pepCoverage: [12, 28, 64, 86, 94],
      },
      Anambra: {
        years: ['2021', '2022', '2023', '2024', '2025'],
        cases: [98, 86, 72, 48, 31],
        pepCoverage: [8, 22, 58, 82, 91],
      },
      Enugu: {
        years: ['2021', '2022', '2023', '2024', '2025'],
        cases: [76, 68, 54, 38, 24],
        pepCoverage: [15, 34, 69, 88, 96],
      },
    };

    const currentData = trendData[activeState];
    const maxCases = 160;

    return (
      <div className={`my-4 rounded-3xl p-5 border shadow-xl space-y-4 select-none transition-all ${
        isDark ? 'bg-[#141418] border-white/10 text-white' : 'bg-white border-black/8 text-[#1D1D1F]'
      }`}>
        {/* Header with State Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3 border-white/10 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-blue-500/10 text-[#0071E3] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs">SDR-PEP Impact &amp; Case Reduction (2021–2025)</h4>
              <p className="text-[10px] text-gray-400 font-mono">Source: NTBLCP South-East Surveillance Register</p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-black/20 dark:bg-white/5 p-1 rounded-xl border border-white/5">
            {(['Ebonyi', 'Anambra', 'Enugu'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setActiveState(st)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                  activeState === st
                    ? 'bg-[#0071E3] text-white shadow-xs'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Key Metric Pills */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className={`p-2.5 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-black/5'}`}>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">2025 Cases</span>
            <p className="font-display font-black text-lg text-emerald-400">{currentData.cases[4]}</p>
            <span className="text-[9px] text-emerald-400 font-semibold">-63% since 2021</span>
          </div>

          <div className={`p-2.5 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-black/5'}`}>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">SDR-PEP Rate</span>
            <p className="font-display font-black text-lg text-[#00D2FF]">{currentData.pepCoverage[4]}%</p>
            <span className="text-[9px] text-blue-400 font-semibold">Contact prophylaxis</span>
          </div>

          <div className={`p-2.5 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-black/5'}`}>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">MDT Cure Rate</span>
            <p className="font-display font-black text-lg text-indigo-400">96.8%</p>
            <span className="text-[9px] text-gray-400 font-semibold">12-mo cohort</span>
          </div>
        </div>

        {/* Interactive SVG Trend Chart */}
        <div className="relative pt-2">
          <div className="h-36 w-full flex items-end justify-between gap-3 px-2">
            {currentData.years.map((year, idx) => {
              const caseHeight = (currentData.cases[idx] / maxCases) * 100;
              const pepHeight = currentData.pepCoverage[idx];
              const isHovered = hoveredPoint === idx;

              return (
                <div
                  key={year}
                  onMouseEnter={() => setHoveredPoint(idx)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
                >
                  {/* Tooltip on hover */}
                  {isHovered && (
                    <div className="absolute -top-3 bg-black/90 text-white text-[10px] font-mono px-2 py-1 rounded-md border border-white/20 shadow-xl z-20">
                      {year}: {currentData.cases[idx]} cases &bull; {currentData.pepCoverage[idx]}% PEP
                    </div>
                  )}

                  {/* Dual Bar (Cases vs PEP Coverage) */}
                  <div className="w-full flex items-end justify-center gap-1.5 h-28">
                    {/* Case Detection Bar (RedAid / Danger red to emerald gradient) */}
                    <div
                      style={{ height: `${caseHeight}%` }}
                      className="w-3 sm:w-4 rounded-t-md bg-gradient-to-t from-red-500/80 to-amber-400 transition-all duration-500 group-hover:brightness-125"
                      title={`New Cases: ${currentData.cases[idx]}`}
                    />
                    {/* SDR-PEP Bar (Electric Cyan) */}
                    <div
                      style={{ height: `${pepHeight}%` }}
                      className="w-3 sm:w-4 rounded-t-md bg-gradient-to-t from-[#0052CC] to-[#00D2FF] transition-all duration-500 group-hover:brightness-125"
                      title={`PEP Coverage: ${currentData.pepCoverage[idx]}%`}
                    />
                  </div>

                  <span className={`text-[10px] font-mono font-semibold transition-colors ${
                    isHovered ? 'text-[#00D2FF]' : 'text-gray-400'
                  }`}>
                    {year}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Chart Legend */}
          <div className="flex items-center justify-center gap-4 pt-2 text-[10px] font-mono text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-gradient-to-t from-red-500 to-amber-400" />
              New Case Detections
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-gradient-to-t from-[#0052CC] to-[#00D2FF]" />
              SDR-PEP Chemoprophylaxis (%)
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ── 2. GEOSPATIAL LGA HOTSPOT MAP (genui:map) ─────────────────────────────
  if (type === 'map' || type.includes('map')) {
    const lgaClusters = [
      { name: 'Izzi LGA', state: 'Ebonyi', risk: 'Critical', cases: 28, pepRate: '94%', activeClusters: 4 },
      { name: 'Ivo LGA', state: 'Ebonyi', risk: 'High', cases: 14, pepRate: '88%', activeClusters: 2 },
      { name: 'Oyi LGA', state: 'Anambra', risk: 'High', cases: 12, pepRate: '92%', activeClusters: 2 },
      { name: 'Orumba North', state: 'Anambra', risk: 'Moderate', cases: 8, pepRate: '85%', activeClusters: 1 },
      { name: 'Udi LGA', state: 'Enugu', risk: 'Moderate', cases: 7, pepRate: '91%', activeClusters: 1 },
    ];

    return (
      <div className={`my-4 rounded-3xl p-5 border shadow-xl space-y-4 select-none transition-all ${
        isDark ? 'bg-[#141418] border-white/10 text-white' : 'bg-white border-black/8 text-[#1D1D1F]'
      }`}>
        <div className="flex items-center justify-between gap-2 border-b pb-3 border-white/10 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs">High-Burden LGA Surveillance &amp; PEP Coverage</h4>
              <p className="text-[10px] text-gray-400 font-mono">Geospatial Cluster Analysis &bull; Q3 2025</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            5 Priority LGAs
          </span>
        </div>

        {/* LGA Cluster List */}
        <div className="space-y-2">
          {lgaClusters.map((lga) => (
            <div
              key={lga.name}
              className={`p-3 rounded-2xl border flex items-center justify-between gap-3 text-xs transition-all hover:scale-[1.01] ${
                isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-black/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  lga.risk === 'Critical' ? 'bg-red-500 shadow-[0_0_8px_#EF4444]' : lga.risk === 'High' ? 'bg-amber-400' : 'bg-blue-400'
                }`} />
                <div>
                  <span className="font-bold">{lga.name}</span>
                  <span className="text-[10px] text-gray-400 ml-1.5 font-mono">({lga.state})</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right font-mono text-[11px]">
                <div>
                  <span className="text-gray-400 block text-[9px]">Cases</span>
                  <span className="font-bold">{lga.cases}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px]">PEP Coverage</span>
                  <span className="text-[#00D2FF] font-bold">{lga.pepRate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── 3. DRUG SUPPLY CHAIN HEALTH GAUGE (genui:supply) ──────────────────────
  return (
    <div className={`my-4 rounded-3xl p-5 border shadow-xl space-y-4 select-none transition-all ${
      isDark ? 'bg-[#141418] border-white/10 text-white' : 'bg-white border-black/8 text-[#1D1D1F]'
    }`}>
      <div className="flex items-center justify-between gap-2 border-b pb-3 border-white/10 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-blue-500/10 text-[#0071E3] flex items-center justify-center">
            <Package className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs">SDR-PEP &amp; MDT Drug Supply Chain Status</h4>
            <p className="text-[10px] text-gray-400 font-mono">National Depot &bull; South-East Distribution</p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Stock Healthy
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-black/5'}`}>
          <div className="flex justify-between text-xs font-bold mb-1">
            <span>Rifampicin 300mg (SDR-PEP)</span>
            <span className="text-emerald-400">8,420 blisters</span>
          </div>
          <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-[#00D2FF] h-full w-[84%]" />
          </div>
          <span className="text-[9px] text-gray-400 mt-1 block font-mono">8.4 months buffer stock</span>
        </div>

        <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-black/5'}`}>
          <div className="flex justify-between text-xs font-bold mb-1">
            <span>MDT Adult Blister Packs (MB)</span>
            <span className="text-blue-400">3,150 packs</span>
          </div>
          <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#0052CC] to-[#0071E3] h-full w-[72%]" />
          </div>
          <span className="text-[9px] text-gray-400 mt-1 block font-mono">6.2 months buffer stock</span>
        </div>
      </div>
    </div>
  );
};
