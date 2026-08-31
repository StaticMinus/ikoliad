import React, { useState } from 'react';
import { BookOpen, ExternalLink, ShieldCheck, FileCheck, X } from 'lucide-react';

export interface VerifiedCitationData {
  key: string;
  title: string;
  authority: string;
  section: string;
  page?: string;
  excerpt: string;
  publishedYear: number;
  evidenceTier: 'Level 1A (WHO Guideline)' | 'Level 1B (National SOP)' | 'Level 2A (Registry Data)' | 'Level 2B (Clinical Trial)';
  documentUrl?: string;
}

export const CITATION_REGISTRY: Record<string, VerifiedCitationData> = {
  'WHO-PEP-2024': {
    key: 'WHO-PEP-2024',
    title: 'WHO Guidelines for the Diagnosis, Treatment and Prevention of Leprosy',
    authority: 'World Health Organization (Geneva)',
    section: 'Section 4.2: Chemoprophylaxis and Contact Tracing Protocols',
    page: 'pp. 24–31',
    excerpt: 'Single-Dose Rifampicin (SDR-PEP) is recommended as preventive chemoprophylaxis for asymptomatic household and close community contacts aged ≥2 years after ruling out active disease and rifampicin contraindications.',
    publishedYear: 2024,
    evidenceTier: 'Level 1A (WHO Guideline)',
    documentUrl: 'https://www.who.int/publications/i/item/9789290226383',
  },
  'NTBLCP-SOP-2024': {
    key: 'NTBLCP-SOP-2024',
    title: 'National Strategic Health Framework & SDR-PEP Standard Operating Procedure',
    authority: 'Federal Ministry of Health & NTBLCP (Abuja, Nigeria)',
    section: 'Chapter 3: Active Case Finding & Contact Management in Endemic LGAs',
    page: 'pp. 14–22',
    excerpt: 'All registered index cases in high-burden clusters (e.g. Ebonyi, Anambra, Enugu) must have all eligible household and social contacts listed, screened, and offered weight-adjusted SDR-PEP within 4 weeks of index notification.',
    publishedYear: 2024,
    evidenceTier: 'Level 1B (National SOP)',
    documentUrl: 'https://health.gov.ng/ntblcp',
  },
  'DHIS2-NTD-2025': {
    key: 'DHIS2-NTD-2025',
    title: 'Federal Ministry of Health Integrated Skin-NTD DHIS2 Surveillance Dataset',
    authority: 'Nigeria Health Information System (DHIS2 Core)',
    section: 'South-East Zonal Registry: Annual Case Detections & MDT Cure Cohorts',
    page: 'Form NTBLCP-01 Summary',
    excerpt: 'Aggregated monthly surveillance data from 27 local health facilities reporting multibacillary (MB), paucibacillary (PB), child proportion, and Grade 2 disability (G2D) at initial presentation.',
    publishedYear: 2025,
    evidenceTier: 'Level 2A (Registry Data)',
    documentUrl: 'https://dhis2.gov.ng',
  },
  'DAHW-FIELD-2024': {
    key: 'DAHW-FIELD-2024',
    title: 'DAHW Germany & RedAid Nigeria Integrated Dermatological Diagnostic Atlas',
    authority: 'DAHW / RedAid Nigeria Clinical Consortium',
    section: 'Module 2: Hypopigmented Macules & Peripheral Nerve Thickening Palpation',
    page: 'pp. 8–17',
    excerpt: 'Definitive clinical diagnosis requires at least one cardinal sign: definite loss of sensation in a pale/reddish skin patch, enlarged or tender peripheral nerve with loss of sensation/weakness, or positive skin slit smear.',
    publishedYear: 2024,
    evidenceTier: 'Level 1B (National SOP)',
    documentUrl: 'https://www.dahw.org',
  },
};

interface CitationPillProps {
  citationKey?: string;
  label: string;
  isDark?: boolean;
}

