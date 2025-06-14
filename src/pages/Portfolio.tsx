import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PortfolioGallery } from '../components/PortfolioGallery';
import { LazyImage } from '../components/LazyImage';
import captions from '../data/portfolio-captions';

const categories = [
  {
    id: 'realism',
    title: 'Realism',
    description: 'Breathtaking photorealistic designs that capture every detail',
    thumbnail: '/images/Portfolio/realism/animals/realism-lion-bicep-tattoo-with-honeycomb-pattern.png.jpg',
    alt: 'Realistic lion tattoo with honeycomb pattern'
  },
  {
    id: 'fine-line',
    title: 'Fine Line',
    description: 'Delicate artistry that speaks volumes with subtle power',
    thumbnail: '/images/Portfolio/fine line/floral/lotus-flowers-leg-tattoo.jpg.jpg',
    alt: 'Fine line lotus flowers tattoo'
  },
  {
    id: 'norse',
    title: 'Norse & Viking',
    description: 'Ancient symbols and legends brought to life in ink',
    thumbnail: '/images/Portfolio/norse/realistic-portraits/odin-viking-god-realism-sleeve-tattoo.jpg.jpg',
    alt: 'Odin Viking god realistic sleeve tattoo'
  },
  {
    id: 'blackwork',
    title: 'Blackwork',
    description: 'Bold, striking designs in pure black ink mastery',
    thumbnail: '/images/Portfolio/blackwork/nature-themed-bear-forest-mountain-leg-tattoo.jpg.jpg',
    alt: 'Nature themed bear forest mountain tattoo'
  },
  {
    id: 'neo-traditional',
    title: 'Neo-Traditional',
    description: 'Modern twist on classic tattoo artistry',
    thumbnail: '/images/Portfolio/neo-traditional/mythic/neo-traditional-archangel-michael-arm-tattoo1.jpg.jpg',
    alt: 'Neo-traditional archangel Michael arm tattoo'
  },
  {
    id: 'ornamental',
    title: 'Ornamental',
    description: 'Sacred geometry and intricate mandala designs',
    thumbnail: '/images/Portfolio/ornamental/mandala/lotus-mandala-sacred-geometry-back-tattoo.jpg.jpg',
    alt: 'Lotus mandala sacred geometry back tattoo'
  },
  {
    id: 'custom-fine-art',
    title: 'Custom Fine Art',
    description: 'Unique artistic visions transformed into wearable masterpieces',
    thumbnail: '/images/Portfolio/custom fine art/arm-angel-dna-raven-geometric-fine-line-tattoo.jpg.jpg',
    alt: 'Custom angel DNA raven geometric fine line tattoo'
  },
  {
    id: 'abstract',
    title: 'Abstract',
    description: 'Creative expressions beyond traditional boundaries',
    thumbnail: '/images/Portfolio/abstract/geometric-abstract-bionic-spine-tech-tattoo-back.jpg.jpg',
    alt: 'Geometric abstract bionic spine tech tattoo'
  },
  {
    id: 'studio',
    title: 'Studio Life',
    description: 'Behind the scenes at Asgard Tattoo',
    thumbnail: '/images/Portfolio/studio-bts/asgard-thor-loki-airbrush-wall.jpg.jpg',
    alt: 'Asgard studio Thor Loki airbrush wall art'
  }
];

const images = categories.map(category => category.thumbnail);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "Asgard Tattoo Portfolio",
  "description": "Gallery of Norse-inspired tattoos by Asgard Tattoo, Landshut",
  "mainEntity": images.map((imgUrl) => {
    const fileName = imgUrl.split("/").pop();
    return {
      "@type": "ImageObject",
      "name": fileName.replace(/-/g, " ").replace(/\.\w+$/, ""),
      "description": captions[fileName] || "",
      "thumbnailUrl": `${import.meta.env.VITE_APP_BASE_URL || "https://asgard-tattoo.com"}${imgUrl}`,
      "contentUrl": `${import.meta.env.VITE_APP_BASE_URL || "https://asgard-tattoo.com"}${imgUrl}`
    };
  })
};

