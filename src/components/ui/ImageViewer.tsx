import React, { useEffect, useCallback, useRef } from 'react';
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
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
    } else if (e.key === 'ArrowRight') {
      onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
    }
  }, [currentIndex, images.length, onClose, onNavigate]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;

    // Only treat as horizontal swipe if horizontal movement dominates
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;

    if (dx < 0) {
      onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
    } else {
      onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
    }
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    document.documentElement.style.touchAction = 'none';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.documentElement.style.touchAction = '';
    };
  }, [handleKeyDown]);

  const currentImage = images[currentIndex];
  const fileName = currentImage?.split('/').pop() || '';
  const caption = captions[fileName] || '';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[60] text-white/80 hover:text-white transition-colors bg-black/70 rounded-full p-3 backdrop-blur-sm touch-manipulation"
        style={{ marginTop: 'env(safe-area-inset-top)' }}
        aria-label="Close viewer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        onClick={() => onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1)}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-[60] text-white/80 hover:text-white transition-colors bg-black/70 rounded-full p-3 md:p-4 backdrop-blur-sm touch-manipulation"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Next button */}
      <button
        onClick={() => onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0)}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-[60] text-white/80 hover:text-white transition-colors bg-black/70 rounded-full p-3 md:p-4 backdrop-blur-sm touch-manipulation"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Image + caption + CTA */}
      <div className="relative w-full flex flex-col items-center px-14 md:px-20 overflow-y-auto max-h-full py-16 md:py-10">
        <figure className="flex flex-col items-center w-full max-w-4xl">
          <img
            src={currentImage}
            alt={fileName.replace(/-/g, ' ').replace(/\.(jpg|jpeg|png|webp)$/i, '')}
            className="w-auto max-w-full max-h-[55vh] md:max-h-[68vh] object-contain rounded"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          {caption && (
            <figcaption className="mt-4 text-center italic text-sm md:text-base text-gray-300 max-w-2xl px-2 leading-relaxed">
              {caption}
            </figcaption>
          )}
          <Link
            to={`/booking#form?piece=${fileName.replace(/\.(jpg|jpeg|png|webp)$/i, '')}`}
            className="mt-4 inline-block bg-firebrick hover:bg-firebrick/90 text-white font-semibold py-3 px-5 md:px-6 rounded-lg shadow-lg transition-all duration-300 text-sm md:text-base touch-manipulation"
          >
            Book A FREE Consult On This Piece
          </Link>
        </figure>

        {/* Counter */}
        <div className="mt-4 text-center text-white/60 text-sm bg-black/50 py-1.5 px-4 rounded backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
