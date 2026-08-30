import React, { useState, useRef } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  ArrowUpRight,
  Play,
  Pause,
  Check,
  Send,
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
            4. SECTION: "ЭТАПЫ РАБОТЫ" / "WORK PROCESS & CLINICAL PIPELINE" (100% REPLICATION)
        ══════════════════════════════════════════════════════════════════════ */}
        <section id="process" className="space-y-8 pt-4">
          
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-black/8 pb-4">
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#1D1D1F] uppercase">
              WORK PROCESS &bull; CLINICAL PIPELINE
            </h2>
            <span className="text-xs font-mono text-gray-400 font-semibold tracking-wider uppercase">
              4-STAGE AUTONOMOUS SURVEILLANCE &amp; CARE ARCHITECTURE
            </span>
          </div>

          {/* 4 Clean Numbered Horizontal Rows matching reference table */}
          <div className="divide-y divide-black/10 border-y border-black/10">
            {[
              {
                step: '01',
                title: 'FRONTLINE FIELD SCREENING',
                desc: 'CHEW community health workers capture dermatological lesion macro-imagery in offline rural clinics across all 774 Local Government Areas.',
              },
              {
                step: '02',
                title: 'EDGE NEURAL INFERENCE & STAGING',
                desc: 'On-device ONNX WebGPU neural models perform real-time WHO 3-stage Buruli classification, Ridley-Jopling leprosy spectrum staging, and sub-millimeter necrosis demarcation.',
              },
              {
                step: '03',
                title: 'EXPERT CLINICIAN TELE-VERIFICATION',
                desc: 'Consortium dermatologists and zonal reference centers tele-verify high-confidence alerts through Zero-PII cryptographic vaults with zero patient data exposure.',
              },
              {
                step: '04',
                title: 'MDT THERAPY & RECOVERY DISPATCH',
                desc: 'Automated dispatch of WHO Multi-Drug Therapy (MDT) pharmaceutical regimens, digital physio tracking for nerve function, and lifelong human dignity restoration.',
              },
            ].map((stage) => (
              <div
                key={stage.step}
                className="py-7 sm:py-9 flex flex-col sm:flex-row sm:items-start justify-between gap-6 hover:bg-black/[0.015] px-3 sm:px-4 rounded-2xl transition-colors group cursor-default"
              >
                <div className="flex items-center gap-6 sm:gap-8 shrink-0 sm:w-2/5">
                  <span className="font-mono text-base sm:text-lg font-bold text-gray-400 group-hover:text-[#0071E3] transition-colors">
                    {stage.step}
                  </span>
                  <span className="font-display font-black text-base sm:text-lg text-[#1D1D1F] uppercase tracking-tight leading-snug">
                    {stage.title}
                  </span>
                </div>

                <div className="sm:w-3/5 pl-0 sm:pl-8">
                  <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            5. SECTION: "4-CARD EDITORIAL REEL & @IKOLICONSORTIUM BANNER" (100% REPLICATION)
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6 pt-4">
          
          {/* 4 Cards in a Row with Captions Directly Underneath */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Card 1: Clinical Research (Vibrant Creative Color) */}
            <div className="space-y-2.5 text-center group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-gray-900 border border-black/5 shadow-xs">
                <img
                  src="/media/submenu_chew_screening.jpg"
                  alt="Clinical Research"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-gray-500 uppercase block group-hover:text-[#0071E3] transition-colors">
                PORTRAIT / RESEARCH
              </span>
            </div>

            {/* Card 2: Neural Inference (IKOLI AI Man Editorial) */}
            <div className="space-y-2.5 text-center group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-gray-900 border border-black/5 shadow-xs">
                <img
                  src="/media/ikoli_ai_man_editorial.jpg"
                  alt="Neural Inference"
                  className="w-full h-full object-cover filter grayscale contrast-110 group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-gray-500 uppercase block group-hover:text-[#0071E3] transition-colors">
                NEURAL INFERENCE
              </span>
            </div>

            {/* Card 3: Consortium Leadership (Vibrant Creative Color in Sunlit Gallery) */}
            <div className="space-y-2.5 text-center group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-gray-900 border border-black/5 shadow-xs">
                <img
                  src="/media/about_contact_creative_color.jpg"
                  alt="Consortium Leadership"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-gray-500 uppercase block group-hover:text-[#0071E3] transition-colors">
                UZUAKOLI SANCTUARY
              </span>
            </div>

            {/* Card 4: Sacred Hymnody Manuscript */}
            <div className="space-y-2.5 text-center group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-gray-900 border border-black/5 shadow-xs">
                <img
                  src="/media/about_manuscript_wide.jpg"
                  alt="Sacred Hymnody"
                  className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-gray-500 uppercase block group-hover:text-[#0071E3] transition-colors">
                SACRED HYMNODY
              </span>
            </div>

          </div>

          {/* Sub-Header Banner underneath the 4 cards (@IKOLICONSORTIUM & Manifesto) */}
          <div className="pt-6 sm:pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-black/5">
            <div className="space-y-0.5">
              <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#1D1D1F] tracking-tight uppercase">
                @IKOLICONSORTIUM
              </h2>
            </div>

            <div className="max-w-xl text-left md:text-right">
              <p className="text-xs sm:text-[13px] text-gray-500 font-medium uppercase tracking-wider leading-relaxed">
                CONNECTING HISTORICAL HUMANITARIAN DIGNITY WITH SOVEREIGN NEURAL DIAGNOSTICS FOR OVER 200 MILLION NIGERIANS.
              </p>
            </div>
          </div>

        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            5. SECTION: "MASSIVE ULTRA-WIDE PANORAMIC CINEMATIC COLOR BANNER" (100% REPLICATION)
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="pt-4">
          
          <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#18191C] border border-black/10 shadow-2xl aspect-[16/8] sm:aspect-[21/9] lg:aspect-[24/9] flex items-end p-6 sm:p-10 md:p-14 text-white group cursor-pointer">
            {/* Rich Creative Color Panoramic Photograph */}
            <img
              src="/media/about_panoramic_creative_color.jpg"
              alt="IKOLI Clinical AI Innovation Lab Panorama"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-104 transition-transform duration-1000 ease-out"
            />
            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none" />
            
            {/* Quote Overlay in Bottom-Left */}
            <div className="relative z-10 max-w-2xl space-y-2 text-left">
              <span className="text-[10px] sm:text-[11px] font-mono text-emerald-300 font-bold uppercase tracking-widest block drop-shadow-sm">
                IKOLI CONSORTIUM CHARTER &bull; 2026
              </span>
              <h3 className="font-display font-bold text-base sm:text-xl md:text-2xl lg:text-3xl text-white leading-snug drop-shadow-md">
                "WHEN CLINICAL PRECISION MEETS HUMAN DIGNITY, PREVENTABLE DISABILITY CEASES TO EXIST."
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 font-light drop-shadow-sm">
                RedAid Nigeria &bull; DAHW Germany &bull; Digital Dreams &bull; FMOH/NTBLCP
              </p>
            </div>
          </div>

        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            6. SECTION: "CONTACTS / WANT TO COLLABORATE WITH IKOLI AI?" (100% REPLICATION)
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-8 pt-4">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-black/5 pb-4">
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#1D1D1F] uppercase">
              CONTACTS
            </h2>
            <span className="text-xs font-mono text-gray-400 font-semibold tracking-wider uppercase">
              DIRECT CONSORTIUM SECRETARIAT &amp; PARTNERSHIP CHANNELS
            </span>
          </div>

          {/* 2-Column Split Bento Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            
            {/* Left Area (Span 7): Top Gray Box + Bottom Info Strip + Form */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              
              {/* Top Gray Card */}
              <div className="rounded-[28px] sm:rounded-[32px] bg-[#9A9DA3] p-8 sm:p-10 text-white shadow-sm space-y-4">
                <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase leading-tight">
                  WANT TO COLLABORATE<br />WITH IKOLI AI?
                </h3>
                <p className="text-xs sm:text-sm text-white/90 font-medium uppercase tracking-wider leading-relaxed max-w-lg">
                  OPEN FOR HEALTHCARE SYSTEMS, STATE MINISTRIES OF HEALTH, RESEARCH INSTITUTES &amp; GLOBAL NTD ELIMINATION PARTNERS.
                </p>
              </div>

              {/* Inquiry Email Form */}
              <form onSubmit={handleInquirySubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="Enter your institutional email (e.g. info@health.gov.ng)"
                    className="w-full bg-[#F5F5F7] border border-black/8 rounded-full px-5 py-3.5 text-xs text-[#1D1D1F] placeholder-gray-400 focus:outline-none focus:border-[#0071E3] shadow-2xs"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto shrink-0 bg-[#1D1D1F] hover:bg-black active:scale-95 text-white font-bold text-xs px-7 py-3.5 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
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
              </form>

              {/* Bottom 2-Column Info Strip */}
              <div className="pt-6 border-t border-black/8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-gray-600">
                <div className="space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">
                    HEADQUARTERS:
                  </span>
                  <span className="text-[#1D1D1F] font-bold block">
                    Federal Ministry of Health &bull; Abuja
                  </span>
                  <span className="text-[#0071E3] font-bold block pt-1">
                    clinical@ikoli.health
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">
                    CONSORTIUM SECRETARIAT:
                  </span>
                  <span className="text-[#1D1D1F] font-bold block">
                    Abuja, Enugu &amp; Uzuakoli, Nigeria
                  </span>
                  <span className="text-gray-700 font-bold block pt-1">
                    TELEGRAM: @ikoliai_consortium
                  </span>
                </div>
              </div>

            </div>

            {/* Right Area (Span 5): Tall Creative Colored Editorial Portrait */}
            <div className="lg:col-span-5 rounded-[28px] sm:rounded-[32px] overflow-hidden bg-gray-900 min-h-[440px] relative border border-black/5 shadow-md group cursor-pointer">
              <img
                src="/media/about_contact_creative_color.jpg"
                alt="IKOLI Consortium Leadership"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider block">
                  Consortium Director &bull; Field Operations
                </span>
                <h4 className="font-bold text-sm sm:text-base text-white">
                  RedAid Nigeria &amp; DAHW Partnership
                </h4>
                <p className="text-xs text-gray-300 font-light">
                  Directing 774 LGA surveillance, training CHEWs, and restoring patient dignity.
                </p>
              </div>
            </div>

          </div>

        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            8. SECTION: "CONNECT WITH IKOLI" HIGH-CONTRAST FOOTER BANNER (100% REPLICATION)
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="bg-[#0E0F11] rounded-[32px] sm:rounded-[36px] p-8 sm:p-14 text-white space-y-10 border border-white/10 shadow-2xl">
          
          {/* Top Links Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono tracking-widest text-gray-400 uppercase border-b border-white/10 pb-6">
            <div className="flex items-center gap-6">
              <a href="#biography" className="hover:text-white transition-colors cursor-pointer">BIOGRAPHY</a>
              <a href="#portfolio" className="hover:text-white transition-colors cursor-pointer">PORTFOLIO</a>
              <a href="#process" className="hover:text-white transition-colors cursor-pointer">WORK PROCESS</a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#0071E3] font-bold">IKOLI AI &bull; SOVEREIGN HEALTH</span>
            </div>
          </div>

          {/* Huge Centered Typography (Matching Russian Mockup 'СВЯЖИТЕСЬ СО МНОЙ' in Clean English) */}
          <div className="text-center py-4 sm:py-8 space-y-4">
            <span className="text-[10px] sm:text-[11px] font-mono text-[#0071E3] font-bold uppercase tracking-widest block">
              NATIONAL HEALTHCARE &bull; RESEARCH &bull; GLOBAL NTD ADVOCACY
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white uppercase select-none leading-none">
              CONNECT WITH IKOLI
            </h2>
          </div>

          {/* Bottom Action & Telemetry Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
            <div className="text-left text-xs font-mono text-gray-400">
              <span className="block text-white font-bold">clinical@ikoli.health &bull; Abuja &amp; Uzuakoli</span>
              <span className="block text-[11px] text-gray-500 pt-0.5">&copy; 2026 IKOLI Consortium &bull; RedAid Nigeria &bull; DAHW</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('dashboard')}
                className="bg-white hover:bg-gray-100 text-[#0E0F11] font-bold text-xs px-6 py-3 rounded-full shadow-md transition-all cursor-pointer active:scale-95"
              >
                Surveillance Console
              </button>
              <button
                onClick={() => onNavigate('api')}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-6 py-3 rounded-full border border-white/15 backdrop-blur-md transition-all cursor-pointer active:scale-95"
              >
                Developer APIs
              </button>
            </div>
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
