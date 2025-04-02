
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { heroImages } from "./HeroBackground";

type HeroIndicatorsProps = {
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  scrollProgress: number;
  scrollToNextSection: () => void;
};

const HeroIndicators = ({ 
  currentImageIndex, 
  setCurrentImageIndex, 
  scrollProgress, 
  scrollToNextSection 
}: HeroIndicatorsProps) => {
  return (
    <>
      {/* Image transition indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? "bg-white w-10"
                : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll down button */}
      <motion.button
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center z-20"
        animate={{ 
          y: [0, 10, 0],
          opacity: 1 - scrollProgress * 2
        }}
        transition={{ 
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          opacity: { duration: 0.3 }
        }}
      >
        <ChevronDown className="text-white h-6 w-6" />
      </motion.button>
    </>
  );
};

export default HeroIndicators;
