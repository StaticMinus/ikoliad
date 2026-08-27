import React, { useEffect, useState, useRef } from 'react';

interface BlobVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  className?: string;
  poster?: string;
}

// Global cache for video blobs to prevent re-fetching on component re-mounts
const BLOB_CACHE = new Map<string, string>();

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
  const [blobSrc, setBlobSrc] = useState<string>(() => BLOB_CACHE.get(src) || src);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let isMounted = true;

    if (!src) return;

    if (BLOB_CACHE.has(src)) {
      setBlobSrc(BLOB_CACHE.get(src)!);
      return;
    }

    // Fetch video as in-memory blob to prevent external download managers (IDM) from intercepting HTTP video streams
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load video: ${res.statusText}`);
        return res.blob();
      })
      .then((blob) => {
        if (!isMounted) return;
        const objectUrl = URL.createObjectURL(blob);
        BLOB_CACHE.set(src, objectUrl);
        setBlobSrc(objectUrl);
      })
      .catch((err) => {
        console.warn('BlobVideo fallback to direct src:', err);
        if (isMounted) {
          setBlobSrc(src); // Fallback to direct src if fetch fails
        }
      });

    return () => {
      isMounted = false;
    };
  }, [src]);

  // Ensure autoplay triggers once blob source is ready and check readyState
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 2) {
      setIsVideoLoaded(true);
    }

    if (autoPlay) {
      video.play().catch(() => {
        // Autoplay may be restricted if unmuted; ignore
      });
    }
  }, [blobSrc, autoPlay]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black/5">
      {/* Shimmering Skeleton until Video Buffer Plays */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-white/[0.04] dark:bg-white/[0.03] overflow-hidden pointer-events-none z-10">
          <div
            className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite]"
            style={{
              backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
            }}
          />
        </div>
      )}

      <video
        ref={videoRef}
        src={blobSrc}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        onLoadedData={() => setIsVideoLoaded(true)}
        onLoadedMetadata={() => setIsVideoLoaded(true)}
        onCanPlay={() => {
          setIsVideoLoaded(true);
          videoRef.current?.play().catch(() => {});
        }}
        onPlaying={() => setIsVideoLoaded(true)}
        onTimeUpdate={() => {
          if (!isVideoLoaded) setIsVideoLoaded(true);
        }}
        className={`transition-opacity duration-300 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        {...rest}
      />
    </div>
  );
};
