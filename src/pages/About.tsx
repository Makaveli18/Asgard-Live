import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import valknutBg from '/images/ryan-crosby-valknut.jpg';
import { Link } from 'react-router-dom';

function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const translateY = Math.min(scrolled * 0.5, 100);
        heroRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = valknutBg;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />
      
      {/* Hero Section - Enhanced for All Devices */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Extended Header Buffer - Prevents background cutoff */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-black z-30 about-header-buffer"></div>
        
        <div 
          ref={heroRef}
          className={`
            absolute inset-0 w-full h-full pt-32 md:pt-40
            transition-opacity duration-700
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div
            className="absolute inset-x-0 top-[4rem] md:top-[5rem] bottom-0 bg-center bg-no-repeat mx-auto max-w-[2000px] about-hero-bg"
            style={{
              backgroundImage: `url(${valknutBg})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center 15%',
              transform: 'scale(1.05)',
              willChange: 'transform',
              margin: '0 auto',
              maxHeight: 'calc(100vh - 6rem)',
            }}
            role="img"
            aria-label="Viking Valknut symbol background"
          />
          
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/70"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>
        
        <div className="relative h-full flex items-center justify-center min-h-screen z-10">
          <div className="container mx-auto px-4 py-32 md:py-40 mt-24">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="
                text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                font-medieval text-metallic-gold
                leading-tight
                animate-fade-in
                drop-shadow-gold
                mb-6
                about-hero-title
              ">
                Your Tattoo Artist Matters
                <span className="block mt-6 text-firebrick">Get Inked by the Best</span>
              </h1>
            </div>
          </div>
        </div>

        {!imageLoaded && (
          <div className="absolute inset-0 bg-viking-navy/90 flex items-center justify-center">
            <div className="animate-pulse text-metallic-gold">Loading...</div>
          </div>
        )}
      </section>

      {/* Artist Profiles Section */}
      <section className="py-20 bg-viking-navy/90">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
            <div className="artist-profile space-y-6">
              <div className="relative aspect-square w-full max-w-[300px] mx-auto overflow-hidden group">
                <div className="w-full h-full bg-black/50 flex items-center justify-center border-3 border-metallic-gold/30 transition-all duration-300 group-hover:border-metallic-gold">
                  <span className="text-metallic-gold text-lg">Portrait Photo</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="space-y-4 max-w-prose mx-auto text-center">
                <h3 className="text-2xl font-bold text-metallic-gold">Master Artist</h3>
                <p className="text-gray-300">Artist Bio</p>
              </div>
            </div>

            <div className="artist-profile space-y-6">
              <div className="relative aspect-square w-full max-w-[300px] mx-auto overflow-hidden group">
                <div className="w-full h-full bg-black/50 flex items-center justify-center border-3 border-metallic-gold/30 transition-all duration-300 group-hover:border-metallic-gold">
                  <span className="text-metallic-gold text-lg">Portrait Photo</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="space-y-4 max-w-prose mx-auto text-center">
                <h3 className="text-2xl font-bold text-metallic-gold">Senior Artist</h3>
                <p className="text-gray-300">Artist Bio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Enhanced responsive styles with elegant text shadows */}
      <style jsx>{`
        /* Elegant Text Shadows with -45 Direction, 5-6px Offset, No Blur, 50% Opacity */
        .about-hero-title {
          text-shadow: 6px 6px 0px rgba(0, 0, 0, 0.5);
        }
        
        .about-header-buffer {
          background: linear-gradient(to bottom, #000000 0%, #000000 70%, transparent 100%);
        }
        
        /* Mobile: Maximum zoom-out for full context with better clearance */
        @media (max-width: 768px) {
          .about-hero-bg {
            background-position: center 80% !important;
            background-size: contain !important;
            transform: scale(0.75) !important;
          }
          
          .about-header-buffer {
            height: 220px !important;
          }
          
          .about-hero-title {
            text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.5);
          }
        }
        
        /* Tablet: Balanced view with improved positioning */
        @media (min-width: 769px) and (max-width: 1024px) {
          .about-hero-bg {
            background-position: center 70% !important;
            background-size: contain !important;
            transform: scale(0.85) !important;
          }
          
          .about-header-buffer {
            height: 200px !important;
          }
          
          .about-hero-title {
            text-shadow: 5px 5px 0px rgba(0, 0, 0, 0.5);
          }
        }
        
        /* Desktop: Proper positioning below header with full clearance */
        @media (min-width: 1025px) {
          .about-hero-bg {
            background-position: center 60% !important;
            background-size: contain !important;
            transform: scale(0.95) !important;
          }
          
          .about-header-buffer {
            height: 180px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default About;