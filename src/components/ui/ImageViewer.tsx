import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        aria-label="Close viewer"
      >
        <X className="w-8 h-8" />
      </button>

      <button
        onClick={() => onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1)}
        className="absolute left-4 text-white/70 hover:text-white transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-12 h-12" />
      </button>

      <div className="relative max-w-[90vw] max-h-[90vh]">
        <img
          src={images[currentIndex]}
          alt={`Artwork ${currentIndex + 1}`}
          className="max-w-full max-h-[90vh] object-contain"
        />
        <div className="absolute bottom-0 left-0 right-0 text-center text-white/70 bg-black/50 py-2">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <button
        onClick={() => onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0)}
        className="absolute right-4 text-white/70 hover:text-white transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-12 h-12" />
      </button>
    </div>
  );
}