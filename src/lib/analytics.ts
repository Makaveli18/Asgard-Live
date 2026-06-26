import ReactGA from 'react-ga4';

import Cookies from 'js-cookie';

const COOKIE_CONSENT_KEY = 'cookie-consent';

const isAnalyticsConsented = (): boolean => {
  const consent = Cookies.get(COOKIE_CONSENT_KEY);
  if (!consent) return false;
  try {
    return JSON.parse(consent).analytics === true;
  } catch {
    return false;
  }
};

export const initGA = () => {
  ReactGA.initialize('G-YJXWLB162H', {
    gaOptions: {
      storage: isAnalyticsConsented() ? 'granted' : 'denied'
    }
  });
};

export const initMetaPixel = () => {
  if (!isAnalyticsConsented()) return;
  if (typeof window.fbq === 'function') {
    window.fbq('consent', 'grant');
    window.fbq('track', 'PageView');
  }
};

export const logPageView = (path: string) => {
  if (!isAnalyticsConsented()) return;
  ReactGA.send({ hitType: 'pageview', page: path });
};

export const logPixelPageView = () => {
  if (!isAnalyticsConsented()) return;
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
};

export const logEvent = (category: string, action: string, label?: string) => {
  if (!isAnalyticsConsented()) return;
  ReactGA.event({ category, action, label });
};

export const logPixelEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (!isAnalyticsConsented()) return;
  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, params);
  }
};