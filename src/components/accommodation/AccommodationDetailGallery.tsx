
import React, { useState } from "react";
import { Accommodation } from "@/data/accommodations";
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, Maximize } from "lucide-react";
import SafeImage from "@/components/ui/safe-image";

interface AccommodationDetailGalleryProps {
  accommodation: Accommodation;
}

const AccommodationDetailGallery = ({ accommodation }: AccommodationDetailGalleryProps) => {
  // Use all 5 images for demonstration purposes
  const images = [
    accommodation.image,
    "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png",
    "/lovable-uploads/1ee83aef-4d58-4201-9998-59a29833ea4e.png",
    "/lovable-uploads/949f8aa0-19c8-4df4-b751-b730f41db238.png",
    "/lovable-uploads/29f781ec-249e-490d-b220-30ce02793db1.png",
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageLoaded = (imageSrc: string) => {
    setLoadedImages(prev => new Set(prev).add(imageSrc));
  };

  return (
    <div className="container mx-auto px-4 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg overflow-hidden">
        <div className="md:col-span-2 h-80 md:h-[500px] relative group">
          <SafeImage
            src={images[0]}
            alt={accommodation.title}
            className="w-full h-full object-cover"
            onLoadSuccess={() => handleImageLoaded(images[0])}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Dialog open={showFullscreen} onOpenChange={setShowFullscreen}>
              <DialogTrigger asChild>
                <button className="p-2 bg-white rounded-full">
                  <Maximize className="w-5 h-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl h-[80vh] p-0 bg-black">
                <div className="relative h-full flex items-center justify-center">
                  <SafeImage
                    src={images[currentImageIndex]}
                    alt={`${accommodation.title} - Imagem ${currentImageIndex + 1}`}
                    className="max-h-full max-w-full object-contain"
                    onLoadSuccess={() => handleImageLoaded(images[currentImageIndex])}
                  />
                  
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 p-2 bg-white/80 rounded-full hover:bg-white/100 transition-colors"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 p-2 bg-white/80 rounded-full hover:bg-white/100 transition-colors"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  
                  <button 
                    onClick={() => setShowFullscreen(false)}
                    className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white/100 transition-colors"
                    aria-label="Fechar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex 
                            ? "bg-white" 
                            : "bg-white/50"
                        }`}
                        aria-label={`Ver imagem ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="hidden md:grid grid-rows-2 gap-4">
          <div className="h-full relative group cursor-pointer" onClick={() => {
            setCurrentImageIndex(1);
            setShowFullscreen(true);
          }}>
            <SafeImage
              src={images[1]}
              alt={accommodation.title}
              className="w-full h-full object-cover brightness-95"
              onLoadSuccess={() => handleImageLoaded(images[1])}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
          </div>
          <div className="h-full relative group cursor-pointer" onClick={() => {
            setCurrentImageIndex(2);
            setShowFullscreen(true);
          }}>
            <SafeImage
              src={images[2]}
              alt={accommodation.title}
              className="w-full h-full object-cover brightness-90"
              onLoadSuccess={() => handleImageLoaded(images[2])}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationDetailGallery;
