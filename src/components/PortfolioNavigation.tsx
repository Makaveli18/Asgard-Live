import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface Category {
  id: string;
  title: string;
}

interface PortfolioNavigationProps {
  categories: Category[];
  currentCategory?: string;
}

export function PortfolioNavigation({ 
  categories, 
  currentCategory
}: PortfolioNavigationProps) {
  return (
    <div className="bg-viking-navy/30 border-y border-metallic-gold/30 py-8">
      <div className="container mx-auto px-4">
        {/* Main Categories Only */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
          <Link
            to="/portfolio"
            onClick={() => {
              setTimeout(() => {
                document.getElementById('gallery-content')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }, 100);
            }}
            className={cn(
              "px-4 md:px-6 py-3 rounded-md text-sm md:text-base font-medium transition-all duration-300",
              !currentCategory
                ? "bg-metallic-gold text-black shadow-lg"
                : "text-metallic-gold hover:text-firebrick hover:bg-metallic-gold/10 border border-metallic-gold/30"
            )}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/portfolio/${cat.id}`}
              onClick={() => {
                setTimeout(() => {
                  document.getElementById('gallery-content')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }, 100);
              }}
              className={cn(
                "px-4 md:px-6 py-3 rounded-md text-sm md:text-base font-medium transition-all duration-300",
                currentCategory === cat.id
                  ? "bg-metallic-gold text-black shadow-lg"
                  : "text-metallic-gold hover:text-firebrick hover:bg-metallic-gold/10 border border-metallic-gold/30"
              )}
            >
              {cat.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}