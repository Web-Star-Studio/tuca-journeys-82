
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";

// Array of hero images for rotation with high-quality free-to-use images
const heroImages = [
  "/hero-noronha-beach.jpg",
  "/hero-noronha-aerial.jpg",
  "/hero-noronha-sunset.jpg",
];

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

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollPosition = window.scrollY;
      const heroHeight = containerRef.current.offsetHeight;
      const progress = Math.min(scrollPosition / heroHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to next section
  const scrollToNextSection = () => {
    const heroHeight = containerRef.current?.offsetHeight || 0;
    window.scrollTo({
      top: heroHeight,
      behavior: "smooth"
    });
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Image Slider with Parallax */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentImageIndex ? 1 : 0,
              scale: index === currentImageIndex ? 1 : 1.1,
              y: scrollProgress * -100 // Parallax effect
            }}
            transition={{ 
              opacity: { duration: 1.5 },
              scale: { duration: 7 }
            }}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>

      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60 z-10" />
      
      {/* Abstract shapes for visual interest */}
      <div className="absolute right-0 top-1/4 w-48 h-48 rounded-full bg-tuca-ocean-blue/20 blur-3xl z-10 animate-pulse" />
      <div className="absolute left-10 bottom-1/4 w-40 h-40 rounded-full bg-tuca-coral/20 blur-3xl z-10 animate-pulse" 
           style={{ animationDelay: "1s" }} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 sm:px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-medium tracking-tight mb-6 text-center max-w-4xl text-white"
            animate={{ opacity: 1 - scrollProgress * 2 }}
          >
            {heroTitles[currentImageIndex]}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl font-light mb-12 text-center max-w-3xl mx-auto text-white/90"
            animate={{ opacity: 1 - scrollProgress * 2 }}
          >
            {heroSubtitles[currentImageIndex]}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            animate={{ opacity: 1 - scrollProgress * 2 }}
          >
            <Link to="/passeios">
              <Button 
                className="rounded-full px-8 py-6 bg-white text-foreground hover:bg-white/90 transition-all duration-300 group relative overflow-hidden"
                size="lg"
              >
                <span className="relative z-10">Explorar Passeios</span>
                <span className="absolute inset-0 bg-tuca-ocean-blue/80 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/pacotes">
              <Button 
                className="rounded-full px-8 py-6 bg-transparent backdrop-blur-md hover:bg-white/10 text-white border border-white/30"
                size="lg"
              >
                Ver Pacotes
              </Button>
            </Link>
          </motion.div>

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
        </motion.div>
      </div>

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
    </section>
  );
};

export default HeroSection;
