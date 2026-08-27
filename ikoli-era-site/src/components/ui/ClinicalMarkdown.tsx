import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ClinicalMarkdownProps {
  content: string;
  onSelectOption?: (optionText: string) => void;
  isDark?: boolean;
}

export const ClinicalMarkdown: React.FC<ClinicalMarkdownProps> = ({
  content,
  onSelectOption,
  isDark = true,
}) => {
  // Clean and normalize content lines
  const cleanContent = content
    .replace(/\r\n/g, '\n')
    .replace(/\\n/g, '\n')
    .trim();

  const lines = cleanContent.split('\n');

  // Interactive questions / choices extractor
  const detectedInteractiveOptions: string[] = [];

  // Helper to safely format inline bold/italic and strip all stray asterisks
  const formatInlineText = (text: string): React.ReactNode[] => {
    // 1. First tokenize markdown bold **...** and italic *...*
    const parts: React.ReactNode[] = [];
    
    // Replace double asterisks with a token
    const boldTokens: string[] = [];
    let processed = text.replace(/\*\*(.*?)\*\*/g, (_, p1) => {
      const idx = boldTokens.length;
      boldTokens.push(p1.replace(/\*/g, '').trim());
      return `___BOLD_TOKEN_${idx}___`;
    });

    // Replace single asterisk italic with a token
    const italicTokens: string[] = [];
    processed = processed.replace(/\*(.*?)\*/g, (_, p1) => {
      const idx = italicTokens.length;
      italicTokens.push(p1.replace(/\*/g, '').trim());
      return `___ITALIC_TOKEN_${idx}___`;
    });

    // Remove any remaining stray asterisks from the plain text
    processed = processed.replace(/\*/g, '');

    // Now split and reconstruct React elements
    const tokenRegex = /___(BOLD|ITALIC)_TOKEN_(\d+)___/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(processed)) !== null) {
      if (match.index > lastIndex) {
        parts.push(processed.substring(lastIndex, match.index));
      }

      const type = match[1];
      const tokenIdx = parseInt(match[2], 10);

      if (type === 'BOLD') {
        parts.push(
          <strong
            key={`b-${match.index}`}
            className={isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}
          >
            {boldTokens[tokenIdx]}
          </strong>
        );
      } else if (type === 'ITALIC') {
        parts.push(
          <em
            key={`i-${match.index}`}
            className={isDark ? 'text-gray-300 italic' : 'text-gray-700 italic'}
          >
            {italicTokens[tokenIdx]}
          </em>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < processed.length) {
      parts.push(processed.substring(lastIndex));
    }

    return parts;
  };

  return (
    <div className={`space-y-3 font-sans text-sm sm:text-base leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        // Empty line
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Horizontal divider
        if (trimmed === '---' || trimmed === '___' || trimmed.startsWith('***')) {
          return <hr key={idx} className={`my-3 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`} />;
        }

        // Headings (# or ## or ###)
        if (trimmed.startsWith('#')) {
          const headingText = trimmed.replace(/^#+\s*/, '').replace(/\*/g, '');
          return (
            <h4
              key={idx}
              className={`font-bold tracking-tight text-sm sm:text-base mt-3 mb-1.5 flex items-center gap-2 ${
                isDark ? 'text-[#00D2FF]' : 'text-[#0071E3]'
              }`}
            >
              <span>{headingText}</span>
            </h4>
          );
        }

        // Bullet points (• or - or *)
        if (/^[•\-\*]\s+/.test(trimmed)) {
          const bulletBody = trimmed.replace(/^[•\-\*]\s+/, '');
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-1 my-1">
              <span className="text-[#10B981] font-bold text-base leading-none shrink-0 mt-1">•</span>
              <div className="flex-1 leading-relaxed">
                {formatInlineText(bulletBody)}
              </div>
            </div>
          );
        }

        // Numbered list items (1. 2. 3.)
        if (/^\d+[\.\)]\s+/.test(trimmed)) {
          const numberMatch = trimmed.match(/^(\d+)[\.\)]\s+(.*)/);
          if (numberMatch) {
            const num = numberMatch[1];
            const itemBody = numberMatch[2];

            // If item looks like an option or step, extract for interactive button
            if (itemBody.length < 100 && onSelectOption) {
              const cleanItem = itemBody.replace(/\*/g, '').trim();
              if (cleanItem.length > 5 && !detectedInteractiveOptions.includes(cleanItem)) {
                detectedInteractiveOptions.push(cleanItem);
              }
            }

            return (
              <div key={idx} className="flex items-start gap-2.5 pl-1 my-1.5">
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold shrink-0 ${
                  isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-200 text-gray-800'
                }`}>
                  {num}
                </span>
                <div className="flex-1 leading-relaxed">
                  {formatInlineText(itemBody)}
                </div>
              </div>
            );
          }
        }

        // Table Rows (starts with |)
        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
          const cells = trimmed
            .split('|')
            .filter((_, cIdx, arr) => cIdx > 0 && cIdx < arr.length - 1)
            .map((c) => c.trim());

          // Skip separator rows (|---|---|)
          if (cells.every((c) => /^-+$/.test(c))) {
            return null;
          }

          return (
            <div key={idx} className="grid grid-cols-2 gap-2 my-1 text-xs sm:text-sm font-mono border-b border-white/5 pb-1">
              {cells.map((cell, cIdx) => (
                <div key={cIdx} className={cIdx === 0 ? 'font-bold text-[#10B981]' : 'text-gray-300'}>
                  {formatInlineText(cell)}
                </div>
              ))}
            </div>
          );
        }

        // Standard Paragraph
        return (
          <p key={idx} className="leading-relaxed">
            {formatInlineText(trimmed)}
          </p>
        );
      })}

      {/* Interactive Clickable Choices Extracted from Questions & Lists */}
      {detectedInteractiveOptions.length > 0 && onSelectOption && (
        <div className={`mt-4 pt-3 border-t flex flex-wrap items-center gap-2 ${isDark ? 'border-white/10' : 'border-black/5'}`}>
          <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#10B981]" />
            <span>Interactive choices (click to select):</span>
          </span>
          {detectedInteractiveOptions.map((opt, oIdx) => (
            <button
              key={oIdx}
              onClick={() => onSelectOption(opt)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 group active:scale-95 text-left ${
                isDark
                  ? 'bg-white/5 hover:bg-[#0071E3]/20 border-white/15 hover:border-[#0071E3]/50 text-gray-200 hover:text-white'
                  : 'bg-white hover:bg-blue-50 border-black/10 hover:border-blue-300 text-gray-800 hover:text-[#0071E3] shadow-xs'
              }`}
            >
              <span className="truncate max-w-[280px] sm:max-w-[420px]">{opt}</span>
              <ArrowRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
