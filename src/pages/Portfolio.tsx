import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { isMobile, isTablet } from 'react-device-detect'
import { useImages, ImageRecord } from '../hooks/useImages'
import { PortfolioGallery } from '../components/PortfolioGallery'
import { PortfolioNavigation } from '../components/PortfolioNavigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Breadcrumb } from '../components/Breadcrumb'
import { Link } from 'react-router-dom'
import { ResponsiveVideoBackground } from '../components/ResponsiveVideoBackground'
import { extractYouTubeId } from '../utils/videoHelpers'

// your static category metadata with Asgard-themed descriptions
const categories = [
  { 
    id: 'realism', 
    title: 'Realism',
    description: 'Where flesh becomes canvas for photographic perfection - every shadow, every detail captured with the precision of Odin\'s all-seeing eye.'
  },
  { 
    id: 'fine-line', 
    title: 'Fine Line',
    description: 'Delicate as runes carved by the finest craftsmen, these ethereal marks whisper stories with the subtlety of morning mist over Valhalla.'
  },
  { 
    id: 'norse', 
    title: 'Norse & Viking',
    description: 'Ancient symbols of power and protection, forged in the fires of legend - where mythology meets flesh and warriors claim their birthright.'
  },
  { 
    id: 'blackwork', 
    title: 'Blackwork',
    description: 'Bold as the ravens of Huginn and Muninn, these striking designs command respect with the raw power of pure obsidian ink.'
  },
  { 
    id: 'neo-traditional', 
    title: 'Neo-Traditional',
    description: 'Classic artistry reborn with modern fire - where timeless techniques meet contemporary vision in a blaze of color and innovation.'
  },
  { 
    id: 'custom-fine-art', 
    title: 'Custom Fine Art',
    description: 'Masterpieces born from collaboration between artist and warrior - unique visions brought to life through sacred artistic alchemy.'
  },
  { 
    id: 'abstract', 
    title: 'Abstract',
    description: 'Where reality bends to artistic will - fluid forms and cosmic energies dance across skin like the northern lights across Midgard\'s sky.'
  },
  { 
    id: 'ornamental', 
    title: 'Ornamental',
    description: 'Sacred geometry and divine patterns that honor the mathematical perfection hidden within nature\'s most beautiful designs.'
  },
  { 
    id: 'studio-bts', 
    title: 'Studio',
    description: 'Asgard Family Behind The Scenes'
  },
] as const

type CategoryId = typeof categories[number]['id']

// Mapping for URL category names to folder names (handles spaces and hyphens)
const categoryToFolderMapping: Record<string, string> = {
  'realism': 'realism',
  'fine-line': 'fine line',
  'norse': 'norse',
  'blackwork': 'blackwork',
  'neo-traditional': 'neo-traditional',
  'custom-fine-art': 'custom fine art',
  'abstract': 'abstract',
  'ornamental': 'ornamental',
  'studio-bts': 'studio-bts',
}

