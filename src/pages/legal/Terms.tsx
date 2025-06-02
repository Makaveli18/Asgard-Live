import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Shield } from 'lucide-react';

function Terms() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />
      
      <Breadcrumb items={[{ label: 'Legal', href: '/legal/terms' }, { label: 'Terms of Service' }]} />

      <main className="container mx-auto px-4 py-12">
        <article className="prose prose-invert prose-lg max-w-3xl mx-auto bg-viking-navy/20 p-8 rounded-lg border border-metallic-gold/30">
          <div className="flex items-center gap-4 mb-8">
            <Shield className="w-8 h-8 text-metallic-gold" />
            <h1 className="font-cinzel text-3xl md:text-4xl text-metallic-gold m-0">Terms of Service</h1>
          </div>
          
          <section className="mb-8">
            <p>
              These Terms of Service govern the use of our website and the booking of tattoo services with Asgard Tattoo. By using this site or scheduling an appointment, you agree to the terms below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">1. Service Scope</h2>
            <p>
              Asgard Tattoo offers professional, custom-designed tattoos by licensed tattoo artists. All appointments are handled with prior consultation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">2. Booking & Payment</h2>
            <ul>
              <li>Appointments can be booked via our online form or in person.</li>
              <li>For large pieces or full-day sessions, a deposit may be required. This will be discussed during consultation.</li>
              <li>Deposits are deducted from the final session cost and are non-refundable in case of late cancellation or no-show.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">3. Cancellation Policy</h2>
            <p>
              You may cancel or reschedule your appointment up to 48 hours before the scheduled time. Cancellations made later may result in the loss of your deposit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">4. Eligibility</h2>
            <ul>
              <li>You must be at least 18 years old to receive a tattoo. Valid ID is required.</li>
              <li>We reserve the right to refuse service to individuals under the influence of drugs or alcohol, or in violation of our safety policy.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">5. Health & Safety</h2>
            <p>
              Clients are responsible for disclosing any medical conditions, allergies, or medications before getting tattooed. Asgard Tattoo follows all health and hygiene regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">6. Aftercare</h2>
            <p>
              We provide detailed aftercare instructions. Results may vary depending on your skin type and healing practices. We are not liable for damage caused by improper care.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">7. Copyright</h2>
            <p>
              All designs created by Asgard Tattoo remain the intellectual property of the artist unless explicitly transferred in writing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">8. Liability</h2>
            <p>
              We are not liable for complications or dissatisfaction arising from failure to follow aftercare guidelines, allergic reactions, or unreported health conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">9. Governing Law</h2>
            <p>
              These terms are governed by the laws of the Federal Republic of Germany. Place of jurisdiction is Landshut, Germany.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-cinzel text-2xl text-metallic-gold mb-4">10. Contact</h2>
            <p>
              If you have questions regarding these Terms, contact us at contact@asgard-tattoo.com
            </p>
          </section>

          <section className="mt-12 pt-8 border-t border-metallic-gold/30">
            <p className="text-sm text-gray-400">Last updated: 26.05.2025</p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export default Terms;