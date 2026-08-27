import React, { useState, useMemo } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  Search,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Dna,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface DiseasesPageProps {
  onNavigate: (page: 'home' | 'dashboard' | 'diseases' | 'ask' | 'about') => void;
}

interface DiseaseDetail {
  id: string;
  name: string;
  code: string;
  category: 'Mycobacterial' | 'Necrotizing' | 'Treponemal' | 'Parasitic';
  categoryColor: string;
  tag: string;
  videoUrl?: string;
  imageUrl: string;
  summary: string;
  clinicalPresentation: string[];
  stagingCriteria: { stage: string; desc: string }[];
  whoRegimen: string;
  duration: string;
  labConfirmation: string;
  preventionGoal: string;
  prevalenceIndex: string;
  disabilityBenchmark: string;
}

const ALL_DISEASES: DiseaseDetail[] = [
  {
    id: 'leprosy-pb',
    name: 'Paucibacillary (PB) Leprosy',
    code: 'ICD-11: 1B20.0',
    category: 'Mycobacterial',
    categoryColor: '#0071E3',
    tag: 'Early Detection Priority',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_030111_a9e15665-d379-4a7f-8116-695bbe452ad1.mp4',
    imageUrl: 'https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'A chronic infectious disease caused by Mycobacterium leprae, characterized by 1 to 5 hypopigmented skin macules with definite loss of sensation to touch and temperature.',
    clinicalPresentation: [
      '1 to 5 hypopigmented or reddish skin lesions with loss of sensation to touch/pain.',
      'Definite impairment of sensation tested via wisp of cotton wool.',
      'Involvement of only ONE peripheral nerve trunk (or zero enlarged nerves).',
      'Negative skin smear for acid-fast bacilli at all tested sites.',
    ],
    stagingCriteria: [
      { stage: 'Single Lesion PB', desc: '1 solitary skin macule with clear sensory impairment.' },
      { stage: 'Pauci-lesion PB', desc: '2 to 5 distinct hypopigmented patches with nerve hygiene intact.' },
    ],
    whoRegimen: 'Rifampicin 600mg (monthly supervised) + Dapsone 100mg (daily self-administered).',
    duration: '6 Months (6 Blister Packs completed within 9 months)',
    labConfirmation: 'Clinical Sensory Mapping + Slit Skin Smear (Negative Bacteriological Index).',
    preventionGoal: 'Grade-0 Disability Maintenance (100% cure with zero physical deformity).',
    prevalenceIndex: '38.4% of National Staging Registry',
    disabilityBenchmark: '0% Target Disability',
  },
  {
    id: 'leprosy-mb',
    name: 'Multibacillary (MB) Leprosy',
    code: 'ICD-11: 1B20.1',
    category: 'Mycobacterial',
    categoryColor: '#DE322D',
    tag: 'High Transmission & Deformity Risk',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4',
    imageUrl: 'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'A high-bacillary-load form of leprosy presenting with more than 5 infiltrative skin lesions and multiple enlarged peripheral nerve trunks (Ulnar, Common Peroneal).',
    clinicalPresentation: [
      'More than 5 skin lesions: macules, plaques, diffuse infiltration, or nodules.',
      'Involvement of MORE THAN ONE peripheral nerve trunk with tenderness or enlargement.',
      'Positive skin smear for acid-fast bacilli (Bacteriological Index > 0).',
      'High risk of lagophthalmos, claw hand, and foot drop if untreated.',
    ],
    stagingCriteria: [
      { stage: 'Borderline Lepromatous (BL)', desc: 'Multiple asymmetrical plaques with satellite lesions.' },
      { stage: 'Lepromatous Leprosy (LL)', desc: 'Diffuse bilateral infiltration, leonine facies, loss of lateral eyebrows.' },
    ],
    whoRegimen: 'Rifampicin 600mg (monthly) + Clofazimine 300mg (monthly) & 50mg (daily) + Dapsone 100mg (daily).',
    duration: '12 Months (12 Blister Packs completed within 18 months)',
    labConfirmation: 'Slit Skin Smear (Positive BI) + High-Resolution Nerve Ultrasound.',
    preventionGoal: 'Grade-2 Disability Prevention (< 4.8% National Target via Early Decompression).',
    prevalenceIndex: '42.1% of National Staging Registry',
    disabilityBenchmark: '< 4.8% G2D Rate',
  },
  {
    id: 'buruli-ulcer',
    name: 'Buruli Ulcer (Mycobacterium ulcerans)',
    code: 'ICD-11: 1B21',
    category: 'Necrotizing',
    categoryColor: '#10B981',
    tag: 'Rapid Tissue Necrosis Hazard',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_155500_808e6fdd-761f-4acd-b3be-cb7e6e700def.mp4',
    imageUrl: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'A debilitating necrotizing skin infection producing the immunosuppressive mycolactone toxin, resulting in painless subcutaneous fat necrosis and deeply undermined ulcers.',
    clinicalPresentation: [
      'Early pre-ulcerative stage: painless subcutaneous nodule, firm plaque, or diffuse oedema.',
      'Classic ulcerative stage: large painless ulcer with characteristic undermined violaceous edges.',
      'Predominantly localized on upper and lower limbs in rural riverine and agrarian basins.',
      'Late contractures and joint stiffness if wound care and oral antibiotic therapy are delayed.',
    ],
    stagingCriteria: [
      { stage: 'Category I', desc: 'Single small lesion < 5 cm in cross-sectional diameter.' },
      { stage: 'Category II', desc: 'Single lesion between 5 cm and 15 cm in cross-sectional diameter.' },
      { stage: 'Category III', desc: 'Single lesion > 15 cm, multiple lesions, or critical anatomical sites.' },
    ],
    whoRegimen: 'Oral Rifampicin (10 mg/kg daily) + Oral Clarithromycin (7.5 mg/kg twice daily).',
    duration: '8 Weeks (56 Days of Continuous Combination Therapy)',
    labConfirmation: 'IS2404 Real-time PCR (Reference Lab) + Dry Swab Ziehl-Neelsen Smear.',
    preventionGoal: 'Surgical Intervention Avoidance (Early Category I medical cure rate > 96%).',
    prevalenceIndex: '78.5% Laboratory Confirmation Rate',
    disabilityBenchmark: '> 95% Joint Mobility Saved',
  },
  {
    id: 'yaws',
    name: 'Yaws (Treponema pallidum pertenue)',
    code: 'ICD-11: 1A61',
    category: 'Treponemal',
    categoryColor: '#8B5CF6',
    tag: 'Eradication Candidate (Target 2030)',
    imageUrl: 'https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'A contagious non-venereal treponemal infection affecting skin, bone, and cartilage in tropical forest communities, spread by direct skin-to-skin contact.',
    clinicalPresentation: [
      'Primary stage: "Mother yaw" solitary papilloma or framboesial granuloma.',
      'Secondary stage: Generalized multiple papillomas, plantar/palmar hyperkeratosis.',
      'Bone pain, nocturnal osteoperiostitis of tibia (sabre tibia deformity risk).',
      'Tertiary stage (rare): destructive gummatous necrosis and facial mutilation.',
    ],
    stagingCriteria: [
      { stage: 'Primary Yaws', desc: 'Initial mother yaw papilloma at site of inoculation.' },
      { stage: 'Secondary Yaws', desc: 'Widespread skin eruptions, crab yaws, and periostitis.' },
    ],
    whoRegimen: 'Single-Dose Oral Azithromycin (30 mg/kg, max 2g) or Benzathine Penicillin G.',
    duration: 'Single Supervised Oral Dose (Mass Drug Administration Protocol)',
    labConfirmation: 'Dual Path Platform (DPP) Syphilis/Yaws Point-of-Care Rapid Test + PCR.',
    preventionGoal: '100% Interruption of Transmission (WHO Morges Eradication Strategy).',
    prevalenceIndex: 'Rapid Point-of-Care Surveillance',
    disabilityBenchmark: '100% Bone Deformity Avoided',
  },
  {
    id: 'leishmaniasis',
    name: 'Cutaneous Leishmaniasis',
    code: 'ICD-11: 1F54',
    category: 'Parasitic',
    categoryColor: '#F59E0B',
    tag: 'Vector-Borne Surveillance',
    imageUrl: 'https://images.pexels.com/photos/7691249/pexels-photo-7691249.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'A protozoan parasitic skin infection transmitted by the bite of infected female phlebotomine sandflies, creating volcanic crater-like ulcerative lesions.',
    clinicalPresentation: [
      'Papule enlarging into a crusty nodule that breaks down into a volcanic ulcer.',
      'Raised, indurated borders with central depressed granulation bed.',
      'Satellite lesions, regional lymphadenopathy, and characteristic hyperpigmented scar.',
      'Exposure in semi-arid northern savannas and animal burrow zones.',
    ],
    stagingCriteria: [
      { stage: 'Early Papular', desc: 'Indurated erythematous nodule at sandfly bite locus.' },
      { stage: 'Ulcerative Crusted', desc: 'Volcano ulcer with central necrotic crater.' },
    ],
    whoRegimen: 'Intralesional Sodium Stibogluconate (SSG) or Oral Miltefosine + Thermotherapy.',
    duration: '2 to 4 Weeks Specialized Clinical Protocol',
    labConfirmation: 'Giemsa-Stained Direct Smear (Leishman-Donovan Amastigotes) + KDNA PCR.',
    preventionGoal: 'Scar Minimization & Mucocutaneous Dissemination Prevention.',
    prevalenceIndex: 'Regional Vector Nodes Active',
    disabilityBenchmark: '< 2% Dissemination Rate',
  },
];

