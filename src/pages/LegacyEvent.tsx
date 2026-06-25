import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, PenTool, CheckCircle2, Shield, Clock, Star, Send, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { logEvent } from '../lib/analytics';

const WHATSAPP_NUMBER = '4915114386124';

function LegacyEvent() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLDivElement>(null);
  const proofRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);

  const proofInView = useInView(proofRef, { once: true, margin: '-100px' });
  const processInView = useInView(processRef, { once: true, margin: '-100px' });
  const offerInView = useInView(offerRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(key => {
      const val = params.get(key);
      if (val) utm[key] = val;
    });
    setUtmParams(utm);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');

    const formData = new FormData(e.currentTarget);
    const honeypot = formData.get('website') as string;
    if (honeypot) {
      setFormState('success');
      return;
    }

    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      tattoo_idea: formData.get('tattoo_idea') as string || null,
      source: 'legacy-event',
      utm_source: utmParams.utm_source || null,
      utm_medium: utmParams.utm_medium || null,
      utm_campaign: utmParams.utm_campaign || null,
      utm_content: utmParams.utm_content || null,
    };

    try {
      const { error } = await supabase.from('campaign_leads').insert([data]);
      if (error) throw error;
      setFormState('success');
      logEvent('Campaign', 'Legacy Lead Submit', data.utm_campaign || 'direct');
    } catch (err) {
      console.error('Error submitting lead:', err);
      setFormState('error');
    }
  };

  const whatsappMessage = encodeURIComponent(
    'Hi! Ich habe euer 6-Jahres Legacy Event gesehen und mochte eine kostenlose Tattoo-Planungs-Session buchen.'
  );

  const portfolioImages = [
    '/images/Portfolio/realism/portraits/hyperrealistic-queen-of-earth-elephant-afro-sleeve-tattoo.jpg',
    '/images/Portfolio/ornamental/realism-dotwork/ornamental-back-floral-mandala-dotwork-realism-tattoo.jpg',
    '/images/Portfolio/norse/realistic-portraits/ragnar-realism-viking-side-torso-finished.jpg',
    '/images/Portfolio/custom fine art/calf-cheetah-heart-tree-geometric-fine-line-tattoo.jpg',
    '/images/Portfolio/neo-traditional/mythic/neo-traditional-archangel-michael-arm-tattoo1.jpg',
    '/images/Portfolio/realism/animals/realism-gorilla-sleeve-tattoo-with-geometry.jpg',
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-x-hidden">
      {/* Minimal Header - Logo only */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-metallic-gold/10">
        <div className="container mx-auto px-4 py-3 flex justify-center">
          <img
            src="/SVG/Asgard_Logo.svg"
            alt="Asgard Tattoo"
            className="h-10 drop-shadow-gold"
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col pt-20 px-4">
        <div className="absolute inset-0 z-0 bg-black" />
        <div className="absolute inset-0 z-[1] flex items-center justify-center overflow-hidden">
          <img
            src="/images/Paint-Brushed_Wall.jpg"
            alt="Asgard Tattoo Studio - Thor & Loki Airbrush Mural"
            className="w-full h-full object-contain object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-[2]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-3xl mx-auto text-center flex-1 flex flex-col items-center justify-center pb-16"
        >
          <p className="text-metallic-gold font-cinzel text-sm md:text-base tracking-[0.2em] uppercase mb-6">
            6 Jahre Asgard Tattoo
          </p>
          <h1 className="font-['Uncial_Antiqua'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
            style={{ textShadow: '3px 3px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)' }}
          >
            Du hast die Vision.<br />
            <span className="text-metallic-gold">Wir machen sie richtig.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-4 font-lora leading-relaxed"
            style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.8)' }}
          >
            Kostenlose Tattoo-Planung. Design-Anpassungen bis zur Perfektion.
            Erst wenn du sicher bist, geht es los.
          </p>
          <p className="text-sm text-gray-400 mb-10">
            Limitierte Platze bis 13. Juli 2026
          </p>
          <button
            onClick={scrollToForm}
            className="cta-button bg-firebrick text-white font-bold py-4 px-10 rounded-md text-lg inline-flex items-center gap-3"
          >
            <MessageCircle className="w-5 h-5" />
            Jetzt Planungs-Session sichern
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <ChevronDown className="w-6 h-6 text-metallic-gold/60 animate-bounce" />
        </motion.div>
      </section>

      {/* Certainty Strip */}
      <section className="py-16 md:py-20 bg-viking-navy/40 border-y border-metallic-gold/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center text-2xl md:text-3xl text-metallic-gold mb-4">
              Kein Risiko. Kein Druck. Nur dein Tattoo.
            </h2>
            <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
              Die meisten bereuen nicht ihr Tattoo. Sie bereuen, dass sie es ubereilt haben.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-metallic-gold/10 border border-metallic-gold/30 flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-metallic-gold" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Erzahl uns deine Idee</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Egal ob klare Vision oder vages Gefuhl - wir horen zu und beraten dich ehrlich.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-metallic-gold/10 border border-metallic-gold/30 flex items-center justify-center">
                  <PenTool className="w-7 h-7 text-metallic-gold" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Wir designen bis es sitzt</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Anpassungen, Korrekturen, Neuanfange - kostenlos, bis du sagst: "Das ist es."
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-metallic-gold/10 border border-metallic-gold/30 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-metallic-gold" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Erst dann startet die Nadel</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Du siehst dein fertiges Design auf der Haut, bevor wir anfangen. Keine Uberraschungen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Gallery */}
      <section ref={proofRef} className="py-16 md:py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={proofInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl text-metallic-gold mb-3">
              6 Jahre. 1.000+ Geschichten.
            </h2>
            <p className="text-gray-400">Jede einzelne begann mit einem Gesprach.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
            {portfolioImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={proofInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="aspect-[3/4] overflow-hidden rounded-lg"
              >
                <img
                  src={img}
                  alt={`Asgard Tattoo Arbeit ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section with BTS imagery */}
      <section ref={processRef} className="py-16 md:py-20 bg-viking-navy/30 border-y border-metallic-gold/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-center text-2xl md:text-3xl text-metallic-gold mb-4">
              So lauft dein Weg zum perfekten Tattoo
            </h2>
            <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
              Von der ersten Nachricht bis zum fertigen Werk - transparent, planbar, stressfrei.
            </p>

            <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-4 md:gap-6">
              {[
                { step: '01', title: 'Nachricht schreiben', desc: 'WhatsApp oder Formular - sag uns was du dir vorstellst.' },
                { step: '02', title: 'Kostenlose Planung', desc: 'Wir besprechen Stil, Grosse, Platzierung und Budget.' },
                { step: '03', title: 'Design sehen', desc: 'Du bekommst dein Design vorab und wir passen an, bis es perfekt ist.' },
                { step: '04', title: 'Session buchen', desc: 'Erst wenn du 100% sicher bist, vereinbaren wir den Termin.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  className="relative bg-black/50 border border-metallic-gold/20 rounded-lg p-6 text-center"
                >
                  <span className="text-4xl font-bold text-metallic-gold/20 font-oswald absolute top-3 right-4">
                    {item.step}
                  </span>
                  <h3 className="text-white font-bold mb-2 mt-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-metallic-gold/80 mt-10 text-sm italic">
              "Die Nadel startet erst, wenn du 100% zufrieden bist."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-viking-navy/50 border border-metallic-gold/10 rounded-lg p-6">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-metallic-gold fill-metallic-gold" />
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-4 italic">
                "Von der Beratung bis zum fertigen Tattoo - alles war perfekt geplant. Ich wusste genau, was mich erwartet."
              </p>
              <p className="text-metallic-gold text-xs font-bold">- Marco S.</p>
            </div>
            <div className="bg-viking-navy/50 border border-metallic-gold/10 rounded-lg p-6">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-metallic-gold fill-metallic-gold" />
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-4 italic">
                "Ich hatte Angst vor meinem ersten Tattoo. Die haben sich so viel Zeit genommen - null Druck, mega Ergebnis."
              </p>
              <p className="text-metallic-gold text-xs font-bold">- Lisa K.</p>
            </div>
            <div className="bg-viking-navy/50 border border-metallic-gold/10 rounded-lg p-6">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-metallic-gold fill-metallic-gold" />
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-4 italic">
                "Drei Entwurfe bekommen, bis mein Armel perfekt war. Professioneller geht es nicht."
              </p>
              <p className="text-metallic-gold text-xs font-bold">- Daniel R.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Anniversary Offer Box */}
      <section ref={offerRef} className="py-16 md:py-20 bg-viking-navy/40 border-y border-metallic-gold/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={offerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="text-metallic-gold font-cinzel text-sm tracking-[0.15em] uppercase mb-4">
              Zum 6-jahrigen Jubilaum
            </p>
            <h2 className="text-2xl md:text-3xl text-white mb-6">
              Das Legacy Event
            </h2>
            <div className="bg-black/60 border border-metallic-gold/30 rounded-xl p-8 md:p-10 shadow-gold">
              <p className="text-gray-200 text-lg mb-8 leading-relaxed">
                Kostenlose Tattoo-Planungs-Session - dein Design wird perfekt, bevor du dich entscheidest.
              </p>
              <div className="space-y-4 text-left max-w-md mx-auto mb-8">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-metallic-gold flex-shrink-0" />
                  <span className="text-gray-200">Stundenpreis: <strong className="text-white">150&#8364;/Stunde</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-metallic-gold flex-shrink-0" />
                  <span className="text-gray-200"><strong className="text-white">Extra-Rabatte</strong> vor Ort fur grosse Tattoos</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-metallic-gold flex-shrink-0" />
                  <span className="text-gray-200">Gilt fur alle Buchungen <strong className="text-white">bis 13. Juli</strong></span>
                </div>
              </div>
              <button
                onClick={scrollToForm}
                className="cta-button bg-firebrick text-white font-bold py-4 px-10 rounded-md text-lg w-full md:w-auto"
              >
                Jetzt Platz sichern
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA / Form Section */}
      <section ref={formRef} id="form" className="py-16 md:py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-metallic-gold text-center mb-3">
              Lass uns dein Tattoo planen
            </h2>
            <p className="text-center text-gray-400 mb-10 text-sm">
              Antwort innerhalb von 24 Stunden. Kein Spam, kein Druck.
            </p>

            {/* Dual CTA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => logEvent('Campaign', 'Legacy WhatsApp Click', utmParams.utm_campaign || 'direct')}
                className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-6 rounded-md transition-all duration-300 hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5" />
                Per WhatsApp schreiben
              </a>
              <button
                onClick={() => {
                  const formEl = document.getElementById('lead-form');
                  formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="flex items-center justify-center gap-3 bg-transparent border-2 border-metallic-gold/50 text-metallic-gold hover:border-metallic-gold hover:bg-metallic-gold/5 font-bold py-4 px-6 rounded-md transition-all duration-300"
              >
                <Send className="w-5 h-5" />
                Formular ausfullen
              </button>
            </div>

            {/* Form */}
            <div id="lead-form" className="bg-viking-navy/60 border border-metallic-gold/20 rounded-xl p-6 md:p-8">
              {formState === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-metallic-gold mb-3">Geschafft!</h3>
                  <p className="text-gray-300 mb-2">
                    Wir melden uns innerhalb von 24 Stunden bei dir.
                  </p>
                  <p className="text-gray-500 text-sm">
                    Schneller geht's per WhatsApp - wir antworten dort oft sofort.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 contact-form">
                  {/* Honeypot */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div>
                    <label htmlFor="lp-name" className="block text-sm font-medium text-gray-300 mb-2">
                      Dein Name *
                    </label>
                    <input
                      type="text"
                      id="lp-name"
                      name="name"
                      required
                      className="w-full bg-black/50 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-firebrick border border-metallic-gold/30"
                      placeholder="Vor- und Nachname"
                    />
                  </div>

                  <div>
                    <label htmlFor="lp-phone" className="block text-sm font-medium text-gray-300 mb-2">
                      WhatsApp / Telefon *
                    </label>
                    <input
                      type="tel"
                      id="lp-phone"
                      name="phone"
                      required
                      className="w-full bg-black/50 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-firebrick border border-metallic-gold/30"
                      placeholder="+49 151 ..."
                    />
                  </div>

                  <div>
                    <label htmlFor="lp-idea" className="block text-sm font-medium text-gray-300 mb-2">
                      Was schwebt dir vor? <span className="text-gray-500">(optional)</span>
                    </label>
                    <textarea
                      id="lp-idea"
                      name="tattoo_idea"
                      rows={3}
                      className="w-full bg-black/50 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-firebrick border border-metallic-gold/30"
                      placeholder="Stil, Motiv, Grosse, Platzierung..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="cta-button w-full bg-firebrick text-white font-bold py-4 rounded-md text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState === 'submitting' ? 'Wird gesendet...' : 'Kostenlose Planung anfragen'}
                  </button>

                  {formState === 'error' && (
                    <p className="text-red-500 text-center text-sm">
                      Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreib uns per WhatsApp.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Legal Footer */}
      <footer className="py-6 bg-black border-t border-metallic-gold/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-xs">
            &copy; 2026 Asgard Tattoo. Alle Rechte vorbehalten.
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="/legal/imprint" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Impressum</a>
            <a href="/legal/privacy" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Datenschutz</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LegacyEvent;
