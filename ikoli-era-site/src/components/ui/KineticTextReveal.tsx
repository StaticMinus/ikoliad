import React from 'react';
import { motion } from 'framer-motion';

interface KineticTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  highlightWords?: string[];
  highlightClass?: string;
}

export const KineticTextReveal: React.FC<KineticTextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.04,
  highlightWords = [],
  highlightClass = 'text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#5856D6]',
}) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}
    >
      {words.map((word, index) => {
        const isHighlighted = highlightWords.some(
          (hw) => word.toLowerCase().includes(hw.toLowerCase())
        );

        return (
          <span key={index} className="inline-block overflow-hidden py-1">
            <motion.span
              variants={wordVariants}
              className={`inline-block ${isHighlighted ? highlightClass : ''}`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
};
