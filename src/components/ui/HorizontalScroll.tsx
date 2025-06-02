import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface HorizontalScrollProps {
  images: Array<{ src: string; alt: string; title: string }>;
  className?: string;
}

export function HorizontalScroll({ images, className }: HorizontalScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(true);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = direction === 'left' ? -400 : 400;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Check initial scroll buttons visibility
      handleScroll();
      
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY !== 0 && scrollContainerRef.current) {
      e.preventDefault();
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className={cn("relative group", className)}>
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-metallic-gold"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-metallic-gold"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        onWheel={handleWheel}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-none w-80 h-80 snap-start p-2"
          >
            <div className="w-full h-full relative group/item overflow-hidden rounded-lg">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <h3 className="text-white text-lg font-bold">{image.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Progress Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {Array.from({ length: Math.ceil(images.length / 4) }).map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-white/50 transition-colors duration-300"
            style={{
              backgroundColor: index === 0 ? 'rgb(212, 175, 55)' : undefined
            }}
          />
        ))}
      </div>
    </div>
  );
}