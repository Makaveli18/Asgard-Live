import React from 'react'
import { useParams } from 'react-router-dom'
import { useImages, ImageRecord } from '../hooks/useImages'
import { PortfolioGallery } from '../components/PortfolioGallery'
import { PortfolioNavigation } from '../components/PortfolioNavigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Breadcrumb } from '../components/Breadcrumb'
import { Link } from 'react-router-dom'

// your static category metadata
const categories = [
  { id: 'realism', title: 'Realism' },
  { id: 'fine-line', title: 'Fine Line' },
  { id: 'norse', title: 'Norse & Viking' },
  { id: 'blackwork', title: 'Blackwork' },
  { id: 'neo-traditional', title: 'Neo-Traditional' },
  { id: 'custom-fine-art', title: 'Custom Fine Art' },
  { id: 'abstract', title: 'Abstract' },
  { id: 'ornamental', title: 'Ornamental' },
  { id: 'studio-bts', title: 'Studio' },
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

  // 2️⃣ grab the ":category" param
  const { category } = useParams<{ category?: CategoryId }>()

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

  // Find the current category title for breadcrumbs
  const currentCategory = categories.find(cat => cat.id === category)

  // Build breadcrumb items - simplified for static hero
  const breadcrumbItems = [{ label: 'Portfolio' }]

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />
      
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section with Thor/Loki Background */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(/images/asgard-thor-loki-airbrush-wall.jpg)`,
              backgroundSize: 'contain',
              backgroundPosition: 'center 75%',
              backgroundRepeat: 'no-repeat',
            }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 text-center py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-cinzel text-metallic-gold mb-6 leading-tight drop-shadow-2xl portfolio-hero-title">
              Your Story Deserves A Masterpiece. Let's Ink It Today!
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 drop-shadow-lg max-w-3xl mx-auto portfolio-hero-text">
              Behold the legendary tattoos forged in the fires of Asgard. Each piece tells a tale of Norse mythology, Viking valor, and ancient runes that echo through the halls of eternity.
            </p>
          </div>
        </div>

        {/* Bottom fade to black */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20" />
      </section>

      {/* CTA Section - Transparent like Homepage */}
      <section className="py-12 bg-black/60 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/booking"
              className="inline-block cta-button bg-firebrick text-white font-bold py-4 px-8 rounded-md hover:bg-firebrick/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-firebrick/50 text-lg uppercase tracking-wider"
            >
              Book Your FREE Design Consult NOW
            </Link>
            <p className="text-metallic-gold font-semibold text-lg mt-4 animate-pulse">
              💥 Limited Spots Available - Secure Yours Today!
            </p>
          </div>
        </div>
      </section>

      {/* Static Navigation - Now Below CTA */}
      <PortfolioNavigation
        categories={categories}
        currentCategory={category}
      />

      {/* Gallery Section */}
      <section className="bg-black relative z-10 py-12">
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

      {/* Custom styles for responsive background and text shadows */}
      <style jsx>{`
        /* Enhanced Text Shadows for Maximum Readability */
        .portfolio-hero-title {
          text-shadow: 
            3px 3px 0px #000000,
            -3px -3px 0px #000000,
            3px -3px 0px #000000,
            -3px 3px 0px #000000,
            0px 3px 0px #000000,
            3px 0px 0px #000000,
            0px -3px 0px #000000,
            -3px 0px 0px #000000,
            6px 6px 10px #000000,
            0 0 20px #000000;
        }
        
        .portfolio-hero-text {
          text-shadow: 
            2px 2px 0px #000000,
            -2px -2px 0px #000000,
            2px -2px 0px #000000,
            -2px 2px 0px #000000,
            0px 2px 0px #000000,
            2px 0px 0px #000000,
            0px -2px 0px #000000,
            -2px 0px 0px #000000,
            4px 4px 8px #000000,
            0 0 15px #000000;
        }

        /* Responsive Background Optimization to Show Full Image */
        @media (max-width: 768px) {
          [style*="background-image"] {
            background-size: contain !important;
            background-position: center 85% !important;
          }
          
          .portfolio-hero-title {
            text-shadow: 
              2px 2px 0px #000000,
              -2px -2px 0px #000000,
              2px -2px 0px #000000,
              -2px 2px 0px #000000,
              4px 4px 8px #000000,
              0 0 15px #000000;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          [style*="background-image"] {
            background-size: contain !important;
            background-position: center 80% !important;
          }
        }
        
        @media (min-width: 1025px) {
          [style*="background-image"] {
            background-size: contain !important;
            background-position: center 75% !important;
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