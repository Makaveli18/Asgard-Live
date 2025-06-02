import ReactGA from 'react-ga4';

import Cookies from 'js-cookie';

const COOKIE_CONSENT_KEY = 'cookie-consent';

export const initGA = () => {
  // Check cookie consent before initializing GA
  const consent = Cookies.get(COOKIE_CONSENT_KEY);
  let analyticsEnabled = false;

  if (consent) {
    try {
      const preferences = JSON.parse(consent);
      analyticsEnabled = preferences.analytics;
    } catch (e) {
      console.error('Error parsing cookie consent:', e);
    }
  }

  ReactGA.initialize('G-XXXXXXXXXX', {
    gaOptions: {
      storage: analyticsEnabled ? 'granted' : 'denied'
    }
  });
};

export const logPageView = (path: string) => {
  // Only log pageview if analytics consent is granted
  const consent = Cookies.get(COOKIE_CONSENT_KEY);
  if (consent) {
    try {
      const preferences = JSON.parse(consent);
      if (preferences.analytics) {
        ReactGA.send({ hitType: "pageview", page: path });
      }
    } catch (e) {
      console.error('Error parsing cookie consent:', e);
    }
  }
};

export const logEvent = (category: string, action: string, label?: string) => {
  // Only log events if analytics consent is granted
  const consent = Cookies.get(COOKIE_CONSENT_KEY);
  if (consent) {
    try {
      const preferences = JSON.parse(consent);
      if (preferences.analytics) {
        ReactGA.event({
          category,
          action,
          label
        });
      }
    } catch (e) {
      console.error('Error parsing cookie consent:', e);
    }
  }
};