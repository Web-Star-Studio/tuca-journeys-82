
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Array of hero images for accommodations
const heroImages = [
  "/hero-noronha-beach.jpg",
  "/hero-noronha-aerial.jpg",
  "/hero-noronha-sunset.jpg",
];

const AccommodationHero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Navigation functions
  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % heroImages.length
    );
  };

  return (
    <section className="relative">
      {/* Image Slider */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ 
              backgroundImage: `url('${image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center" 
            }}
          />
        ))}
        
        {/* Dark Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-10" />
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white px-6 max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Hospedagens em Fernando de Noronha
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-white/90">
              Descubra as melhores opções de estadia para uma experiência completa na ilha.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 hover:bg-white/90 px-8 py-3 rounded-full transition-all duration-300">
                Ver Disponibilidade
              </button>
              <button className="bg-transparent border border-white text-white hover:bg-white/20 px-8 py-3 rounded-full transition-all duration-300">
                Explorar Opções
              </button>
            </div>
          </div>
        </div>
        
        {/* Navigation arrows */}
        <button 
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
          aria-label="Previous image"
        >
          <ArrowLeft size={24} />
        </button>
        
        <button 
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
          aria-label="Next image"
        >
          <ArrowRight size={24} />
        </button>
        
        {/* Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
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
      </div>
      
      {/* Booking info banner */}
      <div className="bg-white py-6 shadow-md relative z-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-tuca-ocean-blue/10 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tuca-ocean-blue">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Melhor época para visitar</p>
              <p className="font-medium">Agosto a Dezembro</p>
            </div>
          </div>
          
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-tuca-coral/10 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tuca-coral">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Localização</p>
              <p className="font-medium">Fernando de Noronha, PE</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-tuca-green/10 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tuca-green">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Duração ideal</p>
              <p className="font-medium">5-7 dias</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccommodationHero;
