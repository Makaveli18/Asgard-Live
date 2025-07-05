import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import valknutBg from '/images/ryan-crosby-valknut.jpg';
import imrePortrait from '/images/Imre-Portrait.png';
import { Link } from 'react-router-dom';
import { Star, Award, Users, Shield, Clock, Palette, Sword, Heart } from 'lucide-react';

function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const translateY = Math.min(scrolled * 0.5, 100);
        heroRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = valknutBg;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-40 bg-black z-30 about-header-buffer"></div>
        
        <div 
          ref={heroRef}
          className={`
            absolute inset-0 w-full h-full pt-32 md:pt-40
            transition-opacity duration-700
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div
            className="absolute inset-x-0 top-[4rem] md:top-[5rem] bottom-0 bg-center bg-no-repeat mx-auto max-w-[2000px] about-hero-bg"
            style={{
              backgroundImage: `url(${valknutBg})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center 15%',
              transform: 'scale(1.05)',
              willChange: 'transform',
              margin: '0 auto',
              maxHeight: 'calc(100vh - 6rem)',
            }}
            role="img"
            aria-label="Viking Valknut symbol background"
          />
          
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/70"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>
        
        <div className="relative h-full flex items-center justify-center min-h-screen z-10">
          <div className="container mx-auto px-4 py-32 md:py-40 mt-24">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="
                text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                font-['Uncial_Antiqua'] text-metallic-gold
                leading-tight
                animate-fade-in
                drop-shadow-gold
                mb-6
                about-hero-title
              ">
                Meet The Legends Behind Your Next Masterpiece
              </h1>
              <p className="
                text-xl md:text-2xl text-gray-200 mb-8 
                font-cinzel leading-relaxed max-w-3xl mx-auto
                about-hero-subtitle
              ">
                Every warrior needs a trusted ally. Every story needs a master storyteller. 
                At Asgard, you don't just get a tattoo—you join a brotherhood forged in ink and honor.
              </p>
            </div>
          </div>
        </div>

        {!imageLoaded && (
          <div className="absolute inset-0 bg-viking-navy/90 flex items-center justify-center">
            <div className="animate-pulse text-metallic-gold">Loading...</div>
          </div>
        )}
      </section>

      {/* Trust & Credibility Section */}
      <section className="py-16 bg-viking-navy/90">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-metallic-gold mb-6">
              Why Landshut's Warriors Choose Asgard
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're not just another tattoo shop. We're the guardians of your story, 
              the architects of your legend, and the family you never knew you needed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-black/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border-2 border-metallic-gold/30">
                <Users className="w-10 h-10 text-firebrick" />
              </div>
              <h3 className="text-2xl font-bold text-metallic-gold mb-2">1000+</h3>
              <p className="text-gray-300">Warriors Marked</p>
            </div>
            
            <div className="text-center">
              <div className="bg-black/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border-2 border-metallic-gold/30">
                <Clock className="w-10 h-10 text-firebrick" />
              </div>
              <h3 className="text-2xl font-bold text-metallic-gold mb-2">5+</h3>
              <p className="text-gray-300">Years of Mastery</p>
            </div>
            
            <div className="text-center">
              <div className="bg-black/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border-2 border-metallic-gold/30">
                <Award className="w-10 h-10 text-firebrick" />
              </div>
              <h3 className="text-2xl font-bold text-metallic-gold mb-2">100%</h3>
              <p className="text-gray-300">Satisfaction Rate</p>
            </div>
            
            <div className="text-center">
              <div className="bg-black/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border-2 border-metallic-gold/30">
                <Shield className="w-10 h-10 text-firebrick" />
              </div>
              <h3 className="text-2xl font-bold text-metallic-gold mb-2">Licensed</h3>
              <p className="text-gray-300">& Certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Master Artist Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Artist Image */}
              <div className="relative">
                <div className="aspect-[4/5] w-full max-w-[400px] mx-auto overflow-hidden rounded-lg border-3 border-metallic-gold/30 hover:border-metallic-gold transition-all duration-300 group">
                  <img
                    src={imrePortrait}
                    alt="Imre - Master Tattoo Artist at Asgard Tattoo"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: 'center 40%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Floating Achievement Badges */}
                <div className="absolute -top-4 -right-4 bg-firebrick text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Master Artist
                </div>
                <div className="absolute -bottom-4 -left-4 bg-metallic-gold text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  5+ Years Experience
                </div>
              </div>

              {/* Artist Story */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-metallic-gold mb-4">
                    Meet Imre
                  </h2>
                  <p className="text-xl text-firebrick font-semibold mb-6">
                    Master Artist & Founder of Asgard Tattoo
                  </p>
                </div>

                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p className="text-lg">
                    <strong className="text-metallic-gold">Every legend has an origin story.</strong> 
                    Imre's began not with a needle, but with a vision—to create a sanctuary where 
                    art meets soul, where stories become eternal, and where every client leaves 
                    not just with ink, but with a piece of their true self.
                  </p>
                  
                  <p>
                    With over 5 years of mastering the sacred arts of tattooing, Imre has transformed 
                    thousands of blank canvases into living masterpieces. His specialty? 
                    <span className="text-metallic-gold font-semibold"> Norse mythology, Viking symbolism, and custom realism</span> 
                    that doesn't just look incredible - it tells your story.
                  </p>
                  
                  <p>
                    But here's what sets Imre apart: <em>He doesn't just tattoo you.  He listens to you.</em> 
                    Every consultation is a journey of discovery, where your vision meets his expertise 
                    to create something that's uniquely, powerfully, undeniably <strong>you</strong>.
                  </p>
                </div>

                {/* Specialties */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center space-x-3">
                    <Sword className="w-6 h-6 text-firebrick" />
                    <span className="text-metallic-gold font-semibold">Norse & Viking Art</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Palette className="w-6 h-6 text-firebrick" />
                    <span className="text-metallic-gold font-semibold">Custom Realism</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="w-6 h-6 text-firebrick" />
                    <span className="text-metallic-gold font-semibold">Portrait Work</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-6 h-6 text-firebrick" />
                    <span className="text-metallic-gold font-semibold">Cover-ups</span>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="border-l-4 border-metallic-gold pl-6 py-4 bg-viking-navy/30 rounded-r-lg mt-8">
                  <p className="text-lg italic text-gray-300 mb-2">
                    "Every tattoo is a conversation between the client's soul and my needle. 
                    My job isn't just to create art - it's to help you discover the warrior within."
                  </p>
                  <cite className="text-metallic-gold font-semibold">- Imre, Master Artist</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Asgard Difference */}
      <section className="py-20 bg-viking-navy/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-metallic-gold mb-8">
              The Asgard Difference: Why We're Not Like Other Studios
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-black/50 p-6 rounded-lg border border-metallic-gold/30">
                <h3 className="text-xl font-bold text-metallic-gold mb-4">🎯 Your Vision, Perfected</h3>
                <p className="text-gray-300">
                  We don't do cookie-cutter flash art. Every piece is custom-designed through 
                  deep consultation, ensuring your tattoo is as unique as your fingerprint.
                </p>
              </div>
              
              <div className="bg-black/50 p-6 rounded-lg border border-metallic-gold/30">
                <h3 className="text-xl font-bold text-metallic-gold mb-4">🛡️ Family, Not Just Clients</h3>
                <p className="text-gray-300">
                  From your first consultation to your final touch-up, you're part of the Asgard family. 
                  We're here for life - your tattoo journey doesn't end when you leave our chair.
                </p>
              </div>
              
              <div className="bg-black/50 p-6 rounded-lg border border-metallic-gold/30">
                <h3 className="text-xl font-bold text-metallic-gold mb-4">⚔️ Legendary Craftsmanship</h3>
                <p className="text-gray-300">
                  Every line, every shade, every detail is executed with the precision of a master craftsman. 
                  We don't just create tattoos - we forge legends.
                </p>
              </div>
              
              <div className="bg-black/50 p-6 rounded-lg border border-metallic-gold/30">
                <h3 className="text-xl font-bold text-metallic-gold mb-4">🔥 Zero Compromise on Quality</h3>
                <p className="text-gray-300">
                  Premium inks, sterile environment, cutting-edge equipment. We invest in the best 
                  because your skin deserves nothing less than perfection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-metallic-gold mb-12">
            What Our Warriors Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-viking-navy/30 p-6 rounded-lg border border-metallic-gold/30">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-metallic-gold" fill="#D4AF37" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">
                "Imre didn't just give me a tattoo - he gave me a piece of art that tells my story. 
                The attention to detail and the way he listened to my vision was incredible."
              </p>
              <p className="text-metallic-gold font-semibold">- Alex</p>
            </div>
            
            <div className="bg-viking-navy/30 p-6 rounded-lg border border-metallic-gold/30">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-metallic-gold" fill="#D4AF37" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">
                "I spent months looking for the right artist, afraid of making a bad decision. The moment I walked into Asgard, I knew I was in the right place. My tattoo isn't just ink - it's a legendary story I carry for life."
              </p>
              <p className="text-metallic-gold font-semibold">- Lara</p>
            </div>
            
            <div className="bg-viking-navy/30 p-6 rounded-lg border border-metallic-gold/30">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-metallic-gold" fill="#D4AF37" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">
                "The Norse sleeve Imre created for me is a masterpiece. People stop me on the street 
                to ask about it. This is art that will last a lifetime."
              </p>
              <p className="text-metallic-gold font-semibold">- David</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey Section */}
      <section className="py-20 bg-viking-navy/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-metallic-gold mb-8">
              Your Journey to Legendary Ink
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Every masterpiece follows a sacred process. Here's how we transform your vision into reality:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-firebrick text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold text-metallic-gold mb-2">Consultation</h3>
                <p className="text-gray-300">
                  We listen to your story, understand your vision, and begin crafting your unique design.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-firebrick text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold text-metallic-gold mb-2">Design</h3>
                <p className="text-gray-300">
                  Custom artwork created specifically for you - no templates, no shortcuts, just pure artistry.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-firebrick text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold text-metallic-gold mb-2">Creation</h3>
                <p className="text-gray-300">
                  The magic happens as your vision comes to life through masterful technique and artistry.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-firebrick text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  4
                </div>
                <h3 className="text-xl font-bold text-metallic-gold mb-2">Legacy</h3>
                <p className="text-gray-300">
                  You leave with more than ink - you carry a piece of art that tells your story forever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-metallic-gold">
              Ready to Join the Asgard Family?
            </h2>
            <p className="text-xl mb-8 text-gray-300 leading-relaxed">
              Your story is waiting to be told. Your legend is ready to be carved. 
              The only question is: <strong className="text-metallic-gold">Are you ready to become legendary?</strong>
            </p>
            
            <div className="space-y-6">
              <Link 
                to="/booking#form"
                className="cta-button bg-firebrick text-white font-bold py-4 md:py-5 px-8 md:px-12 rounded-md transition-all duration-300 text-lg uppercase tracking-wider inline-block w-full max-w-2xl mx-auto text-center hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-firebrick/50"
              >
                🔥 Book Your FREE Consultation NOW
              </Link>
              
              <p className="text-metallic-gold font-semibold text-lg animate-pulse">
                Only 3 Spots Left This Month - Your Legend Can't Wait!
              </p>
              
              <div className="bg-viking-navy/30 border border-metallic-gold/30 rounded-lg p-6 max-w-2xl mx-auto">
                <p className="text-white text-lg">
                  <strong className="text-metallic-gold">🛡️ The Asgard Promise:</strong> 
                  Every consultation is completely FREE. No pressure, no obligation - just pure creative collaboration 
                  to bring your vision to life.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-firebrick/5 to-transparent"></div>
      </section>

      <Footer />
      
      {/* Enhanced responsive styles with elegant text shadows */}
      <style jsx>{`
        .about-hero-title {
          text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 0, 0, 0.3);
        }
        
        .about-hero-subtitle {
          text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.3);
        }
        
        .about-header-buffer {
          background: linear-gradient(to bottom, #000000 0%, #000000 70%, transparent 100%);
        }
        
        /* Mobile: Maximum zoom-out for full context with better clearance */
        @media (max-width: 768px) {
          .about-hero-bg {
            background-position: center 80% !important;
            background-size: contain !important;
            transform: scale(0.75) !important;
          }
          
          .about-header-buffer {
            height: 220px !important;
          }
          
          .about-hero-title {
            text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 0, 0, 0.3);
          }
          
          .about-hero-subtitle {
            text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5), 0 0 12px rgba(0, 0, 0, 0.3);
          }
        }
        
        /* Tablet: Balanced view with improved positioning */
        @media (min-width: 769px) and (max-width: 1024px) {
          .about-hero-bg {
            background-position: center 70% !important;
            background-size: contain !important;
            transform: scale(0.85) !important;
          }
          
          .about-header-buffer {
            height: 200px !important;
          }
          
          .about-hero-title {
            text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6), 0 0 18px rgba(0, 0, 0, 0.3);
          }
          
          .about-hero-subtitle {
            text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.3);
          }
        }
        
        /* Desktop: Proper positioning below header with full clearance */
        @media (min-width: 1025px) {
          .about-hero-bg {
            background-position: center 60% !important;
            background-size: contain !important;
            transform: scale(0.95) !important;
          }
          
          .about-header-buffer {
            height: 180px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default About;