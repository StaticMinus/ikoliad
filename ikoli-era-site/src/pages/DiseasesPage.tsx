import React, { useState, useMemo } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Search, Microscope, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';

interface DiseasesPageProps {
  onNavigate: (page: 'home' | 'dashboard' | 'diseases' | 'ask') => void;
}

interface DiseaseDetail {
  id: string;
  name: string;
  code: string;
  category: string;
  categoryColor: string;
  tag: string;
  videoUrl: string;
  summary: string;
  clinicalPresentation: string[];
  stagingCriteria: { stage: string; desc: string }[];
  whoRegimen: string;
  duration: string;
  labConfirmation: string;
  preventionGoal: string;
}

const ALL_DISEASES: DiseaseDetail[] = [
  {
    id: 'leprosy-pb',
    name: 'Paucibacillary (PB) Leprosy',
    code: 'ICD-11: 1B20.0',
    category: 'Mycobacterial',
    categoryColor: '#2c4c34',
    tag: 'Early Detection Priority',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_030111_a9e15665-d379-4a7f-8116-695bbe452ad1.mp4',
    summary: 'A chronic infectious disease caused by Mycobacterium leprae, characterized by single or few hypopigmented skin macules with definite sensory loss.',
    clinicalPresentation: [
      '1 to 5 hypopigmented or reddish skin lesions with loss of sensation to touch/pain.',
      'Definite impairment of sensation tested via wisp of cotton wool.',
      'Involvement of only ONE peripheral nerve trunk (or zero enlarged nerves).',
      'Negative skin smear for acid-fast bacilli at all sites.',
    ],
    stagingCriteria: [
      { stage: 'Single Lesion PB', desc: '1 solitary skin macule with clear sensory impairment.' },
      { stage: 'Pauci-lesion PB', desc: '2 to 5 distinct hypopigmented patches with nerve hygiene.' },
    ],
    whoRegimen: 'Rifampicin 600mg (monthly supervised) + Dapsone 100mg (daily self-administered).',
    duration: '6 Months (6 Blister Packs completed within 9 months)',
    labConfirmation: 'Clinical Sensory Mapping + Slit Skin Smear (Negative BI).',
    preventionGoal: 'Grade-0 Disability Maintenance (100% cure with zero physical deformity).',
  },
  {
    id: 'leprosy-mb',
    name: 'Multibacillary (MB) Leprosy',
    code: 'ICD-11: 1B20.1',
    category: 'Mycobacterial',
    categoryColor: '#a63e2d',
    tag: 'High Transmission Risk',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4',
    summary: 'A high-bacillary-load form of leprosy presenting with numerous infiltrative skin lesions and multiple enlarged peripheral nerve trunks.',
    clinicalPresentation: [
      'More than 5 skin lesions: macules, plaques, diffuse infiltration, or nodules.',
      'Involvement of MORE THAN ONE peripheral nerve trunk (Ulnar, Common Peroneal, Posterior Tibial).',
      'Positive skin smear for acid-fast bacilli (Bacteriological Index > 0).',
      'Loss of sensation, muscle weakness, or lagophthalmos risk.',
    ],
    stagingCriteria: [
      { stage: 'Borderline Lepromatous (BL)', desc: 'Multiple asymmetrical plaques with satellite lesions.' },
      { stage: 'Lepromatous Leprosy (LL)', desc: 'Diffuse bilateral infiltration, leonine facies, loss of eyebrows.' },
    ],
    whoRegimen: 'Rifampicin 600mg (monthly) + Clofazimine 300mg (monthly supervised) & 50mg (daily) + Dapsone 100mg (daily).',
    duration: '12 Months (12 Blister Packs completed within 18 months)',
    labConfirmation: 'Slit Skin Smear (Positive BI) + Nerve Ultrasound / Biopsy.',
    preventionGoal: 'Disability Prevention (G2D < 5% national target via early nerve decompression).',
  },
  {
    id: 'buruli-ulcer',
    name: 'Buruli Ulcer (Mycobacterium ulcerans)',
    code: 'ICD-11: 1B21',
    category: 'Necrotizing',
    categoryColor: '#7d1a4a',
    tag: 'Rapid Tissue Necrosis',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_155500_808e6fdd-761f-4acd-b3be-cb7e6e700def.mp4',
    summary: 'A debilitating necrotizing skin infection producing the mycolactone toxin, resulting in painless subcutaneous necrosis and large undermined ulcers.',
    clinicalPresentation: [
      'Early pre-ulcerative stage: painless nodule, firm plaque, or diffuse painless oedema.',
      'Classic ulcerative stage: large painless ulcer with extensively undermined, violaceous edges.',
      'Often localized on lower and upper limbs in riparian / riverine communities.',
      'Late complications: joint contractures, secondary bacterial infection, osteomyelitis.',
    ],
    stagingCriteria: [
      { stage: 'Category I', desc: 'Single small lesion < 5 cm in diameter.' },
      { stage: 'Category II', desc: 'Single lesion between 5 cm and 15 cm in diameter.' },
      { stage: 'Category III', desc: 'Single lesion > 15 cm, multiple lesions, or critical sites (face/joints).' },
    ],
    whoRegimen: 'Oral Rifampicin (10 mg/kg daily) + Oral Clarithromycin (7.5 mg/kg twice daily).',
    duration: '8 Weeks (56 Days of Continuous Combination Therapy)',
    labConfirmation: 'IS2404 Real-time PCR (UNTH Reference Lab) + Dry Swab Ziehl-Neelsen.',
    preventionGoal: 'Surgical Avoidance (Early Category I medical cure rate > 95%).',
  },
  {
    id: 'yaws-leish',
    name: 'Yaws & Cutaneous Leishmaniasis',
    code: 'ICD-11: 1A90',
    category: 'Treponemal & Parasitic',
    categoryColor: '#1a2b8c',
    tag: 'Eradication Candidate',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154232_f8809bd2-a6c3-4a38-908d-2005e5b3cb3e.mp4',
    summary: 'Endemic non-venereal treponematosis causing papillomas and bone deformities, alongside parasitic cutaneous leishmaniasis ulcers.',
    clinicalPresentation: [
      'Primary "Mother Yaw": initial painless papilloma or framboesial ulceration.',
      'Secondary: widespread multiple raspberry-like papillomas, palmar/plantar hyperkeratosis ("crab yaws").',
      'Bone involvement: painful nocturnal osteoperiostitis (sabre tibia, dactylitis).',
      'Leishmaniasis: volcano-like crater ulcer with raised indurated borders.',
    ],
    stagingCriteria: [
      { stage: 'Primary Yaws', desc: 'Solitary mother yaw papilloma on legs or buttocks.' },
      { stage: 'Secondary Yaws', desc: 'Disseminated skin lesions, dactylitis, and bone pain.' },
      { stage: 'Tertiary Yaws', desc: 'Destructive ulcerations, rhinopharyngitis mutilans (gangosa).' },
    ],
    whoRegimen: 'Single-dose Oral Azithromycin (30 mg/kg, maximum 2 g) or Benzathine Penicillin IM.',
    duration: 'Single-Dose Curative Administration (Community Mass Drug Triage)',
    labConfirmation: 'Dual Path Platform (DPP) Rapid Syphilis/Yaws Screen & Confirm Assay.',
    preventionGoal: '100% Interruption of Transmission (WHO 2030 Target).',
  },
];

