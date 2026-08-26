import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { InteractiveMap } from '../components/InteractiveMap';
import { CaseRegistryTable } from '../components/dashboard/CaseRegistryTable';
import { ClinicalTrendsVisualizer } from '../components/dashboard/ClinicalTrendsVisualizer';
import { FacilityTelemetryMatrix } from '../components/dashboard/FacilityTelemetryMatrix';
import { ZeroPIIAuditDrawer } from '../components/dashboard/ZeroPIIAuditDrawer';
import { STATES_DATA } from '../data/surveillanceData';
import {
  Search,
  Bell,
  User,
  Settings,
  MoreVertical,
  Globe,
  LayoutDashboard,
  ClipboardList,
  Table,
  MapPin,
  BarChart3,
  ShieldCheck,
  Sparkles,
  Download,
  TrendingDown,
  Activity,
  Plus,
  Minus,
  ChevronRight,
  ChevronDown,
  Clock,
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: 'home' | 'dashboard' | 'diseases' | 'ask') => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [selectedStateId, setSelectedStateId] = useState<string>('all');
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAuditDrawerOpen, setIsAuditDrawerOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);

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
    link.setAttribute('download', `ikoli_surveillance_${selectedStateId}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stateRanking = [
    { id: 'enugu', name: 'Enugu State', flag: '🟢', cases: 1140, pct: '40.1%', g2d: '10.2%', pcr: '82%' },
    { id: 'ebonyi', name: 'Ebonyi State', flag: '🟢', cases: 880, pct: '31.0%', g2d: '12.5%', pcr: '79%' },
    { id: 'anambra', name: 'Anambra State', flag: '🟢', cases: 450, pct: '15.8%', g2d: '11.0%', pcr: '76%' },
    { id: 'abia', name: 'Abia State', flag: '🟢', cases: 230, pct: '8.1%', g2d: '13.1%', pcr: '74%' },
    { id: 'imo', name: 'Imo State', flag: '🟢', cases: 142, pct: '5.0%', g2d: '11.8%', pcr: '78%' },
  ];

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-[#333333] font-sans flex flex-col selection:bg-[#E91E63] selection:text-white">
      
      {/* ── Main Site Navigation Header ──────────────────────── */}
      <Navbar currentPage="dashboard" onNavigate={onNavigate} />

      {/* ── Dashboard App Container ──────────────────────────── */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto px-3 sm:px-6 md:px-8 py-6">
        
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* ══════════════════════════════════════════════════════
              LEFT SIDEBAR (Creative Tim Dark Panel Style)
             ══════════════════════════════════════════════════════ */}
          <aside className="w-full lg:w-64 shrink-0 bg-[#1A2035] text-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/5 self-start">
            
            {/* Sidebar Brand Header */}
            <div className="p-5 border-b border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E91E63] to-[#FF5252] flex items-center justify-center font-bold text-white text-sm shadow-md">
                IK
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-black text-sm tracking-wider uppercase text-white">
                  IKOLI AI
                </span>
                <span className="text-[10px] font-mono text-gray-400">
                  Surveillance Matrix
                </span>
              </div>
            </div>

            {/* User Profile Pill */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0082FF] to-[#00D2FF] flex items-center justify-center text-xs font-bold text-white shadow-sm border border-white/20">
                  AO
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-white leading-tight">
                    Dr. Amaka Okafor
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    Lead Epidemiologist
                  </span>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {/* Sidebar Navigation Items */}
            <nav className="p-3 space-y-1.5 font-sans text-xs flex-1">
              
              {/* Dashboard Item */}
              <button
                onClick={() => setActiveMenu('dashboard')}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-bold transition-all text-left cursor-pointer ${
                  activeMenu === 'dashboard'
                    ? 'bg-gradient-to-r from-[#E91E63] to-[#FF4081] text-white shadow-lg shadow-[#E91E63]/30'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              {/* Geospatial Map */}
              <button
                onClick={() => setActiveMenu('map')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all text-left cursor-pointer ${
                  activeMenu === 'map'
                    ? 'bg-gradient-to-r from-[#E91E63] to-[#FF4081] text-white shadow-lg shadow-[#E91E63]/30'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <MapPin className="w-4 h-4" />
                  <span>Geospatial Radar</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {/* Case Registry Tables */}
              <button
                onClick={() => setActiveMenu('tables')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all text-left cursor-pointer ${
                  activeMenu === 'tables'
                    ? 'bg-gradient-to-r from-[#E91E63] to-[#FF4081] text-white shadow-lg shadow-[#E91E63]/30'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Table className="w-4 h-4" />
                  <span>Case Registry</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {/* Facility Logistics */}
              <button
                onClick={() => setActiveMenu('facilities')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all text-left cursor-pointer ${
                  activeMenu === 'facilities'
                    ? 'bg-gradient-to-r from-[#E91E63] to-[#FF4081] text-white shadow-lg shadow-[#E91E63]/30'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <ClipboardList className="w-4 h-4" />
                  <span>Sentinel Logistics</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {/* Longitudinal Charts */}
              <button
                onClick={() => setActiveMenu('charts')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all text-left cursor-pointer ${
                  activeMenu === 'charts'
                    ? 'bg-gradient-to-r from-[#E91E63] to-[#FF4081] text-white shadow-lg shadow-[#E91E63]/30'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <BarChart3 className="w-4 h-4" />
                  <span>10-Qtr Analytics</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {/* Zero-PII Audit Ledger */}
              <button
                onClick={() => {
                  setActiveMenu('audit');
                  setIsAuditDrawerOpen(true);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all text-left cursor-pointer ${
                  activeMenu === 'audit'
                    ? 'bg-gradient-to-r from-[#059669] to-[#10B981] text-white shadow-lg shadow-emerald-500/30'
                    : 'text-emerald-400 hover:bg-white/10 hover:text-emerald-300'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Zero-PII Audit</span>
                </div>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">
                  NDPR
                </span>
              </button>

            </nav>

            {/* Sidebar Bottom WHO Accreditation Badge */}
            <div className="p-4 bg-black/20 border-t border-white/5 text-[10px] font-mono text-gray-400 space-y-1">
              <div className="flex items-center justify-between text-white font-bold">
                <span>WHO 2030 NODE</span>
                <span className="text-emerald-400">ACTIVE</span>
              </div>
              <p className="text-gray-500">Nigeria NTBLCP Sentinel Hub</p>
            </div>

          </aside>

          {/* ══════════════════════════════════════════════════════
              MAIN DASHBOARD BODY (Creative Tim Content Area)
             ══════════════════════════════════════════════════════ */}
          <div className="flex-1 space-y-8 text-left">
            
            {/* ── Top Header Navigation Bar (Dashboard breadcrumb, search, icons) ── */}
            <header className="bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
              
              {/* Left: Breadcrumb & Title */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveMenu('dashboard')}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
                  title="Toggle Dashboard Menu"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-gray-400">Pages / Surveillance</span>
                  <h2 className="font-display font-bold text-lg text-slate-800 tracking-tight leading-none">
                    Dashboard Overview
                  </h2>
                </div>
              </div>

              {/* Right: Search, Notifications & Actions */}
              <div className="flex items-center gap-3">
                
                {/* Search input with pill button */}
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search surveillance..."
                    className="w-44 sm:w-60 bg-transparent text-xs text-slate-800 placeholder-gray-400 py-2 pl-3 pr-9 border-b border-gray-300 focus:border-[#E91E63] focus:outline-none transition-colors font-sans"
                  />
                  <button
                    onClick={() => {}}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-gray-600 flex items-center justify-center absolute right-0 cursor-pointer transition-colors shadow-2xs"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Notifications Bell with Badge */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="w-9 h-9 rounded-xl hover:bg-slate-100 text-gray-600 flex items-center justify-center transition-colors relative cursor-pointer"
                  >
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#E91E63] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                      5
                    </span>
                  </button>

                  {/* Dropdown notification popup */}
                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl p-4 z-50 space-y-2 text-xs">
                      <div className="font-bold text-slate-900 border-b pb-2">
                        Surveillance Notifications (5)
                      </div>
                      <div className="text-[11px] space-y-1.5 text-gray-600">
                        <div className="p-2 rounded-lg bg-rose-50 text-rose-800 border border-rose-100">
                          🚨 <strong>Oji River LGA:</strong> 3 new Category I Buruli cases verified via PCR.
                        </div>
                        <div className="p-2 rounded-lg bg-blue-50 text-blue-800 border border-blue-100">
                          📦 <strong>Mile 4 Hospital:</strong> MDT blister packs restocked (+200 buffer).
                        </div>
                        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
                          ✅ <strong>Zero-PII Audit:</strong> Daily cryptographic HMAC vector verified.
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Icon */}
                <button
                  onClick={() => onNavigate('ask')}
                  className="w-9 h-9 rounded-xl hover:bg-slate-100 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
                  title="Ask Ikoli AI Consultation"
                >
                  <User className="w-4 h-4" />
                </button>

                {/* Floating Settings Gear Trigger */}
                <button
                  onClick={() => setIsAuditDrawerOpen(true)}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                  title="Zero-PII Settings & Audit"
                >
                  <Settings className="w-4 h-4" />
                </button>

              </div>
            </header>

            {/* ══════════════════════════════════════════════════════
                CARD 1: GLOBAL SALES BY TOP LOCATIONS CARD
                (Iconic Elevated Globe Card from Screenshot)
               ══════════════════════════════════════════════════════ */}
            <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 relative pt-10">
              
              {/* Floating Elevated Green Globe Icon (Matches Screenshot exactly!) */}
              <div className="absolute -top-5 left-6 w-14 h-14 rounded-xl bg-gradient-to-tr from-[#43A047] to-[#66BB6A] text-white flex items-center justify-center shadow-lg shadow-green-600/30 border border-white/20">
                <Globe className="w-7 h-7" />
              </div>

              {/* Card Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 pl-16 sm:pl-16">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-slate-800 tracking-tight">
                    Surveillance Prevalence & Case Burden by Pilot Territory
                  </h3>
                  <p className="text-xs text-gray-500 font-sans mt-0.5">
                    Real-time active case distribution and diagnostic yield across South-East Nigeria.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5 text-[#0082FF]" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={() => onNavigate('ask')}
                    className="bg-[#0082FF] hover:bg-[#0066CC] text-white px-4 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
                    <span>Ask AI</span>
                  </button>
                </div>
              </div>

              {/* Two-Column Grid: Location Table (Left) + Interactive Vector Map (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                
                {/* Left 5-Cols: Territory Ranking Table */}
                <div className="lg:col-span-5 space-y-4">
                  <table className="w-full text-xs text-left font-sans">
                    <thead>
                      <tr className="border-b border-slate-100 text-gray-400 font-mono text-[10px] uppercase">
                        <th className="pb-2">Territory</th>
                        <th className="pb-2 text-right">Active Cases</th>
                        <th className="pb-2 text-right">Share (%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {stateRanking.map((item) => {
                        const isSelected = selectedStateId === item.id;
                        return (
                          <tr
                            key={item.id}
                            onClick={() => setSelectedStateId(item.id)}
                            className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                              isSelected ? 'bg-blue-50/70 font-bold text-[#0082FF]' : 'text-slate-700'
                            }`}
                          >
                            <td className="py-3.5 flex items-center gap-3">
                              <span className="text-base">{item.flag}</span>
                              <span className="font-sans font-medium">{item.name}</span>
                            </td>
                            <td className="py-3.5 text-right font-bold">
                              {item.cases.toLocaleString()}
                            </td>
                            <td className="py-3.5 text-right text-gray-500 font-medium">
                              {item.pct}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {/* Summary Metric Footnote */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs font-mono text-gray-600">
                    <span>Regional Active Total:</span>
                    <span className="font-extrabold text-slate-900 text-sm">2,842 Cases</span>
                  </div>
                </div>

                {/* Right 7-Cols: Interactive Map Container */}
                <div className="lg:col-span-7 bg-[#FAFAFA] rounded-2xl p-4 border border-slate-200 relative overflow-hidden flex flex-col">
                  
                  {/* Map Zoom Controls */}
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-1">
                    <button
                      className="w-7 h-7 bg-white rounded-md border border-slate-200 text-slate-700 flex items-center justify-center font-bold shadow-2xs hover:bg-slate-50 cursor-pointer"
                      title="Zoom In"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      className="w-7 h-7 bg-white rounded-md border border-slate-200 text-slate-700 flex items-center justify-center font-bold shadow-2xs hover:bg-slate-50 cursor-pointer"
                      title="Zoom Out"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Vector Map Renderer */}
                  <div className="flex-1 min-h-[300px]">
                    <InteractiveMap
                      selectedStateId={selectedStateId}
                      onSelectState={(stId) => setSelectedStateId(stId)}
                    />
                  </div>

                  <div className="pt-2 text-center text-[11px] font-mono text-gray-400">
                    Showing 5 Sentinel States & High-Risk Riverine LGA Clusters
                  </div>

                </div>

              </div>

            </section>

            {/* ══════════════════════════════════════════════════════
                BOTTOM ROW: 3 FLOATING HEADER CHART CARDS
                (Rose, Green, Cyan Elevated Header Cards from Screenshot)
               ══════════════════════════════════════════════════════ */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              
              {/* ── CARD 1: ROSE/PINK FLOATING HEADER (Active Leprosy Surveillance) ── */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 pt-8 relative flex flex-col justify-between space-y-4">
                
                {/* Floating Top Header in Vibrant Rose/Pink (#E91E63) with Bar Chart */}
                <div className="absolute -top-5 left-4 right-4 h-32 rounded-xl bg-gradient-to-tr from-[#E91E63] to-[#FF4081] text-white p-3.5 shadow-lg shadow-[#E91E63]/30 border border-white/20 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-80">
                    <span>QUARTERLY COHORT DISCOVERY</span>
                    <span>2024 - 2026</span>
                  </div>
                  {/* Micro Bar Chart */}
                  <div className="h-16 flex items-end justify-between gap-1.5 pt-2">
                    {[40, 55, 70, 85, 60, 90, 75, 95, 80, 89].map((val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          style={{ height: `${val}%` }}
                          className="w-full bg-white/90 rounded-xs hover:bg-white transition-all"
                          title={`Q${idx + 1}: ${val}%`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spacer for Floating Header */}
                <div className="h-24" />

                {/* Card Body */}
                <div className="space-y-1">
                  <h4 className="font-display font-extrabold text-base text-slate-900">
                    Leprosy Active Surveillance
                  </h4>
                  <p className="text-xs text-gray-500 font-sans">
                    {currentState.leprosyCases.toLocaleString()} Total Patients (89.2% MDT Cure Rate)
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>Updated 2 hours ago</span>
                  </div>
                  <span className="text-[#E91E63] font-bold">MB: 77% | PB: 23%</span>
                </div>

              </div>

              {/* ── CARD 2: GREEN FLOATING HEADER (Grade-2 Disability Prevention) ── */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 pt-8 relative flex flex-col justify-between space-y-4">
                
                {/* Floating Top Header in Vibrant Green (#43A047) with Line Chart */}
                <div className="absolute -top-5 left-4 right-4 h-32 rounded-xl bg-gradient-to-tr from-[#43A047] to-[#66BB6A] text-white p-3.5 shadow-lg shadow-green-600/30 border border-white/20 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-80">
                    <span>GRADE-2 DISABILITY REDUCTION</span>
                    <span>TARGET &lt; 5%</span>
                  </div>
                  {/* Micro Line Chart Curve */}
                  <div className="h-16 flex items-end justify-between gap-1.5 pt-2">
                    {[16.8, 15.9, 15.2, 14.5, 13.8, 13.0, 12.4, 11.9, 11.6, 11.4].map((val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          style={{ height: `${(val / 20) * 100}%` }}
                          className="w-full bg-white/90 rounded-xs hover:bg-white transition-all"
                          title={`G2D: ${val}%`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spacer for Floating Header */}
                <div className="h-24" />

                {/* Card Body */}
                <div className="space-y-1">
                  <h4 className="font-display font-extrabold text-base text-slate-900">
                    Grade-2 Disability Prevention (G2D)
                  </h4>
                  <p className="text-xs text-gray-500 font-sans">
                    {currentState.leprosyG2D}% Current Rate (-5.4% drop vs baseline)
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <div className="flex items-center gap-1 text-emerald-600 font-bold">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>WHO Benchmark &lt;5%</span>
                  </div>
                  <span>VMT Active</span>
                </div>

              </div>

              {/* ── CARD 3: CYAN/BLUE FLOATING HEADER (Buruli PCR Turnaround) ── */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 pt-8 relative flex flex-col justify-between space-y-4">
                
                {/* Floating Top Header in Vibrant Cyan/Blue (#00ACC1) with Stepped Curve */}
                <div className="absolute -top-5 left-4 right-4 h-32 rounded-xl bg-gradient-to-tr from-[#00ACC1] to-[#26C6DA] text-white p-3.5 shadow-lg shadow-cyan-600/30 border border-white/20 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-80">
                    <span>BURULI IS2404 PCR VERIFICATION</span>
                    <span>EARLY STAGE 64%</span>
                  </div>
                  {/* Micro Stepped Chart */}
                  <div className="h-16 flex items-end justify-between gap-1.5 pt-2">
                    {[50, 58, 62, 68, 71, 74, 76, 78, 78, 78.5].map((val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          style={{ height: `${val}%` }}
                          className="w-full bg-white/90 rounded-xs hover:bg-white transition-all"
                          title={`PCR: ${val}%`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spacer for Floating Header */}
                <div className="h-24" />

                {/* Card Body */}
                <div className="space-y-1">
                  <h4 className="font-display font-extrabold text-base text-slate-900">
                    Buruli Ulcer Diagnostics & PCR
                  </h4>
                  <p className="text-xs text-gray-500 font-sans">
                    {currentState.buruliCases.toLocaleString()} Diagnosed ({currentState.buruliPcrRate}% Molecularly Confirmed)
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <div className="flex items-center gap-1 text-cyan-600 font-bold">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Cat I: 64% (&lt;5cm)</span>
                  </div>
                  <span>{currentState.avgLabTurnaroundDays}d Turnaround</span>
                </div>

              </div>

            </section>

            {/* ══════════════════════════════════════════════════════
                DYNAMIC SUB-MODULE VIEW (Tables, Logistics, Charts, Map)
               ══════════════════════════════════════════════════════ */}
            {activeMenu === 'tables' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 animate-in fade-in duration-300">
                <CaseRegistryTable
                  selectedStateId={selectedStateId}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
              </div>
            )}

            {activeMenu === 'facilities' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 animate-in fade-in duration-300">
                <FacilityTelemetryMatrix selectedStateId={selectedStateId} />
              </div>
            )}

            {activeMenu === 'charts' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 animate-in fade-in duration-300">
                <ClinicalTrendsVisualizer />
              </div>
            )}

            {activeMenu === 'dashboard' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="font-display font-extrabold text-lg text-slate-900">
                    Official Active Case Registry & Triage Stream
                  </h3>
                  <span className="text-xs font-mono text-gray-500">
                    Live DHIS2 Ingestion Feed
                  </span>
                </div>
                <CaseRegistryTable
                  selectedStateId={selectedStateId}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
              </div>
            )}

          </div>

        </div>

      </div>

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
