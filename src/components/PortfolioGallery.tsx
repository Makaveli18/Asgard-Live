import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ImageViewer } from './ui/ImageViewer';
import captions from '../data/portfolio-captions';

interface PortfolioImage {
  src: string;
  alt: string;
  filename: string;
}

interface PortfolioSection {
  title: string;
  images: PortfolioImage[];
}

interface PortfolioGalleryProps {
  style: string;
}

// Mapping for folder name to display name
const folderDisplayNames: Record<string, string> = {
  'animals': 'Animals',
  'portraits': 'Portraits',
  'custom ink': 'Custom Ink',
  'floral': 'Floral',
  'symbolic - iconic': 'Symbolic & Iconic',
  'dark-mythic': 'Dark Mythic',
  'realistic-portraits': 'Realistic Portraits',
  'symbolic - minimal ink': 'Symbolic & Minimal Ink',
  'mandala': 'Mandala',
  'realism-dotwork': 'Realism & Dotwork',
  'mythic': 'Mythic',
  'pop culture': 'Pop Culture',
  'memento-mori': 'Memento Mori'
};

// Style mapping for URL to folder name
const styleMapping: Record<string, string> = {
  'realism': 'realism',
  'fine-line': 'fine line',
  'norse': 'norse',
  'blackwork': 'blackwork',
  'neo-traditional': 'neo-traditional',
  'ornamental': 'ornamental',
  'custom-fine-art': 'custom fine art',
  'abstract': 'abstract',
  'studio': 'studio-bts'
};

export function PortfolioGallery({ style }: PortfolioGalleryProps) {
  const [sections, setSections] = useState<PortfolioSection[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPortfolioImages = async () => {
      try {
        // Map URL style to actual folder name
        const folderName = styleMapping[style] || style;
        
        // Use Vite's glob import to get all images
        const imageModules = import.meta.glob('/public/images/Portfolio/**/*.{jpg,jpeg,png,webp}', {
          eager: true,
          import: 'default'
        });

        // Group images by subfolder
        const sectionMap = new Map<string, PortfolioImage[]>();

        Object.keys(imageModules).forEach(path => {
          // Extract the path structure: /public/images/Portfolio/{style}/{subfolder}/{filename}
          const pathParts = path.split('/');
          if (pathParts.length >= 6) {
            const styleFolder = pathParts[4]?.toLowerCase();
            const subfolder = pathParts[5];
            const filename = pathParts[pathParts.length - 1];

            // Check if this image belongs to the current style
            if (styleFolder === folderName.toLowerCase()) {
              const imageSrc = path.replace('/public', '');
              const altText = filename
                .replace(/\.(jpg|jpeg|png|webp)$/i, '')
                .replace(/[-_]/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());

              if (!sectionMap.has(subfolder)) {
                sectionMap.set(subfolder, []);
              }

              sectionMap.get(subfolder)?.push({
                src: imageSrc,
                alt: altText,
                filename
              });
            }
          }
        });

        // Convert map to sections array
        const sectionsArray: PortfolioSection[] = Array.from(sectionMap.entries()).map(([folder, images]) => ({
          title: folderDisplayNames[folder] || folder.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          images: images.sort((a, b) => a.filename.localeCompare(b.filename))
        }));

        // Sort sections by title
        sectionsArray.sort((a, b) => a.title.localeCompare(b.title));

        setSections(sectionsArray);
      } catch (error) {
        console.error('Error loading portfolio images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioImages();
  }, [style]);

  const getAllImages = () => {
    return sections.flatMap(section => section.images);
  };

  const getGlobalImageIndex = (sectionIndex: number, imageIndex: number) => {
    let globalIndex = 0;
    for (let i = 0; i < sectionIndex; i++) {
      globalIndex += sections[i].images.length;
    }
    return globalIndex + imageIndex;
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-metallic-gold text-xl mb-4">Loading gallery...</div>
          <div className="w-16 h-16 border-4 border-metallic-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (sections.length === 0) {
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
    <div className="space-y-16">
      {sections.map((section, sectionIndex) => (
        <motion.section
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-cinzel text-metallic-gold text-center">
            {section.title}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {section.images.map((image, imageIndex) => {
              const fileName = image.filename;
              const caption = captions[fileName] || "";
              const imageId = fileName.replace(/\.\w+$/, "");
              
              return (
                <motion.figure
                  key={image.src}
                  id={imageId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: imageIndex * 0.05 }}
                  className="portfolio-figure aspect-square overflow-hidden rounded-lg cursor-pointer relative group bg-viking-navy/20"
                  onClick={() => {
                    setSelectedSection(sectionIndex);
                    setSelectedImageIndex(getGlobalImageIndex(sectionIndex, imageIndex));
                  }}
                >
                  <img
                    src={image.src}
                    alt={`Norse tattoo of ${fileName.replace(/-/g, " ").replace(/\.\w+$/, "")}`}
                    fetchpriority="high"
                    loading="lazy"
                    className="portfolio-image w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    decoding="async"
                  />
                  
                  {/* Hover overlay */}
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

                  {/* Loading placeholder */}
                  <div className="absolute inset-0 bg-viking-navy/40 animate-pulse opacity-0 group-hover:opacity-0" />
                </motion.figure>
              );
            })}
          </div>
        </motion.section>
      ))}

      {/* Image Viewer */}
      {selectedImageIndex !== null && (
        <ImageViewer
          images={getAllImages().map(img => img.src)}
          currentIndex={selectedImageIndex}
          onClose={() => {
            setSelectedImageIndex(null);
            setSelectedSection(null);
          }}
          onNavigate={setSelectedImageIndex}
        />
      )}
    </div>
  );
}