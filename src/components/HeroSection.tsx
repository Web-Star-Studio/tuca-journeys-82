
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Array of hero images for rotation
const heroImages = [
  "/hero-noronha-1.jpg",
  "/hero-noronha-2.jpg",
  "/hero-noronha-3.jpg",
];

// Array of hero titles for rotation
const heroTitles = [
  "Descubra o Paraíso em Fernando de Noronha",
  "Experiências Exclusivas no Arquipélago",
  "Mergulhe em Águas Cristalinas",
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      {/* Background Image Slider */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Dark Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center max-w-4xl animate-fade-in">
          {heroTitles[currentImageIndex]}
        </h1>
        <p className="text-lg md:text-xl mb-8 text-center max-w-2xl animate-fade-in">
          Sua viagem perfeita começa aqui. Pacotes exclusivos, hospedagens selecionadas e experiências únicas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
          <Link to="/pacotes">
            <Button className="bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90 text-white min-w-[160px]">
              Ver Pacotes
            </Button>
          </Link>
          <Link to="/passeios">
            <Button className="bg-tuca-coral hover:bg-tuca-coral/90 text-white min-w-[160px]">
              Explorar Passeios
            </Button>
          </Link>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImageIndex
                ? "bg-white w-6"
                : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
