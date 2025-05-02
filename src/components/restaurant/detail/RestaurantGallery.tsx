
import React, { useState } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import type { Restaurant } from '@/types/restaurant';

interface RestaurantGalleryProps {
  restaurant: Restaurant;
  className?: string;
}

const RestaurantGallery: React.FC<RestaurantGalleryProps> = ({ restaurant, className }) => {
  const [currentImage, setCurrentImage] = useState(0);
  
  // Combine main image with gallery images
  const allImages = [
    restaurant.image_url,
    ...(restaurant.gallery_images || []),
  ].filter(Boolean);

  return (
    <div className={className}>
      <Carousel>
        <CarouselContent>
          {allImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <img 
                  src={image} 
                  alt={`${restaurant.name} image ${index + 1}`} 
                  className="object-cover w-full h-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      
      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-auto pb-2">
          {allImages.map((image, index) => (
            <div 
              key={index}
              className={`
                cursor-pointer border-2 rounded-md overflow-hidden
                ${currentImage === index ? 'border-primary' : 'border-transparent'}
                h-16 w-24 flex-shrink-0
              `}
              onClick={() => setCurrentImage(index)}
            >
              <img 
                src={image} 
                alt={`${restaurant.name} thumbnail ${index + 1}`} 
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantGallery;
