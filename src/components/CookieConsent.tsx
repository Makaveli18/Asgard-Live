import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { X, Cookie } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'cookie-consent';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functionality: boolean;
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Essential cookies are always required
    analytics: false,
    functionality: false,
  });

  useEffect(() => {
    const consent = Cookies.get(COOKIE_CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    } else {
      // Parse saved preferences
      try {
        const savedPreferences = JSON.parse(consent);
        setPreferences(savedPreferences);
      } catch (e) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allPreferences = {
      essential: true,
      analytics: true,
      functionality: true,
    };
    savePreferences(allPreferences);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    // Save preferences for 365 days
    Cookies.set(COOKIE_CONSENT_KEY, JSON.stringify(prefs), { expires: 365 });
    setPreferences(prefs);
    setShowBanner(false);
    setShowPreferences(false);

    // Apply preferences
    if (prefs.analytics) {
      // Enable analytics
      window.gtag?.('consent', 'update', {
        analytics_storage: 'granted'
      });
    } else {
      // Disable analytics
      window.gtag?.('consent', 'update', {
        analytics_storage: 'denied'
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-metallic-gold/30 p-4 z-50">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Cookie className="w-5 h-5 text-metallic-gold" />
            <p className="text-gray-300 text-sm">
              This website uses cookies to improve your experience.
              <Link to="/legal/cookies" className="text-metallic-gold hover:text-firebrick ml-1">
                Learn more
              </Link>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleAcceptAll()}
              className="px-6 py-2 bg-firebrick text-white rounded hover:bg-firebrick/90 transition-colors text-sm font-medium"
            >
              Accept All
            </button>
            <button
              onClick={() => savePreferences({ ...preferences, analytics: false, functionality: false })}
              className="px-6 py-2 border border-metallic-gold/30 text-metallic-gold hover:border-metallic-gold transition-colors text-sm font-medium rounded"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}