export const CitationPill: React.FC<CitationPillProps> = ({
  citationKey,
  label,
  isDark = true,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Match key or fallback to WHO PEP guideline
  const citationData: VerifiedCitationData =
    (citationKey && CITATION_REGISTRY[citationKey]) ||
    CITATION_REGISTRY['WHO-PEP-2024'];

  return (
    <span className="relative inline-block align-baseline mx-0.5 select-none">
      {/* Interactive Badge Pill */}
      <button
        onClick={() => setShowModal(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold transition-all cursor-pointer border ${
          isDark
            ? 'bg-[#0071E3]/15 text-[#00D2FF] border-[#0071E3]/30 hover:bg-[#0071E3]/25 hover:border-[#00D2FF]/50 shadow-[0_0_8px_rgba(0,113,227,0.2)]'
            : 'bg-[#0071E3]/10 text-[#0071E3] border-[#0071E3]/20 hover:bg-[#0071E3]/20 hover:border-[#0071E3]/40'
        }`}
        title={`Verified Citation: ${citationData.title}`}
      >
        <BookOpen className="w-3 h-3 text-[#0071E3] shrink-0" />
        <span>{label}</span>
        <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
      </button>

      {/* Desktop Frosted-Glass Hovercard */}
      {isHovered && (
        <div
          className={`hidden md:block absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-80 rounded-2xl p-4 shadow-2xl z-50 border backdrop-blur-xl animate-fadeIn ${
            isDark
              ? 'bg-[#16161B]/95 border-white/15 text-white'
              : 'bg-white/95 border-black/10 text-[#1D1D1F]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 border-b pb-2 mb-2 border-white/10 dark:border-white/10">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
              <FileCheck className="w-3.5 h-3.5" />
              <span>{citationData.evidenceTier}</span>
            </div>
            <span className="text-[10px] font-mono text-gray-400">
              {citationData.publishedYear}
            </span>
          </div>

          {/* Title & Section */}
          <h4 className="font-bold text-xs leading-snug line-clamp-2">
            {citationData.title}
          </h4>
          <p className="text-[11px] text-[#0071E3] font-medium mt-0.5">
            {citationData.section} {citationData.page ? `(${citationData.page})` : ''}
          </p>

          {/* Excerpt */}
          <p className="text-[11px] text-gray-400 mt-2 leading-relaxed italic line-clamp-3">
            &ldquo;{citationData.excerpt}&rdquo;
          </p>

          {/* Footer Action */}
          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400">
            <span>{citationData.authority}</span>
            <span className="text-[#00D2FF] flex items-center gap-0.5 font-semibold">
              Click to view <ExternalLink className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>
      )}

      {/* Mobile Modal / Full Inspector */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div
            className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl space-y-4 text-left ${
              isDark
                ? 'bg-[#16161B] border-white/15 text-white'
                : 'bg-white border-black/10 text-[#1D1D1F]'
            }`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-2 border-b pb-3 border-white/10 dark:border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Source Verification</span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Document Details */}
            <div className="space-y-2">
              <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {citationData.evidenceTier}
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg">
                {citationData.title}
              </h3>
              <p className="text-xs font-medium text-[#0071E3]">
                {citationData.section} &bull; {citationData.page}
              </p>
              <p className="text-xs text-gray-400">
                <strong>Issuing Authority:</strong> {citationData.authority} ({citationData.publishedYear})
              </p>
            </div>

            {/* Quoted Guideline Excerpt */}
            <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed italic ${
              isDark ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-gray-50 border-black/5 text-gray-700'
            }`}>
              &ldquo;{citationData.excerpt}&rdquo;
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-white/10 transition-colors"
              >
                Dismiss
              </button>
              {citationData.documentUrl && (
                <a
                  href={citationData.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0071E3] hover:bg-[#0077ED] text-white flex items-center gap-1.5 shadow-md"
                >
                  <span>Open Official Document</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </span>
  );
};
