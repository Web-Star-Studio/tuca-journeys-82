
import { useState, useEffect, useRef } from "react";
import HeroBackground from "./hero/HeroBackground";
import HeroContent from "./hero/HeroContent";
import HeroScrollIndicator from "./hero/HeroScrollIndicator";
import HeroIndicators from "./hero/HeroIndicators";

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3);
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
      <HeroBackground 
        currentImageIndex={currentImageIndex} 
        scrollProgress={scrollProgress} 
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 sm:px-8 md:px-16">
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
