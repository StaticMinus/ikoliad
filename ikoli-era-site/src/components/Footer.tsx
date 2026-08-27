import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ShieldCheck, SunMedium } from 'lucide-react';
import { StickyRevealFooter } from './StickyRevealFooter';

interface FooterProps {
  onNavigate?: (page: 'home' | 'dashboard' | 'diseases' | 'ask' | 'about' | 'styles') => void;
  isStatic?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, isStatic = false }) => {
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

  const footerContent = (
    <footer className="w-full bg-[#F5F5F7] text-[#1D1D1F] pt-14 sm:pt-20 pb-8 px-5 sm:px-10 md:px-16 border-t border-black/5 rounded-t-[36px] sm:rounded-t-[48px] relative overflow-hidden select-none shadow-[0_-20px_60px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        
        {/* ── Top 4-Column Directory Grid ───────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Bio & Mission Statement (Span 4) */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1D1D1F] tracking-tight leading-snug">
              IKOLI is Nigeria's national Skin NTD clinical intelligence & autonomous vision diagnostic system.
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans font-medium">
              Developed in partnership with RedAid Nigeria, FMoHSW, NTBLCP, and DAHW to eliminate Leprosy, Buruli Ulcer, and Yaws.
            </p>
          </div>

          {/* Col 2: Explore Navigation Links (Span 2) */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-sans text-xs text-gray-400 font-semibold block tracking-wide">
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
                  About & Governance
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Follow & Governance Partners Pill Badges (Span 3) */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-sans text-xs text-gray-400 font-semibold block tracking-wide">
              Governance & Partners
            </span>
            <div className="flex flex-wrap gap-2 pt-0.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/5 text-[11px] font-medium text-gray-700 shadow-xs hover:border-black/15 transition-all">
                <span className="w-2 h-2 rounded-full bg-[#DE322D]" />
                <span>RedAid Nigeria</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/5 text-[11px] font-medium text-gray-700 shadow-xs hover:border-black/15 transition-all">
                <span className="w-2 h-2 rounded-full bg-[#0082FF]" />
                <span>FMoHSW Nigeria</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/5 text-[11px] font-medium text-gray-700 shadow-xs hover:border-black/15 transition-all">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>NTBLCP Programme</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/5 text-[11px] font-medium text-gray-700 shadow-xs hover:border-black/15 transition-all">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>DAHW Relief</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/5 text-[11px] font-medium text-gray-700 shadow-xs hover:border-black/15 transition-all">
                <ShieldCheck className="w-3 h-3 text-[#0071E3]" />
                <span>Zero-PII Vault</span>
              </span>
            </div>
          </div>

          {/* Col 4: Action CTAs (Span 3) */}
          <div className="md:col-span-3 space-y-5 flex flex-col justify-start">
            {/* CTA 1: Ask Ikoli (Red/Orange Accent) */}
            <div
              onClick={() => onNavigate?.('ask')}
              className="group cursor-pointer space-y-0.5"
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
              onClick={() => onNavigate?.('diseases')}
              className="group cursor-pointer space-y-0.5"
            >
              <div className="flex items-center gap-2 text-[#1D1D1F] font-bold text-base sm:text-lg group-hover:text-[#0071E3] transition-colors">
                <span>Guidelines & Protocols</span>
                <div className="w-5 h-5 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center shadow-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                </div>
              </div>
              <span className="text-xs text-gray-500 block font-normal">
                WHO MDT & clinical staging tools
              </span>
            </div>
          </div>

        </div>

        {/* ── Giant Typographic Kinetic Wordmark (Like 'faizur' in reference) ── */}
        <div className="w-full flex justify-center items-end pointer-events-none pt-4 sm:pt-8 overflow-hidden select-none -mb-6 sm:-mb-10">
          <span className="font-display font-black text-[130px] sm:text-[220px] md:text-[280px] lg:text-[360px] leading-[0.76] tracking-tighter text-[#1D1D1F] text-center w-full block lowercase">
            ikoli
          </span>
        </div>

        {/* ── Sub-Footer Bottom Bar ───────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-black/5 text-[11px] sm:text-xs text-gray-500 font-medium">
          {/* Left Copyright & Privacy */}
          <div className="flex items-center gap-3">
            <span>Ikoli AI © 2026</span>
            <span>•</span>
            <button
              onClick={() => onNavigate?.('about')}
              className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Zero-PII Protocol</span>
            </span>
          </div>

          {/* Right Local Telemetry: Nigeria WAT Time & Climate */}
          <div className="flex items-center gap-2 text-gray-600 font-mono text-[11px]">
            <span>Nigeria (WAT)</span>
            <span className="font-bold text-[#1D1D1F]">{watTime || '4:40 PM'}</span>
            <span>31°C</span>
            <SunMedium className="w-3.5 h-3.5 text-amber-500" />
          </div>
        </div>

      </div>
    </footer>
  );

  // If on Ask Ikoli page or static mode is requested, render without parallax reveal container
  if (isStatic) {
    return footerContent;
  }

  // Flagship layout: Smooth Sticky Reveal Curtain Footer
  return <StickyRevealFooter>{footerContent}</StickyRevealFooter>;
};
