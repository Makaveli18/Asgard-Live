import React, { useRef, useEffect, useState } from 'react';

interface VideoBackgroundProps {
  /** YouTube video ID (extracted from URL) */
  youtubeId?: string;
  /** Direct video file URL (.mp4, .webm, etc.) */
  videoUrl?: string;
  /** Fallback image if video fails to load */
  fallbackImage: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show video controls */
  showControls?: boolean;
  /** Whether video should autoplay (limited by browser policies) */
  autoplay?: boolean;
  children?: React.ReactNode;
}

export function VideoBackground({
  youtubeId,
  videoUrl,
  fallbackImage,
  className = '',
  showControls = false,
  autoplay = true,
  children
}: VideoBackgroundProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Extract YouTube ID from full URL if needed
  const extractYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const getYouTubeId = () => {
    if (youtubeId) return youtubeId;
    if (videoUrl && videoUrl.includes('youtube')) {
      return extractYouTubeId(videoUrl);
    }
    return null;
  };

  useEffect(() => {
    if (videoRef.current && videoUrl && !videoUrl.includes('youtube')) {
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
  }, [videoUrl]);

  const ytId = getYouTubeId();

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* YouTube Video */}
      {ytId && (
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=${autoplay ? 1 : 0}&mute=1&loop=1&playlist=${ytId}&controls=${showControls ? 1 : 0}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              width: '100vw',
              height: '56.25vw', // 16:9 aspect ratio
              minHeight: '100vh',
              minWidth: '177.77vh', // 16:9 aspect ratio
              transform: 'translate(-50%, -50%)',
              top: '50%',
              left: '50%'
            }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Background Video"
          />
        </div>
      )}

      {/* Direct Video File */}
      {videoUrl && !videoUrl.includes('youtube') && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
            videoLoaded && !videoError ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            objectFit: 'contain',
            objectPosition: 'center',
            backgroundColor: 'black'
          }}
          autoPlay={autoplay}
          muted
          loop
          playsInline
          controls={showControls}
          onError={() => setVideoError(true)}
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl.replace('.mp4', '.webm')} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Fallback Image */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${
          (ytId || (videoLoaded && !videoError)) ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundImage: `url(${fallbackImage})` }}
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