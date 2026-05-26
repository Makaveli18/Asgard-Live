import React from 'react';
import { useTranslation } from '../i18n';

export function LanguageToggle() {
  const { lang, setLang } = useTranslation();

  return (
    <button
      onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-metallic-gold/30 hover:border-metallic-gold text-sm font-medium transition-all duration-200 hover:bg-metallic-gold/10"
      aria-label={lang === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'}
    >
      <span className={lang === 'de' ? 'text-metallic-gold font-bold' : 'text-gray-400'}>DE</span>
      <span className="text-gray-500">|</span>
      <span className={lang === 'en' ? 'text-metallic-gold font-bold' : 'text-gray-400'}>EN</span>
    </button>
  );
}
