import React from 'react';

interface StickyRevealFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const StickyRevealFooter: React.FC<StickyRevealFooterProps> = ({
  children,
  className = '',
}) => {
  return (
    <>
      {/* Mobile (< md): Standard relative flow to prevent clipping or truncated scrolling */}
      <div className={`block md:hidden relative w-full z-10 ${className}`}>
        {children}
      </div>

      {/* Desktop (md+): Fixed sticky curtain reveal effect */}
      <div
        className={`hidden md:block relative w-full overflow-hidden ${className}`}
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }}
      >
        <div className="relative w-full">
          {/* Invisible spacer matching the exact height of the footer */}
          <div className="invisible pointer-events-none select-none aria-hidden">
            {children}
          </div>

          {/* Fixed Sticky Reveal Container anchored to bottom */}
          <div className="fixed bottom-0 left-0 w-full z-0 pointer-events-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
