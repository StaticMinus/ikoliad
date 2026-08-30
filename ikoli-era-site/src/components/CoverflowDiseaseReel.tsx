import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

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

interface CoverflowDiseaseReelProps {
  diseases: DiseaseItem[];
  onSelectDisease: (id: string) => void;
}

export const CoverflowDiseaseReel: React.FC<CoverflowDiseaseReelProps> = ({
  diseases,
  onSelectDisease,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : diseases.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < diseases.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full py-8 relative select-none">
      {/* ── Top Reel Controls ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6 px-4">
        <span className="text-[11px] font-mono font-bold text-[#0071E3] uppercase tracking-wider bg-[#0071E3]/10 px-3 py-1 rounded-full border border-[#0071E3]/20">
          3D Perspective Reel • 0{activeIndex + 1} / 0{diseases.length}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 border border-black/10 flex items-center justify-center text-[#1D1D1F] shadow-xs transition-transform active:scale-90 cursor-pointer"
            title="Previous Disease"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 border border-black/10 flex items-center justify-center text-[#1D1D1F] shadow-xs transition-transform active:scale-90 cursor-pointer"
            title="Next Disease"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── 3D Perspective Carousel Stage ─────────────────────────────────── */}
      <div className="relative h-[480px] sm:h-[520px] flex items-center justify-center perspective-[1200px] overflow-hidden">
        {diseases.map((d, idx) => {
          const offset = idx - activeIndex;
          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          return (
            <motion.div
              key={d.id}
              onClick={() => {
                if (isCenter) onSelectDisease(d.id);
                else setActiveIndex(idx);
              }}
              animate={{
                x: offset * 260,
                scale: isCenter ? 1.05 : 0.85,
                rotateY: offset * -25,
                zIndex: 50 - Math.abs(offset) * 10,
                opacity: Math.abs(offset) > 1 ? 0.35 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 28,
              }}
              className="absolute w-[320px] sm:w-[380px] bg-white rounded-[32px] overflow-hidden border border-black/10 shadow-2xl cursor-pointer text-left flex flex-col justify-between"
            >
              {/* Image Section with Scanner HUD */}
              <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-gray-100">
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white z-20">
                  <span className="text-[10px] font-mono font-bold text-blue-200 uppercase tracking-wider block mb-0.5">
                    {d.code}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-white leading-tight">
                    {d.name}
                  </h3>
                </div>
              </div>

              {/* Detail Box */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed line-clamp-3">
                  {d.summary}
                </p>

                <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">
                    {d.priorityTag}
                  </span>

                  <button className="bg-[#1D1D1F] hover:bg-black text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer group-hover:scale-103">
                    <span>Inspect Staging</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
