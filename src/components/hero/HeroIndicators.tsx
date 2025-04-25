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
  return <>
      {/* Image transition indicators with improved UX */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1 - scrollProgress * 2,
      y: 0
    }} transition={{
      delay: 1,
      duration: 0.6
    }} className="absolute bottom-8 md:bottom-12 left-[31rem] transform -translate-x-1/2 flex space-x-3 z-20">
        {heroImages.map((_, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={`h-2.5 rounded-full transition-all duration-500 ${index === currentImageIndex ? "bg-white w-12" : "bg-white/40 w-2.5 hover:bg-white/70"}`} aria-label={`Go to slide ${index + 1}`} />)}
      </motion.div>
    </>;
};
export default HeroIndicators;