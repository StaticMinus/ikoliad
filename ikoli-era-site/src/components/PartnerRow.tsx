import React from 'react';
import { ShieldCheck, Cpu, GraduationCap, Globe2, HeartHandshake } from 'lucide-react';

export const PartnerRow: React.FC = () => {
  // Official 7 Consortium Partners from Governance Charter
  const partners = [
    {
      name: 'DAHW German Leprosy & TB Relief Association e.V.',
      acronym: 'DAHW',
      tag: 'International Relief Partner',
      badgeColor: '#0D9488',
      icon: <Globe2 className="w-5 h-5 text-teal-600" />,
      isImage: false,
    },
    {
      name: 'RedAid Nigeria',
      acronym: 'RAN',
      tag: 'Clinical Field Operations',
      badgeColor: '#DE322D',
      logoUrl: '/partners/redaid.jpg',
      isImage: true,
    },
    {
      name: 'Digital Dreams Limited',
      acronym: 'DD',
      tag: 'Technology & AI Engineering Lead',
      badgeColor: '#0071E3',
      icon: <Cpu className="w-5 h-5 text-[#0071E3]" />,
      isImage: false,
    },
    {
      name: 'Federal Ministry of Health & Social Welfare / NTBLCP',
      acronym: 'FMOH / NTBLCP',
      tag: 'Federal Health Authority',
      badgeColor: '#10B981',
      logoUrl: '/partners/fmoh.png',
      isImage: true,
    },
    {
      name: 'University of Nigeria, Nsukka — Vaccine Research Centre',
      acronym: 'VRC-UNN',
      tag: 'Academic & Vaccine Research Centre',
      badgeColor: '#7C3AED',
      icon: <GraduationCap className="w-5 h-5 text-purple-600" />,
      isImage: false,
    },
    {
      name: 'IDEA Nigeria',
      acronym: 'IDEA',
      tag: 'Dignity, Inclusion & Advocacy',
      badgeColor: '#EC4899',
      icon: <HeartHandshake className="w-5 h-5 text-pink-600" />,
      isImage: false,
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
          animation: scrollPartnersMarquee 32s linear infinite;
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
              Official Consortium Partners
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Governed by Nigeria's national health authorities, academic medical centers, and clinical relief organizations.
          </p>
        </div>

        {/* Continuous Animated Moving Marquee Track */}
        <div className="relative w-full overflow-hidden py-2">
          
          {/* Edge Gradient Fade Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA]/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#FAFAFA] via-[#FAFAFA]/90 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Partner Track */}
          <div className="partner-marquee-track flex items-center gap-5 sm:gap-6 cursor-pointer">
            {[...partners, ...partners, ...partners].map((p, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3.5 bg-white px-5 py-3.5 rounded-2xl border border-black/5 shadow-xs hover:shadow-md hover:border-black/10 transition-all shrink-0 group"
              >
                {/* Logo / Icon Container */}
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center p-1.5 shrink-0 overflow-hidden group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: `${p.badgeColor}12` }}
                >
                  {p.isImage && p.logoUrl ? (
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
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-xs sm:text-sm text-[#1D1D1F] tracking-tight group-hover:text-[#0071E3] transition-colors leading-tight">
                      {p.name}
                    </span>
                    <span 
                      className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold shrink-0"
                      style={{ color: p.badgeColor, backgroundColor: `${p.badgeColor}15` }}
                    >
                      {p.acronym}
                    </span>
                  </div>
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
