import React from 'react'
import { useParams } from 'react-router-dom'
import { useImages } from '../hooks/useImages'
import { PortfolioGallery } from '../components/PortfolioGallery'
import { PortfolioNavigation } from '../components/PortfolioNavigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Breadcrumb } from '../components/Breadcrumb'
import { Link } from 'react-router-dom'
import { ResponsiveVideoBackground } from '../components/ResponsiveVideoBackground'
import { useTranslation } from '../i18n'

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
  const { t } = useTranslation()
  const { images, loading } = useImages()
  const { category } = useParams<{ category?: CategoryId }>()

  React.useEffect(() => {
    const referrer = document.referrer;
    const isFromPortfolio = referrer.includes('/portfolio');

    if (!isFromPortfolio && !sessionStorage.getItem('portfolioNavigation')) {
      return;
    }

    sessionStorage.setItem('portfolioNavigation', 'true');
    setTimeout(() => {
      sessionStorage.removeItem('portfolioNavigation');
    }, 1000);
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-pulse text-metallic-gold text-xl mb-4">{t.portfolio.loading}</div>
          <div className="w-16 h-16 border-4 border-metallic-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        <Footer />
      </div>
    )
  }

  const allIds = categories.map((c) => c.id)

  const portfolioImages = images.filter(
    img => img.category && allIds.includes(img.category as CategoryId)
  )

  let filtered: typeof portfolioImages

  if (category) {
    if (allIds.includes(category as CategoryId)) {
      filtered = portfolioImages.filter((img) => img.category === category)
    } else {
      filtered = portfolioImages
    }
  } else {
    filtered = portfolioImages
  }

  const galleryImages = filtered.map((r) => ({
    src: r.url,
    alt: r.description ?? `Tattoo artwork: ${r.file_name.replace(/-/g, " ").replace(/\.(jpg|jpeg|png|webp)$/i, "")}`,
    filename: r.file_name,
  }))

  const currentCategory = categories.find(cat => cat.id === category)

  const breadcrumbItems = [{ label: t.nav.portfolio }]

  const getGalleryTitle = () => {
    if (category && currentCategory) {
      return currentCategory.title
    }
    return t.portfolio.allPortfolio
  }

  const getGalleryDescription = () => {
    if (category && currentCategory) {
      return currentCategory.title
    }
    return t.portfolio.galleryDescription
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />

      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden flex items-center justify-center min-h-screen">
        <ResponsiveVideoBackground
          videoSource="https://youtu.be/aySoSye9Lx8"
          fallbackImage="/images/asgard-thor-loki-airbrush-wall.jpg"
          className="absolute inset-0"
        >
          <div className="relative w-full h-full flex items-center justify-center px-4 py-20 md:py-24 mt-16 z-10 min-h-screen">
            <div className="max-w-4xl w-full mx-auto text-center">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-['Uncial_Antiqua'] text-metallic-gold mb-4 md:mb-6 leading-tight drop-shadow-2xl portfolio-hero-title">
                {t.portfolio.heroTitle}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-8 drop-shadow-lg max-w-3xl mx-auto font-cinzel portfolio-hero-text">
                {t.portfolio.heroSubtitle}
              </p>
              <Link
                to="/booking#form"
                className="inline-block cta-button bg-firebrick text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-md hover:bg-firebrick/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-firebrick/50 text-sm md:text-lg uppercase tracking-wider"
              >
                {t.portfolio.heroCta}
              </Link>
            </div>
          </div>
        </ResponsiveVideoBackground>
      </section>

      {/* Navigation */}
      <PortfolioNavigation
        categories={categories}
        currentCategory={category}
      />

      {/* Dynamic Gallery Header */}
      <section className="bg-black relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-cinzel text-metallic-gold mb-6 gallery-section-title">
              {getGalleryTitle()}
            </h2>
            {!category && (
              <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8 gallery-section-description">
                {getGalleryDescription()}
              </p>
            )}

            <div className="border-t border-b border-metallic-gold/30 py-6 max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-firebrick uppercase tracking-wider battle-tested-subtitle">
                {t.portfolio.battleTested}
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
              <h2 className="text-2xl font-bold text-metallic-gold mb-4">{t.portfolio.noArtwork}</h2>
              <p className="text-gray-300 mb-8">
                {t.portfolio.noArtworkText}
              </p>
              <a
                href="/booking"
                className="inline-block bg-firebrick text-white font-bold py-3 px-6 rounded-md hover:bg-firebrick/90 transition-colors"
              >
                {t.portfolio.noArtworkCta}
              </a>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Custom styles */}
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
        @media (max-width: 768px) {
          .portfolio-hero-title {
            text-shadow: 3px 3px 18px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.7);
          }
          .portfolio-hero-text {
            text-shadow: 3px 3px 18px rgba(0, 0, 0, 0.85), 0 0 28px rgba(0, 0, 0, 0.65), 1px 1px 6px rgba(0, 0, 0, 0.95);
          }
        }
      `}</style>
    </div>
  )
}
