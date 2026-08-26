import React from 'react';
import { Sparkles, ShieldCheck, ExternalLink } from 'lucide-react';
import { StickyRevealFooter } from './StickyRevealFooter';
import { LogoIcon } from './LogoIcon';

interface FooterProps {
  onNavigate?: (page: 'home' | 'dashboard' | 'diseases' | 'ask') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <StickyRevealFooter>
      <footer
        id="about"
        className="w-full bg-[#0A0C10] text-white pt-14 sm:pt-20 pb-10 sm:pb-12 px-4 sm:px-8 md:px-12 border-t border-white/10 relative overflow-hidden select-none"
      >
        {/* Giant Watermark Background Typography */}
        <div className="absolute -bottom-6 sm:-bottom-10 right-0 left-0 flex justify-center pointer-events-none opacity-[0.03] select-none overflow-hidden">
          <span className="font-display font-black text-[100px] sm:text-[180px] md:text-[240px] lg:text-[320px] leading-none tracking-tighter text-white whitespace-nowrap">
            IKOLI AI
          </span>
        </div>

        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16 relative z-10">
          
          {/* Top Row: Brand, Tagline, and Ask Ikoli Pill */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8 border-b border-white/10 pb-8 sm:pb-12">
            
            {/* Brand Identity */}
            <div className="space-y-3">
              <div
                onClick={() => onNavigate?.('home')}
                className="flex items-center gap-3 cursor-pointer group w-fit"
              >
                <LogoIcon className="w-9 h-9 sm:w-10 sm:h-10 group-hover:scale-105 transition-transform" />
                <div className="flex flex-col text-left">
                  <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white group-hover:text-[#0082FF] transition-colors">
                    IKOLI AI
                  </span>
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#0082FF] tracking-widest uppercase">
                    Autonomous NTD Surveillance
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 max-w-md font-sans leading-relaxed">
                Autonomous Skin NTD Surveillance & Multimodal Clinical Telemetry for Nigeria. Eliminating Leprosy, Buruli Ulcer, and Yaws with zero patient data exposure.
              </p>
            </div>

            {/* Quick Consultation CTA -> Navigates to Ask Ikoli Page */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate?.('ask')}
                className="w-full sm:w-auto bg-[#0082FF] hover:bg-[#0066CC] text-white px-6 sm:px-7 py-3 rounded-full text-xs font-extrabold uppercase font-mono tracking-wider transition-all hover:scale-105 shadow-xl inline-flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#00D2FF]" />
                <span>Launch Ask Ikoli AI</span>
              </button>
            </div>

          </div>

          {/* Middle Row: 4 Column Navigation & Institutional Governance (Responsive Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs font-sans">
            
            {/* Col 1: Platform */}
            <div className="space-y-3">
              <span className="font-mono text-[11px] text-gray-400 font-bold uppercase tracking-wider block">
                Platform
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <button
                    onClick={() => onNavigate?.('dashboard')}
                    className="hover:text-[#0082FF] transition-colors cursor-pointer text-left"
                  >
                    Surveillance Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate?.('diseases')}
                    className="hover:text-[#0082FF] transition-colors cursor-pointer text-left"
                  >
                    Target Diseases Registry
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate?.('ask')}
                    className="hover:text-[#0082FF] transition-colors cursor-pointer text-left"
                  >
                    Ask Ikoli Intelligence
                  </button>
                </li>
                <li>
                  <a href="#projects" className="hover:text-[#0082FF] transition-colors">
                    Case Studies
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 2: Target Diseases */}
            <div className="space-y-3">
              <span className="font-mono text-[11px] text-gray-400 font-bold uppercase tracking-wider block">
                Target NTDs
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <button
                    onClick={() => onNavigate?.('diseases')}
                    className="hover:text-[#0082FF] transition-colors cursor-pointer text-left"
                  >
                    Buruli Ulcer (IS2404 PCR)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate?.('diseases')}
                    className="hover:text-[#0082FF] transition-colors cursor-pointer text-left"
                  >
                    Leprosy PB (6-Month MDT)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate?.('diseases')}
                    className="hover:text-[#0082FF] transition-colors cursor-pointer text-left"
                  >
                    Leprosy MB (12-Month MDT)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate?.('diseases')}
                    className="hover:text-[#0082FF] transition-colors cursor-pointer text-left"
                  >
                    Yaws (DPP Azithromycin)
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Institutional Partners */}
            <div className="space-y-3">
              <span className="font-mono text-[11px] text-gray-400 font-bold uppercase tracking-wider block">
                Partners
              </span>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                  <span>RedAid Nigeria</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </li>
                <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                  <span>FMoHSW Nigeria</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </li>
                <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                  <span>NTBLCP Programme</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </li>
                <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                  <span>Circles AI</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </li>
              </ul>
            </div>

            {/* Col 4: Data Trust Protocol */}
            <div className="space-y-3">
              <span className="font-mono text-[11px] text-gray-400 font-bold uppercase tracking-wider block">
                Compliance
              </span>
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Zero-PII Tokenized</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed font-mono">
                  NDPR & WHO Guideline Compliant. All patient imagery processed strictly via cryptographic ephemeral pipelines.
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright (Cleaned & Responsive) */}
          <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-gray-500 font-mono gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0082FF]" />
              <span>National NTBLCP & WHO 2030 Skin NTD Surveillance Framework</span>
            </div>
            <span>© 2026 IKOLI AI • All Rights Reserved</span>
          </div>

        </div>
      </footer>
    </StickyRevealFooter>
  );
};
