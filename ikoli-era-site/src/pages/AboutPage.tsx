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

  // ── Rich 4-Voice Choral Synthesizer (Ikoli Harcourt Whyte's "Atula Egwu") ───
  const toggleHymnAudio = async () => {
    if (isPlayingHymn) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6);
        setTimeout(() => {
          audioCtxRef.current?.close();
          audioCtxRef.current = null;
        }, 700);
      }
      setIsPlayingHymn(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        if (ctx.state === 'suspended') {
          await ctx.resume();
        }

        // Master Gain & Warm Vocal Formant EQ Filter
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.32, ctx.currentTime + 1.0);

        // Vocal Formant Resonator (creates a warm human choral acoustic texture)
        const formantFilter = ctx.createBiquadFilter();
        formantFilter.type = 'peaking';
        formantFilter.frequency.value = 850; // Warm chest vowel formant
        formantFilter.Q.value = 1.8;
        formantFilter.gain.value = 4.0;

        const airFilter = ctx.createBiquadFilter();
        airFilter.type = 'lowpass';
        airFilter.frequency.value = 4200; // Removes harsh digital highs

        masterGain.connect(formantFilter);
        formantFilter.connect(airFilter);
        airFilter.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Traditional Uzuakoli 4-Part Choral Stanzas (Bass, Tenor, Alto, Soprano)
        const choralStanzas = [
          [130.81, 261.63, 329.63, 523.25], // C Major Sacred ("A-tu-la")
          [174.61, 220.00, 349.23, 698.46], // F Major Solace ("E-gwu")
          [146.83, 293.66, 370.00, 587.33], // D Dominant Light
          [196.00, 246.94, 392.00, 783.99], // G Major Resolution ("Chukwu di nso")
        ];

        let stanzaIdx = 0;
        const playChoralChord = () => {
          if (!ctx || ctx.state === 'closed') return;
          const chord = choralStanzas[stanzaIdx % choralStanzas.length];
          stanzaIdx++;

          chord.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const voiceGain = ctx.createGain();

            // Blend sine and warm triangle for rich acoustic timbre
            osc.type = i === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);

            // Subtle choral vibrato LFO (4.8 Hz)
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            lfo.frequency.value = 4.8 + i * 0.3;
            lfoGain.gain.value = 1.2;
            lfo.connect(osc.frequency);
            lfo.start();
            lfo.stop(ctx.currentTime + 4.8);

            // Smooth dynamic swelling envelope
            voiceGain.gain.setValueAtTime(0.0001, ctx.currentTime);
            voiceGain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 1.2);
            voiceGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.6);

            osc.connect(voiceGain);
            voiceGain.connect(masterGain);

            osc.start();
            osc.stop(ctx.currentTime + 4.8);
          });
        };

        playChoralChord();
        timerRef.current = window.setInterval(playChoralChord, 3800);
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
            src="/media/about_hero_editorial.jpg"
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
            2. SECTION: "ABOUT IKOLI" (100% EXACT BLUEPRINT REPLICATION - FLUSH ZERO GAP, SQUARE CORNERS)
        ══════════════════════════════════════════════════════════════════════ */}
        <section id="biography" className="space-y-4 sm:space-y-6">
          
          {/* Header Row (Left: ABOUT IKOLI, Right: Uppercase Manifesto) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/8 pb-4">
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#1D1D1F] uppercase">
              ABOUT IKOLI
            </h2>
            <p className="max-w-md text-[11px] sm:text-xs font-mono font-medium tracking-wider text-gray-500 uppercase leading-relaxed text-left md:text-right">
              WE HONOR IKOLI HARCOURT WHYTE (1905–1977), WHOSE SACRED HYMNODY AND HUMANITARIAN VALOR TRANSFORMED LEPROSY EXILE INTO IMMORTAL HOPE &amp; DIGNITY.
            </p>
          </div>

          {/* Main Architectural Flush Grid (Zero Gap, Zero Rounded Corners, Zero Pills) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-black/10 shadow-sm items-stretch">
            
            {/* Left Area (Span 8): Unified Gray Box on Top + Flush Photo on Bottom */}
            <div className="lg:col-span-8 flex flex-col gap-0 border-b lg:border-b-0 lg:border-r border-black/10">
              
              {/* 1. Unified Medium-Gray Container (White Text + Vertical Divider + Sharp Corners) */}
              <div className="bg-[#8E9197] text-white p-6 sm:p-8 rounded-none">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/20 text-left">
                  
                  {/* Left Column: 1905 - 1932 */}
                  <div className="space-y-3 sm:pr-6">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-white/80 block">
                      1905 &ndash; 1932
                    </span>
                    <h3 className="font-display font-black text-sm sm:text-base uppercase tracking-tight text-white leading-snug">
                      ABONNEMA &amp; EARLY AWAKENING
                    </h3>
                    <p className="text-xs sm:text-[13px] text-white/90 font-mono uppercase tracking-wider leading-relaxed font-normal">
                      DIAGNOSED WITH LEPROSY AT AGE 14 IN 1919, IKOLI REFUSED RETREAT INTO DESPAIR.
                    </p>
                    <p className="text-xs sm:text-[13px] text-white/90 font-mono uppercase tracking-wider leading-relaxed font-normal pt-1">
                      PLAYING FLUTE AND BRASS, HE HARNESSED MUSIC AS A SACRED FORCE FOR HUMAN DIGNITY.
                    </p>
                  </div>

                  {/* Right Column: 1932 - 1977 */}
                  <div className="space-y-3 sm:pl-6 pt-4 sm:pt-0">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-white/80 block">
                      1932 &ndash; 1977
                    </span>
                    <p className="text-xs sm:text-[13px] text-white/90 font-mono uppercase tracking-wider leading-relaxed font-normal">
                      AT UZUAKOLI HOSPITAL, HE COMPOSED OVER 200 SACRED IGBO HYMNS PERFORMED ACAPPELLA.
                    </p>
                    <p className="text-xs sm:text-[13px] text-white/90 font-mono uppercase tracking-wider leading-relaxed font-normal pt-1">
                      HIS WORLD-RENOWNED CHOIR TOURED GLOBALLY, PROVING THE IMMORTAL INTELLECT OF PATIENTS DESPITE PHYSICAL EXILE.
                    </p>
                  </div>

                </div>
              </div>

              {/* 2. Bottom Wide Photographic Card (Flush, Zero Gap, Square Corners, Clean No Text) */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-none overflow-hidden bg-gray-900 group cursor-pointer border-t border-black/10">
                <img
                  src="/media/about_manuscript_wide.jpg"
                  alt="Harcourt Whyte Sacred Choral Manuscript"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                />
              </div>

            </div>

            {/* Right Area (Span 4): Tall Vertical Editorial Card (Flush, Zero Gap, Square Corners, Clean No Text) */}
            <div className="lg:col-span-4 relative rounded-none overflow-hidden bg-gray-900 group cursor-pointer min-h-[440px]">
              <img
                src="/media/about_tall_portrait.jpg"
                alt="Ikoli Living Succession"
                className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-700 ease-out"
              />
            </div>

          </div>

        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            3. SECTION: "THE IKOLI PORTFOLIO" (100% EXACT 8-CELL BLUEPRINT GRID)
        ══════════════════════════════════════════════════════════════════════ */}
        <section id="portfolio" className="space-y-6 sm:space-y-8">
          
          {/* Header Row (Left: Uppercase Statement, Right: Stacked Heading) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/8 pb-4">
            <p className="max-w-md text-[11px] sm:text-xs font-mono font-medium tracking-wider text-gray-500 uppercase leading-relaxed text-left">
              A LIVING REPOSITORY UNITING HISTORICAL SACRED HYMNODY, ZERO-PII NEURAL INFERENCE, AND CLINICAL DERMATOLOGY ACROSS NIGERIA.
            </p>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#1D1D1F] uppercase text-left md:text-right leading-[0.92]">
              THE IKOLI<br />PORTFOLIO
            </h2>
          </div>

          {/* 8-Cell Gallery Bento Grid (4 Columns x 2 Rows - 100% Flush Zero Gap, Editorial Color & B&W Balance) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-black/10 shadow-sm">
            
            {/* Cell 1: Clinical Examination Staging (Full Vibrant Color) */}
            <div
              onClick={() => onNavigate('diseases')}
              className="relative aspect-[3/4] rounded-none overflow-hidden bg-gray-900 group cursor-pointer border-b md:border-b border-r border-black/10"
            >
              <img
                src="/media/leprosy_clinical_exam.jpg"
                alt="Clinical Stage I Screening"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
              />
            </div>

            {/* Cell 2: Skin Lesion Differential Diagnostic (Monochrome B&W) */}
            <div
              onClick={() => onNavigate('diseases')}
              className="relative aspect-[3/4] rounded-none overflow-hidden bg-gray-900 group cursor-pointer border-b md:border-b border-r md:border-r border-black/10"
            >
              <img
                src="/media/home_pb_leprosy_hypopigmentation.jpg"
                alt="Hypopigmentation Examination"
                className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-106 transition-transform duration-500"
              />
            </div>

            {/* Cell 3: Clinical Leadership Study (Warm Sunlit Color) */}
            <div
              onClick={() => onNavigate('about')}
              className="relative aspect-[3/4] rounded-none overflow-hidden bg-gray-900 group cursor-pointer border-b md:border-b border-r border-black/10"
            >
              <img
                src="/media/about_contact_creative_color.jpg"
                alt="Clinical Leadership"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
              />
            </div>

            {/* Cell 4: Laboratory Microscopic Telemetry (Full Vibrant Glowing Color) */}
            <div
              onClick={() => onNavigate('dashboard')}
              className="relative aspect-[3/4] rounded-none overflow-hidden bg-gray-900 group cursor-pointer border-b md:border-b border-black/10"
            >
              <img
                src="/media/submenu_sentinel_lab.jpg"
                alt="Microscopy Telemetry"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
              />
            </div>

            {/* Cell 5: Sensory Nerve Trunk Examination (Monochrome B&W) */}
            <div
              onClick={() => onNavigate('diseases')}
              className="relative aspect-[3/4] rounded-none overflow-hidden bg-gray-900 group cursor-pointer border-b md:border-b-0 border-r border-black/10"
            >
              <img
                src="/media/home_mb_leprosy_nerve_mapping.jpg"
                alt="Peroneal Nerve Exam"
                className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-106 transition-transform duration-500"
              />
            </div>

            {/* Cell 6: Patient Dignity & Human Sanctuary (Lush Tropical Garden Color) */}
            <div
              onClick={() => onNavigate('about')}
              className="relative aspect-[3/4] rounded-none overflow-hidden bg-gray-900 group cursor-pointer border-b md:border-b-0 border-r border-black/10"
            >
              <img
                src="/media/submenu_patient_dignity.jpg"
                alt="Patient Dignity & Recovery"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
              />
            </div>

            {/* Cell 7: SPECIAL INTERACTIVE AUDIO CARD (100% Matching Screenshot Widget) */}
            <div
              onClick={toggleHymnAudio}
              className="relative aspect-[3/4] rounded-none bg-[#ECECED] flex flex-col items-center justify-between p-5 text-center cursor-pointer group hover:bg-[#E2E2E5] transition-all border-b md:border-b-0 border-r border-black/10"
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
                {isPlayingHymn ? 'PLAYING AUDIO' : 'CLICK TO PLAY'}
              </span>
            </div>

            {/* Cell 8: Consortium Research Charter (Full Warm Lab Color) */}
            <div
              onClick={() => onNavigate('about')}
              className="relative aspect-[3/4] rounded-none overflow-hidden bg-gray-900 group cursor-pointer"
            >
              <img
                src="/media/female_researcher_journal.jpg"
                alt="Consortium Research Charter"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
              />
            </div>

          </div>

        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            4. SECTION: "ЭТАПЫ РАБОТЫ" / "WORK PROCESS & CLINICAL PIPELINE" (100% REPLICATION)
        ══════════════════════════════════════════════════════════════════════ */}
        {/* ══════════════════════════════════════════════════════════════════════
            4. SECTION: "LIFE & LEGACY • IKOLI HARCOURT WHYTE" (4-STAGE BIOGRAPHICAL ODYSSEY)
        ══════════════════════════════════════════════════════════════════════ */}
        <section id="process" className="space-y-6 sm:space-y-8 pt-4">
          
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-black/8 pb-4">
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#1D1D1F] uppercase">
              LIFE &amp; LEGACY &bull; IKOLI HARCOURT WHYTE
            </h2>
            <span className="text-xs font-mono text-gray-400 font-semibold tracking-wider uppercase">
              4-STAGE ODYSSEY OF RESILIENCE, SACRED HYMNODY &amp; HUMAN DIGNITY
            </span>
          </div>

          {/* 4 Clean Numbered Horizontal Rows detailing Ikoli Harcourt Whyte's Life & Mission */}
          <div className="divide-y divide-black/10 border-y border-black/10">
            {[
              {
                step: '01',
                title: '1919: DIAGNOSIS, EXILE & AWAKENING',
                desc: 'Born in Abonnema, Rivers State, young Ikoli was diagnosed with leprosy at age 14 in 1919. Ostracized by society and forced out of school, he refused despair, holding onto brass band melodies and unyielding faith in human dignity.',
              },
              {
                step: '02',
                title: '1932: UZUAKOLI SETTLEMENT & DR. DAVEY',
                desc: 'Transferred to Uzuakoli Leprosy Hospital in Abia State in 1932, he met medical superintendent Dr. Thomas Frank Davey. Dr. Davey recognized his musical genius, mentoring him in Western harmony while recording traditional Igbo music together on field journeys.',
              },
              {
                step: '03',
                title: '1932–1949: 600+ SACRED HYMNS & PATIENT CHOIR',
                desc: 'Painstakingly writing tonic sol-fa notations using the stubs of his bandaged fingers, Whyte composed over 600 sacred Igbo hymns. He founded the world-renowned Uzuakoli Patient Choir, touring nationally and transforming social stigma into profound reverence.',
              },
              {
                step: '04',
                title: '1949–1977: CURED YET CHOOSING TO STAY',
                desc: 'Clinically cured in 1949 through early dapsone trials, Harcourt Whyte made the sacred choice to remain at Uzuakoli for life. His anthem "Atula Egwu" (Never Fear) comforted a nation during civil war, inspiring Ola Rotimi\'s Hopes of the Living Dead and world music heritage.',
              },
            ].map((stage) => (
              <div
                key={stage.step}
                className="py-6 sm:py-8 flex flex-col sm:flex-row sm:items-start justify-between gap-6 hover:bg-black/[0.015] px-2 rounded-none transition-colors group cursor-default"
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

          {/* ══════════════════════════════════════════════════════════════════════
              5. 4-CARD EDITORIAL REEL (HARCOURT WHYTE HISTORICAL PILLARS)
          ══════════════════════════════════════════════════════════════════════ */}
          <div className="pt-4 sm:pt-6 space-y-6">
            
            {/* 4 Cards in a Row - 100% Flush Zero Gap, Captions Directly Underneath */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-black/10 shadow-sm">
              
              {/* Card 1: Abonnema Roots (1905) */}
              <div className="border-r border-b md:border-b-0 border-black/10 group cursor-pointer flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
                  <img
                    src="/media/submenu_patient_dignity.jpg"
                    alt="Abonnema Roots & Early Life"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="py-3 px-2 bg-white text-center border-t border-black/10">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-gray-600 uppercase block group-hover:text-[#0071E3] transition-colors">
                    ABONNEMA &bull; 1905
                  </span>
                </div>
              </div>

              {/* Card 2: Uzuakoli Sanctuary (1932) */}
              <div className="border-r border-b md:border-b-0 border-black/10 group cursor-pointer flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
                  <img
                    src="/media/about_hero_editorial.jpg"
                    alt="Uzuakoli Sanctuary & Dr. Davey Mentorship"
                    className="w-full h-full object-cover filter grayscale contrast-110 group-hover:scale-104 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="py-3 px-2 bg-white text-center border-t border-black/10">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-gray-600 uppercase block group-hover:text-[#0071E3] transition-colors">
                    UZUAKOLI &bull; 1932
                  </span>
                </div>
              </div>

              {/* Card 3: Sacred Tonic Sol-Fa */}
              <div className="border-r border-black/10 group cursor-pointer flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
                  <img
                    src="/media/about_manuscript_wide.jpg"
                    alt="600+ Sacred Hymns Tonic Sol-Fa"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="py-3 px-2 bg-white text-center border-t border-black/10">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-gray-600 uppercase block group-hover:text-[#0071E3] transition-colors">
                    600+ SACRED HYMNS
                  </span>
                </div>
              </div>

              {/* Card 4: Immortal Legacy */}
              <div className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
                  <img
                    src="/media/about_tall_portrait.jpg"
                    alt="Immortal Legacy & Atula Egwu"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="py-3 px-2 bg-white text-center border-t border-black/10">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-gray-600 uppercase block group-hover:text-[#0071E3] transition-colors">
                    ATULA EGWU &bull; LEGACY
                  </span>
                </div>
              </div>

            </div>

            {/* Sub-Header Banner underneath the 4 cards (@IKOLICONSORTIUM & Manifesto) */}
            <div className="pt-6 sm:pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-black/8">
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

          </div>

        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            5. SECTION: "MASSIVE ULTRA-WIDE PANORAMIC CINEMATIC B&W BANNER" (100% FULL-BLEED EDGE-TO-EDGE)
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
          <div className="w-full relative rounded-none overflow-hidden bg-[#18191C] border-y border-black/10 shadow-2xl aspect-[16/7] sm:aspect-[21/8] lg:aspect-[24/8] group cursor-pointer">
            {/* Cinematic High-Contrast B&W Panoramic Photograph */}
            <img
              src="/media/about_panoramic_banner.jpg"
              alt="IKOLI Sovereign Clinical AI Consortium"
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-95 group-hover:scale-103 transition-transform duration-1000 ease-out"
            />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            6. SECTION: "CONTACTS / WANT TO COLLABORATE WITH IKOLI AI?" (100% REPLICATION)
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6 sm:space-y-8 pt-4">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-black/8 pb-4">
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#1D1D1F] uppercase">
              CONTACTS
            </h2>
            <span className="text-xs font-mono text-gray-400 font-semibold tracking-wider uppercase">
              DIRECT CONSORTIUM SECRETARIAT &amp; PARTNERSHIP CHANNELS
            </span>
          </div>

          {/* 2-Column Split Bento Card (Zero Rounded Radiuses) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-black/10 items-stretch shadow-sm">
            
            {/* Left Area (Span 7 or 8): Top Gray Box + Bottom Info Strip + Form */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between space-y-6 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-black/10 bg-white">
              
              {/* Top Gray Card */}
              <div className="bg-[#8E9197] p-6 sm:p-8 text-white rounded-none space-y-3">
                <h3 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-white tracking-tight uppercase leading-tight">
                  WANT TO COLLABORATE<br />WITH IKOLI AI?
                </h3>
                <p className="text-xs sm:text-[13px] text-white/90 font-mono uppercase tracking-wider leading-relaxed max-w-lg">
                  OPEN FOR HEALTHCARE SYSTEMS, STATE MINISTRIES OF HEALTH, RESEARCH INSTITUTES &amp; GLOBAL NTD ELIMINATION PARTNERS.
                </p>
              </div>

              {/* Inquiry Email Form (Sharp Rectangular) */}
              <form onSubmit={handleInquirySubmit} className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="Enter institutional email (e.g. info@health.gov.ng)"
                    className="w-full bg-[#F5F5F7] border border-black/15 rounded-none px-4 py-3 text-xs text-[#1D1D1F] placeholder-gray-400 focus:outline-none focus:border-[#0071E3]"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto shrink-0 bg-[#1D1D1F] hover:bg-black active:scale-98 text-white font-bold text-xs px-6 py-3 rounded-none flex items-center justify-center gap-2 transition-all cursor-pointer"
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

            </div>

            {/* Right Area (Span 5 or 4): Tall Creative Colored Editorial Portrait (Clean No Text) */}
            <div className="lg:col-span-5 xl:col-span-4 rounded-none overflow-hidden bg-gray-900 min-h-[440px] relative group cursor-pointer">
              <img
                src="/media/about_contact_creative_color.jpg"
                alt="IKOLI Consortium Leadership"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
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
