
import React from "react";

interface TourBookingInfoProps {
  image: string;
  title: string;
  description: string;
  duration: string;
  location: string;
  price: number;
}

export const TourBookingInfo = ({
  image,
  title,
  description,
  duration,
  location,
  price
}: TourBookingInfoProps) => {
  return (
    <div>
      <img 
        src={image} 
        alt={title} 
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-y-2">
        <p><strong>Duração:</strong> {duration}</p>
        <p><strong>Local:</strong> {location}</p>
        <p><strong>Preço por pessoa:</strong> R$ {price.toLocaleString('pt-BR')}</p>
      </div>
    </div>
  );
};
