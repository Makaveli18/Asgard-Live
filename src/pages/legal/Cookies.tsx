import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Shield } from 'lucide-react';

function Cookies() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />
      
      <Breadcrumb items={[{ label: 'Legal', href: '/legal/cookies' }, { label: 'Cookie Policy' }]} />

      <main className="container mx-auto px-4 py-12">
        <article className="prose prose-invert prose-lg max-w-3xl mx-auto bg-viking-navy/20 p-8 rounded-lg border border-metallic-gold/30">
          <div className="flex items-center gap-4 mb-8">
            <Shield className="w-8 h-8 text-metallic-gold" />
            <h1 className="font-cinzel text-3xl md:text-4xl text-metallic-gold m-0">Cookie Policy</h1>
          </div>
          
          <section className="mb-8">
            <p className="text-lg mb-6">
              Last updated: 26.05.2025
            </p>
            <p>
              This Cookie Policy explains how Asgard Tattoo uses cookies on our website and what choices you have.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your device when you visit a website. They help us remember your preferences, improve functionality, and analyze usage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">Types of Cookies We Use</h2>
            
            <ul className="space-y-4">
              <li>
                <strong className="text-metallic-gold">Essential Cookies:</strong>
                <p className="mt-1">Required for basic functionality of the site. These cannot be disabled.</p>
              </li>

              <li>
                <strong className="text-metallic-gold">Analytics Cookies:</strong>
                <p className="mt-1">Help us understand site usage and improve the experience. Used only with your consent.</p>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">Your Choices</h2>
            <p>
              When you first visit our website, you'll be asked to accept or decline cookies. You can change your preference at any time by clearing your browser cookies or clicking "Cookie Settings" in the cookie banner.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">Managing Cookies</h2>
            <p>
              You can control cookies through your browser settings. Rejecting cookies may limit some functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">Contact</h2>
            <p>
              If you have questions about our use of cookies, contact us at contact@asgard-tattoo.com
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export default Cookies;