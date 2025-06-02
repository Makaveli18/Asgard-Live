import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`main-header ${isScrolled ? 'py-2 shadow-lg' : 'py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/SVG/Asgard_Logo.svg"
              alt="Asgard Tattoo"
              className="h-16 md:h-20 w-auto transition-transform duration-300 hover:scale-105 filter drop-shadow-gold"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`nav-link font-bold ${location.pathname === '/' ? 'text-metallic-gold' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`nav-link font-bold ${location.pathname === '/about' ? 'text-metallic-gold' : ''}`}
            >
              About
            </Link>
            <Link 
              to="/portfolio" 
              className={`nav-link font-bold ${location.pathname === '/portfolio' ? 'text-metallic-gold' : ''}`}
            >
              Portfolio
            </Link>
            <Link 
              to="/blog" 
              className={`nav-link font-bold ${location.pathname === '/blog' ? 'text-metallic-gold' : ''}`}
            >
              Blog
            </Link>
            <Link 
              to="/booking" 
              className={`nav-link font-bold ${location.pathname === '/booking' ? 'text-metallic-gold' : ''}`}
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <nav className="flex flex-col items-center space-y-4 py-4">
            <Link 
              to="/" 
              className={`nav-link font-bold ${location.pathname === '/' ? 'text-metallic-gold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`nav-link font-bold ${location.pathname === '/about' ? 'text-metallic-gold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/portfolio" 
              className={`nav-link font-bold ${location.pathname === '/portfolio' ? 'text-metallic-gold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link 
              to="/blog" 
              className={`nav-link font-bold ${location.pathname === '/blog' ? 'text-metallic-gold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/booking" 
              className={`nav-link font-bold ${location.pathname === '/booking' ? 'text-metallic-gold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Book Now
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;