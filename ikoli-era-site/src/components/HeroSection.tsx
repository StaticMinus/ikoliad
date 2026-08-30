import React from 'react';
import { Navbar } from './Navbar';
import { SplineScene } from './ui/splite';
import { Spotlight } from './ui/spotlight';
import { ArrowRight, Bot, Cpu, Eye, Radio } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';

interface HeroSectionProps {
  currentPage?: string;
  onNavigate?: (page: any) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentPage = 'home',
  onNavigate,
}) => {
  return (
    <section
      id="hero-master-container"
      className="relative w-full bg-gradient-to-b from-[#CDE3FA] via-[#E2F0FD] to-[#FFFFFF] overflow-hidden select-none pt-24 sm:pt-28 pb-12 sm:pb-16 min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-between"
    >
      {/* Interactive Cursor Spotlight Glow Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        size={320}
      />

      {/* Navbar — Floating responsive capsule */}
      <Navbar
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      {/* Hero Master Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-4 pb-6 flex-1 flex flex-col justify-between w-full">
        
        {/* ── Floating Sentinel Network Badge (Positioned by the AI Face) ───── */}
        <div className="self-center lg:self-auto lg:absolute lg:top-28 lg:right-12 z-30 liquid-glass p-2.5 sm:p-3 px-3.5 sm:px-4.5 rounded-2xl shadow-xl flex items-center gap-3 hover:scale-105 transition-all duration-300 group mb-4 lg:mb-0">
          {/* 4 Overlapping AI Cyber Sentinel Avatars */}
          <div className="flex -space-x-2 overflow-hidden">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0A0C10] border-2 border-white flex items-center justify-center text-[#0082FF] shadow-xs group-hover:border-[#0082FF] transition-colors">
              <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#121824] border-2 border-white flex items-center justify-center text-emerald-400 shadow-xs group-hover:border-emerald-400 transition-colors">
              <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0A0C10] border-2 border-white flex items-center justify-center text-purple-400 shadow-xs group-hover:border-purple-400 transition-colors">
              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1A2332] border-2 border-white flex items-center justify-center text-amber-400 shadow-xs group-hover:border-amber-400 transition-colors">
              <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse" />
            </div>
          </div>

          <div className="text-left font-sans">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0082FF] animate-ping" />
              <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">Sentinel Network</span>
            </div>
            <span className="text-[11px] sm:text-xs font-extrabold text-[#0A0C10] font-mono">312+ AI Telemetry Nodes</span>
          </div>
        </div>

        {/* ── Headline & 3D Spline Robot Layout ── */}
        <div className="relative w-full flex-1 flex flex-col lg:flex-row items-center justify-between my-auto z-10 pt-2 sm:pt-4 min-h-[48vh] sm:min-h-[56vh]">
          
          {/* Left Title: I'M & Mission Statement */}
          <div className="w-full lg:w-4/12 z-20 text-center lg:text-left pointer-events-auto flex flex-col items-center lg:items-start">
            <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[135px] leading-[0.88] tracking-tighter text-[#0A0C10]">
              <span className="inline lg:block">I'M </span>
              <span className="lg:hidden text-[#0082FF]">IKOLI</span>
            </h1>

            <p className="text-xs sm:text-sm text-gray-700 max-w-sm lg:max-w-xs mt-4 sm:mt-5 leading-relaxed font-sans font-medium text-center lg:text-left">
              Nigeria's national skin NTD clinical intelligence platform — empowering frontline healthcare workers with AI diagnostics, active surveillance, and rapid WHO treatment protocols.
            </p>

            <div className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full sm:w-auto">
              <MagneticButton onClick={() => onNavigate?.('ask')}>
                <button
                  className="bg-[#0071E3] hover:bg-[#0077ED] active:scale-95 text-white px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-tight inline-flex items-center gap-2 shadow-lg shadow-[#0071E3]/25 transition-all hover:scale-105 group cursor-pointer"
                >
                  <span>Ask Ikoli AI</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </MagneticButton>

              <MagneticButton onClick={() => onNavigate?.('dashboard')}>
                <button
                  className="bg-white/90 hover:bg-white active:scale-95 text-[#1D1D1F] px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-tight border border-black/10 hover:border-black/20 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <span>Explore Dashboard</span>
                </button>
              </MagneticButton>
            </div>
          </div>

          {/* ── Central Interactive Real-Time 3D Spline Robot ── */}
          <div className="relative lg:absolute lg:inset-0 z-10 flex items-center justify-center pointer-events-auto my-4 lg:my-0 w-full">
            <div className="w-full max-w-[340px] sm:max-w-[480px] md:max-w-[580px] lg:max-w-[700px] h-[320px] sm:h-[420px] md:h-[500px] lg:h-[620px] relative flex items-center justify-center">
              {/* Dynamic Atmospheric Radial Aura */}
              <div className="absolute inset-0 bg-radial from-[#0082FF]/15 via-transparent to-transparent rounded-full blur-2xl sm:blur-3xl pointer-events-none" />
              
              {/* Live Interactive 3D Spline Robot Scene */}
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full relative z-10"
              />
            </div>
          </div>

          {/* Right Title: IKOLI (Visible on lg+) */}
          <div className="hidden lg:block w-4/12 z-20 text-right self-end pb-2 pointer-events-auto">
            <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[135px] leading-[0.88] tracking-tighter text-[#0A0C10]">
              IKOLI
            </h1>
          </div>

        </div>

      </div>

      {/* ── Convex Curved Bottom Separator Arc ───────────────── */}
      <div className="w-full h-10 sm:h-16 lg:h-20 bg-white rounded-t-[50%_100%] shadow-inner -mt-4 sm:-mt-6 relative z-20" />

    </section>
  );
};
