
import React from "react";
import { Accommodation } from "@/data/accommodations";

interface AccommodationDetailGalleryProps {
  accommodation: Accommodation;
}

const AccommodationDetailGallery = ({ accommodation }: AccommodationDetailGalleryProps) => {
  return (
    <div className="container mx-auto px-4 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg overflow-hidden">
        <div className="md:col-span-2 h-80 md:h-[500px] relative">
          <img
            src={accommodation.image}
            alt={accommodation.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:grid grid-rows-2 gap-4">
          <div className="h-full">
            <img
              src={accommodation.image}
              alt={accommodation.title}
              className="w-full h-full object-cover brightness-95"
            />
          </div>
          <div className="h-full">
            <img
              src={accommodation.image}
              alt={accommodation.title}
              className="w-full h-full object-cover brightness-90"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationDetailGallery;
