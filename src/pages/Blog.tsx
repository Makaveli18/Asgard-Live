import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BlogSchema) }}
      />

      {/* Hero Section - Enhanced for All Devices */}
      <section className="relative min-h-screen flex items-center bg-black overflow-hidden">
        {/* Extended Header Buffer - Prevents background cutoff */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-black z-30 blog-header-buffer"></div>
        
        <div className="absolute inset-0 blog-hero-bg bg-cover bg-center opacity-15"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/80" />
        
        <div className="container mx-auto px-4 relative z-10 py-32 md:py-40 mt-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-cinzel text-metallic-gold mb-8 leading-tight">
              Tattoo Stories, Viking Symbols & Ink Wisdom From the Best Tattoo Studio in Landshut
            </h1>
            <p className="text-lg md:text-xl text-[#F5F5F5] mb-12 font-light leading-relaxed max-w-3xl mx-auto">
              From aftercare secrets to Norse meanings and custom ink inspiration — this is where warriors learn before they burn. Every blog post is handcrafted by the artists at Asgard Tattoo to guide your journey, one drop of ink at a time.
            </p>
            <Link
              to="/booking#form"
              className="inline-block cta-button bg-firebrick text-white font-bold py-4 px-8 rounded-md hover:bg-firebrick/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-firebrick/50 text-lg"
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
              Book Your Session Today. Only 3 Spots Left This Month!
            </p>
            <Link
              to="/booking"
              className="cta-button bg-firebrick text-white font-bold py-4 px-8 rounded-md transition-all duration-300 inline-flex items-center justify-center space-x-2"
            >
              Book Your Session Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Enhanced responsive styles with better header clearance */}
      <style jsx>{`
        .blog-header-buffer {
          background: linear-gradient(to bottom, #000000 0%, #000000 70%, transparent 100%);
        }
        
        .blog-hero-bg {
          background-image: url('/images/Mountain3.jpg');
        }
        
        /* Mobile: Better clearance and positioning */
        @media (max-width: 768px) {
          .blog-hero-bg {
            background-position: center 70% !important;
            background-size: cover !important;
            transform: scale(0.95) !important;
          }
          
          .blog-header-buffer {
            height: 200px !important;
          }
        }
        
        /* Tablet: Improved positioning */
        @media (min-width: 769px) and (max-width: 1024px) {
          .blog-hero-bg {
            background-position: center 60% !important;
            background-size: cover !important;
            transform: scale(0.98) !important;
          }
          
          .blog-header-buffer {
            height: 180px !important;
          }
        }
        
        /* Desktop: Optimal positioning with proper clearance */
        @media (min-width: 1025px) {
          .blog-hero-bg {
            background-position: center 50% !important;
            background-size: cover !important;
            transform: scale(1.0) !important;
          }
          
          .blog-header-buffer {
            height: 160px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Blog;