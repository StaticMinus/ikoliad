import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { CitationPill } from '../cortex/CitationHovercard';
import { GenUIBlock } from '../cortex/GenUIBlock';

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

  // Helper to safely format inline bold/italic, citations, and strip stray asterisks
  const formatInlineText = (text: string): React.ReactNode[] => {
    // 1. Extract Citation Tokens [WHO-PEP-2024], [NTBLCP-SOP-2024], [DHIS2-NTD-2025], [DAHW-FIELD-2024], [^1]
    const citationTokens: { label: string; key?: string }[] = [];
    let processed = text.replace(/\[(WHO[-_ ]PEP[-_ ]?2024[^\]]*|NTBLCP[-_ ]SOP[-_ ]?2024[^\]]*|DHIS2[-_ ]NTD[-_ ]?2025[^\]]*|DAHW[-_ ]FIELD[-_ ]?2024[^\]]*|\^?\d+)\]/gi, (match, p1) => {
      const idx = citationTokens.length;
      let key = 'WHO-PEP-2024';
      const upper = p1.toUpperCase();
      if (upper.includes('NTBLCP')) key = 'NTBLCP-SOP-2024';
      else if (upper.includes('DHIS2')) key = 'DHIS2-NTD-2025';
      else if (upper.includes('DAHW')) key = 'DAHW-FIELD-2024';
      else if (upper.includes('WHO')) key = 'WHO-PEP-2024';

      citationTokens.push({ label: match, key });
      return `___CITATION_TOKEN_${idx}___`;
    });

    const boldTokens: string[] = [];
    processed = processed.replace(/\*\*(.*?)\*\*/g, (_, p1) => {
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

    const tokenRegex = /___(BOLD|ITALIC|CITATION)_TOKEN_(\d+)___/g;
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
      } else if (type === 'CITATION') {
        const cit = citationTokens[tokenIdx];
        parts.push(
          <CitationPill
            key={`c-${match.index}`}
            citationKey={cit.key}
            label={cit.label}
            isDark={isDark}
          />
        );
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < processed.length) {
      parts.push(processed.substring(lastIndex));
    }

    return parts;
  };

  // Group lines into blocks (GenUI, Tables, Headings, Lists, Paragraphs)
  type Block =
    | { type: 'empty' }
    | { type: 'divider' }
    | { type: 'genui'; subtype: string }
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

    // Check for GenUI codeblock (```genui:chart, ```genui:map, ```genui:supply)
    if (trimmed.startsWith('```genui:') || trimmed.startsWith('```genui')) {
      const subtype = trimmed.replace(/^```genui:?/, '').replace(/```$/, '').trim() || 'chart';
      // skip until closing ```
      i++;
      while (i < rawLines.length && !rawLines[i].trim().startsWith('```')) {
        i++;
      }
      if (i < rawLines.length && rawLines[i].trim().startsWith('```')) {
        i++;
      }
      blocks.push({ type: 'genui', subtype });
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
      const bulletText = trimmed.replace(/^[•\-\*]\s+/, '');
      blocks.push({ type: 'bullet', text: bulletText });
      i++;
      continue;
    }

    const numMatch = trimmed.match(/^(\d+)[\.\)]\s+(.*)/);
    if (numMatch) {
      blocks.push({ type: 'number', num: numMatch[1], text: numMatch[2] });
      i++;
      continue;
    }

    // Check for interactive multiple choice questions (e.g. "A) ...", "B) ...")
    const optionMatch = trimmed.match(/^([A-D])\)\s+(.*)/i);
    if (optionMatch) {
      detectedInteractiveOptions.push(trimmed);
      blocks.push({ type: 'paragraph', text: trimmed });
      i++;
      continue;
    }

    blocks.push({ type: 'paragraph', text: trimmed });
    i++;
  }

  return (
    <div className={`space-y-3.5 text-xs sm:text-sm leading-relaxed font-sans ${
      isDark ? 'text-gray-200' : 'text-[#1D1D1F]'
    }`}>
      {blocks.map((block, idx) => {
        if (block.type === 'empty') return null;

        if (block.type === 'genui') {
          return <GenUIBlock key={idx} type={block.subtype} isDark={isDark} />;
        }

        if (block.type === 'divider') {
          return (
            <hr
              key={idx}
              className={`my-3 border-t ${
                isDark ? 'border-white/10' : 'border-black/5'
              }`}
            />
          );
        }

        if (block.type === 'heading') {
          if (block.level === 1 || block.level === 2) {
            return (
              <h3
                key={idx}
                className={`font-display font-bold text-sm sm:text-base tracking-tight pt-2 border-b pb-1.5 ${
                  isDark
                    ? 'text-white border-white/10'
                    : 'text-[#1D1D1F] border-black/5'
                }`}
              >
                {formatInlineText(block.text)}
              </h3>
            );
          }
          return (
            <h4
              key={idx}
              className={`font-bold text-xs sm:text-sm tracking-tight pt-1.5 ${
                isDark ? 'text-[#00D2FF]' : 'text-[#0071E3]'
              }`}
            >
              {formatInlineText(block.text)}
            </h4>
          );
        }

        if (block.type === 'bullet') {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 sm:pl-2">
              <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                isDark ? 'bg-[#00D2FF]' : 'bg-[#0071E3]'
              }`} />
              <div className="flex-1 leading-relaxed">
                {formatInlineText(block.text)}
              </div>
            </div>
          );
        }

        if (block.type === 'number') {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 sm:pl-2">
              <span className={`font-mono text-[11px] font-bold mt-0.5 px-1.5 py-0.2 rounded-md shrink-0 ${
                isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-[#1D1D1F]'
              }`}>
                {block.num}
              </span>
              <div className="flex-1 leading-relaxed">
                {formatInlineText(block.text)}
              </div>
            </div>
          );
        }

        if (block.type === 'table') {
          return (
            <div key={idx} className="my-3 overflow-x-auto rounded-2xl border border-white/10 dark:border-white/10 shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className={isDark ? 'bg-white/5 text-white' : 'bg-black/5 text-[#1D1D1F]'}>
                    {block.headers.map((h, hIdx) => (
                      <th key={hIdx} className="p-2.5 font-bold border-b border-white/10 font-mono text-[11px]">
                        {formatInlineText(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {block.rows.map((row, rIdx) => (
                    <tr key={rIdx} className={isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-2.5 font-mono text-[11px]">
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

        // Standard Paragraph
        return (
          <p key={idx} className="leading-relaxed">
            {formatInlineText(block.text)}
          </p>
        );
      })}

      {/* Interactive Options Bar (if choices are extracted from prompt) */}
      {detectedInteractiveOptions.length > 0 && onSelectOption && (
        <div className="pt-2 space-y-1.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#0071E3]" />
            <span>Suggested Action</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {detectedInteractiveOptions.map((opt, oIdx) => (
              <button
                key={oIdx}
                onClick={() => onSelectOption(opt)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isDark
                    ? 'bg-blue-500/10 border-blue-500/30 text-[#00D2FF] hover:bg-blue-500/20'
                    : 'bg-blue-50 border-blue-200 text-[#0071E3] hover:bg-blue-100'
                }`}
              >
                <span>{opt}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
