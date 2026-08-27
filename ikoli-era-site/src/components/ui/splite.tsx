import { Suspense, lazy } from 'react'
import { SkeletonBox } from './Skeleton'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full relative rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 flex items-center justify-center">
          <SkeletonBox className="w-full h-full" isDark={true} />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none opacity-40">
            <div className="w-8 h-8 rounded-full border-2 border-[#0071E3] border-t-transparent animate-spin" />
            <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">
              3D Neural Spatial Engine
            </span>
          </div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}
