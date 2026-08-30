import React, { useState, useMemo } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  Search,
  Sparkles,
  X,
  ArrowUpRight,
  LayoutGrid,
  Layers,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoryScrollTriggerSection } from '../components/StoryScrollTriggerSection';
import { SpatialDiseaseCard } from '../components/ui/SpatialDiseaseCard';
import { CoverflowDiseaseReel } from '../components/CoverflowDiseaseReel';

interface DiseasesPageProps {
  onNavigate: (page: 'home' | 'dashboard' | 'diseases' | 'ask' | 'about' | 'styles' | 'api') => void;
}

export interface DiseaseDetail {
  id: string;
  name: string;
  code: string;
  category: 'Mycobacterial' | 'Necrotizing' | 'Treponemal' | 'Parasitic' | 'Ophthalmic';
  categoryColor: string;
  tag: string;
  casesPill: string;
  image: string;
  summary: string;
  clinicalPresentation: string[];
  stagingCriteria: { stage: string; desc: string }[];
  whoRegimen: string;
  duration: string;
  labConfirmation: string;
  preventionGoal: string;
  prevalenceIndex: string;
  disabilityBenchmark: string;
  referralCenter: string;
  blisterPackColor: string;
  vmtProtocol: string;
}

const ALL_DISEASES: DiseaseDetail[] = [
  {
    id: 'leprosy-pb',
    name: "Hansen's Disease (PB Leprosy)",
    code: "ICD-11: 1B20.0",
    category: "Mycobacterial",
    categoryColor: "#0071E3",
    tag: "Early Detection Priority",
    casesPill: "130+ Regimens",
    image: "/media/home_pb_leprosy_hypopigmentation.jpg",
    summary: "A chronic mycobacterial disease presenting with 1 to 5 hypopigmented skin macules with definite loss of sensation to touch and temperature.",
    clinicalPresentation: [
      "1 to 5 hypopigmented or reddish skin lesions with loss of sensation to touch/pain.",
      "Definite impairment of sensation tested via sterile cotton wool wisp.",
      "Involvement of only ONE peripheral nerve trunk (or zero enlarged nerves).",
      "Negative skin smear for acid-fast bacilli at all tested sites.",
    ],
    stagingCriteria: [
      { stage: "Single Lesion PB", desc: "1 solitary skin macule with clear sensory impairment." },
      { stage: "Pauci-lesion PB", desc: "2 to 5 distinct hypopigmented patches with nerve hygiene intact." },
    ],
    whoRegimen: "Rifampicin 600mg (monthly supervised) + Dapsone 100mg (daily self-administered).",
    duration: "6 Months (6 Blister Packs completed within 9 months)",
    labConfirmation: "Clinical Sensory Mapping + Slit Skin Smear (Negative Bacteriological Index).",
    preventionGoal: "Grade-0 Disability Maintenance (100% cure with zero physical deformity).",
    prevalenceIndex: "38.4% of National Staging Registry",
    disabilityBenchmark: "0% Target Disability",
    referralCenter: "Oji River Specialist Leprosy Hospital / Local PHC",
    blisterPackColor: "Green Standard PB Blister Pack",
    vmtProtocol: "Routine cotton wool wisp sensory testing across palm & sole dermatomes.",
  },
  {
    id: 'leprosy-mb',
    name: "Multibacillary (MB) Leprosy",
    code: "ICD-11: 1B20.1",
    category: "Mycobacterial",
    categoryColor: "#0071E3",
    tag: "High Transmission & Deformity Risk",
    casesPill: "184+ Regimens",
    image: "/media/home_mb_leprosy_nerve_mapping.jpg",
    summary: "A high-bacillary-load form of leprosy presenting with more than 5 infiltrative skin lesions and multiple enlarged peripheral nerve trunks (Ulnar, Common Peroneal).",
    clinicalPresentation: [
      "More than 5 skin lesions: macules, plaques, diffuse infiltration, or nodules.",
      "Involvement of MORE THAN ONE peripheral nerve trunk with tenderness or enlargement.",
      "Positive skin smear for acid-fast bacilli (Bacteriological Index > 0).",
      "High risk of lagophthalmos, claw hand, and foot drop if untreated.",
    ],
    stagingCriteria: [
      { stage: "Borderline Lepromatous (BL)", desc: "Multiple asymmetrical plaques with satellite lesions." },
      { stage: "Lepromatous Leprosy (LL)", desc: "Diffuse bilateral infiltration, leonine facies, loss of lateral eyebrows." },
    ],
    whoRegimen: "Rifampicin 600mg (monthly) + Clofazimine 300mg (monthly) & 50mg (daily) + Dapsone 100mg (daily).",
    duration: "12 Months (12 Blister Packs completed within 18 months)",
    labConfirmation: "Slit Skin Smear (Positive BI) + High-Resolution Nerve Ultrasound.",
    preventionGoal: "Grade-2 Disability Prevention (< 4.8% National Target via Early Decompression).",
    prevalenceIndex: "42.1% of National Staging Registry",
    disabilityBenchmark: "< 4.8% G2D Rate",
    referralCenter: "Oji River & Mile 4 Specialist Leprosy Centers",
    blisterPackColor: "Red/Blue Standard MB Blister Pack",
    vmtProtocol: "Voluntary Muscle Testing (VMT) of Ulnar, Median, and Common Peroneal nerves every 30 days.",
  },
  {
    id: 'buruli-ulcer',
    name: "Buruli Ulcer (M. ulcerans)",
    code: "ICD-11: 1B21",
    category: "Necrotizing",
    categoryColor: "#0071E3",
    tag: "Rapid Tissue Necrosis Hazard",
    casesPill: "42+ Active Cases",
    image: "/media/home_buruli_differential.jpg",
    summary: "A debilitating necrotizing skin infection producing the immunosuppressive mycolactone toxin, resulting in painless subcutaneous fat necrosis and deeply undermined ulcers.",
    clinicalPresentation: [
      "Early pre-ulcerative stage: painless subcutaneous nodule, firm plaque, or diffuse oedema.",
      "Classic ulcerative stage: large painless ulcer with characteristic undermined violaceous edges.",
      "Predominantly localized on upper and lower limbs in rural riverine and agrarian basins.",
      "Late contractures and joint stiffness if wound care and oral antibiotic therapy are delayed.",
    ],
    stagingCriteria: [
      { stage: "Category I", desc: "Single small lesion < 5 cm in cross-sectional diameter." },
      { stage: "Category II", desc: "Single lesion between 5 cm and 15 cm in cross-sectional diameter." },
      { stage: "Category III", desc: "Single lesion > 15 cm, multiple lesions, or critical anatomical sites." },
    ],
    whoRegimen: "Oral Rifampicin (10 mg/kg daily) + Oral Clarithromycin (7.5 mg/kg twice daily).",
    duration: "8 Weeks (56 Days of Continuous Combination Therapy)",
    labConfirmation: "IS2404 Real-time PCR (Reference Lab) + Dry Swab Ziehl-Neelsen Smear.",
    preventionGoal: "Surgical Intervention Avoidance (Early Category I medical cure rate > 96%).",
    prevalenceIndex: "78.5% Laboratory Confirmation Rate",
    disabilityBenchmark: "> 95% Joint Mobility Saved",
    referralCenter: "Mile 4 Hospital Reference Lab (Abakaliki)",
    blisterPackColor: "Daily Co-Packaged Oral Rifampicin + Clarithromycin",
    vmtProtocol: "Joint mobility range of motion exercises and protective wound dressings.",
  },
  {
    id: 'yaws',
    name: "Yaws (T. pertenue)",
    code: "ICD-11: 1A61",
    category: "Treponemal",
    categoryColor: "#0071E3",
    tag: "Eradication Candidate (Target 2030)",
    casesPill: "312+ PHCs Active",
    image: "/media/home_yaws_differential_screening.jpg",
    summary: "A contagious non-venereal treponemal infection affecting skin, bone, and cartilage in tropical forest communities, spread by direct skin-to-skin contact.",
    clinicalPresentation: [
      "Primary stage: 'Mother yaw' solitary papilloma or framboesial granuloma.",
      "Secondary stage: Generalized multiple papillomas, plantar/palmar hyperkeratosis.",
      "Bone pain, nocturnal osteoperiostitis of tibia (sabre tibia deformity risk).",
      "Tertiary stage (rare): destructive gummatous necrosis and facial mutilation.",
    ],
    stagingCriteria: [
      { stage: "Primary Yaws", desc: "Initial mother yaw papilloma at site of inoculation." },
      { stage: "Secondary Yaws", desc: "Widespread skin eruptions, crab yaws, and periostitis." },
    ],
    whoRegimen: "Single-Dose Oral Azithromycin (30 mg/kg, max 2g) or Benzathine Penicillin G.",
    duration: "Single Supervised Oral Dose (Mass Drug Administration Protocol)",
    labConfirmation: "Dual Path Platform (DPP) Syphilis/Yaws Point-of-Care Rapid Test + PCR.",
    preventionGoal: "100% Interruption of Transmission (WHO Morges Eradication Strategy).",
    prevalenceIndex: "Rapid Point-of-Care Surveillance",
    disabilityBenchmark: "100% Bone Deformity Avoided",
    referralCenter: "Primary Health Care Center / NTBLCP Zonal Coordinator",
    blisterPackColor: "Single-Dose Azithromycin Oral Suspension / Tablets",
    vmtProtocol: "Active community contact tracing within 500m radius of index case.",
  },
  {
    id: 'trachoma',
    name: "Trachoma & Trichiasis",
    code: "ICD-11: 9A40",
    category: "Ophthalmic",
    categoryColor: "#0071E3",
    tag: "Preventable Blindness Elimination",
    casesPill: "SAFE Strategy Active",
    image: "/media/trachoma_clinical_screening.jpg",
    summary: "A bacterial infection of the eye caused by Chlamydia trachomatis, leading to conjunctival scarring, in-turned eyelashes (trichiasis), and irreversible corneal opacity.",
    clinicalPresentation: [
      "Trachomatous inflammation — follicular (TF): 5 or more follicles in upper tarsal conjunctiva.",
      "Trachomatous inflammation — intense (TI): pronounced inflammatory thickening of tarsal conjunctiva.",
      "Trachomatous conjunctival scarring (TS): visible fibrous white bands.",
      "Trachomatous trichiasis (TT): at least one eyelash rubbing against the eyeball.",
    ],
    stagingCriteria: [
      { stage: "TF / TI Stage", desc: "Active follicular and intense conjunctival inflammation." },
      { stage: "TT Stage", desc: "Trichiasis requiring immediate bilamellar tarsal rotation surgery." },
    ],
    whoRegimen: "SAFE Strategy: Surgery for trichiasis, Antibiotics (Azithromycin), Facial cleanliness, Environmental improvement.",
    duration: "Annual Mass Drug Administration + Surgical Camp Follow-up",
    labConfirmation: "2.5x Loupe Clinical Examination + Nucleic Acid Amplification Test (NAAT).",
    preventionGoal: "Zero Trachomatous Blindness (National Elimination Target < 0.2% TT in adults).",
    prevalenceIndex: "Active Screening across Sentinel Primary Schools",
    disabilityBenchmark: "100% Sight Preservation",
    referralCenter: "Zonal Eye Care Reference Hospital / Mobile Surgical Camps",
    blisterPackColor: "Single-Dose Oral Azithromycin / 1% Tetracycline Eye Ointment",
    vmtProtocol: "Community hygiene education and trichiasis eyelid epilation/surgery.",
  },
  {
    id: 'leishmaniasis',
    name: "Cutaneous Leishmaniasis",
    code: "ICD-11: 1F54",
    category: "Parasitic",
    categoryColor: "#0071E3",
    tag: "Vector-Borne Surveillance",
    casesPill: "WHO Target Node",
    image: "/media/leishmaniasis_microscopy.jpg",
    summary: "A protozoan parasitic skin infection transmitted by the bite of infected female phlebotomine sandflies, creating volcanic crater-like ulcerative lesions.",
    clinicalPresentation: [
      "Papule enlarging into a crusty nodule that breaks down into a volcanic ulcer.",
      "Raised, indurated borders with central depressed granulation bed.",
      "Satellite lesions, regional lymphadenopathy, and characteristic hyperpigmented scar.",
      "Exposure in semi-arid northern savannas and animal burrow zones.",
    ],
    stagingCriteria: [
      { stage: "Early Papular", desc: "Indurated erythematous nodule at sandfly bite locus." },
      { stage: "Ulcerative Crusted", desc: "Volcano ulcer with central necrotic crater." },
    ],
    whoRegimen: "Intralesional Sodium Stibogluconate (SSG) or Oral Miltefosine + Thermotherapy.",
    duration: "2 to 4 Weeks Specialized Clinical Protocol",
    labConfirmation: "Giemsa-Stained Direct Smear (Leishman-Donovan Amastigotes) + KDNA PCR.",
    preventionGoal: "Scar Minimization & Mucocutaneous Dissemination Prevention.",
    prevalenceIndex: "Regional Vector Nodes Active",
    disabilityBenchmark: "< 2% Dissemination Rate",
    referralCenter: "State Teaching Hospital Dermatology Department",
    blisterPackColor: "Specialized Antimonial / Miltefosine Unit",
    vmtProtocol: "Secondary bacterial infection prevention and thermotherapy.",
  },
];

