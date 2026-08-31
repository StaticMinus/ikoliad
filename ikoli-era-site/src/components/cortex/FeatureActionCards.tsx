import React from 'react';
import { Sparkles, BarChart2, BookOpen, ShieldAlert } from 'lucide-react';

interface FeatureActionCardsProps {
  onSelectQuery: (query: string) => void;
  isDark?: boolean;
}

export const FeatureActionCards: React.FC<FeatureActionCardsProps> = ({
  onSelectQuery,
  isDark = true,
}) => {
  const cards = [
    {
      icon: BarChart2,
      title: 'Synthesize Data',
      desc: 'Summarize 2025 South-East surveillance indicators across 312 sentinel health facilities.',
      query: 'Give an executive summary of all 5 South-East states',
      iconColor: 'text-[#00D2FF] bg-blue-950/60 border border-blue-800/40',
    },
    {
      icon: BookOpen,
      title: 'Health Education',
      desc: 'Explain leprosy early warning signs, destigmatization facts, and 100% free national treatment.',
      query: 'What is leprosy and is treatment completely free?',
      iconColor: 'text-cyan-300 bg-cyan-950/60 border border-cyan-800/40',
    },
    {
      icon: ShieldAlert,
      title: 'Check Protocols',
      desc: 'Review WHO MDT blister pack protocols, Grade-2 disability reduction, and IS2404 qPCR tests.',
      query: 'What is the difference between PB and MB leprosy treatment?',
      iconColor: 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/40',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full max-w-3xl mx-auto pt-2">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <button
            key={idx}
            onClick={() => onSelectQuery(card.query)}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,113,227,0.15)] cursor-pointer group flex flex-col justify-between space-y-2 ${
              isDark
                ? 'bg-[#141418] hover:bg-[#18181F] border-white/10 hover:border-blue-500/40 text-white'
                : 'bg-white/80 hover:bg-white border-black/5 hover:border-black/10 text-[#1D1D1F] shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${card.iconColor}`}>
                <IconComponent className="w-4 h-4" />
              </div>
              <Sparkles className="w-3.5 h-3.5 text-[#00D2FF] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold text-xs sm:text-sm tracking-tight text-white group-hover:text-[#00D2FF] transition-colors">
                {card.title}
              </h3>
              <p className="text-[11px] leading-relaxed text-gray-400 line-clamp-2">
                {card.desc}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
