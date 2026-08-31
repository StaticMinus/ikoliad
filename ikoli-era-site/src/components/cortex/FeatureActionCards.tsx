import React from 'react';
import { Sparkles, BarChart2, BookOpen, ShieldAlert } from 'lucide-react';

interface FeatureActionCardsProps {
  onSelectQuery: (query: string) => void;
  isDark?: boolean;
}

export const FeatureActionCards: React.FC<FeatureActionCardsProps> = ({
  onSelectQuery,
  isDark = false,
}) => {
  const cards = [
    {
      icon: BarChart2,
      title: 'Synthesize Data',
      desc: 'Summarize 2025 South-East surveillance indicators across 312 sentinel health facilities.',
      query: 'Give an executive summary of all 5 South-East states',
      iconColor: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-300',
    },
    {
      icon: BookOpen,
      title: 'Health Education',
      desc: 'Explain leprosy early warning signs, destigmatization facts, and 100% free national treatment.',
      query: 'What is leprosy and is treatment completely free?',
      iconColor: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-300',
    },
    {
      icon: ShieldAlert,
      title: 'Check Protocols',
      desc: 'Review WHO MDT blister pack protocols, Grade-2 disability reduction, and IS2404 qPCR tests.',
      query: 'What is the difference between PB and MB leprosy treatment?',
      iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300',
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
            className={`p-4 rounded-2xl border text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer group flex flex-col justify-between space-y-2 ${
              isDark
                ? 'bg-[#18181B]/80 hover:bg-[#202024] border-white/10 hover:border-white/20 text-white'
                : 'bg-white/80 hover:bg-white border-black/5 hover:border-black/10 text-[#1D1D1F] shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${card.iconColor}`}>
                <IconComponent className="w-4 h-4" />
              </div>
              <Sparkles className="w-3.5 h-3.5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold text-xs sm:text-sm tracking-tight text-[#1D1D1F] dark:text-white">
                {card.title}
              </h3>
              <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-2">
                {card.desc}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
