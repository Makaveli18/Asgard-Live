import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Booking from './pages/Booking';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Imprint from './pages/legal/Imprint';
import Privacy from './pages/legal/Privacy';
import Cookies from './pages/legal/Cookies';
import Terms from './pages/legal/Terms';
import { CookieConsent } from './components/CookieConsent';
import { initGA, logPageView } from './lib/analytics';

function App() {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    logPageView(location.pathname);
  }, [location.pathname]);

  return (
    <>
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
      </Routes>
      <CookieConsent />
    </>
  );
}

export default App;