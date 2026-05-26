import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { logEvent } from '../lib/analytics';

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Datei zu gross. Maximal 10MB erlaubt.');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setFilePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const uploadReferenceImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error } = await supabase.storage
      .from('reference-images')
      .upload(fileName, file);

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('reference-images')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);

    // Honeypot check
    const honeypot = formData.get('website') as string;
    if (honeypot) {
      setSubmitStatus('success');
      setIsSubmitting(false);
      return;
    }

    let referenceImageUrl: string | null = null;
    if (selectedFile) {
      referenceImageUrl = await uploadReferenceImage(selectedFile);
    }

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      tattoo_type: formData.get('tattoo_type') as string,
      message: formData.get('message') as string,
      preferred_timeframe: formData.get('preferred_timeframe') as string || null,
      preferred_artist: formData.get('preferred_artist') as string || null,
      reference_image_url: referenceImageUrl,
    };

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([data]);

      if (error) throw error;

      setSubmitStatus('success');
      logEvent('Contact', 'Form Submit', data.tattoo_type);

      const form = e.target as HTMLFormElement;
      form.reset();
      removeFile();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      logEvent('Contact', 'Form Error', 'Submission Failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className={`text-center py-12 ${className}`}>
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-metallic-gold mb-4">
          Anfrage erfolgreich gesendet!
        </h3>
        <p className="text-gray-300 mb-4 text-lg">
          Wir melden uns innerhalb von 24 Stunden per WhatsApp oder E-Mail bei dir.
        </p>
        <p className="text-gray-400 text-sm">
          In der Zwischenzeit: Schau dir unser{' '}
          <a href="/portfolio" className="text-metallic-gold hover:text-firebrick transition-colors">
            Portfolio
          </a>{' '}
          an fur weitere Inspiration.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="mt-8 text-metallic-gold hover:text-firebrick transition-colors text-sm underline"
        >
          Weitere Anfrage senden
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 contact-form ${className}`}>
      {/* Honeypot - hidden from real users */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full bg-black/50 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-firebrick border border-metallic-gold/30"
            placeholder="Dein Name"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">Telefon / WhatsApp *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full bg-black/50 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-firebrick border border-metallic-gold/30"
            placeholder="Deine Nummer"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">E-Mail *</label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full bg-black/50 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-firebrick border border-metallic-gold/30"
          placeholder="Deine E-Mail-Adresse"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="tattoo_type" className="block text-sm font-medium mb-2">Tattoo-Stil *</label>
          <select
            id="tattoo_type"
            name="tattoo_type"
            className="w-full bg-black/50 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-firebrick border border-metallic-gold/30"
            required
          >
            <option value="">Stil wahlen...</option>
            <option value="Fine Line">Fine Line</option>
            <option value="Realism">Realism</option>
            <option value="Norse & Viking">Norse & Viking</option>
            <option value="Blackwork">Blackwork</option>
            <option value="Neo-Traditional">Neo-Traditional</option>
            <option value="Custom Design">Custom Design</option>
            <option value="Ornamental / Dotwork">Ornamental / Dotwork</option>
            <option value="Cover-Up">Cover-Up</option>
            <option value="Anderer Stil">Anderer Stil</option>
          </select>
        </div>
        <div>
          <label htmlFor="preferred_artist" className="block text-sm font-medium mb-2">Bevorzugter Kunstler</label>
          <select
            id="preferred_artist"
            name="preferred_artist"
            className="w-full bg-black/50 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-firebrick border border-metallic-gold/30"
          >
            <option value="">Egal / Kein Favorit</option>
            <option value="Imre">Imre - Norse, Realism, Custom</option>
            <option value="Eszter">Eszter - Fine Line, Dotwork, Custom</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="preferred_timeframe" className="block text-sm font-medium mb-2">Wunschzeitraum</label>
        <select
          id="preferred_timeframe"
          name="preferred_timeframe"
          className="w-full bg-black/50 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-firebrick border border-metallic-gold/30"
        >
          <option value="">Flexibel / So schnell wie moglich</option>
          <option value="Diese Woche">Diese Woche</option>
          <option value="Nachste Woche">Nachste Woche</option>
          <option value="In 2-4 Wochen">In 2-4 Wochen</option>
          <option value="In 1-2 Monaten">In 1-2 Monaten</option>
          <option value="Nur Beratung">Erstmal nur Beratung</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">Beschreibung *</label>
        <textarea
          id="message"
          name="message"
          className="w-full bg-black/50 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-firebrick border border-metallic-gold/30"
          rows={5}
          placeholder="Beschreibe dein Wunsch-Tattoo: Motiv, Grosse (ca. in cm), Korperpartie, und alles was dir wichtig ist."
          required
        />
      </div>

      {/* Reference Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">Referenzbild (optional)</label>
        <div className="relative">
          {filePreview ? (
            <div className="relative inline-block">
              <img
                src={filePreview}
                alt="Referenz-Vorschau"
                className="w-32 h-32 object-cover rounded-lg border border-metallic-gold/30"
              />
              <button
                type="button"
                onClick={removeFile}
                className="absolute -top-2 -right-2 bg-firebrick text-white rounded-full p-1 hover:bg-firebrick/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="reference_image"
              className="flex items-center justify-center gap-3 w-full py-4 px-4 border-2 border-dashed border-metallic-gold/30 rounded-lg cursor-pointer hover:border-metallic-gold/60 transition-colors bg-black/30"
            >
              <Upload className="w-5 h-5 text-metallic-gold" />
              <span className="text-gray-400 text-sm">Bild hochladen (max. 10MB)</span>
            </label>
          )}
          <input
            ref={fileInputRef}
            type="file"
            id="reference_image"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="cta-button w-full bg-firebrick text-white font-bold py-4 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
      >
        {isSubmitting ? 'Wird gesendet...' : 'Kostenlose Beratung anfragen'}
      </button>

      {submitStatus === 'error' && (
        <div className="text-red-500 text-center text-sm" role="alert">
          Etwas ist schiefgelaufen. Bitte versuche es erneut oder kontaktiere uns direkt per WhatsApp.
        </div>
      )}
    </form>
  );
}
