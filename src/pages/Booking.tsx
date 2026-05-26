import React, { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ContactForm } from '../components/ContactForm';
import { ResponsiveVideoBackground } from '../components/ResponsiveVideoBackground';
import { useTranslation } from '../i18n';

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
  const { t } = useTranslation();
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": t.booking.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  useEffect(() => {
    const scrollToForm = () => {
      if (formRef.current) {
        formRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    if (window.location.hash === '#form') {
      setTimeout(() => scrollToForm(), 500);
    }

    const handleHashChange = () => {
      if (window.location.hash === '#form') {
        setTimeout(() => scrollToForm(), 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      {/* Hero Section with Video Background */}
      <section className="relative w-full overflow-hidden flex items-center justify-center min-h-screen">
        <ResponsiveVideoBackground
          videoSource="https://youtu.be/dT-XxHU_USs"
          fallbackImage="/images/Viking-stone-blood-drawing.jpg"
          className="absolute inset-0 bg-black"
        >
          <div className="relative w-full h-full flex items-center justify-center px-4 py-20 md:py-24 mt-16 z-10 min-h-screen">
            <div className="max-w-4xl w-full mx-auto text-center">
              <h1 className="font-['Uncial_Antiqua'] text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-metallic-gold mb-4 md:mb-6 leading-tight booking-hero-title">
                {t.booking.heroTitle}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-cinzel booking-hero-text">
                {t.booking.heroSubtitle}
              </p>
            </div>
          </div>
        </ResponsiveVideoBackground>
      </section>

      {/* Enhanced Text Shadow Styles */}
      <style jsx>{`
        .booking-hero-title {
          text-shadow: 4px 4px 20px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.8), 2px 2px 8px rgba(0, 0, 0, 1);
        }
        .booking-hero-text {
          text-shadow: 3px 3px 15px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 0, 0, 0.7), 2px 2px 6px rgba(0, 0, 0, 0.9);
        }
        @media (max-width: 768px) {
          .booking-hero-title {
            text-shadow: 4px 4px 22px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 0, 0, 0.8), 2px 2px 8px rgba(0, 0, 0, 1);
          }
          .booking-hero-text {
            text-shadow: 3px 3px 18px rgba(0, 0, 0, 0.85), 0 0 28px rgba(0, 0, 0, 0.75), 2px 2px 7px rgba(0, 0, 0, 0.95);
          }
        }
      `}</style>

      {/* Booking Form Section */}
      <section ref={formRef} className="py-20 bg-black relative z-30" id="form">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-viking-navy p-8 rounded-lg shadow-[0_0_20px_rgba(30,58,95,0.5)]">
            <h2 className="text-3xl font-bold text-center mb-8 text-metallic-gold">{t.booking.formTitle}</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-viking-navy/20 relative z-30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-metallic-gold">
            {t.booking.faqTitle}
          </h2>
          <div className="max-w-2xl mx-auto">
            {t.booking.faq.map((item, index) => (
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
              {t.booking.ctaButton}
            </button>
            <p className="text-lg text-white/80 mt-4">
              {t.booking.ctaSubtext}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Booking;
