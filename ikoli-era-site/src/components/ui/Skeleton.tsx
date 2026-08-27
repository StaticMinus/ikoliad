import React from 'react';

interface SkeletonProps {
  className?: string;
  isDark?: boolean;
}

export const SkeletonBox: React.FC<SkeletonProps> = ({
  className = '',
  isDark = false,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl ${
        isDark
          ? 'bg-white/[0.06]'
          : 'bg-black/[0.04]'
      } ${className}`}
    >
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.04) 50%, transparent 100%)',
        }}
      />
    </div>
  );
};

export const SkeletonCard: React.FC<{
  className?: string;
  isDark?: boolean;
  children?: React.ReactNode;
}> = ({ className = '', isDark = false, children }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-5 sm:p-6 border backdrop-blur-md ${
        isDark
          ? 'bg-[#121214]/80 border-white/10'
          : 'bg-white/80 border-black/5 shadow-xs'
      } ${className}`}
    >
      <div className="space-y-3">
        <SkeletonBox className="h-4 w-1/3" isDark={isDark} />
        <SkeletonBox className="h-8 w-2/3" isDark={isDark} />
        <SkeletonBox className="h-3 w-4/5" isDark={isDark} />
      </div>
      {children}
    </div>
  );
};

export const SkeletonHero: React.FC<{ isDark?: boolean; className?: string }> = ({
  isDark = false,
  className = '',
}) => {
  return (
    <div className={`w-full relative rounded-3xl overflow-hidden border p-4 sm:p-6 space-y-4 ${
      isDark ? 'bg-[#0B0D13] border-white/10' : 'bg-gray-50 border-black/5'
    } ${className}`}>
      <div className="w-full aspect-16/10 sm:aspect-21/9 rounded-2xl relative overflow-hidden bg-black/5 dark:bg-white/5">
        <SkeletonBox className="w-full h-full" isDark={isDark} />
        
        {/* Subtle Brand Watermark Shimmer */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="w-16 h-16 rounded-full border-2 border-white/20 border-t-[#0071E3] animate-spin" />
        </div>
      </div>

      {/* Bento Bottom Metrics Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        <SkeletonBox className="h-20 rounded-2xl" isDark={isDark} />
        <SkeletonBox className="h-20 rounded-2xl" isDark={isDark} />
        <SkeletonBox className="h-20 rounded-2xl" isDark={isDark} />
      </div>
    </div>
  );
};

export const SkeletonChart: React.FC<{ isDark?: boolean; className?: string }> = ({
  isDark = false,
  className = '',
}) => {
  return (
    <div className={`w-full rounded-2xl p-5 border ${
      isDark ? 'bg-[#121214] border-white/10' : 'bg-white border-black/5'
    } ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <SkeletonBox className="h-4 w-32" isDark={isDark} />
        <SkeletonBox className="h-4 w-16" isDark={isDark} />
      </div>
      <div className="flex items-end gap-2 h-40 pt-4">
        {[40, 65, 30, 85, 55, 90, 45, 70, 60, 80].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-black/5 dark:bg-white/10 animate-pulse"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
};
