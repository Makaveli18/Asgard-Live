import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown, Clock, Shield, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ContactForm } from '../components/ContactForm';

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
    if (window.location.hash === '#form') {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />

      {/* Hero Section - Black Background */}
      <section className="relative min-h-screen overflow-hidden flex items-center bg-black">
        {/* Header Space Buffer */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-black z-0"></div>
        
        {/* Black background with subtle texture */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-viking-navy/10 to-black"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-32 md:py-40 mt-24">
          <h1 className="font-['Pirata_One'] text-4xl md:text-6xl lg:text-7xl text-metallic-gold mb-6 leading-tight">
            Lock In Your Next Masterpiece
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Join the ranks of warriors who've trusted us with their stories. Your legend awaits.
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section ref={formRef} className="py-20 bg-black relative z-10" id="booking">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-viking-navy p-8 rounded-lg shadow-[0_0_20px_rgba(30,58,95,0.5)]">
            <h2 className="text-3xl font-bold text-center mb-8 text-metallic-gold">Book Your Session</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-viking-navy/20 relative z-10">
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
      <section className="py-12 bg-viking-navy relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <button 
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