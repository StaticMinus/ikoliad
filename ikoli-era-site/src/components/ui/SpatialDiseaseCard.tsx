import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface DiseaseItem {
  id: string;
  name: string;
  code: string;
  category: string;
  casesPill: string;
  image: string;
  summary: string;
  priorityTag: string;
  whoTarget: string;
  pcrStatus: string;
}

interface SpatialDiseaseCardProps {
  disease: DiseaseItem;
  onClick: () => void;
}

export const SpatialDiseaseCard: React.FC<SpatialDiseaseCardProps> = ({ disease, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -7; // max 7 deg tilt
    const rY = ((x - centerX) / centerX) * 7;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className="relative bg-white rounded-[32px] overflow-hidden border border-black/8 shadow-[0_12px_36px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_54px_rgba(0,0,0,0.1)] flex flex-col justify-between transition-shadow duration-300 cursor-pointer group select-none"
    >
      {/* Dynamic Specular Light Glare Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 rounded-[32px]"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}) 0%, rgba(255,255,255,0) 60%)`,
        }}
      />

      {/* ── Top Image Banner ────────────────────────────────────────────── */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-gray-100">
        <img
          src={disease.image}
          alt={disease.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Bottom Text Over Image */}
        <div className="absolute bottom-3.5 left-4 right-4 text-white z-20">
          <span className="text-[10px] font-mono font-bold text-blue-200 uppercase tracking-wider block mb-0.5">
            {disease.code}
          </span>
          <h3 className="font-bold text-base sm:text-lg text-white leading-tight drop-shadow-sm transition-colors">
            {disease.name}
          </h3>
        </div>
      </div>

      {/* ── Center Description ───────────────────────────────────────────── */}
      <div className="p-5 sm:p-6 space-y-3.5 flex-1 flex flex-col justify-between text-left">
        <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed line-clamp-3">
          {disease.summary}
        </p>

        {/* Bottom Telemetry & Expand Arrow */}
        <div className="pt-3 border-t border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-semibold text-gray-500 uppercase tracking-wider">
              {disease.priorityTag}
            </span>
          </div>

          <div className="w-8 h-8 rounded-full bg-[#F5F5F7] group-hover:bg-[#1D1D1F] group-hover:text-white text-[#1D1D1F] flex items-center justify-center transition-all duration-200 shadow-2xs group-hover:scale-105">
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
