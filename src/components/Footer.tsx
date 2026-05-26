import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { useTranslation } from '../i18n';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-stone-texture bg-black bg-opacity-90 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-metallic-gold">ASGARD TATTOO</h3>
            <p className="text-gray-400">{t.footer.tagline}</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4 text-metallic-gold">{t.footer.contactTitle}</h4>
            <div className="space-y-2">
              <p className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-2 text-metallic-gold" />
                Schönaustraße 33A, 84036 Landshut
              </p>
              <p className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 mr-2 text-metallic-gold" />
                +49 1511 4386124
              </p>
              <div className="flex items-start text-gray-300">
                <Clock className="w-5 h-5 mr-2 text-metallic-gold flex-shrink-0 mt-1" />
                <div>
                  <p>{t.footer.hours1}</p>
                  <p>{t.footer.hours2}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4 text-metallic-gold">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-rust">{t.nav.home}</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-rust">{t.nav.about}</Link></li>
              <li><Link to="/portfolio" className="text-gray-300 hover:text-rust">{t.nav.portfolio}</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-rust">{t.nav.blog}</Link></li>
              <li><Link to="/booking" className="text-gray-300 hover:text-rust">{t.nav.bookNow}</Link></li>
              <li className="mt-4 pt-4 border-t border-gray-800">
                <Link to="/legal/imprint" className="text-gray-300 hover:text-rust">{t.footer.imprint}</Link>
              </li>
              <li>
                <Link to="/legal/privacy" className="text-gray-300 hover:text-rust">{t.footer.privacy}</Link>
              </li>
              <li>
                <Link to="/legal/cookies" className="text-gray-300 hover:text-rust">{t.footer.cookies}</Link>
              </li>
              <li>
                <Link to="/legal/terms" className="text-gray-300 hover:text-rust">{t.footer.terms}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4 text-metallic-gold">{t.footer.followUs}</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/asgard_tatto/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-metallic-gold hover:text-rust transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/asgardtattoo2020"
                target="_blank"
                rel="noopener noreferrer"
                className="text-metallic-gold hover:text-rust transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="mailto:asgard.tattoo2020@gmail.com"
                className="text-metallic-gold hover:text-rust transition-colors"
              >
                <Mail size={24} />
              </a>
              <a
                href="https://www.tiktok.com/@asgardtattoo_landshut?_t=8p04ABiJMMi&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-metallic-gold hover:text-rust transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <div>{t.footer.copyright}</div>
          <div>
            {t.footer.createdBy}{' '}
            <a
              href="https://www.luxurywordslab.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-playfair text-metallic-gold hover:text-firebrick transition-colors"
            >
              Luxury Words Lab
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
