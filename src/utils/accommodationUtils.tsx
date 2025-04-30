
import React from 'react';
import { Wifi, Wind, Coffee, Waves, Bath, Bed, Users, Utensils, Tv, Lock, Car, Fan } from 'lucide-react';

/**
 * Returns the appropriate icon component for a given amenity
 * @param amenity The amenity name
 * @returns React component for the amenity icon
 */
export const getAmenityIcon = (amenity: string) => {
  const iconSize = { className: "h-4 w-4" };
  
  switch (amenity.toLowerCase()) {
    case "wi-fi":
    case "wifi":
    case "internet":
      return <Wifi {...iconSize} />;
    case "ar-condicionado":
    case "ar condicionado":
      return <Wind {...iconSize} />;
    case "café da manhã":
    case "cafe da manha":
      return <Coffee {...iconSize} />;
    case "piscina":
    case "piscina privativa":
      return <Waves {...iconSize} />;
    case "cozinha":
    case "cozinha equipada":
      return <Utensils {...iconSize} />;
    case "tv":
    case "televisão":
    case "smart tv":
      return <Tv {...iconSize} />;
    case "segurança":
    case "segurança 24h":
      return <Lock {...iconSize} />;
    case "estacionamento":
    case "garagem":
      return <Car {...iconSize} />;
    case "ventilador":
    case "ventilador de teto":
      return <Fan {...iconSize} />;
    default:
      return null;
  }
};

/**
 * Format price for display with currency symbol
 * @param price The price to format
 * @returns Formatted price string
 */
export const formatAccommodationPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  }).format(price);
};

/**
 * Calculate discount price
 * @param originalPrice Original price
 * @param discountPercentage Discount percentage (0-100)
 * @returns Discounted price
 */
export const calculateDiscountedPrice = (originalPrice: number, discountPercentage: number): number => {
  if (discountPercentage <= 0 || discountPercentage > 100) return originalPrice;
  return originalPrice * (1 - discountPercentage / 100);
};
