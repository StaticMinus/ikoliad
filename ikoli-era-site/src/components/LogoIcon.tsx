import React from 'react';

export const LogoIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Outer Dark Hex-Circle Aperture */}
        <circle cx="50" cy="50" r="46" fill="#0A0C10" stroke="#0082FF" strokeWidth="2" strokeOpacity="0.4" />
        
        {/* Interlocking Neural Arc 1 */}
        <path
          d="M 30 50 C 30 36, 42 26, 56 28 C 66 29, 74 37, 72 48"
          stroke="#0082FF"
          strokeWidth="6"
          strokeLinecap="round"
        />
        
        {/* Interlocking Neural Arc 2 */}
        <path
          d="M 70 50 C 70 64, 58 74, 44 72 C 34 71, 26 63, 28 52"
          stroke="#00D2FF"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Central Core Pulse Dot */}
        <circle cx="50" cy="50" r="8" fill="#0082FF" className="animate-pulse" />
        <circle cx="50" cy="50" r="4" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
