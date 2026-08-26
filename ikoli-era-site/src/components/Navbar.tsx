import React, { useState } from 'react';
import { LogoIcon } from './LogoIcon';
import { Sparkles, Menu, X, ChevronRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  currentPage?: 'home' | 'dashboard' | 'diseases' | 'ask';
  onNavigate?: (page: 'home' | 'dashboard' | 'diseases' | 'ask') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage = 'home',
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: 'home' | 'dashboard' | 'diseases' | 'ask') => {
    onNavigate?.(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full pt-4 sm:pt-6 pb-4 px-4 sm:px-8 md:px-16 z-40 relative max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        
        {/* ── Brand Logo: IKOLI AI ─────────────────── */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
        >
          <LogoIcon className="w-8 h-8 sm:w-9 sm:h-9 group-hover:scale-105 transition-transform duration-300 drop-shadow-md" />
          <div className="flex flex-col text-left">
            <span className="font-display font-black text-lg sm:text-xl tracking-tight text-[#0A0C10] leading-none group-hover:text-[#0082FF] transition-colors">
              IKOLI AI
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] font-bold text-[#0082FF] tracking-widest uppercase">
              Clinical Vision
            </span>
          </div>
        </div>

        {/* ── Desktop Navigation Links (md+) ───────────────────── */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-xs font-bold uppercase tracking-wider text-[#0A0C10]/80">
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`hover:text-[#0082FF] transition-colors py-1 cursor-pointer ${
              currentPage === 'dashboard'
                ? 'text-[#0082FF] border-b-2 border-[#0082FF]'
                : 'text-[#0A0C10]/80'
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => handleNavClick('diseases')}
            className={`hover:text-[#0082FF] transition-colors py-1 cursor-pointer ${
              currentPage === 'diseases'
                ? 'text-[#0082FF] border-b-2 border-[#0082FF]'
                : 'text-[#0A0C10]/80'
            }`}
          >
            Diseases
          </button>

          <a
            href="#about"
            className="hover:text-[#0082FF] transition-colors py-1 hover:border-b-2 hover:border-[#0082FF]"
          >
            About Us
          </a>
        </nav>

        {/* ── Right Actions: Desktop Button + Mobile Hamburger Toggle ── */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Desktop "Ask Ikoli" Button */}
          <button
            onClick={() => handleNavClick('ask')}
            className={`hidden sm:inline-flex px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all hover:scale-105 shadow-md items-center gap-2 group cursor-pointer ${
              currentPage === 'ask'
                ? 'bg-[#0082FF] text-white ring-2 ring-[#0082FF]/30'
                : 'bg-[#0A0C10] hover:bg-[#0082FF] text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00D2FF] group-hover:text-white transition-colors" />
            <span>Ask Ikoli</span>
          </button>

          {/* Mobile "Ask Ikoli" Compact Pill (< sm) */}
          <button
            onClick={() => handleNavClick('ask')}
            className="sm:hidden bg-[#0082FF] text-white p-2 rounded-full shadow-md flex items-center justify-center cursor-pointer"
            aria-label="Ask Ikoli AI"
          >
            <Sparkles className="w-4 h-4 text-white" />
          </button>

          {/* Mobile Menu Hamburger Button (< md) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl bg-white/80 border border-black/10 flex items-center justify-center text-[#0A0C10] shadow-sm hover:bg-white transition-all cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* ── Mobile Glassmorphic Navigation Drawer ──────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl rounded-3xl p-5 border border-black/10 shadow-2xl z-50 space-y-4"
          >
            <div className="flex flex-col space-y-1 text-sm font-bold uppercase tracking-wider font-sans">
              <button
                onClick={() => handleNavClick('home')}
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                  currentPage === 'home'
                    ? 'bg-[#EFF6FC] text-[#0082FF]'
                    : 'text-[#0A0C10] hover:bg-gray-50'
                }`}
              >
                <span>Home Landing</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => handleNavClick('dashboard')}
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                  currentPage === 'dashboard'
                    ? 'bg-[#EFF6FC] text-[#0082FF]'
                    : 'text-[#0A0C10] hover:bg-gray-50'
                }`}
              >
                <span>Surveillance Dashboard</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => handleNavClick('diseases')}
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                  currentPage === 'diseases'
                    ? 'bg-[#EFF6FC] text-[#0082FF]'
                    : 'text-[#0A0C10] hover:bg-gray-50'
                }`}
              >
                <span>Target Diseases Registry</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => handleNavClick('ask')}
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                  currentPage === 'ask'
                    ? 'bg-[#EFF6FC] text-[#0082FF]'
                    : 'text-[#0A0C10] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0082FF]" />
                  <span>Ask Ikoli AI</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl text-[#0A0C10] hover:bg-gray-50 transition-all"
              >
                <span>About & Governance</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </a>
            </div>

            {/* Mobile Footer Status Badge */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono text-gray-500">
              <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero-PII Secure</span>
              </div>
              <span>v2.6 Live</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
};
