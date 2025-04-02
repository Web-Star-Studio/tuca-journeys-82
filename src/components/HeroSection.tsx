
import { useState, useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import HeroBackground from "./hero/HeroBackground";
import HeroContent from "./hero/HeroContent";
import HeroScrollIndicator from "./hero/HeroScrollIndicator";
import HeroIndicators from "./hero/HeroIndicators";

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Auto-rotate images with improved timing
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 5); // Updated to use all 5 images
    }, 7000); // Slightly longer for better user experience

    return () => clearInterval(interval);
  }, []);

  // Enhanced scroll effect handling
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollPosition = window.scrollY;
      const heroHeight = containerRef.current.offsetHeight;
      const progress = Math.min(scrollPosition / (heroHeight * 0.8), 1); // Use 80% of hero height for better effect
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Improved smooth scroll to next section
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
      className="relative w-screen h-screen overflow-hidden"
    >
      <HeroBackground 
        currentImageIndex={currentImageIndex} 
        scrollProgress={scrollProgress} 
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 w-full">
        <HeroContent 
          currentImageIndex={currentImageIndex} 
          scrollProgress={scrollProgress} 
        />

        <HeroScrollIndicator 
          scrollProgress={scrollProgress} 
          scrollToNextSection={scrollToNextSection} 
        />
      </div>

      <HeroIndicators 
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        scrollProgress={scrollProgress}
        scrollToNextSection={scrollToNextSection}
      />
    </section>
  );
};

export default HeroSection;
