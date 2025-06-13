import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ImageAutoSlider = () => {
  const navigate = useNavigate();

  // Real portfolio images from Asgard Tattoo
  const images = [
    "/images/Portfolio/norse/dark-mythic/horror-full-back-demon-skull-tattoo.jpg.jpg",
    "/images/Portfolio/norse/dark-mythic/vegvisir-nordic-rune-chest-symbol-tattoo.jpg.jpg",
    "/images/Portfolio/norse/realistic-portraits/ragnar-realism-viking-side-torso-finished.jpg.jpg",
    "/images/Portfolio/norse/realistic-portraits/realistic-vikings-portrait-tattoo-floki-arm-design1.png.jpg",
    "/images/Portfolio/norse/realistic-portraits/odin-viking-god-realism-sleeve-tattoo.jpg.jpg",
    "/images/Portfolio/abstract/black-ink-phoenix-tattoo-side-ribcage-paintbrush-style.png.jpg",
    "/images/Portfolio/ornamental/realism-dotwork/feminine-mandala-portrait-tattoo-lotus-and-roses-forearm.png.jpg",
    "/images/Portfolio/ornamental/realism-dotwork/lion-geometry-dotwork-arm-tattoo.jpg.jpg",
    "/images/Portfolio/realism/animals/realism-lion-bicep-tattoo-with-honeycomb-pattern.png.jpg",
    "/images/Portfolio/realism/custom ink/dark-realism-reaper-cemetery-full-backpiece.jpg.jpg",
    "/images/Portfolio/realism/custom ink/realism-jesus-christ-crucifixion-forearm-tattoo.jpg.jpg",
    "/images/Portfolio/realism/portraits/hyperrealistic-queen-of-earh-afro-sleeve-tattoo3.jpg.jpg",
    "/images/Portfolio/realism/portraits/realistic-lemmy-kilmister-portrait-arm-tattoo.jpg.jpg",
    "/images/Portfolio/abstract/phoenix-minimal-abstract-watercolor-red-forearm.jpg.jpg",
    "/images/Portfolio/blackwork/expressionist-crow-duo-shoulderblade-tattoo.jpg.jpg",
    "/images/Portfolio/custom fine art/calf-cheetah-heart-tree-geometric-fine-line-tattoo.jpg.jpg",
    "/images/Portfolio/custom fine art/greek-statue-dual-portrait-surreal-family-code-thigh-tattoo1.jpg.jpg",
    "/images/Portfolio/custom fine art/arm-angel-dna-raven-geometric-fine-line-tattoo.jpg.jpg",
    "/images/Portfolio/fine line/floral/lotus-flowers-leg-tattoo.jpg.jpg",
    "/images/Portfolio/fine line/floral/snake-flowers-fineline-abdominal-side-tattoo.jpg.jpg",
    "/images/Portfolio/fine line/symbolic - iconic/fineline-colibri-bird-forearm-tattoo.jpg.jpg",
    "/images/Portfolio/fine line/symbolic - iconic/deathly-hallows-custom-fineline-arm-tattoo2.jpg.jpg",
    "/images/Portfolio/neo-traditional/neo-traditional-female-portrait-floral-sleeve-tattoo.jpg.jpg",
    "/images/Portfolio/neo-traditional/pop culture/blackwork-jason-voorhees-horror-sleeve-tattoo.jpg.jpg",
    "/images/Portfolio/neo-traditional/pop culture/las-vegas-themed-sleeve-tattoo-neon-retro-graffiti-style.png.jpg",
    "/images/Portfolio/neo-traditional/pop culture/realistic-dobby-portrait-forearm-tattoo.jpg.jpg",
    "/images/Portfolio/neo-traditional/mythic/neo-traditional-archangel-michael-arm-tattoo1.jpg.jpg"
  ];

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  const handleImageClick = () => {
    navigate('/portfolio');
  };

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

        .infinite-scroll {
          animation: scroll-right 25s linear infinite;
        }

        .infinite-scroll:hover {
          animation: scroll-right 28s linear infinite;
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
          <div className="scroll-container w-full">
            <div className="infinite-scroll flex gap-6 w-max">
              {duplicatedImages.map((image, index) => (
                <div
                  key={index}
                  className="image-item flex-shrink-0 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-xl overflow-hidden shadow-xl bg-black/20"
                  onClick={handleImageClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleImageClick();
                    }
                  }}
                  aria-label={`View portfolio - Asgard Tattoo masterpiece ${(index % images.length) + 1}`}
                >
                  <img
                    src={image}
                    alt={`Asgard Tattoo masterpiece ${(index % images.length) + 1}`}
                    className="w-full h-full object-cover pointer-events-none"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
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