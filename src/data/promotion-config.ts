export interface PriceTier {
  size: string;
  price: string;
}

export interface PromotionConfig {
  active: boolean;
  showComingSoon: boolean;
  title: string;
  subtitle: string;
  badge: string;
  artist: string | null;
  priceTiers: PriceTier[];
  discount: string | null;
  discountNote: string | null;
  deadline: string;
  deadlineDate: string; // ISO date string for auto-expiry check
  categories: string[];
  ctaWhatsappMessage: string;
  ctaFormText: string;
}

export const currentPromotion: PromotionConfig = {
  active: true,
  showComingSoon: false,
  title: 'Minimal Tattoo Aktionswoche',
  subtitle: 'Exklusive Aktionspreise fur Minimal Tattoos',
  badge: 'Verlangert!',
  artist: 'Eszter',
  priceTiers: [
    { size: '3-5 cm', price: '60\u20AC' },
    { size: '6-8 cm', price: '80\u20AC' },
    { size: '9-12 cm', price: '100\u20AC' },
  ],
  discount: '30% Rabatt',
  discountNote: 'Fur Tattoos ab 12 cm',
  deadline: 'Bis zum 27. Juni -- Nur nach Terminvereinbarung',
  deadlineDate: '2026-06-28',
  categories: [
    'Minimal Tattoos',
    'Fine Line Tattoos',
    'Schriftzuge',
    'Kleine Symbole',
    'Individuelle Designs',
  ],
  ctaWhatsappMessage: 'Hi! Ich habe die Minimal Tattoo Aktionswoche gesehen und mochte einen Termin bei Eszter buchen.',
  ctaFormText: 'Termin anfragen',
};
