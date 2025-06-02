import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { logEvent } from '../lib/analytics';

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      tattoo_type: formData.get('tattoo_type') as string,
      message: formData.get('message') as string,
    };

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([data]);

      if (error) throw error;

      setSubmitStatus('success');
      logEvent('Contact', 'Form Submit', data.tattoo_type);
      
      const form = e.target as HTMLFormElement;
      if (form) {
        form.reset();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      logEvent('Contact', 'Form Error', 'Submission Failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 contact-form ${className}`}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
        <input 
          type="text" 
          id="name"
          name="name"
          className="w-full bg-black/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-firebrick border border-metallic-gold/30"
          placeholder="Enter your name"
          required
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
        <input 
          type="email" 
          id="email"
          name="email"
          className="w-full bg-black/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-firebrick border border-metallic-gold/30"
          placeholder="Enter your email"
          required
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone</label>
        <input 
          type="tel" 
          id="phone"
          name="phone"
          className="w-full bg-black/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-firebrick border border-metallic-gold/30"
          placeholder="Enter your phone number"
          required
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="tattoo_type" className="block text-sm font-medium mb-2">Tattoo Type</label>
        <select 
          id="tattoo_type"
          name="tattoo_type"
          className="w-full bg-black/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-firebrick border border-metallic-gold/30"
          required
          aria-required="true"
        >
          <option value="">Select a style</option>
          <option>Norse & Viking Style</option>
          <option>Fine Line</option>
          <option>Realism</option>
          <option>Custom Design</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
        <textarea 
          id="message"
          name="message"
          className="w-full bg-black/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-firebrick border border-metallic-gold/30"
          rows={6}
          placeholder="Tell us about your vision. The Size of the tattoo you want, and the body part you'd like to get it on."
          required
          aria-required="true"
        />
      </div>
      <button 
        type="submit"
        disabled={isSubmitting}
        className="cta-button w-full bg-firebrick text-white font-bold py-3 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={isSubmitting ? 'Submitting form...' : 'Join The Asgard Family'}
      >
        {isSubmitting ? 'Submitting...' : 'Join The Asgard Family'}
      </button>

      {submitStatus === 'success' && (
        <div className="text-green-500 text-center" role="alert">
          Thank you for your submission! We'll contact you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="text-red-500 text-center" role="alert">
          Something went wrong. Please try again later.
        </div>
      )}
    </form>
  );
}