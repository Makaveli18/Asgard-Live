import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ImageViewer } from './ui/ImageViewer';
import captions from '../data/portfolio-captions';

interface PortfolioImage {
  src: string;
  alt: string;
  filename: string;
}

interface PortfolioGalleryProps {
  images: PortfolioImage[]
  style?: string
}

export function PortfolioGallery({ images, style }: PortfolioGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const sortedImages = [...images].sort((a, b) => a.filename.localeCompare(b.filename));

  if (sortedImages.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-metallic-gold mb-4">Gallery Coming Soon</h2>
          <p className="text-gray-300">We're currently updating this gallery with fresh artwork.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
        {sortedImages.map((image, imageIndex) => {
          const fileName = image.filename;
          const caption = captions[fileName] || "";
          const imageId = fileName.replace(/\.(jpg|jpeg|png|webp)$/i, "");

          return (
            <motion.figure
              key={image.src}
              id={imageId}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: Math.min(imageIndex * 0.03, 0.6) }}
              className="portfolio-figure aspect-square overflow-hidden rounded-lg cursor-pointer relative group bg-viking-navy/20"
              onClick={() => setSelectedImageIndex(imageIndex)}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="portfolio-image w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                decoding="async"
                onError={(e) => {
                  const figure = (e.currentTarget as HTMLImageElement).closest('.portfolio-figure') as HTMLElement;
                  if (figure) figure.style.display = 'none';
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="w-full">
                  <p className="text-white text-sm font-medium mb-1">{image.alt}</p>
                  {caption && (
                    <figcaption className="text-gray-300 text-xs italic leading-relaxed">
                      {caption}
                    </figcaption>
                  )}
                  <p className="text-gray-400 text-xs mt-2">Click to view full size</p>
                </div>
              </div>
            </motion.figure>
          );
        })}
      </div>

      {selectedImageIndex !== null && (
        <ImageViewer
          images={sortedImages.map(img => img.src)}
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onNavigate={setSelectedImageIndex}
        />
      )}
    </div>
  );
}