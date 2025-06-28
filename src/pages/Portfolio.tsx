import React from 'react'
import { useParams } from 'react-router-dom'
import { useImages, ImageRecord } from '../hooks/useImages'
import { PortfolioGallery } from '../components/PortfolioGallery'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Breadcrumb } from '../components/Breadcrumb'

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

export default function Portfolio() {
  // 1️⃣ fetch all images from Supabase
  const { images, loading } = useImages()

  // 2️⃣ grab the ":category" param (if any)
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

  // 3️⃣ Filter images by category if specified, otherwise show all
  let filtered: ImageRecord[]
  
  if (category) {
    // Validate that the category exists in our allowed categories
    const allIds = categories.map((c) => c.id)
    if (allIds.includes(category as CategoryId)) {
      // Filter by the real category column
      filtered = images.filter((img) => img.category === category)
    } else {
      // Invalid category, show all images
      filtered = images
    }
  } else {
    // No category specified, show all images
    filtered = images
  }

  // 4️⃣ map ImageRecord → { src, alt, filename }
  const galleryImages = filtered.map((r: ImageRecord) => ({
    src: r.url,
    alt: r.description ?? `Tattoo artwork: ${r.file_name.replace(/-/g, " ").replace(/\.(jpg|jpeg|png|webp)$/i, "")}`,
    filename: r.file_name,
  }))

  // Find the current category title for breadcrumbs
  const currentCategory = categories.find(cat => cat.id === category)
  const pageTitle = currentCategory ? currentCategory.title : 'Portfolio'

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />
      
      <Breadcrumb 
        items={category ? [
          { label: 'Portfolio', href: '/portfolio' }, 
          { label: currentCategory?.title || category }
        ] : [
          { label: 'Portfolio' }
        ]} 
      />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-cinzel text-metallic-gold mb-4">
            {pageTitle}
          </h1>
          {category && (
            <p className="text-gray-300 text-lg">
              Explore our {currentCategory?.title.toLowerCase()} tattoo artwork
            </p>
          )}
          {!category && (
            <p className="text-gray-300 text-lg">
              Discover our complete collection of tattoo artwork across all styles
            </p>
          )}
        </div>

        {galleryImages.length > 0 ? (
          <PortfolioGallery images={galleryImages} style={category} />
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
      </main>

      <Footer />
    </div>
  )
}