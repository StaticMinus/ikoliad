import React, { useState } from 'react';
import type { DiseaseEntry } from '../data/diseasesData';
import { INITIAL_DISEASES } from '../data/diseasesData';
import { Plus, ArrowUpRight } from 'lucide-react';
import { BlobVideo } from './ui/BlobVideo';
import { Interactive3DCard } from './ui/Interactive3DCard';
import { MagneticButton } from './ui/MagneticButton';

interface DiseasesSectionProps {
  onOpenDiseases?: () => void;
}

export const DiseasesSection: React.FC<DiseasesSectionProps> = ({ onOpenDiseases }) => {
  const [diseases] = useState<DiseaseEntry[]>(INITIAL_DISEASES);

  const featuredDisease = diseases.find((d) => d.type === 'featured') || diseases[0];
  const standardDiseases = diseases.filter((d) => d.type === 'standard' && d.id !== featuredDisease?.id);

  return (
    <section id="diseases" className="w-full bg-[#FBFBFD] py-16 sm:py-24 px-4 sm:px-8 md:px-12 border-b border-black/5 selection:bg-[#0071E3] selection:text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* ── Section Header ───────────────────────────────── */}
        <div className="mb-10 sm:mb-14">
          {/* Small Grey Diseases Badge */}
          <div className="inline-flex items-center gap-1.5 bg-white border border-black/8 text-[#1D1D1F] text-xs font-mono font-bold px-3 py-1 rounded-full mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" />
            <span>DISEASES &amp; DIFFERENTIALS</span>
          </div>

          {/* Large Heading */}
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl leading-[1.06] tracking-tight text-[#1D1D1F] mb-4">
            Behind the diagnosis.
          </h2>

          {/* Subtitle and View All Diseases Button */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <p className="max-w-xl text-gray-500 text-sm sm:text-base font-normal leading-relaxed">
              Clinical staging criteria, differential lesion analysis, and field evidence from endemic Skin NTD surveillance across Nigeria.
            </p>

            <MagneticButton onClick={onOpenDiseases}>
              <button
                className="inline-flex items-center justify-center gap-2 bg-[#1D1D1F] hover:bg-black text-white rounded-full text-xs font-bold px-6 py-3 transition-transform duration-200 hover:scale-105 shadow-md shrink-0 cursor-pointer group"
              >
                <span>View all diseases</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* ── Featured Disease Card (Full-Width 2-Column Card) ──────── */}
        {featuredDisease && (
          <Interactive3DCard maxTilt={5} className="mb-8 sm:mb-10">
            <div
              onClick={onOpenDiseases}
              className="grid grid-cols-1 lg:grid-cols-2 rounded-[28px] sm:rounded-[32px] border border-black/5 bg-white min-h-[460px] overflow-hidden shadow-lg group cursor-pointer"
            >
              
              {/* Left Side: Interactive Video / Image Container */}
              <div className="relative w-full h-[300px] lg:h-full min-h-[300px] overflow-hidden bg-black">
                {featuredDisease.video_url ? (
                  <BlobVideo
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover bw-reveal transition-transform duration-700 ease-out group-hover:scale-105"
                    src={featuredDisease.video_url}
                  />
                ) : (
                  <img
                    src={featuredDisease.image_url}
                    alt={featuredDisease.title}
                    className="w-full h-full object-cover bw-reveal transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}

                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

                {/* Centered '+' Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white scale-75 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 shadow-lg">
                    <Plus className="w-6 h-6 stroke-[2.5]" />
                  </div>
                </div>

                {/* 4 L-Shaped Corner Brackets */}
                <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-white pointer-events-none opacity-80" />
                <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-white pointer-events-none opacity-80" />
                <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-white pointer-events-none opacity-80" />
                <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-white pointer-events-none opacity-80" />
              </div>

              {/* Right Side: Featured Content */}
              <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Priority Badge */}
                  {featuredDisease.badge && (
                    <span className="inline-block bg-[#1D1D1F] text-white text-[10px] font-mono font-bold uppercase rounded-full px-3 py-1">
                      {featuredDisease.badge}
                    </span>
                  )}

                  {/* Featured Title */}
                  <h3 className="font-display font-black text-xl sm:text-2xl lg:text-3xl leading-snug tracking-tight text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                    {featuredDisease.title}
                  </h3>

                  {/* Featured Description */}
                  {featuredDisease.description && (
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-normal">
                      {featuredDisease.description}
                    </p>
                  )}
                </div>

                {/* Footer with Author and Category Badge */}
                <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between">
                  <span className="text-gray-400 text-xs font-mono font-semibold">
                    {featuredDisease.author || 'By NTBLCP Surveillance Panel'}
                  </span>

                  <span
                    className="rounded-full text-white text-[10px] font-mono font-bold px-3 py-1 shadow-xs"
                    style={{ backgroundColor: featuredDisease.category_color }}
                  >
                    {featuredDisease.category}
                  </span>
                </div>
              </div>

            </div>
          </Interactive3DCard>
        )}

        {/* ── Disease Grid (3 Standard Cards) ──────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {standardDiseases.map((disease) => (
            <Interactive3DCard key={disease.id} maxTilt={6}>
              <article
                onClick={onOpenDiseases}
                className="flex flex-col bg-white p-4 rounded-[28px] border border-black/5 shadow-xs hover:shadow-md transition-all group cursor-pointer h-full justify-between"
              >
                
                <div>
                  {/* Image / Video Container (16:10 Aspect Ratio with Hover Effects) */}
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-black mb-4">
                    {disease.video_url ? (
                      <BlobVideo
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover bw-reveal transition-transform duration-700 ease-out group-hover:scale-105"
                        src={disease.video_url}
                      />
                    ) : (
                      <img
                        src={disease.image_url}
                        alt={disease.title}
                        className="w-full h-full object-cover bw-reveal transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}

                    {/* Dark Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

                    {/* Centered '+' Icon */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-11 h-11 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white scale-75 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 shadow-md">
                        <Plus className="w-5 h-5 stroke-[2.5]" />
                      </div>
                    </div>

                    {/* 4 L-Shaped Corner Brackets */}
                    <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-white pointer-events-none opacity-80" />
                    <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t-2 border-r-2 border-white pointer-events-none opacity-80" />
                    <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b-2 border-l-2 border-white pointer-events-none opacity-80" />
                    <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-white pointer-events-none opacity-80" />
                  </div>

                  {/* Title */}
                  <h4 className="font-bold text-sm sm:text-base leading-snug text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                    {disease.title}
                  </h4>
                </div>

                {/* Category Badge Row */}
                <div className="flex items-center justify-between pt-4 mt-3 border-t border-black/5">
                  <span className="text-[10px] font-mono font-bold text-gray-400">
                    DIAGNOSTIC CRITERIA
                  </span>

                  <span
                    className="rounded-full text-white text-[10px] font-mono font-bold px-2.5 py-0.5 shadow-2xs"
                    style={{ backgroundColor: disease.category_color }}
                  >
                    {disease.category}
                  </span>
                </div>

              </article>
            </Interactive3DCard>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DiseasesSection;
