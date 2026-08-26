import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STATEMENT = "An intelligent multimodal AI engine that detects, verifies, and stages. Automating anomaly detection, differential screening, and national reporting with zero patient data exposure.";

const WordReveal: React.FC<{
  word: string;
  progress: any;
  range: [number, number];
}> = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(
    progress,
    range,
    ['rgba(10, 12, 16, 0.22)', 'rgba(10, 12, 16, 1)']
  );

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.28em] transition-colors duration-200"
    >
      {word}
    </motion.span>
  );
};

export const SpotlightMetrics: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 35%'],
  });

  const words = STATEMENT.split(' ');

  return (
    <section
      id="surveillance"
      ref={containerRef}
      className="w-full bg-white py-16 sm:py-24 px-4 sm:px-8 md:px-12 border-b border-gray-100 selection:bg-[#0082FF] selection:text-white"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
        
        {/* Left Column: Rounded Clinical Profile Video Card (Clean, Pill Removed) */}
        <div className="w-full lg:w-5/12 flex justify-center">
          <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl border border-gray-100 group bg-black">
            <video
              autoPlay
              loop
              muted
              playsInline
              src="/assets/lady-removing-glasses.mp4"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-50 pointer-events-none" />
          </div>
        </div>

        {/* Right Column: Interactive Scroll-Reveal Headline & 3 Metrics Columns */}
        <div className="w-full lg:w-7/12 space-y-8 sm:space-y-10 text-left">
          
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#0082FF] font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#0082FF] animate-ping" />
              <span>MULTIMODAL INTELLIGENCE • IKOLI AI</span>
            </div>

            {/* Scroll-Driven Dynamic Word-by-Word Text Reveal */}
            <h2 className="font-sans font-medium text-xl sm:text-2xl md:text-[32px] lg:text-[36px] leading-[1.3] tracking-tight">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                  <WordReveal
                    key={i}
                    word={word}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </h2>
          </div>

          {/* 3 Metrics Columns (Stacked on mobile, 3-col on sm+) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 pt-6 border-t border-gray-100">
            
            {/* Metric 1 */}
            <div className="group cursor-pointer">
              <span className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0A0C10] block tracking-tight group-hover:text-[#0082FF] transition-colors">
                89.2%
              </span>
              <span className="text-xs text-gray-500 font-semibold font-sans mt-1 sm:mt-2 block">
                MDT Treatment Cure Rate
              </span>
            </div>

            {/* Metric 2 */}
            <div className="group cursor-pointer">
              <span className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0082FF] block tracking-tight">
                &lt; 5%
              </span>
              <span className="text-xs text-gray-500 font-semibold font-sans mt-1 sm:mt-2 block">
                Disability Target (G2D)
              </span>
            </div>

            {/* Metric 3 */}
            <div className="group cursor-pointer">
              <span className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0A0C10] block tracking-tight group-hover:text-[#0082FF] transition-colors">
                78.5%
              </span>
              <span className="text-xs text-gray-500 font-semibold font-sans mt-1 sm:mt-2 block">
                PCR Laboratory Confirmed
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
