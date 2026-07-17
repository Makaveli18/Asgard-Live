import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import type { PortfolioCategory } from '../data/portfolio-config';

interface PortfolioNavigationProps {
  categories: PortfolioCategory[];
  currentCategory?: string;
  currentSubcategory?: string;
}

export function PortfolioNavigation({
  categories,
  currentCategory,
  currentSubcategory,
}: PortfolioNavigationProps) {
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [showSubcategories, setShowSubcategories] = useState(false);

  const activeCategory = categories.find((c) => c.id === currentCategory);
  const hasSubcategories = !!activeCategory && activeCategory.subcategories.length > 0;

  useEffect(() => {
    if (activeButtonRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const button = activeButtonRef.current as HTMLElement;
      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const scrollLeft = button.offsetLeft - container.offsetWidth / 2 + button.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [currentCategory, currentSubcategory]);

  useEffect(() => {
    if (hasSubcategories) {
      setShowSubcategories(true);
    } else {
      setShowSubcategories(false);
    }
  }, [hasSubcategories, currentCategory]);

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="bg-viking-navy/30 border-y border-metallic-gold/30 sticky top-[60px] z-30 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        {/* Main Categories - horizontally scrollable on mobile */}
        <div
          ref={scrollContainerRef}
          className="flex items-center justify-start md:justify-center gap-2 md:gap-3 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <Link
            to="/portfolio"
            onClick={(e) => handleNavigation(e, '/portfolio')}
            ref={(el) => { if (!currentCategory) activeButtonRef.current = el; }}
            className={cn(
              'whitespace-nowrap px-4 md:px-5 py-2.5 rounded-md text-sm md:text-base font-medium transition-all duration-300 flex-shrink-0',
              !currentCategory
                ? 'bg-metallic-gold text-black shadow-lg'
                : 'text-metallic-gold hover:text-firebrick hover:bg-metallic-gold/10 border border-metallic-gold/30'
            )}
          >
            All
          </Link>
          {categories.map((cat) => {
            const isActive = currentCategory === cat.id;
            const hasSubs = cat.subcategories.length > 0;
            return (
              <Link
                key={cat.id}
                to={`/portfolio/${cat.id}`}
                onClick={(e) => handleNavigation(e, `/portfolio/${cat.id}`)}
                ref={(el) => { if (isActive) activeButtonRef.current = el; }}
                className={cn(
                  'whitespace-nowrap px-4 md:px-5 py-2.5 rounded-md text-sm md:text-base font-medium transition-all duration-300 flex-shrink-0 flex items-center gap-1.5',
                  isActive
                    ? 'bg-metallic-gold text-black shadow-lg'
                    : 'text-metallic-gold hover:text-firebrick hover:bg-metallic-gold/10 border border-metallic-gold/30'
                )}
              >
                {cat.title}
                {hasSubs && (
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 transition-transform duration-300',
                      isActive && showSubcategories && 'rotate-180'
                    )}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Subcategories - animated expand/collapse */}
        <AnimatePresence initial={false}>
          {showSubcategories && hasSubcategories && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-3 mt-3 border-t border-metallic-gold/20">
                <div className="flex items-center justify-start md:justify-center gap-2 md:gap-2.5 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <Link
                    to={`/portfolio/${activeCategory!.id}`}
                    onClick={(e) => handleNavigation(e, `/portfolio/${activeCategory!.id}`)}
                    className={cn(
                      'whitespace-nowrap px-3.5 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 flex-shrink-0',
                      !currentSubcategory
                        ? 'bg-firebrick text-white shadow-md'
                        : 'text-gray-300 hover:text-metallic-gold hover:bg-metallic-gold/10 border border-metallic-gold/20'
                    )}
                  >
                    All {activeCategory!.title}
                  </Link>
                  {activeCategory!.subcategories.map((sub) => {
                    const isActive = currentSubcategory === sub.id;
                    return (
                      <Link
                        key={sub.id}
                        to={`/portfolio/${activeCategory!.id}/${sub.id}`}
                        onClick={(e) => handleNavigation(e, `/portfolio/${activeCategory!.id}/${sub.id}`)}
                        className={cn(
                          'whitespace-nowrap px-3.5 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 flex-shrink-0',
                          isActive
                            ? 'bg-firebrick text-white shadow-md'
                            : 'text-gray-300 hover:text-metallic-gold hover:bg-metallic-gold/10 border border-metallic-gold/20'
                        )}
                      >
                        {sub.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
