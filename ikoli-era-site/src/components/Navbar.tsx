import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Shield,
  Info,
  Code2,
  ArrowUpRight,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Terminal,
  Cpu,
  Layers,
  FileCode2,
} from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';

interface NavbarProps {
  currentPage?: string;
  onNavigate?: (page: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage = 'home',
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [apiSubmenuOpen, setApiSubmenuOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setApiSubmenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (pageId: string) => {
    setApiSubmenuOpen(false);
    onNavigate?.(pageId as any);
    setMobileMenuOpen(false);
  };

  const handleMouseEnterApi = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setApiSubmenuOpen(true);
  };

  const handleMouseLeaveApi = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setApiSubmenuOpen(false);
    }, 300);
  };

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      title: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'diseases',
      label: 'Diseases',
      title: 'Diseases',
      icon: Shield,
    },
    {
      id: 'api',
      label: 'API Docs',
      title: 'API Docs',
      icon: Code2,
      hasSubmenu: true,
    },
    {
      id: 'about',
      label: 'About',
      title: 'About',
      icon: Info,
    },
  ];

  return (
    <>
      {/* ── Fixed Floating Top Capsule Dock ───────────────────────────────── */}
      <header className="fixed top-5 sm:top-7 inset-x-0 mx-auto z-50 w-full px-3 sm:px-6 max-w-7xl select-none pointer-events-none transition-all duration-300 flex items-center justify-center">
        <div className="relative flex items-center justify-center w-full">
          
          {/* Capsule Dock */}
          <div className="pointer-events-auto bg-white/85 backdrop-blur-2xl border border-black/5 rounded-full p-1.5 sm:p-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)] flex items-center justify-between gap-2 sm:gap-4 w-full max-w-4xl transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] relative z-50">
            
            {/* 1. Left: Hardware-Grade Typographic Logo Mark */}
            <div
              onClick={() => handleNavClick('home')}
              className="flex items-center cursor-pointer group shrink-0 pl-3 pr-1 py-1"
            >
              <span className="font-display font-black text-base sm:text-lg tracking-tight text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors flex items-center gap-1">
                <span>IKOLI</span>
                <span className="text-[#0071E3]">AI</span>
              </span>
            </div>

            {/* 2. Center: Segmented Apple-Style Glass Pill Navigation Tabs (md+) */}
            <nav className="hidden md:flex items-center gap-1 bg-black/[0.04] p-1 rounded-full border border-black/[0.04] font-sans">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;

                if (item.hasSubmenu) {
                  return (
                    <div
                      key={item.id}
                      className="relative"
                      onMouseEnter={handleMouseEnterApi}
                      onMouseLeave={handleMouseLeaveApi}
                    >
                      <MagneticButton magneticStrength={0.2} onClick={() => setApiSubmenuOpen(!apiSubmenuOpen)}>
                        <button
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                            isActive || apiSubmenuOpen
                              ? 'bg-white text-[#1D1D1F] shadow-xs font-bold'
                              : 'text-[#1D1D1F]/70 hover:text-[#1D1D1F] hover:bg-white/60'
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`w-3 h-3 transition-transform duration-200 ${
                              apiSubmenuOpen ? 'rotate-180 text-[#0071E3]' : 'text-gray-400'
                            }`}
                          />
                        </button>
                      </MagneticButton>
                    </div>
                  );
                }

                return (
                  <MagneticButton key={item.id} magneticStrength={0.2} onClick={() => handleNavClick(item.id)}>
                    <button
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-white text-[#1D1D1F] shadow-xs font-bold'
                          : 'text-[#1D1D1F]/70 hover:text-[#1D1D1F] hover:bg-white/60'
                      }`}
                    >
                      {item.label}
                    </button>
                  </MagneticButton>
                );
              })}
            </nav>

            {/* 3. Right: Apple Blue CTA Pill ("Ask Ikoli ↗") + Mobile Toggle */}
            <div className="flex items-center gap-2 shrink-0 pr-0.5">
              
              {/* Action CTA Pill with White Circular Arrow Badge */}
              <MagneticButton magneticStrength={0.3} onClick={() => handleNavClick('ask')}>
                <button
                  className={`bg-[#0071E3] hover:bg-[#0077ED] text-white font-bold text-xs rounded-full pl-3.5 sm:pl-4 pr-1 sm:pr-1.5 py-1 sm:py-1.5 flex items-center gap-2 sm:gap-2.5 shadow-md shadow-[#0071E3]/25 transition-all hover:scale-105 cursor-pointer group ${
                    currentPage === 'ask' ? 'ring-2 ring-[#0071E3]/50' : ''
                  }`}
                >
                  <span className="tracking-tight font-semibold">Ask Ikoli</span>
                  <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-white text-[#0071E3] flex items-center justify-center shadow-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </button>
              </MagneticButton>

              {/* Mobile Hamburger Toggle (< md) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 border border-black/5 flex items-center justify-center text-[#1D1D1F] transition-all cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 text-[#0071E3]" /> : <Menu className="w-4 h-4 text-[#1D1D1F]" />}
              </button>

            </div>

          </div>

        </div>
      </header>

      {/* ── IMMERSIVE FULL-SCREEN MEGA SUB-MENU OVERLAY (Desktop & Tablet) ─── */}
      <AnimatePresence>
        {apiSubmenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={handleMouseEnterApi}
            onMouseLeave={handleMouseLeaveApi}
            className="fixed inset-0 top-0 left-0 w-screen h-screen z-40 bg-[#F5F5F7]/98 backdrop-blur-3xl overflow-y-auto pointer-events-auto flex flex-col justify-between pt-24 sm:pt-28 pb-10 px-4 sm:px-8 md:px-12 lg:px-16 select-none"
          >
            <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col justify-between space-y-8">
              
              {/* ── Header Breadcrumb & Close Bar ─────────────────────────── */}
              <div className="flex items-center justify-between border-b border-black/8 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-[#0071E3]/10 border border-[#0071E3]/20 flex items-center justify-center text-[#0071E3]">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-base sm:text-lg text-[#1D1D1F] tracking-tight flex items-center gap-2">
                      <span>Developer &amp; Health Systems Hub</span>
                      <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        v1.1 Active
                      </span>
                    </h2>
                    <p className="text-xs text-gray-500 font-normal">
                      Zero-PII REST endpoints, client SDKs, and national health record bridges.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setApiSubmenuOpen(false)}
                    className="px-3.5 py-1.5 rounded-full bg-white hover:bg-gray-100 border border-black/10 text-xs font-semibold text-gray-600 flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <span>Close</span>
                    <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">ESC</span>
                    <X className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </div>
              </div>

              {/* ── Main Multi-Column Sub-Directory ───────────────────────── */}
              <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start flex-1">
                
                {/* Column 1: Core Clinical Endpoints (Span 5) */}
                <div className="col-span-12 lg:col-span-5 space-y-4">
                  <div className="border-b border-black/8 pb-2.5 flex items-center justify-between">
                    <span className="font-sans text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#0071E3]" />
                      <span>Core Diagnostic APIs</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#0071E3] font-bold bg-[#0071E3]/10 px-2 py-0.5 rounded-full">
                      REST &bull; 120ms p95
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {[
                      {
                        label: '/v1/infer',
                        title: 'Skin Lesion Classifier',
                        desc: 'Ridley-Jopling & WHO 3-stage neural inference',
                        tag: 'Fast Inference',
                      },
                      {
                        label: '/v1/segment',
                        title: 'Margin Demarcation',
                        desc: 'Sub-mm tissue boundary & necrosis mask',
                        tag: 'Sub-mm',
                      },
                      {
                        label: '/v1/nerve',
                        title: 'Nerve Trunk Mapping',
                        desc: 'Ulnar, radial, and peroneal sensory path tracking',
                        tag: 'Sensory',
                      },
                      {
                        label: '/v1/telemetry',
                        title: 'Sentinel Cluster Sync',
                        desc: 'Real-time LGA epidemiological event streaming',
                        tag: 'Realtime',
                      },
                      {
                        label: '/v1/vault',
                        title: 'Zero-PII Cryptographic Tokenizer',
                        desc: 'Client-side SHA-256 de-identification vault',
                        tag: 'SHA-256',
                      },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleNavClick('api')}
                        className="w-full text-left p-3.5 rounded-2xl bg-white border border-black/6 hover:border-[#0071E3]/40 hover:bg-white text-xs font-semibold text-[#1D1D1F] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#0071E3]">
                              {item.label}
                            </span>
                            <span className="text-gray-400">&bull;</span>
                            <span className="font-bold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                              {item.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 font-normal">
                            {item.desc}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-50 border border-black/5 px-2.5 py-1 rounded-full group-hover:bg-[#0071E3]/10 group-hover:text-[#0071E3] transition-colors shrink-0 ml-3">
                          {item.tag}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Column 2: SDKs, Integrations & Feature Callout (Span 7) */}
                <div className="col-span-12 lg:col-span-7 space-y-4">
                  <div className="border-b border-black/8 pb-2.5 flex items-center justify-between">
                    <span className="font-sans text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-600" />
                      <span>SDKs &amp; Architecture Modules</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      FHIR &bull; DHIS2 &bull; Edge ONNX
                    </span>
                  </div>

                  {/* 3-Column Pill Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { name: 'TypeScript / React SDK', icon: FileCode2 },
                      { name: 'Python Clinical Client', icon: Cpu },
                      { name: 'FHIR / HL7 Bridge', icon: Layers },
                      { name: 'DHIS2 Tracker Module', icon: Layers },
                      { name: 'Edge ONNX Runtime', icon: Cpu },
                      { name: 'HMAC-SHA256 Auth', icon: Shield },
                      { name: 'Webhooks & Stream', icon: Terminal },
                      { name: 'Offline SQLite Buffer', icon: Layers },
                      { name: 'OpenAPI 3.1 Spec', icon: FileCode2 },
                      { name: 'National Health Pipeline', icon: Layers },
                      { name: 'Postman Collection v2.1', icon: Terminal },
                      { name: 'WebGPU Shader Engine', icon: Cpu },
                    ].map((pill) => {
                      const Icon = pill.icon;
                      return (
                        <button
                          key={pill.name}
                          onClick={() => handleNavClick('api')}
                          className="text-left px-3.5 py-2.5 rounded-xl bg-white border border-black/6 hover:border-[#0071E3]/40 hover:bg-white text-xs font-medium text-gray-700 hover:text-[#0071E3] shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-xs transition-all cursor-pointer flex items-center gap-2 group"
                        >
                          <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0071E3] transition-colors shrink-0" />
                          <span className="truncate">{pill.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Executive Feature Callout Card */}
                  <div
                    onClick={() => handleNavClick('api')}
                    className="bg-gradient-to-br from-white to-[#F0F4FA] rounded-2xl p-5 border border-black/8 hover:border-[#0071E3]/40 shadow-xs flex items-center justify-between gap-6 cursor-pointer transition-all group mt-3"
                  >
                    <div className="space-y-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-[#0071E3] text-white text-[10px] font-mono font-bold">
                          INTERACTIVE DOCS
                        </span>
                        <h4 className="font-bold text-sm sm:text-base text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                          Explore Interactive API Documentation &amp; Live Studio
                        </h4>
                      </div>
                      <p className="text-xs text-gray-500 font-normal leading-relaxed max-w-2xl">
                        Explore full OpenAPI schemas, copy cURL code generators in JavaScript &amp; Python, inspect HMAC signature headers, and connect hospital EMRs.
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#1D1D1F] group-hover:bg-[#0071E3] text-white flex items-center justify-center shrink-0 transition-colors shadow-md group-hover:scale-105">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                </div>

              </div>

              {/* ── Bottom Row: 3 Grand Cinematic Photographic Cards ──────── */}
              <div className="pt-4 border-t border-black/8">
                <div className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Explore Sovereign Platform Surfaces
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  
                  {/* Card 1: Diseases */}
                  <div
                    onClick={() => handleNavClick('diseases')}
                    className="relative h-44 sm:h-52 rounded-[28px] overflow-hidden bg-gray-900 border border-black/8 group cursor-pointer shadow-sm"
                  >
                    <img
                      src="/media/leprosy_clinical_sensory_exam.jpg"
                      alt="Clinical Disease Profiles"
                      className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-106 group-hover:filter-none transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-5 right-5 text-white flex items-end justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono font-bold text-blue-300 uppercase tracking-wider block">
                          DIAGNOSTIC PROTOCOLS
                        </span>
                        <span className="font-bold text-sm sm:text-base leading-snug drop-shadow-sm block">
                          6 Target Diseases &amp; Clinical Staging
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white text-[#1D1D1F] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-[#0071E3] group-hover:text-white transition-all shrink-0 ml-2">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Sentinel Dashboard */}
                  <div
                    onClick={() => handleNavClick('dashboard')}
                    className="relative h-44 sm:h-52 rounded-[28px] overflow-hidden bg-gray-900 border border-black/8 group cursor-pointer shadow-sm"
                  >
                    <img
                      src="/media/dashboard-sentinel.jpg"
                      alt="National Surveillance Network"
                      className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-106 group-hover:filter-none transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-5 right-5 text-white flex items-end justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono font-bold text-blue-300 uppercase tracking-wider block">
                          SURVEILLANCE SENTINEL
                        </span>
                        <span className="font-bold text-sm sm:text-base leading-snug drop-shadow-sm block">
                          National Sentinel Surveillance Hub
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white text-[#1D1D1F] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-[#0071E3] group-hover:text-white transition-all shrink-0 ml-2">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Protocols & Safeguards */}
                  <div
                    onClick={() => handleNavClick('protocols')}
                    className="relative h-44 sm:h-52 rounded-[28px] overflow-hidden bg-gray-900 border border-black/8 group cursor-pointer shadow-sm"
                  >
                    <img
                      src="/media/female_researcher_journal.jpg"
                      alt="Protocols & Safeguards"
                      className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-106 group-hover:filter-none transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-5 right-5 text-white flex items-end justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono font-bold text-blue-300 uppercase tracking-wider block">
                          CONSORTIUM CHARTER
                        </span>
                        <span className="font-bold text-sm sm:text-base leading-snug drop-shadow-sm block">
                          Statutory Protocols &amp; NDPA 2023
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white text-[#1D1D1F] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-[#0071E3] group-hover:text-white transition-all shrink-0 ml-2">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Apple Clean Bottom Sheet Drawer for Mobile ──────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 pointer-events-auto"
            />

            {/* Bottom Sheet Modal */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed bottom-0 left-0 right-0 bg-[#F5F5F7] text-[#1D1D1F] rounded-t-[32px] p-5 pt-3 border-t border-black/8 shadow-[0_-20px_60px_rgba(0,0,0,0.15)] z-50 pointer-events-auto pb-9 space-y-3.5 max-h-[85vh] overflow-y-auto"
            >
              {/* Drag Pill Handle */}
              <div className="w-10 h-1 bg-black/20 rounded-full mx-auto mb-2" />

              {/* Minimal Sheet Header */}
              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-base tracking-tight text-[#1D1D1F] flex items-center gap-1">
                    <span>IKOLI</span>
                    <span className="text-[#0071E3]">AI</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold text-gray-500 bg-white border border-black/5 px-2 py-0.5 rounded-full shadow-xs">
                    v1.1
                  </span>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-7 h-7 rounded-full bg-white border border-black/5 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors shadow-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Clean Minimal Navigation Item List */}
              <div className="space-y-2">
                {navItems.map((item) => {
                  const isActive = currentPage === item.id;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all border text-left cursor-pointer ${
                        isActive
                          ? 'bg-[#0071E3] border-[#0071E3] text-white font-bold shadow-md'
                          : 'bg-white hover:bg-[#EBEBEF] border-black/5 text-[#1D1D1F] font-semibold shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-xs border ${
                            isActive
                              ? 'bg-white/20 text-white border-transparent'
                              : 'bg-[#F5F5F7] text-[#1D1D1F] border-black/5'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs tracking-tight">{item.title}</span>
                      </div>
                      <ChevronRight
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isActive ? 'text-white' : 'text-gray-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Action CTA: Minimal Ask Ikoli AI Pill */}
              <div className="pt-1">
                <button
                  onClick={() => handleNavClick('ask')}
                  className="w-full bg-[#1D1D1F] hover:bg-black active:scale-98 text-white py-3.5 px-4 rounded-2xl text-xs font-bold shadow-md flex items-center justify-between transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0071E3]" />
                    <span>Ask Ikoli AI</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white/15 text-white flex items-center justify-center font-bold shadow-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
