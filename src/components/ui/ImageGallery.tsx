import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ImageViewer } from './ImageViewer';

interface ImageGalleryProps {
  category: string;
  title: string;
}

export function ImageGallery({ category, title }: ImageGalleryProps) {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a production environment, you'd want to use a proper asset loading system
    // This is a simplified version for demonstration
    const loadImages = async () => {
      try {
        const imageContext = import.meta.glob('/images/Portfolio/**/*.{jpg,png}', {
          eager: true,
          import: 'default',
        });

        const categoryImages = Object.entries(imageContext)
          .filter(([path]) => path.toLowerCase().includes(category.toLowerCase()))
          .map(([path]) => path.replace('/public', ''));

        setImages(categoryImages);
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [category]);

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