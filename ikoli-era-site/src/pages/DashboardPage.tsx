import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { InteractiveMap } from '../components/InteractiveMap';
import { WHODashboardHeader } from '../components/dashboard/WHODashboardHeader';
import { WHOKPISummary } from '../components/dashboard/WHOKPISummary';
import { CaseRegistryTable } from '../components/dashboard/CaseRegistryTable';
import { ClinicalTrendsVisualizer } from '../components/dashboard/ClinicalTrendsVisualizer';
import { FacilityTelemetryMatrix } from '../components/dashboard/FacilityTelemetryMatrix';
import { ZeroPIIAuditDrawer } from '../components/dashboard/ZeroPIIAuditDrawer';
import { STATES_DATA } from '../data/surveillanceData';
import {
  Layers,
  MapPin,
  TrendingUp,
  Building2,
  ClipboardList,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: 'home' | 'dashboard' | 'diseases' | 'ask') => void;
}

export type WHODashboardTab = 'overview' | 'map' | 'trends' | 'registry' | 'facilities' | 'audit';

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [selectedStateId, setSelectedStateId] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<WHODashboardTab>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAuditDrawerOpen, setIsAuditDrawerOpen] = useState<boolean>(false);

  const currentState = STATES_DATA[selectedStateId] || STATES_DATA.all;

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'State,Zone,Leprosy Total,Leprosy MB,Leprosy PB,G2D Rate (%),Cure Rate (%),Buruli Total,Buruli Cat 1,Buruli Cat 2,Buruli Cat 3,Buruli PCR Rate (%),Active Facilities,PCR Turnaround (Days)\n' +
      Object.values(STATES_DATA)
        .map(
          (s) =>
            `"${s.name}","${s.zone}",${s.leprosyCases},${s.leprosyMB},${s.leprosyPB},${s.leprosyG2D},${s.leprosyCureRate},${s.buruliCases},${s.buruliCat1},${s.buruliCat2},${s.buruliCat3},${s.buruliPcrRate},${s.activeFacilities},${s.avgLabTurnaroundDays}`
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ikoli_who_surveillance_${selectedStateId}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navTabs = [
    { id: 'overview' as WHODashboardTab, label: 'Overview & Highlights', icon: <Layers className="w-4 h-4" /> },
    { id: 'map' as WHODashboardTab, label: 'Geospatial & LGA Surveillance', icon: <MapPin className="w-4 h-4" /> },
    { id: 'trends' as WHODashboardTab, label: '10-Quarter Trajectory', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'registry' as WHODashboardTab, label: 'Active Case Registry', icon: <ClipboardList className="w-4 h-4" /> },
    { id: 'facilities' as WHODashboardTab, label: 'Sentinel Facilities', icon: <Building2 className="w-4 h-4" /> },
    { id: 'audit' as WHODashboardTab, label: 'Data Trust & Zero-PII Audit', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A0C10] font-sans flex flex-col selection:bg-[#0082FF] selection:text-white">
      
      {/* ── Official Institutional Top Bar (WHO Data Portal Standard) ── */}
      <div className="w-full bg-[#0A0C10] text-gray-400 text-[10px] sm:text-[11px] font-mono py-2 px-4 sm:px-8 md:px-16 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 z-50 select-none">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold tracking-wider">FEDERAL REPUBLIC OF NIGERIA</span>
          <span className="hidden sm:inline text-gray-600">•</span>
          <span className="hidden sm:inline text-gray-300">National Tuberculosis, Buruli Ulcer & Leprosy Control Programme (NTBLCP)</span>
        </div>
        <div className="flex items-center gap-4 text-gray-300">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>WHO 2030 Roadmap Node Active</span>
          </span>
          <span className="text-gray-600">|</span>
          <button
            onClick={() => setIsAuditDrawerOpen(true)}
            className="text-gray-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>NDPR Certified (Zero-PII)</span>
          </button>
        </div>
      </div>

      {/* ── Main Site Navigation ──────────────────────────────── */}
      <Navbar currentPage="dashboard" onNavigate={onNavigate} />

      {/* ── Main Data Portal Container ────────────────────────── */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-6 sm:py-8 space-y-8">
        
        {/* ── WHO-Style Hero Header & Filter Controls ─────────── */}
        <WHODashboardHeader
          selectedStateId={selectedStateId}
          onSelectState={(stId) => setSelectedStateId(stId)}
          onExportCSV={handleExportCSV}
          onNavigate={onNavigate}
          onOpenAudit={() => setIsAuditDrawerOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* ── Level 1 & 2: Primary Key Indicators Spotlight ─────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between text-left">
            <h2 className="font-display font-black text-xl text-[#0A0C10] tracking-tight">
              Primary Surveillance Indicators ({currentState.name})
            </h2>
            <span className="text-xs font-mono text-gray-500">
              WHO 2030 NTD Elimination Target Alignment
            </span>
          </div>

          <WHOKPISummary stateData={currentState} />
        </section>

        {/* ── Level 3 & 4: Deep Data Exploration Tabs ──────────── */}
        <section className="space-y-6">
          <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 bg-slate-200/70 rounded-2xl font-mono text-xs select-none">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#0A0C10] shadow-2xs'
                      : 'text-gray-600 hover:text-black hover:bg-white/50'
                  }`}
                >
                  <span className={isActive ? 'text-[#0082FF]' : 'text-gray-400'}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ── TAB 1: OVERVIEW & HIGHLIGHTS ─────────────────── */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Interactive Geospatial Sentinel Map Container */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 sm:p-8 space-y-4 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-[#0A0C10]">
                      Geospatial Sentinel Network & Cluster Density
                    </h3>
                    <p className="text-xs text-gray-500 font-sans mt-0.5">
                      Interactive telemetry across 5 pilot states. Select any state node to filter epidemiological indicators.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('map')}
                    className="text-xs font-mono font-bold text-[#0082FF] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Expand High-Risk LGA Matrix</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <InteractiveMap
                  selectedStateId={selectedStateId}
                  onSelectState={(stId) => setSelectedStateId(stId)}
                />
              </div>

              {/* Curated WHO Data Stories / Analytical Takeaways */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                
                {/* Story 1: Early Buruli Shift */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between hover:border-[#0082FF]/40 transition-colors">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-[#7d1a4a] bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100 uppercase">
                      Clinical Milestone
                    </span>
                    <h4 className="font-display font-extrabold text-lg text-[#0A0C10] leading-snug">
                      Buruli Ulcer Early Presentation Reaches 64% (Category I)
                    </h4>
                    <p className="text-xs text-gray-600 font-sans leading-relaxed">
                      Community-led mobile AI image triage shifted detection away from severe Category III ulcerations (&gt;15cm), drastically reducing surgical debridement requirements.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('trends')}
                    className="text-xs font-mono font-bold text-[#0082FF] hover:underline flex items-center gap-1 pt-2 cursor-pointer"
                  >
                    <span>View Staging Breakdown</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Story 2: Grade-2 Disability Reduction */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 uppercase">
                      Disability Elimination
                    </span>
                    <h4 className="font-display font-extrabold text-lg text-[#0A0C10] leading-snug">
                      Grade-2 Nerve Disability Curtailment Drops to 11.4%
                    </h4>
                    <p className="text-xs text-gray-600 font-sans leading-relaxed">
                      Routine Voluntary Muscle Testing (VMT) and sensory monofilament screening at Oji River and Mile 4 reference centers prevented permanent clawing in 88% of cases.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('trends')}
                    className="text-xs font-mono font-bold text-emerald-700 hover:underline flex items-center gap-1 pt-2 cursor-pointer"
                  >
                    <span>Inspect G2D Trajectory</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Story 3: Zero-PII Trust Protocol */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between hover:border-blue-500/40 transition-colors">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 uppercase">
                      Governance & Security
                    </span>
                    <h4 className="font-display font-extrabold text-lg text-[#0A0C10] leading-snug">
                      100% Zero-PII Compliance with Ephemeral Edge Vectorization
                    </h4>
                    <p className="text-xs text-gray-600 font-sans leading-relaxed">
                      Zero patient biometric imagery is ever transmitted or stored off-device. All DHIS2 synchronization utilizes SHA-256 HMAC cryptographic token vectors.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAuditDrawerOpen(true)}
                    className="text-xs font-mono font-bold text-[#0082FF] hover:underline flex items-center gap-1 pt-2 cursor-pointer"
                  >
                    <span>View Cryptographic Ledger</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Case Registry Preview */}
              <CaseRegistryTable
                selectedStateId={selectedStateId}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />

            </div>
          )}

          {/* ── TAB 2: GEOSPATIAL & LGA SURVEILLANCE ──────────── */}
          {activeTab === 'map' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6 text-left animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-display font-extrabold text-2xl text-[#0A0C10]">
                    Geospatial Risk Matrix & LGA Hotspot Clusters
                  </h3>
                  <p className="text-xs text-gray-500 font-sans mt-0.5">
                    Sentinel radar telemetry across 95 Local Government Areas (LGAs) in South-East Nigeria.
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-gray-400">High Risk Focus LGAs:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentState.highRiskLgas.map((lga, i) => (
                      <span key={i} className="bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-md font-bold text-[10px] border border-rose-200">
                        {lga}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <InteractiveMap
                selectedStateId={selectedStateId}
                onSelectState={(stId) => setSelectedStateId(stId)}
              />
            </div>
          )}

          {/* ── TAB 3: 10-QUARTER LONGITUDINAL TRAJECTORY ─────── */}
          {activeTab === 'trends' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <ClinicalTrendsVisualizer />
            </div>
          )}

          {/* ── TAB 4: ACTIVE CASE REGISTRY ───────────────────── */}
          {activeTab === 'registry' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <CaseRegistryTable
                selectedStateId={selectedStateId}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
          )}

          {/* ── TAB 5: SENTINEL FACILITIES & MDT SUPPLY MATRIX ── */}
          {activeTab === 'facilities' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <FacilityTelemetryMatrix selectedStateId={selectedStateId} />
            </div>
          )}

          {/* ── TAB 6: ZERO-PII DATA TRUST & AUDIT ─────────────── */}
          {activeTab === 'audit' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6 text-left animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-2xl text-[#0A0C10]">
                      Zero-PII Compliance & Cryptographic Audit Ledger
                    </h3>
                    <p className="text-xs text-gray-500 font-sans">
                      Verified cryptographic token hashes, NDPR regulatory alignment, and federal DHIS2 ingestion logs.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => alert('Exporting signed Zero-PII Cryptographic Audit Certificate (PDF)...')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-sm cursor-pointer"
                >
                  Export Signed Audit Cert
                </button>
              </div>

              {/* Full view trigger */}
              <div className="space-y-4 font-mono text-xs">
                <p className="text-gray-600 font-sans leading-relaxed text-sm">
                  IKOLI AI enforces a strict zero-exposure data governance model. Clinical photographs captured by field health workers on Android tablets are processed exclusively inside volatile RAM using edge neural models. Only non-reversible 256-bit HMAC vector signatures are retained for epidemiological aggregation.
                </p>

                <button
                  onClick={() => setIsAuditDrawerOpen(true)}
                  className="bg-[#0A0C10] hover:bg-[#0082FF] text-white px-5 py-3 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Open Interactive Audit Dossier</span>
                </button>
              </div>
            </div>
          )}

        </section>

      </main>

      {/* ── Slide-Over Zero-PII Audit Drawer ─────────────────── */}
      <ZeroPIIAuditDrawer
        isOpen={isAuditDrawerOpen}
        onClose={() => setIsAuditDrawerOpen(false)}
      />

      {/* ── Institutional Sticky Reveal Curtain Footer ────────── */}
      <Footer onNavigate={onNavigate} />

    </div>
  );
};
