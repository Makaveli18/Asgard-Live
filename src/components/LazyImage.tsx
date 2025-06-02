import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

export function LazyImage({ src, alt, className = '', onClick }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && !loaded && !error) {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [inView, src, loaded, error]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 bg-viking-navy/20 animate-pulse" />
      )}
      
      {error ? (
        <div className="absolute inset-0 bg-viking-navy/20 flex items-center justify-center">
          <p className="text-sm text-gray-400">Failed to load image</p>
        </div>
      ) : (
        <img
          src={loaded ? src : ''}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } group-hover:scale-110 transition-transform duration-500`}
          loading="lazy"
          decoding="async"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div className="w-full">
          <p className="text-white text-sm">Click to view full size</p>
        </div>
      </div>
    </div>
  );
}