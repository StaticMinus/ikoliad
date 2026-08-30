import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Activity,
  Cpu,
  Globe2,
  Lock,
  Boxes,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StoryChapter {
  id: 'telemetry' | 'vision' | 'guidelines' | 'privacy' | 'supply';
  label: string;
  badge: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  detail: string;
  stat1: { value: string; label: string };
  stat2: { value: string; label: string };
  image: string;
  imageAlt: string;
  imageBadge: string;
  ctaText: string;
  targetPage?: 'home' | 'dashboard' | 'diseases' | 'ask' | 'about' | 'api' | 'protocols';
}

const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'telemetry',
    label: 'News & Field Telemetry',
    badge: 'Real-Time Surveillance',
    icon: Activity,
    title: 'Autonomous Field Telemetry across 312 Primary Sentinel Nodes.',
    subtitle: 'Connecting rural LGA health officers to reference laboratories in real-time.',
    detail: 'Continuous synchronization aggregates verified skin lesion reports, voluntary muscle testing logs, and PCR confirmation batches from 312 primary healthcare facilities across South-East Nigeria.',
    stat1: { value: '312 Sites', label: '100% Active Sync' },
    stat2: { value: '4.8 Days', label: 'Avg PCR Turnaround' },
    image: '/media/field-screening-action.jpg',
    imageAlt: 'Field healthcare screening action in Nigerian primary clinic',
    imageBadge: 'SENTINEL TELEMETRY NODE',
    ctaText: 'Explore Field Telemetry',
    targetPage: 'dashboard',
  },
  {
    id: 'vision',
    label: 'Neural Vision Technology',
    badge: 'Clinical Edge AI',
    icon: Cpu,
    title: 'Zero-Latency Computer Vision for Sub-millimeter Lesion Staging.',
    subtitle: 'High-precision diagnostic assistance for early hypopigmentation and necrosis.',
    detail: 'Multi-spectral edge neural models evaluate clinical images locally without sending private patient photography to cloud servers, detecting early paucibacillary hypopigmentation before irreversible nerve damage occurs.',
    stat1: { value: '94.2%', label: 'Diagnostic Concordance' },
    stat2: { value: '< 120ms', label: 'On-Device Inference' },
    image: '/media/liquid_glass_spheres_3d.jpg',
    imageAlt: 'Liquid glass neural optical spheres',
    imageBadge: 'NEURAL OPTICAL PIPELINE',
    ctaText: 'Launch Vision AI',
    targetPage: 'ask',
  },
  {
    id: 'guidelines',
    label: 'National Clinical Protocols',
    badge: 'FMOH & NTBLCP Guidelines',
    icon: Globe2,
    title: 'Standardized clinical protocols for zero physical disability across Nigeria.',
    subtitle: 'Universal curative therapy access and proactive nerve deformity prevention.',
    detail: 'Aligning Nigerian frontline screening workflows with National Tuberculosis, Buruli Ulcer and Leprosy Control Programme (NTBLCP) protocols: interrupting leprosy transmission, reducing Grade-2 disability below 4.8%, and expanding PCR confirmation for Buruli ulcer.',
    stat1: { value: '< 4.8%', label: 'G2D Target Benchmark' },
    stat2: { value: '89.2%', label: 'MDT Completion Rate' },
    image: '/media/who_clinical_guide_cover.jpg',
    imageAlt: 'National Clinical NTD Guidelines',
    imageBadge: 'NATIONAL NTBLCP PROTOCOLS',
    ctaText: 'Explore National Protocols',
    targetPage: 'protocols',
  },
  {
    id: 'privacy',
    label: 'Patient Privacy & Zero-PII',
    badge: 'NDPA 2023 Statutory',
    icon: Lock,
    title: 'Non-Negotiable Human Dignity & Cryptographic Data Vault.',
    subtitle: 'Zero facial biometrics or personal identity stored on remote servers.',
    detail: 'Patient dignity is non-negotiable. Ephemeral edge processing converts clinical staging telemetry into salted cryptographic hashes (SHA-256 HMAC) before epidemiological aggregation, ensuring zero personal identifiers are ever stored.',
    stat1: { value: 'Zero-PII', label: 'Cryptographic Standard' },
    stat2: { value: 'SHA-256', label: 'HMAC Data Hashing' },
    image: '/media/female_researcher_journal.jpg',
    imageAlt: 'Medical researcher documenting patient privacy charter',
    imageBadge: 'ENCRYPTED DATA VAULT',
    ctaText: 'Review Privacy Charter',
    targetPage: 'about',
  },
  {
    id: 'supply',
    label: 'MDT Supply Chain',
    badge: 'Logistics & Buffer',
    icon: Boxes,
    title: 'Sovereign Pharmaceutical Buffer & Stock Reconciliation.',
    subtitle: 'Preventing treatment interruptions through automated blister pack allocation.',
    detail: 'Continuous digital monitoring of WHO PB & MB blister packs and oral Rifampicin + Clarithromycin courses prevents stock-outs across all zonal depots, ensuring every diagnosed patient completes full curative therapy.',
    stat1: { value: '98.6%', label: 'Stock Availability' },
    stat2: { value: '5 Pilot States', label: 'Buffer Sync Active' },
    image: '/media/tablet-diagnostics.jpg',
    imageAlt: 'Digital tablet diagnostic and medication inventory management',
    imageBadge: 'PHARMACEUTICAL BUFFER',
    ctaText: 'Check Supply Telemetry',
    targetPage: 'dashboard',
  },
];

