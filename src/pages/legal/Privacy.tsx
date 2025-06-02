import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Shield } from 'lucide-react';

function Privacy() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />
      
      <Breadcrumb items={[{ label: 'Legal', href: '/legal/privacy' }, { label: 'Privacy Policy' }]} />

      <main className="container mx-auto px-4 py-12">
        <article className="prose prose-invert prose-lg max-w-3xl mx-auto bg-viking-navy/20 p-8 rounded-lg border border-metallic-gold/30">
          <div className="flex items-center gap-4 mb-8">
            <Shield className="w-8 h-8 text-metallic-gold" />
            <h1 className="font-cinzel text-3xl md:text-4xl text-metallic-gold m-0">Privacy Policy</h1>
          </div>
          
          <p className="text-lg mb-8">
            <p>
              We are committed to protecting your personal data and your right to privacy. This Privacy Policy outlines how Asgard Tattoo collects, uses, and protects your data in accordance with the EU General Data Protection Regulation (GDPR).
            </p>
          </p>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">1. Responsible Entity</h2>
            <p>
              Asgard Tattoo<br />
              Owner: Eszter Rajo<br />
              Schönaustraße 33A<br />
              84036 Landshut, Germany<br />
              Email: contact@asgard-tattoo.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">2. What Personal Data We Collect</h2>
            <ul>
              <li>Contact details you submit via forms (name, email, phone number)</li>
              <li>Booking information</li>
              <li>Technical information via cookies (IP address, browser, device type)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">3. Why We Collect This Data</h2>
            <ul>
              <li>To respond to your inquiries or booking requests</li>
              <li>To provide and improve our services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">4. Legal Basis for Processing</h2>
            <p>
              We process your personal data based on your consent (Art. 6(1)(a) GDPR), to fulfill a contract (Art. 6(1)(b)), or to comply with legal obligations (Art. 6(1)(c)).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">5. Use of Hosting and Third-Party Services</h2>
            <p>
              Our site is hosted via GitHub Pages, Stackblitz, and we use Supabase for backend functions. These providers may process data on our behalf and are contractually bound to comply with GDPR.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">6. How Long We Store Data</h2>
            <p>
              We retain personal data only as long as necessary to fulfill its purpose or comply with legal requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">7. Your Rights</h2>
            <ul>
              <li>Access your data</li>
              <li>Request correction or deletion</li>
              <li>Withdraw consent</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">8. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your data. Our site uses SSL encryption for secure communication.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">9. Contact</h2>
            <p>
              If you have questions about your personal data, email us at contact@asgard-tattoo.com
            </p>
          </section>
          
          <section>
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">10. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Last updated: 26.05.2025
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export default Privacy;