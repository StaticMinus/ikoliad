import React, { useState, useMemo } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  Search,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Dna,
  Maximize2,
  X,
  ArrowUpRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DiseasesPageProps {
  onNavigate: (page: 'home' | 'dashboard' | 'diseases' | 'ask' | 'about' | 'styles') => void;
}

export interface DiseaseDetail {
  id: string;
  name: string;
  code: string;
  category: 'Mycobacterial' | 'Necrotizing' | 'Treponemal' | 'Parasitic';
  categoryColor: string;
  tag: string;
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
  referralCenter: string;
  blisterPackColor: string;
  vmtProtocol: string;
}

const ALL_DISEASES: DiseaseDetail[] = [
  {
    id: 'leprosy-pb',
    name: 'Paucibacillary (PB) Leprosy',
    code: 'ICD-11: 1B20.0',
    category: 'Mycobacterial',
    categoryColor: '#0071E3',
    tag: 'Early Detection Priority',
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
    referralCenter: 'Oji River Specialist Leprosy Hospital / Local PHC',
    blisterPackColor: 'Green Standard PB Blister Pack',
    vmtProtocol: 'Routine cotton wool wisp sensory testing across palm & sole dermatomes.',
  },
  {
    id: 'leprosy-mb',
    name: 'Multibacillary (MB) Leprosy',
    code: 'ICD-11: 1B20.1',
    category: 'Mycobacterial',
    categoryColor: '#DE322D',
    tag: 'High Transmission & Deformity Risk',
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
    referralCenter: 'Oji River & Mile 4 Specialist Leprosy Centers',
    blisterPackColor: 'Red/Blue Standard MB Blister Pack',
    vmtProtocol: 'Voluntary Muscle Testing (VMT) of Ulnar, Median, and Common Peroneal nerves every 30 days.',
  },
  {
    id: 'buruli-ulcer',
    name: 'Buruli Ulcer (Mycobacterium ulcerans)',
    code: 'ICD-11: 1B21',
    category: 'Necrotizing',
    categoryColor: '#10B981',
    tag: 'Rapid Tissue Necrosis Hazard',
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
    referralCenter: 'Mile 4 Hospital Reference Lab (Abakaliki)',
    blisterPackColor: 'Daily Co-Packaged Oral Rifampicin + Clarithromycin',
    vmtProtocol: 'Joint mobility range of motion exercises and protective wound dressings.',
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
    referralCenter: 'Primary Health Care Center / NTBLCP Zonal Coordinator',
    blisterPackColor: 'Single-Dose Azithromycin Oral Suspension / Tablets',
    vmtProtocol: 'Active community contact tracing within 500m radius of index case.',
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
    referralCenter: 'State Teaching Hospital Dermatology Department',
    blisterPackColor: 'Specialized Antimonial / Miltefosine Unit',
    vmtProtocol: 'Secondary bacterial infection prevention and thermotherapy.',
  },
];

