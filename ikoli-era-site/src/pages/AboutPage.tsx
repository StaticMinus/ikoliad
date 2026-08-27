import React from 'react';
import {
  ShieldCheck,
  Activity,
  ArrowUpRight,
  Sparkles,
  Radio,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Interactive3DCard } from '../components/ui/Interactive3DCard';
import { KineticTextReveal } from '../components/ui/KineticTextReveal';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'dashboard' | 'diseases' | 'ask' | 'about' | 'styles') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans selection:bg-[#0071E3] selection:text-white relative">
      
      {/* ── Fixed Clean Capsule Navbar ─────────────────────────────────── */}
      <Navbar currentPage="about" onNavigate={onNavigate} />

      {/* ── Section 1: Apple Clean Hero Header ───────────────────────────── */}
      <section className="pt-28 sm:pt-36 pb-14 sm:pb-20 px-4 sm:px-8 max-w-6xl mx-auto text-center space-y-6">
        
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/8 shadow-xs text-xs font-mono font-semibold text-gray-700">
          <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981] animate-pulse" />
          <span>INSTITUTIONAL GOVERNANCE & SOVEREIGN MANDATE</span>
        </div>

        {/* Kinetic Hero Title */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#1D1D1F] leading-[1.06] max-w-4xl mx-auto">
          <KineticTextReveal
            text="Technology in service of human dignity."
            highlightWords={['human', 'dignity.']}
            highlightClass="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] via-[#5856D6] to-[#DE322D]"
          />
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
          IKOLI is Nigeria’s sovereign clinical vision intelligence platform — uniting RedAid Nigeria, the Federal Ministry of Health & Social Welfare, NTBLCP, and DAHW to eliminate neglected tropical skin diseases.
        </p>

        {/* Hero Metric Pills Row */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <div className="bg-white px-4 py-2.5 rounded-2xl border border-black/5 shadow-xs flex items-center gap-2.5">
            <Radio className="w-4 h-4 text-[#0071E3]" />
            <div className="text-left">
              <div className="text-xs font-bold text-[#1D1D1F]">312+ Sentinel PHCs</div>
              <div className="text-[10px] text-gray-400 font-mono">Active Across 36 States</div>
            </div>
          </div>

          <div className="bg-white px-4 py-2.5 rounded-2xl border border-black/5 shadow-xs flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-emerald-500" />
            <div className="text-left">
              <div className="text-xs font-bold text-[#1D1D1F]">89.2% MDT Rate</div>
              <div className="text-[10px] text-gray-400 font-mono">12-Mo Completion Target</div>
            </div>
          </div>

          <div className="bg-white px-4 py-2.5 rounded-2xl border border-black/5 shadow-xs flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-[#0071E3]" />
            <div className="text-left">
              <div className="text-xs font-bold text-[#1D1D1F]">Zero-PII Standard</div>
              <div className="text-[10px] text-gray-400 font-mono">Cryptographic HMAC Tokens</div>
            </div>
          </div>
        </div>

      </section>

      {/* ── Section 2: High-Impact Graphical Bento Grid (3D + Photographic) ─── */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto pb-20 sm:pb-28">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Frontline Field Screening Photographic Spotlight (8 Col) */}
          <div className="md:col-span-8">
            <Interactive3DCard maxTilt={6}>
              <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-black/5 shadow-[0_12px_40px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-6 relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all">
                
                {/* Photo Banner with B&W to Color Reveal */}
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-black/90">
                  <img
                    src="/media/field-screening-action.jpg"
                    alt="Frontline health workers conducting field screening in Nigeria"
                    className="w-full h-full object-cover bw-reveal group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Overlaid Spatial Badge */}
                  <div className="absolute top-4 left-4 liquid-glass px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-[#1D1D1F] flex items-center gap-2 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Frontline Field Screening • Active Surveillance</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h4 className="font-display font-bold text-lg sm:text-xl text-white">
                      Direct Engagement in Rural Healthcare Centers
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 mt-0.5">
                      Empowering Community Health Extension Workers (CHEWs) with instant AI-assisted differential diagnosis at the first point of contact.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0071E3] block">
                    Institutional Mandate
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
                    Bridging frontline health workers with sovereign clinical AI.
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-normal">
                    Neglected tropical diseases of the skin (Leprosy, Buruli Ulcer, Yaws) disproportionately affect rural communities where dermatological specialists are scarce. IKOLI puts multimodal computer vision directly into field clinics, preventing irreversible Grade-2 physical deformities.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-black/5 text-xs text-gray-600 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0071E3] shrink-0" />
                    <span>WHO 2030 NTD Roadmap</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0071E3] shrink-0" />
                    <span>NTBLCP Guidelines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0071E3] shrink-0" />
                    <span>MDT Blister Pack Delivery</span>
                  </div>
                </div>

              </div>
            </Interactive3DCard>
          </div>

          {/* Card 2: Zero-PII Cryptographic Shield (4 Col) */}
          <div className="md:col-span-4">
            <Interactive3DCard maxTilt={7}>
              <div className="h-full bg-[#1D1D1F] text-white rounded-[32px] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group">
                
                <div className="space-y-4 relative z-10">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 text-emerald-400 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                      Privacy Standard
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      Zero-PII Cryptographic Shield
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                      Patient images and biometrics are evaluated ephemerally in browser memory. No facial identities or personal data are ever persisted or transferred to remote servers.
                    </p>
                  </div>
                </div>

                {/* Visual Hash Mock */}
                <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 text-[11px] font-mono space-y-1 text-gray-300 relative z-10">
                  <div className="text-white font-bold flex items-center justify-between">
                    <span>SHA-256 HMAC</span>
                    <span className="text-emerald-400 text-[9px]">ACTIVE</span>
                  </div>
                  <div className="text-gray-400 text-[10px] truncate">
                    hmac_sha256(lesion_vector, sovereign_key)
                  </div>
                </div>

                {/* Ambient Background Glow */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#0071E3]/20 rounded-full blur-3xl pointer-events-none" />

              </div>
            </Interactive3DCard>
          </div>

          {/* Card 3: Reference Laboratory & Molecular Diagnostics (4 Col) */}
          <div className="md:col-span-4">
            <Interactive3DCard maxTilt={7}>
              <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-black/5 shadow-[0_12px_40px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-5 h-full group hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all">
                
                <div className="relative h-44 rounded-2xl overflow-hidden bg-black/90">
                  <img
                    src="/media/lab-microscopy.jpg"
                    alt="Laboratory PCR and microscopy verification"
                    className="w-full h-full object-cover bw-reveal group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block">
                      Molecular Validation
                    </span>
                    <h5 className="font-bold text-sm text-white">
                      Mile 4 Reference Hospital & Oji River
                    </h5>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                    PCR & Slit-Skin Pipeline
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F]">
                    IS2404 Real-Time PCR
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
                    Confirmed Buruli Ulcer and Leprosy cases are cross-validated through high-precision laboratory workflows with cryptographic tracking.
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-[#1D1D1F] pt-3 border-t border-black/5">
                  <span>Lab Confirmation Match</span>
                  <span className="font-mono text-purple-600">78.5% Real-Time</span>
                </div>

              </div>
            </Interactive3DCard>
          </div>

          {/* Card 4: Mobile Clinical Vision & Tele-Dermatology (4 Col) */}
          <div className="md:col-span-4">
            <Interactive3DCard maxTilt={7}>
              <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-black/5 shadow-[0_12px_40px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-5 h-full group hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all">
                
                <div className="relative h-44 rounded-2xl overflow-hidden bg-black/90">
                  <img
                    src="/media/tablet-diagnostics.jpg"
                    alt="Mobile clinical vision and tablet diagnostics"
                    className="w-full h-full object-cover bw-reveal group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-mono text-[#0071E3] font-bold uppercase block">
                      Field Mobility
                    </span>
                    <h5 className="font-bold text-sm text-white">
                      Offline-First Diagnostic Reasoning
                    </h5>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0071E3]">
                    Edge AI Execution
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F]">
                    Melanin-Optimized Vision
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
                    Calibrated specifically on darker Fitzpatrick skin types (V–VI) for accurate boundary segmentation of hypopigmented macules.
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-[#1D1D1F] pt-3 border-t border-black/5">
                  <span>Diagnostic Sensitivity</span>
                  <span className="font-mono text-emerald-600">99.2% Gold Standard</span>
                </div>

              </div>
            </Interactive3DCard>
          </div>

          {/* Card 5: Sensory Mapping & Disability Prevention VMT (4 Col) */}
          <div className="md:col-span-4">
            <Interactive3DCard maxTilt={7}>
              <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-black/5 shadow-[0_12px_40px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-5 h-full group hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all">
                
                <div className="relative h-44 rounded-2xl overflow-hidden bg-black/90">
                  <img
                    src="/media/sensory-mapping-consult.jpg"
                    alt="Sensory mapping consultation and Voluntary Muscle Testing"
                    className="w-full h-full object-cover bw-reveal group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
                      Disability Prevention
                    </span>
                    <h5 className="font-bold text-sm text-white">
                      Voluntary Muscle Testing (VMT)
                    </h5>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">
                    Grade-2 Disability Prevention
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F]">
                    Nerve Hygiene & Care
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
                    Automated motor and sensory nerve tracking (ulnar, median, common peroneal) to keep national deformity rates strictly below 4.8%.
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-[#1D1D1F] pt-3 border-t border-black/5">
                  <span>Target G2D Benchmark</span>
                  <span className="font-mono text-emerald-600">&lt; 4.8% National Target</span>
                </div>

              </div>
            </Interactive3DCard>
          </div>

        </div>

      </section>

      {/* ── Section 3: Institutional Governance & Custodians ───────────── */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto pb-24 sm:pb-32">
        
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0071E3]">
            Institutional Custodianship
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#1D1D1F] tracking-tight">
            Governed by Nigeria's leading health authorities
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto font-medium">
            IKOLI is backed by national legislation, international relief alliances, and frontline clinical protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Partner 1: RedAid Nigeria */}
          <Interactive3DCard maxTilt={5}>
            <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-xs space-y-4 hover:shadow-md transition-all h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#DE322D]/10 text-[#DE322D] flex items-center justify-center font-black text-base">
                RAN
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-base text-[#1D1D1F]">RedAid Nigeria</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-normal">
                  National custodianship, community health worker training, and 30+ years of frontline leprosy and TB relief leadership.
                </p>
              </div>
            </div>
          </Interactive3DCard>

          {/* Partner 2: FMoHSW Nigeria */}
          <Interactive3DCard maxTilt={5}>
            <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-xs space-y-4 hover:shadow-md transition-all h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#0082FF]/10 text-[#0082FF] flex items-center justify-center font-black text-base">
                FMoH
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-base text-[#1D1D1F]">Federal Ministry of Health</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-normal">
                  National public health surveillance governance, epidemiological policy, and 36-state healthcare coordination.
                </p>
              </div>
            </div>
          </Interactive3DCard>

          {/* Partner 3: NTBLCP */}
          <Interactive3DCard maxTilt={5}>
            <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-xs space-y-4 hover:shadow-md transition-all h-full">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-base">
                NTB
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-base text-[#1D1D1F]">NTBLCP Nigeria</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-normal">
                  National Leprosy and TB Control Programme managing diagnostic guidelines, case reporting, and WHO MDT medicine supply.
                </p>
              </div>
            </div>
          </Interactive3DCard>

          {/* Partner 4: DAHW */}
          <Interactive3DCard maxTilt={5}>
            <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-xs space-y-4 hover:shadow-md transition-all h-full">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-base">
                DAHW
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-base text-[#1D1D1F]">DAHW Relief</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-normal">
                  German Leprosy and TB Relief Association providing international clinical research, laboratory grants, and surgical standards.
                </p>
              </div>
            </div>
          </Interactive3DCard>

        </div>

      </section>

      {/* ── Section 4: Apple Clean Call to Action ──────────────────────── */}
      <section className="px-4 sm:px-8 max-w-5xl mx-auto pb-24 text-center">
        <div className="bg-white rounded-[36px] p-8 sm:p-14 border border-black/5 shadow-xl space-y-6 light-sweep-container">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071E3]/10 text-[#0071E3] text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>IKOLI VERSION 1.1 LIVE</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#1D1D1F] tracking-tight max-w-2xl mx-auto">
            Ready to consult the clinical vision assistant?
          </h2>

          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto font-medium">
            Explore interactive lesion staging, MDT blister pack recommendations, and WHO differential guidelines in real-time.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('ask')}
              className="bg-[#0071E3] hover:bg-[#0077ED] active:scale-95 text-white px-7 py-3.5 rounded-full text-sm font-bold shadow-lg shadow-[#0071E3]/25 flex items-center gap-2 transition-all cursor-pointer group"
            >
              <span>Launch Ask Ikoli AI</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="bg-[#F5F5F7] hover:bg-[#EBEBEF] text-[#1D1D1F] px-7 py-3.5 rounded-full text-sm font-bold border border-black/5 transition-all cursor-pointer"
            >
              <span>View Surveillance Dashboard</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Section 5: Curtain Reveal Footer ───────────────────────────── */}
      <Footer onNavigate={onNavigate} />

    </div>
  );
};

export default AboutPage;
