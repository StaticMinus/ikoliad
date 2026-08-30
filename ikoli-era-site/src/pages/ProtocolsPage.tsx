import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  ShieldCheck,
  Lock,
  HeartHandshake,
  Scale,
  FileText,
  Download,
  CheckCircle2,
  Eye,
  ClipboardList,
  UserCheck,
  Stethoscope,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProtocolsPageProps {
  onNavigate: (page: 'home' | 'dashboard' | 'diseases' | 'ask' | 'about' | 'styles' | 'api' | 'protocols') => void;
}

type TabType = 'guidelines' | 'privacy' | 'safeguarding' | 'bioethics';

export const ProtocolsPage: React.FC<ProtocolsPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabType>('guidelines');
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    step1: true,
    step2: true,
    step3: false,
    step4: false,
    step5: false,
  });

  const toggleChecklist = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full bg-[#FFFFFF] text-[#1D1D1F] min-h-screen font-sans selection:bg-[#0071E3] selection:text-white pb-16">
      
      {/* ── Fixed Floating Universal Navbar ──────────────────────────────── */}
      <Navbar currentPage="protocols" onNavigate={onNavigate as any} />

      {/* ══════════════════════════════════════════════════════════════════════
          1. HEADER BANNER (Apple Clean Architectural Header)
      ══════════════════════════════════════════════════════════════════════ */}
      <header className="pt-32 sm:pt-36 pb-12 sm:pb-16 bg-[#FBFBFD] border-b border-black/5 text-left">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 text-[10px] font-mono font-bold uppercase tracking-widest text-[#1D1D1F] mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>National Governance &amp; Statutory Compliance Charter</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#1D1D1F] leading-[1.06] mb-4">
            Guidelines, Privacy &amp;<br />
            <span className="text-gray-500 font-bold">Safeguarding Protocols.</span>
          </h1>

          <p className="max-w-2xl text-gray-500 text-sm sm:text-base leading-relaxed font-normal">
            Rigorous clinical staging standards, Zero-PII cryptographic safeguards under the Nigeria Data Protection Act (NDPA 2023), and the human dignity safeguarding charter governing the IKOLI Consortium.
          </p>

          {/* ── Interactive 4-Tab Switcher ──────────────────────────────────── */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'guidelines', label: 'Clinical Guidelines & Staging', icon: ClipboardList },
              { id: 'privacy', label: 'Zero-PII Privacy & NDPA 2023', icon: Lock },
              { id: 'safeguarding', label: 'Safeguarding & Patient Dignity', icon: HeartHandshake },
              { id: 'bioethics', label: 'Bioethics & AI Explainability', icon: Scale },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-xs ${
                    isActive
                      ? 'bg-[#1D1D1F] text-white shadow-md'
                      : 'bg-white hover:bg-gray-100 text-gray-600 border border-black/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </header>

      {/* ── Main Content Body ────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-12 sm:pt-16 space-y-16 text-left">
        
        <AnimatePresence mode="wait">
          
          {/* ══════════════════════════════════════════════════════════════════
              TAB 1: CLINICAL GUIDELINES & STAGING PROTOCOLS
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'guidelines' && (
            <motion.div
              key="guidelines"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-12"
            >
              
              {/* Introduction Bento */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-[#F5F5F7] p-6 sm:p-8 rounded-[28px] border border-black/5 space-y-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 block">
                    WHO Standard 2026
                  </span>
                  <h3 className="font-display font-bold text-xl text-[#1D1D1F]">
                    Buruli Ulcer 3-Category Staging
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Staged strictly by maximum lesion diameter, depth of undermined borders, and proximity to critical joints. Category I lesions qualify for frontline oral therapy; Category III requires urgent surgical excision.
                  </p>
                </div>

                <div className="bg-[#F5F5F7] p-6 sm:p-8 rounded-[28px] border border-black/5 space-y-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 block">
                    Ridley-Jopling Spectrum
                  </span>
                  <h3 className="font-display font-bold text-xl text-[#1D1D1F]">
                    Hansen’s Disease Classification
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Differentiated into Paucibacillary (PB) (&le;5 hypopigmented anaesthetic lesions) and Multibacillary (MB) (&ge;6 lesions or multiple thickened peripheral nerve trunks) for 6 vs 12-month WHO MDT regimens.
                  </p>
                </div>

                <div className="bg-[#F5F5F7] p-6 sm:p-8 rounded-[28px] border border-black/5 space-y-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-600 block">
                    Rapid Point-of-Care
                  </span>
                  <h3 className="font-display font-bold text-xl text-[#1D1D1F]">
                    DPP &amp; IS2404 PCR Confirmation
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Treponemal Dual Path Platform (DPP) serology for active Yaws, combined with dry swab/fine needle aspirate IS2404 qPCR validation for necrotic ulcers within 72 hours.
                  </p>
                </div>

              </div>

              {/* Interactive CHEW Field Protocol Checklist */}
              <div className="bg-[#FBFBFD] rounded-[32px] p-6 sm:p-10 border border-black/5 space-y-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 pb-4">
                  <div>
                    <h3 className="font-display font-bold text-xl text-[#1D1D1F]">
                      Community Health Extension Worker (CHEW) Field SOP
                    </h3>
                    <p className="text-xs text-gray-500">
                      Standard operating procedure for remote mobile screening across Primary Health Centres (PHCs).
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 shrink-0">
                    Mandatory 5-Step Protocol
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'step1', title: '1. Informed Verbal & Written Guardian Consent', desc: 'Confirm patient/guardian comprehension in local language (Igbo, Hausa, Yoruba, Pidgin) before capturing clinical photography.' },
                    { id: 'step2', title: '2. Standardized Diffuse Lighting & Lesion Framing', desc: 'Position tablet camera 25–30 cm perpendicular to dermal lesion under natural indirect daylight. Ensure optical calibration reticle is aligned.' },
                    { id: 'step3', title: '3. Voluntary Muscle Testing (VMT) & Sensory Mapping', desc: 'Perform monofilament touch test on hands, feet, and corneal blink reflex to evaluate peripheral nerve impairment.' },
                    { id: 'step4', title: '4. On-Device Edge AI Anomaly Staging', desc: 'Trigger local inference model (&lt;120ms). Record differential confidence matrix without uploading raw facial imagery to cloud.' },
                    { id: 'step5', title: '5. Zonal Referral & Blister Pack Initiation', desc: 'Route confirmed PB/MB cases to LGA Tuberculosis & Leprosy Supervisor (TLCS) for free WHO blister pack dispensing.' },
                  ].map((step) => (
                    <div
                      key={step.id}
                      onClick={() => toggleChecklist(step.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                        checklist[step.id]
                          ? 'bg-emerald-50/60 border-emerald-200'
                          : 'bg-white border-black/5 hover:border-black/15'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                        checklist[step.id] ? 'bg-emerald-600 text-white' : 'border border-gray-300 bg-white'
                      }`}>
                        {checklist[step.id] && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <div className="space-y-0.5">
                        <h4 className={`text-xs sm:text-sm font-bold ${checklist[step.id] ? 'text-emerald-950' : 'text-[#1D1D1F]'}`}>
                          {step.title}
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed font-normal">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TAB 2: ZERO-PII PRIVACY & NDPA 2023 STATUTORY PROTOCOL
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'privacy' && (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-12"
            >
              
              {/* Highlight Card */}
              <div className="bg-[#0A0C10] text-white p-8 sm:p-12 rounded-[32px] border border-white/10 space-y-6 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#0071E3]/15 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="space-y-2 relative z-10">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                    Statutory Compliance Standard
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-4xl text-white">
                    Zero Personally Identifiable Information (Zero-PII) Vault
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl font-light">
                    Every surveillance data point undergoes client-side ephemeral hashing prior to network transit. No names, phone numbers, addresses, or unmasked facial portraits are ever written to cloud disks.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 relative z-10 text-xs font-mono">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <span className="text-gray-400 block text-[10px]">Pseudonymization:</span>
                    <strong className="text-white">SHA-256 HMAC UUID</strong>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <span className="text-gray-400 block text-[10px]">Data Sovereignty:</span>
                    <strong className="text-white">Nigeria In-Country Storage</strong>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <span className="text-gray-400 block text-[10px]">Transit Encryption:</span>
                    <strong className="text-white">TLS 1.3 + AES-256-GCM</strong>
                  </div>
                </div>
              </div>

              {/* 3-Tier Governance Table */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-xl text-[#1D1D1F]">
                  The 3-Tier Verification Pipeline
                </h3>

                <div className="divide-y divide-black/10 border-y border-black/10">
                  
                  <div className="py-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="sm:w-1/3 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#F5F5F7] font-mono font-bold text-xs flex items-center justify-center shrink-0">1</span>
                      <div>
                        <span className="font-bold text-sm text-[#1D1D1F] block">Stage 1: Submitted</span>
                        <span className="text-[10px] font-mono text-gray-400 uppercase">Ingestion Gate</span>
                      </div>
                    </div>
                    <div className="sm:w-2/3">
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                        De-identified case reports are ingested through standard OpenHIM interoperability adapters and DHIS2 data exchange protocols from facility registers.
                      </p>
                    </div>
                  </div>

                  <div className="py-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="sm:w-1/3 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#F5F5F7] font-mono font-bold text-xs flex items-center justify-center shrink-0">2</span>
                      <div>
                        <span className="font-bold text-sm text-[#1D1D1F] block">Stage 2: Checked</span>
                        <span className="text-[10px] font-mono text-blue-600 uppercase">Automated Anomaly Screening</span>
                      </div>
                    </div>
                    <div className="sm:w-2/3">
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                        Neural algorithms screen for duplicate case UUIDs, statistical outliers in lesion grading, sudden reporting drops, or delayed laboratory transit times.
                      </p>
                    </div>
                  </div>

                  <div className="py-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="sm:w-1/3 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#1D1D1F] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">3</span>
                      <div>
                        <span className="font-bold text-sm text-[#1D1D1F] block">Stage 3: Confirmed</span>
                        <span className="text-[10px] font-mono text-emerald-600 uppercase">Human Clinical Authority</span>
                      </div>
                    </div>
                    <div className="sm:w-2/3">
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                        State TB &amp; Leprosy Control Officers (STBLCO) and certified laboratory supervisors cross-validate flagged entries before official national dashboard publishing.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TAB 3: SAFEGUARDING & PATIENT DIGNITY CHARTER
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'safeguarding' && (
            <motion.div
              key="safeguarding"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-12"
            >
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="bg-[#F5F5F7] p-8 rounded-[32px] border border-black/5 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[#1D1D1F]">
                    Anti-Stigma &amp; Dignity Doctrine
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    In honor of Ikoli Harcourt Whyte's lifelong advocacy, the consortium strictly prohibits stigmatizing medical terminology. All communications must refer to "persons affected by Hansen’s Disease" rather than derogatory historical labels.
                  </p>
                  <ul className="space-y-2 text-xs font-mono text-gray-600 pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Voluntary participation in clinical photo-registry</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Zero denial of care based on gender, ethnicity, or faith</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#F5F5F7] p-8 rounded-[32px] border border-black/5 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[#1D1D1F]">
                    Child &amp; Vulnerable Persons Protection
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    Pediatric screening for early Yaws and Buruli Ulcer requires dual-assent from parent/guardian and community elder. Chaperoned physical examinations are mandatory across all sentinel health facilities.
                  </p>
                  <ul className="space-y-2 text-xs font-mono text-gray-600 pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600" />
                      <span>Mandatory pediatric clinical chaperones</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600" />
                      <span>Confidential safeguarding incident reporting hotline</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Confidential Reporting Strip */}
              <div className="bg-[#FBFBFD] p-6 sm:p-8 rounded-[28px] border border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-[#1D1D1F]">
                    Confidential Safeguarding &amp; Whistleblower Channel
                  </h4>
                  <p className="text-xs text-gray-500">
                    Direct independent line to the RedAid Nigeria &amp; DAHW Joint Oversight Ethics Committee.
                  </p>
                </div>
                <div className="font-mono text-xs text-emerald-700 font-bold bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                  safeguarding@ikoli.health.ng
                </div>
              </div>

            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TAB 4: BIOETHICS & AI EXPLAINABILITY
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'bioethics' && (
            <motion.div
              key="bioethics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-12"
            >
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-[#F5F5F7] p-6 sm:p-8 rounded-[28px] border border-black/5 space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-[#1D1D1F]">
                    Clinical Decision Support Only
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    IKOLI AI operates under CDS Class II guidelines. It never autonomously prescribes medication or discharges patients. Final diagnosis is always the sole authority of licensed clinicians.
                  </p>
                </div>

                <div className="bg-[#F5F5F7] p-6 sm:p-8 rounded-[28px] border border-black/5 space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-[#1D1D1F]">
                    Grad-CAM Saliency Maps
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Every neural vision inference produces an interpretability heatmap showing the exact morphological features (hypopigmentation edges, necrosis depth) that drove the classification score.
                  </p>
                </div>

                <div className="bg-[#F5F5F7] p-6 sm:p-8 rounded-[28px] border border-black/5 space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-[#1D1D1F]">
                    Algorithmic Fairness Audit
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Trained and evaluated on diverse Fitzpatrick skin phototypes IV, V, and VI across all 6 Nigerian geo-political zones to eliminate diagnostic bias across demographic cohorts.
                  </p>
                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>

        {/* ══════════════════════════════════════════════════════════════════════
            5. STATUTORY ARTIFACT DOWNLOAD BAR
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="bg-[#F5F5F7] rounded-[32px] p-8 sm:p-10 border border-black/5 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 pb-4">
            <div>
              <h3 className="font-display font-bold text-xl text-[#1D1D1F]">
                Official Clinical Charters &amp; Technical Specifications
              </h3>
              <p className="text-xs text-gray-500">
                Download verified SOP documentation published by the National Tuberculosis, Buruli Ulcer &amp; Leprosy Control Programme (NTBLCP).
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">
              PDF Releases &bull; Version 2.4 (2026)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'National Skin NTD Staging SOP (2026).pdf', size: '2.4 MB' },
              { title: 'Zero-PII Cryptographic Protocol Spec.pdf', size: '1.8 MB' },
              { title: 'Patient Safeguarding & Ethics Charter.pdf', size: '1.2 MB' },
            ].map((doc) => (
              <div
                key={doc.title}
                className="bg-white p-4 rounded-2xl border border-black/5 flex items-center justify-between hover:border-[#0071E3]/40 transition-colors shadow-2xs group cursor-pointer"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-xl bg-black/5 group-hover:bg-[#1D1D1F] group-hover:text-white text-[#1D1D1F] flex items-center justify-center shrink-0 transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="font-bold text-xs text-[#1D1D1F] block truncate group-hover:text-[#0071E3] transition-colors">
                      {doc.title}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">{doc.size}</span>
                  </div>
                </div>
                <Download className="w-4 h-4 text-gray-400 group-hover:text-[#1D1D1F] transition-colors shrink-0 ml-2" />
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ── Universal Footer ─────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-20">
        <Footer onNavigate={onNavigate as any} />
      </div>

    </div>
  );
};
