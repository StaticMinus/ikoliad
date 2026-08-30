import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, pageKey }) => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* ── Top Micro Route Progress Indicator ─────────────────────── */}
      <motion.div
        key={`progress-${pageKey}`}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#0071E3] z-[100] origin-left pointer-events-none"
      />

      {/* ── Page Content Entrance with Spatial Spring Physics ───────── */}
      <motion.div
        key={`content-${pageKey}`}
        initial={{ opacity: 0, y: 16, scale: 0.992 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.995 }}
        transition={{
          duration: 0.42,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
