import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  LayoutDashboard,
  Shield,
  Info,
  ArrowUpRight,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';

interface NavbarProps {
  currentPage?: 'home' | 'dashboard' | 'diseases' | 'ask' | 'about' | 'styles';
  onNavigate?: (page: 'home' | 'dashboard' | 'diseases' | 'ask' | 'about' | 'styles') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage = 'home',
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (pageId: string) => {
    onNavigate?.(pageId as 'home' | 'dashboard' | 'diseases' | 'ask' | 'about' | 'styles');
    setMobileMenuOpen(false);
  };

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      title: 'Home Overview',
      icon: Home,
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      title: 'Surveillance Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'diseases',
      label: 'Diseases',
      title: 'Target Diseases Registry',
      icon: Shield,
    },
    {
      id: 'about',
      label: 'About Us',
      title: 'About & Governance',
      icon: Info,
    },
  ];

  return (
    <header className="sticky top-3 sm:top-5 z-50 w-full px-3 sm:px-6 max-w-7xl mx-auto select-none pointer-events-none">
      <div className="flex items-center justify-center w-full">
        
        {/* ── Apple Clean / Spatial Minimalist Frosted Light Glass Capsule Dock ────── */}
        <div className="pointer-events-auto bg-white/85 backdrop-blur-2xl border border-black/5 rounded-full p-1.5 sm:p-2 shadow-[0_12px_40px_rgba(0,0,0,0.06)] flex items-center justify-between gap-2 sm:gap-4 w-full max-w-4xl transition-all duration-300">
          
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
              className="md:hidden fixed bottom-0 left-0 right-0 bg-white/98 backdrop-blur-3xl text-[#1D1D1F] rounded-t-[32px] p-5 pt-3 border-t border-black/10 shadow-[0_-20px_60px_rgba(0,0,0,0.18)] z-50 pointer-events-auto pb-9 space-y-4 max-h-[85vh] overflow-y-auto"
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
                  <span className="text-[10px] font-mono font-bold text-gray-400 bg-black/5 px-2 py-0.5 rounded-full">
                    v1.1
                  </span>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center text-gray-600 hover:bg-black/10 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Clean Minimal Navigation Item List */}
              <div className="space-y-1.5">
                {navItems.map((item) => {
                  const isActive = currentPage === item.id;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all border text-left cursor-pointer ${
                        isActive
                          ? 'bg-[#0071E3]/10 border-[#0071E3]/30 text-[#0071E3] font-bold shadow-xs'
                          : 'bg-[#F5F5F7] hover:bg-[#EBEBEF] border-black/5 text-[#1D1D1F] font-semibold'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-xs border ${
                            isActive
                              ? 'bg-[#0071E3] text-white border-[#0071E3]'
                              : 'bg-white text-[#1D1D1F] border-black/5'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs">{item.title}</span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-[#0071E3]' : 'text-gray-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Action CTA: Ask Ikoli Clinical Assistant Pill */}
              <div className="pt-2">
                <button
                  onClick={() => handleNavClick('ask')}
                  className="w-full bg-[#0071E3] hover:bg-[#0077ED] active:scale-95 text-white py-3 px-4 rounded-2xl text-xs font-bold shadow-md shadow-[#0071E3]/25 flex items-center justify-between transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span>Launch Ask Ikoli Clinical Assistant</span>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-white text-[#0071E3] flex items-center justify-center font-bold shadow-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </header>
  );
};
