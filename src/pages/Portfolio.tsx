import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ImageGallery } from '../components/ui/ImageGallery';

const categories = [
  { id: 'studio', title: 'Studio' },
  { id: 'fineline', title: 'FineLine' },
  { id: 'norse', title: 'Norse & Viking' },
  { id: 'realistic', title: 'Realism' },
  { id: 'traditional', title: 'Traditional' },
];

function Portfolio() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('studio');

  useEffect(() => {
    const img = new Image();
    img.src = '/images/AsgardWall.jpg';
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />
      
      <section className="relative w-full min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div
            className={`w-full h-[120vh] bg-cover bg-center transition-opacity duration-1000 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('/images/AsgardWall.jpg')`,
              transform: 'scale(1.1)',
              backgroundPosition: 'center calc(30% + 30px)',
            }}
            role="img"
            aria-label="Studio background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        </div>
        
        {!imageLoaded && (
          <div className="absolute inset-0 bg-viking-navy/90 flex items-center justify-center">
            <div className="animate-pulse text-metallic-gold">Loading...</div>
          </div>
        )}
        
        <div className="relative z-10 container mx-auto px-4 py-48 md:py-64 mt-48">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cinzel text-metallic-gold leading-tight">
              Your Story Deserves a Masterpiece.<br />
              <span className="text-firebrick mt-4 block">Let's Ink It Today.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 font-lora max-w-3xl mx-auto mt-24">
              Browse through some of our past inked tales and get inspired for your next piece.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-32">
              <a 
                href="#gallery"
                className="inline-flex items-center justify-center px-8 py-4 bg-firebrick text-white font-bold rounded-md hover:bg-firebrick/90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-firebrick/50"
              >
                View Gallery
              </a>
              <Link
                to="/booking"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-metallic-gold font-bold rounded-md border-2 border-metallic-gold hover:bg-metallic-gold hover:text-black transition-all duration-300 transform hover:-translate-y-1"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Navigation */}
      <nav className="sticky top-20 z-30 bg-black/95 backdrop-blur-sm border-y border-metallic-gold/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-firebrick text-white'
                    : 'bg-viking-navy/20 text-metallic-gold hover:bg-viking-navy/40'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Gallery Sections */}
      <div className="bg-black/95 py-12">
        <div 
          ref={galleryRef}
          className="container mx-auto px-4 max-h-[800px] overflow-y-auto"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#8B0000 rgba(26, 26, 26, 0.2)',
          }}
          onWheel={(e) => {
            if (galleryRef.current) {
              e.preventDefault();
              galleryRef.current.scrollTop += e.deltaY;
            }
          }}
        >
          <div className="max-w-7xl mx-auto space-y-16">
            {categories.map((category) => activeCategory === category.id && (
              <ImageGallery
                key={category.id}
                category={category.id}
                title={category.title}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 right-8 animate-bounce text-metallic-gold/50">
        <ChevronDown className="w-8 h-8" />
      </div>

      <section className="py-16 bg-viking-navy relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-metallic-gold">
            Ready to Create Your Masterpiece?
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl mb-8 text-gray-300 leading-relaxed">
              Your story deserves to be told in ink that stands the test of time. Let's create something legendary together.
            </p>
            <Link 
              to="/booking" 
              className="cta-button bg-firebrick text-white font-bold py-4 px-8 rounded-md transition-all duration-300 text-lg inline-flex items-center justify-center space-x-2"
            >
              <span>Start Your Story</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </section>

      <Footer />
    </div>
  );
}

export default Portfolio;