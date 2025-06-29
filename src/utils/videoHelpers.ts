/**
 * Extract YouTube video ID from various YouTube URL formats
 */
export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    /youtu\.be\/([^&\n?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Get YouTube thumbnail URL for a video ID
 */
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'maxres'): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
}

/**
 * Create YouTube embed URL with custom parameters
 */
export function createYouTubeEmbedUrl(videoId: string, options: {
  autoplay?: boolean;
  loop?: boolean;
  mute?: boolean;
  controls?: boolean;
  modestbranding?: boolean;
  rel?: boolean;
  startTime?: number;
} = {}): string {
  const params = new URLSearchParams();
  
  if (options.autoplay) params.set('autoplay', '1');
  if (options.loop) {
    params.set('loop', '1');
    params.set('playlist', videoId);
  }
  if (options.mute) params.set('mute', '1');
  if (options.controls === false) params.set('controls', '0');
  if (options.modestbranding) params.set('modestbranding', '1');
  if (options.rel === false) params.set('rel', '0');
  if (options.startTime) params.set('start', options.startTime.toString());

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

/**
 * Check if a URL is a valid YouTube URL
 */
export function isYouTubeUrl(url: string): boolean {
  return /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/.test(url);
}