import React from 'react';
import { Layers, Globe2, ShieldCheck } from 'lucide-react';

export const PartnerRow: React.FC = () => {
  const partners = [
    {
      name: 'Federal Ministry of Health',
      acronym: 'FMoHSW',
      logoUrl: '/partners/fmoh.png',
      isImage: true,
      tag: 'Federal Authority',
    },
    {
      name: 'NTBLCP Programme',
      acronym: 'NTBLCP',
      logoUrl: '/partners/ntblcp.jpg',
      isImage: true,
      tag: 'National Custodian',
    },
    {
      name: 'RedAid Nigeria',
      acronym: 'RedAid',
      logoUrl: '/partners/redaid.jpg',
      isImage: true,
      tag: 'Clinical Field Operations',
    },
    {
      name: 'Circles AI',
      acronym: 'Circles AI',
      icon: (
        <div className="w-8 h-8 rounded-full border-2 border-[#1D1D1F] flex items-center justify-center bg-white shadow-xs">
          <div className="w-3.5 h-3.5 rounded-full bg-[#0071E3]" />
        </div>
      ),
      isImage: false,
      tag: 'Neural Vision Co-Lead',
    },
    {
      name: 'DHIS2 Integrated',
      acronym: 'DHIS2',
      icon: (
        <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
          <Layers className="w-4 h-4" />
        </div>
      ),
      isImage: false,
      tag: 'National EHR Pipeline',
    },
    {
      name: 'DAHW Relief',
      acronym: 'DAHW',
      icon: (
        <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shadow-xs">
          <Globe2 className="w-4 h-4" />
        </div>
      ),
      isImage: false,
      tag: 'Geneva WHO Partner',
    },
  ];

  return (
    <section className="w-full bg-[#FAFAFA] py-12 sm:py-16 px-4 sm:px-8 md:px-12 border-y border-black/5 overflow-hidden select-none">
      <style>{`
        @keyframes scrollPartnersMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .partner-marquee-track {
          display: flex;
          width: max-content;
          animation: scrollPartnersMarquee 28s linear infinite;
        }
        .partner-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Badge & Description */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-white px-3.5 py-1 rounded-full border border-black/5 text-[11px] font-semibold text-gray-500 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0071E3]" />
            <span className="uppercase tracking-wider font-mono text-[10px] text-gray-600">
              Official Institutional Custodianship & Partnerships
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Governed by Nigeria's national health authorities and leading leprosy relief organizations.
          </p>
        </div>

        {/* Continuous Animated Moving Marquee Track */}
        <div className="relative w-full overflow-hidden py-2">
          
          {/* Edge Gradient Fade Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA]/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#FAFAFA] via-[#FAFAFA]/90 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Partner Track */}
          <div className="partner-marquee-track flex items-center gap-6 sm:gap-8 cursor-pointer">
            {[...partners, ...partners, ...partners].map((p, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3.5 bg-white px-5 py-3 rounded-2xl border border-black/5 shadow-xs hover:shadow-md hover:border-black/10 transition-all shrink-0 group"
              >
                {/* Logo Container */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#F5F5F7]/80 p-1 shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                  {p.isImage ? (
                    <img
                      src={p.logoUrl}
                      alt={p.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    p.icon
                  )}
                </div>

                {/* Name & Tag */}
                <div className="flex flex-col text-left">
                  <span className="font-display font-black text-sm text-[#1D1D1F] tracking-tight group-hover:text-[#0071E3] transition-colors leading-tight">
                    {p.name}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 font-semibold mt-0.5">
                    {p.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
