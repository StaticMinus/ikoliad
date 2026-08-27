import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Plus, Database, Bot, Cpu, Building2, ShieldCheck, Activity, CheckCircle2 } from 'lucide-react';

export const FeaturesShowcase: React.FC = () => {
  const [isStreaming, setIsStreaming] = useState(true);

  // Render function for the 3 capability cards
  const renderCards = (keyPrefix: string) => (
    <>
      {/* ── Card 1: Multimodal Lesion AI ─────────────────── */}
      <div
        key={`${keyPrefix}-card-1`}
        className="w-[320px] sm:w-[360px] md:w-[390px] shrink-0 bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-[28px] border border-blue-100/90 shadow-lg hover:shadow-2xl hover:border-[#0082FF]/50 transition-all duration-300 flex flex-col justify-between select-none group"
      >
        <div className="space-y-2.5 mb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0082FF] animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-[#0082FF] uppercase tracking-wider">
                Diagnostic Vision
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              99.2% Sensitivity
            </span>
          </div>
          <h3 className="font-display font-black text-xl text-[#0A0C10] group-hover:text-[#0082FF] transition-colors">
            Multimodal Lesion AI
          </h3>
          <p className="text-xs text-gray-500 font-sans leading-relaxed">
            Instant differential screening for Leprosy (PB/MB) and Buruli Ulcer staging from melanin-rich clinical field photos.
          </p>
        </div>

        {/* UI Mock 1 */}
        <div className="bg-[#F4F8FD] rounded-2xl p-3.5 border border-blue-100/80 space-y-2.5 shadow-inner">
          <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">
            <span>ACTIVE CLINICAL SCREENINGS</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>

          {/* Item 1 */}
          <div className="bg-white p-2.5 rounded-xl border border-blue-100 flex items-center justify-between shadow-xs hover:border-[#0082FF]/40 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0082FF] flex items-center justify-center font-bold text-xs font-mono border border-blue-200/60">
                L
              </div>
              <div>
                <span className="text-xs font-bold text-[#0A0C10] block">Leprosy MB Screening</span>
                <span className="text-[9px] text-gray-400 block font-sans">Single patch, sensory loss</span>
              </div>
            </div>
            <span className="text-[9px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
              MDT Ready
            </span>
          </div>

          {/* Item 2 */}
          <div className="bg-white p-2.5 rounded-xl border border-purple-100 flex items-center justify-between shadow-xs hover:border-purple-300 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs font-mono border border-purple-200/60">
                B
              </div>
              <div>
                <span className="text-xs font-bold text-[#0A0C10] block">Buruli Ulcer Stage I</span>
                <span className="text-[9px] text-gray-400 block font-sans">Nodule &lt; 5cm, PCR verified</span>
              </div>
            </div>
            <span className="text-[9px] font-mono font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
              Oral Rx
            </span>
          </div>

          {/* Item 3 */}
          <div className="bg-white p-2.5 rounded-xl border border-emerald-100 flex items-center justify-between shadow-xs hover:border-emerald-300 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs font-mono border border-emerald-200/60">
                Y
              </div>
              <div>
                <span className="text-xs font-bold text-[#0A0C10] block">Yaws Differential</span>
                <span className="text-[9px] text-gray-400 block font-sans">Papular analysis verified</span>
              </div>
            </div>
            <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              DPP Single
            </span>
          </div>
        </div>
      </div>

      {/* ── Card 2: Real-Time Field Telemetry ─────────────── */}
      <div
        key={`${keyPrefix}-card-2`}
        className="w-[320px] sm:w-[360px] md:w-[390px] shrink-0 bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-[28px] border border-blue-100/90 shadow-lg hover:shadow-2xl hover:border-emerald-400/50 transition-all duration-300 flex flex-col justify-between select-none group"
      >
        <div className="space-y-2.5 mb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-wider">
                Sentinel Telemetry
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#0082FF]">
              <Activity className="w-3 h-3 animate-pulse" />
              <span>Live Node Sync</span>
            </div>
          </div>
          <h3 className="font-display font-black text-xl text-[#0A0C10] group-hover:text-emerald-600 transition-colors">
            Real-Time Field Telemetry
          </h3>
          <p className="text-xs text-gray-500 font-sans leading-relaxed">
            Zero delays. Instant validation between frontline Android tablets and State STBLCO surveillance officers.
          </p>
        </div>

        {/* UI Mock 2 */}
        <div className="bg-[#F4F8FD] rounded-2xl p-3.5 border border-blue-100/80 space-y-3.5 shadow-inner">
          <div className="flex items-center justify-between">
            <div className="flex -space-x-1.5">
              <div className="w-6 h-6 rounded-full bg-[#0A0C10] border-2 border-white flex items-center justify-center text-[#0082FF] shadow-xs">
                <Bot className="w-3 h-3" />
              </div>
              <div className="w-6 h-6 rounded-full bg-[#121824] border-2 border-white flex items-center justify-center text-emerald-400 shadow-xs">
                <Cpu className="w-3 h-3" />
              </div>
              <div className="w-6 h-6 rounded-full bg-[#0A0C10] border-2 border-white flex items-center justify-center text-purple-400 shadow-xs">
                <Building2 className="w-3 h-3" />
              </div>
              <div className="w-6 h-6 rounded-full bg-[#1A2332] border-2 border-white flex items-center justify-center text-amber-400 shadow-xs">
                <ShieldCheck className="w-3 h-3" />
              </div>
            </div>
            <span className="text-[11px] font-extrabold text-[#0082FF] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 font-mono">
              312+ Clinics Active
            </span>
          </div>

          <div className="flex items-center justify-between gap-1.5 pt-1">
            <button
              onClick={() => setIsStreaming(true)}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                isStreaming ? 'bg-[#0082FF] text-white shadow-xs' : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              <Play className="w-2.5 h-2.5 fill-current" />
              <span>Stream</span>
            </button>
            <button
              onClick={() => setIsStreaming(false)}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                !isStreaming ? 'bg-[#0082FF] text-white shadow-xs' : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              <Pause className="w-2.5 h-2.5" />
              <span>Pause</span>
            </button>
            <button
              onClick={() => setIsStreaming(true)}
              className="bg-white text-gray-700 px-3 py-1 rounded-lg text-[10px] font-bold border border-gray-200 flex items-center gap-1 hover:bg-gray-50 cursor-pointer"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Re-Verify</span>
            </button>
          </div>

          <div className="space-y-1.5 pt-1 font-mono">
            <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              <span>DHIS2 Federal Stream</span>
              <span className="text-emerald-600 font-bold">98.4% Live</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full w-full overflow-hidden">
              <div className={`h-full bg-[#0082FF] rounded-full transition-all duration-1000 ${isStreaming ? 'w-[98%] animate-pulse' : 'w-[60%]'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Card 3: National DHIS2 & Lab Integration ───────── */}
      <div
        key={`${keyPrefix}-card-3`}
        className="w-[320px] sm:w-[360px] md:w-[390px] shrink-0 bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-[28px] border border-blue-100/90 shadow-lg hover:shadow-2xl hover:border-purple-400/50 transition-all duration-300 flex flex-col justify-between select-none group"
      >
        <div className="space-y-2.5 mb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-[10px] font-mono font-bold text-purple-600 uppercase tracking-wider">
                Data Pipeline
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" />
              <span>Zero-PII</span>
            </div>
          </div>
          <h3 className="font-display font-black text-xl text-[#0A0C10] group-hover:text-purple-600 transition-colors">
            National & DHIS2 Pipeline
          </h3>
          <p className="text-xs text-gray-500 font-sans leading-relaxed">
            Seamless integration with federal health registries, reference hospital labs, and WHO NTD pipelines.
          </p>
        </div>

        {/* UI Mock 3 */}
        <div className="bg-[#F4F8FD] rounded-2xl p-3.5 border border-blue-100/80 space-y-3.5 shadow-inner">
          <div className="space-y-1.5 font-mono">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              SURVEILLANCE INTEGRATIONS
            </span>
            <div className="flex items-center gap-1.5">
              <button className="bg-[#0082FF] hover:bg-[#0066CC] text-white px-2.5 py-1 rounded-lg text-[9px] font-bold flex items-center gap-1 shadow-xs transition-all cursor-pointer">
                <Plus className="w-2.5 h-2.5" />
                <span>Connected</span>
              </button>
              <span className="bg-white px-2.5 py-1 rounded-lg text-[9px] font-bold text-gray-700 border border-gray-200">
                DHIS2 Core
              </span>
              <span className="bg-white px-2.5 py-1 rounded-lg text-[9px] font-bold text-gray-700 border border-gray-200">
                PCR IS2404
              </span>
            </div>
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-gray-100 flex items-center justify-between shadow-xs hover:border-emerald-200 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs border border-emerald-200/60">
                <Database className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#0A0C10] block">Federal DHIS2 Pipeline</span>
                <span className="text-[9px] text-gray-400 block font-sans">SHA-256 aggregate encryption</span>
              </div>
            </div>
            <span className="text-[9px] font-extrabold font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
              Active
            </span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <section
      id="features"
      className="w-full bg-gradient-to-b from-white via-[#EFF6FC] to-white py-20 sm:py-28 border-b border-gray-100 relative overflow-hidden selection:bg-[#0082FF] selection:text-white"
    >
      {/* Dynamic Background Grid Pattern & Radial Glow Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(#0082FF_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial from-[#0082FF]/12 via-transparent to-transparent blur-3xl pointer-events-none" />
      
      {/* ── Section Header ───────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 space-y-3.5 text-center mb-10 sm:mb-14 relative z-10">
        <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#0A0C10] tracking-tight">
          Multimodal Diagnostic Capabilities
        </h2>
        
        <p className="text-xs sm:text-sm text-gray-600 font-sans max-w-2xl mx-auto leading-relaxed">
          Everything state epidemiologists and community health workers need to screen lesions, verify clinical registries, and eliminate skin NTDs across Nigeria.
        </p>
      </div>

      {/* ── Continuous Horizontal Scrolling Carousel (Framed Inside max-w-6xl) ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        
        {/* Frame Container with Ice-Blue Glass Backing */}
        <div className="relative w-full overflow-hidden rounded-[32px] sm:rounded-[40px] bg-white/80 backdrop-blur-xl p-4 sm:p-7 border border-[#0082FF]/20 shadow-[0_20px_50px_rgba(0,130,255,0.08)] group">
          
          {/* Inner Left & Right Gradient Fade Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white via-white/90 to-transparent z-20 pointer-events-none rounded-l-[32px] sm:rounded-l-[40px]" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white via-white/90 to-transparent z-20 pointer-events-none rounded-r-[32px] sm:rounded-r-[40px]" />

          {/* Continuous Motion Row */}
          <div className="flex gap-6 w-max animate-marquee-capabilities group-hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
            {/* Set 1 */}
            {renderCards('frame-1')}
            {/* Set 2 */}
            {renderCards('frame-2')}
            {/* Set 3 */}
            {renderCards('frame-3')}
          </div>

        </div>

      </div>

      {/* Keyframe Injection for Smooth Continuous Marquee */}
      <style>{`
        @keyframes marqueeCapabilities {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }
        .animate-marquee-capabilities {
          animation: marqueeCapabilities 26s linear infinite;
        }
      `}</style>

    </section>
  );
};
