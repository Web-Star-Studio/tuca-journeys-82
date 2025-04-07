
import React from "react";
import { MapPin, Compass, Hotel, Calendar, Home, Umbrella, Landmark, Building, Coffee, GraduationCap } from "lucide-react";
import { FilterCategory } from "@/contexts/MapFilterContext";

export const allCategories: FilterCategory[] = [
  "tours", 
  "accommodations", 
  "events", 
  "beaches", 
  "attractions",
  "restaurants",
  "museums",
  "historical"
];

export const getCategoryLabel = (category: FilterCategory): string => {
  switch(category) {
    case "tours": return "Passeios";
    case "accommodations": return "Hospedagens";
    case "events": return "Eventos";
    case "beaches": return "Praias";
    case "attractions": return "Atrações";
    case "restaurants": return "Restaurantes";
    case "museums": return "Museus";
    case "historical": return "Histórico";
    default: return category;
  }
};

export const getCategoryIcon = (category: FilterCategory) => {
  switch(category) {
    case "tours": return <Compass size={16} />;
    case "accommodations": return <Hotel size={16} />;
    case "events": return <Calendar size={16} />;
    case "beaches": return <Umbrella size={16} />;
    case "attractions": return <MapPin size={16} />;
    case "restaurants": return <Coffee size={16} />;
    case "museums": return <Landmark size={16} />; // Changed from Museum to Landmark
    case "historical": return <Building size={16} />;
    default: return <Home size={16} />;
  }
};

export const getCategoryColor = (category: FilterCategory): string => {
  switch(category) {
    case "tours": return "bg-blue-500 text-white";
    case "accommodations": return "bg-pink-500 text-white";
    case "events": return "bg-green-500 text-white";
    case "beaches": return "bg-cyan-500 text-white";
    case "attractions": return "bg-purple-500 text-white";
    case "restaurants": return "bg-amber-500 text-white";
    case "museums": return "bg-indigo-500 text-white";
    case "historical": return "bg-rose-500 text-white";
    default: return "bg-gray-500 text-white";
  }
};