export const DiseasesPage: React.FC<DiseasesPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDiseaseId, setActiveDiseaseId] = useState<string>('leprosy-pb');
  const [activeTab, setActiveTab] = useState<'clinical' | 'staging' | 'regimen' | 'lab'>('clinical');

  const filteredDiseases = useMemo(() => {
    return ALL_DISEASES.filter((d) => {
      const matchesCategory =
        selectedCategory === 'All' || d.category === selectedCategory;
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const currentDisease =
    ALL_DISEASES.find((d) => d.id === activeDiseaseId) || ALL_DISEASES[0];

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] font-sans selection:bg-[#0071E3] selection:text-white">
      {/* ── Fixed Navigation Bar ────────────────────────────────────────── */}
      <div className="sticky top-0 z-50">
        <Navbar currentPage="diseases" onNavigate={onNavigate as any} />
      </div>

      {/* ── Hero Section (WHO Data Portal Standard & Parallax Reveal) ───── */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-radial from-[#0071E3]/8 via-transparent to-transparent blur-3xl pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-[#F5F5F7] px-4 py-1.5 rounded-full border border-black/5 text-xs font-semibold text-[#0071E3]"
          >
            <Dna className="w-3.5 h-3.5" />
            <span>WHO Data Portal Standard • ICD-11 Clinical Registry</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#1D1D1F] leading-[1.04]"
          >
            Target Skin NTDs. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] via-[#5856D6] to-[#DE322D]">
              Clinical Classification.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Comprehensive diagnostic protocols, WHO multidrug therapy (MDT) blister pack regimens, real-time PCR validation, and disability prevention benchmarks across Nigeria.
          </motion.p>
        </div>

        {/* ── Search & Filter Controls ──────────────────────────────────── */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by disease name, ICD-11 code, or clinical symptoms..."
              className="w-full bg-[#F5F5F7] border border-black/5 rounded-full pl-12 pr-6 py-4 text-xs sm:text-sm font-medium text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:bg-white transition-all shadow-sm"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {['All', 'Mycobacterial', 'Necrotizing', 'Treponemal', 'Parasitic'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#1D1D1F] text-white shadow-sm'
                    : 'bg-[#F5F5F7] text-gray-600 hover:text-black hover:bg-gray-200'
                }`}
              >
                {cat === 'All' ? 'All Diseases (5)' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive Master-Detail Disease Staging Inspector ────────── */}
      <section className="py-8 sm:py-12 bg-[#F5F5F7] border-y border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Disease Selector List (4 Cols) */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-500 block px-1">
                Registry Index ({filteredDiseases.length})
              </span>

              <div className="space-y-2">
                {filteredDiseases.map((disease) => {
                  const isSelected = activeDiseaseId === disease.id;
                  return (
                    <button
                      key={disease.id}
                      onClick={() => setActiveDiseaseId(disease.id)}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 group ${
                        isSelected
                          ? 'bg-white border-[#0071E3] shadow-lg scale-[1.01]'
                          : 'bg-white/70 hover:bg-white border-black/5 hover:border-black/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${disease.categoryColor}15`,
                            color: disease.categoryColor,
                          }}
                        >
                          {disease.code}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">
                          {disease.category}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-extrabold text-sm sm:text-base text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                          {disease.name}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                          {disease.summary}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 pt-1 border-t border-gray-100">
                        <span>{disease.tag}</span>
                        <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-[#0071E3]' : 'text-gray-300'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Rich Interactive WHO Staging Sheet (8 Cols) */}
            <div className="lg:col-span-8 bg-white rounded-[32px] p-6 sm:p-8 md:p-10 border border-black/5 shadow-xl space-y-8">
              
              {/* Header: Title, ICD Code & Tags */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#0071E3] bg-[#0071E3]/10 px-3 py-1 rounded-full">
                      {currentDisease.code}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      {currentDisease.category}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1D1D1F] tracking-tight">
                    {currentDisease.name}
                  </h2>
                </div>

                <button
                  onClick={() => onNavigate('ask')}
                  className="bg-[#0071E3] hover:bg-[#0077ED] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Diagnose via AI</span>
                </button>
              </div>

              {/* Embedded Video / High-Res Image Player */}
              <div className="relative rounded-3xl overflow-hidden shadow-md border border-black/5 bg-black">
                {currentDisease.videoUrl ? (
                  <video
                    src={currentDisease.videoUrl}
                    controls
                    playsInline
                    className="w-full h-64 sm:h-80 md:h-96 object-cover"
                  />
                ) : (
                  <img
                    src={currentDisease.imageUrl}
                    alt={currentDisease.name}
                    className="w-full h-64 sm:h-80 md:h-96 object-cover"
                  />
                )}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-ping" />
                  <span>Clinical Case Video • FMoHSW Verified</span>
                </div>
              </div>

              {/* Interactive Tabs Navigation */}
              <div className="flex items-center gap-2 border-b border-black/5 pb-2 overflow-x-auto scrollbar-none">
                {[
                  { id: 'clinical', label: '1. Clinical Presentation' },
                  { id: 'staging', label: '2. Staging Criteria' },
                  { id: 'regimen', label: '3. WHO MDT Regimen' },
                  { id: 'lab', label: '4. Laboratory & PCR' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-[#1D1D1F] text-white shadow-xs'
                        : 'text-gray-500 hover:text-black hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Active Tab Content Display */}
              <div className="space-y-6 min-h-[220px]">
                
                {/* 1. Clinical Presentation */}
                {activeTab === 'clinical' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-700 leading-relaxed font-normal">
                      {currentDisease.summary}
                    </p>
                    <div className="space-y-2.5">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 block">
                        Diagnostic Signs & Sensory Criteria:
                      </span>
                      {currentDisease.clinicalPresentation.map((sign, i) => (
                        <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F5F5F7] border border-black/5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-gray-700 leading-snug">{sign}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Staging Criteria */}
                {activeTab === 'staging' && (
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 block">
                      WHO Staging Tiers:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currentDisease.stagingCriteria.map((tier, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-[#F5F5F7] border border-black/5 space-y-2">
                          <span className="text-xs font-bold text-[#0071E3] font-mono">Stage {i + 1}</span>
                          <h4 className="font-bold text-sm text-[#1D1D1F]">{tier.stage}</h4>
                          <p className="text-xs text-gray-600 leading-relaxed">{tier.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. WHO MDT Regimen */}
                {activeTab === 'regimen' && (
                  <div className="p-6 rounded-2xl bg-[#F5F5F7] border border-black/5 space-y-4">
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold uppercase text-[#0071E3]">Prescribed Pharmacotherapy</span>
                      <h4 className="font-bold text-base text-[#1D1D1F]">{currentDisease.whoRegimen}</h4>
                    </div>
                    <div className="pt-2 border-t border-black/5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <span className="text-gray-500 block">Treatment Duration:</span>
                        <strong className="text-[#1D1D1F] font-black">{currentDisease.duration}</strong>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Disability Benchmark:</span>
                        <strong className="text-emerald-700 font-black">{currentDisease.disabilityBenchmark}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Laboratory & PCR */}
                {activeTab === 'lab' && (
                  <div className="p-6 rounded-2xl bg-[#F5F5F7] border border-black/5 space-y-4">
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold uppercase text-[#5856D6]">Laboratory Verification Pipeline</span>
                      <h4 className="font-bold text-base text-[#1D1D1F]">{currentDisease.labConfirmation}</h4>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      All laboratory confirmations are synchronized into Nigeria’s national DHIS2 electronic registry with cryptographic hash verification.
                    </p>
                  </div>
                )}

              </div>

              {/* Bottom Quick Telemetry Strip */}
              <div className="pt-4 border-t border-black/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-500">
                <span>WHO Guideline Compliant</span>
                <span className="text-[#0071E3] font-bold">{currentDisease.prevalenceIndex}</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── Section: WHO 2030 Roadmap Milestones ───────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0071E3]">
            WHO 2030 Elimination Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D1D1F]">
            Progress Toward Zero Transmission
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Real-time synchronization against the World Health Organization roadmap for Neglected Tropical Diseases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F5F5F7] p-6 rounded-3xl border border-black/5 space-y-3">
            <span className="text-xs font-mono font-bold text-[#0071E3] uppercase">MDT Completion Rate</span>
            <div className="text-3xl font-black text-[#1D1D1F] font-mono">89.2%</div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#0071E3] rounded-full w-[89.2%]" />
            </div>
            <p className="text-[11px] text-gray-500">Target: &gt; 85% Completion nationwide</p>
          </div>

          <div className="bg-[#F5F5F7] p-6 rounded-3xl border border-black/5 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-600 uppercase">Grade-2 Disability Prevention</span>
            <div className="text-3xl font-black text-emerald-700 font-mono">&lt; 4.8%</div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full w-[95%]" />
            </div>
            <p className="text-[11px] text-gray-500">Target: &lt; 5.0% Deformity rate</p>
          </div>

          <div className="bg-[#F5F5F7] p-6 rounded-3xl border border-black/5 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-600 uppercase">IS2404 PCR Molecular Match</span>
            <div className="text-3xl font-black text-purple-700 font-mono">78.5%</div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-purple-600 rounded-full w-[78.5%]" />
            </div>
            <p className="text-[11px] text-gray-500">Target: &gt; 70% Reference lab confirmation</p>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <Footer onNavigate={onNavigate as any} />
    </div>
  );
};
