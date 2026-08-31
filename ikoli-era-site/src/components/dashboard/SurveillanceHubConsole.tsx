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
  Baby,
  ShieldCheck,
  CheckCheck,
} from 'lucide-react';
import {
  STATES_DATA,
  NATIONAL_SUMMARY,
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
      name: 'UNTH Molecular Reference Laboratory Hub',
      lga: 'Ituku-Ozalla',
      stateName: 'Enugu State',
      stateId: 'enugu',
      cases: 64,
      clinicians: 8,
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
      name: 'UNTH Molecular Reference Laboratory Hub',
      lga: 'Ituku-Ozalla',
      stateName: 'Enugu State',
      stateId: 'enugu',
      cases: 64,
      clinicians: 8,
      stock: 'Optimal (>90d)',
      stockStatus: 'optimal',
      sync: 'Real-time Live',
      syncStatus: 'live',
      connectivity: 'Cellular 4G',
    },
    {
      name: 'Nsukka Model Comprehensive Health Centre',
      lga: 'Nsukka',
      stateName: 'Enugu State',
      stateId: 'enugu',
      cases: 110,
      clinicians: 8,
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
      name: 'Ikwo District Health Centre',
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
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'pcr' | 'meal' | 'monitoring'>('overview');
  const [selectedStateId, setSelectedStateId] = useState<string>('anambra');
  const [powerMode, setPowerMode] = useState<'buruli' | 'leprosy'>('leprosy');
  const [selectedMetricModal, setSelectedMetricModal] = useState<string | null>(null);
  const [livePulseTick, setLivePulseTick] = useState<number>(0);

  const currentState: StateData = STATES_DATA[selectedStateId] || STATES_DATA['anambra'];

  const handleStateChange = (id: string) => {
    setSelectedStateId(id);
    onExploreState?.(id);
  };

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

  // Export to Excel / CSV Functionality (Table 12 & Table 17 Full Concordance)
  const handleExportExcel = () => {
    const rows = [
      ['IKOLI AI EPIDEMIOLOGICAL SURVEILLANCE & MEAL DATASET'],
      ['Platform', 'IKOLI AI (v1.1) • RedAid Nigeria & FMoHSW / NTBLCP'],
      ['Export Date', new Date().toISOString()],
      ['State', currentState.name],
      ['Selected View', activeTab.toUpperCase()],
      [],
      ['EPIDEMIOLOGICAL INDICATOR (2025 BASELINE)', 'VALUE', 'UNIT / OPERATIONAL DEFINITION'],
      ['Total Screened Patients', currentState.totalScreened, 'Patients'],
      ['Active Sentinel Facilities', currentState.activeFacilities, 'PHC Centers & Hospitals'],
      ['New Leprosy Cases (2025)', currentState.leprosyCases, 'Annual Notified'],
      ['Paucibacillary (PB)', currentState.leprosyPB, '6-Month MDT Regimen'],
      ['Multibacillary (MB)', currentState.leprosyMB, '12-Month MDT Regimen'],
      ['Child Cases (<15 yrs)', currentState.childCases, 'Active Community Transmission Index'],
      ['Child Proportion Rate', `${currentState.childRate}%`, 'Target: 0.0% (Zero-Leprosy 2030)'],
      ['Grade-2 Disability (G2D) Cases', currentState.leprosyG2DCases, 'Permanent Disability Count'],
      ['Grade-2 Disability (G2D) Rate', `${currentState.leprosyG2D}%`, 'Target: <4.8%'],
      ['WHO MDT 12-Month Cure Rate', `${currentState.leprosyCureRate}%`, 'Completed MDT Cohort'],
      ['Buruli Ulcer Notified Cases', currentState.buruliCases, 'Total BU Cases'],
      ['Category I Lesions (<5cm)', currentState.buruliCat1, 'Single Nodule/Plaque'],
      ['Category II Lesions (5-15cm)', currentState.buruliCat2, 'Edematous Plaque'],
      ['Category III Lesions (>15cm/Joint)', currentState.buruliCat3, 'Surgical Debridement Candidate'],
      ['IS2404 PCR Confirmed Cases', currentState.buruliPcrCases, 'DNA Molecular Confirmed'],
      ['PCR Confirmation Proportion', `${currentState.buruliPcrRate}%`, 'National Target >70%'],
      ['Clinical Diagnosis Alone', currentState.buruliClinicalCases, 'Physical Staging Only'],
      ['Microscopy / ZN Smears', currentState.buruliMicroscopyCases, 'Acid-Fast Bacilli Direct Smear'],
      ['Specimen-to-Result Linkage (≤7d)', `${currentState.specimenLinkageRate}%`, 'Target ≥90% (Table 12)'],
      ['Avg Lab PCR Turnaround Time', `${currentState.avgLabTurnaroundDays} days`, 'UNTH & Mile 4 Reference Hubs'],
      [],
      ['MEAL & DIGITAL HEALTH QUALITY METRICS (TABLE 12)'],
      ['Reporting Completeness', `${NATIONAL_SUMMARY.reportingCompleteness}%`, 'Target ≥90%'],
      ['Reporting Timeliness', `${NATIONAL_SUMMARY.reportingTimeliness}%`, 'Target ≥85%'],
      ['Technical Ingestion Latency', `${NATIONAL_SUMMARY.ingestionLatencyHours} hours`, 'Target ≤24h'],
      ['Rule Coverage (Arithmetic/Hierarchy)', `${NATIONAL_SUMMARY.ruleCoveragePercent}%`, 'Target 100%'],
      ['High-Priority Exception Resolution', `${NATIONAL_SUMMARY.highPriorityResolutionRate}%`, 'Target ≥80% in 10d'],
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
    link.setAttribute('download', `IKOLI_MEAL_Surveillance_${currentState.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pilotStates = [
    STATES_DATA['all'],
    STATES_DATA['enugu'],
    STATES_DATA['ebonyi'],
    STATES_DATA['anambra'],
    STATES_DATA['abia'],
    STATES_DATA['imo'],
  ].filter(Boolean);

  const currentFacilities = ALL_FACILITIES[selectedStateId] || ALL_FACILITIES['all'];

  // Exact 5-State Historical Data from RedAid Report Table 5 & 17
  const STATE_HISTORICAL_DATA: Record<string, { year: string; leprosy: number; child: number; buruli: number; g2d: number; pcrRate: number; cure: number }[]> = {
    all: [
      { year: '2021', leprosy: 158, child: 9, buruli: 50, g2d: 26.6, pcrRate: 0.4, cure: 81.2 },
      { year: '2022', leprosy: 119, child: 4, buruli: 31, g2d: 25.2, pcrRate: 1.2, cure: 82.8 },
      { year: '2023', leprosy: 225, child: 9, buruli: 46, g2d: 23.1, pcrRate: 0.4, cure: 84.1 },
      { year: '2024', leprosy: 175, child: 11, buruli: 53, g2d: 34.9, pcrRate: 2.7, cure: 86.3 },
      { year: '2025', leprosy: 162, child: 5, buruli: 55, g2d: 21.6, pcrRate: 27.1, cure: 89.2 },
      { year: '2026', leprosy: 120, child: 0, buruli: 40, g2d: 4.8, pcrRate: 78.5, cure: 94.0 },
    ],
    ebonyi: [
      { year: '2021', leprosy: 86, child: 4, buruli: 19, g2d: 24.4, pcrRate: 0.4, cure: 80.5 },
      { year: '2022', leprosy: 73, child: 2, buruli: 2, g2d: 27.4, pcrRate: 1.0, cure: 82.0 },
      { year: '2023', leprosy: 103, child: 5, buruli: 1, g2d: 23.3, pcrRate: 0.4, cure: 83.8 },
      { year: '2024', leprosy: 92, child: 6, buruli: 11, g2d: 39.1, pcrRate: 2.5, cure: 85.0 },
      { year: '2025', leprosy: 59, child: 3, buruli: 11, g2d: 25.4, pcrRate: 31.5, cure: 87.5 },
      { year: '2026', leprosy: 40, child: 0, buruli: 5, g2d: 4.8, pcrRate: 80.0, cure: 93.0 },
    ],
    enugu: [
      { year: '2021', leprosy: 42, child: 5, buruli: 0, g2d: 26.2, pcrRate: 0.0, cure: 83.0 },
      { year: '2022', leprosy: 7, child: 2, buruli: 2, g2d: 28.6, pcrRate: 0.0, cure: 84.5 },
      { year: '2023', leprosy: 43, child: 3, buruli: 1, g2d: 46.5, pcrRate: 0.0, cure: 86.0 },
      { year: '2024', leprosy: 44, child: 5, buruli: 0, g2d: 20.5, pcrRate: 0.0, cure: 88.2 },
      { year: '2025', leprosy: 38, child: 2, buruli: 2, g2d: 31.6, pcrRate: 35.0, cure: 91.4 },
      { year: '2026', leprosy: 25, child: 0, buruli: 0, g2d: 4.8, pcrRate: 85.0, cure: 95.0 },
    ],
    abia: [
      { year: '2021', leprosy: 22, child: 0, buruli: 16, g2d: 40.9, pcrRate: 0.5, cure: 80.0 },
      { year: '2022', leprosy: 26, child: 0, buruli: 14, g2d: 23.1, pcrRate: 1.5, cure: 82.1 },
      { year: '2023', leprosy: 58, child: 0, buruli: 33, g2d: 12.1, pcrRate: 0.4, cure: 84.5 },
      { year: '2024', leprosy: 30, child: 0, buruli: 38, g2d: 50.0, pcrRate: 2.8, cure: 86.0 },
      { year: '2025', leprosy: 43, child: 0, buruli: 38, g2d: 18.6, pcrRate: 26.5, cure: 88.4 },
      { year: '2026', leprosy: 28, child: 0, buruli: 15, g2d: 4.8, pcrRate: 75.0, cure: 93.0 },
    ],
    anambra: [
      { year: '2021', leprosy: 4, child: 0, buruli: 1, g2d: 0.0, pcrRate: 0.0, cure: 85.0 },
      { year: '2022', leprosy: 6, child: 0, buruli: 7, g2d: 16.7, pcrRate: 0.0, cure: 86.2 },
      { year: '2023', leprosy: 6, child: 1, buruli: 11, g2d: 16.7, pcrRate: 0.0, cure: 87.8 },
      { year: '2024', leprosy: 4, child: 0, buruli: 2, g2d: 25.0, pcrRate: 0.0, cure: 88.9 },
      { year: '2025', leprosy: 13, child: 0, buruli: 5, g2d: 0.0, pcrRate: 28.0, cure: 90.1 },
      { year: '2026', leprosy: 8, child: 0, buruli: 1, g2d: 0.0, pcrRate: 80.0, cure: 96.0 },
    ],
    imo: [
      { year: '2021', leprosy: 4, child: 0, buruli: 14, g2d: 25.0, pcrRate: 0.0, cure: 82.0 },
      { year: '2022', leprosy: 7, child: 0, buruli: 6, g2d: 14.3, pcrRate: 0.0, cure: 84.0 },
      { year: '2023', leprosy: 15, child: 0, buruli: 0, g2d: 0.0, pcrRate: 0.0, cure: 86.5 },
      { year: '2024', leprosy: 5, child: 0, buruli: 2, g2d: 0.0, pcrRate: 0.0, cure: 87.8 },
      { year: '2025', leprosy: 9, child: 0, buruli: 2, g2d: 0.0, pcrRate: 25.0, cure: 89.0 },
      { year: '2026', leprosy: 4, child: 0, buruli: 0, g2d: 0.0, pcrRate: 75.0, cure: 95.0 },
    ],
  };

  const stateQuarterlyData = STATE_HISTORICAL_DATA[selectedStateId] || STATE_HISTORICAL_DATA['all'];

  return (
    <section className="bg-[#EBEBEF]/90 backdrop-blur-2xl rounded-[36px] p-4 sm:p-6 md:p-8 border border-black/5 shadow-2xl space-y-6 text-[#1D1D1F] select-none font-sans">
      
      {/* ══════════════════════════════════════════════════════════════════════
          TOP NAVIGATION BAR (Apple Clean Minimalist Style)
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-black/5 pb-4">
        
        {/* Left: Geometric Three-Petal Logo Badge + Official Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1D1D1F] flex items-center justify-center text-white shadow-xs shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="7" r="4" opacity="0.9" />
              <circle cx="7" cy="15" r="4" opacity="0.9" />
              <circle cx="17" cy="15" r="4" opacity="0.9" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-base tracking-tight text-[#1D1D1F]">
                IKOLI AI
              </h2>
              <span className="text-gray-300">/</span>
              <span className="text-xs font-semibold text-gray-600">
                Surveillance Console
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                2025 Baseline
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium">
              National Skin NTD Surveillance &bull; NTBLCP &amp; RedAid Nigeria
            </p>
          </div>
        </div>

        {/* Center: Apple-style Segmented Glass Capsule Switcher (No awkward wrapping) */}
        <div className="w-full lg:w-auto overflow-x-auto scrollbar-none py-0.5">
          <div className="bg-[#E5E5EA] p-1 rounded-full flex items-center gap-1 shrink-0 w-max mx-auto shadow-inner border border-black/5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-white text-[#1D1D1F] shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'bg-white text-[#1D1D1F] shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              Trends
            </button>
            <button
              onClick={() => setActiveTab('pcr')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'pcr'
                  ? 'bg-white text-purple-700 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              <FlaskConical className="w-3 h-3" />
              <span>PCR Labs</span>
            </button>
            <button
              onClick={() => setActiveTab('meal')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'meal'
                  ? 'bg-white text-[#0071E3] shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>MEAL Quality</span>
            </button>
            <button
              onClick={() => setActiveTab('monitoring')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === 'monitoring'
                  ? 'bg-white text-[#1D1D1F] shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              Facilities
            </button>
          </div>
        </div>

        {/* Right: Export to Excel / CSV Minimal Pill Button */}
        <div className="flex items-center gap-2 shrink-0 self-end lg:self-auto">
          <button
            onClick={handleExportExcel}
            className="bg-white hover:bg-[#F5F5F7] text-[#1D1D1F] border border-black/10 px-4 py-1.5 rounded-full text-xs font-semibold shadow-xs flex items-center gap-2 transition-all hover:scale-102 active:scale-98 cursor-pointer group"
            title="Download full dataset in NTBLCP/RedAid MEAL CSV format"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
            <span>Export CSV</span>
            <Download className="w-3 h-3 text-gray-400" />
          </button>
        </div>

      </div>

      {/* ── 5 Pilot States Minimalist Capsule Filter ──────────────────── */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 shrink-0">
          State View:
        </span>
        <div className="flex items-center gap-1.5">
          {pilotStates.map((s) => (
            <button
              key={s.id}
              onClick={() => handleStateChange(s.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap ${
                selectedStateId === s.id
                  ? 'bg-[#0071E3] text-white font-bold shadow-xs'
                  : 'bg-white/80 text-gray-700 hover:text-black hover:bg-white border border-black/5 font-medium'
              }`}
            >
              {s.name.replace(' State', '').replace('South-East Zone (All 5 States)', 'All 5 States')}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 1: OVERVIEW (Bento Grid + Child Transmission + Reference Labs)
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-in fade-in duration-300 text-left">
          
          {/* ── LEFT COLUMN (4 Cols) ─────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
            
            {/* Card 1: Current Conditions Grid */}
            <div className="bg-white rounded-[26px] p-5 shadow-xs border border-black/5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#1D1D1F]">
                    Epidemiological Indicators
                  </h3>
                  <p className="text-[11px] text-gray-400 font-medium">
                    2025 Validated Baseline &bull; {currentState.name}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMetricModal('Epidemiological Baseline Breakdown')}
                  className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 2x2 Metric Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                
                {/* Tile 1: New Leprosy Cases */}
                <div className="bg-[#F6F6F8] rounded-2xl p-3.5 space-y-1">
                  <span className="text-[11px] text-gray-500 font-medium block">
                    New Leprosy Cases
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#1D1D1F] tracking-tight block">
                    {currentState.leprosyCases} <span className="text-xs font-normal text-gray-400">cases</span>
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    PB: {currentState.leprosyPB} | MB: {currentState.leprosyMB}
                  </span>
                </div>

                {/* Tile 2: Grade-2 Disability */}
                <div className="bg-[#F6F6F8] rounded-2xl p-3.5 space-y-1">
                  <span className="text-[11px] text-gray-500 font-medium block">
                    Grade-2 Disability
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#DE322D] tracking-tight block">
                    {currentState.leprosyG2D}%
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {currentState.leprosyG2DCases} cases (Target &lt;4.8%)
                  </span>
                </div>

                {/* Tile 3: Child Cases (New WHO Transmission Indicator) */}
                <div className="bg-amber-50/60 rounded-2xl p-3.5 space-y-1 border border-amber-200/50">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-amber-900 font-bold block flex items-center gap-1">
                      <Baby className="w-3 h-3 text-amber-600" />
                      Child Rate (&lt;15)
                    </span>
                  </div>
                  <span className="text-xl sm:text-2xl font-black text-amber-700 tracking-tight block">
                    {currentState.childRate}%
                  </span>
                  <span className="text-[10px] text-amber-800 font-mono">
                    {currentState.childCases} cases (WHO Target: 0%)
                  </span>
                </div>

                {/* Tile 4: Buruli Ulcer Notified */}
                <div className="bg-[#F6F6F8] rounded-2xl p-3.5 space-y-1">
                  <span className="text-[11px] text-gray-500 font-medium block">
                    Buruli Ulcer Cases
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#0071E3] tracking-tight block">
                    {currentState.buruliCases} <span className="text-xs font-normal text-gray-400">cases</span>
                  </span>
                  <span className="text-[10px] text-emerald-600 font-mono font-bold">
                    PCR Confirmed: {currentState.buruliPcrRate}%
                  </span>
                </div>

              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
                <Info className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                <span>Zero-PII anonymized registry from 312 sentinel health facilities.</span>
              </div>
            </div>

            {/* Card 2: Reference Laboratory Diagnostics & Route Matrix */}
            <div className="bg-white rounded-[26px] p-5 shadow-xs border border-black/5 space-y-3 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#1D1D1F]">
                      Regional Reference Labs
                    </h3>
                    <p className="text-[10px] text-gray-400">
                      IS2404 qPCR and GeneXpert diagnostic telemetry
                    </p>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="space-y-2 text-xs">
                {/* Lab 1 */}
                <div className="p-3 bg-[#F8F9FB] rounded-2xl border border-black/5 space-y-1">
                  <div className="flex items-center justify-between font-bold text-[#1D1D1F]">
                    <span>UNTH Molecular Lab Hub</span>
                    <span className="text-[10px] font-mono text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                      IS2404 PCR Regional Hub
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 flex items-center justify-between">
                    <span>Enugu &amp; South-East qPCR Verification</span>
                    <span className="font-mono text-gray-700">Turnaround: 3.2d</span>
                  </div>
                </div>

                {/* Lab 2 */}
                <div className="p-3 bg-[#F8F9FB] rounded-2xl border border-black/5 space-y-1">
                  <div className="flex items-center justify-between font-bold text-[#1D1D1F]">
                    <span>Mile 4 Hospital Reference Center</span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Specimen &amp; Smear Unit
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 flex items-center justify-between">
                    <span>Abakaliki Clinical Staging &amp; GeneXpert</span>
                    <span className="font-mono text-gray-700">Turnaround: 4.8d</span>
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
                Capital: {currentState.capital} &bull; {currentState.zone}
              </p>
            </div>

            {/* Key Metric Card: Total Active Staging */}
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
                  Child Cases
                </span>
                <span className={`text-base font-black block ${currentState.childCases > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {currentState.childCases}
                </span>
                <span className="text-[10px] font-mono text-gray-400">Transmission</span>
              </div>

              {/* Tile 3 */}
              <div className="bg-[#F8F9FB] rounded-2xl p-3 border border-black/5 text-center space-y-0.5">
                <span className="text-[10px] font-sans font-semibold text-gray-500 uppercase block">
                  PCR Confirmed
                </span>
                <span className="text-base font-black text-purple-600 block">
                  {currentState.buruliPcrRate}%
                </span>
                <span className="text-[10px] font-mono text-gray-400">IS2404 qPCR</span>
              </div>
            </div>

            {/* Diagnostic Modality Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                <span>PCR: {currentState.buruliPcrCases}</span>
                <span>Clinical: {currentState.buruliClinicalCases}</span>
                <span>Smear: {currentState.buruliMicroscopyCases}</span>
              </div>
              <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
                <div 
                  style={{ width: `${Math.round((currentState.buruliPcrCases / (currentState.buruliCases || 1)) * 100)}%` }} 
                  className="h-full bg-purple-600" 
                  title="IS2404 PCR Confirmed"
                />
                <div 
                  style={{ width: `${Math.round((currentState.buruliClinicalCases / (currentState.buruliCases || 1)) * 100)}%` }} 
                  className="h-full bg-[#0071E3]" 
                  title="Clinical Diagnosis"
                />
                <div 
                  style={{ width: `${Math.round((currentState.buruliMicroscopyCases / (currentState.buruliCases || 1)) * 100)}%` }} 
                  className="h-full bg-emerald-500" 
                  title="Microscopy / Smear"
                />
              </div>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={() => setActiveTab('pcr')}
              className="w-full bg-[#1D1D1F] hover:bg-[#0071E3] active:scale-[0.99] text-white py-3 rounded-2xl font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Explore Diagnostic Modalities</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

          </div>

          {/* ── RIGHT COLUMN (4 Cols) ─────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
            
            {/* Top Date Bar */}
            <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-xs border border-black/5 text-xs text-gray-600">
              <div className="flex items-center gap-2 font-medium">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>Reporting Cycle</span>
                <span className="text-gray-300">|</span>
                <span className="font-mono text-gray-500">2025 Reconciled (Aug 2026 Cycle)</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Verified
              </span>
            </div>

            {/* Card 1: Clinical Staging Gauges */}
            <div className="bg-white rounded-[26px] p-5 shadow-xs border border-black/5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-[#1D1D1F]">
                  Disability &amp; Transmission Gauges
                </h3>
                <span className="text-[10px] font-mono text-gray-400 font-bold">WHO 2030 Targets</span>
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
                        stroke="#DE322D"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute bottom-0 text-xl font-black font-mono text-[#1D1D1F]">
                      {currentState.leprosyG2D}%
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono block">
                    G2D Disability (Target &lt;4.8%)
                  </span>
                </div>

                {/* Gauge 2: Child Transmission */}
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
                        d="M 10 50 A 40 40 0 0 1 35 22"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute bottom-0 text-xl font-black font-mono text-[#1D1D1F]">
                      {currentState.childRate}%
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono block">
                    Child Cases (Target: 0%)
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
          TAB 2: ANALYTICS (Longitudinal Epidemiological Trends 2021-2026)
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-in fade-in duration-300 text-left">
          
          {/* Top State Summary Banner */}
          <div className="bg-white rounded-[26px] p-6 shadow-xs border border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0071E3]">
                Longitudinal Multi-Year Surveillance (2021–2026)
              </span>
              <h3 className="text-2xl font-extrabold text-[#1D1D1F]">
                {currentState.name} Epidemiological Trends
              </h3>
              <p className="text-xs text-gray-500">
                Validated against RedAid Nigeria 5-State Leprosy &amp; Buruli Ulcer Registry Dataset.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#F6F6F8] rounded-2xl px-4 py-3 text-center">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">Cure Trajectory</span>
                <strong className="text-base text-emerald-600 font-bold">{currentState.leprosyCureRate}%</strong>
              </div>
              <div className="bg-[#F6F6F8] rounded-2xl px-4 py-3 text-center">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">Child Cases</span>
                <strong className="text-base text-amber-600 font-bold">{currentState.childCases} ({currentState.childRate}%)</strong>
              </div>
              <div className="bg-[#F6F6F8] rounded-2xl px-4 py-3 text-center">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">PCR Confirmation</span>
                <strong className="text-base text-purple-600 font-bold">{currentState.buruliPcrRate}%</strong>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Graph 1: 5-Year Case Notification Trend */}
            <div className="bg-white rounded-[28px] p-6 shadow-xs border border-black/5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-base text-[#1D1D1F]">
                    {currentState.name} Annual Trend (2021–2026)
                  </h4>
                  <p className="text-xs text-gray-500">
                    Leprosy vs Buruli Ulcer case notifications with child transmission tracking
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
                          <span className="opacity-0 group-hover/bar:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-1.5 py-0.5 rounded font-mono z-10 whitespace-nowrap">
                            Lep: {q.leprosy} (Child: {q.child})
                          </span>
                        </div>
                        <div
                          style={{ height: `${burHeight}%` }}
                          className="w-full max-w-[20px] bg-[#F59E0B] rounded-t-md transition-all group-hover/bar:brightness-110 relative"
                        >
                          <span className="opacity-0 group-hover/bar:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-1.5 py-0.5 rounded font-mono z-10 whitespace-nowrap">
                            Buruli: {q.buruli} (PCR: {q.pcrRate}%)
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
                  Leprosy ({currentState.leprosyCases})
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-[#F59E0B]" />
                  Buruli Ulcer ({currentState.buruliCases})
                </span>
              </div>
            </div>

            {/* Graph 2: Sentinel LGA Hotspot Density */}
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
                          ~{Math.round(currentState.totalScreened / (idx + 4))} screened{' '}
                          <span className="text-gray-400 font-normal">({pct}% coverage)</span>
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
                💡 <strong>Surveillance Insight:</strong> Active case finding in {currentState.highRiskLgas[0] || 'endemic LGAs'} with Single-Dose Rifampicin Post-Exposure Prophylaxis (SDR-PEP) breaks the chain of household transmission.
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 3: PCR DIAGNOSTICS & MOLECULAR LAB LINKAGE (Table 7 & Pillar 2)
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'pcr' && (
        <div className="space-y-6 animate-in fade-in duration-300 text-left">
          
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-[#1D1D1F] text-white rounded-[28px] p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-widest text-purple-300 uppercase flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-purple-400" />
                NTBLCP Strategic Pillar 2: Scale-Up of Laboratory PCR Confirmation
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight">
                IS2404 Real-Time qPCR Diagnostic Telemetry
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
                WHO Buruli Ulcer confirmation guidelines require &gt;70% molecular confirmation. In Nigeria, PCR-confirmed cases jumped from 0.4% in 2023 to <strong>27.1% in 2025</strong>, aiming for <strong>78.5% by 2026</strong>.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/10">
                <span className="text-[10px] font-mono uppercase text-purple-200 block">PCR Positivity</span>
                <strong className="text-2xl font-black text-white">{currentState.buruliPcrRate}%</strong>
                <span className="text-[10px] text-emerald-400 block font-mono">IS2404 qPCR</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/10">
                <span className="text-[10px] font-mono uppercase text-purple-200 block">Lab Turnaround</span>
                <strong className="text-2xl font-black text-white">{currentState.avgLabTurnaroundDays}d</strong>
                <span className="text-[10px] text-gray-300 block font-mono">Courier to Result</span>
              </div>
            </div>
          </div>

          {/* 3-Column Diagnostic Modality Breakdown (Table 7) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Card 1: IS2404 qPCR */}
            <div className="bg-white rounded-[26px] p-5 shadow-xs border border-purple-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full">
                  Gold Standard (WHO)
                </span>
                <span className="text-xs font-mono font-bold text-gray-400">{currentState.buruliPcrRate}%</span>
              </div>
              <h4 className="font-extrabold text-base text-[#1D1D1F]">
                IS2404 Real-Time PCR
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                DNA amplification targeting the <em>IS2404</em> sequence of <em>M. ulcerans</em> with &gt;95% diagnostic specificity.
              </p>
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between font-mono text-xs">
                <span className="text-gray-400">Confirmed Cases:</span>
                <strong className="text-purple-700 font-bold">{currentState.buruliPcrCases} cases</strong>
              </div>
            </div>

            {/* Card 2: Direct Clinical Staging */}
            <div className="bg-white rounded-[26px] p-5 shadow-xs border border-black/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full">
                  Bedside Staging
                </span>
                <span className="text-xs font-mono font-bold text-gray-400">53.2%</span>
              </div>
              <h4 className="font-extrabold text-base text-[#1D1D1F]">
                Clinical Lesion Staging
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Category I (&lt;5cm), Category II (5–15cm), and Category III (&gt;15cm) physical identification by trained field officers.
              </p>
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between font-mono text-xs">
                <span className="text-gray-400">Clinical Only:</span>
                <strong className="text-blue-700 font-bold">{currentState.buruliClinicalCases} cases</strong>
              </div>
            </div>

            {/* Card 3: ZN Direct Smear Microscopy */}
            <div className="bg-white rounded-[26px] p-5 shadow-xs border border-black/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                  Light Microscopy
                </span>
                <span className="text-xs font-mono font-bold text-gray-400">19.7%</span>
              </div>
              <h4 className="font-extrabold text-base text-[#1D1D1F]">
                Ziehl-Neelsen (ZN) Smear
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Direct acid-fast bacilli staining from wound edge swabs and fine-needle aspirates (FNA) at district hospital labs.
              </p>
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between font-mono text-xs">
                <span className="text-gray-400">Smear Verified:</span>
                <strong className="text-emerald-700 font-bold">{currentState.buruliMicroscopyCases} cases</strong>
              </div>
            </div>

          </div>

          {/* Reference Laboratories Routing Hubs */}
          <div className="bg-white rounded-[28px] p-6 shadow-xs border border-black/5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-base text-[#1D1D1F]">
                  South-East Sentinel Laboratory Network &amp; Transport Couriers
                </h4>
                <p className="text-xs text-gray-500">
                  Specimen collection, cold-chain transport buffer, and result linkage times
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                {currentState.specimenLinkageRate}% Specimen Linkage in &le;7d
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#F8F9FB] rounded-2xl border border-black/5 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-sm text-[#1D1D1F]">UNTH Molecular Laboratory Hub (Enugu)</strong>
                  <span className="text-[10px] font-mono text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full font-bold">qPCR Central Lab</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Equipped with real-time thermal cyclers and -80°C bio-repository. Serves as the tertiary confirmation center for Enugu, Anambra, and Abia state referrals.
                </p>
                <div className="flex items-center justify-between text-xs font-mono text-gray-500 pt-1">
                  <span>Turnaround Time: 3.2 days</span>
                  <span className="text-emerald-600 font-bold">Specimen Linkage: 94.8%</span>
                </div>
              </div>

              <div className="p-4 bg-[#F8F9FB] rounded-2xl border border-black/5 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-sm text-[#1D1D1F]">Mile 4 Hospital Reference Center (Ebonyi)</strong>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">Frontline Referral Hub</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Operates dedicated leprosy/TB clinical labs, GeneXpert units, and primary wound debridement theatre for Category III complex ulcer cases across the Ebonyi mining basin.
                </p>
                <div className="flex items-center justify-between text-xs font-mono text-gray-500 pt-1">
                  <span>Turnaround Time: 4.8 days</span>
                  <span className="text-emerald-600 font-bold">Specimen Linkage: 89.5%</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 4: MEAL QUALITY & DIGITAL HEALTH GOVERNANCE (Table 12 Framework)
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'meal' && (
        <div className="space-y-6 animate-in fade-in duration-300 text-left">
          
          {/* Top Banner */}
          <div className="bg-white rounded-[26px] p-6 shadow-xs border border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0071E3] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0071E3]" />
                Monitoring, Evaluation, Accountability &amp; Learning (MEAL) Framework
              </span>
              <h3 className="text-2xl font-extrabold text-[#1D1D1F]">
                Digital Data Quality &amp; Governance Matrix
              </h3>
              <p className="text-xs text-gray-500">
                Formal indicators configured per NTBLCP 7th Ed. Guidelines &amp; WHO Data Quality Assurance Modules.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3.5 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                <CheckCheck className="w-4 h-4 text-emerald-600" />
                100% Deterministic Rule Coverage
              </span>
            </div>
          </div>

          {/* 4 MEAL KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* KPI 1 */}
            <div className="bg-white rounded-2xl p-5 border border-black/5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-gray-400 font-bold">Completeness</span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">Target &ge;90%</span>
              </div>
              <span className="text-3xl font-black text-[#1D1D1F] block">{NATIONAL_SUMMARY.reportingCompleteness}%</span>
              <p className="text-[11px] text-gray-500 leading-snug">
                Submissions received vs expected across 312 active reporting units.
              </p>
            </div>

            {/* KPI 2 */}
            <div className="bg-white rounded-2xl p-5 border border-black/5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-gray-400 font-bold">Timeliness</span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">Target &ge;85%</span>
              </div>
              <span className="text-3xl font-black text-[#1D1D1F] block">{NATIONAL_SUMMARY.reportingTimeliness}%</span>
              <p className="text-[11px] text-gray-500 leading-snug">
                Reports received on or before the NTBLCP quarterly submission deadline.
              </p>
            </div>

            {/* KPI 3 */}
            <div className="bg-white rounded-2xl p-5 border border-black/5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-gray-400 font-bold">Ingestion Latency</span>
                <span className="text-[10px] font-mono text-[#0071E3] bg-blue-50 px-2 py-0.5 rounded-full font-bold">Target &le;24h</span>
              </div>
              <span className="text-3xl font-black text-[#0071E3] block">{NATIONAL_SUMMARY.ingestionLatencyHours}h</span>
              <p className="text-[11px] text-gray-500 leading-snug">
                Median time from clinic availability to platform synchronization.
              </p>
            </div>

            {/* KPI 4 */}
            <div className="bg-white rounded-2xl p-5 border border-black/5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-gray-400 font-bold">Exception Resolution</span>
                <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full font-bold">Target &ge;80%</span>
              </div>
              <span className="text-3xl font-black text-purple-700 block">{NATIONAL_SUMMARY.highPriorityResolutionRate}%</span>
              <p className="text-[11px] text-gray-500 leading-snug">
                High-priority validation exceptions resolved in &le;10 working days.
              </p>
            </div>

          </div>

          {/* Indicator Reference Matrix Table */}
          <div className="bg-white rounded-[28px] overflow-hidden shadow-xs border border-black/5 p-6 space-y-4">
            <h4 className="font-extrabold text-base text-[#1D1D1F]">
              Official Indicator Governance &amp; Concordance Status (Table 12)
            </h4>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F9FB] text-gray-500 font-mono text-[10px] uppercase border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4">Core Indicator</th>
                    <th className="py-3 px-4">Primary Working Source</th>
                    <th className="py-3 px-4">2025 Baseline Status</th>
                    <th className="py-3 px-4">National Proposal Target</th>
                    <th className="py-3 px-4">Concordance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-[#1D1D1F]">Grade-2 Disability at Diagnosis</td>
                    <td className="py-3.5 px-4 font-mono text-gray-500">RAN Workbook (5 States)</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#DE322D]">35/162 (21.6%)</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-600">&lt;4.8% (WHO 2030)</td>
                    <td className="py-3.5 px-4"><span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full font-mono text-[10px]">100% Verified</span></td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-[#1D1D1F]">Child Leprosy Proportion</td>
                    <td className="py-3.5 px-4 font-mono text-gray-500">RAN Workbook (Table 5 &amp; 17)</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-600">5/162 (3.1%)</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-600">0.0% (Zero-Transmission)</td>
                    <td className="py-3.5 px-4"><span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full font-mono text-[10px]">100% Verified</span></td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-[#1D1D1F]">Buruli Ulcer PCR Confirmation</td>
                    <td className="py-3.5 px-4 font-mono text-gray-500">NTBLCP ZRM Report (Table 7)</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-purple-700">55/203 (27.1%)</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-600">&gt;70% (Strategic Pillar 2)</td>
                    <td className="py-3.5 px-4"><span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full font-mono text-[10px]">100% Verified</span></td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-[#1D1D1F]">Specimen-Result Linkage</td>
                    <td className="py-3.5 px-4 font-mono text-gray-500">Laboratory Linkage Log</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-700">91.2%</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-600">&ge;90% in &le;7 days</td>
                    <td className="py-3.5 px-4"><span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full font-mono text-[10px]">100% Verified</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 5: MONITORING (Live Sentinel Fleet Telemetry)
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
                <span className="text-gray-500">Child Transmission Cases:</span>
                <span className="font-bold text-amber-600">{currentState.childCases} ({currentState.childRate}%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Buruli Cases (PCR / Clin / Smear):</span>
                <span className="font-bold text-[#F59E0B]">{currentState.buruliPcrCases} / {currentState.buruliClinicalCases} / {currentState.buruliMicroscopyCases}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">PCR IS2404 Turnaround:</span>
                <span className="font-bold text-purple-600">{currentState.avgLabTurnaroundDays} days</span>
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
