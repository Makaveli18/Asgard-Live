import React, { useRef, useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { extractYouTubeId, createYouTubeEmbedUrl } from '../utils/videoHelpers';

interface ResponsiveVideoBackgroundProps {
  /** Video source - can be YouTube URL or direct video file URL (.mp4, .webm, etc.) */
  videoSource: string;
  /** Fallback image for mobile or if video fails */
  fallbackImage: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show video controls */
  showControls?: boolean;
  /** Whether video should autoplay */
  autoplay?: boolean;
  /** Children content to overlay */
  children?: React.ReactNode;
  /** Force mobile behavior */
  forceMobile?: boolean;
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
  const [isClient, setIsClient] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Determine if we should use mobile optimization
  const shouldUseMobile = forceMobile || (isClient && (isMobile || isTablet));

  // Check if the video source is a YouTube URL
  const youtubeId = extractYouTubeId(videoSource);
  const isYouTubeVideo = !!youtubeId;

  useEffect(() => {
    if (videoRef.current && !shouldUseMobile && !isYouTubeVideo) {
      const video = videoRef.current;
      
      const handleLoadedData = () => {
        setVideoLoaded(true);
        setVideoError(false);
      };

      const handleError = () => {
        console.error('Video failed to load:', videoSource);
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
  }, [videoSource, shouldUseMobile, isYouTubeVideo]);

  // Mobile/Tablet: Use optimized image background
  if (shouldUseMobile) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        {/* Mobile optimized background image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${fallbackImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }}
        />
        
        {/* Mobile-optimized overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        {/* Content */}
        {children && (
          <div className="relative z-10 w-full h-full">
            {children}
          </div>
        )}
      </div>
    );
  }

  // Desktop: Use video background
  return (
    <div className={`relative w-full h-full overflow-hidden bg-black ${className}`}>
      {/* YouTube Video Background for Desktop */}
      {isYouTubeVideo && (
        <iframe
          src={createYouTubeEmbedUrl(youtubeId, {
            autoplay: autoplay,
            loop: true,
            mute: true,
            controls: showControls,
            modestbranding: true,
            rel: false
          })}
          className="absolute inset-0 w-full h-full"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Background Video"
        />
      )}

      {/* Direct Video File Background for Desktop */}
      {!isYouTubeVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full"
          style={{ 
            width: '100%',
            height: '100%',
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
          Your browser does not support the video tag.
        </video>
      )}

      {/* Fallback Image for Desktop (if video fails) */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${
          (isYouTubeVideo || (videoLoaded && !videoError)) ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ 
          backgroundImage: `url(${fallbackImage})`
        }}
      />

      {/* Overlay for better text readability */}
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