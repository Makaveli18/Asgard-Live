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
  /** all of the images for this section of the portfolio */
  images: PortfolioImage[]
  /** optional style class for the wrapper */
  style?: string
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
  'studio-bts': 'Studio BTS',
};

export function PortfolioGallery({ images, style }: PortfolioGalleryProps) {
  const [sections, setSections] = useState<PortfolioSection[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPortfolioImages = async () => {
      try {
        console.log('PortfolioGallery received images:', images.length);
        
        if (images.length === 0) {
          console.warn('No images provided to PortfolioGallery');
          setSections([]);
          setLoading(false);
          return;
        }

        // Group images by logical sections based on folder structure
        const sectionMap = new Map<string, PortfolioImage[]>();

        images.forEach(image => {
          // Extract subfolder from the path
          // Path structure: /images/Portfolio/{main-category}/{sub-category}/{filename}
          const pathParts = image.src.split('/');
          let subfolder = 'Main Gallery';
          
          // For images in subfolders, get the sub-category (index 4 in the URL path)
          if (pathParts.length >= 6 && pathParts[4]) {
            subfolder = pathParts[4]; // This is the sub-category folder
          }

          if (!sectionMap.has(subfolder)) {
            sectionMap.set(subfolder, []);
          }

          sectionMap.get(subfolder)?.push(image);
        });

        // Convert map to sections array
        const sectionsArray: PortfolioSection[] = Array.from(sectionMap.entries()).map(([folder, images]) => ({
          title: folderDisplayNames[folder] || folder.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          images: images.sort((a, b) => a.filename.localeCompare(b.filename))
        }));

        // Sort sections by title
        sectionsArray.sort((a, b) => a.title.localeCompare(b.title));

        console.log('PortfolioGallery sections created:', sectionsArray.length, sectionsArray.map(s => ({ title: s.title, count: s.images.length })));
        setSections(sectionsArray);
      } catch (error) {
        console.error('Error loading portfolio images:', error);
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioImages();
  }, [images]); // Depend on images prop

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
              const imageId = fileName.replace(/\.(jpg|jpeg|png|webp)$/i, "");
              
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
                    alt={`Tattoo artwork: ${fileName.replace(/-/g, " ").replace(/\.(jpg|jpeg|png|webp)$/i, "")}`}
                    fetchPriority="high"
                    loading="lazy"
                    className="portfolio-image w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    decoding="async"
                    onLoad={() => {
                      console.log('Image loaded successfully:', image.src);
                    }}
                    onError={(e) => {
                      console.error('Image failed to load in gallery:', image.src);
                      const target = e.currentTarget as HTMLImageElement;
                      const figure = target.closest('.portfolio-figure') as HTMLElement;
                      if (figure) {
                        figure.style.display = 'none';
                      }
                    }}
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