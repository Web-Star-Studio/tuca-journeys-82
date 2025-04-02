
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import SafeImage from "@/components/ui/safe-image";

// Array of hero images for rotation with high-quality free-to-use images
const heroImages = [
  "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1932&auto=format&fit=crop"
];

type HeroBackgroundProps = {
  currentImageIndex: number;
  scrollProgress: number;
};

const HeroBackground = ({ currentImageIndex, scrollProgress }: HeroBackgroundProps) => {
  // Preload all hero images
  const preloadImages = () => {
    heroImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  };

  // Preload images on component mount
  useEffect(() => {
    preloadImages();
  }, []);

  return (
    <>
      {/* Background Image Slider with Parallax */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentImageIndex ? 1 : 0,
              scale: index === currentImageIndex ? 1 : 1.1,
              y: scrollProgress * -150 // Enhanced parallax effect
            }}
            transition={{ 
              opacity: { duration: 1.8, ease: "easeInOut" },
              scale: { duration: 8, ease: "easeOut" }
            }}
          >
            <SafeImage
              src={image}
              alt={`Fernando de Noronha - Scene ${index + 1}`}
              className="w-full h-full object-cover"
              fallbackSrc="/placeholder.svg"
            />
          </motion.div>
        ))}
      </div>

      {/* Modern gradient overlay with improved aesthetics */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />
      
      {/* Enhanced abstract shapes with better animation */}
      <div className="absolute right-0 top-1/4 w-64 h-64 rounded-full bg-tuca-ocean-blue/20 blur-3xl z-10 opacity-60 animate-pulse" 
           style={{ animationDuration: "8s" }} />
      <div className="absolute left-10 bottom-1/4 w-52 h-52 rounded-full bg-tuca-light-blue/30 blur-3xl z-10 opacity-50 animate-pulse" 
           style={{ animationDuration: "10s", animationDelay: "1s" }} />
      <div className="absolute left-1/4 top-1/3 w-40 h-40 rounded-full bg-tuca-deep-blue/20 blur-3xl z-10 opacity-40 animate-pulse" 
           style={{ animationDuration: "12s", animationDelay: "2s" }} />
    </>
  );
};

export default HeroBackground;
export { heroImages };
