import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Shield } from 'lucide-react';

function Imprint() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />
      
      <Breadcrumb items={[{ label: 'Legal', href: '/legal/imprint' }, { label: 'Imprint' }]} />

      <main className="container mx-auto px-4 py-12">
        <article className="prose prose-invert prose-lg max-w-3xl mx-auto bg-viking-navy/20 p-8 rounded-lg border border-metallic-gold/30">
          <div className="flex items-center gap-4 mb-8">
            <Shield className="w-8 h-8 text-metallic-gold" />
            <h1 className="font-cinzel text-3xl md:text-4xl text-metallic-gold m-0">Imprint</h1>
          </div>
          
          <section className="mb-8">
            <p className="font-bold text-metallic-gold mb-4">Information according to §5 TMG</p>
            <p>
              <strong>Asgard Tattoo</strong><br />
              Owner: Eszter Rajo<br />
              Schönaustraße 33A<br />
              84036 Landshut, Germany
            </p>
          </section>

          <section className="mb-8">
            <p className="font-bold text-metallic-gold mb-4">Contact</p>
            <p>
              Phone: +49 1511 4386124<br />
              Email: contact@asgard-tattoo.com
            </p>
          </section>

          <section className="mb-8">
            <p className="font-bold text-metallic-gold mb-4">VAT ID</p>
            <p>
              VAT Identification Number according to §27 a UStG: DE449837763
            </p>
          </section>

          <section className="mb-8">
            <p className="font-bold text-metallic-gold mb-4">Responsible for content according to § 55 Abs. 2 RStV:</p>
            <p>
              Eszter Rajo<br />
              Schönaustraße 33A<br />
              84036 Landshut, Germany
            </p>
          </section>

          <hr className="border-metallic-gold/30 my-8" />
          
          <section className="mt-8">
            <p>
              Despite careful content control, we assume no liability for the content of external links. 
              The operators of linked pages are solely responsible for their content.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export default Imprint;