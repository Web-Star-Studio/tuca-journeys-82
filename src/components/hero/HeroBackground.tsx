
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import SafeImage from "@/components/ui/safe-image";

// Array of hero images with our new images
const heroImages = [
  "/lovable-uploads/1da99f74-2aae-4813-af7f-d1cd24839a2d.png", // Fernando de Noronha two rocks image
  "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png", // Fernando de Noronha underwater image
  "/lovable-uploads/1ee83aef-4d58-4201-9998-59a29833ea4e.png", // Fernando de Noronha beach image
  "/lovable-uploads/949f8aa0-19c8-4df4-b751-b730f41db238.png", // Fernando de Noronha church image
  "/lovable-uploads/29f781ec-249e-490d-b220-30ce02793db1.png"  // Fernando de Noronha sunset image
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
              scale: index === currentImageIndex ? 1.1 : 1, // Changed from scale down to scale up (zoom in)
              y: scrollProgress * -150 // Enhanced parallax effect
            }}
            transition={{ 
              opacity: { duration: 1.8, ease: "easeInOut" },
              scale: { duration: 8, ease: "easeOut" } // Slower scale animation for more subtle effect
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
