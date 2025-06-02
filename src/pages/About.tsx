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
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen overflow-hidden">
        <div 
          ref={heroRef}
          className={`
            absolute inset-0 w-full h-full pt-32 md:pt-40
            transition-opacity duration-700
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div
            className="absolute inset-x-0 top-[4rem] md:top-[5rem] bottom-0 bg-center bg-no-repeat mx-auto max-w-[2000px]"
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
            className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black/80"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>
        
        <div className="relative h-full flex items-center justify-center min-h-screen">
          <div className="container mx-auto px-4 py-32 md:py-40 mt-24">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="
                text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                font-medieval text-metallic-gold
                leading-tight
                animate-fade-in
                drop-shadow-gold
                mb-6
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
    </div>
  );
}

export default About;