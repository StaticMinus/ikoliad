import React from 'react';

export const GlowingOrb: React.FC<{ size?: number }> = ({ size = 100 }) => {
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
    >
      {/* Outer Diffused Ambient Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-400/40 via-indigo-400/30 to-purple-200/50 blur-2xl animate-pulse" />

      {/* Secondary Soft Glow Layer */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#A78BFA] via-[#C084FC] to-[#818CF8] opacity-70 blur-md" />

      {/* Main 3D Frosted Orb Sphere */}
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_12px_36px_rgba(168,85,247,0.35)] bg-gradient-to-br from-[#E9D5FF] via-[#C084FC] to-[#7E22CE] border border-white/60">
        
        {/* Specular Top-Left Highlight Ring */}
        <div className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full bg-radial from-white via-white/40 to-transparent opacity-90 blur-xs" />

        {/* Dynamic Refraction Inner Glow */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-tl from-purple-900/30 via-transparent to-white/60" />

        {/* Center Iris Light Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 rounded-full bg-white/40 blur-xs animate-ping duration-1000 opacity-40" />

        {/* Bottom-Right Darker Depth Shadow */}
        <div className="absolute -bottom-2 -right-2 w-2/3 h-2/3 rounded-full bg-purple-950/25 blur-sm" />
      </div>
    </div>
  );
};
