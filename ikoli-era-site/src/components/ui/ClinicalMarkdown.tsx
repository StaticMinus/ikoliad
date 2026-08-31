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

  const rawLines = cleanContent.split('\n');

  // Interactive questions / choices extractor
  const detectedInteractiveOptions: string[] = [];

  // Helper to safely format inline bold/italic and strip all stray asterisks
  const formatInlineText = (text: string): React.ReactNode[] => {
    const boldTokens: string[] = [];
    let processed = text.replace(/\*\*(.*?)\*\*/g, (_, p1) => {
      const idx = boldTokens.length;
      boldTokens.push(p1.replace(/\*/g, '').trim());
      return `___BOLD_TOKEN_${idx}___`;
    });

    const italicTokens: string[] = [];
    processed = processed.replace(/\*(.*?)\*/g, (_, p1) => {
      const idx = italicTokens.length;
      italicTokens.push(p1.replace(/\*/g, '').trim());
      return `___ITALIC_TOKEN_${idx}___`;
    });

    processed = processed.replace(/\*/g, '');

    const tokenRegex = /___(BOLD|ITALIC)_TOKEN_(\d+)___/g;
    const parts: React.ReactNode[] = [];
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
            className={isDark ? 'text-white font-bold' : 'text-[#1D1D1F] font-bold'}
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

  // Group lines into blocks (Tables, Headings, Lists, Paragraphs)
  type Block =
    | { type: 'empty' }
    | { type: 'divider' }
    | { type: 'heading'; level: number; text: string }
    | { type: 'bullet'; text: string }
    | { type: 'number'; num: string; text: string }
    | { type: 'table'; headers: string[]; rows: string[][] }
    | { type: 'paragraph'; text: string };

  const blocks: Block[] = [];
  let i = 0;

  while (i < rawLines.length) {
    const trimmed = rawLines[i].trim();

    if (!trimmed) {
      blocks.push({ type: 'empty' });
      i++;
      continue;
    }

    if (trimmed === '---' || trimmed === '___' || trimmed.startsWith('***')) {
      blocks.push({ type: 'divider' });
      i++;
      continue;
    }

    if (trimmed.startsWith('#')) {
      const level = trimmed.match(/^#+/)?.[0].length || 1;
      const text = trimmed.replace(/^#+\s*/, '').replace(/\*/g, '');
      blocks.push({ type: 'heading', level, text });
      i++;
      continue;
    }

    // Check if start of a Markdown table (| ... |)
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = [];
      while (i < rawLines.length && rawLines[i].trim().startsWith('|') && rawLines[i].trim().endsWith('|')) {
        tableLines.push(rawLines[i].trim());
        i++;
      }

      if (tableLines.length > 0) {
        const parsedRows = tableLines.map((row) =>
          row
            .split('|')
            .filter((_, cIdx, arr) => cIdx > 0 && cIdx < arr.length - 1)
            .map((c) => c.trim())
        );

        // Filter out separator lines (|---|---|)
        const validRows = parsedRows.filter((r) => !r.every((c) => /^-+$/.test(c)));
        if (validRows.length > 0) {
          const headers = validRows[0];
          const rows = validRows.slice(1);
          blocks.push({ type: 'table', headers, rows });
        }
      }
      continue;
    }

    if (/^[•\-\*]\s+/.test(trimmed)) {
      const bulletBody = trimmed.replace(/^[•\-\*]\s+/, '');
      blocks.push({ type: 'bullet', text: bulletBody });
      i++;
      continue;
    }

    if (/^\d+[\.\)]\s+/.test(trimmed)) {
      const numberMatch = trimmed.match(/^(\d+)[\.\)]\s+(.*)/);
      if (numberMatch) {
        const num = numberMatch[1];
        const itemBody = numberMatch[2];
        if (itemBody.length < 100 && onSelectOption) {
          const cleanItem = itemBody.replace(/\*/g, '').trim();
          if (cleanItem.length > 5 && !detectedInteractiveOptions.includes(cleanItem)) {
            detectedInteractiveOptions.push(cleanItem);
          }
        }
        blocks.push({ type: 'number', num, text: itemBody });
        i++;
        continue;
      }
    }

    blocks.push({ type: 'paragraph', text: trimmed });
    i++;
  }

  return (
    <div className={`space-y-3 font-sans text-sm sm:text-base leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
      {blocks.map((block, idx) => {
        if (block.type === 'empty') {
          return <div key={idx} className="h-1" />;
        }

        if (block.type === 'divider') {
          return <hr key={idx} className={`my-3 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`} />;
        }

        if (block.type === 'heading') {
          return (
            <h4
              key={idx}
              className={`font-bold tracking-tight text-base sm:text-lg mt-3 mb-1.5 flex items-center gap-2 ${
                isDark ? 'text-[#00D2FF]' : 'text-[#0071E3]'
              }`}
            >
              <span>{block.text}</span>
            </h4>
          );
        }

        if (block.type === 'bullet') {
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-1 my-1">
              <span className="text-[#10B981] font-bold text-base leading-none shrink-0 mt-1">•</span>
              <div className="flex-1 leading-relaxed">{formatInlineText(block.text)}</div>
            </div>
          );
        }

        if (block.type === 'number') {
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-1 my-1.5">
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold shrink-0 ${
                  isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-200 text-gray-800'
                }`}
              >
                {block.num}
              </span>
              <div className="flex-1 leading-relaxed">{formatInlineText(block.text)}</div>
            </div>
          );
        }

        if (block.type === 'table') {
          return (
            <div
              key={idx}
              className={`my-3 overflow-x-auto rounded-2xl border shadow-xs ${
                isDark ? 'bg-[#151515] border-white/10' : 'bg-white border-black/10'
              }`}
            >
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className={`border-b font-mono uppercase text-[10px] sm:text-[11px] ${
                  isDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-[#F6F6F8] border-black/10 text-gray-700'
                }`}>
                  <tr>
                    {block.headers.map((h, hIdx) => (
                      <th key={hIdx} className="py-2.5 px-3.5 font-bold whitespace-nowrap">
                        {formatInlineText(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`divide-y font-mono ${isDark ? 'divide-white/5' : 'divide-gray-100'}`}>
                  {block.rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className={`transition-colors ${
                        isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                      }`}
                    >
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`py-2.5 px-3.5 whitespace-nowrap ${
                            cIdx === 0
                              ? isDark
                                ? 'font-bold text-white'
                                : 'font-bold text-[#1D1D1F]'
                              : isDark
                              ? 'text-gray-300'
                              : 'text-gray-700'
                          }`}
                        >
                          {formatInlineText(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return (
          <p key={idx} className="leading-relaxed">
            {formatInlineText(block.text)}
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
