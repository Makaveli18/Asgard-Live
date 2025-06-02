import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="bg-viking-navy/20 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center text-sm">
          <Link to="/" className="text-metallic-gold hover:text-firebrick transition-colors">
            Home
          </Link>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <ChevronRight className="w-4 h-4 mx-2 text-gray-500" />
              {item.href ? (
                <Link
                  to={item.href}
                  className="text-metallic-gold hover:text-firebrick transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-300">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
}