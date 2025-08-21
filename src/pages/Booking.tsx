import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown, Clock, Shield, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ContactForm } from '../components/ContactForm';
import { ResponsiveVideoBackground } from '../components/ResponsiveVideoBackground';

const FAQ_ITEMS = [
  {
    question: "How much does a tattoo cost?",
    answer: "Tattoo prices vary based on size, complexity, and time required. Our minimum charge is €80. Small pieces typically range from €150-300, while larger pieces and full-day sessions start from €600. We'll provide a detailed quote during your consultation."
  },
  {
    question: "How do I prepare for my appointment?",
    answer: "Get a good night's sleep, eat a proper meal before coming in, stay hydrated, and avoid alcohol 24 hours before your session. Wear comfortable clothing that provides easy access to the tattoo area. If you're feeling unwell, please let us know to reschedule."
  },
  {
    question: "Pain Levels According to Body Area",
    answer: "Pain tolerance varies by person, but generally:\n- Least painful: Outer arms, calves, thighs\n- Moderate: Inner arms, forearms, back\n- More sensitive: Ribs, ankles, hands\n- Most sensitive: Head, inner elbows, knees\nOur experienced artists will guide you through the process and ensure your comfort."
  }
];

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-metallic-gold/30">
      <button
        className="w-full py-4 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-metallic-gold font-bold">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-firebrick transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <p className="text-gray-300 whitespace-pre-line">{answer}</p>
      </div>
    </div>
  );
};

function Booking() {
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true });

  useEffect(() => {
    // Handle hash navigation with proper timing
    const scrollToForm = () => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    // Check for hash on mount
    if (window.location.hash === '#form') {
      setTimeout(() => {
        scrollToForm();
      }, 500); // Longer delay to ensure everything is rendered
    }

    // Listen for hash changes
    const handleHashChange = () => {
      if (window.location.hash === '#form') {
        setTimeout(() => {
          scrollToForm();
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />

      {/* Hero Section */}
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ResponsiveVideoBackground
          videoUrl="/Asgard_Booking_HeroBackground.mp4"
          fallbackImage="/images/Viking-stone-blood-drawing.jpg"
          className="absolute inset-0"
        >
          <div className="relative w-full h-full flex items-center justify-center px-4 py-32 md:py-40 mt-24 z-10">
            <div className="max-w-4xl w-full mx-auto text-center">
              <h1 className="font-['Uncial_Antiqua'] text-4xl md:text-6xl lg:text-7xl text-metallic-gold mb-6 leading-tight booking-hero-title">
                Lock In Your Next Masterpiece
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-cinzel booking-hero-text">
                Join the ranks of warriors who've trusted us with their stories. Your legend awaits.
              </p>
            </div>
          </div>
        </ResponsiveVideoBackground>
      </section>

      {/* Enhanced Text Shadow Styles for Better Readability */}
      <style jsx>{`
        .booking-hero-title {
          text-shadow: 3px 3px 15px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 0, 0, 0.6), 1px 1px 5px rgba(0, 0, 0, 0.9);
        }
        
        .booking-hero-text {
          text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 0, 0, 0.5), 1px 1px 4px rgba(0, 0, 0, 0.8);
        }

        /* Mobile optimizations for better text readability */
        @media (max-width: 768px) {
          .booking-hero-title {
            text-shadow: 3px 3px 18px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.7), 1px 1px 6px rgba(0, 0, 0, 0.95);
          }
          
          .booking-hero-text {
            text-shadow: 2px 2px 15px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 0, 0, 0.6), 1px 1px 5px rgba(0, 0, 0, 0.9);
          }
        }
      `}</style>

      {/* Booking Form Section */}
      <section ref={formRef} className="py-20 bg-black relative z-30" id="form">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-viking-navy p-8 rounded-lg shadow-[0_0_20px_rgba(30,58,95,0.5)]">
            <h2 className="text-3xl font-bold text-center mb-8 text-metallic-gold">Book Your Session</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-viking-navy/20 relative z-30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-metallic-gold">
            Pre-Booking FAQ
          </h2>
          <div className="max-w-2xl mx-auto">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Pre-footer Section */}
      <section className="py-12 bg-viking-navy relative z-30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={scrollToForm}
              className="cta-button bg-firebrick text-white font-bold py-4 px-8 rounded-md transition-all duration-300 inline-flex items-center justify-center space-x-2 w-full md:w-auto"
            >
              Embrace Your Hero's Journey - Secure Your Spot NOW
            </button>
            <p className="text-lg text-white/80 mt-4">
              The best tattoos come to those who book first. Don't wait!
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Booking;