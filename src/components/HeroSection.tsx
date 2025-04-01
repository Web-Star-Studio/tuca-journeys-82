
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Array of hero images for rotation
const heroImages = [
  "/hero-noronha-1.jpg",
  "/hero-noronha-2.jpg",
  "/hero-noronha-3.jpg",
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      {/* Background Image Slider */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-2000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Dark Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 z-10" />

      {/* Content */}
      <div className="hero-content">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-4 text-center max-w-4xl text-white animate-fade-in">
          {heroTitles[currentImageIndex]}
        </h1>
        <p className="text-xl md:text-2xl font-light mb-12 text-center max-w-2xl text-white/90 animate-fade-in">
          {heroSubtitles[currentImageIndex]}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
          <Link to="/passeios">
            <Button className="rounded-full text-sm px-8 py-6 bg-white text-foreground hover:bg-white/90 transition-all duration-300">
              Explorar Passeios
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/pacotes">
            <Button className="rounded-full text-sm px-8 py-6 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-0">
              Ver Pacotes
            </Button>
          </Link>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? "bg-white w-8"
                : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
