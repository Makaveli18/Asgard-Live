import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Facebook, 
  Mail,
  Star,
  MapPin,
  Phone,
  Clock,
  Shield,
  Award,
  Users,
  ExternalLink,
  Sword,
  Pen,
  Image as ImageIcon,
  Palette,
  Brush
} from 'lucide-react';
import vikingBackground from '/images/Viking-stone-blood-drawing.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ContactForm } from '../components/ContactForm';
import { ImageAutoSlider } from '../components/ui/image-auto-slider';
import { VideoBackground } from '../components/VideoBackground';
import { extractYouTubeId } from '../utils/videoHelpers';

// Service Icons Components
const FineLineIcon = () => (
  <Pen className="w-8 h-8 text-firebrick" />
);

const RealismIcon = () => (
  <ImageIcon className="w-8 h-8 text-firebrick" />
);

const CustomDesignIcon = () => (
  <Palette className="w-8 h-8 text-firebrick" />
);

const AirbrushIcon = () => (
  <Brush className="w-8 h-8 text-firebrick" />
);

function ServiceCard({ icon, title, price, description, onClick }) {
  return (
    <div 
      className="service-card bg-black/50 p-5 rounded-lg border border-metallic-gold/30 hover:border-metallic-gold cursor-pointer w-full max-w-[300px] min-h-[200px] flex flex-col"
      onClick={onClick}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-metallic-gold service-underline">{title}</h3>
      <p className="text-firebrick font-semibold mb-2">{price}</p>
      <p className="text-gray-300 mb-4 flex-grow">{description}</p>
      {title === "Airbrush Painting" ? (
        <Link to="/booking#form" className="text-sm text-metallic-gold hover:text-firebrick transition-colors mt-auto">
          Learn More →
        </Link>
      ) : (
        <Link to="/portfolio" className="text-sm text-metallic-gold hover:text-firebrick transition-colors mt-auto">
          Learn More →
        </Link>
      )}
    </div>
  );
}

function TestimonialCard({ text, author, rating, reviewUrl }) {
  return (
    <div className="bg-viking-navy/30 p-6 rounded-lg border border-metallic-gold/30">
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-metallic-gold" fill="#D4AF37" />
        ))}
      </div>
      <p className="text-gray-300 mb-4 italic">"{text}"</p>
      <a 
        href={reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center text-metallic-gold hover:text-firebrick transition-colors"
      >
        {author}
        <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
    </div>
  );
}

