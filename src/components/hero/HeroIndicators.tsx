
import { motion } from "framer-motion";
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
      <motion.div 
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20"
        animate={{ opacity: 1 - scrollProgress * 2 }}
      >
        {heroImages.map((_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrentImageIndex(index)} 
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? "bg-white w-10" : "bg-white/40"
            }`} 
            aria-label={`Go to slide ${index + 1}`} 
          />
        ))}
      </motion.div>
    </>
  );
};

export default HeroIndicators;
