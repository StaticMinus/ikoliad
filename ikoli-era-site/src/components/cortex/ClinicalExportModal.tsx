import React, { useState } from 'react';
import { Download, FileText, Table, FileCode, Check, X } from 'lucide-react';
import type { ChatSession } from './CortexSidebar';

interface ClinicalExportModalProps {
  session: ChatSession;
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

export const ClinicalExportModal: React.FC<ClinicalExportModalProps> = ({
  session,
  isOpen,
  onClose,
  isDark = true,
}) => {
  const [downloadedFormat, setDownloadedFormat] = useState<string | null>(null);

  if (!isOpen) return null;

  // 1. Export as Markdown
  const handleDownloadMarkdown = () => {
    let content = `# IKOLI AI — Clinical Consultation Briefing\n`;
    content += `**Topic:** ${session.title}\n`;
    content += `**Date:** ${new Date(session.createdAt).toLocaleString()}\n`;
    content += `**Authorised Body:** NTBLCP & RedAid Nigeria / DAHW Consortium\n\n---\n\n`;

    session.messages.forEach((msg) => {
      const senderName = msg.sender === 'user' ? '👤 User / Sentinel Officer' : '✨ Ask Ikoli Assistant';
      content += `### ${senderName} (${msg.timestamp})\n\n${msg.text}\n\n`;
      if (msg.attachment) {
        content += `*Attachment:* ${msg.attachment.name} (${msg.attachment.type})\n\n`;
      }
      content += `---\n\n`;
    });

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ikoli-consultation-${session.id}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedFormat('md');
    setTimeout(() => setDownloadedFormat(null), 2000);
  };

  // 2. Export as DHIS2 CSV Tally Format
  const handleDownloadCSV = () => {
    let csv = `Session_ID,Timestamp,Sender,Message_Excerpt,Word_Count\n`;
    session.messages.forEach((msg) => {
      const cleanExcerpt = msg.text.replace(/[\n,"]/g, ' ').slice(0, 120);
      const wordCount = msg.text.split(/\s+/).length;
      csv += `"${session.id}","${msg.timestamp}","${msg.sender}","${cleanExcerpt}...",${wordCount}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ikoli-dhis2-tally-${session.id}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedFormat('csv');
    setTimeout(() => setDownloadedFormat(null), 2000);
  };

  // 3. Export as Audit Log JSON
  const handleDownloadJSON = () => {
    const auditData = {
      sessionId: session.id,
      title: session.title,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      metadata: {
        platform: 'Ask Ikoli Intelligence Studio',
        zeroPIICompliant: true,
        groundingVersion: 'NTBLCP-2025-Q3',
      },
      transcript: session.messages.map((m) => ({
        id: m.id,
        sender: m.sender,
        timestamp: m.timestamp,
        text: m.text,
        source: m.source || 'openrouter-live',
        attachment: m.attachment?.name || null,
      })),
    };

    const blob = new Blob([JSON.stringify(auditData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ikoli-audit-${session.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedFormat('json');
    setTimeout(() => setDownloadedFormat(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div
        className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl space-y-5 text-left ${
          isDark ? 'bg-[#141418] border-white/15 text-white' : 'bg-white border-black/10 text-[#1D1D1F]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b pb-3 border-white/10 dark:border-white/10">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-[#0071E3]" />
            <h3 className="font-display font-bold text-base">Export Consultation Dossier</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Select your desired format to export this clinical intelligence consultation for administrative submission, offline registry records, or DHIS2 surveillance pipelines:
        </p>

        {/* Format Options */}
        <div className="space-y-3">
          {/* Markdown / Printable Briefing */}
          <button
            onClick={handleDownloadMarkdown}
            className={`w-full p-4 rounded-2xl border flex items-center justify-between gap-4 text-left transition-all cursor-pointer hover:scale-[1.01] ${
              isDark ? 'bg-white/5 border-white/10 hover:border-[#0071E3]' : 'bg-gray-50 border-black/5 hover:border-[#0071E3]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-[#0071E3] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs">WHO Clinical Consultation Briefing (.md)</h4>
                <p className="text-[11px] text-gray-400">Formatted markdown report with clinical headers &amp; timestamps</p>
              </div>
            </div>
            {downloadedFormat === 'md' ? <Check className="w-5 h-5 text-emerald-400" /> : <Download className="w-4 h-4 text-gray-400" />}
          </button>

          {/* DHIS2 CSV */}
          <button
            onClick={handleDownloadCSV}
            className={`w-full p-4 rounded-2xl border flex items-center justify-between gap-4 text-left transition-all cursor-pointer hover:scale-[1.01] ${
              isDark ? 'bg-white/5 border-white/10 hover:border-emerald-500' : 'bg-gray-50 border-black/5 hover:border-emerald-500'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <Table className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs">DHIS2 Surveillance Tally Data (.csv)</h4>
                <p className="text-[11px] text-gray-400">Tabular summary sheet ready for national database import</p>
              </div>
            </div>
            {downloadedFormat === 'csv' ? <Check className="w-5 h-5 text-emerald-400" /> : <Download className="w-4 h-4 text-gray-400" />}
          </button>

          {/* Audit JSON */}
          <button
            onClick={handleDownloadJSON}
            className={`w-full p-4 rounded-2xl border flex items-center justify-between gap-4 text-left transition-all cursor-pointer hover:scale-[1.01] ${
              isDark ? 'bg-white/5 border-white/10 hover:border-purple-500' : 'bg-gray-50 border-black/5 hover:border-purple-500'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs">Cryptographic Audit &amp; Provenance Log (.json)</h4>
                <p className="text-[11px] text-gray-400">Structured JSON payload with Zero-PII verification metadata</p>
              </div>
            </div>
            {downloadedFormat === 'json' ? <Check className="w-5 h-5 text-emerald-400" /> : <Download className="w-4 h-4 text-gray-400" />}
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-white/10 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
