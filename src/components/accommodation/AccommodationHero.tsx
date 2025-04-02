
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import SafeImage from "@/components/ui/safe-image";

// Array of hero images for accommodations
const heroImages = [
  "/lovable-uploads/1da99f74-2aae-4813-af7f-d1cd24839a2d.png",
  "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png",
  "/lovable-uploads/1ee83aef-4d58-4201-9998-59a29833ea4e.png"
];

const AccommodationHero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  
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

  // Track loaded images
  const handleImageLoaded = (imageSrc: string) => {
    setLoadedImages(prev => new Set(prev).add(imageSrc));
  };

  return (
    <section className="relative">
      {/* Image Slider */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <SafeImage
              src={image}
              alt={`Fernando de Noronha Accommodation - Scene ${index + 1}`}
              className="w-full h-full object-cover"
              fallbackSrc="/placeholder.svg"
              onLoadSuccess={() => handleImageLoaded(image)}
            />
          </div>
        ))}
        
        {/* Dark Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10" />
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white px-6 max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 tracking-tight">
              Hospedagens em Fernando de Noronha
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-white/90 font-light">
              Descubra as melhores opções de estadia para uma experiência completa na ilha.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 hover:bg-white/90 px-8 py-3 rounded-full transition-all duration-300 font-medium">
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
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Previous image"
        >
          <ArrowLeft size={24} />
        </button>
        
        <button 
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Next image"
        >
          <ArrowRight size={24} />
        </button>
        
        {/* Pagination Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-3 transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white w-8 rounded-full"
                  : "bg-white/40 w-3 rounded-full"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Booking info banner */}
      <div className="bg-white py-8 shadow-lg relative z-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center group hover:bg-gray-50 p-4 rounded-xl transition-colors">
            <div className="bg-tuca-ocean-blue/10 p-4 rounded-full mr-4">
              <Calendar className="h-6 w-6 text-tuca-ocean-blue" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-500 font-medium">Melhor época para visitar</p>
              <p className="font-medium text-lg">Agosto a Dezembro</p>
            </div>
          </div>
          
          <div className="flex items-center group hover:bg-gray-50 p-4 rounded-xl transition-colors">
            <div className="bg-tuca-coral/10 p-4 rounded-full mr-4">
              <MapPin className="h-6 w-6 text-tuca-coral" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-500 font-medium">Localização</p>
              <p className="font-medium text-lg">Fernando de Noronha, PE</p>
            </div>
          </div>
          
          <div className="flex items-center group hover:bg-gray-50 p-4 rounded-xl transition-colors">
            <div className="bg-tuca-green/10 p-4 rounded-full mr-4">
              <Clock className="h-6 w-6 text-tuca-green" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-500 font-medium">Duração ideal</p>
              <p className="font-medium text-lg">5-7 dias</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccommodationHero;
