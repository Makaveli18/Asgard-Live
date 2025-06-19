import React from 'react';
import { Link } from 'react-router-dom';

export const ImageAutoSlider = () => {
  // Simplified image list with only confirmed working images
  const images = [
    "/images/Portfolio/norse/dark-mythic/horror-full-back-demon-skull-tattoo.jpg",
    "/images/Portfolio/norse/dark-mythic/vegvisir-nordic-rune-chest-symbol-tattoo.jpg",
    "/images/Portfolio/norse/realistic-portraits/ragnar-realism-viking-side-torso-finished.jpg",
    "/images/Portfolio/norse/realistic-portraits/odin-viking-god-realism-sleeve-tattoo.jpg",
    "/images/Portfolio/realism/animals/realism-cheetah-floral-splash-leg-tattoo.jpg",
    "/images/Portfolio/realism/custom ink/dark-realism-reaper-cemetery-full-backpiece.jpg",
    "/images/Portfolio/realism/custom ink/realism-jesus-christ-crucifixion-forearm-tattoo.jpg",
    "/images/Portfolio/realism/portraits/realistic-lemmy-kilmister-portrait-arm-tattoo.jpg",
    "/images/Portfolio/blackwork/expressionist-crow-duo-shoulderblade-tattoo.jpg",
    "/images/Portfolio/custom fine art/calf-cheetah-heart-tree-geometric-fine-line-tattoo.jpg",
    "/images/Portfolio/custom fine art/arm-angel-dna-raven-geometric-fine-line-tattoo.jpg",
    "/images/Portfolio/fine line/floral/lotus-flowers-leg-tattoo.jpg",
    "/images/Portfolio/fine line/symbolic - iconic/fineline-colibri-bird-forearm-tattoo.jpg",
    "/images/Portfolio/neo-traditional/mythic/neo-traditional-archangel-michael-arm-tattoo1.jpg",
    "/images/Portfolio/neo-traditional/pop culture/realistic-dobby-portrait-forearm-tattoo.jpg"
  ];

  // Mapping from folder names to category IDs
  const folderToCategoryMapping: Record<string, string> = {
    'realism': 'realism',
    'fine line': 'fine-line',
    'norse': 'norse',
    'blackwork': 'blackwork',
    'neo-traditional': 'neo-traditional',
    'ornamental': 'ornamental',
    'custom fine art': 'custom-fine-art',
    'abstract': 'abstract',
    'studio-bts': 'studio'
  };

  // Function to extract category and generate correct link
  const generateImageLink = (imagePath: string) => {
    const pathParts = imagePath.split('/');
    const folderName = pathParts[3]; // e.g., "realism", "fine line", "norse"
    const fileName = pathParts[pathParts.length - 1];
    
    const categoryId = folderToCategoryMapping[folderName] || folderName;
    const imageId = fileName.replace(/\.(jpg|jpeg|png|webp)$/i, "");
    
    return `/portfolio/${categoryId}#${imageId}`;
  };

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <>
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right 25s linear infinite;
        }

        .infinite-scroll.slow {
          animation: scroll-right-slow 35s linear infinite;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .image-item {
          transition: transform 0.4s ease, filter 0.4s ease, box-shadow 0.4s ease;
          border: 2px solid rgba(212, 175, 55, 0.3);
          cursor: pointer;
        }

        .image-item:hover {
          transform: scale(1.08);
          filter: brightness(1.15) contrast(1.1);
          border-color: #D4AF37;
          box-shadow: 0 0 25px rgba(212, 175, 55, 0.4);
        }

        .image-item:active {
          transform: scale(1.05);
        }

        .image-item.error {
          display: none !important;
        }
      `}</style>
      
      <div className="w-full bg-viking-navy/10 relative overflow-hidden py-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-viking-navy/20 to-black/50 z-0" />
        
        {/* Scrolling images container */}
        <div className="relative z-10 w-full flex items-center justify-center">
          <div 
            className="scroll-container w-full"
            onMouseEnter={(e) => {
              const scrollEl = e.currentTarget.querySelector('.infinite-scroll');
              if (scrollEl) {
                scrollEl.classList.add('slow');
              }
            }}
            onMouseLeave={(e) => {
              const scrollEl = e.currentTarget.querySelector('.infinite-scroll');
              if (scrollEl) {
                scrollEl.classList.remove('slow');
              }
            }}
          >
            <div className="infinite-scroll flex gap-6 w-max">
              {duplicatedImages.map((image, index) => {
                const imageId = image.split("/").pop()?.replace(/\.(jpg|jpeg|png|webp)$/i, "") || "";
                const altText = imageId.replace(/-/g, " ");
                const linkPath = generateImageLink(image);
                
                const isPriorityImage = index < images.length;
                
                return (
                  <Link
                    key={index}
                    to={linkPath}
                    className="image-item flex-shrink-0 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-xl overflow-hidden shadow-xl bg-black/20 block"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                      }
                    }}
                    aria-label={`View portfolio - ${altText}`}
                  >
                    <img
                      src={image}
                      alt={`Norse tattoo of ${altText}`}
                      className="w-full h-full object-cover pointer-events-none"
                      loading={isPriorityImage ? "eager" : "lazy"}
                      fetchPriority={isPriorityImage ? "high" : "auto"}
                      decoding="async"
                      onError={(e) => {
                        console.error('Image failed to load in slider:', image);
                        const target = e.currentTarget as HTMLImageElement;
                        const linkContainer = target.closest('.image-item') as HTMLElement;
                        if (linkContainer) {
                          linkContainer.classList.add('error');
                        }
                      }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-20" />
      </div>
    </>
  );
};

export default ImageAutoSlider;