export default function Portfolio() {
  // 1️⃣ fetch all images from Supabase
  const { images, loading } = useImages()
  const location = useLocation()
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  const shouldUseMobile = isClient && (isMobile || isTablet)

  // 2️⃣ grab the ":category" param
  const { category } = useParams<{ category?: CategoryId }>()

  // Prevent scroll jump when switching categories
  React.useEffect(() => {
    // Only scroll to top if coming from a non-portfolio page
    const referrer = document.referrer;
    const isFromPortfolio = referrer.includes('/portfolio');
    
    if (!isFromPortfolio && !sessionStorage.getItem('portfolioNavigation')) {
      // First time visiting portfolio, allow normal scroll behavior
      return;
    }
    
    // Mark that we're navigating within portfolio
    sessionStorage.setItem('portfolioNavigation', 'true');
    
    // Clear the flag after a short delay
    setTimeout(() => {
      sessionStorage.removeItem('portfolioNavigation');
    }, 1000);
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-pulse text-metallic-gold text-xl mb-4">Loading portfolio...</div>
          <div className="w-16 h-16 border-4 border-metallic-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        <Footer />
      </div>
    )
  }

  // 3️⃣ Filter to only Portfolio images and derive main categories
  const allIds = categories.map((c) => c.id)
  
  // First, filter to only Portfolio images
  const portfolioImages = images
    .filter(img => img.url.includes('/Portfolio/'))
    .map(img => {
      // Extract main category from URL: /images/Portfolio/{main-category}/...
      const portfolioPath = img.url.split('/Portfolio/')[1]
      const folderName = portfolioPath?.split('/')[0] // This is the actual folder name with spaces
      
      // Find matching category ID by comparing folder names
      const categoryId = Object.entries(categoryToFolderMapping).find(
        ([key, folderPattern]) => folderName === folderPattern
      )?.[0]
      
      return {
        ...img,
        derivedMainCategory: categoryId
      }
    })
    .filter(img => img.derivedMainCategory && allIds.includes(img.derivedMainCategory as CategoryId))

  console.log('Portfolio images with derived categories:', portfolioImages.length)
  console.log('Sample images:', portfolioImages.slice(0, 3).map(img => ({ 
    url: img.url, 
    derivedMainCategory: img.derivedMainCategory 
  })))

  // 4️⃣ Apply main category filtering if specified
  let filtered: typeof portfolioImages

  if (category) {
    // Validate that the category exists in our allowed categories
    if (allIds.includes(category as CategoryId)) {
      // Filter by main category
      filtered = portfolioImages.filter((img) => img.derivedMainCategory === category)
      console.log(`Filtered to category "${category}":`, filtered.length)
    } else {
      // Invalid category, show all portfolio images
      filtered = portfolioImages
      console.log('Invalid category, showing all:', filtered.length)
    }
  } else {
    // No category specified, show all portfolio images
    filtered = portfolioImages
    console.log('No category filter, showing all:', filtered.length)
  }

  // 5️⃣ map to gallery format
  const galleryImages = filtered.map((r) => ({
    src: r.url,
    alt: r.description ?? `Tattoo artwork: ${r.file_name.replace(/-/g, " ").replace(/\.(jpg|jpeg|png|webp)$/i, "")}`,
    filename: r.file_name,
  }))

  console.log('Final gallery images:', galleryImages.length)

  // Find the current category for dynamic content
  const currentCategory = categories.find(cat => cat.id === category)

  // Build breadcrumb items - simplified for static hero
  const breadcrumbItems = [{ label: 'Portfolio' }]

  // Dynamic gallery header content
  const getGalleryTitle = () => {
    if (category && currentCategory) {
      return currentCategory.title
    }
    return 'Portfolio'
  }

  const getGalleryDescription = () => {
    if (category && currentCategory) {
      return currentCategory.description
    }
    return 'Behold the complete arsenal of Asgard\'s legendary artistry - every style, every technique, every story waiting to be carved into your skin.'
  }

  // YouTube video configuration for hero background
  const heroVideoUrl = "https://youtu.be/aySoSye9Lx8"; // Blog's video
  const heroVideoId = extractYouTubeId(heroVideoUrl);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />
      
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section with Thor/Loki Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Responsive Video Background */}
        <ResponsiveVideoBackground
          videoSource="https://youtu.be/aySoSye9Lx8"
          fallbackImage="/images/asgard-thor-loki-airbrush-wall.jpg"
          className="absolute inset-0"
        >
          {/* Content Container */}
          <div className="relative w-full h-full flex items-center justify-center px-4 py-20 md:py-24 mt-16 z-10">
            <div className="max-w-4xl w-full mx-auto text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-['Uncial_Antiqua'] text-metallic-gold mb-6 leading-tight drop-shadow-2xl portfolio-hero-title">
                Your Story Deserves A Masterpiece. Let's Ink It Today!
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 drop-shadow-lg max-w-3xl mx-auto font-cinzel portfolio-hero-text">
                Behold the legendary tattoos forged in the fires of Asgard. Each piece tells a tale of Norse mythology, Viking valor, and ancient runes that echo through the halls of eternity.
              </p>
              <Link
                to="/booking#form"
                className="inline-block cta-button bg-firebrick text-white font-bold py-4 px-8 rounded-md hover:bg-firebrick/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-firebrick/50 text-lg uppercase tracking-wider"
              >
                Book Your FREE Design Consult NOW
              </Link>
            </div>
          </div>
        </ResponsiveVideoBackground>

        {/* Bottom fade to black */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20" />
      </section>


      {/* Static Navigation - Now Below CTA */}
      <PortfolioNavigation
        categories={categories}
        currentCategory={category}
      />

      {/* Dynamic Gallery Header Section */}
      <section className="bg-black relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-cinzel text-metallic-gold mb-6 gallery-section-title">
              {getGalleryTitle()}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8 gallery-section-description">
              {getGalleryDescription()}
            </p>
            
            {/* Battle-Tested Ink Subtitle */}
            <div className="border-t border-b border-metallic-gold/30 py-6 max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-firebrick uppercase tracking-wider battle-tested-subtitle">
                Battle-Tested Ink
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-black relative z-10 pb-12">
        <div className="container mx-auto px-4">
          {galleryImages.length > 0 ? (
            <PortfolioGallery 
              images={galleryImages} 
              style={category}
            />
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-metallic-gold mb-4">No Artwork Found</h2>
              <p className="text-gray-300 mb-8">
                {category 
                  ? `We're currently updating our ${currentCategory?.title.toLowerCase()} gallery with fresh artwork.`
                  : "We're currently updating our portfolio with fresh artwork."
                }
              </p>
              <a 
                href="/booking" 
                className="inline-block bg-firebrick text-white font-bold py-3 px-6 rounded-md hover:bg-firebrick/90 transition-colors"
              >
                Book Your Session
              </a>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Custom styles for elegant text shadows */}
      <style jsx>{`
        .portfolio-hero-title {
          text-shadow: 3px 3px 15px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 0, 0, 0.6);
        }
        
        .portfolio-hero-text {
          text-shadow: 3px 3px 15px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 0, 0, 0.6), 1px 1px 5px rgba(0, 0, 0, 0.9);
        }

        .gallery-section-title {
          text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 0, 0, 0.3);
        }
        
        .gallery-section-description {
          text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.3);
        }

        .battle-tested-subtitle {
          text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6), 0 0 18px rgba(0, 0, 0, 0.3);
          letter-spacing: 0.15em;
        }

        /* Mobile optimizations for video background */
        @media (max-width: 768px) {
          .portfolio-hero-title {
            text-shadow: 3px 3px 18px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.7);
          }
          
          .portfolio-hero-text {
            text-shadow: 3px 3px 18px rgba(0, 0, 0, 0.85), 0 0 28px rgba(0, 0, 0, 0.65), 1px 1px 6px rgba(0, 0, 0, 0.95);
          }

          .gallery-section-title {
            text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 0, 0, 0.3);
          }
          
          .gallery-section-description {
            text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5), 0 0 12px rgba(0, 0, 0, 0.3);
          }

          .battle-tested-subtitle {
            text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 0, 0, 0.3);
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .gallery-section-title {
            text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6), 0 0 18px rgba(0, 0, 0, 0.3);
          }
          
          .gallery-section-description {
            text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.3);
          }

          .battle-tested-subtitle {
            text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6), 0 0 18px rgba(0, 0, 0, 0.3);
          }
        }

        /* Optimize text shadows for better readability */
        .drop-shadow-2xl {
          filter: drop-shadow(0 25px 25px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 20px rgba(212, 175, 55, 0.3));
        }
        
        .drop-shadow-lg {
          filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.6));
        }
      `}</style>
    </div>
  )
}