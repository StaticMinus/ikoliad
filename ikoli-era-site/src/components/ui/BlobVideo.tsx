import React, { useEffect, useState, useRef } from 'react';

interface BlobVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  className?: string;
  poster?: string;
}

export const BlobVideo: React.FC<BlobVideoProps> = ({
  src,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  poster,
  ...rest
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure DOM element properties (especially muted) are strictly set for browser autoplay policies
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = muted;
    video.playsInline = playsInline;
    video.autoplay = autoPlay;
    video.loop = loop;

    if (autoPlay) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Retry on user interaction or fallback
        });
      }
    }
  }, [src, autoPlay, muted, loop, playsInline]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black/10">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload="auto"
        onLoadedData={() => setIsVideoLoaded(true)}
        onLoadedMetadata={() => setIsVideoLoaded(true)}
        onCanPlay={() => {
          setIsVideoLoaded(true);
          videoRef.current?.play().catch(() => {});
        }}
        onPlaying={() => setIsVideoLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-90'} ${className}`}
        {...rest}
      />
    </div>
  );
};

