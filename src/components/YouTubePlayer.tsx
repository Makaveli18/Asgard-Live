import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';

interface YouTubePlayerProps {
  /** YouTube video URL or ID */
  videoId: string;
  /** Video title */
  title: string;
  /** Video thumbnail (optional, will use YouTube default if not provided) */
  thumbnail?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show as embedded player or preview with external link */
  embedMode?: boolean;
}

export function YouTubePlayer({
  videoId,
  title,
  thumbnail,
  className = '',
  embedMode = true
}: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract video ID from URL if full URL is provided
  const extractVideoId = (input: string) => {
    const match = input.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : input;
  };

  const cleanVideoId = extractVideoId(videoId);
  const youtubeUrl = `https://www.youtube.com/watch?v=${cleanVideoId}`;
  const embedUrl = `https://www.youtube.com/embed/${cleanVideoId}?autoplay=1&rel=0&modestbranding=1`;
  const thumbnailUrl = thumbnail || `https://img.youtube.com/vi/${cleanVideoId}/maxresdefault.jpg`;

  if (!embedMode) {
    // Preview mode with external link
    return (
      <div className={`relative group cursor-pointer ${className}`}>
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative overflow-hidden rounded-lg"
        >
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <div className="flex items-center space-x-3 text-white">
              <Play className="w-12 h-12 text-firebrick" fill="currentColor" />
              <ExternalLink className="w-6 h-6" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h3 className="text-white font-semibold">{title}</h3>
          </div>
        </a>
      </div>
    );
  }

  // Embedded player mode
  return (
    <div className={`relative ${className}`}>
      {!isPlaying ? (
        <div 
          className="relative cursor-pointer group"
          onClick={() => setIsPlaying(true)}
        >
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center rounded-lg">
            <Play className="w-16 h-16 text-firebrick" fill="currentColor" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
            <h3 className="text-white font-semibold">{title}</h3>
          </div>
        </div>
      ) : (
        <iframe
          src={embedUrl}
          className="w-full h-full rounded-lg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        />
      )}
    </div>
  );
}