interface StoryScrollTriggerSectionProps {
  onNavigate?: (page: 'home' | 'dashboard' | 'diseases' | 'ask' | 'about' | 'styles' | 'api' | 'protocols') => void;
  onOpenModal?: (diseaseId: string) => void;
}

export const StoryScrollTriggerSection: React.FC<StoryScrollTriggerSectionProps> = ({
  onNavigate,
  onOpenModal,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  const sectionWrapperRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  const currentChapter = STORY_CHAPTERS[activeIndex];

  // ── GSAP ScrollTrigger Pinning & Scrubbing Setup ────────────────────────
  useEffect(() => {
    const section = sectionWrapperRef.current;
    const pinBox = pinContainerRef.current;
    if (!section || !pinBox) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top+=80',
        end: '+=1800',
        pin: pinBox,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const chapterIdx = Math.min(
            STORY_CHAPTERS.length - 1,
            Math.floor(progress * STORY_CHAPTERS.length)
          );
          setActiveIndex(chapterIdx);
        },
      });
    }, sectionWrapperRef);

    return () => ctx.revert();
  }, []);

  // ── Autoplay Cycle ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STORY_CHAPTERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // ── Ethereal Choral Audio Ambience ───────────────────────────────────────
  const toggleAudio = () => {
    if (isAudioPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1);
        setTimeout(() => {
          audioCtxRef.current?.close();
          audioCtxRef.current = null;
        }, 1100);
      }
      setIsAudioPlaying(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 2.5);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        const freqs = [220.0, 293.66, 369.99, 440.0, 587.33, 659.25, 493.88];
        
        const playChoralChord = () => {
          if (!ctx || ctx.state === 'closed') return;
          
          [0, 1].forEach((offset) => {
            const osc = ctx.createOscillator();
            const noteGain = ctx.createGain();
            const f = freqs[(Math.floor(Math.random() * freqs.length) + offset) % freqs.length];
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, ctx.currentTime);

            noteGain.gain.setValueAtTime(0.0001, ctx.currentTime);
            noteGain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 2);
            noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 6.5);

            osc.connect(noteGain);
            noteGain.connect(masterGain);

            osc.start();
            osc.stop(ctx.currentTime + 7.0);
          });
        };

        playChoralChord();
        intervalRef.current = window.setInterval(playChoralChord, 3600);
        setIsAudioPlaying(true);
      } catch (err) {
        console.warn('AudioContext not supported', err);
      }
    }
  };

  const nextChapter = () => {
    setActiveIndex((prev) => (prev < STORY_CHAPTERS.length - 1 ? prev + 1 : 0));
  };

  const prevChapter = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : STORY_CHAPTERS.length - 1));
  };

  return (
    <div ref={sectionWrapperRef} className="w-full pt-8 pb-12 text-left select-none relative">
      <div ref={pinContainerRef} className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ══════════════════════════════════════════════════════════════════════
              LEFT COLUMN: APPLE CLEAN STORY CONSOLE
          ══════════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 bg-white rounded-[32px] p-6 sm:p-8 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-black/5 relative overflow-hidden min-h-[500px]">
            
            {/* Top Header & Segmented Chapter Tabs */}
            <div className="space-y-5 relative z-10">
              
              {/* Top Bar: Chapter Pill + Choral Ambience Pill */}
              <div className="flex items-center justify-between border-b border-black/5 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0071E3] bg-[#0071E3]/10 px-3 py-1 rounded-full border border-[#0071E3]/20">
                    Scroll Story • 0{activeIndex + 1} / 0{STORY_CHAPTERS.length}
                  </span>
                </div>

                {/* Choral Audio Ambient Pill */}
                <button
                  onClick={toggleAudio}
                  title="Play Ikoli Choral Ambience"
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer border ${
                    isAudioPlaying
                      ? 'bg-[#0071E3] text-white border-[#0071E3] shadow-xs'
                      : 'bg-[#F5F5F7] hover:bg-[#EBEBEF] text-gray-600 border-black/5'
                  }`}
                >
                  {isAudioPlaying ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-white" />
                      <span>Soundscape ON</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Choral Ambient</span>
                    </>
                  )}
                </button>
              </div>

              {/* 5 Apple Segmented Chapter Tabs */}
              <div className="grid grid-cols-1 gap-1 text-xs font-mono">
                {STORY_CHAPTERS.map((chapter, idx) => {
                  const isActive = activeIndex === idx;
                  const Icon = chapter.icon;

                  return (
                    <button
                      key={chapter.id}
                      onClick={() => setActiveIndex(idx)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#F5F5F7] text-[#1D1D1F] font-bold border border-black/5 shadow-xs'
                          : 'text-gray-500 hover:text-[#1D1D1F] hover:bg-black/[0.02] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {isActive ? (
                          <span className="w-2 h-2 rounded-full bg-[#0071E3] shadow-[0_0_8px_#0071E3]" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-black/15" />
                        )}
                        <span className="text-[11px] sm:text-xs">{chapter.label}</span>
                      </div>

                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#0071E3]' : 'text-gray-400'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Active Chapter Narrative Content with Spring Animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentChapter.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-3.5 pt-1 border-t border-black/5"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#0071E3] uppercase tracking-wider block mb-1">
                      {currentChapter.badge}
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1D1D1F] tracking-tight leading-snug">
                      {currentChapter.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed">
                    {currentChapter.detail}
                  </p>

                  {/* 2 Apple Cloud Gray Metric Tiles */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-[#F5F5F7] rounded-2xl p-3 border border-black/5">
                      <span className="text-base sm:text-lg font-bold text-[#1D1D1F] block">
                        {currentChapter.stat1.value}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400 font-medium">
                        {currentChapter.stat1.label}
                      </span>
                    </div>

                    <div className="bg-[#F5F5F7] rounded-2xl p-3 border border-black/5">
                      <span className="text-base sm:text-lg font-bold text-[#0071E3] block">
                        {currentChapter.stat2.value}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400 font-medium">
                        {currentChapter.stat2.label}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Bottom Controls: Primary CTA + Stepper Arrows */}
            <div className="pt-6 relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-black/5 mt-4">
              
              <button
                onClick={() => {
                  if (currentChapter.targetPage) {
                    onNavigate?.(currentChapter.targetPage);
                  } else {
                    onOpenModal?.('leprosy-pb');
                  }
                }}
                className="bg-[#0071E3] hover:bg-[#0077ED] active:scale-95 text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-all cursor-pointer group shadow-sm"
              >
                <span>{currentChapter.ctaText}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Steppers & Auto Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-bold transition-colors cursor-pointer border ${
                    isAutoPlaying
                      ? 'bg-[#1D1D1F] text-white border-[#1D1D1F]'
                      : 'bg-[#F5F5F7] text-gray-500 border-black/5 hover:text-[#1D1D1F]'
                  }`}
                >
                  {isAutoPlaying ? 'Auto: ON' : 'Auto: OFF'}
                </button>

                <button
                  onClick={prevChapter}
                  className="w-8 h-8 rounded-full bg-[#F5F5F7] hover:bg-[#EBEBEF] text-[#1D1D1F] flex items-center justify-center transition-colors cursor-pointer border border-black/5"
                  title="Previous Chapter"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={nextChapter}
                  className="w-8 h-8 rounded-full bg-[#F5F5F7] hover:bg-[#EBEBEF] text-[#1D1D1F] flex items-center justify-center transition-colors cursor-pointer border border-black/5"
                  title="Next Chapter"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* ══════════════════════════════════════════════════════════════════════
              RIGHT COLUMN: SYNCHRONIZED HIGH-RES STAGE + LIVE BACTERIA SIMULATION
          ══════════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 bg-[#F5F5F7] rounded-[32px] relative overflow-hidden border border-black/5 shadow-[0_12px_40px_rgba(0,0,0,0.04)] flex items-center justify-center min-h-[500px] group">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapter.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={currentChapter.image}
                  alt={currentChapter.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Refined Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20 pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* Top Right Live Telemetry Badge */}
            <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#1D1D1F] border border-black/5 shadow-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse" />
              <span>{currentChapter.imageBadge}</span>
            </div>

            {/* Bottom Overlaid Information Capsule */}
            <div className="absolute bottom-6 left-6 right-6 z-20 text-white text-left space-y-1.5">
              <span className="text-[10px] font-mono text-blue-200 font-bold uppercase tracking-wider block">
                {currentChapter.subtitle}
              </span>
              <h4 className="font-bold text-lg sm:text-xl text-white drop-shadow-md leading-tight">
                {currentChapter.title}
              </h4>
              <div className="flex items-center gap-4 pt-1 text-[11px] font-mono text-white/80">
                <span>● IKOLI AI Core</span>
                <span>● FMOH / NTBLCP Protocol</span>
                <span>● NDPA 2023 Statutory</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
