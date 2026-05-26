import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n';
import { LanguageToggle } from './LanguageToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/portfolio', label: t.nav.portfolio },
    { to: '/blog', label: t.nav.blog },
    { to: '/booking', label: t.nav.bookNow },
  ];

  return (
    <header className={`main-header ${isScrolled ? 'py-2 shadow-lg' : 'py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/SVG/Asgard_Logo.svg"
              alt="Asgard Tattoo"
              className="h-10 md:h-12 w-auto transition-transform duration-300 hover:scale-105 filter drop-shadow-gold"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-link font-bold ${location.pathname === item.to ? 'text-metallic-gold' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            <LanguageToggle />
          </nav>

          {/* Mobile: Language Toggle + Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageToggle />
            <button
              className="mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-metallic-gold/30 shadow-lg z-50`}>
          <nav className="flex flex-col items-center space-y-4 py-6 px-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-link font-bold ${location.pathname === item.to ? 'text-metallic-gold' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
