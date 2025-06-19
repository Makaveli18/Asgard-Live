import React from 'react';
import { Link } from 'react-router-dom';

export const ImageAutoSlider = () => {
  // Real portfolio images from Asgard Tattoo
  const images = [
    "/images/Portfolio/norse/dark-mythic/horror-full-back-demon-skull-tattoo.jpg",
    "/images/Portfolio/norse/dark-mythic/vegvisir-nordic-rune-chest-symbol-tattoo.jpg",
    "/images/Portfolio/norse/realistic-portraits/ragnar-realism-viking-side-torso-finished.jpg",
    "/images/Portfolio/norse/realistic-portraits/realistic-vikings-portrait-tattoo-floki-arm-design2.png.jpg",
    "/images/Portfolio/norse/realistic-portraits/odin-viking-god-realism-sleeve-tattoo.jpg",
    "/images/Portfolio/abstract/black-ink-phoenix-tattoo-side-ribcage-paintbrush-style.png",
    "/images/Portfolio/ornamental/realism-dotwork/ornamental-female-portrait-mandala-dotwork-arm-tattoo.jpg",
    "/images/Portfolio/ornamental/realism-dotwork/lion-geometry-dotwork-arm-tattoo.jpg",
    "/images/Portfolio/realism/custom ink/realism-cheetah-floral-splash-leg-tattoo.jpg",
    "/images/Portfolio/realism/custom ink/dark-realism-reaper-cemetery-full-backpiece.jpg",
    "/images/Portfolio/realism/custom ink/realism-jesus-christ-crucifixion-forearm-tattoo.jpg",
    "/images/Portfolio/realism/portraits/hyperrealistic-queen-of-earh-afro-sleeve-tattoo3.jpg",
    "/images/Portfolio/realism/portraits/realistic-lemmy-kilmister-portrait-arm-tattoo.jpg",
    "/images/Portfolio/abstract/phoenix-minimal-abstract-watercolor-red-forearm.jpg",
    "/images/Portfolio/blackwork/expressionist-crow-duo-shoulderblade-tattoo.jpg",
    "/images/Portfolio/custom fine art/calf-cheetah-heart-tree-geometric-fine-line-tattoo.jpg",
    "/images/Portfolio/custom fine art/greek-statue-dual-portrait-surreal-family-code-thigh-tattoo1.jpg",
    "/images/Portfolio/custom fine art/arm-angel-dna-raven-geometric-fine-line-tattoo.jpg",
    "/images/Portfolio/fine line/floral/lotus-flowers-leg-tattoo.jpg",
    "/images/Portfolio/fine line/floral/snake-flowers-fineline-abdominal-side-tattoo.jpg",
    "/images/Portfolio/fine line/symbolic - iconic/fineline-colibri-bird-forearm-tattoo.jpg",
    "/images/Portfolio/fine line/symbolic - iconic/deathly-hallows-custom-fineline-arm-tattoo2.jpg",
    "/images/Portfolio/neo-traditional/neo-traditional-female-portrait-floral-sleeve-tattoo.jpg",
    "/images/Portfolio/neo-traditional/pop culture/blackwork-jason-voorhees-horror-sleeve-tattoo.jpg",
    "/images/Portfolio/neo-traditional/pop culture/dobby-is-free-color-tattoo-harry-potter-fanart.jpg",
    "/images/Portfolio/neo-traditional/pop culture/realistic-dobby-portrait-forearm-tattoo.jpg",
    "/images/Portfolio/neo-traditional/mythic/neo-traditional-archangel-michael-arm-tattoo1.jpg"
  ];

  // Mapping from folder names to category IDs (reverse of PortfolioGallery mapping)
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
    // Split path: /images/Portfolio/{category}/{subfolder}/{filename}
    const pathParts = imagePath.split('/');
    const folderName = pathParts[3]; // e.g., "realism", "fine line", "norse"
    const fileName = pathParts[pathParts.length - 1]; // e.g., "realistic-lemmy-kilmister-portrait-arm-tattoo.jpg"
    
    // Get category ID and clean filename
    const categoryId = folderToCategoryMapping[folderName] || folderName;
    const imageId = fileName.replace(/\.\w+$/, ""); // Remove file extension
    
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
                const imageId = image.split("/").pop()?.replace(/\.\w+$/, "") || "";
                const altText = imageId.replace(/-/g, " ");
                const linkPath = generateImageLink(image);
                
                // Prioritize the first set of images for immediate loading
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
                        // Navigation handled by Link component
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