function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/portfolio/${category.id}`}
          className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-viking-navy/20 border border-metallic-gold/30 hover:border-metallic-gold transition-all duration-300"
        >
          <LazyImage
            src={category.thumbnail}
            alt={category.alt}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-2xl font-bold text-metallic-gold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              {category.title}
            </h3>
            <p className="text-gray-300 text-sm mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
              {category.description}
            </p>
            <div className="flex items-center text-firebrick font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
              View Gallery
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>

          {/* Category label always visible on mobile */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-lg font-bold text-metallic-gold md:hidden">
              {category.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

function CategoryDetail({ categoryId }: { categoryId: string }) {
  const category = categories.find(cat => cat.id === categoryId);
  const location = useLocation();
  
  // Handle hash navigation for direct image linking
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); // Remove the '#'
      // Add a small delay to ensure the DOM is rendered
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center'
          });
        }
      }, 500);
    }
  }, [location.hash]);
  
  if (!category) {
    return (
      <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-metallic-gold mb-4">Category Not Found</h1>
          <Link to="/portfolio" className="text-firebrick hover:text-metallic-gold">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />
      
      {/* Breadcrumb */}
      <nav className="bg-viking-navy/20 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-metallic-gold hover:text-firebrick transition-colors">
              Home
            </Link>
            <ChevronDown className="w-4 h-4 mx-2 text-gray-500 rotate-[-90deg]" />
            <Link to="/portfolio" className="text-metallic-gold hover:text-firebrick transition-colors">
              Portfolio
            </Link>
            <ChevronDown className="w-4 h-4 mx-2 text-gray-500 rotate-[-90deg]" />
            <span className="text-gray-300">{category.title}</span>
          </div>
        </div>
      </nav>

      {/* Category Header */}
      <section className="py-16 bg-viking-navy/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              to="/portfolio" 
              className="inline-flex items-center text-metallic-gold hover:text-firebrick transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Categories
            </Link>
            <h1 className="text-4xl md:text-5xl font-cinzel text-metallic-gold mb-6">
              {category.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Gallery */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <PortfolioGallery style={categoryId} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-viking-navy relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-metallic-gold">
            Ready for Your {category.title} Masterpiece?
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl mb-8 text-gray-300 leading-relaxed">
              Let's create something legendary together in the {category.title.toLowerCase()} style.
            </p>
            <Link 
              to="/booking" 
              className="cta-button bg-firebrick text-white font-bold py-4 px-8 rounded-md transition-all duration-300 text-lg inline-flex items-center justify-center space-x-2"
            >
              <span>Book Your Session</span>
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

function Portfolio() {
  const { category } = useParams();
  const location = useLocation();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Handle hash navigation for main portfolio page
  useEffect(() => {
    if (location.hash && !category) {
      const id = location.hash.substring(1); // Remove the '#'
      // Add a small delay to ensure the DOM is rendered
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center'
          });
        }
      }, 500);
    }
  }, [location.hash, category]);

  useEffect(() => {
    const img = new Image();
    img.src = '/images/AsgardWall.jpg';
    img.onload = () => setImageLoaded(true);
  }, []);

  // If we have a category parameter, show the category detail page
  if (category) {
    return <CategoryDetail categoryId={category} />;
  }

  // Otherwise show the main portfolio grid
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-black text-gray-100">
        <Header />
        
        {/* Hero Section - Enhanced for Desktop & Mobile */}
        <section className="relative w-full min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <div
              className={`w-full h-full bg-cover transition-opacity duration-1000 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url('/images/AsgardWall.jpg')`,
                // Desktop: Scale and position to show below header
                transform: 'scale(1.05)',
                backgroundPosition: 'center 20%',
                // Mobile responsive: Show more of the image context
                backgroundSize: 'cover',
              }}
              role="img"
              aria-label="Studio background"
            />
            
            {/* Enhanced gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          </div>
          
          {!imageLoaded && (
            <div className="absolute inset-0 bg-viking-navy/90 flex items-center justify-center">
              <div className="animate-pulse text-metallic-gold">Loading...</div>
            </div>
          )}
          
          {/* Content Container - Full screen positioning */}
          <div className="relative z-10 container mx-auto px-4 py-20 md:py-32 lg:py-40">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cinzel text-metallic-gold leading-tight mb-6">
                Portfolio
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 font-lora max-w-3xl mx-auto mb-12">
                Explore our legendary collection of tattoo artistry. From Norse mythology to fine line masterpieces, 
                each piece tells a warrior's story.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a 
                  href="#categories"
                  className="inline-flex items-center justify-center px-8 py-4 bg-firebrick text-white font-bold rounded-md hover:bg-firebrick/90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-firebrick/50"
                >
                  Explore Galleries
                </a>
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-metallic-gold font-bold rounded-md border-2 border-metallic-gold hover:bg-metallic-gold hover:text-black transition-all duration-300 transform hover:-translate-y-1"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Add custom styles for mobile background optimization */}
        <style jsx>{`
          @media (max-width: 768px) {
            .relative .absolute div[style*="backgroundImage"] {
              background-position: center 30% !important;
              background-size: cover !important;
              transform: scale(1.0) !important;
            }
          }
          
          @media (min-width: 769px) and (max-width: 1024px) {
            .relative .absolute div[style*="backgroundImage"] {
              background-position: center 25% !important;
              transform: scale(1.03) !important;
            }
          }
          
          @media (min-width: 1025px) {
            .relative .absolute div[style*="backgroundImage"] {
              background-position: center 15% !important;
              transform: scale(1.05) !important;
            }
          }
        `}</style>

        {/* Categories Section */}
        <section id="categories" className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-cinzel text-metallic-gold mb-6">
                Our Tattoo Styles
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Each style represents a different path to self-expression. Click on any category to explore 
                our collection of masterpieces and find your perfect artistic match.
              </p>
            </div>
            
            <CategoryGrid />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-viking-navy/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
              <div>
                <div className="text-4xl font-bold text-metallic-gold mb-2">500+</div>
                <div className="text-gray-300">Masterpieces Created</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-metallic-gold mb-2">9</div>
                <div className="text-gray-300">Unique Styles</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-metallic-gold mb-2">1000+</div>
                <div className="text-gray-300">Happy Warriors</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
    </>
  );
}

export default Portfolio;