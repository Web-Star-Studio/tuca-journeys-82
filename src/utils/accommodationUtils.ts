
import React from "react";
import { Wifi, Wind, Coffee, Waves, Utensils, Car, Tv, 
  Parking, Dog, Sprout, Shield, Coffee as CoffeeIcon } from "lucide-react";

/**
 * Returns the icon component for a given amenity
 */
export const getAmenityIcon = (amenity: string) => {
  switch (amenity.toLowerCase()) {
    case "wi-fi":
    case "wifi":
      return <Wifi className="h-4 w-4 text-tuca-ocean-blue" />;
    case "ar-condicionado":
    case "a/c":
    case "ar condicionado":
      return <Wind className="h-4 w-4 text-tuca-ocean-blue" />;
    case "café da manhã":
    case "cafe da manha":
    case "café da manha":
    case "cafe da manhã":
      return <Coffee className="h-4 w-4 text-tuca-ocean-blue" />;
    case "piscina":
    case "piscina privativa":
      return <Waves className="h-4 w-4 text-tuca-ocean-blue" />;
    case "cozinha equipada":
    case "cozinha":
    case "cozinha completa":
      return <Utensils className="h-4 w-4 text-tuca-ocean-blue" />;
    case "tv":
    case "televisão":
    case "televisao":
    case "smart tv":
      return <Tv className="h-4 w-4 text-tuca-ocean-blue" />;
    case "estacionamento":
    case "vaga de garagem":
      return <Parking className="h-4 w-4 text-tuca-ocean-blue" />;
    case "pet friendly":
    case "aceita pets":
    case "pets":
      return <Dog className="h-4 w-4 text-tuca-ocean-blue" />;
    case "área verde":
    case "area verde":
    case "jardim":
      return <Sprout className="h-4 w-4 text-tuca-ocean-blue" />;
    case "segurança":
    case "seguranca":
    case "sistema de segurança":
      return <Shield className="h-4 w-4 text-tuca-ocean-blue" />;
    case "churrasqueira":
      return <CoffeeIcon className="h-4 w-4 text-tuca-ocean-blue" />;
    default:
      return <div className="h-4 w-4 rounded-full bg-tuca-light-blue" />;
  }
};
