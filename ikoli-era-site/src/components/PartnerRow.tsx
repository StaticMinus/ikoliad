import React from 'react';
import { ShieldCheck, Layers, Building2, Globe2 } from 'lucide-react';

export const PartnerRow: React.FC = () => {
  const partners = [
    {
      name: 'RedAid Nigeria',
      icon: (
        <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
          +
        </div>
      ),
    },
    {
      name: 'FMoHSW Nigeria',
      icon: <Building2 className="w-5 h-5 text-emerald-600" />,
    },
    {
      name: 'NTBLCP Programme',
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
    },
    {
      name: 'Circles AI',
      icon: (
        <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-blue-600" />
        </div>
      ),
    },
    {
      name: 'DHIS2 Integrated',
      icon: <Layers className="w-5 h-5 text-indigo-600" />,
    },
    {
      name: 'DAHW Relief',
      icon: <Globe2 className="w-5 h-5 text-teal-600" />,
    },
  ];

  return (
    <section className="w-full bg-white py-14 px-6 md:px-12 border-b border-gray-100 overflow-hidden select-none">
      <style>{`
        @keyframes scrollPartnersMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .partner-marquee-track {
          display: flex;
          width: max-content;
          animation: scrollPartnersMarquee 22s linear infinite;
        }
        .partner-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-6xl mx-auto text-center space-y-6">
        
        {/* Faint Elegant Description Header */}
        <div className="space-y-1">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block font-sans">
            Trusted By Leading Health Ministries, Clinics & Surveillance Authorities
          </span>
          <p className="text-[11px] text-gray-300 font-mono">
            National Public Health Standards • Zero-PII Cryptographic Tokenization
          </p>
        </div>

        {/* Continuous Animated Moving Marquee Track */}
        <div className="relative w-full overflow-hidden py-3">
          
          {/* Edge Gradient Fade Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Partner Track */}
          <div className="partner-marquee-track flex items-center gap-14 cursor-pointer">
            {[...partners, ...partners, ...partners, ...partners].map((p, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 font-display font-extrabold text-base tracking-tight text-[#0A0C10]/80 hover:text-[#0A0C10] transition-colors shrink-0 group"
              >
                <span className="group-hover:scale-110 transition-transform">{p.icon}</span>
                <span className="group-hover:text-[#0082FF] transition-colors font-sans font-bold">{p.name}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
