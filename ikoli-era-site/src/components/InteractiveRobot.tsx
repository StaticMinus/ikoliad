import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const InteractiveRobot: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

  // Mouse move listener across the window / hero container
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize to [-1, 1]
      const nx = (e.clientX / innerWidth) * 2 - 1;
      const ny = (e.clientY / innerHeight) * 2 - 1;
      setTargetPos({ x: nx, y: ny });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth lerp animation loop (requestAnimationFrame)
  useEffect(() => {
    let animId: number;
    const lerp = () => {
      setMousePos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.06,
        y: prev.y + (targetPos.y - prev.y) * 0.06,
      }));
      animId = requestAnimationFrame(lerp);
    };

    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, [targetPos]);

  // Derived transforms for 3D perspective response
  const rotateY = mousePos.x * 12; // tilt horizontally
  const rotateX = -mousePos.y * 8; // tilt vertically
  const translateX = mousePos.x * 15;
  const translateY = mousePos.y * 10;

  return (
    <div
      ref={containerRef}
      className="relative w-[340px] sm:w-[460px] md:w-[540px] lg:w-[620px] xl:w-[680px] h-[380px] sm:h-[480px] md:h-[560px] lg:h-[620px] flex items-end justify-center select-none pointer-events-none"
    >
      {/* Dynamic Cyan/Blue Radial Backlight Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-radial from-[#0082FF]/30 via-[#0082FF]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Interactive 3D Perspective Wrapper */}
      <motion.div
        style={{
          transform: `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translate3d(${translateX}px, ${translateY}px, 0)`,
          transition: 'transform 0.05s ease-out',
        }}
        className="relative w-full h-full flex items-end justify-center"
      >
        {/* Seamlessly Masked Autoplaying Robot Head Tilt Video */}
        <div
          className="relative w-full h-full overflow-hidden flex items-end justify-center"
          style={{
            maskImage:
              'radial-gradient(ellipse 70% 75% at 50% 50%, black 45%, rgba(0,0,0,0.85) 65%, transparent 95%), linear-gradient(to bottom, black 85%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 75% at 50% 50%, black 45%, rgba(0,0,0,0.85) 65%, transparent 95%), linear-gradient(to bottom, black 85%, transparent 100%)',
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            src="/assets/robot-tilts-head.mp4"
            className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,130,255,0.25)] mix-blend-multiply filter contrast-105 brightness-105"
          />
        </div>

        {/* Ambient Specular Highlight Sheen */}
        <div className="absolute inset-0 bg-radial from-white/10 via-transparent to-transparent pointer-events-none rounded-full blur-xl" />
      </motion.div>
    </div>
  );
};
