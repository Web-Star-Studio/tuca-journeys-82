import { motion } from "framer-motion";
type HeroScrollIndicatorProps = {
  scrollProgress: number;
  scrollToNextSection: () => void;
};
const HeroScrollIndicator = ({
  scrollProgress,
  scrollToNextSection
}: HeroScrollIndicatorProps) => {
  return <>
      {/* Scroll indicator */}
      <motion.div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer" animate={{
      opacity: 1 - scrollProgress * 3,
      y: scrollProgress * 50
    }} onClick={scrollToNextSection}>
        
        
      </motion.div>
    </>;
};
export default HeroScrollIndicator;