export const DiseasesPage: React.FC<DiseasesPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDiseaseId, setActiveDiseaseId] = useState<string>('leprosy-pb');
  const [activeTab, setActiveTab] = useState<'clinical' | 'staging' | 'regimen' | 'lab' | 'vmt'>('clinical');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans selection:bg-[#0071E3] selection:text-white">
      
      {/* ── Fixed Clean Capsule Navbar ─────────────────────────────────── */}
      <Navbar currentPage="diseases" onNavigate={onNavigate} />

      {/* ── Section 1: Hero Header ───────────────────────────────────────── */}
      <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-8 max-w-7xl mx-auto text-center space-y-5">
        
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/8 shadow-xs text-xs font-mono font-semibold text-gray-700">
          <Dna className="w-3.5 h-3.5 text-[#0071E3]" />
          <span>WHO DATA PORTAL STANDARD • ICD-11 CLINICAL REGISTRY</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#1D1D1F] leading-[1.06] max-w-4xl mx-auto">
          Target Skin NTD Registry.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
          WHO multidrug therapy (MDT) blister pack protocols, clinical staging criteria, real-time PCR validation, and disability prevention standards across Nigeria.
        </p>

        {/* Search & Filter Bar */}
        <div className="pt-4 max-w-2xl mx-auto space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by disease name, ICD code, or clinical symptoms..."
              className="w-full bg-white border border-black/8 rounded-full pl-11 pr-5 py-3 text-xs sm:text-sm font-medium text-[#1D1D1F] placeholder-gray-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition-all"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {['All', 'Mycobacterial', 'Necrotizing', 'Treponemal', 'Parasitic'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#1D1D1F] text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:text-black border border-black/5'
                }`}
              >
                {cat === 'All' ? 'All Diseases' : cat}
              </button>
            ))}
          </div>
        </div>

      </section>

      {/* ── Section 2: Interactive Master-Detail Disease Console ────────── */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto pb-20 sm:pb-28">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Disease Selector Cards (4 Cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400 block px-1">
              Active Diseases ({filteredDiseases.length})
            </span>

            <div className="space-y-2">
              {filteredDiseases.map((disease) => {
                const isSelected = activeDiseaseId === disease.id;
                return (
                  <button
                    key={disease.id}
                    onClick={() => setActiveDiseaseId(disease.id)}
                    className={`w-full text-left p-4 rounded-2xl transition-all cursor-pointer flex flex-col justify-between gap-2 border group ${
                      isSelected
                        ? 'bg-white border-[#0071E3] shadow-md ring-1 ring-[#0071E3]'
                        : 'bg-white/80 hover:bg-white border-black/5 hover:border-black/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
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
                      <h3 className="font-bold text-sm sm:text-base text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                        {disease.name}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5 font-normal">
                        {disease.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-semibold text-gray-400 pt-1 border-t border-black/5">
                      <span>{disease.tag}</span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          isSelected ? 'text-[#0071E3] translate-x-0.5' : 'text-gray-300'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive WHO Staging & Regimen Inspector (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-[32px] p-6 sm:p-8 md:p-10 border border-black/5 shadow-xl space-y-6">
            
            {/* Header: Title, ICD Code & Direct AI Diagnostic Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${currentDisease.categoryColor}15`,
                      color: currentDisease.categoryColor,
                    }}
                  >
                    {currentDisease.code}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">
                    {currentDisease.category}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#1D1D1F] tracking-tight">
                  {currentDisease.name}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#F5F5F7] hover:bg-[#EBEBEF] text-[#1D1D1F] px-4 py-2 rounded-full text-xs font-bold border border-black/5 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Full Staging Sheet</span>
                </button>

                <button
                  onClick={() => onNavigate('ask')}
                  className="bg-[#0071E3] hover:bg-[#0077ED] active:scale-95 text-white px-4 py-2 rounded-full text-xs font-bold shadow-md shadow-[#0071E3]/20 flex items-center gap-1.5 transition-all cursor-pointer group"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Diagnose with AI</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* High-Resolution Case Clinical Reference Banner */}
            <div className="relative rounded-2xl overflow-hidden border border-black/5 bg-[#1D1D1F] h-48 sm:h-60 group">
              <img
                src={currentDisease.imageUrl}
                alt={currentDisease.name}
                className="w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                    Verified Clinical Archive
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-white">
                    {currentDisease.name} Diagnostic Telemetry
                  </h4>
                </div>

                <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-gray-300 border border-white/10 hidden sm:block">
                  {currentDisease.referralCenter}
                </div>
              </div>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="flex items-center gap-1.5 border-b border-black/5 pb-2 overflow-x-auto scrollbar-none">
              {[
                { id: 'clinical', label: '1. Clinical Signs' },
                { id: 'staging', label: '2. Staging Tiers' },
                { id: 'regimen', label: '3. WHO MDT Regimen' },
                { id: 'lab', label: '4. Lab & PCR' },
                { id: 'vmt', label: '5. VMT & Prevention' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#1D1D1F] text-white shadow-xs'
                      : 'text-gray-500 hover:text-black hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Dynamic Tab Panel Content */}
            <div className="space-y-4 min-h-[220px]">
              
              {/* 1. Clinical Presentation */}
              {activeTab === 'clinical' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-700 leading-relaxed font-normal">
                    {currentDisease.summary}
                  </p>
                  
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400 block">
                      Core Diagnostic Presentation:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentDisease.clinicalPresentation.map((sign, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#F5F5F7] border border-black/5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-700 leading-relaxed">{sign}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Staging Criteria */}
              {activeTab === 'staging' && (
                <div className="space-y-3">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400 block">
                    WHO Clinical Classification Tiers:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentDisease.stagingCriteria.map((tier, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-[#F5F5F7] border border-black/5 space-y-1.5">
                        <span className="text-[10px] font-bold text-[#0071E3] font-mono">Stage {i + 1}</span>
                        <h4 className="font-bold text-sm text-[#1D1D1F]">{tier.stage}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{tier.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. WHO MDT Regimen */}
              {activeTab === 'regimen' && (
                <div className="p-5 rounded-2xl bg-[#F5F5F7] border border-black/5 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#0071E3]">
                      Prescribed Pharmacotherapy Regimen
                    </span>
                    <h4 className="font-bold text-base text-[#1D1D1F]">
                      {currentDisease.whoRegimen}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-black/5 text-xs font-mono">
                    <div className="bg-white p-3 rounded-xl border border-black/5">
                      <span className="text-gray-400 block text-[10px]">Duration</span>
                      <strong className="text-[#1D1D1F] font-bold">{currentDisease.duration}</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-black/5">
                      <span className="text-gray-400 block text-[10px]">Blister Pack Type</span>
                      <strong className="text-[#0071E3] font-bold">{currentDisease.blisterPackColor}</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-black/5">
                      <span className="text-gray-400 block text-[10px]">Disability Target</span>
                      <strong className="text-emerald-600 font-bold">{currentDisease.disabilityBenchmark}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Laboratory & PCR */}
              {activeTab === 'lab' && (
                <div className="p-5 rounded-2xl bg-[#F5F5F7] border border-black/5 space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#5856D6]">
                      Laboratory Confirmation Pipeline
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-[#1D1D1F]">
                      {currentDisease.labConfirmation}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                    <div className="bg-white p-3 rounded-xl border border-black/5">
                      <span className="text-gray-400 block text-[10px]">Reference Center</span>
                      <strong className="text-[#1D1D1F]">{currentDisease.referralCenter}</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-black/5">
                      <span className="text-gray-400 block text-[10px]">National Confirmation</span>
                      <strong className="text-purple-600 font-bold">{currentDisease.prevalenceIndex}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. VMT & Disability Prevention */}
              {activeTab === 'vmt' && (
                <div className="p-5 rounded-2xl bg-[#F5F5F7] border border-black/5 space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-emerald-600">
                      Voluntary Muscle Testing (VMT) & Prevention Protocol
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-[#1D1D1F]">
                      {currentDisease.preventionGoal}
                    </h4>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed font-normal">
                    {currentDisease.vmtProtocol}
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* ── Section 3: WHO 2030 Roadmap Milestones ─────────────────────── */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto pb-24 sm:pb-32 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0071E3]">
            WHO 2030 Elimination Milestones
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#1D1D1F] tracking-tight">
            Progress Toward Zero Transmission
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-xs space-y-3">
            <span className="text-xs font-mono font-bold text-[#0071E3] uppercase">MDT Completion Rate</span>
            <div className="text-3xl font-black text-[#1D1D1F] font-mono">89.2%</div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#0071E3] rounded-full w-[89.2%]" />
            </div>
            <p className="text-[11px] text-gray-400 font-mono">Target: &gt; 85% Completion nationwide</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-xs space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-600 uppercase">Grade-2 Disability Prevention</span>
            <div className="text-3xl font-black text-emerald-600 font-mono">&lt; 4.8%</div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[95%]" />
            </div>
            <p className="text-[11px] text-gray-400 font-mono">Target: &lt; 5.0% Deformity rate</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-xs space-y-3">
            <span className="text-xs font-mono font-bold text-purple-600 uppercase">IS2404 PCR Molecular Match</span>
            <div className="text-3xl font-black text-purple-600 font-mono">78.5%</div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full w-[78.5%]" />
            </div>
            <p className="text-[11px] text-gray-400 font-mono">Target: &gt; 70% Reference lab confirmation</p>
          </div>
        </div>

      </section>

      {/* ── Modal: Full Clinical Staging Sheet ─────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[32px] p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-black/10 space-y-5 text-left max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-black/5 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#0071E3] uppercase">
                    ICD-11 CLINICAL REFERENCE
                  </span>
                  <h3 className="font-extrabold text-xl text-[#1D1D1F]">
                    {currentDisease.name}
                  </h3>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-gray-600 hover:bg-black/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-[#1D1D1F] mb-1">Summary Description:</h4>
                  <p className="text-gray-600 leading-relaxed font-normal">{currentDisease.summary}</p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1D1D1F] mb-1.5">WHO Prescribed Regimen:</h4>
                  <div className="p-3.5 bg-[#F5F5F7] rounded-2xl border border-black/5 space-y-1">
                    <p className="font-bold text-[#1D1D1F]">{currentDisease.whoRegimen}</p>
                    <p className="text-gray-500 font-mono text-[11px]">Duration: {currentDisease.duration}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#1D1D1F] mb-1.5">Reference Center:</h4>
                  <div className="p-3.5 bg-[#F5F5F7] rounded-2xl border border-black/5 font-mono text-[11px] text-gray-700">
                    {currentDisease.referralCenter}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    onNavigate('ask');
                  }}
                  className="flex-1 bg-[#0071E3] hover:bg-[#0077ED] text-white py-3 rounded-2xl font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch Ask Ikoli for this Case</span>
                </button>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-3 rounded-2xl font-bold text-xs cursor-pointer"
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
