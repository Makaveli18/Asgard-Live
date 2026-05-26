import React from 'react';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '4915114386124';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hallo Asgard Tattoo! Ich interessiere mich fur ein Tattoo und wurde gerne einen Beratungstermin vereinbaren.'
);

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Nachricht per WhatsApp senden"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/90 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Direkt per WhatsApp schreiben
      </span>
    </a>
  );
}
