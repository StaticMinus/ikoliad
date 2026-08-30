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
  Music,
  Volume2,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'dashboard' | 'diseases' | 'ask' | 'about' | 'styles' | 'api') => void;
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
    <div className="w-full bg-[#FFFFFF] text-[#1D1D1F] min-h-screen font-sans selection:bg-[#0071E3] selection:text-white pb-16">
      
      {/* ── Fixed Universal Floating Navbar ──────────────────────────────── */}
      <Navbar currentPage="about" onNavigate={onNavigate} />

      {/* ══════════════════════════════════════════════════════════════════════
          1. DARK EDITORIAL CINEMATIC HERO (Matching Alina Kovaleva Hero)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#0E0F11] text-white pt-32 sm:pt-36 pb-16 sm:pb-20 relative overflow-hidden select-none border-b border-white/10">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0071E3]/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Main Hero Photographic Card */}
          <div className="relative rounded-[36px] overflow-hidden bg-[#16171A] border border-white/10 shadow-2xl min-h-[540px] sm:min-h-[660px] flex items-center justify-center">
            
            {/* High-Contrast Archival Portrait */}
            <img
              src="/media/community-elder-portrait.jpg"
              alt="Ikoli Harcourt Whyte (1905–1977)"
              className="absolute inset-0 w-full h-full object-cover object-top filter grayscale contrast-125 opacity-85"
            />
            
            {/* Vignette & Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-black/75" />

            {/* Top Left Quote Manifesto (Matching Attached Screenshot) */}
            <div className="absolute top-8 sm:top-12 left-6 sm:left-12 z-20 max-w-sm text-left">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#0071E3] font-bold block mb-1">
                Historical Inspiration &bull; 1905–1977
              </span>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                "I want every hymn and every clinical discovery to bring dignified life and zero suffering to our people."
              </p>
              <span className="text-[10px] font-serif italic text-gray-400 block mt-1">
                — Ikoli Harcourt Whyte
              </span>
            </div>

            {/* Center Dynamic Choral Audio / Narrative Play Pill */}
            <div className="relative z-30 flex flex-col items-center gap-3">
              <button
                onClick={toggleHymnAudio}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full backdrop-blur-xl border flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer active:scale-95 ${
                  isPlayingHymn
                    ? 'bg-[#0071E3] text-white border-[#0071E3] scale-105'
                    : 'bg-white/20 hover:bg-white/30 text-white border-white/30'
                }`}
                title="Play Choral Hymnody of Ikoli Harcourt Whyte"
              >
                {isPlayingHymn ? (
                  <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-current text-white" />
                ) : (
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current translate-x-0.5 text-white" />
                )}
              </button>
              
              <div className="flex items-center gap-2 bg-black/50 px-3.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
                <Music className="w-3.5 h-3.5 text-[#0071E3]" />
                <span className="text-[11px] font-mono tracking-wider uppercase text-white/90 font-bold">
                  {isPlayingHymn ? 'Playing "Atula Egwu" Suite' : 'Play Choral Hymns'}
                </span>
              </div>
            </div>

            {/* Right Large Bold Condensed Typography (Matching Attached Screenshot) */}
            <div className="absolute bottom-8 sm:bottom-12 right-6 sm:right-12 z-20 text-right">
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#0071E3] uppercase block mb-1">
                Father of Igbo Church Music
              </span>
              <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-white leading-none">
                IKOLI<br />
                <span className="text-gray-300">HARCOURT WHYTE</span>
              </h1>
            </div>

          </div>

        </div>

      </section>

      {/* ── Main Editorial Content Wrapper ───────────────────────────────── */}
      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28 pt-16 sm:pt-24 text-left">
        
        {/* ══════════════════════════════════════════════════════════════════════
            2. SECTION: "ABOUT IKOLI / ОБО МНЕ" (Editorial Split Bento Grid)
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-black/5 pb-4">
            <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-[#1D1D1F] uppercase">
              ABOUT IKOLI HARCOURT WHYTE &bull; ОБО МНЕ
            </h2>
            <span className="text-xs font-mono text-gray-400 font-semibold tracking-wider">
              Wikipedia Standard &bull; Historical Biography
            </span>
          </div>

          {/* 3-Column Bento Grid Matching Attached Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Box: Gray Card with Biographical Overview (Span 4) */}
            <div className="lg:col-span-4 bg-[#F5F5F7] rounded-[28px] p-6 sm:p-8 flex flex-col justify-between border border-black/5 space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0071E3] block">
                  Biographical Record
                </span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-[#1D1D1F] leading-snug">
                  From Leprosy Stigma to Transcendent Musical Immortality.
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  Ikoli Harcourt Whyte was a seminal Nigerian composer and humanitarian. Stricken with leprosy at age 14 in 1919, he turned the physical suffering of illness into a fountain of over 200 sacred Igbo choral anthems at the Uzuakoli Leprosy Hospital, creating a legacy that echoes globally.
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 space-y-2 text-xs font-mono text-gray-500">
                <div className="flex justify-between">
                  <span className="text-gray-400">Born:</span>
                  <span className="font-bold text-[#1D1D1F]">1905, Abonnema, Nigeria</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Resting:</span>
                  <span className="font-bold text-[#1D1D1F]">1977, Uzuakoli, Nigeria</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Works:</span>
                  <span className="font-bold text-[#0071E3]">200+ Sacred Hymns</span>
                </div>
              </div>
            </div>

            {/* Center Box: 2-Stack Container (Tenets + Photographic Close-up) (Span 4) */}
            <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
              
              {/* Center Top: Values & Philosophy */}
              <div className="bg-[#F5F5F7] rounded-[28px] p-6 sm:p-7 border border-black/5 space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 block">
                  Musical &amp; Humanitarian Philosophy
                </span>
                <ul className="space-y-2.5 text-xs text-gray-600 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] mt-1.5 shrink-0" />
                    <span><strong>A Cappella Choral Purity:</strong> Insisted on zero instrumentation so the spiritual lyricism reigned supreme.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] mt-1.5 shrink-0" />
                    <span><strong>De-Stigmatization Through Song:</strong> Proved to the world that leprosy patients possessed profound intellectual dignity.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] mt-1.5 shrink-0" />
                    <span><strong>Voluntary Lifelong Service:</strong> Chose to stay at Uzuakoli even after his clinical cure in 1949.</span>
                  </li>
                </ul>
              </div>

              {/* Center Bottom: Archival Photo Square */}
              <div className="relative rounded-[28px] overflow-hidden aspect-[4/3] bg-gray-200 border border-black/5 shadow-xs">
                <img
                  src="/media/female_researcher_journal.jpg"
                  alt="Archival Choral Manuscript Study"
                  className="w-full h-full object-cover filter grayscale contrast-115 hover:scale-105 transition-transform duration-500"
                />
              </div>

            </div>

            {/* Right Box: Tall Vertical Photographic Card (Span 4) */}
            <div className="lg:col-span-4 rounded-[28px] overflow-hidden relative min-h-[420px] bg-[#16171A] border border-black/5 shadow-xs group">
              <img
                src="/media/lead_clinician_hero.jpg"
                alt="Clinical Leadership Continuing Harcourt Whyte's Mission"
                className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-105 group-hover:filter-none transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-mono text-[#0071E3] font-bold uppercase tracking-wider block">
                  The Living Succession
                </span>
                <h4 className="font-bold text-base text-white">
                  From Uzuakoli Choir to National Clinical AI
                </h4>
                <p className="text-xs text-gray-300 font-light">
                  Transforming his message of hope into Nigeria's autonomous Skin NTD diagnostic network.
                </p>
              </div>
            </div>

          </div>

        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            3. SECTION: "HISTORICAL WORKS & ARCHIVE / МОЕ ПОРТФОЛИО"
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-black/5 pb-4">
            <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-[#1D1D1F] uppercase">
              HISTORICAL ARCHIVE &amp; HYMNODY &bull; МОЕ ПОРТФОЛИО
            </h2>
            <span className="text-xs font-mono text-gray-400 font-semibold tracking-wider">
              06 Historical Milestones
            </span>
          </div>

          {/* 7-Card Asymmetric Mosaic Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Card 1: Uzuakoli Sanctuary */}
            <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-gray-200 border border-black/5 group cursor-pointer shadow-xs">
              <img
                src="/media/sensory-mapping-consult.jpg"
                alt="Uzuakoli Leprosy Hospital"
                className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-105 group-hover:filter-none transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#0071E3] font-bold block">1932 Sanctuary</span>
                <span className="font-bold text-xs sm:text-sm leading-tight block">Uzuakoli Leprosy Centre</span>
              </div>
            </div>

            {/* Card 2: 200+ Igbo Hymns */}
            <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-gray-200 border border-black/5 group cursor-pointer shadow-xs">
              <img
                src="/media/medical_journal_thumb.jpg"
                alt="Sacred Igbo Hymnody Scores"
                className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-105 group-hover:filter-none transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">Choral Opus</span>
                <span className="font-bold text-xs sm:text-sm leading-tight block">200+ Sacred Hymns</span>
              </div>
            </div>

            {/* Card 3: The Uzuakoli Choir */}
            <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-gray-200 border border-black/5 group cursor-pointer shadow-xs">
              <img
                src="/media/reference-team.jpg"
                alt="The Historic Uzuakoli Choir"
                className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-105 group-hover:filter-none transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 font-bold block">Acappella Voice</span>
                <span className="font-bold text-xs sm:text-sm leading-tight block">The Uzuakoli Choir</span>
              </div>
            </div>

            {/* Card 4: Dapsone Clinical Cure */}
            <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-gray-200 border border-black/5 group cursor-pointer shadow-xs">
              <img
                src="/media/microscope_detail_thumb.jpg"
                alt="1949 Dapsone Clinical Cure"
                className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-105 group-hover:filter-none transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 font-bold block">1949 Breakthrough</span>
                <span className="font-bold text-xs sm:text-sm leading-tight block">Clinical Cure With Dapsone</span>
              </div>
            </div>

            {/* Card 5: Dr. T.F. Davey Mentorship */}
            <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-gray-200 border border-black/5 group cursor-pointer shadow-xs">
              <img
                src="/media/leprosy_clinical_exam.jpg"
                alt="Dr. T.F. Davey & Clinical Trials"
                className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-105 group-hover:filter-none transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#0071E3] font-bold block">Mentorship</span>
                <span className="font-bold text-xs sm:text-sm leading-tight block">Dr. T.F. Davey &amp; Lepra</span>
              </div>
            </div>

            {/* Center Capsule Card: Interactive Choral Suite Trigger */}
            <div
              onClick={toggleHymnAudio}
              className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-[#18191C] border border-black/10 flex flex-col items-center justify-center p-6 text-center text-white cursor-pointer group hover:bg-[#222428] transition-all shadow-md"
            >
              <div className="w-14 h-14 rounded-full bg-white/10 group-hover:bg-[#0071E3] text-white flex items-center justify-center transition-colors mb-3">
                <Volume2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-gray-400 group-hover:text-white block">
                МОИ РАБОТЫ
              </span>
              <span className="font-bold text-sm text-white block mt-1">
                {isPlayingHymn ? 'Stop Choral Audio' : 'Play "Atula Egwu"'}
              </span>
            </div>

            {/* Card 7: Living Inspiration (Wide Banner) */}
            <div
              onClick={() => onNavigate('dashboard')}
              className="col-span-2 relative aspect-[2/1] rounded-[24px] overflow-hidden bg-gray-200 border border-black/5 group cursor-pointer shadow-xs"
            >
              <img
                src="/media/dashboard-sentinel.jpg"
                alt="IKOLI AI Sovereign Platform"
                className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-105 group-hover:filter-none transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-6 right-6 text-white flex items-end justify-between">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#0071E3] font-bold block">2026 Sovereign AI</span>
                  <span className="font-bold text-sm sm:text-base leading-tight block">IKOLI AI &bull; National Surveillance Network</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

          </div>

        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            4. SECTION: "CHRONOLOGY & MILESTONES / ЭТАПЫ РАБОТЫ"
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-black/5 pb-4">
            <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-[#1D1D1F] uppercase">
              LIFE CHRONOLOGY &bull; ЭТАПЫ РАБОТЫ
            </h2>
            <span className="text-xs font-mono text-gray-400 font-semibold tracking-wider">
              1905 &ndash; 2026 Historical Arc
            </span>
          </div>

          {/* 4 Numbered Horizontal Rows (Matching Attached Screenshot) */}
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
            5. SECTION: "4-IMAGE HISTORICAL GALLERY / ФОТОГРАФИИ"
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
            6. SECTION: "PANORAMIC BANNER / @IKOLI_HARCOURT_WHYTE"
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          
          <div className="flex items-center justify-between">
            <h3 className="font-display font-black text-xl sm:text-2xl text-[#1D1D1F] tracking-tight uppercase">
              @IKOLI_WHYTE &bull; SACRED CHORAL HERITAGE
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
            7. SECTION: "LEGACY & CONSORTIUM CONTACT / КОНТАКТЫ"
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-black/5 pb-4">
            <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-[#1D1D1F] uppercase">
              LEGACY &amp; DEPLOYMENT &bull; КОНТАКТЫ
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

      </main>

      {/* ══════════════════════════════════════════════════════════════════════
          8. SECTION: BOTTOM HIGH-CONTRAST BAR (СВЯЖИТЕСЬ СО МНОЙ)
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-[#0E0F11] rounded-[32px] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0071E3] text-white flex items-center justify-center font-black">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="font-display font-bold text-base sm:text-lg text-white">
                IKOLI HARCOURT WHYTE HERITAGE &bull; СВЯЖИТЕСЬ СО МНОЙ
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
        </div>

        {/* Universal Footer */}
        <div className="mt-12">
          <Footer onNavigate={onNavigate} />
        </div>
      </div>

    </div>
  );
};
