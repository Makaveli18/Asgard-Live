import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { isMobile, isTablet } from 'react-device-detect';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Asgard Tattoo Blog",
  "description": "Expert tattoo tips, Norse symbolism insights, and local tattoo guides from Landshut's premier tattoo studio.",
  "publisher": {
    "@type": "Organization",
    "name": "Asgard Tattoo",
    "logo": {
      "@type": "ImageObject",
      "url": "https://asgardtattoo.com/logo.png"
    }
  }
};

const blogPosts = [
  {
    title: "The Meaning Behind Norse Symbols in Tattoos — And Why They Belong on Your Skin",
    preview: "Explore the ancient meanings of Norse symbols like Vegvisir, Helm of Awe, Valknut, and more. Find the one that speaks to your story — and wear it with pride.",
    image: "/images/Blog/vegvisir.jpg",
    alt: "Norse Vegvisir symbol tattoo design",
    slug: "norse-symbols-tattoo-meanings"
  },
  {
    title: "How to Choose the Right Tattoo Artist (Without Getting Ink You'll Regret)",
    preview: "You don't just wake up and decide to let someone ink you for life without doing your homework — or at least, you shouldn't. Learn how to find the perfect artist for your next piece.",
    image: "/images/Imre-Portrait.png",
    alt: "Professional tattoo artist working in studio",
    slug: "how-to-choose-the-right-tattoo-artist-landshut"
  },
  {
    title: "Best Custom Tattoo Artists Near Me? Landshut's #1 Studio Breaks the Mold",
    preview: "Searching for the best custom tattoo artists near Landshut? Discover why Asgard Tattoo stands at the top with jaw-dropping, story-driven ink.",
    image: "/images/IMG_20250305_124656.jpg",
    alt: "Custom tattoo design process",
    slug: "best-custom-tattoo-artists-landshut"
  },
  {
    title: "Tattoo Aftercare: 7 Mistakes That Can Ruin Your Ink (Don't Be That Guy)",
    preview: "Don't let your new tattoo fade, blur, or get infected. Here are the 7 biggest aftercare mistakes and how to avoid them.",
    image: "/images/Infected-tattoo.jpg",
    alt: "Tattoo aftercare guide",
    slug: "tattoo-aftercare-mistakes"
  }
];

function Blog() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const shouldUseMobile = isClient && (isMobile || isTablet);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BlogSchema) }}
      />

      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Static Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(/images/asgard-thor-loki-airbrush-wall.jpg)`,
              backgroundSize: shouldUseMobile ? 'cover' : 'contain',
              backgroundPosition: shouldUseMobile ? 'center center' : 'center 75%',
              backgroundRepeat: 'no-repeat',
            }}
          />
          {/* Dark overlay for text readability */}
          <div className={`absolute inset-0 bg-gradient-to-b ${shouldUseMobile ? 'from-black/85 via-black/65 to-black/85' : 'from-black/70 via-black/50 to-black/80'}`} />
        </div>

        <div className="container mx-auto px-4 relative z-20 py-20 md:py-24 mt-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Uncial_Antiqua'] text-metallic-gold mb-4 md:mb-8 leading-tight blog-hero-title">
              Tattoo Stories, Viking Symbols & Ink Wisdom From the Best Tattoo Studio in Landshut
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white mb-6 md:mb-12 font-cinzel leading-relaxed max-w-3xl mx-auto blog-hero-text">
              From aftercare secrets to Norse meanings and custom ink inspiration - this is where warriors learn before they burn. Every blog post is handcrafted by the artists at Asgard Tattoo to guide your journey, one drop of ink at a time.
            </p>
            <Link
              to="/booking#form"
              className="inline-block cta-button bg-firebrick text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-md hover:bg-firebrick/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-firebrick/50 text-sm md:text-lg blog-hero-button"
            >
              Book Your Free Design Consult NOW
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-cinzel text-metallic-gold text-center mb-12">
            Tattoo Tips, Norse Symbols & Local Legends
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post, index) => (
              <article 
                key={index}
                className="bg-viking-navy/20 rounded-lg overflow-hidden border border-metallic-gold/30 hover:border-metallic-gold transition-all duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.alt}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: post.slug === 'how-to-choose-the-right-tattoo-artist-landshut' ? 'center 40%' : 'center'
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-metallic-gold mb-4">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {post.preview}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-firebrick hover:text-metallic-gold transition-colors"
                  >
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-viking-navy/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-metallic-gold mb-6">
             💥 Want a Viking-Inspired Masterpiece?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Only 6 Spots Left This Month!
            </p>
            <Link
              to="/booking#form"
              className="cta-button bg-firebrick text-white font-bold py-4 px-8 rounded-md transition-all duration-300 inline-flex items-center justify-center space-x-2"
            >
              Book Your Session Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Enhanced Text Shadow Styles for Static Background Readability */}
      <style jsx>{`
        .blog-hero-title {
          text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 0, 0, 0.3);
        }
        
        .blog-hero-text {
          text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.3);
        }
        
        .blog-hero-button {
          text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6);
        }

        /* Responsive Background Optimization to Show Full Image */
        @media (max-width: 768px) {
          [style*="background-image"] {
            background-size: contain !important;
            background-position: center 85% !important;
          }
          
          .blog-hero-title {
            text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 0, 0, 0.3);
          }
          
          .blog-hero-text {
            text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5), 0 0 12px rgba(0, 0, 0, 0.3);
          }
          
          .blog-hero-button {
            text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6);
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          [style*="background-image"] {
            background-size: contain !important;
            background-position: center 80% !important;
          }

          .blog-hero-title {
            text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6), 0 0 18px rgba(0, 0, 0, 0.3);
          }
          
          .blog-hero-text {
            text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.3);
          }

          .blog-hero-button {
            text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6);
          }
        }
        
        @media (min-width: 1025px) {
          [style*="background-image"] {
            background-size: contain !important;
            background-position: center 75% !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Blog;