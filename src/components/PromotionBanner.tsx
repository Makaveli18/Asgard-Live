import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, Sparkles, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { currentPromotion } from '../data/promotion-config';
import { logEvent } from '../lib/analytics';

const WHATSAPP_NUMBER = '4915114386124';

function useCountdown(targetDate: string) {
  const deadline = new Date(targetDate + 'T00:00:00').getTime();

  const calcRemaining = () => {
    const diff = Math.max(0, deadline - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isExpired: diff <= 0,
    };
  };

  const [time, setTime] = useState(calcRemaining);

  useEffect(() => {
    const id = setInterval(() => setTime(calcRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function PromotionBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const countdown = useCountdown(currentPromotion.deadlineDate);

  const now = new Date();
  const deadline = new Date(currentPromotion.deadlineDate + 'T23:59:59');
  const isExpired = now > deadline;

  if (!currentPromotion.active || isExpired || countdown.isExpired) {
    if (currentPromotion.showComingSoon) {
      return (
        <section className="py-10 bg-viking-navy/20 border-y border-metallic-gold/10">
          <div className="container mx-auto px-4 text-center">
            <p className="text-metallic-gold/70 font-cinzel text-sm tracking-wider">
              Nachste Aktion kommt bald -- Stay tuned.
            </p>
          </div>
        </section>
      );
    }
    return null;
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(currentPromotion.ctaWhatsappMessage)}`;

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section ref={ref} className="py-16 md:py-20 bg-gradient-to-b from-black via-viking-navy/30 to-black border-y border-metallic-gold/20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-metallic-gold/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-firebrick/90 text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {currentPromotion.badge}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-metallic-gold mb-3 font-cinzel">
            {currentPromotion.title}
          </h2>
          <p className="text-center text-gray-300 mb-10 text-base md:text-lg">
            {currentPromotion.subtitle}
            {currentPromotion.artist && (
              <span className="text-metallic-gold font-semibold"> -- Nur bei {currentPromotion.artist}</span>
            )}
          </p>

          {/* Offer Card */}
          <div className="bg-black/70 border border-metallic-gold/30 rounded-xl p-6 md:p-8 shadow-[0_0_30px_rgba(212,175,55,0.05)]">
            {/* Price Tiers */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6">
              {currentPromotion.priceTiers.map((tier) => (
                <div key={tier.size} className="text-center bg-viking-navy/40 rounded-lg p-4 border border-metallic-gold/10">
                  <p className="text-gray-400 text-xs md:text-sm mb-1">{tier.size}</p>
                  <p className="text-metallic-gold text-xl md:text-2xl font-bold font-oswald">{tier.price}</p>
                </div>
              ))}
            </div>

            {/* Discount callout */}
            {currentPromotion.discount && (
              <div className="text-center mb-6 bg-firebrick/10 border border-firebrick/30 rounded-lg py-3 px-4">
                <p className="text-white font-bold text-lg">
                  {currentPromotion.discount}
                  {currentPromotion.discountNote && (
                    <span className="text-gray-300 font-normal text-sm ml-2">
                      {currentPromotion.discountNote}
                    </span>
                  )}
                </p>
              </div>
            )}

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {currentPromotion.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-xs bg-metallic-gold/10 border border-metallic-gold/20 text-metallic-gold px-3 py-1 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Countdown Timer */}
            <div className="mb-8">
              <p className="text-center text-gray-400 text-xs uppercase tracking-widest mb-4">Angebot endet in</p>
              <div className="flex items-center justify-center gap-2 md:gap-3">
                <CountdownBlock value={pad(countdown.days)} label="Tage" />
                <span className="text-metallic-gold/60 text-xl md:text-2xl font-light countdown-flicker-colon">:</span>
                <CountdownBlock value={pad(countdown.hours)} label="Std" />
                <span className="text-metallic-gold/60 text-xl md:text-2xl font-light countdown-flicker-colon">:</span>
                <CountdownBlock value={pad(countdown.minutes)} label="Min" />
                <span className="text-metallic-gold/60 text-xl md:text-2xl font-light countdown-flicker-colon">:</span>
                <CountdownBlock value={pad(countdown.seconds)} label="Sek" />
              </div>
            </div>

            {/* Deadline note */}
            <p className="text-center text-gray-500 text-xs mb-8">
              {currentPromotion.deadline}
            </p>

            {/* Dual CTA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => logEvent('Promotion', 'WhatsApp Click', currentPromotion.title)}
                className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3.5 px-6 rounded-md transition-all duration-300 hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5" />
                Per WhatsApp buchen
              </a>
              <Link
                to="/booking#form"
                onClick={() => logEvent('Promotion', 'Form Click', currentPromotion.title)}
                className="flex items-center justify-center gap-3 bg-transparent border-2 border-metallic-gold/50 text-metallic-gold hover:border-metallic-gold hover:bg-metallic-gold/5 font-bold py-3.5 px-6 rounded-md transition-all duration-300"
              >
                <Send className="w-5 h-5" />
                {currentPromotion.ctaFormText}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CountdownBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-black/80 border border-metallic-gold/20 rounded-lg px-3 py-2 md:px-4 md:py-3 min-w-[52px] md:min-w-[64px]">
        <span className="countdown-flicker text-2xl md:text-3xl font-bold font-oswald text-metallic-gold block text-center tabular-nums">
          {value}
        </span>
      </div>
      <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mt-1.5">{label}</span>
    </div>
  );
}
