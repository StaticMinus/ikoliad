import React from 'react';

export const GlowingOrb: React.FC<{ size?: number }> = ({ size = 140 }) => {
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
    >
      {/* Outer Diffused Cobalt & Electric Cyan Ambient Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0052CC]/50 via-[#0071E3]/40 to-[#00D2FF]/60 blur-3xl animate-pulse" />

      {/* Cybernetic Holographic Energy Orbital Ring 1 */}
      <div className="absolute -inset-3 rounded-full border border-[#00D2FF]/30 border-dashed animate-[spin_12s_linear_infinite] opacity-70 pointer-events-none" />

      {/* Cybernetic Holographic Energy Orbital Ring 2 (Opposite direction) */}
      <div className="absolute -inset-6 rounded-full border border-blue-400/20 border-dotted animate-[spin_20s_linear_infinite_reverse] opacity-50 pointer-events-none" />

      {/* Secondary Volumetric Electric Aura */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#00D2FF] via-[#0071E3] to-[#1E40AF] opacity-80 blur-lg" />

      {/* Main Artificial Glassmorphic Sphere */}
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_16px_48px_rgba(0,113,227,0.45)] bg-gradient-to-br from-[#E0F2FE] via-[#38BDF8] to-[#1E3A8A] border border-cyan-200/60">
        
        {/* Synthetic Digital Grid Lines Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:12px_12px]" />

        {/* Dynamic Specular High-Gloss Glare Ring */}
        <div className="absolute -top-1/3 -left-1/3 w-4/5 h-4/5 rounded-full bg-radial from-white via-cyan-100/50 to-transparent opacity-95 blur-xs" />

        {/* Inner Electric Refractive Edge Glow */}
        <div className="absolute inset-1.5 rounded-full bg-gradient-to-tl from-[#0C4A6E]/60 via-transparent to-white/70" />

        {/* Concentric Harmonic Frequency Ripple */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full border border-cyan-200/40 animate-ping duration-1000 opacity-30" />

        {/* Center Quantum AI Core Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 rounded-full bg-white blur-xs shadow-[0_0_20px_#00D2FF]" />

        {/* Bottom Depth / Shadow */}
        <div className="absolute -bottom-3 -right-3 w-3/4 h-3/4 rounded-full bg-blue-950/40 blur-md" />
      </div>
    </div>
  );
};
