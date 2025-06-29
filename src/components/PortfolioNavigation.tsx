import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { cn } from '../lib/utils';

interface Category {
  id: string;
  title: string;
}

interface SubCategory {
  id: string;
  title: string;
  count: number;
}

interface PortfolioNavigationProps {
  categories: Category[];
  subCategories: SubCategory[];
  currentCategory?: string;
  currentSubCategory?: string;
}

export function PortfolioNavigation({ 
  categories, 
  subCategories, 
  currentCategory,
  currentSubCategory 
}: PortfolioNavigationProps) {
  return (
    <div className="sticky top-20 z-40 bg-black/95 backdrop-blur-sm border-b border-metallic-gold/30 py-4">
      <div className="container mx-auto px-4">
        {/* Main Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-4">
          <Link
            to="/portfolio"
            className={cn(
              "px-3 md:px-4 py-2 rounded-md text-sm md:text-base font-medium transition-all duration-300",
              !currentCategory
                ? "bg-metallic-gold text-black"
                : "text-metallic-gold hover:text-firebrick hover:bg-metallic-gold/10"
            )}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/portfolio/${cat.id}`}
              className={cn(
                "px-3 md:px-4 py-2 rounded-md text-sm md:text-base font-medium transition-all duration-300",
                currentCategory === cat.id
                  ? "bg-metallic-gold text-black"
                  : "text-metallic-gold hover:text-firebrick hover:bg-metallic-gold/10"
              )}
            >
              {cat.title}
            </Link>
          ))}
        </div>

        {/* Sub-categories (only show when a main category is selected and has sub-categories) */}
        {currentCategory && subCategories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 border-t border-metallic-gold/20 pt-4">
            <span className="text-xs md:text-sm text-gray-400 mr-2 hidden md:inline">
              Filter by:
            </span>
            {subCategories.map((subCat) => (
              <Link
                key={subCat.id}
                to={`/portfolio/${currentCategory}/${subCat.id}`}
                className={cn(
                  "px-2 md:px-3 py-1 rounded text-xs md:text-sm font-medium transition-all duration-300 border",
                  currentSubCategory === subCat.id
                    ? "bg-firebrick text-white border-firebrick"
                    : "text-gray-300 border-gray-600 hover:text-white hover:border-metallic-gold/50"
                )}
              >
                {subCat.title} ({subCat.count})
              </Link>
            ))}
            {currentSubCategory && (
              <Link
                to={`/portfolio/${currentCategory}`}
                className="px-2 md:px-3 py-1 rounded text-xs md:text-sm font-medium text-gray-400 hover:text-metallic-gold transition-colors ml-2"
              >
                Clear filter ×
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}