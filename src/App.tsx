import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Booking from './pages/Booking';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import LegacyEvent from './pages/LegacyEvent';
import Imprint from './pages/legal/Imprint';
import Privacy from './pages/legal/Privacy';
import Cookies from './pages/legal/Cookies';
import Terms from './pages/legal/Terms';
import { CookieConsent } from './components/CookieConsent';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AnnouncementBar } from './components/AnnouncementBar';
import { initGA, logPageView, initMetaPixel, logPixelPageView } from './lib/analytics';

function App() {
  const location = useLocation();

  useEffect(() => {
    initGA();
    initMetaPixel();
  }, []);

  useEffect(() => {
    // Only scroll to top for non-portfolio category changes
    const isPortfolioCategory = location.pathname.startsWith('/portfolio/');
    const wasPortfolioCategory = sessionStorage.getItem('lastPath')?.startsWith('/portfolio/');
    
    if (!isPortfolioCategory || !wasPortfolioCategory) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Store current path for next navigation
    sessionStorage.setItem('lastPath', location.pathname);
    
    logPageView(location.pathname);
    logPixelPageView();
  }, [location.pathname]);

  // Separate effect for hash navigation
  useEffect(() => {
    if (location.hash) {
      // Don't scroll to top if we have a hash
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 300); // Delay to ensure page is rendered
      }
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <AnnouncementBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:category" element={<Portfolio />} />
        <Route path="/portfolio/:category/:subcategory" element={<Portfolio />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/legal/imprint" element={<Imprint />} />
        <Route path="/legal/privacy" element={<Privacy />} />
        <Route path="/legal/cookies" element={<Cookies />} />
        <Route path="/legal/terms" element={<Terms />} />
        <Route path="/legacy" element={<LegacyEvent />} />
      </Routes>
      <WhatsAppButton />
      <CookieConsent />
    </>
  );
}

export default App;