export const DiseasesPage: React.FC<DiseasesPageProps> = ({
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Interactive Clinical Triage Calculator State
  const [calcLesions, setCalcLesions] = useState<'1-5' | '>5'>('1-5');
  const [calcSensoryLoss, setCalcSensoryLoss] = useState<boolean>(true);
  const [calcUlcerType, setCalcUlcerType] = useState<'none' | 'small' | 'large'>('none');

  const filteredDiseases = useMemo(() => {
    return ALL_DISEASES.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.clinicalPresentation.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCategory === 'all' ||
        (selectedCategory === 'leprosy-pb' && d.id === 'leprosy-pb') ||
        (selectedCategory === 'leprosy-mb' && d.id === 'leprosy-mb') ||
        (selectedCategory === 'buruli' && d.id === 'buruli-ulcer') ||
        (selectedCategory === 'yaws' && d.id === 'yaws-leish');

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  // Calculate Triage Result
  const triageResult = useMemo(() => {
    if (calcUlcerType === 'large') {
      return {
        disease: 'Buruli Ulcer (Category II / III)',
        regimen: 'Oral Rifampicin + Clarithromycin for 8 Weeks + Reference Lab PCR IS2404',
        color: '#7d1a4a',
      };
    }
    if (calcUlcerType === 'small') {
      return {
        disease: 'Buruli Ulcer (Category I) or Yaws',
        regimen: 'Oral Rifampicin + Clarithromycin (BU) or Single-Dose Azithromycin (Yaws)',
        color: '#7d1a4a',
      };
    }
    if (calcSensoryLoss) {
      if (calcLesions === '1-5') {
        return {
          disease: 'Paucibacillary (PB) Leprosy',
          regimen: '6-Month WHO MDT Blister Pack (Rifampicin + Dapsone)',
          color: '#2c4c34',
        };
      }
      return {
        disease: 'Multibacillary (MB) Leprosy',
        regimen: '12-Month WHO MDT Blister Pack (Rifampicin + Clofazimine + Dapsone)',
        color: '#a63e2d',
      };
    }
    return {
      disease: 'Non-NTD Dermatosis or Early Lesion',
      regimen: 'Submit high-resolution lesion photo to IKOLI AI for differential optical analysis.',
      color: '#0082FF',
    };
  }, [calcLesions, calcSensoryLoss, calcUlcerType]);

  return (
    <main className="w-full min-h-screen bg-white text-[#0A0C10] font-sans selection:bg-[#0082FF] selection:text-white">
      
      {/* ── Main Diseases Content Curtain Layer ───────────── */}
      <div className="relative z-10 bg-white shadow-2xl">
        {/* ── 1. Luminous Ice-Blue Hero Section ──────────────── */}
        <section className="relative w-full bg-gradient-to-b from-[#CDE3FA] via-[#E2F0FD] to-[#FFFFFF] overflow-hidden select-none pb-20">
        <Navbar
          currentPage="diseases"
          onNavigate={onNavigate}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-10 pb-16 text-center">
          
          {/* Header Badges */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#0082FF] shadow-sm border border-white/60 mb-6">
            <Microscope className="w-3.5 h-3.5" />
            <span>NATIONAL CLINICAL STAGING REGISTRY</span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#0A0C10] leading-none mb-6">
            TARGET <span className="text-[#0082FF]">DISEASES</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-700 font-medium leading-relaxed mb-10">
            Comprehensive diagnostic criteria, differential morphology, and WHO-approved therapeutic protocols for endemic Skin Neglected Tropical Diseases in Nigeria.
          </p>

          {/* Search & Filter Bar */}
          <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-md p-3 rounded-2xl sm:rounded-full shadow-xl border border-white/80 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-3 flex-1 px-4 w-full">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clinical criteria, symptoms, regimens (e.g. 'hypopigmentation', 'PCR')..."
                className="w-full bg-transparent text-sm text-[#0A0C10] placeholder-gray-400 focus:outline-none font-sans"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto px-2 pb-1 sm:pb-0">
              {[
                { id: 'all', label: 'All' },
                { id: 'leprosy-pb', label: 'Leprosy PB' },
                { id: 'leprosy-mb', label: 'Leprosy MB' },
                { id: 'buruli', label: 'Buruli Ulcer' },
                { id: 'yaws', label: 'Yaws' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-[#0A0C10] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Convex Curved Bottom Arc Separator */}
        <div className="w-full h-14 sm:h-20 bg-white rounded-t-[50%_100%] shadow-inner -mt-8 relative z-20" />
      </section>

      {/* ── 2. Interactive Clinical Triage & Staging Calculator ── */}
      <section className="w-full bg-white py-16 px-6 md:px-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto bg-[#FAFCFF] p-8 sm:p-10 rounded-[32px] border border-gray-200/80 shadow-lg space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/60 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0082FF] animate-pulse" />
                <span className="font-mono text-xs font-bold text-[#0082FF] uppercase tracking-wider">
                  CLINICAL FIELD DECISION SUPPORT
                </span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0A0C10] mt-1">
                Instant Staging & Triage Calculator
              </h2>
            </div>
            <p className="text-xs text-gray-500 max-w-md font-sans leading-relaxed">
              Select verified field observations below to determine the precise WHO clinical classification and medication regimen.
            </p>
          </div>

          {/* Calculator Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Input 1: Lesion Count */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-3">
              <span className="text-xs font-bold text-gray-500 uppercase font-mono block">1. Lesion Count</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setCalcLesions('1-5')}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    calcLesions === '1-5'
                      ? 'bg-[#0082FF] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  1 to 5 Patches
                </button>
                <button
                  onClick={() => setCalcLesions('>5')}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    calcLesions === '>5'
                      ? 'bg-[#0082FF] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  &gt; 5 Patches
                </button>
              </div>
            </div>

            {/* Input 2: Sensory Loss */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-3">
              <span className="text-xs font-bold text-gray-500 uppercase font-mono block">2. Loss of Sensation</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setCalcSensoryLoss(true)}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    calcSensoryLoss
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Sensory Loss (+)
                </button>
                <button
                  onClick={() => setCalcSensoryLoss(false)}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    !calcSensoryLoss
                      ? 'bg-gray-800 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Sensation Normal
                </button>
              </div>
            </div>

            {/* Input 3: Ulceration Staging */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-3">
              <span className="text-xs font-bold text-gray-500 uppercase font-mono block">3. Ulceration Diameter</span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setCalcUlcerType('none')}
                  className={`py-2.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    calcUlcerType === 'none'
                      ? 'bg-[#0A0C10] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  No Ulcer
                </button>
                <button
                  onClick={() => setCalcUlcerType('small')}
                  className={`py-2.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    calcUlcerType === 'small'
                      ? 'bg-[#7d1a4a] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  &lt; 5 cm
                </button>
                <button
                  onClick={() => setCalcUlcerType('large')}
                  className={`py-2.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    calcUlcerType === 'large'
                      ? 'bg-[#7d1a4a] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  &gt; 5 cm
                </button>
              </div>
            </div>

          </div>

          {/* Calculator Output Plate */}
          <div className="bg-[#0A0C10] text-white p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">Calculated Diagnosis:</span>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-md text-white font-bold" style={{ backgroundColor: triageResult.color }}>
                  {triageResult.disease}
                </span>
              </div>
              <p className="text-xs text-gray-300 font-mono pt-1">
                {triageResult.regimen}
              </p>
            </div>

            <button
              onClick={() => onNavigate('ask')}
              className="bg-[#0082FF] hover:bg-[#0066CC] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase font-mono tracking-wider transition-all hover:scale-105 shrink-0 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Consult AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* ── 3. Comprehensive Disease Catalog Grid ──────────── */}
      <section className="w-full bg-white py-20 px-6 md:px-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#0082FF] font-bold uppercase tracking-widest block">
              • COMPREHENSIVE CLINICAL CATALOG
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#0A0C10] tracking-tight">
              Clinical Staging Profiles & Regimens
            </h2>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredDiseases.map((d) => (
              <div
                key={d.id}
                className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl flex flex-col justify-between hover:shadow-2xl hover:border-blue-200 transition-all duration-500 group"
              >
                <div className="space-y-6">
                  
                  {/* Top Bar with Category & Tag */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-white text-xs font-mono font-bold px-3 py-1 rounded-full shadow-2xs"
                      style={{ backgroundColor: d.categoryColor }}
                    >
                      {d.category}
                    </span>
                    <span className="text-[11px] font-mono text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 font-bold">
                      {d.code}
                    </span>
                  </div>

                  {/* Video Preview Container */}
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-black shadow-inner">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      src={d.videoUrl}
                      className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                    {/* Corner L-Brackets */}
                    <div className="absolute top-[12px] left-[12px] w-[10px] h-[10px] border-t-[1.5px] border-l-[1.5px] border-white opacity-80 pointer-events-none" />
                    <div className="absolute top-[12px] right-[12px] w-[10px] h-[10px] border-t-[1.5px] border-r-[1.5px] border-white opacity-80 pointer-events-none" />
                    <div className="absolute bottom-[12px] left-[12px] w-[10px] h-[10px] border-b-[1.5px] border-l-[1.5px] border-white opacity-80 pointer-events-none" />
                    <div className="absolute bottom-[12px] right-[12px] w-[10px] h-[10px] border-b-[1.5px] border-r-[1.5px] border-white opacity-80 pointer-events-none" />
                  </div>

                  {/* Disease Title & Summary */}
                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-2xl text-[#0A0C10] group-hover:text-[#0082FF] transition-colors">
                      {d.name}
                    </h3>
                    <p className="text-xs text-gray-600 font-sans leading-relaxed">
                      {d.summary}
                    </p>
                  </div>

                  {/* Key Clinical Presentation Bullets */}
                  <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-gray-100 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                      Key Clinical Manifestations
                    </span>
                    <ul className="space-y-1.5 text-xs text-gray-700 font-sans">
                      {d.clinicalPresentation.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Staging Stages Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {d.stagingCriteria.map((st, i) => (
                      <div key={i} className="bg-white p-3 rounded-xl border border-gray-100 shadow-2xs">
                        <span className="font-mono font-bold text-[#0A0C10] block text-[11px]">{st.stage}</span>
                        <span className="text-[10px] text-gray-500 font-sans leading-tight block mt-0.5">{st.desc}</span>
                      </div>
                    ))}
                  </div>

                  {/* WHO Regimen Plate */}
                  <div className="p-4 rounded-2xl bg-[#0A0C10] text-white space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
                      <span>WHO Standard Regimen</span>
                      <span>{d.duration}</span>
                    </div>
                    <p className="text-xs text-gray-200 font-mono leading-relaxed">
                      {d.whoRegimen}
                    </p>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400 font-mono">
                      <span>Lab: {d.labConfirmation}</span>
                    </div>
                  </div>

                </div>

                {/* Bottom Card Action */}
                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-700">
                    {d.preventionGoal}
                  </span>
                  <button
                    onClick={() => onNavigate('ask')}
                    className="text-xs font-bold text-[#0082FF] hover:text-[#0066CC] font-mono flex items-center gap-1 cursor-pointer"
                  >
                    <span>Assess Case</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. WHO 2030 National NTD Targets Matrix ─────────── */}
      <section className="w-full bg-[#FAFCFF] py-20 px-6 md:px-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="font-mono text-xs text-[#0082FF] font-bold uppercase tracking-widest block">
              • STRATEGIC ROADMAP 2026 – 2030
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A0C10] tracking-tight">
              Nigeria Skin NTD Elimination Benchmarks
            </h2>
            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              Coordinated surveillance milestones between NTBLCP Nigeria, RedAid, and State Health Ministries.
            </p>
          </div>

          {/* 3 Metric Milestone Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-md space-y-3">
              <span className="text-xs font-mono font-bold text-gray-400 uppercase">Leprosy Target</span>
              <h3 className="font-display font-extrabold text-4xl text-[#0A0C10]">&lt; 5%</h3>
              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                Grade-2 disability among new child cases reduced to below 5% through early AI hypopigmentation screening.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-md space-y-3">
              <span className="text-xs font-mono font-bold text-[#0082FF] uppercase">Buruli Ulcer Target</span>
              <h3 className="font-display font-extrabold text-4xl text-[#0082FF]">&gt; 70%</h3>
              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                Over 70% of Buruli ulcer cases diagnosed at early Category I stage (&lt; 5 cm) to eliminate surgical debridement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-md space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-600 uppercase">National Data Trust</span>
              <h3 className="font-display font-extrabold text-4xl text-emerald-600">100%</h3>
              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                Complete zero-PII cryptographic anonymization across all 312+ sentinel clinics streaming to DHIS2.
              </p>
            </div>

          </div>

          </div>
        </section>
      </div>

      {/* ── 5. Sticky Reveal Institutional Footer ──────────── */}
      <Footer
        onNavigate={onNavigate}
      />

    </main>
  );
};
