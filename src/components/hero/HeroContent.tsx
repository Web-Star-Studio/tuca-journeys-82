
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Array of hero titles for rotation
const heroTitles = [
  "Descubra o Paraíso",
  "Experiências Exclusivas",
  "Águas Cristalinas",
];

// Array of hero subtitles for rotation
const heroSubtitles = [
  "Fernando de Noronha como você nunca viu.",
  "Momentos únicos no arquipélago mais preservado do Brasil.",
  "Mergulhe em um dos mares mais ricos em biodiversidade do mundo."
];

type HeroContentProps = {
  currentImageIndex: number;
  scrollProgress: number;
};

const HeroContent = ({ currentImageIndex, scrollProgress }: HeroContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl"
    >
      <motion.h1 
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6 text-white text-shadow-lg"
        animate={{ opacity: 1 - scrollProgress * 2 }}
      >
        {heroTitles[currentImageIndex]}
      </motion.h1>
      
      <motion.p 
        className="text-lg sm:text-xl md:text-2xl font-light mb-8 md:mb-12 text-white/90 text-shadow-sm leading-relaxed"
        animate={{ opacity: 1 - scrollProgress * 2 }}
      >
        {heroSubtitles[currentImageIndex]}
      </motion.p>
      
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        animate={{ opacity: 1 - scrollProgress * 2 }}
      >
        <Link to="/passeios">
          <Button 
            className="rounded-full px-6 py-5 sm:px-8 sm:py-6 bg-white text-foreground hover:bg-white/90 transition-all duration-300 group relative overflow-hidden w-full sm:w-auto min-w-[200px]"
            size="lg"
          >
            <span className="relative z-10">Explorar Passeios</span>
            <span className="absolute inset-0 bg-tuca-ocean-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
            <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        
        <Link to="/pacotes">
          <Button 
            className="rounded-full px-6 py-5 sm:px-8 sm:py-6 bg-transparent backdrop-blur-md hover:bg-white/10 text-white border border-white/30 w-full sm:w-auto min-w-[200px]"
            size="lg"
          >
            Ver Pacotes
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
export { heroTitles, heroSubtitles };
