import React, { useEffect, useRef, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import Header from '../components/Header';
import Footer from '../components/Footer';
import valknutBg from '/images/ryan-crosby-valknut.jpg';
import imrePortrait from '/images/Imre-Portrait.png';
import { Link } from 'react-router-dom';
import { Star, Award, Users, Shield, Clock, Palette, Sword, Heart } from 'lucide-react';
import { useTranslation } from '../i18n';

function About() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const shouldUseMobile = isClient && (isMobile || isTablet);

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
            absolute inset-0 w-full h-full ${shouldUseMobile ? 'pt-24' : 'pt-32 md:pt-40'}
            transition-opacity duration-700
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div
            className={`absolute inset-x-0 ${shouldUseMobile ? 'top-[3rem]' : 'top-[4rem] md:top-[5rem]'} bottom-0 bg-center bg-no-repeat mx-auto max-w-[2000px] about-hero-bg`}
            style={{
              backgroundImage: `url(${valknutBg})`,
              backgroundSize: shouldUseMobile ? 'cover' : 'contain',
              backgroundPosition: shouldUseMobile ? 'center center' : 'center 15%',
              transform: 'scale(1.05)',
              willChange: 'transform',
              margin: '0 auto',
              maxHeight: 'calc(100vh - 6rem)',
            }}
            role="img"
            aria-label="Viking Valknut symbol background"
          />

          <div
            className={`absolute inset-0 bg-gradient-to-b ${shouldUseMobile ? 'from-black/85 via-black/60 to-black/85' : 'from-black/80 via-black/50 to-black/70'}`}
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>

        <div className="relative h-full flex items-center justify-center min-h-screen z-10">
          <div className="container mx-auto px-4 py-20 md:py-24 mt-16">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="
                text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                font-['Uncial_Antiqua'] text-metallic-gold
                leading-tight animate-fade-in drop-shadow-gold
                mb-4 md:mb-6 about-hero-title
              ">
                {t.about.heroTitle}
              </h1>
              <p className="
                text-base sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-8
                font-cinzel leading-relaxed max-w-3xl mx-auto about-hero-subtitle
              ">
                {t.about.heroSubtitle}
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
              {t.about.trustTitle}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.about.trustSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-black/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border-2 border-metallic-gold/30">
                <Users className="w-10 h-10 text-firebrick" />
              </div>
              <h3 className="text-2xl font-bold text-metallic-gold mb-2">{t.about.statWarriors}</h3>
              <p className="text-gray-300">{t.about.statWarriorsSub}</p>
            </div>

            <div className="text-center">
              <div className="bg-black/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border-2 border-metallic-gold/30">
                <Clock className="w-10 h-10 text-firebrick" />
              </div>
              <h3 className="text-2xl font-bold text-metallic-gold mb-2">{t.about.statYears}</h3>
              <p className="text-gray-300">{t.about.statYearsSub}</p>
            </div>

            <div className="text-center">
              <div className="bg-black/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border-2 border-metallic-gold/30">
                <Award className="w-10 h-10 text-firebrick" />
              </div>
              <h3 className="text-2xl font-bold text-metallic-gold mb-2">{t.about.statSatisfaction}</h3>
              <p className="text-gray-300">{t.about.statSatisfactionSub}</p>
            </div>

            <div className="text-center">
              <div className="bg-black/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border-2 border-metallic-gold/30">
                <Shield className="w-10 h-10 text-firebrick" />
              </div>
              <h3 className="text-2xl font-bold text-metallic-gold mb-2">{t.about.statLicensed}</h3>
              <p className="text-gray-300">{t.about.statLicensedSub}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-24">

            {/* Imre */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-[4/5] w-full max-w-[400px] mx-auto overflow-hidden rounded-lg border-3 border-metallic-gold/30 hover:border-metallic-gold transition-all duration-300 group">
                  <img
                    src={imrePortrait}
                    alt="Imre - Master Tattoo Artist bei Asgard Tattoo"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: 'center 40%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute -top-4 -right-4 bg-firebrick text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Master Artist
                </div>
                <div className="absolute -bottom-4 -left-4 bg-metallic-gold text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  5+ Jahre Erfahrung
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-metallic-gold mb-4">Imre</h2>
                  <p className="text-xl text-firebrick font-semibold mb-6">
                    {t.about.imreRole}
                  </p>
                </div>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p className="text-lg">
                    <strong className="text-metallic-gold">{t.about.imreBio1Bold}</strong>{' '}
                    {t.about.imreBio1}
                  </p>
                  <p>
                    {t.about.imreBio2}{' '}
                    <span className="text-metallic-gold font-semibold">{t.about.imreBio2Highlight}</span>{' '}
                    - Tattoos die nicht nur atemberaubend aussehen, sondern deine Geschichte erzahlen.
                  </p>
                  <p>
                    {t.about.imreBio3}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center space-x-3">
                    <Sword className="w-6 h-6 text-firebrick" />
                    <span className="text-metallic-gold font-semibold">Norse & Viking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Palette className="w-6 h-6 text-firebrick" />
                    <span className="text-metallic-gold font-semibold">Custom Realism</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="w-6 h-6 text-firebrick" />
                    <span className="text-metallic-gold font-semibold">Portraits</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-6 h-6 text-firebrick" />
                    <span className="text-metallic-gold font-semibold">Cover-ups</span>
                  </div>
                </div>
                <blockquote className="border-l-4 border-metallic-gold pl-6 py-4 bg-viking-navy/30 rounded-r-lg mt-8">
                  <p className="text-lg italic text-gray-300 mb-2">
                    "{t.about.imreQuote}"
                  </p>
                  <cite className="text-metallic-gold font-semibold">- Imre</cite>
                </blockquote>
              </div>
            </div>

            {/* Eszter */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative lg:order-2">
                <div className="aspect-[4/5] w-full max-w-[400px] mx-auto overflow-hidden rounded-lg border-3 border-metallic-gold/30 hover:border-metallic-gold transition-all duration-300 group">
                  <img
                    src="/images/WhatsApp_Image_2026-05-14_at_3.26.59_PM.jpeg"
                    alt="Eszter Rajo - Fine Line Artist bei Asgard Tattoo"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: 'center 20%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute -top-4 -left-4 lg:-left-auto lg:-right-4 bg-firebrick text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Fine Line Spezialistin
                </div>
                <div className="absolute -bottom-4 -right-4 lg:-right-auto lg:-left-4 bg-metallic-gold text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Grunderin
                </div>
              </div>

              <div className="space-y-6 lg:order-1">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-metallic-gold mb-4">Eszter</h2>
                  <p className="text-xl text-firebrick font-semibold mb-6">
                    {t.about.eszterRole}
                  </p>
                </div>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p className="text-lg">
                    <strong className="text-metallic-gold">{t.about.eszterBio1Bold}</strong>{' '}
                    {t.about.eszterBio1}
                  </p>
                  <p>
                    {t.about.eszterBio2}{' '}
                    <span className="text-metallic-gold font-semibold">{t.about.eszterBio2Highlight}</span>.
                    Stammkunden, Erstlinge, treue Gesichter - alle, die langst Teil dieser Gemeinschaft geworden sind.
                  </p>
                  <p>
                    {t.about.eszterBio3}{' '}
                    <span className="text-metallic-gold font-semibold">{t.about.eszterBio3Highlight}</span>{' '}
                    - Motive die mit Prazision und Feingefuhl gestochen werden und durch ihre Zartheit bestechen.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center space-x-3">
                    <Palette className="w-6 h-6 text-firebrick" />
                    <span className="text-metallic-gold font-semibold">Fine Line</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-6 h-6 text-firebrick" />
                    <span className="text-metallic-gold font-semibold">Dotwork</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="w-6 h-6 text-firebrick" />
                    <span className="text-metallic-gold font-semibold">Custom Design</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Sword className="w-6 h-6 text-firebrick" />
                    <span className="text-metallic-gold font-semibold">Ornamental</span>
                  </div>
                </div>
                <blockquote className="border-l-4 border-metallic-gold pl-6 py-4 bg-viking-navy/30 rounded-r-lg mt-8">
                  <p className="text-lg italic text-gray-300 mb-2">
                    "{t.about.eszterQuote}"
                  </p>
                  <cite className="text-metallic-gold font-semibold">- Eszter</cite>
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
              {t.about.differenceTitle}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-black/50 p-6 rounded-lg border border-metallic-gold/30">
                <h3 className="text-xl font-bold text-metallic-gold mb-4">{t.about.diff1Title}</h3>
                <p className="text-gray-300">{t.about.diff1Text}</p>
              </div>

              <div className="bg-black/50 p-6 rounded-lg border border-metallic-gold/30">
                <h3 className="text-xl font-bold text-metallic-gold mb-4">{t.about.diff2Title}</h3>
                <p className="text-gray-300">{t.about.diff2Text}</p>
              </div>

              <div className="bg-black/50 p-6 rounded-lg border border-metallic-gold/30">
                <h3 className="text-xl font-bold text-metallic-gold mb-4">{t.about.diff3Title}</h3>
                <p className="text-gray-300">{t.about.diff3Text}</p>
              </div>

              <div className="bg-black/50 p-6 rounded-lg border border-metallic-gold/30">
                <h3 className="text-xl font-bold text-metallic-gold mb-4">{t.about.diff4Title}</h3>
                <p className="text-gray-300">{t.about.diff4Text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-metallic-gold mb-12">
            {t.about.testimonialsTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-viking-navy/30 p-6 rounded-lg border border-metallic-gold/30">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-metallic-gold" fill="#D4AF37" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">"{t.about.testimonial1}"</p>
              <p className="text-metallic-gold font-semibold">- Alex</p>
            </div>

            <div className="bg-viking-navy/30 p-6 rounded-lg border border-metallic-gold/30">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-metallic-gold" fill="#D4AF37" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">"{t.about.testimonial2}"</p>
              <p className="text-metallic-gold font-semibold">- Lara</p>
            </div>

            <div className="bg-viking-navy/30 p-6 rounded-lg border border-metallic-gold/30">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-metallic-gold" fill="#D4AF37" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">"{t.about.testimonial3}"</p>
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
              {t.about.journeyTitle}
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              {t.about.journeySubtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-firebrick text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                <h3 className="text-xl font-bold text-metallic-gold mb-2">{t.about.step1Title}</h3>
                <p className="text-gray-300">{t.about.step1Text}</p>
              </div>

              <div className="text-center">
                <div className="bg-firebrick text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                <h3 className="text-xl font-bold text-metallic-gold mb-2">{t.about.step2Title}</h3>
                <p className="text-gray-300">{t.about.step2Text}</p>
              </div>

              <div className="text-center">
                <div className="bg-firebrick text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                <h3 className="text-xl font-bold text-metallic-gold mb-2">{t.about.step3Title}</h3>
                <p className="text-gray-300">{t.about.step3Text}</p>
              </div>

              <div className="text-center">
                <div className="bg-firebrick text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">4</div>
                <h3 className="text-xl font-bold text-metallic-gold mb-2">{t.about.step4Title}</h3>
                <p className="text-gray-300">{t.about.step4Text}</p>
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
              {t.about.ctaTitle}
            </h2>
            <p className="text-xl mb-8 text-gray-300 leading-relaxed">
              {t.about.ctaText}
            </p>

            <div className="space-y-6">
              <Link
                to="/booking#form"
                className="cta-button bg-firebrick text-white font-bold py-4 md:py-5 px-8 md:px-12 rounded-md transition-all duration-300 text-lg uppercase tracking-wider inline-block w-full max-w-2xl mx-auto text-center hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-firebrick/50"
              >
                {t.about.ctaButton}
              </Link>

              <div className="bg-viking-navy/30 border border-metallic-gold/30 rounded-lg p-6 max-w-2xl mx-auto">
                <p className="text-white text-lg">
                  {t.about.ctaPromise}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-firebrick/5 to-transparent"></div>
      </section>

      <Footer />

      {/* Enhanced responsive styles */}
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
        @media (max-width: 768px) {
          .about-hero-bg {
            background-position: center 80% !important;
            background-size: contain !important;
            transform: scale(0.75) !important;
          }
          .about-header-buffer { height: 220px !important; }
          .about-hero-title { text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 0, 0, 0.3); }
          .about-hero-subtitle { text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5), 0 0 12px rgba(0, 0, 0, 0.3); }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .about-hero-bg {
            background-position: center 70% !important;
            background-size: contain !important;
            transform: scale(0.85) !important;
          }
          .about-header-buffer { height: 200px !important; }
        }
        @media (min-width: 1025px) {
          .about-hero-bg {
            background-position: center 60% !important;
            background-size: contain !important;
            transform: scale(0.95) !important;
          }
          .about-header-buffer { height: 180px !important; }
        }
      `}</style>
    </div>
  );
}

export default About;
