import React, { useState, useEffect } from 'react';
import {
  Maximize2,
  Calendar,
  Info,
  TrendingDown,
  MapPin,
  CheckCircle2,
  Wifi,
  Download,
  FileSpreadsheet,
  FlaskConical,
  Zap,
  ArrowUpRight,
} from 'lucide-react';
import {
  STATES_DATA,
  type StateData,
} from '../../data/surveillanceData';

interface SurveillanceHubConsoleProps {
  onExploreState?: (stateId: string) => void;
}

interface FacilityItem {
  name: string;
  lga: string;
  stateName: string;
  stateId: string;
  cases: number;
  clinicians: number;
  stock: string;
  stockStatus: 'optimal' | 'adequate' | 'alert';
  sync: string;
  syncStatus: 'live' | 'pending';
  connectivity: string;
}

const ALL_FACILITIES: Record<string, FacilityItem[]> = {
  all: [
    {
      name: 'Mile 4 Hospital Reference Center',
      lga: 'Abakaliki',
      stateName: 'Ebonyi State',
      stateId: 'ebonyi',
      cases: 210,
      clinicians: 15,
      stock: 'Optimal (>90d)',
      stockStatus: 'optimal',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Cellular 4G',
    },
    {
      name: 'Oji River Specialist Leprosy Hospital',
      lga: 'Oji River',
      stateName: 'Enugu State',
      stateId: 'enugu',
      cases: 184,
      clinicians: 12,
      stock: 'Optimal (>90d)',
      stockStatus: 'optimal',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Cellular 4G',
    },
    {
      name: 'Awka South Model Comprehensive PHC',
      lga: 'Awka South',
      stateName: 'Anambra State',
      stateId: 'anambra',
      cases: 126,
      clinicians: 10,
      stock: 'Optimal (>90d)',
      stockStatus: 'optimal',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Cellular 4G',
    },
    {
      name: 'Oguta General Hospital NTD Wing',
      lga: 'Oguta',
      stateName: 'Imo State',
      stateId: 'imo',
      cases: 114,
      clinicians: 9,
      stock: 'Optimal (>90d)',
      stockStatus: 'optimal',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Cellular 4G',
    },
    {
      name: 'Mbawsi Leprosy Outpost PHC',
      lga: 'Isiala Ngwa North',
      stateName: 'Abia State',
      stateId: 'abia',
      cases: 98,
      clinicians: 8,
      stock: 'Adequate (60d)',
      stockStatus: 'adequate',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Cellular 4G',
    },
    {
      name: 'Izzi Frontier Health Post',
      lga: 'Izzi',
      stateName: 'Ebonyi State',
      stateId: 'ebonyi',
      cases: 118,
      clinicians: 9,
      stock: 'Adequate (45d)',
      stockStatus: 'adequate',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Satellite WAN',
    },
  ],
  enugu: [
    {
      name: 'Oji River Specialist Leprosy Hospital',
      lga: 'Oji River',
      stateName: 'Enugu State',
      stateId: 'enugu',
      cases: 184,
      clinicians: 12,
      stock: 'Optimal (>90d)',
      stockStatus: 'optimal',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Cellular 4G',
    },
    {
      name: 'Udi Comprehensive Health Centre',
      lga: 'Udi',
      stateName: 'Enugu State',
      stateId: 'enugu',
      cases: 72,
      clinicians: 6,
      stock: 'Adequate (60d)',
      stockStatus: 'adequate',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Cellular 4G',
    },
    {
      name: 'Nsukka Urban Model PHC',
      lga: 'Nsukka',
      stateName: 'Enugu State',
      stateId: 'enugu',
      cases: 64,
      clinicians: 5,
      stock: 'Optimal (>90d)',
      stockStatus: 'optimal',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Cellular 4G',
    },
  ],
  ebonyi: [
    {
      name: 'Mile 4 Hospital Reference Center',
      lga: 'Abakaliki',
      stateName: 'Ebonyi State',
      stateId: 'ebonyi',
      cases: 210,
      clinicians: 15,
      stock: 'Optimal (>90d)',
      stockStatus: 'optimal',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Cellular 4G',
    },
    {
      name: 'Izzi Frontier Health Post',
      lga: 'Izzi',
      stateName: 'Ebonyi State',
      stateId: 'ebonyi',
      cases: 118,
      clinicians: 9,
      stock: 'Adequate (45d)',
      stockStatus: 'adequate',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Satellite WAN',
    },
    {
      name: 'Ikwo Central Model PHC',
      lga: 'Ikwo',
      stateName: 'Ebonyi State',
      stateId: 'ebonyi',
      cases: 88,
      clinicians: 7,
      stock: 'Optimal (>90d)',
      stockStatus: 'optimal',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Cellular 4G',
    },
  ],
  anambra: [
    {
      name: 'Awka South Model Comprehensive PHC',
      lga: 'Awka South',
      stateName: 'Anambra State',
      stateId: 'anambra',
      cases: 126,
      clinicians: 10,
      stock: 'Optimal (>90d)',
      stockStatus: 'optimal',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Cellular 4G',
    },
    {
      name: 'Inoma Comprehensive Health Centre',
      lga: 'Anambra West',
      stateName: 'Anambra State',
      stateId: 'anambra',
      cases: 92,
      clinicians: 8,
      stock: 'Adequate (60d)',
      stockStatus: 'adequate',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Satellite WAN',
    },
    {
      name: 'Atani Floodplain Sentinel Health Post',
      lga: 'Ogbaru',
      stateName: 'Anambra State',
      stateId: 'anambra',
      cases: 74,
      clinicians: 6,
      stock: 'Optimal (>90d)',
      stockStatus: 'optimal',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Cellular 4G',
    },
  ],
  abia: [
    {
      name: 'Mbawsi Leprosy Outpost PHC',
      lga: 'Isiala Ngwa North',
      stateName: 'Abia State',
      stateId: 'abia',
      cases: 98,
      clinicians: 8,
      stock: 'Adequate (60d)',
      stockStatus: 'adequate',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Cellular 4G',
    },
    {
      name: 'Bende Specialist Health Centre',
      lga: 'Bende',
      stateName: 'Abia State',
      stateId: 'abia',
      cases: 76,
      clinicians: 6,
      stock: 'Optimal (>90d)',
      stockStatus: 'optimal',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Cellular 4G',
    },
    {
      name: 'Ohafia District Hospital NTD Unit',
      lga: 'Ohafia',
      stateName: 'Abia State',
      stateId: 'abia',
      cases: 58,
      clinicians: 5,
      stock: 'Optimal (>90d)',
      stockStatus: 'optimal',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Satellite WAN',
    },
  ],
  imo: [
    {
      name: 'Oguta General Hospital NTD Wing',
      lga: 'Oguta',
      stateName: 'Imo State',
      stateId: 'imo',
      cases: 114,
      clinicians: 9,
      stock: 'Optimal (>90d)',
      stockStatus: 'optimal',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Cellular 4G',
    },
    {
      name: 'Egbema Community Comprehensive PHC',
      lga: 'Ohaji/Egbema',
      stateName: 'Imo State',
      stateId: 'imo',
      cases: 82,
      clinicians: 7,
      stock: 'Optimal (>90d)',
      stockStatus: 'optimal',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Satellite WAN',
    },
    {
      name: 'Ngor Okpala Sentinel Health Centre',
      lga: 'Ngor Okpala',
      stateName: 'Imo State',
      stateId: 'imo',
      cases: 56,
      clinicians: 5,
      stock: 'Adequate (60d)',
      stockStatus: 'adequate',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Cellular 4G',
    },
  ],
};

