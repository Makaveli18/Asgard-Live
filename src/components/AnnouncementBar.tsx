import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { currentPromotion } from '../data/promotion-config';
import { logEvent } from '../lib/analytics';

const DISMISS_KEY = 'promo-bar-dismissed';
const BAR_HEIGHT = 40;

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(DISMISS_KEY);
    setDismissed(!!wasDismissed);
  }, []);

  const now = new Date();
  const deadline = new Date(currentPromotion.deadlineDate + 'T23:59:59');
  const isExpired = now > deadline;
  const isVisible = currentPromotion.active && !isExpired && !dismissed && location.pathname !== '/legacy';

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--announcement-bar-height',
      isVisible ? `${BAR_HEIGHT}px` : '0px'
    );
    return () => {
      document.documentElement.style.setProperty('--announcement-bar-height', '0px');
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sessionStorage.setItem(DISMISS_KEY, 'true');
    setDismissed(true);
    logEvent('Promotion', 'Banner Dismiss', currentPromotion.title);
  };

  const shortText = `${currentPromotion.title} -- Preise ab ${currentPromotion.priceTiers[0]?.price}`;

  return (
    <div
      className="announcement-bar fixed top-0 left-0 right-0 z-[60] bg-firebrick/95 backdrop-blur-sm text-white"
      style={{ height: `${BAR_HEIGHT}px` }}
    >
      <div className="container mx-auto px-4 relative h-full">
        <Link
          to="/#promo"
          onClick={() => logEvent('Promotion', 'Banner Click', currentPromotion.title)}
          className="flex items-center justify-center gap-2 h-full pr-8 text-xs md:text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <span className="truncate">{shortText}</span>
          <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
        </Link>
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors"
          aria-label="Schliessen"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
