import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ShieldCheck, SunMedium } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: any) => void;
  isStatic?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [watTime, setWatTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Africa/Lagos',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }).format(new Date());
        setWatTime(timeStr);
      } catch {
        setWatTime('4:40 PM');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-[#F5F5F7] text-[#1D1D1F] pt-14 sm:pt-20 pb-10 px-5 sm:px-10 md:px-16 border-t border-black/5 rounded-t-[36px] sm:rounded-t-[48px] relative overflow-hidden select-none shadow-[0_-12px_40px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        
        {/* ── Top 4-Column Directory Grid ───────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 text-left">
          
          {/* Col 1: Bio & Mission Statement (Span 4) */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1D1D1F] tracking-tight leading-snug">
              IKOLI-AI is Nigeria's sovereign Skin NTD governance, surveillance &amp; health information demonstrator (v0.1).
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans font-medium">
              Developed by the IKOLI Consortium (DAHW, RedAid Nigeria, Digital Dreams, FMOH/NTBLCP, VRC-UNN, IDEA) to eliminate Leprosy and Buruli Ulcer disability by 2030.
            </p>
          </div>

          {/* Col 2: Explore Navigation Links (Span 2) */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-sans text-xs text-gray-400 font-semibold block tracking-wide uppercase">
              Explore
            </span>
            <ul className="space-y-2 text-xs font-medium text-gray-600">
              <li>
                <button
                  onClick={() => onNavigate?.('home')}
                  className="hover:text-[#0071E3] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('dashboard')}
                  className="hover:text-[#0071E3] transition-colors cursor-pointer text-left"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('diseases')}
                  className="hover:text-[#0071E3] transition-colors cursor-pointer text-left"
                >
                  Diseases
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('protocols')}
                  className="hover:text-[#0071E3] transition-colors cursor-pointer text-left font-semibold text-[#1D1D1F]"
                >
                  Protocols &amp; Safeguards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('api')}
                  className="hover:text-[#0071E3] transition-colors cursor-pointer text-left"
                >
                  API Documentation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('ask')}
                  className="hover:text-[#0071E3] transition-colors cursor-pointer text-left"
                >
                  Ask Ikoli AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('about')}
                  className="hover:text-[#0071E3] transition-colors cursor-pointer text-left"
                >
                  About &amp; Heritage
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Follow & Governance Partners Pill Badges (Span 3) */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-sans text-xs text-gray-400 font-semibold block tracking-wide uppercase">
              Governance &amp; Consortium
            </span>
            <div className="flex flex-wrap gap-2 pt-0.5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/8 text-[11px] font-semibold text-[#1D1D1F] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:bg-[#1D1D1F] hover:text-white hover:border-[#1D1D1F] transition-all duration-200 cursor-default group">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 group-hover:bg-white transition-colors" />
                <span>DAHW</span>
              </span>

              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/8 text-[11px] font-semibold text-[#1D1D1F] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:bg-[#1D1D1F] hover:text-white hover:border-[#1D1D1F] transition-all duration-200 cursor-default group">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DE322D] group-hover:bg-white transition-colors" />
                <span>RedAid Nigeria (RAN)</span>
              </span>

              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/8 text-[11px] font-semibold text-[#1D1D1F] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:bg-[#1D1D1F] hover:text-white hover:border-[#1D1D1F] transition-all duration-200 cursor-default group">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] group-hover:bg-white transition-colors" />
                <span>Digital Dreams (DD)</span>
              </span>

              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/8 text-[11px] font-semibold text-[#1D1D1F] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:bg-[#1D1D1F] hover:text-white hover:border-[#1D1D1F] transition-all duration-200 cursor-default group">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-white transition-colors" />
                <span>FMOH / NTBLCP</span>
              </span>

              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/8 text-[11px] font-semibold text-[#1D1D1F] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:bg-[#1D1D1F] hover:text-white hover:border-[#1D1D1F] transition-all duration-200 cursor-default group">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:bg-white transition-colors" />
                <span>VRC-UNN</span>
              </span>

              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/8 text-[11px] font-semibold text-[#1D1D1F] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:bg-[#1D1D1F] hover:text-white hover:border-[#1D1D1F] transition-all duration-200 cursor-default group">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 group-hover:bg-white transition-colors" />
                <span>IDEA Nigeria</span>
              </span>

              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/8 text-[11px] font-semibold text-[#1D1D1F] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:bg-[#1D1D1F] hover:text-white hover:border-[#1D1D1F] transition-all duration-200 cursor-default group">
                <ShieldCheck className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
                <span>Zero-PII Vault</span>
              </span>
            </div>
          </div>

          {/* Col 4: Action CTAs (Span 3) */}
          <div className="md:col-span-3 space-y-5 flex flex-col justify-start">
            {/* CTA 1: Ask Ikoli */}
            <div
              onClick={() => onNavigate?.('ask')}
              className="group cursor-pointer space-y-0.5 text-left"
            >
              <div className="flex items-center gap-2 text-[#DE322D] font-bold text-base sm:text-lg group-hover:text-[#c42823] transition-colors">
                <span>Ask Ikoli AI</span>
                <div className="w-5 h-5 rounded-full bg-[#DE322D] text-white flex items-center justify-center shadow-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                </div>
              </div>
              <span className="text-xs text-gray-500 block font-normal">
                Clinical diagnostic assistant
              </span>
            </div>

            {/* CTA 2: Guidelines & Tools */}
            <div
              onClick={() => onNavigate?.('protocols')}
              className="group cursor-pointer space-y-0.5 text-left"
            >
              <div className="flex items-center gap-2 text-[#1D1D1F] font-bold text-base sm:text-lg group-hover:text-[#0071E3] transition-colors">
                <span>Guidelines &amp; Protocols</span>
                <div className="w-5 h-5 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center shadow-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                </div>
              </div>
              <span className="text-xs text-gray-500 block font-normal">
                FMOH &amp; NTBLCP clinical staging tools
              </span>
            </div>
          </div>

        </div>

        {/* ── Giant Typographic Wordmark: IKOLI AI ── */}
        <div className="w-full flex justify-center items-center pointer-events-none pt-6 sm:pt-10 overflow-hidden select-none">
          <span className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[140px] leading-none tracking-tighter text-[#1D1D1F] text-center w-full block uppercase opacity-95">
            IKOLI <span className="text-[#0071E3]">AI</span>
          </span>
        </div>

        {/* ── Sub-Footer Bottom Bar ───────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-black/5 text-[11px] sm:text-xs text-gray-500 font-medium">
          {/* Left Copyright & Privacy */}
          <div className="flex flex-wrap items-center gap-3">
            <span>IKOLI-AI Demonstrator v0.1 &copy; 2026</span>
            <span>&bull;</span>
            <button
              onClick={() => onNavigate?.('protocols')}
              className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
            >
              Privacy Policy &amp; NDPA 2023
            </button>
            <span>&bull;</span>
            <button
              onClick={() => onNavigate?.('protocols')}
              className="text-emerald-600 font-semibold flex items-center gap-1 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Zero-PII Protocol</span>
            </button>
          </div>

          {/* Right Local Telemetry: Nigeria WAT Time & Climate */}
          <div className="flex items-center gap-2 text-gray-600 font-mono text-[11px]">
            <span>Nigeria (WAT)</span>
            <span className="font-bold text-[#1D1D1F]">{watTime || '4:40 PM'}</span>
            <span>31&deg;C</span>
            <SunMedium className="w-3.5 h-3.5 text-amber-500" />
          </div>
        </div>

      </div>
    </footer>
  );
};
