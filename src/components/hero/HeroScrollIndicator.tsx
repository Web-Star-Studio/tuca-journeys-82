
import { motion } from "framer-motion";

type HeroScrollIndicatorProps = {
  scrollProgress: number;
  scrollToNextSection: () => void;
};

const HeroScrollIndicator = ({ scrollProgress, scrollToNextSection }: HeroScrollIndicatorProps) => {
  return (
    <>
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
        animate={{ 
          opacity: 1 - scrollProgress * 3,
          y: scrollProgress * 50 
        }}
        onClick={scrollToNextSection}
      >
        <span className="text-white/80 text-sm mb-2">Descubra Mais</span>
        <div className="w-8 h-14 border-2 border-white/50 rounded-full flex justify-center p-1">
          <motion.div 
            className="w-1.5 h-3 bg-white rounded-full"
            animate={{ 
              y: [0, 15, 0],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut" 
            }}
          />
        </div>
      </motion.div>
    </>
  );
};

export default HeroScrollIndicator;
