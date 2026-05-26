import React, { useRef, useEffect, useState } from 'react';
import { extractYouTubeId } from '../utils/videoHelpers';

interface ResponsiveVideoBackgroundProps {
  videoSource: string;
  fallbackImage: string;
  className?: string;
  showControls?: boolean;
  autoplay?: boolean;
  children?: React.ReactNode;
  forceMobile?: boolean;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}

export function ResponsiveVideoBackground({
  videoSource,
  fallbackImage,
  className = '',
  showControls = false,
  autoplay = true,
  children,
  forceMobile = false
}: ResponsiveVideoBackgroundProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();

  const youtubeId = extractYouTubeId(videoSource);
  const isYouTubeVideo = !!youtubeId;
  const showVideo = !isMobile && !forceMobile;

  useEffect(() => {
    if (videoRef.current && !isYouTubeVideo && showVideo) {
      const video = videoRef.current;

      const handleLoadedData = () => {
        setVideoLoaded(true);
        setVideoError(false);
      };

      const handleError = () => {
        setVideoError(true);
        setVideoLoaded(false);
      };

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
      };
    }
  }, [videoSource, isYouTubeVideo, showVideo]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-black ${className}`}>
      {/* YouTube Video Background - Desktop Only */}
      {isYouTubeVideo && showVideo && (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${autoplay ? 1 : 0}&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&disablekb=1&fs=0&cc_load_policy=0&cc_lang_pref=auto&widget_referrer=https%3A%2F%2Fasgardtattoo.com`}
          className="absolute inset-0"
          style={{
            width: '100vw',
            height: '56.25vw',
            minHeight: '100vh',
            minWidth: '177.77vh',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
            pointerEvents: 'none'
          }}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={false}
          title="Background Video"
          loading="lazy"
        />
      )}

      {/* Direct Video File Background - Desktop Only */}
      {!isYouTubeVideo && showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0"
          style={{
            width: '100vw',
            height: '56.25vw',
            minHeight: '100vh',
            minWidth: '177.77vh',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
          autoPlay={autoplay}
          muted
          loop
          playsInline
          controls={showControls}
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
        >
          <source src={videoSource} type="video/mp4" />
        </video>
      )}

      {/* Fallback Image - Always shown on mobile, shown on desktop if video fails */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${
          showVideo && (isYouTubeVideo || (videoLoaded && !videoError)) ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundImage: `url(${fallbackImage})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      {children && (
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      )}
    </div>
  );
}
