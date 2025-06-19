import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageViewer } from './ImageViewer';

interface ImageGalleryProps {
  category: string;
  title: string;
}

// Static image database for ImageGallery - using string paths only
const categoryImages: Record<string, string[]> = {
  'realism': [
    '/images/Portfolio/realism/animals/realism-lion-bicep-tattoo-with-honeycomb-pattern.png',
    '/images/Portfolio/realism/animals/realism-owl-shoulder-animal-tattoo.jpg',
    '/images/Portfolio/realism/animals/realistic-viper-snake-chest-tattoo.jpg',
    '/images/Portfolio/realism/portraits/realistic-lemmy-kilmister-portrait-arm-tattoo.jpg',
    '/images/Portfolio/realism/custom ink/dark-realism-reaper-cemetery-full-backpiece.jpg'
  ],
  'fine-line': [
    '/images/Portfolio/fine line/floral/lotus-flowers-leg-tattoo.jpg',
    '/images/Portfolio/fine line/floral/flowers-fineline-arm-tattoo.jpg',
    '/images/Portfolio/fine line/symbolic - iconic/fineline-colibri-bird-forearm-tattoo.jpg'
  ],
  'norse': [
    '/images/Portfolio/norse/realistic-portraits/odin-viking-god-realism-sleeve-tattoo.jpg',
    '/images/Portfolio/norse/realistic-portraits/realistic-vikings-portrait-tattoo-floki-arm-design1.png',
    '/images/Portfolio/norse/realistic-portraits/realistic-vikings-portrait-tattoo-floki-arm-design2.png',
    '/images/Portfolio/norse/dark-mythic/odin-ravens-chest-tattoo-norse-blackwork-style.png'
  ]
};

export function ImageGallery({ category, title }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const images = categoryImages[category] || [];

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="animate-pulse text-metallic-gold">Loading gallery...</div>
      </div>
    );
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="py-8 first:pt-0 last:pb-0" id={category.toLowerCase()}>
      <h2 className="text-3xl md:text-4xl font-cinzel text-metallic-gold text-center mb-12">
        {title}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="aspect-square overflow-hidden rounded-lg cursor-pointer relative group"
            onClick={() => setSelectedImageIndex(index)}
          >
            <img
              src={image}
              alt={`${category} tattoo artwork ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                console.error('Image failed to load:', image);
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white text-sm">Click to view full size</p>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedImageIndex !== null && (
        <ImageViewer
          images={images}
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onNavigate={setSelectedImageIndex}
        />
      )}
    </div>
  );
}