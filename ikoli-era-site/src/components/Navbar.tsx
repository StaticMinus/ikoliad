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

      {/* ── IMMERSIVE FULL-SCREEN MEGA SUB-MENU OVERLAY (LUXURIOUS DARK GLASS & SMOOTH TRANSITION) ─── */}
      <AnimatePresence>
        {apiSubmenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.985, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.985, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={handleMouseEnterApi}
            onMouseLeave={handleMouseLeaveApi}
            className="fixed inset-0 top-0 left-0 w-screen h-screen z-40 bg-[#0A0B0E]/86 backdrop-blur-3xl overflow-y-auto pointer-events-auto flex flex-col justify-start pt-24 sm:pt-28 pb-14 px-4 sm:px-8 md:px-12 lg:px-16 select-none text-white transition-colors duration-300"
          >
            {/* Ambient Radial Top Glow for Luxurious Depth */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-[#0071E3]/15 via-[#0071E3]/5 to-transparent blur-[140px] pointer-events-none" />

            <div className="relative z-10 max-w-6xl w-full mx-auto space-y-4 sm:space-y-6">
              
              {/* ── Top Header Bar (Search & Close Pill) ── */}
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: 0.05 }}
                className="flex items-center justify-end gap-3 pb-2"
              >
                <div className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/[0.14] px-4 py-2 rounded-full border border-white/15 shadow-2xs text-xs text-gray-300 w-64 backdrop-blur-md transition-all">
                  <span>🔍</span>
                  <input
                    type="text"
                    placeholder="Search endpoints, APIs, SDKs..."
                    className="bg-transparent outline-none w-full text-xs text-white placeholder-gray-400"
                  />
                </div>

                <button
                  onClick={() => setApiSubmenuOpen(false)}
                  className="px-3.5 py-1.5 rounded-full bg-white/12 hover:bg-white/22 border border-white/20 text-xs font-semibold text-white flex items-center gap-1.5 shadow-xs transition-all cursor-pointer backdrop-blur-md"
                >
                  <span>Close</span>
                  <span className="text-[10px] font-mono bg-white/20 px-1.5 py-0.5 rounded text-gray-200">ESC</span>
                  <X className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </motion.div>

              {/* ── 1. Top Card: Spatial Dark Container with IKOLI Clinical Models & APIs ─── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.34, delay: 0.08 }}
                className="bg-[#13151B]/90 backdrop-blur-2xl rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 md:p-10 border border-white/12 shadow-[0_25px_65px_rgba(0,0,0,0.45)] space-y-6"
              >
                <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start text-left">
                  
                  {/* Left Column: Clinical Diagnostic Models (Span 4) */}
                  <div className="col-span-12 md:col-span-4 space-y-4">
                    <div className="border-b border-white/10 pb-2">
                      <h4 className="text-xs font-semibold text-gray-300 font-sans tracking-wide">
                        Clinical diagnostic models
                      </h4>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      {[
                        'WHO 3-stage Buruli classification',
                        'Ridley-Jopling Leprosy staging',
                        'Sub-mm Necrosis demarcation',
                        'Sensory Nerve trunk mapping',
                        'Yaws osteoperiostitis screening',
                      ].map((item) => (
                        <button
                          key={item}
                          onClick={() => handleNavClick('api')}
                          className="w-fit text-left px-5 py-2.5 rounded-full bg-white/[0.08] border border-white/12 hover:bg-white/[0.16] hover:border-white/30 text-xs sm:text-sm font-medium text-white shadow-2xs backdrop-blur-sm transition-all cursor-pointer"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Sovereign Surveillance & APIs (Span 8) */}
                  <div className="col-span-12 md:col-span-8 space-y-4">
                    <div className="border-b border-white/10 pb-2">
                      <h4 className="text-xs font-semibold text-gray-300 font-sans tracking-wide">
                        Surveillance &amp; APIs
                      </h4>
                    </div>

                    {/* 2-Column Grid of Pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="flex flex-col gap-2.5">
                        {[
                          'Zero-PII Tokenizer /v1/vault',
                          'Realtime Inference /v1/infer',
                          'Spatial Cluster /v1/telemetry',
                          'DHIS2 Tracker webhook sync',
                          'FHIR / HL7 clinical bridge',
                        ].map((pill) => (
                          <button
                            key={pill}
                            onClick={() => handleNavClick('api')}
                            className="w-fit text-left px-5 py-2.5 rounded-full bg-white/[0.08] border border-white/12 hover:bg-white/[0.16] hover:border-white/30 text-xs sm:text-sm font-medium text-white shadow-2xs backdrop-blur-sm transition-all cursor-pointer"
                          >
                            {pill}
                          </button>
                        ))}
                      </div>

                      <div className="flex flex-col gap-2.5">
                        {[
                          'Offline SQLite field buffer',
                          'Edge ONNX WebGPU runtime',
                          'HMAC-SHA256 authenticated',
                          '774 LGA surveillance sync',
                          'OpenAPI 3.1 schema specs',
                        ].map((pill) => (
                          <button
                            key={pill}
                            onClick={() => handleNavClick('api')}
                            className="w-fit text-left px-5 py-2.5 rounded-full bg-white/[0.08] border border-white/12 hover:bg-white/[0.16] hover:border-white/30 text-xs sm:text-sm font-medium text-white shadow-2xs backdrop-blur-sm transition-all cursor-pointer"
                          >
                            {pill}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Compare Diagnostic Models Banner */}
                    <div
                      onClick={() => handleNavClick('api')}
                      className="pt-4 border-t border-white/10 flex items-center justify-between gap-6 cursor-pointer group"
                    >
                      <div className="space-y-1 text-left">
                        <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-[#0071E3] transition-colors">
                          Compare Diagnostic Models &amp; Protocols
                        </h4>
                        <p className="text-xs text-gray-400 font-normal leading-relaxed max-w-xl">
                          Benchmark neural sensitivity, Ridley-Jopling staging accuracy, and edge inference latency across WHO target NTD conditions.
                        </p>
                      </div>

                      {/* White Circular Button with Black Right Arrow */}
                      <div className="w-10 h-10 rounded-full bg-white text-black shadow-md flex items-center justify-center shrink-0 group-hover:scale-108 transition-all">
                        <ArrowRight className="w-5 h-5 stroke-[2.5] text-black" />
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>

              {/* ── 2. Bottom Row: 3 Grand Photographic Cards (Authentic IKOLI Imagery & Content) ── */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: 0.12 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
              >
                
                {/* Card 1: Eliminate skin NTDs (CHEW Field Screening Photo) */}
                <div
                  onClick={() => handleNavClick('diseases')}
                  className="relative aspect-[4/3] rounded-[28px] sm:rounded-[32px] overflow-hidden bg-gray-900 shadow-xl group cursor-pointer border border-white/12 backdrop-blur-md"
                >
                  <img
                    src="/media/submenu_chew_screening.jpg"
                    alt="Eliminate skin NTDs"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-white">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight drop-shadow-md text-left">
                      Eliminate<br />skin NTDs
                    </h3>
                    
                    {/* White Circular Arrow Button */}
                    <div className="w-11 h-11 rounded-full bg-white text-black shadow-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200 ml-3">
                      <ArrowRight className="w-5 h-5 stroke-[2.5] text-black" />
                    </div>
                  </div>
                </div>

                {/* Card 2: National sentinel network (Laboratory Surveillance Photo) */}
                <div
                  onClick={() => handleNavClick('dashboard')}
                  className="relative aspect-[4/3] rounded-[28px] sm:rounded-[32px] overflow-hidden bg-gray-900 shadow-xl group cursor-pointer border border-white/12 backdrop-blur-md"
                >
                  <img
                    src="/media/submenu_sentinel_lab.jpg"
                    alt="National sentinel network"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-white">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight drop-shadow-md text-left">
                      National<br />sentinel network
                    </h3>
                    
                    {/* White Circular Arrow Button */}
                    <div className="w-11 h-11 rounded-full bg-white text-black shadow-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200 ml-3">
                      <ArrowRight className="w-5 h-5 stroke-[2.5] text-black" />
                    </div>
                  </div>
                </div>

                {/* Card 3: Restore human dignity (Patient Dignity Photo) */}
                <div
                  onClick={() => handleNavClick('about')}
                  className="relative aspect-[4/3] rounded-[28px] sm:rounded-[32px] overflow-hidden bg-gray-900 shadow-xl group cursor-pointer border border-white/12 backdrop-blur-md"
                >
                  <img
                    src="/media/submenu_patient_dignity.jpg"
                    alt="Restore human dignity"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-white">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight drop-shadow-md text-left">
                      Restore<br />human dignity
                    </h3>
                    
                    {/* White Circular Arrow Button */}
                    <div className="w-11 h-11 rounded-full bg-white text-black shadow-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200 ml-3">
                      <ArrowRight className="w-5 h-5 stroke-[2.5] text-black" />
                    </div>
                  </div>
                </div>

              </motion.div>

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
