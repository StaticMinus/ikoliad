import React, { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion';

// --- SVG Icons for Marquee ---
const CodeIcon: React.FC = () => (
  <svg width="22" height="18" viewBox="0 0 22 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6,4 1,9 6,14" />
    <polyline points="16,4 21,9 16,14" />
    <line x1="13" y1="2" x2="9" y2="16" />
  </svg>
);

const DotsIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    {[3, 10, 17].map((x) =>
      [3, 10, 17].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" />)
    )}
  </svg>
);

const CircleRingIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="9" />
    <circle cx="11" cy="11" r="4" />
  </svg>
);

const ArrowIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="2" y1="16" x2="16" y2="2" />
    <polyline points="7,2 16,2 16,11" />
  </svg>
);

const WaveCircleIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="9" />
    <path d="M5 11 Q8 7 11 11 Q14 15 17 11" />
  </svg>
);

const LinesIcon: React.FC = () => (
  <svg width="24" height="18" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="0" y1="3" x2="24" y2="3" />
    <line x1="6" y1="9" x2="24" y2="9" />
    <line x1="0" y1="15" x2="18" y2="15" />
  </svg>
);

const BoltIcon: React.FC = () => (
  <svg width="14" height="20" viewBox="0 0 14 20" fill="currentColor">
    <polygon points="8,0 0,11 6,11 6,20 14,9 8,9" />
  </svg>
);

const PlusIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
    <rect x="7.5" y="0" width="3" height="18" />
    <rect x="0" y="7.5" width="18" height="3" />
  </svg>
);

// --- Marquee Logos Data ---
const MARQUEE_LOGOS = [
  { name: 'Codecraft_', icon: <CodeIcon /> },
  { name: 'ennLabs', icon: <DotsIcon /> },
  { name: 'GlobalBank', icon: <CircleRingIcon /> },
  { name: '45 Degrees°', icon: <ArrowIcon /> },
  { name: 'AlphaWave', icon: <WaveCircleIcon /> },
  { name: 'Biosynthesis', icon: <LinesIcon /> },
  { name: 'Boltshift', icon: <BoltIcon /> },
  { name: 'Clandestine', icon: <PlusIcon /> },
];

// --- Case Studies Data ---
interface CaseStudy {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  magneticSquares: { x: number; y: number; size: number }[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'heartx',
    title: 'HeartX',
    category: 'Brand Strategy & Product Design',
    year: '2026',
    image: 'https://images.pexels.com/photos/7691249/pexels-photo-7691249.jpeg?auto=compress&cs=tinysrgb&w=800',
    magneticSquares: [
      { x: 5, y: 30, size: 16 },
      { x: 10, y: 42, size: 10 },
      { x: 3, y: 52, size: 7 },
      { x: 80, y: 70, size: 14 },
      { x: 85, y: 82, size: 9 },
      { x: 78, y: 60, size: 6 },
    ],
  },
  {
    id: 'swave',
    title: 'Swave®',
    category: 'Web Design & Identity',
    year: '2025',
    image: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800',
    magneticSquares: [
      { x: 82, y: 55, size: 16 },
      { x: 88, y: 68, size: 10 },
      { x: 78, y: 72, size: 7 },
      { x: 85, y: 42, size: 6 },
      { x: 90, y: 80, size: 8 },
    ],
  },
  {
    id: 'eduspark',
    title: 'EduSpark',
    category: 'Brand Strategy & Web Design',
    year: '2023',
    image: 'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=800',
    magneticSquares: [
      { x: 4, y: 24, size: 16 },
      { x: 10, y: 36, size: 10 },
      { x: 2, y: 44, size: 7 },
      { x: 78, y: 78, size: 14 },
      { x: 84, y: 88, size: 8 },
    ],
  },
  {
    id: 'greenergy',
    title: 'Greenergy',
    category: 'Brand Strategy & Web Design',
    year: '2022',
    image: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=800',
    magneticSquares: [
      { x: 82, y: 26, size: 14 },
      { x: 88, y: 38, size: 10 },
      { x: 78, y: 44, size: 7 },
      { x: 84, y: 54, size: 5 },
      { x: 90, y: 60, size: 8 },
    ],
  },
];

