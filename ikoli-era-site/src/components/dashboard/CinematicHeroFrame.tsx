import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CinematicHeroFrameProps {
  onExplore?: () => void;
}

const TOTAL_FRAMES = 300;

const getFrameUrl = (index: number) => {
  const padded = String(index + 1).padStart(3, '0');
  return `/hero-frames/ezgif-frame-${padded}.jpg`;
};

export const CinematicHeroFrame: React.FC<CinematicHeroFrameProps> = ({
  onExplore,
}) => {
  const outerTrackRef = useRef<HTMLDivElement>(null);
  const pinnedContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);

  const [isReady, setIsReady] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // ── 1. Draw Frame with Object-Fit: Cover Math & Nearest-Frame Fallback ──
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find target frame or nearest loaded frame
    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Look for closest loaded frame to prevent blank canvas
      for (let offset = 1; offset < 40; offset++) {
        const prevImg = imagesRef.current[frameIndex - offset];
        if (prevImg && prevImg.complete && prevImg.naturalWidth > 0) {
          img = prevImg;
          break;
        }
        const nextImg = imagesRef.current[frameIndex + offset];
        if (nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
          img = nextImg;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let renderWidth = canvasWidth;
    let renderHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - renderHeight) / 2;
    } else {
      renderWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - renderWidth) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  }, []);

  // ── 2. Resize Canvas with Device Pixel Ratio ───────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    drawFrame(Math.round(currentFrameRef.current));
  }, [drawFrame]);

  // ── 3. Instant Frame 0 Decode & Background Chunk Preloading ────────
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    // 1. Immediately decode frame 0 for instant render
    const initialImg = new Image();
    initialImg.src = getFrameUrl(0);
    initialImg.onload = () => {
      if (!isMounted) return;
      loadedImages[0] = initialImg;
      setIsReady(true);
      resizeCanvas();
      drawFrame(0);
    };
    loadedImages[0] = initialImg;

    // 2. Progressively preload remaining frames in background idle chunks
    const preloadChunk = (startIdx: number, chunkSize = 20) => {
      if (!isMounted || startIdx >= TOTAL_FRAMES) return;

      for (let i = startIdx; i < Math.min(startIdx + chunkSize, TOTAL_FRAMES); i++) {
        if (i === 0) continue;
        const img = new Image();
        img.src = getFrameUrl(i);
        loadedImages[i] = img;
      }

      // Schedule next chunk asynchronously
      if (startIdx + chunkSize < TOTAL_FRAMES) {
        if ('requestIdleCallback' in window) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).requestIdleCallback(() => preloadChunk(startIdx + chunkSize, chunkSize), { timeout: 250 });
        } else {
          setTimeout(() => preloadChunk(startIdx + chunkSize, chunkSize), 40);
        }
      }
    };

    preloadChunk(1, 25);
    imagesRef.current = loadedImages;

    return () => {
      isMounted = false;
    };
  }, [drawFrame, resizeCanvas]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas, isReady]);

  // ── 4. Smooth 60fps Lerp Animation Loop ─────────────────────────────
  useEffect(() => {
    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;

      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.16; // Fluid lerp interpolation
        const frameToDraw = Math.min(
          Math.max(Math.round(currentFrameRef.current), 0),
          TOTAL_FRAMES - 1
        );
        drawFrame(frameToDraw);
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [drawFrame]);

  // ── 5. GSAP ScrollTrigger Pinned Engine ───────────────────────────
  useEffect(() => {
    const outer = outerTrackRef.current;
    const pinBox = pinnedContainerRef.current;
    if (!outer || !pinBox) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: outer,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinBox,
        pinSpacing: false,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
        },
      });
    }, outerTrackRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [isReady]);

  // Synchronized stage brackets with sleek lerp transitions
  const isStage1 = scrollProgress < 0.25;
  const isStage2 = scrollProgress >= 0.25 && scrollProgress < 0.50;
  const isStage3 = scrollProgress >= 0.50 && scrollProgress < 0.75;
  const isStage4 = scrollProgress >= 0.75;

  return (
    <div
      ref={outerTrackRef}
      className="relative w-full h-[220vh] sm:h-[320vh] md:h-[420vh] bg-transparent"
    >
      {/* Pinned Viewport Container (GSAP Pin 100vh) */}
      <div
        ref={pinnedContainerRef}
        className="w-full h-screen flex flex-col justify-between px-2.5 sm:px-6 md:px-8 pb-3 sm:pb-6 select-none overflow-hidden bg-[#FBFBFD] max-w-[1600px] mx-auto"
      >
        
        {/* Top Header Text Section with Clean Dark Typography */}
        <div className="text-center pt-20 sm:pt-32 md:pt-36 lg:pt-40 pb-2 sm:pb-5 space-y-1 sm:space-y-1.5 shrink-0">
          <div className="inline-flex items-center gap-2 bg-black/[0.04] border border-black/5 px-3 py-0.5 rounded-full mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1D1D1F]">
              IKOLI-AI Demonstrator v0.1
            </span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase text-[#1D1D1F] px-2">
            YOUR HEALTH, OUR MISSION
          </h2>
          <p className="text-[11px] sm:text-sm text-gray-500 font-medium px-4">
            Neglected tropical skin diseases governance and surveillance platform for Nigeria
          </p>
          
          {/* Persistent Demonstration Environment Notice */}
          <div className="max-w-2xl mx-auto mt-2 bg-amber-500/10 border border-amber-500/25 rounded-full px-4 py-1 text-[11px] text-amber-900 font-medium flex items-center justify-center gap-2 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
            <span>
              <strong>Demonstration environment.</strong> Data displayed are synthetic/illustrative and do not represent live patient data.
            </span>
          </div>
        </div>

        {/* Middle Canvas Card Container (Expanded Full-Width Immersion Hero) */}
        <div
          ref={containerRef}
          className="relative w-full flex-1 my-1 sm:my-2 rounded-xl sm:rounded-[32px] overflow-hidden shadow-2xl border border-black/10 bg-[#0B0D13] flex items-center justify-center min-h-[300px] sm:min-h-[480px] md:min-h-[560px] max-h-[84vh]"
        >
          {/* HTML5 High-Performance 2D Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full block object-cover"
          />

          {/* Shimmering Skeleton Loader while Initial Frame Decodes */}
          {!isReady && (
            <div className="absolute inset-0 bg-[#0B0D13] flex items-center justify-center z-30 pointer-events-none">
              <div className="w-full h-full relative overflow-hidden bg-white/[0.04]">
                <div
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  style={{ animation: 'shimmer 1.5s infinite' }}
                />
              </div>
            </div>
          )}

          {/* ── Dynamic Narrative Overlay 1 (Stage 1: Mobile-anchored at Bottom) ── */}
          <div
            className={`absolute bottom-3 sm:bottom-8 left-3 sm:left-10 right-3 sm:right-auto z-20 transition-all duration-500 transform ${
              isStage1
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-3 scale-95 pointer-events-none'
            }`}
          >
            <div className="max-w-none sm:max-w-md md:max-w-lg bg-black/80 sm:bg-black/65 backdrop-blur-2xl p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-white/15 space-y-1 sm:space-y-1.5 text-left shadow-2xl">
              <span className="bg-white/20 text-white text-[9px] sm:text-[10px] font-mono font-bold px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Precision Health Surveillance
              </span>
              <h3 className="font-bold text-sm sm:text-xl md:text-2xl text-white tracking-tight leading-snug">
                Empowering Nigeria’s frontline health workers with computer vision.
              </h3>
              <p className="text-[11px] sm:text-sm text-gray-300 font-normal leading-relaxed">
                Scroll to explore real-time AI lesion screening and sentinel clinical telemetry.
              </p>
            </div>
          </div>

          {/* ── Dynamic Narrative Overlay 2 (Stage 2: Mobile-anchored at Bottom) ─── */}
          <div
            className={`absolute bottom-3 sm:top-8 left-3 sm:left-auto right-3 sm:right-10 z-20 transition-all duration-500 transform ${
              isStage2
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 -translate-y-3 scale-95 pointer-events-none'
            }`}
          >
            <div className="max-w-none sm:max-w-md bg-black/80 sm:bg-black/65 backdrop-blur-2xl p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-white/15 space-y-1 sm:space-y-1.5 text-left shadow-2xl">
              <span className="bg-[#0071E3] text-white text-[9px] sm:text-[10px] font-mono font-bold px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Zero-PII Volumetric Processing
              </span>
              <h3 className="font-bold text-sm sm:text-xl md:text-2xl text-white tracking-tight leading-snug">
                Sub-millimeter margin analysis for Hansen’s & Buruli Ulcers.
              </h3>
              <p className="text-[11px] sm:text-sm text-gray-300 font-normal leading-relaxed">
                Continuous optical validation preserves peripheral nerve integrity before permanent disability occurs.
              </p>
            </div>
          </div>

          {/* ── Dynamic Narrative Overlay 3 (Stage 3: Mobile-anchored at Bottom) ──── */}
          <div
            className={`absolute bottom-3 sm:top-8 left-3 sm:left-10 right-3 sm:right-auto z-20 transition-all duration-500 transform ${
              isStage3
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 -translate-y-3 scale-95 pointer-events-none'
            }`}
          >
            <div className="max-w-none sm:max-w-md md:max-w-lg bg-black/80 sm:bg-black/65 backdrop-blur-2xl p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-white/15 space-y-1 sm:space-y-1.5 text-left shadow-2xl">
              <span className="bg-emerald-500 text-white text-[9px] sm:text-[10px] font-mono font-bold px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                National Logistics Integration
              </span>
              <h3 className="font-bold text-sm sm:text-xl md:text-2xl text-white tracking-tight leading-snug">
                Instant treatment dispatch & WHO MDT blister packs.
              </h3>
              <p className="text-[11px] sm:text-sm text-gray-300 font-normal leading-relaxed">
                Direct automated supply chain alerts to 312+ sentinel facilities across the federation.
              </p>
            </div>
          </div>

          {/* ── Dynamic Narrative Overlay 4 (Stage 4: Positioned at Bottom Action Card) ── */}
          <div
            className={`absolute inset-x-2.5 sm:inset-x-8 bottom-3 sm:bottom-6 z-20 bg-black/85 sm:bg-black/80 backdrop-blur-3xl p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-white/20 flex items-center justify-between gap-3 sm:gap-4 transition-all duration-500 transform ${
              isStage4
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-3 scale-95 pointer-events-none'
            }`}
          >
            <div className="space-y-0.5 sm:space-y-1 max-w-2xl text-left">
              <div className="flex items-center gap-2">
                <span className="bg-white/20 text-white text-[9px] sm:text-[10px] font-mono font-bold px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  National Health Mission
                </span>
                <span className="text-[10px] font-mono text-gray-300 hidden sm:inline">
                  36 States Telemetry
                </span>
              </div>
              <h3 className="font-bold text-xs sm:text-base md:text-lg text-white leading-tight">
                Leaders in frontline disease surveillance & AI diagnostics
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed hidden sm:block font-normal">
                Bringing modern AI tools, reliable treatments, and patient-first health monitoring to every primary healthcare center in Nigeria.
              </p>
            </div>

            <MagneticButton onClick={onExplore}>
              <button
                className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white text-[#1D1D1F] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer group/btn"
                aria-label="Explore diseases"
              >
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </MagneticButton>
          </div>

          {/* Subtle Bottom Scroll Cue Indicator */}
          {isStage1 && (
            <div className="absolute bottom-2 sm:bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-white/60 animate-bounce pointer-events-none">
              <span>Scroll to navigate</span>
              <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
          )}
        </div>


      </div>
    </div>
  );
};
