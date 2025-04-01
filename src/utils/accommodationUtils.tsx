
import React from "react";
import { Wifi, Wind, Coffee, Waves } from "lucide-react";

export const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case "Wi-Fi":
      return <Wifi className="h-3 w-3" />;
    case "Ar-condicionado":
      return <Wind className="h-3 w-3" />;
    case "Café da manhã":
      return <Coffee className="h-3 w-3" />;
    case "Piscina":
    case "Piscina privativa":
      return <Waves className="h-3 w-3" />;
    default:
      return null;
  }
};
