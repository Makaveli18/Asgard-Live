import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { cn } from "../../lib/utils";

export const ParallaxScrollSecond = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-20%" });
  
  // Split images into three columns
  const columns = Array(3).fill(null).map((_, i) => 
    images.filter((_, index) => index % 3 === i)
  );

  return (
    <div
      ref={containerRef}
      className={cn("min-h-screen items-start w-full overflow-hidden", className)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-7xl mx-auto gap-10 py-20 px-10">
        {columns.map((column, colIndex) => (
          <div key={`column-${colIndex}`} className="grid gap-10">
            {column.map((image, imgIndex) => (
              <motion.div
                key={`grid-${colIndex}-${imgIndex}`}
                className="aspect-square"
                initial={{ 
                  opacity: 0,
                  y: 50,
                  x: colIndex === 0 ? -50 : colIndex === 2 ? 50 : 0
                }}
                animate={isInView ? { 
                  opacity: 1,
                  y: 0,
                  x: 0,
                  transition: {
                    duration: 0.8,
                    delay: imgIndex * 0.1,
                    ease: "easeOut"
                  }
                } : {}}
              >
                <motion.div
                  className="w-full h-full relative overflow-hidden rounded-lg shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={image}
                    className="w-full h-full object-cover rounded-lg border border-metallic-gold/30 hover:border-metallic-gold transition-colors duration-300"
                    alt={`Tattoo artwork ${colIndex * column.length + imgIndex + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};