// --- 8 Parallax Floating Squares Configuration ---
const PARALLAX_SQUARES = [
  { x: 6, y: 20, size: 12 },
  { x: 12, y: 32, size: 8 },
  { x: 8, y: 44, size: 6 },
  { x: 88, y: 18, size: 10 },
  { x: 92, y: 30, size: 14 },
  { x: 85, y: 42, size: 7 },
  { x: 90, y: 52, size: 5 },
  { x: 14, y: 56, size: 5 },
];

const FloatingSquare: React.FC<{
  index: number;
  x: number;
  y: number;
  size: number;
  scrollYProgress: any;
}> = ({ index, x, y, size, scrollYProgress }) => {
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -(80 + index * 30)]);
  const springY = useSpring(rawY, { stiffness: 40, damping: 20 });

  return (
    <motion.div
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        y: springY,
      }}
      className="absolute pointer-events-none"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3 + index * 0.4,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: index * 0.3,
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
        className="bg-black"
      />
    </motion.div>
  );
};

// --- Case Study Card with Pixel-Block & Magnetic Squares ---
const CaseStudyCard: React.FC<{
  card: CaseStudy;
  index: number;
}> = ({ card, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const shiftX = useTransform(mouseX, [0, 1], [-20, 20]);
  const shiftY = useTransform(mouseY, [0, 1], [-20, 20]);

  const springShiftX = useSpring(shiftX, { stiffness: 80, damping: 18, mass: 0.6 });
  const springShiftY = useSpring(shiftY, { stiffness: 80, damping: 18, mass: 0.6 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  const rows = 8;
  const cols = 12;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative aspect-[4/3] w-full overflow-hidden cursor-pointer bg-[#fcfcfc] shadow-xs"
    >
      {/* 1. Background Image */}
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
      />

      {/* 2. Pixel-Block Hover Overlay Grid (12 cols x 8 rows) */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 pointer-events-none z-10">
        {Array.from({ length: rows * cols }).map((_, i) => {
          const r = Math.floor(i / cols);
          const c = i % cols;
          const delayIn = (r + c) * 0.018;
          const delayOut = ((rows - r) + (cols - c)) * 0.012;

          return (
            <motion.div
              key={i}
              className="w-full h-full bg-black/80"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isHovered
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0, opacity: 0 }
              }
              transition={{
                duration: 0.25,
                delay: isHovered ? delayIn : delayOut,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          );
        })}
      </div>

      {/* 3. Magnetic Squares */}
      {card.magneticSquares.map((sq, i) => (
        <motion.div
          key={i}
          style={{
            left: `${sq.x}%`,
            top: `${sq.y}%`,
            width: `${sq.size}px`,
            height: `${sq.size}px`,
            x: springShiftX,
            y: springShiftY,
          }}
          className="absolute bg-black pointer-events-none z-15 shadow-sm"
        />
      ))}

      {/* 4. Plus Button (Top Right) */}
      <div
        className="absolute right-4 top-4 z-20 flex h-7 w-7 items-center justify-center border border-white/30 text-xs text-white bg-black/20 backdrop-blur-xs font-mono"
        style={{ zIndex: 10 }}
      >
        +
      </div>

      {/* 5. Info Plate (Bottom Left) */}
      <div
        className="absolute bottom-0 left-0 bg-white px-4 pb-3 pt-2.5 z-20 max-w-[70%]"
        style={{ zIndex: 20 }}
      >
        <h3 className="text-[clamp(1.4rem,2.2vw,2rem)] font-normal leading-tight text-black">
          {card.title}
        </h3>
        <div className="mt-1.5 flex items-center gap-4 flex-wrap">
          <span className="text-[12px] text-black/60 font-sans">
            {card.category}
          </span>
          <span className="text-[12px] font-medium text-black font-mono">
            {card.year}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Projects / Case Studies Section ---
export const ProjectsCaseStudiesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-black overflow-hidden border-b border-gray-100 selection:bg-black selection:text-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Injected Style for Marquee Keyframes & Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');

        @keyframes marqueeProjects {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-projects {
          animation: marqueeProjects 28s linear infinite;
        }
        .marquee-projects:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── Top Area: Header with Parallax Floating Squares ── */}
      <div className="relative px-6 pb-10 pt-32 sm:px-10 lg:px-16 lg:pt-40">
        
        {/* Floating Squares Layer */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {PARALLAX_SQUARES.map((sq, i) => (
            <FloatingSquare
              key={i}
              index={i}
              x={sq.x}
              y={sq.y}
              size={sq.size}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Header Text */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-7xl text-center"
        >
          {/* Badge */}
          <span className="mb-5 inline-block bg-black px-4 py-1.5 text-[13px] font-medium tracking-wide text-white">
            Projects
          </span>

          {/* Heading */}
          <h2 className="text-[clamp(1.8rem,3.2vw,2.8rem)] font-light leading-[1.25] tracking-tight">
            <span className="text-black">Insights from </span>
            <span className="text-black/40">Our</span>
            <br />
            <span className="text-black/40">Case Studies</span>
          </h2>
        </motion.div>

      </div>

      {/* ── Case Study Cards (2x2 Grid) ────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 pb-16 sm:px-10 lg:px-16">
        <div className="grid gap-4 md:grid-cols-2">
          {CASE_STUDIES.map((card, idx) => (
            <CaseStudyCard key={card.id} card={card} index={idx} />
          ))}
        </div>
      </div>

      {/* ── Footer Area ─────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 pb-6 sm:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          
          {/* Left Side */}
          <div className="max-w-md">
            {/* Plus Button */}
            <div className="mb-4 flex h-7 w-7 items-center justify-center border border-black/20 text-xs text-black font-mono">
              +
            </div>

            {/* Paragraph */}
            <p className="text-[14px] leading-[1.7] text-black/60 font-sans">
              We partner with ambitious brands that are ready to move beyond fragmented visuals and shallow quick fixes -- turning their identity, website, and messaging into one focused engine for growth.
            </p>

            {/* CTA Button */}
            <div className="mt-6">
              <button className="group flex items-end cursor-pointer">
                {/* Main Label */}
                <span className="inline-flex items-center gap-[10px] border border-black/20 bg-black px-3 py-2 text-base font-medium text-white transition-colors hover:bg-black/85">
                  Let's work together
                </span>

                {/* Arrow Badge (shifts up mb-6 -> mb-9 on hover) */}
                <span className="flex h-6 w-6 items-center justify-center bg-black mb-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:mb-9">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.75 6V15.75C18.75 15.949 18.671 16.14 18.53 16.28C18.39 16.421 18.199 16.5 18 16.5C17.801 16.5 17.61 16.421 17.47 16.28C17.329 16.14 17.25 15.949 17.25 15.75V7.81L6.53 18.53C6.39 18.671 6.199 18.75 6 18.75C5.801 18.75 5.61 18.671 5.47 18.53C5.329 18.39 5.25 18.199 5.25 18C5.25 17.801 5.329 17.61 5.47 17.47L16.19 6.75H8.25C8.051 6.75 7.86 6.671 7.72 6.53C7.579 6.39 7.5 6.199 7.5 6C7.5 5.801 7.579 5.61 7.72 5.47C7.86 5.329 8.051 5.25 8.25 5.25H18C18.199 5.25 18.39 5.329 18.53 5.47C18.671 5.61 18.75 5.801 18.75 6Z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          {/* Right Side: Infinite Marquee */}
          <div className="flex-1 overflow-hidden md:ml-12 border-t border-black/10 md:border-t-0 pt-6 md:pt-0">
            <div className="overflow-hidden py-5">
              <div className="marquee-projects flex w-max">
                {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((logo, i) => (
                  <div key={i} className="flex shrink-0 items-center gap-2.5 px-8">
                    <span className="text-black">{logo.icon}</span>
                    <span className="whitespace-nowrap text-sm font-medium tracking-wide text-black/80 font-sans">
                      {logo.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="h-12" />

    </section>
  );
};