export const SurveillanceHubConsole: React.FC<SurveillanceHubConsoleProps> = ({
  onExploreState,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'monitoring'>('overview');
  const [selectedStateId, setSelectedStateId] = useState<string>('anambra');
  const [powerMode, setPowerMode] = useState<'buruli' | 'leprosy'>('leprosy');
  const [selectedMetricModal, setSelectedMetricModal] = useState<string | null>(null);
  const [livePulseTick, setLivePulseTick] = useState<number>(0);

  const currentState: StateData = STATES_DATA[selectedStateId] || STATES_DATA['anambra'];

  const handleStateChange = (id: string) => {
    setSelectedStateId(id);
    onExploreState?.(id);
  };

  // Dynamic live timeline simulation (oscillating active dots & real-time telemetry feed)
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePulseTick((prev) => (prev + 1) % 60);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const timelineColumns = [
    { time: '00:00', activeDots: 2 + ((livePulseTick + 1) % 3), totalDots: 8 },
    { time: '04:00', activeDots: 3 + ((livePulseTick + 2) % 4), totalDots: 8 },
    { time: '08:00', activeDots: 5 + ((livePulseTick + 3) % 4), totalDots: 8 },
    { time: '12:00', activeDots: 6 + ((livePulseTick + 1) % 3), totalDots: 8 },
    { time: '16:00', activeDots: 7 + ((livePulseTick + 4) % 2), totalDots: 8 },
    { time: '20:00', activeDots: 4 + ((livePulseTick + 2) % 3), totalDots: 8 },
  ];

  // Export to Excel / CSV Functionality
  const handleExportExcel = () => {
    const rows = [
      ['IKOLI AI EPIDEMIOLOGICAL SURVEILLANCE DATASET'],
      ['Platform', 'IKOLI AI (v1.1) • RedAid Nigeria & FMoHSW'],
      ['Export Date', new Date().toISOString()],
      ['State', currentState.name],
      ['Selected View', activeTab.toUpperCase()],
      [],
      ['METRIC', 'VALUE', 'UNIT / NOTES'],
      ['Total Screened Patients', currentState.totalScreened, 'Patients'],
      ['Active Sentinel Facilities', currentState.activeFacilities, 'PHC Centers'],
      ['Total Leprosy Cases', currentState.leprosyCases, 'Active Cases'],
      ['Paucibacillary (PB)', currentState.leprosyPB, '6-Month MDT Regimen'],
      ['Multibacillary (MB)', currentState.leprosyMB, '12-Month MDT Regimen'],
      ['Total Buruli Ulcer Cases', currentState.buruliCases, 'Active Cases'],
      ['WHO MDT Cure Rate', `${currentState.leprosyCureRate}%`, '12-Mo Cohort'],
      ['Grade-2 Disability (G2D) Rate', `${currentState.leprosyG2D}%`, 'Target <4.8%'],
      ['IS2404 PCR Turnaround Time', `${currentState.avgLabTurnaroundDays} days`, 'Mile 4 Reference Lab'],
      [],
      ['SENTINEL HEALTHCARE FACILITIES IN ' + currentState.name.toUpperCase()],
      ['Facility Name', 'LGA', 'Active Cases', 'Clinicians', 'MDT Stock Status', 'Connectivity'],
    ];

    const currentFacilities = ALL_FACILITIES[selectedStateId] || ALL_FACILITIES['all'];
    currentFacilities.forEach((f) => {
      rows.push([f.name, f.lga, String(f.cases), String(f.clinicians), f.stock, f.connectivity]);
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.map((cell) => `"${cell}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `IKOLI_Surveillance_${currentState.name.replace(/\s+/g, '_')}_${activeTab}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 5 Pilot States List
  const pilotStates = [
    STATES_DATA['all'],
    STATES_DATA['enugu'],
    STATES_DATA['ebonyi'],
    STATES_DATA['anambra'],
    STATES_DATA['abia'],
    STATES_DATA['imo'],
  ].filter(Boolean);

  // Active facilities for currently selected state
  const currentFacilities = ALL_FACILITIES[selectedStateId] || ALL_FACILITIES['all'];

  // Exact state-level historical trends (2021-2025 actuals + 2026 targets from RAN report)
  const STATE_HISTORICAL_DATA: Record<string, { year: string; leprosy: number; buruli: number; g2d: number; cure: number }[]> = {
    all: [
      { year: '2021', leprosy: 158, buruli: 50, g2d: 26.6, cure: 81.2 },
      { year: '2022', leprosy: 119, buruli: 31, g2d: 25.2, cure: 82.8 },
      { year: '2023', leprosy: 225, buruli: 46, g2d: 23.1, cure: 84.1 },
      { year: '2024', leprosy: 175, buruli: 53, g2d: 34.9, cure: 86.3 },
      { year: '2025', leprosy: 162, buruli: 7, g2d: 21.6, cure: 89.2 },
      { year: '2026', leprosy: 106, buruli: 2, g2d: 4.8, cure: 94.0 },
    ],
    enugu: [
      { year: '2021', leprosy: 42, buruli: 0, g2d: 26.2, cure: 83.0 },
      { year: '2022', leprosy: 7, buruli: 2, g2d: 28.6, cure: 84.5 },
      { year: '2023', leprosy: 43, buruli: 1, g2d: 46.5, cure: 86.0 },
      { year: '2024', leprosy: 44, buruli: 0, g2d: 20.5, cure: 88.2 },
      { year: '2025', leprosy: 38, buruli: 0, g2d: 31.6, cure: 91.4 },
      { year: '2026', leprosy: 24, buruli: 0, g2d: 4.8, cure: 95.0 },
    ],
    ebonyi: [
      { year: '2021', leprosy: 86, buruli: 19, g2d: 24.4, cure: 80.5 },
      { year: '2022', leprosy: 73, buruli: 2, g2d: 27.4, cure: 82.0 },
      { year: '2023', leprosy: 103, buruli: 1, g2d: 23.3, cure: 83.8 },
      { year: '2024', leprosy: 92, buruli: 11, g2d: 39.1, cure: 85.0 },
      { year: '2025', leprosy: 59, buruli: 0, g2d: 25.4, cure: 87.5 },
      { year: '2026', leprosy: 42, buruli: 0, g2d: 4.8, cure: 92.5 },
    ],
    anambra: [
      { year: '2021', leprosy: 4, buruli: 1, g2d: 0.0, cure: 85.0 },
      { year: '2022', leprosy: 6, buruli: 7, g2d: 16.7, cure: 86.2 },
      { year: '2023', leprosy: 6, buruli: 11, g2d: 16.7, cure: 87.8 },
      { year: '2024', leprosy: 4, buruli: 2, g2d: 25.0, cure: 88.9 },
      { year: '2025', leprosy: 13, buruli: 5, g2d: 0.0, cure: 90.1 },
      { year: '2026', leprosy: 8, buruli: 1, g2d: 0.0, cure: 96.0 },
    ],
    abia: [
      { year: '2021', leprosy: 22, buruli: 16, g2d: 40.9, cure: 80.0 },
      { year: '2022', leprosy: 26, buruli: 14, g2d: 23.1, cure: 82.1 },
      { year: '2023', leprosy: 58, buruli: 33, g2d: 12.1, cure: 84.5 },
      { year: '2024', leprosy: 30, buruli: 38, g2d: 50.0, cure: 86.0 },
      { year: '2025', leprosy: 43, buruli: 1, g2d: 18.6, cure: 88.4 },
      { year: '2026', leprosy: 28, buruli: 0, g2d: 4.8, cure: 93.0 },
    ],
    imo: [
      { year: '2021', leprosy: 4, buruli: 14, g2d: 25.0, cure: 82.0 },
      { year: '2022', leprosy: 7, buruli: 6, g2d: 14.3, cure: 84.0 },
      { year: '2023', leprosy: 15, buruli: 0, g2d: 0.0, cure: 86.5 },
      { year: '2024', leprosy: 5, buruli: 2, g2d: 0.0, cure: 87.8 },
      { year: '2025', leprosy: 9, buruli: 1, g2d: 0.0, cure: 89.0 },
      { year: '2026', leprosy: 4, buruli: 0, g2d: 0.0, cure: 95.0 },
    ],
  };

  const stateQuarterlyData = STATE_HISTORICAL_DATA[selectedStateId] || STATE_HISTORICAL_DATA['all'];

  return (
    <section className="bg-[#EBEBEF]/90 backdrop-blur-2xl rounded-[36px] p-4 sm:p-6 md:p-8 border border-black/5 shadow-2xl space-y-6 text-[#1D1D1F] select-none font-sans">
      
      {/* ══════════════════════════════════════════════════════════════════════
          TOP NAVIGATION BAR (Apple Clean Minimalist Style)
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-black/5 pb-5">
        
        {/* Left: Geometric Three-Petal Logo Badge + Exact Renamed Title */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="w-10 h-10 rounded-2xl bg-[#1D1D1F] flex items-center justify-center text-white shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="7" r="4" opacity="0.9" />
              <circle cx="7" cy="15" r="4" opacity="0.9" />
              <circle cx="17" cy="15" r="4" opacity="0.9" />
            </svg>
          </div>
          <div>
            <h2 className="font-extrabold text-base tracking-tight text-[#1D1D1F]">
              IKOLI AI • DASHBOARD
            </h2>
            <p className="text-[11px] text-gray-500 font-medium">
              National Skin NTD Surveillance & Clinical AI Intelligence Platform
            </p>
          </div>
        </div>

        {/* Center: Segmented Floating Pill Switcher */}
        <div className="bg-[#DEDEDE] p-1 rounded-full flex items-center gap-1 shadow-inner">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white text-[#1D1D1F] shadow-sm'
                : 'text-gray-600 hover:text-[#1D1D1F]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-white text-[#1D1D1F] shadow-sm'
                : 'text-gray-600 hover:text-[#1D1D1F]'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'monitoring'
                ? 'bg-white text-[#1D1D1F] shadow-sm'
                : 'text-gray-600 hover:text-[#1D1D1F]'
            }`}
          >
            Monitoring
          </button>
        </div>

        {/* Right: Export to Excel / CSV Action Button + Live Status */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          
          <button
            onClick={handleExportExcel}
            className="bg-white hover:bg-gray-100 text-[#1D1D1F] border border-black/10 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer group"
            title="Download dataset as Microsoft Excel / CSV format"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
            <span>Export Report (Excel/CSV)</span>
            <Download className="w-3 h-3 text-gray-400" />
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 font-medium pl-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] text-gray-600">{currentState.lastUpdated}</span>
          </div>

        </div>

      </div>

      {/* ── 5 Pilot States Fast Switcher ──────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 shrink-0">
          Selected State:
        </span>
        <div className="flex items-center gap-2">
          {pilotStates.map((s) => (
            <button
              key={s.id}
              onClick={() => handleStateChange(s.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedStateId === s.id
                  ? 'bg-[#0071E3] text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:text-black hover:bg-gray-100 border border-black/5'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 1: OVERVIEW (Exact Screenshot Bento Grid + Frontline Sentinel Image)
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-in fade-in duration-300">
          
          {/* ── LEFT COLUMN (4 Cols) ─────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
            
            {/* Card 1: Current Conditions */}
            <div className="bg-white rounded-[26px] p-5 shadow-xs border border-black/5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#1D1D1F]">
                    Current Conditions
                  </h3>
                  <p className="text-[11px] text-gray-400 font-medium">
                    Verified clinical readings • {currentState.name}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMetricModal('Current Conditions Breakdown')}
                  className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 2x2 Metric Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                
                {/* Tile 1: Active Sentinel PHCs */}
                <div className="bg-[#F6F6F8] rounded-2xl p-3.5 space-y-1">
                  <span className="text-[11px] text-gray-500 font-medium block">
                    Active PHCs
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#1D1D1F] tracking-tight block">
                    {currentState.activeFacilities} <span className="text-xs font-normal text-gray-400">sites</span>
                  </span>
                </div>

                {/* Tile 2: MDT Cure Rate */}
                <div className="bg-[#F6F6F8] rounded-2xl p-3.5 space-y-1">
                  <span className="text-[11px] text-gray-500 font-medium block">
                    MDT Cure Rate
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight block">
                    {currentState.leprosyCureRate}%
                  </span>
                </div>

                {/* Tile 3: Total Screened */}
                <div className="bg-[#F6F6F8] rounded-2xl p-3.5 space-y-1">
                  <span className="text-[11px] text-gray-500 font-medium block">
                    Total Screened
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#1D1D1F] tracking-tight block">
                    {currentState.totalScreened.toLocaleString()}
                  </span>
                </div>

                {/* Tile 4: Grade-2 Disability */}
                <div className="bg-[#F6F6F8] rounded-2xl p-3.5 space-y-1">
                  <span className="text-[11px] text-gray-500 font-medium block">
                    G2D Target
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#0071E3] tracking-tight block">
                    {currentState.leprosyG2D}%
                  </span>
                </div>

              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
                <Info className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                <span>Diagnostic verification synced from local health facilities.</span>
              </div>

              <button
                onClick={() => setSelectedMetricModal('Detailed Clinical Telemetry')}
                className="w-full bg-[#1D1D1F] hover:bg-black active:scale-[0.99] text-white py-3 rounded-2xl font-bold text-xs shadow-sm transition-all cursor-pointer"
              >
                View Detailed Report
              </button>
            </div>

            {/* Card 2: MDT Consumption Breakdown */}
            <div className="bg-white rounded-[26px] p-5 shadow-xs border border-black/5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-base text-[#1D1D1F]">
                    MDT Treatment Regimens
                  </h3>
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <button
                  onClick={() => setSelectedMetricModal('MDT Consumption Breakdown')}
                  className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#1D1D1F] tracking-tight">
                  {(currentState.leprosyCases + currentState.buruliCases).toLocaleString()}{' '}
                  <span className="text-xs font-sans font-medium text-gray-500">Active Regimens</span>
                </span>
              </div>

              {/* Split Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#00D26A]" />
                    PB Leprosy: {currentState.leprosyPB}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
                    MB Leprosy: {currentState.leprosyMB}
                  </span>
                </div>

                <div className="h-4 w-full bg-gray-100 rounded-lg overflow-hidden flex">
                  <div
                    style={{ width: `${Math.round((currentState.leprosyPB / (currentState.leprosyCases || 1)) * 100)}%` }}
                    className="h-full bg-[#00D26A] flex items-center justify-center text-[9px] font-bold text-white transition-all"
                  >
                    PB
                  </div>
                  <div
                    style={{ width: `${Math.round((currentState.leprosyMB / (currentState.leprosyCases || 1)) * 100)}%` }}
                    className="h-full bg-[#0071E3] flex items-center justify-center text-[9px] font-bold text-white transition-all"
                  >
                    MB
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Reference Laboratory & Diagnostics Stream (Replaced Static Alerts) */}
            <div className="bg-white rounded-[26px] p-5 shadow-xs border border-black/5 space-y-3.5 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#1D1D1F]">
                      Reference Labs & Diagnostics
                    </h3>
                    <p className="text-[10px] text-gray-400">
                      Real-time PCR confirmation & staging telemetry
                    </p>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="space-y-2 text-xs">
                {/* Lab 1 */}
                <div className="p-3 bg-[#F8F9FB] rounded-2xl border border-black/5 space-y-1">
                  <div className="flex items-center justify-between font-bold text-[#1D1D1F]">
                    <span>Mile 4 Reference Hospital Lab</span>
                    <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      PCR Validated
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 flex items-center justify-between">
                    <span>IS2404 DNA Extraction: Active</span>
                    <span className="font-mono text-gray-700">Turnaround: 4.8d</span>
                  </div>
                </div>

                {/* Lab 2 */}
                <div className="p-3 bg-[#F8F9FB] rounded-2xl border border-black/5 space-y-1">
                  <div className="flex items-center justify-between font-bold text-[#1D1D1F]">
                    <span>Oji River Diagnostic Lab</span>
                    <span className="text-[10px] font-mono text-[#0071E3] bg-[#0071E3]/10 px-2 py-0.5 rounded-full">
                      Slit-Skin Sync
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 flex items-center justify-between">
                    <span>Bacterial Index (BI) Mapping</span>
                    <span className="font-mono text-gray-700">24hr Telemetry</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── CENTER COLUMN: APPLE CLEAN STATE INTELLIGENCE CARD (4 Cols) ───────────── */}
          <div className="lg:col-span-4 bg-white rounded-[28px] p-6 shadow-xs border border-black/5 flex flex-col justify-between space-y-5 text-left">
            
            {/* Top Node Indicator & Status */}
            <div className="flex items-center justify-between border-b border-black/5 pb-3.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_6px_#10B981]" />
                <span className="text-[11px] font-mono font-bold text-gray-700 uppercase tracking-wide">
                  Sentinel Surveillance Node
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#0071E3] bg-[#0071E3]/10 px-2.5 py-0.5 rounded-full border border-[#0071E3]/20">
                Live State Feed
              </span>
            </div>

            {/* State Title & Zone */}
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#1D1D1F] tracking-tight">
                  {currentState.name}
                </h3>
                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {currentState.leprosyCureRate}% Cure Rate
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Capital: {currentState.capital} • {currentState.zone}
              </p>
            </div>

            {/* Key Metric Card: Active Cases */}
            <div className="bg-gradient-to-br from-[#F5F9FF] to-[#EDF4FE] rounded-2xl p-4 border border-[#0071E3]/15 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0071E3] block">
                  Active Clinical Staging
                </span>
                <span className="text-2xl sm:text-3xl font-display font-black text-[#1D1D1F] tracking-tight block">
                  {(currentState.leprosyCases + currentState.buruliCases).toLocaleString()}
                </span>
                <span className="text-[10px] text-gray-500 font-medium">
                  {currentState.leprosyCases} Leprosy + {currentState.buruliCases} Buruli Ulcer
                </span>
              </div>

              <div className="text-right space-y-1">
                <span className="inline-block text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                  G2D: {currentState.leprosyG2D}%
                </span>
                <p className="text-[10px] text-gray-400 font-mono">Target: &lt;4.8%</p>
              </div>
            </div>

            {/* 3 Apple Clean Sub-Tiles */}
            <div className="grid grid-cols-3 gap-2.5">
              {/* Tile 1 */}
              <div className="bg-[#F8F9FB] rounded-2xl p-3 border border-black/5 text-center space-y-0.5">
                <span className="text-[10px] font-sans font-semibold text-gray-500 uppercase block">
                  LGAs Covered
                </span>
                <span className="text-base font-black text-[#1D1D1F] block">
                  {currentState.lgasCovered}
                </span>
                <span className="text-[10px] font-mono text-gray-400">100% Active</span>
              </div>

              {/* Tile 2 */}
              <div className="bg-[#F8F9FB] rounded-2xl p-3 border border-black/5 text-center space-y-0.5">
                <span className="text-[10px] font-sans font-semibold text-gray-500 uppercase block">
                  Sentinel Labs
                </span>
                <span className="text-base font-black text-[#0071E3] block">
                  {currentState.sentinelLabs}
                </span>
                <span className="text-[10px] font-mono text-gray-400">Reference Sites</span>
              </div>

              {/* Tile 3 */}
              <div className="bg-[#F8F9FB] rounded-2xl p-3 border border-black/5 text-center space-y-0.5">
                <span className="text-[10px] font-sans font-semibold text-gray-500 uppercase block">
                  PCR Accuracy
                </span>
                <span className="text-base font-black text-emerald-600 block">
                  {currentState.buruliPcrRate}%
                </span>
                <span className="text-[10px] font-mono text-gray-400">IS2404 Confirmed</span>
              </div>
            </div>

            {/* Staging Distribution Progress */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                <span>PB: {currentState.leprosyPB}</span>
                <span>MB: {currentState.leprosyMB}</span>
                <span>BU: {currentState.buruliCases}</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden flex">
                <div 
                  style={{ width: `${Math.round((currentState.leprosyPB / (currentState.leprosyCases + currentState.buruliCases || 1)) * 100)}%` }} 
                  className="h-full bg-emerald-500" 
                  title="PB Leprosy"
                />
                <div 
                  style={{ width: `${Math.round((currentState.leprosyMB / (currentState.leprosyCases + currentState.buruliCases || 1)) * 100)}%` }} 
                  className="h-full bg-[#0071E3]" 
                  title="MB Leprosy"
                />
                <div 
                  style={{ width: `${Math.round((currentState.buruliCases / (currentState.leprosyCases + currentState.buruliCases || 1)) * 100)}%` }} 
                  className="h-full bg-amber-500" 
                  title="Buruli Ulcer"
                />
              </div>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={() => setSelectedMetricModal(`${currentState.name} Epidemiological Summary`)}
              className="w-full bg-[#1D1D1F] hover:bg-[#0071E3] active:scale-[0.99] text-white py-3 rounded-2xl font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Explore {currentState.name} Telemetry</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

          </div>

          {/* ── RIGHT COLUMN (4 Cols) ─────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
            
            {/* Top Date Bar */}
            <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-xs border border-black/5 text-xs text-gray-600">
              <div className="flex items-center gap-2 font-medium">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>Today</span>
                <span className="text-gray-300">|</span>
                <span className="font-mono text-gray-500">{currentState.lastUpdated}</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Active Feed
              </span>
            </div>

            {/* Card 1: Clinical Staging Metrics (2 SVG Arc Gauges) */}
            <div className="bg-white rounded-[26px] p-5 shadow-xs border border-black/5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-[#1D1D1F]">
                  Clinical Staging Metrics
                </h3>
                <button
                  onClick={() => setSelectedMetricModal('Staging Benchmarks')}
                  className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 2 Semicircular Arc Gauges */}
              <div className="grid grid-cols-2 gap-4 text-center">
                
                {/* Gauge 1: G2D */}
                <div className="flex flex-col items-center space-y-1">
                  <div className="relative w-28 h-16 flex items-end justify-center">
                    <svg className="w-28 h-16" viewBox="0 0 100 55">
                      <path
                        d="M 10 50 A 40 40 0 0 1 90 50"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 10 50 A 40 40 0 0 1 55 12"
                        fill="none"
                        stroke="#0071E3"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute bottom-0 text-xl font-black font-mono text-[#1D1D1F]">
                      {currentState.leprosyG2D}%
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono block">
                    G2D Disability Rate
                  </span>
                </div>

                {/* Gauge 2: Cure Rate */}
                <div className="flex flex-col items-center space-y-1">
                  <div className="relative w-28 h-16 flex items-end justify-center">
                    <svg className="w-28 h-16" viewBox="0 0 100 55">
                      <path
                        d="M 10 50 A 40 40 0 0 1 90 50"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 10 50 A 40 40 0 0 1 80 25"
                        fill="none"
                        stroke="#00D26A"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute bottom-0 text-xl font-black font-mono text-[#1D1D1F]">
                      {currentState.leprosyCureRate}%
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono block">
                    WHO MDT Cure Rate
                  </span>
                </div>

              </div>
            </div>

            {/* Card 2: Interactive Dynamic Screening Timeline */}
            <div className="bg-white rounded-[26px] p-5 shadow-xs border border-black/5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-base text-[#1D1D1F]">
                    Screening Timeline
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>

                <div className="bg-[#F0F0F2] p-0.5 rounded-xl flex items-center text-xs font-semibold">
                  <button
                    onClick={() => setPowerMode('buruli')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      powerMode === 'buruli'
                        ? 'bg-white text-black shadow-xs'
                        : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    Buruli
                  </button>
                  <button
                    onClick={() => setPowerMode('leprosy')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      powerMode === 'leprosy'
                        ? 'bg-[#1D1D1F] text-white shadow-xs'
                        : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    Leprosy
                  </button>
                </div>
              </div>

              {/* Dynamic Animated Dot-Matrix Timeline Grid */}
              <div className="flex items-end justify-between pt-2 px-1">
                {timelineColumns.map((col, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5">
                    <div className="flex flex-col-reverse gap-1">
                      {Array.from({ length: col.totalDots }).map((_, dotIdx) => {
                        const isActive = dotIdx < col.activeDots;
                        return (
                          <div
                            key={dotIdx}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                              isActive
                                ? 'bg-[#00D26A] shadow-[0_0_8px_rgba(0,210,106,0.6)] scale-100'
                                : 'bg-[#E5E7EB] scale-90'
                            }`}
                          />
                        );
                      })}
                    </div>
                    <span className="text-[9px] font-mono text-gray-400 pt-1">
                      {col.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Live Screening Pulse Feed */}
              <div className="p-2.5 bg-[#F6F6F8] rounded-xl flex items-center gap-2 text-[10px] font-mono text-gray-600">
                <Zap className="w-3.5 h-3.5 text-amber-500 animate-pulse shrink-0" />
                <span className="truncate">
                  Live Screening: {currentState.highRiskLgas[0] || 'Mbawsi'} PHC verified {powerMode === 'leprosy' ? 'PB Leprosy lesion' : 'Category I Buruli ulcer'}
                </span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 2: ANALYTICS (State-Reactive Epidemiological Dynamics & Graphs)
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-in fade-in duration-300 text-left">
          
          {/* Top State Summary Banner */}
          <div className="bg-white rounded-[26px] p-6 shadow-xs border border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0071E3]">
                State Epidemiological Profile
              </span>
              <h3 className="text-2xl font-extrabold text-[#1D1D1F]">
                {currentState.name} Longitudinal Analytics
              </h3>
              <p className="text-xs text-gray-500">
                10-quarter historical trends from 2024 Q1 to 2026 Q2 across {currentState.lgasCovered} LGAs.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#F6F6F8] rounded-2xl px-4 py-3 text-center">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">Cure Trajectory</span>
                <strong className="text-base text-emerald-600 font-bold">{currentState.leprosyCureRate}%</strong>
              </div>
              <div className="bg-[#F6F6F8] rounded-2xl px-4 py-3 text-center">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">G2D Reduction</span>
                <strong className="text-base text-[#0071E3] font-bold">{currentState.leprosyG2D}%</strong>
              </div>
              <div className="bg-[#F6F6F8] rounded-2xl px-4 py-3 text-center">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">Lab Turnaround</span>
                <strong className="text-base text-black font-bold">{currentState.avgLabTurnaroundDays}d</strong>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Graph 1: State Specific Longitudinal Trend */}
            <div className="bg-white rounded-[28px] p-6 shadow-xs border border-black/5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-base text-[#1D1D1F]">
                    {currentState.name} Case Reduction (2024–2026)
                  </h4>
                  <p className="text-xs text-gray-500">
                    Quarterly active cases tracking Leprosy & Buruli Ulcer
                  </p>
                </div>
                <TrendingDown className="w-5 h-5 text-emerald-600" />
              </div>

              {/* Bar Chart Visualizer */}
              <div className="h-56 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-gray-100">
                {stateQuarterlyData.map((q, idx) => {
                  const maxVal = Math.max(...stateQuarterlyData.map(d => d.leprosy + d.buruli), 1);
                  const lepHeight = Math.round((q.leprosy / maxVal) * 100);
                  const burHeight = Math.round((q.buruli / maxVal) * 100);

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group/bar">
                      <div className="w-full flex items-end justify-center gap-1 h-44">
                        <div
                          style={{ height: `${lepHeight}%` }}
                          className="w-full max-w-[20px] bg-[#0071E3] rounded-t-md transition-all group-hover/bar:brightness-110 relative"
                        >
                          <span className="opacity-0 group-hover/bar:opacity-100 transition-opacity absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-1.5 py-0.5 rounded font-mono z-10 whitespace-nowrap">
                            Lep: {q.leprosy}
                          </span>
                        </div>
                        <div
                          style={{ height: `${burHeight}%` }}
                          className="w-full max-w-[20px] bg-[#F59E0B] rounded-t-md transition-all group-hover/bar:brightness-110 relative"
                        >
                          <span className="opacity-0 group-hover/bar:opacity-100 transition-opacity absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-1.5 py-0.5 rounded font-mono z-10 whitespace-nowrap">
                            Bur: {q.buruli}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 font-bold">{q.year}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-6 text-xs font-semibold text-gray-600">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-[#0071E3]" />
                  Leprosy Cases ({currentState.leprosyCases})
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-[#F59E0B]" />
                  Buruli Ulcer ({currentState.buruliCases})
                </span>
              </div>
            </div>

            {/* Graph 2: Sentinel LGA Density & Hotspot Distribution */}
            <div className="bg-white rounded-[28px] p-6 shadow-xs border border-black/5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-base text-[#1D1D1F]">
                    {currentState.name} Sentinel LGA Density
                  </h4>
                  <p className="text-xs text-gray-500">
                    High-risk local government monitoring distribution
                  </p>
                </div>
                <MapPin className="w-5 h-5 text-[#0071E3]" />
              </div>

              <div className="space-y-3.5 pt-2">
                {currentState.highRiskLgas.map((lga, idx) => {
                  const pct = Math.max(90 - idx * 12, 35);
                  return (
                    <div key={lga} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                        <span>{lga} LGA</span>
                        <span className="font-mono text-[#0071E3]">
                          ~{Math.round(currentState.totalScreened / (idx + 4))} cases{' '}
                          <span className="text-gray-400 font-normal">({pct}% screened)</span>
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${pct}%` }}
                          className="h-full bg-gradient-to-r from-[#0071E3] to-[#00D2FF] rounded-full transition-all duration-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200/50 text-[11px] text-amber-900 leading-relaxed">
                💡 <strong>Surveillance Insight:</strong> Routine early screening in {currentState.highRiskLgas[0] || 'primary LGAs'} prevents Grade-2 permanent disabilities before nerve impairment occurs.
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 3: MONITORING (Live Sentinel Facility Fleet & Logistics Status)
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'monitoring' && (
        <div className="space-y-6 animate-in fade-in duration-300 text-left">
          
          {/* Header Banner */}
          <div className="bg-white rounded-[26px] p-6 shadow-xs border border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                Live Sentinel Fleet Telemetry
              </span>
              <h3 className="text-2xl font-extrabold text-[#1D1D1F]">
                {currentState.name} Sentinel Facilities ({currentFacilities.length} Active Nodes)
              </h3>
              <p className="text-xs text-gray-500">
                Frontline connectivity, cold-chain status, and MDT medicine inventories.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                100% Nodes Online
              </span>
            </div>
          </div>

          {/* Facility Table */}
          <div className="bg-white rounded-[28px] overflow-hidden shadow-xs border border-black/5">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F9FB] text-gray-500 font-mono text-[10px] uppercase border-b border-gray-200">
                  <tr>
                    <th className="py-3.5 px-5">Sentinel Facility</th>
                    <th className="py-3.5 px-4">LGA / Zone</th>
                    <th className="py-3.5 px-4">Active Cases</th>
                    <th className="py-3.5 px-4">Clinicians</th>
                    <th className="py-3.5 px-4">MDT Stock Buffer</th>
                    <th className="py-3.5 px-4">Sync Status</th>
                    <th className="py-3.5 px-5">Connectivity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {currentFacilities.map((f, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3.5 px-5 font-bold text-[#1D1D1F]">
                        {f.name}
                      </td>
                      <td className="py-3.5 px-4 text-gray-500">
                        {f.lga}, {f.stateName}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#0071E3]">
                        {f.cases}
                      </td>
                      <td className="py-3.5 px-4">
                        {f.clinicians} Staff
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          f.stockStatus === 'optimal'
                            ? 'bg-emerald-50 text-emerald-700'
                            : f.stockStatus === 'adequate'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          {f.stock}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          {f.sync}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 font-mono text-gray-500 flex items-center gap-1.5">
                        <Wifi className="w-3.5 h-3.5 text-gray-400" />
                        {f.connectivity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ── Metric Details Modal ─────────────────────────────────────── */}
      {selectedMetricModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-black/10 space-y-4 text-left animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-lg text-[#1D1D1F]">
                {selectedMetricModal}
              </h3>
              <button
                onClick={() => setSelectedMetricModal(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              Live telemetry is streamed directly from {currentState.name}’s {currentState.activeFacilities} primary health centres, validated via RedAid Nigeria and NTBLCP national protocols.
            </p>

            <div className="p-4 bg-[#F8F9FB] rounded-2xl border border-black/5 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-gray-500">State:</span>
                <span className="font-bold text-black">{currentState.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Leprosy Cases (PB/MB):</span>
                <span className="font-bold text-[#0071E3]">{currentState.leprosyPB} / {currentState.leprosyMB}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Buruli Cases:</span>
                <span className="font-bold text-[#F59E0B]">{currentState.buruliCases}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">PCR IS2404 Speed:</span>
                <span className="font-bold text-emerald-600">{currentState.avgLabTurnaroundDays} days</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedMetricModal(null)}
              className="w-full bg-[#1D1D1F] hover:bg-black text-white py-3 rounded-2xl font-bold text-xs shadow-sm cursor-pointer"
            >
              Close Telemetry Modal
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
