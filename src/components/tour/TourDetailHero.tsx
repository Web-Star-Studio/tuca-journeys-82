
import React from "react";
import { MapPin, Clock, Star } from "lucide-react";
import { Tour } from "@/data/tours";
import SafeImage from "@/components/ui/safe-image";

interface TourDetailHeroProps {
  tour: Tour;
}

const TourDetailHero = ({ tour }: TourDetailHeroProps) => {
  return (
    <div className="relative h-[50vh] bg-cover bg-center">
      <SafeImage
        src={tour.image}
        alt={tour.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30 flex items-end">
        <div className="container mx-auto px-4 pb-8">
          <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-lg inline-block">
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-gray-900">{tour.title}</h1>
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="flex items-center text-gray-700">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{tour.location}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">{tour.duration}</span>
              </div>
              <div className="flex items-center text-yellow-500">
                <Star className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{tour.rating}/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailHero;
