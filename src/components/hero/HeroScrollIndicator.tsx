
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type HeroScrollIndicatorProps = {
  scrollProgress: number;
  scrollToNextSection: () => void;
};

const HeroScrollIndicator = ({
  scrollProgress,
  scrollToNextSection
}: HeroScrollIndicatorProps) => {
  return (
    <motion.div 
      className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer" 
      animate={{
        opacity: 1 - scrollProgress * 3,
        y: scrollProgress * 50
      }} 
      onClick={scrollToNextSection}
    >
      <div className="text-white/80 text-sm font-light mb-2">Role para explorar</div>
      <ChevronDown className="text-white h-6 w-6 animate-bounce" />
    </motion.div>
  );
};

export default HeroScrollIndicator;
