
import { FilterCategory } from "@/contexts/MapFilterContext";
import { Bed, LandPlot, MapPin, Palmtree, UtensilsCrossed } from "lucide-react";

export const getCategoryIcon = (category: FilterCategory) => {
  switch(category) {
    case "tours": return <MapPin size={16} />;
    case "accommodations": return <Bed size={16} />;
    case "restaurants": return <UtensilsCrossed size={16} />;
    case "beaches": return <Palmtree size={16} />;
    case "attractions": return <LandPlot size={16} />;
  }
};

export const getCategoryColor = (category: FilterCategory) => {
  switch(category) {
    case "tours": return "bg-tuca-ocean-blue text-white";
    case "accommodations": return "bg-green-500 text-white";
    case "restaurants": return "bg-amber-500 text-white";
    case "beaches": return "bg-blue-400 text-white";
    case "attractions": return "bg-purple-500 text-white";
  }
};

export const getCategoryLabel = (category: FilterCategory) => {
  switch(category) {
    case "tours": return "Passeios";
    case "accommodations": return "Hospedagens";
    case "restaurants": return "Restaurantes";
    case "beaches": return "Praias";
    case "attractions": return "Atrações";
  }
};

export const allCategories: FilterCategory[] = ["tours", "accommodations", "restaurants", "beaches", "attractions"];
