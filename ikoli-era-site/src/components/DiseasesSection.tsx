import React, { useState } from 'react';
import type { DiseaseEntry } from '../data/diseasesData';
import { INITIAL_DISEASES } from '../data/diseasesData';
import { Plus } from 'lucide-react';

interface DiseasesSectionProps {
  onOpenDiseases?: () => void;
}

export const DiseasesSection: React.FC<DiseasesSectionProps> = ({ onOpenDiseases }) => {
  const [diseases] = useState<DiseaseEntry[]>(INITIAL_DISEASES);

  const featuredDisease = diseases.find((d) => d.type === 'featured') || diseases[0];
  const standardDiseases = diseases.filter((d) => d.type === 'standard' && d.id !== featuredDisease?.id);

  return (
    <section id="diseases" className="w-full bg-white py-[60px] px-[20px] border-b border-gray-100 selection:bg-black selection:text-white">
      <div className="max-w-[1200px] mx-auto">
        
        {/* ── Section Header ───────────────────────────────── */}
        <div className="mb-[48px]">
          {/* Small Grey Diseases Badge */}
          <div className="inline-block bg-[#f4f4f4] text-[#444] text-[13px] font-medium px-3 py-1 rounded-[8px] mb-3 font-sans">
            Diseases
          </div>

          {/* Large Heading */}
          <h2 className="font-display font-medium text-[44px] sm:text-[54px] md:text-[64px] leading-[1.05] tracking-[-2.5px] text-[#0A0C10] mb-5">
            Behind the diagnosis
          </h2>

          {/* Subtitle and View All Diseases Button */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <p className="max-w-[480px] text-[#666] text-[17px] sm:text-[18px] font-medium leading-[1.5] opacity-80 font-sans">
              Clinical staging criteria, differential lesion analysis, and field evidence from endemic Skin NTD surveillance across Nigeria.
            </p>

            <button
              onClick={onOpenDiseases}
              className="inline-flex items-center justify-center bg-black text-white rounded-[40px] text-[14px] font-semibold px-7 py-3 transition-transform duration-200 hover:scale-[1.02] shadow-sm w-fit font-sans shrink-0 cursor-pointer"
            >
              View all diseases
            </button>
          </div>
        </div>

        {/* ── Featured Disease Card (Full-Width 2-Column Card) ──────── */}
        {featuredDisease && (
          <div
            onClick={onOpenDiseases}
            className="grid grid-cols-1 lg:grid-cols-2 rounded-[20px] border border-[#f0f0f0] bg-[#fcfcfc] min-h-[520px] overflow-hidden mb-[40px] shadow-xs group cursor-pointer"
          >
            
            {/* Left Side: Interactive Video Container */}
            <div className="relative w-full h-[320px] lg:h-full min-h-[320px] overflow-hidden bg-black">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-108"
                src={featuredDisease.video_url}
              />

              {/* Dark Hover Overlay */}
              <div className="absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-400 group-hover:opacity-100 pointer-events-none" />

              {/* Centered '+' Icon Inside 70px Circle */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[70px] h-[70px] rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white scale-70 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <Plus className="w-8 h-8 stroke-[2.5]" />
                </div>
              </div>

              {/* 4 L-Shaped Corner Brackets */}
              <div className="absolute top-[15px] left-[15px] w-[12px] h-[12px] border-t-[1.5px] border-l-[1.5px] border-white pointer-events-none opacity-85" />
              <div className="absolute top-[15px] right-[15px] w-[12px] h-[12px] border-t-[1.5px] border-r-[1.5px] border-white pointer-events-none opacity-85" />
              <div className="absolute bottom-[15px] left-[15px] w-[12px] h-[12px] border-b-[1.5px] border-l-[1.5px] border-white pointer-events-none opacity-85" />
              <div className="absolute bottom-[15px] right-[15px] w-[12px] h-[12px] border-b-[1.5px] border-r-[1.5px] border-white pointer-events-none opacity-85" />
            </div>

            {/* Right Side: Featured Content */}
            <div className="p-[32px] sm:p-[40px] lg:p-[60px] flex flex-col justify-between">
              <div>
                {/* Priority Badge */}
                {featuredDisease.badge && (
                  <span className="inline-block bg-black text-white text-[12px] font-semibold rounded-[20px] px-3 py-1 mb-5 font-sans">
                    {featuredDisease.badge}
                  </span>
                )}

                {/* Featured Title */}
                <h3 className="font-display font-medium text-[28px] sm:text-[36px] lg:text-[48px] leading-[1.15] tracking-[-1.5px] text-[#0A0C10] mb-4">
                  {featuredDisease.title}
                </h3>

                {/* Featured Description */}
                {featuredDisease.description && (
                  <p className="text-[#666] text-[16px] sm:text-[17px] leading-[1.6] font-sans">
                    {featuredDisease.description}
                  </p>
                )}
              </div>

              {/* Footer with Author and Category Badge */}
              <div className="pt-6 mt-8 border-t border-[#f0f0f0] flex items-center justify-between">
                <span className="text-[#444] text-[14px] font-medium font-sans">
                  {featuredDisease.author || 'By NTBLCP Surveillance Panel'}
                </span>

                <span
                  className="rounded-[20px] text-white text-[11px] font-semibold px-3 py-1 capitalize font-sans shadow-2xs"
                  style={{ backgroundColor: featuredDisease.category_color }}
                >
                  {featuredDisease.category}
                </span>
              </div>
            </div>

          </div>
        )}

        {/* ── Blog / Disease Grid (3 Standard Cards) ──────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">
          {standardDiseases.map((disease) => (
            <article
              key={disease.id}
              onClick={onOpenDiseases}
              className="flex flex-col group cursor-pointer"
            >
              
              {/* Video Container (16:10 Aspect Ratio with Hover Effects) */}
              <div className="relative w-full aspect-[16/10] rounded-[20px] overflow-hidden bg-black mb-4">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-108"
                  src={disease.video_url}
                />

                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-400 group-hover:opacity-100 pointer-events-none" />

                {/* Centered '+' Icon Inside 70px Circle */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[60px] h-[60px] rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white scale-70 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                    <Plus className="w-7 h-7 stroke-[2.5]" />
                  </div>
                </div>

                {/* 4 L-Shaped Corner Brackets */}
                <div className="absolute top-[15px] left-[15px] w-[12px] h-[12px] border-t-[1.5px] border-l-[1.5px] border-white pointer-events-none opacity-85" />
                <div className="absolute top-[15px] right-[15px] w-[12px] h-[12px] border-t-[1.5px] border-r-[1.5px] border-white pointer-events-none opacity-85" />
                <div className="absolute bottom-[15px] left-[15px] w-[12px] h-[12px] border-b-[1.5px] border-l-[1.5px] border-white pointer-events-none opacity-85" />
                <div className="absolute bottom-[15px] right-[15px] w-[12px] h-[12px] border-b-[1.5px] border-r-[1.5px] border-white pointer-events-none opacity-85" />
              </div>

              {/* Title & Category Badge Row */}
              <div className="flex items-start justify-between gap-3 pt-1">
                <h4 className="font-display font-semibold text-[17px] leading-[1.35] text-[#0A0C10] group-hover:text-[#0082FF] transition-colors flex-1">
                  {disease.title}
                </h4>

                <span
                  className="rounded-[20px] text-white text-[11px] font-semibold px-3 py-1 capitalize font-sans shrink-0 shadow-2xs"
                  style={{ backgroundColor: disease.category_color }}
                >
                  {disease.category}
                </span>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
