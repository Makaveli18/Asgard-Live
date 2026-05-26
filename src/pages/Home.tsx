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
import { ResponsiveVideoBackground } from '../components/ResponsiveVideoBackground';
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

function ServiceCard({ icon, title, price, description, artists, onClick }) {
  return (
    <div
      className="service-card bg-black/50 p-5 rounded-lg border border-metallic-gold/30 hover:border-metallic-gold cursor-pointer w-full max-w-[300px] min-h-[200px] flex flex-col"
      onClick={onClick}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-metallic-gold service-underline">{title}</h3>
      <p className="text-firebrick font-semibold mb-2">{price}</p>
      <p className="text-gray-300 mb-3 flex-grow">{description}</p>
      {artists && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {artists.map((artist) => (
            <span key={artist} className="text-xs bg-metallic-gold/10 border border-metallic-gold/30 text-metallic-gold px-2 py-0.5 rounded-full">
              {artist}
            </span>
          ))}
        </div>
      )}
      {title === "Airbrush Painting" ? (
        <Link to="/booking#form" className="text-sm text-metallic-gold hover:text-firebrick transition-colors mt-auto">
          Anfragen →
        </Link>
      ) : (
        <Link to="/portfolio" className="text-sm text-metallic-gold hover:text-firebrick transition-colors mt-auto">
          Portfolio ansehen →
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
        {/* Responsive Video Background */}
        <ResponsiveVideoBackground
          videoSource="https://youtu.be/-OJpeMwcj1w"
          fallbackImage={vikingBackground}
          className="absolute inset-0"
        >
          {/* Content Container */}
          <div className="relative w-full h-full flex items-center justify-center px-4 py-20 md:py-24 mt-16 z-10">
            <div className="max-w-4xl w-full mx-auto text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black animate-fade-in text-metallic-gold leading-tight mb-4 md:mb-6 hero-title">
                Landshuts bestes Tattoo Studio. Deine Geschichte, auf ewig verewigt.
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl subtitle text-gray-100 mb-6 md:mb-12 mx-auto max-w-3xl">
                Norse, Fine Line, Realism & Custom Design - individuell gezeichnet, meisterhaft gestochen.
              </p>
              <div className="flex flex-col items-center space-y-4 md:space-y-8">
                <Link
                  to="/booking#form"
                  className="cta-button bg-firebrick text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-md transition-all duration-300 text-sm md:text-lg uppercase tracking-wider w-full max-w-lg mx-auto"
                >
                  Kostenlose Beratung anfragen
                </Link>
                <div className="disclaimer-box bg-black/60 backdrop-blur-sm border border-metallic-gold/30 text-white py-3 md:py-4 px-4 md:px-6 rounded-lg w-full max-w-xl mx-auto">
                  <p className="text-xs md:text-sm font-semibold">
                    Jede Beratung und Design-Planung ist komplett kostenlos. Null Risiko, volle Kreativpower.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ResponsiveVideoBackground>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-viking-navy/90">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 leading-relaxed">
            Stell dir vor, du stehst vor dem Spiegel und siehst endlich das Tattoo, das du dir immer gewunscht hast - perfekt gestochen, ohne Kompromisse. Genau das machen wir bei Asgard.
          </p>
        </div>
      </section>

      {/* Image Auto-Slider Section */}
      <ImageAutoSlider />

      {/* Testimonials (formerly Warriors' Tales) */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-metallic-gold">Das sagen unsere Kunden</h2>
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
              <h3 className="text-xl font-bold mb-2">Lizenziert & Zertifiziert</h3>
              <p className="text-gray-300">Hochste Hygienestandards</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-12 h-12 text-metallic-gold mb-4" />
              <h3 className="text-xl font-bold mb-2">Preisgekronte Kunstler</h3>
              <p className="text-gray-300">Anerkannte Expertise</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 text-metallic-gold mb-4" />
              <h3 className="text-xl font-bold mb-2">1000+ zufriedene Kunden</h3>
              <p className="text-gray-300">Vertrauen & Qualitat</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section (formerly Our Sacred Arts) */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-metallic-gold">Unsere Tattoo-Stile</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 justify-items-center mx-auto max-w-7xl">
            <ServiceCard
              icon={<Sword className="w-8 h-8 text-firebrick" />}
              title="Norse & Viking Style"
              price="Ab 150€"
              description="Die Kraft nordischer Symbole, prazise gestochen - Runen, Gottheiten und Krieger-Motive fur dein Erbe."
              artists={["Imre"]}
              onClick={() => setSelectedService('viking')}
            />
            <ServiceCard
              icon={<FineLineIcon />}
              title="Fine Line"
              price="Ab 100€"
              description="Filigrane Linien, maximale Wirkung. Zarte Motive mit klarer Asthetik und feinstem Detail."
              artists={["Eszter"]}
              onClick={() => setSelectedService('fine-line')}
            />
            <ServiceCard
              icon={<RealismIcon />}
              title="Realism"
              price="Ab 200€"
              description="Fotorealistische Portraits und Motive, die jedes Detail mit beeindruckender Prazision einfangen."
              artists={["Imre"]}
              onClick={() => setSelectedService('realism')}
            />
            <ServiceCard
              icon={<CustomDesignIcon />}
              title="Custom Design"
              price="Ab 130€"
              description="Deine Vision, unsere Expertise. Gemeinsam entwickeln wir ein Unikat, das deine Geschichte erzahlt."
              artists={["Imre", "Eszter"]}
              onClick={() => setSelectedService('custom')}
            />
            <ServiceCard
              icon={<AirbrushIcon />}
              title="Airbrush Painting"
              price="Preis auf Anfrage"
              description="Grossflachige Wandkunst und Custom-Designs - epische Murals, die Raume verwandeln."
              artists={["Imre"]}
              onClick={() => setSelectedService('airbrush')}
            />
          </div>

          {/* Services Disclaimer */}
          <div className="mt-12 bg-black/40 backdrop-blur-sm border border-metallic-gold/20 text-white py-3 px-6 rounded-lg max-w-2xl mx-auto">
            <p className="text-center text-lg font-semibold italic">
              <span className="text-metallic-gold">Jede Beratung und Design-Planung ist komplett kostenlos</span>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-viking-navy relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-metallic-gold">
            Warum Durchschnitt, wenn Meisterwerk geht?
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl mb-8 text-gray-300 leading-relaxed">
              Uber 1000 zufriedene Kunden vertrauen auf Asgard. Ob Full-Sleeve, feines Fineline-Motiv oder Custom-Design nach deiner Vorlage - bei uns bekommst du keine Massenware, sondern ein Unikat fur die Ewigkeit.
            </p>
            <div className="space-y-4">
              <Link
                to="/booking#form"
                className="cta-button bg-firebrick text-white font-bold py-4 md:py-5 px-8 md:px-12 rounded-md transition-all duration-300 text-lg uppercase tracking-wider inline-block w-full max-w-2xl mx-auto text-center"
              >
                Jetzt kostenlose Beratung sichern
              </Link>
              <p className="text-metallic-gold font-semibold text-lg">
                Beratung & Design-Planung immer gratis. Schreib uns jetzt.
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
            <h2 className="text-3xl font-bold text-center mb-8 text-metallic-gold">Termin anfragen</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;