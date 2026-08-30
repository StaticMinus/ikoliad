import React, { useState, useRef } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  ArrowUpRight,
  Play,
  Pause,
  Check,
  Send,
  Sparkles,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: any) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [isPlayingHymn, setIsPlayingHymn] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);

  // ── Polyphonic Choral Audio Synthesizer ("Atula Egwu" Harmonic Chime) ───
  const toggleHymnAudio = () => {
    if (isPlayingHymn) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
        setTimeout(() => {
          audioCtxRef.current?.close();
          audioCtxRef.current = null;
        }, 900);
      }
      setIsPlayingHymn(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 2.0);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Pentatonic choral chords characteristic of Harcourt Whyte's Igbo hymnody
        const chords = [
          [261.63, 329.63, 392.0, 523.25], // C major sacred
          [220.0, 261.63, 329.63, 440.0],  // A minor hope
          [349.23, 440.0, 523.25, 698.46], // F major resolution
          [196.0, 246.94, 293.66, 392.0],  // G major triumph
        ];

        let chordIdx = 0;
        const playChoralStanza = () => {
          if (!ctx || ctx.state === 'closed') return;
          const currentChord = chords[chordIdx % chords.length];
          chordIdx++;

          currentChord.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const noteGain = ctx.createGain();

            osc.type = i % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);

            noteGain.gain.setValueAtTime(0.0001, ctx.currentTime);
            noteGain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 1.2);
            noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.8);

            osc.connect(noteGain);
            noteGain.connect(masterGain);

            osc.start();
            osc.stop(ctx.currentTime + 5.0);
          });
        };

        playChoralStanza();
        timerRef.current = window.setInterval(playChoralStanza, 4200);
        setIsPlayingHymn(true);
      } catch (err) {
        console.warn('AudioContext not available', err);
      }
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryEmail('');
    }, 4000);
  };

  const chronologyMilestones = [
    {
      step: '01',
      years: '1905 – 1924',
      title: 'Childhood in Abonnema & Early Leprosy Diagnosis',
      desc: 'Born into a Kalabari family in Abonnema (Rivers State), Ikoli showed early brilliance playing flute and side-drum in his school brass band. In 1919, at age 14, he was diagnosed with leprosy, leading to severe social ostracization and loss of schooling.',
    },
    {
      step: '02',
      years: '1932 – 1948',
      title: 'Uzuakoli Settlement Sanctuary & The Choral Revolution',
      desc: 'Transferred to the Uzuakoli Leprosy Hospital in Abia State in 1932. Mentored by British missionary physician Dr. T.F. Davey, he studied music theory and founded the world-renowned Uzuakoli Leprosy Choir, composing over 200 sacred Igbo hymns performed acappella.',
    },
    {
      step: '03',
      years: '1949 – 1977',
      title: 'Clinical Cure, De-stigmatization & National Icon',
      desc: 'Formally cured of leprosy in 1949 following early Dapsone clinical trials, Whyte voluntarily chose to remain at Uzuakoli for the rest of his life, dedicating his voice to caring for patients. His hymn "Atula Egwu" (Never Fear) became an anthem of solace during the Nigerian Civil War.',
    },
    {
      step: '04',
      years: '2026 & Beyond',
      title: 'The Living Digital Legacy: IKOLI AI Platform',
      desc: 'Nigeria’s national Neglected Tropical Skin Diseases clinical intelligence platform is named in his everlasting honor. Developed by the IKOLI Consortium, it unites computer vision with zero-PII epidemiology to eliminate physical disability forever.',
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] text-[#1D1D1F] min-h-screen font-sans selection:bg-[#0071E3] selection:text-white">
      
      {/* ── Fixed Universal Floating Navbar ──────────────────────────────── */}
      <Navbar currentPage="about" onNavigate={onNavigate} />

      {/* ══════════════════════════════════════════════════════════════════════
          1. 100% EDITORIAL HERO SECTION (BLUEPRINT PORTRAIT & SPATIAL COLUMNS)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden select-none">
        
        {/* 1. Full-Bleed Archival / Editorial Portrait Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/media/about_ikoli_editorial_hero.jpg"
            alt="Ikoli Harcourt Whyte (1905–1977)"
            className="w-full h-full object-cover object-center filter grayscale contrast-115 brightness-95"
          />
          {/* Spatial Atmospheric Vignette Overlays for High-Contrast Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-transparent to-black/85 pointer-events-none" />
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        </div>

        {/* 2. Spatial Refractive Seam Lines (Vertical Columns from Blueprint) */}
        <div className="absolute left-[38%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/0 via-white/20 to-white/0 pointer-events-none z-10 hidden md:block" />
        <div className="absolute left-[62%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/0 via-white/20 to-white/0 pointer-events-none z-10 hidden md:block" />

        {/* 3. Top Subtle Inner Navigation / Header Bar */}
        <div className="relative z-20 w-full px-6 sm:px-12 md:px-16 pt-24 sm:pt-28 flex items-center justify-between">
          <div className="font-display font-black text-xs sm:text-sm tracking-widest text-white/90 uppercase flex items-center gap-2">
            <span>IKOLI HARCOURT WHYTE</span>
            <span className="text-[#0071E3]">&bull;</span>
            <span className="text-gray-400 font-mono text-[10px]">1905 &ndash; 1977</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-[11px] font-mono tracking-widest text-white/70 uppercase">
            <a href="#biography" className="hover:text-white transition-colors cursor-pointer">BIOGRAPHY</a>
            <a href="#music" className="hover:text-white transition-colors cursor-pointer">CHORAL SUITE</a>
            <a href="#uzuakoli" className="hover:text-white transition-colors cursor-pointer">UZUAKOLI SANCTUARY</a>
            <a href="#consortium" className="hover:text-white transition-colors cursor-pointer">CONSORTIUM</a>
          </div>
        </div>

        {/* 4. Left Mid-Height Paragraph (Exact Blueprint Placement) */}
        <div className="relative z-20 px-6 sm:px-12 md:px-16 my-auto pt-8">
          <div className="max-w-[280px] sm:max-w-xs md:max-w-sm space-y-2">
            <p className="text-[11px] sm:text-xs font-mono font-medium tracking-widest text-white/85 uppercase leading-relaxed">
              HISTORICAL INSPIRATION &amp; HUMANITARIAN LEGACY &bull; HOW A LEPROSY COMPOSER IN UZUAKOLI TRANSFORMED NTD STIGMA INTO HOPE &amp; SACRED HARMONY (1905–1977)
            </p>
          </div>
        </div>

        {/* 5. Bottom Section: Center Action Audio Trigger & Bottom-Right Stacked Typography */}
        <div className="relative z-20 w-full px-6 sm:px-12 md:px-16 pb-12 sm:pb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          
          {/* Center Play / Choral Hymnody Trigger Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleHymnAudio}
              className="flex items-center gap-3.5 group cursor-pointer text-left"
              title="Play / Pause Sacred Choral Hymnody of Ikoli Harcourt Whyte"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full backdrop-blur-md border flex items-center justify-center text-white shadow-2xl transition-all duration-300 group-hover:scale-110 ${
                isPlayingHymn
                  ? 'bg-[#0071E3] border-[#0071E3] scale-105 shadow-[0_0_40px_rgba(0,113,227,0.6)]'
                  : 'bg-white/15 hover:bg-white/30 border-white/30 group-hover:bg-white group-hover:text-black'
              }`}>
                {isPlayingHymn ? (
                  <Pause className="w-5 h-5 fill-current text-white" />
                ) : (
                  <Play className="w-5 h-5 fill-current translate-x-0.5" />
                )}
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold tracking-widest text-white/60 uppercase block">
                  {isPlayingHymn ? 'PLAYING ATULA EGWU SUITE' : 'SACRED CHORAL HYMNODY'}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider group-hover:text-[#00D2FF] transition-colors flex items-center gap-1">
                  <span>{isPlayingHymn ? 'PAUSE CHORAL AUDIO' : 'PLAY HYMN SUITE'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </button>
          </div>

          {/* Bottom-Right Stacked Grand Display Heading (Exact Matching Typography) */}
          <div className="text-left md:text-right">
            <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[120px] xl:text-[130px] tracking-tight leading-[0.86] text-white uppercase select-none drop-shadow-2xl">
              IKOLI<br />
              HARCOURT WHYTE
            </h1>
          </div>

        </div>

        {/* Scroll Down Indicator */}
        <div
          onClick={() => {
            const el = document.getElementById('biography');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 cursor-pointer text-white/50 hover:text-white transition-colors flex flex-col items-center gap-1"
        >
          <span className="text-[9px] font-mono uppercase tracking-widest">SCROLL TO EXPLORE</span>
          <div className="w-4 h-6 rounded-full border border-white/30 flex items-start justify-center p-1">
            <div className="w-1 h-1.5 rounded-full bg-white animate-bounce" />
          </div>
        </div>

      </section>

      {/* ── Main Editorial Content Wrapper ───────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-5 sm:px-10 md:px-16 space-y-24 sm:space-y-32 pt-20 sm:pt-28 text-left">
        
        {/* ══════════════════════════════════════════════════════════════════════
            2. SECTION: "ABOUT IKOLI" (100% EXACT BLUEPRINT REPLICATION)
        ══════════════════════════════════════════════════════════════════════ */}
        <section id="biography" className="space-y-8">
          
          {/* Header Row (Left: ABOUT IKOLI, Right: Uppercase Manifesto) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/8 pb-4">
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#1D1D1F] uppercase">
              ABOUT IKOLI
            </h2>
            <p className="max-w-md text-[11px] sm:text-xs font-mono font-medium tracking-wider text-gray-500 uppercase leading-relaxed text-left md:text-right">
              WE HONOR IKOLI HARCOURT WHYTE (1905–1977), WHOSE SACRED HYMNODY AND HUMANITARIAN VALOR TRANSFORMED LEPROSY EXILE INTO IMMORTAL HOPE &amp; DIGNITY.
            </p>
          </div>

          {/* Main 2-Column Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left 2/3 Area (Span 8) */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
              
              {/* Top Row: 2 Gray Cards Side-by-Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                
                {/* Card A: 1905 - 1932 */}
                <div className="bg-[#ECECED] rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 border border-black/5 space-y-3 text-left shadow-2xs">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0071E3] block">
                    1905 &ndash; 1932 &bull; ORIGINS &amp; RESILIENCE
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#1D1D1F] uppercase leading-snug">
                    ABONNEMA &amp; EARLY AWAKENING
                  </h3>
                  <p className="text-xs text-gray-600 font-mono uppercase tracking-wider leading-relaxed font-normal">
                    DIAGNOSED WITH LEPROSY AT AGE 14 IN 1919, IKOLI REFUSED RETREAT INTO DESPAIR. PLAYING FLUTE AND BRASS, HE HARNESSED MUSIC AS A SACRED FORCE FOR DIGNITY.
                  </p>
                </div>

                {/* Card B: 1932 - 1977 */}
                <div className="bg-[#ECECED] rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 border border-black/5 space-y-3 text-left shadow-2xs">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0071E3] block">
                    1932 &ndash; 1977 &bull; THE SANCTUARY
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#1D1D1F] uppercase leading-snug">
                    UZUAKOLI CHORAL SANCTUARY
                  </h3>
                  <p className="text-xs text-gray-600 font-mono uppercase tracking-wider leading-relaxed font-normal">
                    AT UZUAKOLI HOSPITAL, HE COMPOSED OVER 200 SACRED IGBO HYMNS. HIS CHOIR TOURED GLOBALLY, PROVING THE IMMORTAL INTELLECT OF PATIENTS.
                  </p>
                </div>

              </div>

              {/* Bottom Row: Wide Panoramic Manuscript Photo */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-gray-900 border border-black/5 shadow-md group cursor-pointer">
                <img
                  src="/media/about_manuscript_wide.jpg"
                  alt="Harcourt Whyte Sacred Choral Manuscript"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#0071E3] font-bold block">
                      ARCHIVAL HERITAGE
                    </span>
                    <span className="font-bold text-sm sm:text-base leading-tight block">
                      Original Handwritten Scores &bull; Uzuakoli Choral Suite (1932–1977)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
                    200+ ANTHEMS
                  </span>
                </div>
              </div>

            </div>

            {/* Right 1/3 Area: Tall Vertical Editorial Card (Span 4) */}
            <div className="lg:col-span-4 relative rounded-[24px] sm:rounded-[28px] overflow-hidden bg-gray-900 border border-black/5 shadow-md group cursor-pointer min-h-[480px]">
              <img
                src="/media/about_tall_portrait.jpg"
                alt="Ikoli Living Succession"
                className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1 text-left">
                <span className="text-[10px] font-mono text-[#0071E3] font-bold uppercase tracking-widest block">
                  THE LIVING SUCCESSION
                </span>
                <h4 className="font-bold text-base sm:text-lg text-white leading-snug">
                  From Uzuakoli Sanctuary to National Clinical Intelligence
                </h4>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Transforming his historic message of hope into Nigeria's autonomous Skin NTD diagnostic network.
                </p>
              </div>
            </div>

          </div>

        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            3. SECTION: "THE IKOLI PORTFOLIO" (100% EXACT 8-CELL BLUEPRINT GRID)
        ══════════════════════════════════════════════════════════════════════ */}
        <section id="portfolio" className="space-y-8">
          
          {/* Header Row (Left: Uppercase Statement, Right: Stacked Heading) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/8 pb-4">
            <p className="max-w-md text-[11px] sm:text-xs font-mono font-medium tracking-wider text-gray-500 uppercase leading-relaxed text-left">
              A LIVING REPOSITORY UNITING HISTORICAL SACRED HYMNODY, ZERO-PII NEURAL INFERENCE, AND CLINICAL DERMATOLOGY ACROSS NIGERIA.
            </p>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#1D1D1F] uppercase text-left md:text-right leading-[0.92]">
              THE IKOLI<br />PORTFOLIO
            </h2>
          </div>

          {/* 8-Cell Gallery Bento Grid (4 Columns x 2 Rows matching screenshot 100%) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Cell 1: Clinical Examination Staging */}
            <div
              onClick={() => onNavigate('diseases')}
              className="relative aspect-[3/4] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-gray-900 border border-black/5 group cursor-pointer shadow-xs"
            >
              <img
                src="/media/leprosy_clinical_sensory_exam.jpg"
                alt="Clinical Stage I Screening"
                className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-106 group-hover:filter-none transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 text-white">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/90 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                  STAGE I DETECTION
                </span>
              </div>
            </div>

            {/* Cell 2: Skin Lesion Differential Diagnostic */}
            <div
              onClick={() => onNavigate('diseases')}
              className="relative aspect-[3/4] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-gray-900 border border-black/5 group cursor-pointer shadow-xs"
            >
              <img
                src="/media/home_pb_leprosy_hypopigmentation.jpg"
                alt="Hypopigmentation Examination"
                className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-106 group-hover:filter-none transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-300 block">
                  PAUCIBACILLARY
                </span>
                <span className="font-bold text-xs leading-tight block">
                  Sensory Mapping
                </span>
              </div>
            </div>

            {/* Cell 3: Clinical Leadership Study */}
            <div
              onClick={() => onNavigate('about')}
              className="relative aspect-[3/4] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-gray-900 border border-black/5 group cursor-pointer shadow-xs"
            >
              <img
                src="/media/about_tall_portrait.jpg"
                alt="Clinical Leadership"
                className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-106 group-hover:filter-none transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-400 block">
                  CONSORTIUM
                </span>
                <span className="font-bold text-xs leading-tight block">
                  Expert Clinicians
                </span>
              </div>
            </div>

            {/* Cell 4: Laboratory Microscopic Telemetry */}
            <div
              onClick={() => onNavigate('dashboard')}
              className="relative aspect-[3/4] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-gray-900 border border-black/5 group cursor-pointer shadow-xs"
            >
              <img
                src="/media/submenu_sentinel_lab.jpg"
                alt="Microscopy Telemetry"
                className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-106 group-hover:filter-none transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-purple-300 block">
                  SENTINEL TELEMETRY
                </span>
                <span className="font-bold text-xs leading-tight block">
                  Abuja Lab Network
                </span>
              </div>
            </div>

            {/* Cell 5: Sensory Nerve Trunk Examination */}
            <div
              onClick={() => onNavigate('diseases')}
              className="relative aspect-[3/4] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-gray-900 border border-black/5 group cursor-pointer shadow-xs"
            >
              <img
                src="/media/home_mb_leprosy_nerve_mapping.jpg"
                alt="Peroneal Nerve Exam"
                className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-106 group-hover:filter-none transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-amber-300 block">
                  MULTIBACILLARY
                </span>
                <span className="font-bold text-xs leading-tight block">
                  Nerve Thickening
                </span>
              </div>
            </div>

            {/* Cell 6: Patient Dignity & Human Sanctuary */}
            <div
              onClick={() => onNavigate('about')}
              className="relative aspect-[3/4] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-gray-900 border border-black/5 group cursor-pointer shadow-xs"
            >
              <img
                src="/media/submenu_patient_dignity.jpg"
                alt="Patient Dignity & Recovery"
                className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-106 group-hover:filter-none transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-300 block">
                  HUMAN DIGNITY
                </span>
                <span className="font-bold text-xs leading-tight block">
                  Zero Suffering
                </span>
              </div>
            </div>

            {/* Cell 7: SPECIAL INTERACTIVE AUDIO CARD (100% Matching Screenshot Widget) */}
            <div
              onClick={toggleHymnAudio}
              className="relative aspect-[3/4] rounded-[20px] sm:rounded-[24px] bg-[#ECECED] border border-black/5 flex flex-col items-center justify-between p-5 text-center shadow-xs cursor-pointer group hover:bg-[#E2E2E5] transition-all"
            >
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-gray-500 block">
                CHORAL HERITAGE
              </span>
              
              <div className="space-y-3 flex flex-col items-center">
                <h3 className="font-display font-black text-lg sm:text-xl text-[#1D1D1F] uppercase leading-tight tracking-tight">
                  SACRED<br />HYMNS
                </h3>

                {/* Circular Play / Pause Widget matching screenshot */}
                <div className={`w-11 h-11 rounded-full border flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-110 ${
                  isPlayingHymn
                    ? 'bg-[#0071E3] text-white border-[#0071E3]'
                    : 'bg-white text-black border-black/10'
                }`}>
                  {isPlayingHymn ? (
                    <Pause className="w-4 h-4 fill-current text-white" />
                  ) : (
                    <Play className="w-4 h-4 fill-current translate-x-0.5 text-black" />
                  )}
                </div>
              </div>

              <span className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider">
                {isPlayingHymn ? 'PLAYING "ATULA EGWU"' : 'CLICK TO PLAY'}
              </span>
            </div>

            {/* Cell 8: Consortium Research Charter */}
            <div
              onClick={() => onNavigate('about')}
              className="relative aspect-[3/4] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-gray-900 border border-black/5 group cursor-pointer shadow-xs"
            >
              <img
                src="/media/female_researcher_journal.jpg"
                alt="Consortium Research Charter"
                className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-106 group-hover:filter-none transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 right-3 text-right text-white">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-300 block">
                  CONSORTIUM CHARTER
                </span>
                <span className="font-bold text-xs leading-tight block">
                  NDPA 2023 &bull; v1.1
                </span>
              </div>
            </div>

          </div>

        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            4. SECTION: "CHRONOLOGY & MILESTONES"
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-black/5 pb-4">
            <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-[#1D1D1F] uppercase">
              LIFE CHRONOLOGY &bull; 1905 TO 2026
            </h2>
            <span className="text-xs font-mono text-gray-400 font-semibold tracking-wider">
              1905 &ndash; 2026 Historical Arc
            </span>
          </div>

          {/* 4 Numbered Horizontal Rows */}
          <div className="divide-y divide-black/10 border-y border-black/10">
            {chronologyMilestones.map((stage) => (
              <div
                key={stage.step}
                className="py-6 sm:py-7 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-black/[0.015] px-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-6 shrink-0 sm:w-1/3">
                  <span className="font-mono text-xs font-bold text-gray-400">
                    {stage.step}
                  </span>
                  <div>
                    <span className="font-mono text-[11px] font-bold text-[#0071E3] block">
                      {stage.years}
                    </span>
                    <span className="font-display font-bold text-sm sm:text-base text-[#1D1D1F] leading-snug">
                      {stage.title}
                    </span>
                  </div>
                </div>

                <div className="sm:w-2/3 pl-0 sm:pl-8">
                  <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            5. SECTION: "4-IMAGE HISTORICAL GALLERY"
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: 'UZUAKOLI SANCTUARY', image: '/media/leprosy_clinical_exam.jpg' },
              { label: 'CHORAL ARCHIVE', image: '/media/medical_journal_thumb.jpg' },
              { label: 'METHODIST MISSION', image: '/media/who_clinical_guide_cover.jpg' },
              { label: 'AI RESURRECTION', image: '/media/tablet-diagnostics.jpg' },
            ].map((item) => (
              <div key={item.label} className="space-y-2 text-center group cursor-pointer">
                <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-gray-200 border border-black/5 shadow-xs">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover filter grayscale contrast-110 group-hover:scale-105 group-hover:filter-none transition-all duration-500"
                  />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase block group-hover:text-[#0071E3] transition-colors">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            6. SECTION: "PANORAMIC BANNER / SACRED CHORAL HERITAGE"
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          
          <div className="flex items-center justify-between">
            <h3 className="font-display font-black text-xl sm:text-2xl text-[#1D1D1F] tracking-tight uppercase">
              SACRED CHORAL HERITAGE &bull; UZUAKOLI HYMNS
            </h3>
            <span className="text-xs font-mono text-gray-400 font-semibold">
              Uzuakoli &bull; Abia State &bull; Nigeria
            </span>
          </div>

          {/* Ultra-Wide Panoramic Black & White Banner */}
          <div className="relative rounded-[36px] overflow-hidden bg-[#18191C] border border-black/10 shadow-2xl aspect-[16/7] sm:aspect-[21/9] flex items-end p-6 sm:p-12 text-white group">
            <img
              src="/media/about_panoramic_banner.jpg"
              alt="Ikoli Harcourt Whyte Heritage Choir"
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-120 opacity-80 group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl space-y-2">
              <span className="text-[10px] font-mono text-[#0071E3] font-bold uppercase tracking-wider block">
                The Everlasting Anthem
              </span>
              <h4 className="font-display font-black text-xl sm:text-3xl text-white leading-tight">
                "Even in our deepest afflictions, our voices shall rise across generations until leprosy and disability are no more."
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 font-light">
                Composed at Uzuakoli Leprosy Hospital, immortalized in Nigeria's National Clinical Surveillance AI.
              </p>
            </div>
          </div>

        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            7. SECTION: "LEGACY & CONSORTIUM CONTACT"
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-black/5 pb-4">
            <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-[#1D1D1F] uppercase">
              LEGACY &amp; DEPLOYMENT &bull; CONSORTIUM LIAISON
            </h2>
            <span className="text-xs font-mono text-gray-400 font-semibold tracking-wider">
              RedAid Nigeria &bull; DAHW &bull; FMOH
            </span>
          </div>

          {/* Split Container: Left Form + Right Tall Portrait */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-[36px] overflow-hidden bg-[#F5F5F7] p-8 sm:p-12 border border-black/5">
            
            {/* Left Box: Form & Contact Info (Span 7) */}
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0071E3] block">
                  Preserving Heritage &bull; Advancing Science
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#1D1D1F] leading-tight">
                  Support the Ikoli Mission or Inquire on National Deployment
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  Collaborate with the IKOLI Consortium (RedAid Nigeria, DAHW Germany, Digital Dreams, FMOH/NTBLCP, VRC-UNN, IDEA) to support leprosy care and deploy the AI diagnostic network across Africa.
                </p>
              </div>

              {/* Inquiry Email Form */}
              <form onSubmit={handleInquirySubmit} className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="Enter your institutional email (e.g. info@health.gov.ng)"
                    className="w-full bg-white border border-black/10 rounded-full px-5 py-3 text-xs text-[#1D1D1F] placeholder-gray-400 focus:outline-none focus:border-[#0071E3] shadow-xs"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto shrink-0 bg-[#1D1D1F] hover:bg-black active:scale-95 text-white font-bold text-xs px-6 py-3 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    {inquirySent ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Inquiry Received</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
                <span className="text-[10px] font-mono text-gray-400 block pl-2">
                  Direct routing to RedAid Nigeria &bull; Country Rep: Dr. Daniel Nze Egbule.
                </span>
              </form>

              {/* Direct Details Strip */}
              <div className="pt-6 border-t border-black/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-gray-600">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Historical Archive:</span>
                  <span className="text-[#1D1D1F] font-bold">archive@ikoli.health.ng</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Zonal Secretariat:</span>
                  <span className="text-[#1D1D1F] font-bold">Enugu &bull; Abuja &bull; Würzburg</span>
                </div>
              </div>

            </div>

            {/* Right Box: Tall Vertical Studio Portrait (Span 5) */}
            <div className="lg:col-span-5 rounded-[28px] overflow-hidden bg-[#18191C] aspect-[3/4] sm:aspect-auto min-h-[360px] relative border border-black/5 shadow-xs group">
              <img
                src="/media/about_contact_clinician.jpg"
                alt="IKOLI AI Clinical Governance"
                className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-105 group-hover:filter-none transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-mono text-[#0071E3] font-bold uppercase tracking-wider block">
                  Consortium Leadership
                </span>
                <h4 className="font-bold text-sm sm:text-base text-white">
                  RedAid Nigeria &amp; Consortium Partners
                </h4>
                <p className="text-xs text-gray-300 font-light">
                  DAHW &bull; Digital Dreams &bull; FMOH/NTBLCP &bull; VRC-UNN &bull; IDEA
                </p>
              </div>
            </div>

          </div>

        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            8. SECTION: BOTTOM HIGH-CONTRAST BAR
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="bg-[#0E0F11] rounded-[32px] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0071E3] text-white flex items-center justify-center font-black">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="font-display font-bold text-base sm:text-lg text-white">
                IKOLI HARCOURT WHYTE HERITAGE &bull; CONNECT WITH CONSORTIUM
              </h4>
              <span className="text-xs text-gray-400 font-mono">
                Father of Igbo Church Music &bull; The Soul of IKOLI AI
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="bg-white hover:bg-gray-100 text-[#0E0F11] font-bold text-xs px-5 py-2.5 rounded-full shadow-md transition-all cursor-pointer active:scale-95"
            >
              Surveillance Console
            </button>
            <button
              onClick={() => onNavigate('api')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-2.5 rounded-full border border-white/15 backdrop-blur-md transition-all cursor-pointer active:scale-95"
            >
              Developer APIs
            </button>
          </div>
        </section>

      </main>

      {/* ── Universal Full-Width Footer ──────────────────────────────────── */}
      <div className="w-full mt-24">
        <Footer onNavigate={onNavigate} />
      </div>

    </div>
  );
};
