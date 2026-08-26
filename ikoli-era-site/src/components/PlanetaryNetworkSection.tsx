import React, { useState } from 'react';
import { Globe2, ShieldCheck, Cpu, Radio } from 'lucide-react';

export const PlanetaryNetworkSection: React.FC = () => {
  const [activeState, setActiveState] = useState<string>('Enugu');

  const states = [
    { name: 'Enugu', clinics: 64, lab: 'UNTH Ituku-Ozalla', status: 'Optimal' },
    { name: 'Ebonyi', clinics: 78, lab: 'Mile 4 Hospital Abakaliki', status: 'Optimal' },
    { name: 'Anambra', clinics: 72, lab: 'NAUTH Nnewi Hub', status: 'Active' },
    { name: 'Abia', clinics: 52, lab: 'Uzuakoli Reference Settlement', status: 'Optimal' },
    { name: 'Imo', clinics: 46, lab: 'FMC Owerri Sentinel', status: 'Active' },
  ];

  return (
    <section id="sentinel" className="w-full bg-[#0A0C10] text-white py-24 px-6 md:px-12 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-[700px] h-[350px] bg-[#0082FF]/15 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#0082FF]/10 text-[#0082FF] px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase border border-[#0082FF]/20">
            <Globe2 className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '12s' }} />
            <span>Planetary Sentinel Architecture</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Intelligent Planetary Network
          </h2>

          <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
            Real-time geospatial health telemetry connecting sentinel clinics, state focal teams, and national epidemiologists across Nigeria.
          </p>
        </div>

        {/* 3 Planetary Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: Geospatial Sentinel Sphere */}
          <div className="bg-[#121824] p-8 rounded-[32px] border border-white/10 hover:border-[#0082FF]/60 transition-all duration-500 flex flex-col justify-between group shadow-2xl">
            <div className="space-y-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#0082FF]/10 text-[#0082FF] flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">
                Geospatial Mesh
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Active telemetry nodes streaming epidemiological coordinates across all 5 South-East states.
              </p>
            </div>

            {/* Interactive Planetary Node Selector */}
            <div className="bg-[#0A0C10] p-4 rounded-2xl border border-white/5 space-y-2 mt-auto">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Active Focal Hubs</span>
              <div className="flex flex-wrap gap-1.5">
                {states.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setActiveState(s.name)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                      activeState === s.name
                        ? 'bg-[#0082FF] text-white shadow-md'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
              <div className="pt-2 text-[11px] font-mono text-emerald-400 flex items-center justify-between border-t border-white/5 mt-2">
                <span>{states.find(s => s.name === activeState)?.lab}</span>
                <span className="text-gray-500">{states.find(s => s.name === activeState)?.clinics} clinics</span>
              </div>
            </div>
          </div>

          {/* Pillar 2: 3-Tier Verification Gate */}
          <div className="bg-[#121824] p-8 rounded-[32px] border border-white/10 hover:border-[#0082FF]/60 transition-all duration-500 flex flex-col justify-between group shadow-2xl">
            <div className="space-y-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">
                3-Tier Verification
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Every field upload passes through cryptographic anomaly gates before national registry publication.
              </p>
            </div>

            {/* Stepper Visualizer */}
            <div className="bg-[#0A0C10] p-4 rounded-2xl border border-white/5 space-y-3 mt-auto">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                <span>Field Cryptographic Ingestion</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                <span>AI Anomaly & Collision Check</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">3</span>
                <span>State STBLCO & National Sync</span>
              </div>
            </div>
          </div>

          {/* Pillar 3: Zero-PII Data Trust */}
          <div className="bg-[#121824] p-8 rounded-[32px] border border-white/10 hover:border-[#0082FF]/60 transition-all duration-500 flex flex-col justify-between group shadow-2xl">
            <div className="space-y-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">
                Zero-PII Data Trust
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Patient anonymity enforced at the clinic level using SHA-256 tokenization and zero facial biometric retention.
              </p>
            </div>

            {/* Tokenization Protocol Badge */}
            <div className="bg-[#0A0C10] p-4 rounded-2xl border border-white/5 space-y-2 mt-auto">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-gray-400">Security Standard</span>
                <span className="text-emerald-400 font-bold">ISO-27701 & NDPR</span>
              </div>
              <div className="bg-white/5 p-2 rounded-lg font-mono text-[10px] text-gray-400 truncate">
                Token: e9f2a7b3c8d1... (Zero-PII UUID)
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
