import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import captions from '../../data/portfolio-captions';

interface ImageViewerProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageViewer({ images, currentIndex, onClose, onNavigate }: ImageViewerProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
    } else if (e.key === 'ArrowRight') {
      onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
    }
  }, [currentIndex, images.length, onClose, onNavigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleKeyDown]);

  const currentImage = images[currentIndex];
  const fileName = currentImage?.split('/').pop() || '';
  const caption = captions[fileName] || '';

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      {/* Close button - positioned outside image container */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-60 text-white/70 hover:text-white transition-colors bg-black/60 rounded-full p-2 backdrop-blur-sm"
        aria-label="Close viewer"
      >
        <X className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Navigation buttons */}
      <button
        onClick={() => onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1)}
        className="absolute left-4 z-60 text-white/70 hover:text-white transition-colors bg-black/60 rounded-full p-2 backdrop-blur-sm"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
      </button>

      <button
        onClick={() => onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0)}
        className="absolute right-4 z-60 text-white/70 hover:text-white transition-colors bg-black/60 rounded-full p-2 backdrop-blur-sm"
        aria-label="Next image"
      >
        <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
      </button>

      {/* Image container */}
      <div className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center px-4 md:px-8">
        <figure className="lightbox-figure flex flex-col items-center">
          <img
            src={currentImage}
            alt={fileName.replace(/-/g, ' ').replace(/\.(jpg|jpeg|png|webp)$/i, '')}
            className="lightbox-image max-w-full max-h-[70vh] object-contain"
            onError={(e) => {
              console.error('Image failed to load in viewer:', currentImage);
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          {caption && (
            <figcaption className="mt-4 text-center italic text-base text-gray-300 max-w-2xl px-4 leading-relaxed">
              {caption}
            </figcaption>
          )}
          <Link 
            to={`/booking#booking?piece=${fileName.replace(/\.(jpg|jpeg|png|webp)$/i, '')}`}
            className="mt-4 inline-block bg-firebrick hover:bg-firebrick/90 text-white font-semibold py-3 px-4 md:px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-sm md:text-base"
          >
            🖋️ Book A FREE Consult On This Piece
          </Link>
        </figure>
        
        {/* Image counter */}
        <div className="mt-4 text-center text-white/70 bg-black/50 py-2 px-4 rounded backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}