export const DiseasesPage: React.FC<DiseasesPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDiseaseId, setActiveDiseaseId] = useState<string>('leprosy-pb');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'reel'>('grid');

  const filteredDiseases = useMemo(() => {
    return ALL_DISEASES.filter((d) => {
      const matchesCategory =
        selectedCategory === 'All' || d.category === selectedCategory;
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const selectedDisease = useMemo(() => {
    return ALL_DISEASES.find((d) => d.id === activeDiseaseId) || ALL_DISEASES[0];
  }, [activeDiseaseId]);

  return (
    <div className="min-h-screen bg-[#F4F5F8] text-[#1D1D1F] font-sans selection:bg-[#0071E3] selection:text-white relative">
      
      {/* ── Floating Brand Menu Capsule Navbar ───────────────────────────── */}
      <Navbar currentPage="diseases" onNavigate={onNavigate} />

      <main className="pt-24 sm:pt-32 pb-20 sm:pb-28 px-4 sm:px-8 max-w-[1400px] mx-auto space-y-8 select-none">
        
        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 1: HERO HEADER & 3D BIOLOGICAL SCENE (Top Row)
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Hero Bento Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 bg-white rounded-[32px] p-8 sm:p-10 border border-black/5 shadow-xs flex flex-col justify-between space-y-6 text-left"
          >
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#0071E3] uppercase tracking-widest block">
                TARGET DISEASES REGISTRY &bull; IKOLI AI
              </span>
              <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#1D1D1F] tracking-tight leading-[1.08]">
                SURVEILLANCE &amp; DIAGNOSTIC REGISTRY FOR SKIN NTDs
              </h1>
              <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed max-w-xl">
                Active clinical monitoring, computer vision lesion staging, and WHO treatment protocols for Leprosy, Buruli Ulcer, Yaws, Trachoma, and Leishmaniasis across Nigeria.
              </p>
            </div>

            {/* Bottom Row: Clinicians Telemetry & Action Button */}
            <div className="pt-4 border-t border-black/5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="w-9 h-9 rounded-full bg-[#1D1D1F] text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                    DR
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#0071E3] text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                    WHO
                  </div>
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                    NTB
                  </div>
                  <div className="w-9 h-9 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                    3K+
                  </div>
                </div>
                <div className="text-left font-sans">
                  <div className="text-xs font-bold text-[#1D1D1F]">312+ Sentinel PHCs</div>
                  <div className="text-[10px] text-gray-400 font-mono">Active Field Telemetry</div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('ask')}
                className="bg-[#0071E3] hover:bg-[#0077ED] active:scale-95 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md shadow-[#0071E3]/20 flex items-center gap-2 transition-all cursor-pointer group"
              >
                <span>Diagnose with AI</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Hero Bento Card: 3D Biological Scene */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 bg-[#EBF7F2] rounded-[32px] relative overflow-hidden border border-black/5 shadow-xs flex items-center justify-center min-h-[340px] group"
          >
            <img
              src="/media/diseases_hero_3d.jpg"
              alt="3D cellular micro-organisms and biological virus spheres"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#1D1D1F] border border-black/5 flex items-center gap-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>IS2404 REAL-TIME PCR &amp; OPTICAL CELLULAR STAGING</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white text-left">
              <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider block">
                Molecular Validation
              </span>
              <h4 className="font-bold text-base sm:text-lg text-white">
                Sub-millimeter Pathogen Identification Pipeline
              </h4>
            </div>
          </motion.div>

        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 2: INTERACTIVE DISEASE CATEGORIES & PHOTOGRAPHIC CARDS GRID
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="space-y-6 text-left pt-4">
          
          {/* Search & Filter Pills Bar */}
          <div className="bg-white/80 backdrop-blur-xl p-5 sm:p-6 rounded-[32px] border border-black/5 shadow-xs space-y-4 text-center">
            
            <div className="relative w-full max-w-2xl mx-auto">
              <Search className="w-4 h-4 absolute left-4.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by disease name, ICD code, or clinical symptoms..."
                className="w-full bg-white border border-black/10 rounded-full pl-11 pr-10 py-3.5 text-xs sm:text-sm font-medium text-[#1D1D1F] placeholder-gray-400 shadow-[0_2px_12px_rgba(0,0,0,0.03)] focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-black/5">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['All', 'Mycobacterial', 'Necrotizing', 'Treponemal', 'Ophthalmic', 'Parasitic'].map((cat) => {
                  const isSelected = selectedCategory === cat;
                  const label = cat === 'All' ? 'All Diseases' : cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#1D1D1F] text-white shadow-xs font-bold'
                          : 'bg-white text-gray-600 hover:text-[#1D1D1F] hover:bg-gray-50 border border-black/6'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Dual View Mode Switcher */}
              <div className="flex items-center gap-1 bg-[#F5F5F7] p-1 rounded-full border border-black/5 text-xs font-mono">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'grid'
                      ? 'bg-white text-[#1D1D1F] font-bold shadow-xs'
                      : 'text-gray-500 hover:text-[#1D1D1F]'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>3D Bento Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('reel')}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'reel'
                      ? 'bg-white text-[#1D1D1F] font-bold shadow-xs'
                      : 'text-gray-500 hover:text-[#1D1D1F]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>3D Coverflow Reel</span>
                </button>
              </div>
            </div>

          </div>

          {/* Subheading */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>DISEASE REGISTRY ({filteredDiseases.length} ACTIVE PROFILES)</span>
              </div>
              {searchQuery && (
                <span className="text-xs font-mono text-gray-500">
                  Filtering for: <strong className="text-[#1D1D1F]">"{searchQuery}"</strong>
                </span>
              )}
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-[#1D1D1F] tracking-tight">
              NEGLECTED TROPICAL SKIN DISEASES REGISTRY
            </h2>
          </div>

          {/* ── Conditional View: 3D Spatial Bento Grid vs 3D Coverflow Reel ── */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {filteredDiseases.map((disease) => (
                <SpatialDiseaseCard
                  key={disease.id}
                  disease={{
                    id: disease.id,
                    name: disease.name,
                    code: disease.code,
                    category: disease.category,
                    casesPill: disease.casesPill,
                    image: disease.image,
                    summary: disease.summary,
                    priorityTag: disease.tag,
                    whoTarget: disease.preventionGoal,
                    pcrStatus: disease.labConfirmation,
                  }}
                  onClick={() => {
                    setActiveDiseaseId(disease.id);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </div>
          ) : (
            <CoverflowDiseaseReel
              diseases={filteredDiseases.map((d) => ({
                id: d.id,
                name: d.name,
                code: d.code,
                category: d.category,
                casesPill: d.casesPill,
                image: d.image,
                summary: d.summary,
                priorityTag: d.tag,
                whoTarget: d.preventionGoal,
                pcrStatus: d.labConfirmation,
              }))}
              onSelectDisease={(id) => {
                setActiveDiseaseId(id);
                setIsModalOpen(true);
              }}
            />
          )}

          {/* Genomic Telemetry Wide Card */}
          <div className="w-full bg-[#E8F4F0] rounded-[32px] relative overflow-hidden border border-black/5 shadow-xs flex items-center justify-between p-6 sm:p-10 min-h-[220px] group mt-6">
            <div className="relative z-10 max-w-xl space-y-2 text-left">
              <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-widest block">
                GENOMIC TELEMETRY &bull; MOLECULAR IS2404 DNA SEQUENCING
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-[#1D1D1F] tracking-tight">
                Accelerating Real-Time Pathogen PCR Diagnostics
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                Standardized reference protocols in collaboration with Mile 4 Hospital Laboratory and Federal Ministry of Health NTD units.
              </p>
            </div>
            
            <img
              src="/media/dna_double_helix_3d.jpg"
              alt="Glossy 3D pearl DNA double helix strand"
              className="absolute right-0 top-0 bottom-0 w-1/2 h-full object-cover opacity-80 mix-blend-multiply pointer-events-none hidden md:block"
            />
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 3: DARK SCIENCE CONSOLE & LIQUID MICRO-BUBBLE 3D VISUAL
        ══════════════════════════════════════════════════════════════════════ */}
        <StoryScrollTriggerSection
          onNavigate={onNavigate}
          onOpenModal={(id) => {
            setActiveDiseaseId(id);
            setIsModalOpen(true);
          }}
        />

      </main>

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL: FULL CLINICAL STAGING SHEET WITH HIGH-DEFINITION IMAGE
      ══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[32px] p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-black/10 space-y-5 text-left max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-black/5 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#0071E3] uppercase">
                    ICD-11 CLINICAL REFERENCE &bull; {selectedDisease.code}
                  </span>
                  <h3 className="font-extrabold text-xl text-[#1D1D1F]">
                    {selectedDisease.name}
                  </h3>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-gray-600 hover:bg-black/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* High-Definition Clinical Image Banner in Modal */}
              <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden bg-gray-100 border border-black/5">
                <img
                  src={selectedDisease.image}
                  alt={selectedDisease.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs font-mono">
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full font-bold">
                    {selectedDisease.casesPill}
                  </span>
                  <span className="text-emerald-300 font-bold">
                    {selectedDisease.prevalenceIndex}
                  </span>
                </div>
              </div>

              {/* Disease Details & Regimen */}
              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-[#1D1D1F] mb-1">Clinical Summary:</h4>
                  <p className="text-gray-600 leading-relaxed font-normal">{selectedDisease.summary}</p>
                </div>

                {/* Clinical Presentation Bullets */}
                <div>
                  <h4 className="font-bold text-[#1D1D1F] mb-1.5">Diagnostic Criteria &amp; Presentation:</h4>
                  <ul className="space-y-1.5 p-3.5 bg-gray-50 rounded-2xl border border-black/5 text-gray-600">
                    {selectedDisease.clinicalPresentation.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#0071E3] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-[#1D1D1F] mb-1.5">WHO Prescribed Regimen:</h4>
                  <div className="p-3.5 bg-[#F5F5F7] rounded-2xl border border-black/5 space-y-1">
                    <p className="font-bold text-[#1D1D1F]">{selectedDisease.whoRegimen}</p>
                    <p className="text-gray-500 font-mono text-[11px]">Duration: {selectedDisease.duration}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#1D1D1F] mb-1.5">Reference Center:</h4>
                  <div className="p-3.5 bg-[#F5F5F7] rounded-2xl border border-black/5 font-mono text-[11px] text-gray-700">
                    {selectedDisease.referralCenter}
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    onNavigate('ask');
                  }}
                  className="flex-1 bg-[#0071E3] hover:bg-[#0077ED] text-white py-3 rounded-2xl font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch Ask Ikoli for this Case</span>
                </button>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-3 rounded-2xl font-bold text-xs cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <Footer onNavigate={onNavigate} />

    </div>
  );
};

export default DiseasesPage;