function Home() {
  const [selectedService, setSelectedService] = useState(null);

  // YouTube video configuration
  const heroVideoUrl = "https://youtu.be/-OJpeMwcj1w"; // Your video
  const heroVideoId = extractYouTubeId(heroVideoUrl);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />
      
      {/* Hero Section with Video Background */}
      <section className="relative w-full overflow-hidden flex items-center justify-center min-h-screen">
        {/* Video Background */}
        <VideoBackground
          youtubeId={heroVideoId}
          fallbackImage={vikingBackground}
          autoplay={true}
          showControls={false}
          className="absolute inset-0"
        >
          {/* Content Container */}
          <div className="relative w-full h-full flex items-center justify-center px-4 py-32 md:py-40 mt-24 z-10">
            <div className="max-w-4xl w-full mx-auto text-center">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black animate-fade-in text-metallic-gold leading-tight mb-6 hero-title">
                Unleash Your Inner Warrior – Your Next Battle Mark Awaits
              </h1>
              <p className="text-base sm:text-lg md:text-xl subtitle text-gray-100 mb-12 mx-auto max-w-3xl">
                The Best Tattoo Studio in Landshut, Trusted by Thousands of Warriors To Tell Their Tales Through Our Sacred Arts
              </p>
              <div className="flex flex-col items-center space-y-8">
                <Link 
                  to="/booking#form" 
                  className="cta-button bg-firebrick text-white font-bold py-4 md:py-5 px-8 md:px-12 rounded-md transition-all duration-300 text-lg uppercase tracking-wider w-full max-w-lg mx-auto"
                >
                  DM us NOW to Secure Your Spot
                </Link>
                <div className="disclaimer-box bg-black/60 backdrop-blur-sm border border-metallic-gold/30 text-white py-4 px-6 rounded-lg w-full max-w-xl mx-auto">
                  <p className="text-sm font-semibold">
                    🔥 Only 3 Spots Left This Month! Don't let someone else get the tattoo you've been dreaming of. Skip the regret of saying "I should have booked" 🔥
                  </p>
                </div>
              </div>
            </div>
          </div>
        </VideoBackground>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-viking-navy/90">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 leading-relaxed">
            Imagine standing in front of the mirror, seeing the ink you've dreamed of etched perfectly on your skin. No second-guessing. No regrets. Just a piece of art that tells your story. That's what we do at Asgard.
          </p>
        </div>
      </section>

      {/* Image Auto-Slider Section */}
      <ImageAutoSlider />

      {/* Testimonials (formerly Warriors' Tales) */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-metallic-gold">Warriors' Tales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              text="I got my first tattoo here and I couldn't be happier with the result! The atmosphere was very welcoming and professional. The artist took the time to understand exactly what I wanted and made sure I was comfortable throughout the whole process. The end result exceeded my expectations. I highly recommend this studio to anyone looking to get a tattoo!"
              author="Lex"
              rating={5}
              reviewUrl="https://g.co/kgs/ZFH6gdn"
            />
            <TestimonialCard
              text="Amazing experience from start to finish! The artists are incredibly talented and take their time to ensure everything is perfect. The studio is clean and well-maintained, and the staff is friendly and professional. They really listened to what I wanted and delivered exactly that. Will definitely be coming back for my next piece!"
              author="Sebastian S."
              rating={5}
              reviewUrl="https://g.co/kgs/fb1RRZs"
            />
            <TestimonialCard
              text="Absolutely incredible tattoo studio! The attention to detail and professionalism is outstanding. They made me feel completely at ease and walked me through the entire process. The artwork is stunning and healing beautifully. If you're looking for quality work and great service, this is definitely the place to go!"
              author="Astrid"
              rating={5}
              reviewUrl="https://g.co/kgs/HX7iGMa"
            />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-viking-navy">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 text-metallic-gold mb-4" />
              <h3 className="text-xl font-bold mb-2">Licensed & Certified</h3>
              <p className="text-gray-300">Highest safety standards</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-12 h-12 text-metallic-gold mb-4" />
              <h3 className="text-xl font-bold mb-2">Award-Winning Artists</h3>
              <p className="text-gray-300">Recognized expertise</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 text-metallic-gold mb-4" />
              <h3 className="text-xl font-bold mb-2">1000+ Happy Body Art Lovers</h3>
              <p className="text-gray-300">Trust & satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section (formerly Our Sacred Arts) */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-metallic-gold">Our Sacred Arts</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 justify-items-center mx-auto max-w-7xl">
            <ServiceCard 
              icon={<Sword className="w-8 h-8 text-firebrick" />}
              title="Norse & Viking Style"
              price="From 150€"
              description="Harness the power of ancient symbols with our Norse & Viking tattoos, meticulously crafted to honor your legacy."
              onClick={() => setSelectedService('viking')}
            />
            <ServiceCard 
              icon={<FineLineIcon />}
              title="Fine Line"
              price="From 100€"
              description="Delicate artistry that speaks volumes, perfect for those seeking subtle yet powerful statements."
              onClick={() => setSelectedService('fine-line')}
            />
            <ServiceCard 
              icon={<RealismIcon />}
              title="Realism"
              price="From 200€"
              description="Breathtaking photorealistic designs that capture every detail with unparalleled precision."
              onClick={() => setSelectedService('realism')}
            />
            <ServiceCard 
              icon={<CustomDesignIcon />}
              title="Custom Design"
              price="From 130€"
              description="Your vision, our expertise. Together we'll create a unique piece that tells your story."
              onClick={() => setSelectedService('custom')}
            />
            <ServiceCard 
              icon={<AirbrushIcon />}
              title="Airbrush Painting"
              price="Price on Request"
              description="Epic large-scale murals and custom artwork that transforms walls into legendary battlefields of artistic expression."
              onClick={() => setSelectedService('airbrush')}
            />
          </div>

          {/* Services Disclaimer */}
          <div className="mt-12 bg-black/40 backdrop-blur-sm border border-metallic-gold/20 text-white py-3 px-6 rounded-lg max-w-2xl mx-auto">
            <p className="text-center text-lg font-semibold italic">
              🔥 <span className="text-metallic-gold">EVERY Consultation and Design Planning is Absolutely FREE</span> 🔥
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-viking-navy relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-metallic-gold">
            Why Settle For Average Ink?
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl mb-8 text-gray-300 leading-relaxed">
              Every studio can slap a name on a sign, but Asgard is different. Our work speaks for itself. Over 500 warriors have entrusted us with their skin. From legendary full sleeves to sacred symbols, Asgard tattoos aren't just ink—they're battle marks for life.
            </p>
            <div className="space-y-4">
              <Link 
                to="/booking#form"
                className="cta-button bg-firebrick text-white font-bold py-4 md:py-5 px-8 md:px-12 rounded-md transition-all duration-300 text-lg uppercase tracking-wider inline-block w-full max-w-2xl mx-auto text-center"
              >
                Secure Your Spot NOW Before It's Gone!
              </Link>
              <p className="text-metallic-gold font-semibold text-lg animate-pulse">
                Only 3 Spots Left For This Month - And They're Filling Fast.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </section>

      {/* Booking Form Section */}
      <section className="py-20 bg-black" id="form">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-viking-navy p-8 rounded-lg shadow-[0_0_20px_rgba(30,58,95,0.5)]">
            <h2 className="text-3xl font-bold text-center mb-8 text-metallic-gold">Book Your Session</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;