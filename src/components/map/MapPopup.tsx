
import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PointData {
  id: string;
  name: string;
  category: string;
  rating: number;
  image: string;
  price?: number;
}

interface MapPopupProps {
  point: PointData;
  onClose: () => void;
}

const MapPopup = ({ point, onClose }: MapPopupProps) => {
  // Determinar URL de redirecionamento com base na categoria
  const getViewUrl = () => {
    if (point.id.startsWith("tour-")) {
      const id = point.id.replace("tour-", "");
      return `/passeios/${id}`;
    } else if (point.id.startsWith("acc-")) {
      const id = point.id.replace("acc-", "");
      return `/hospedagens/${id}`;
    }
    return "#";
  };

  return (
    <div className="p-1">
      <div className="w-64 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative h-32 w-full">
          <img 
            src={point.image} 
            alt={point.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
            {point.category === "tours" && "Passeio"}
            {point.category === "accommodations" && "Hospedagem"}
            {point.category === "restaurants" && "Restaurante"}
            {point.category === "beaches" && "Praia"}
            {point.category === "attractions" && "Atração"}
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-medium text-base line-clamp-1">{point.name}</h3>
          
          <div className="flex items-center mt-1">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
              <span className="text-sm font-medium ml-1">{point.rating}</span>
            </div>
            
            {point.price && (
              <div className="ml-auto text-sm font-medium text-tuca-ocean-blue">
                R$ {point.price.toLocaleString('pt-BR')}
                {point.category === "accommodations" && "/noite"}
              </div>
            )}
          </div>
          
          <div className="mt-3 flex gap-2">
            {(point.category === "tours" || point.category === "accommodations") && (
              <Button 
                size="sm" 
                className="w-full bg-tuca-ocean-blue hover:bg-tuca-deep-blue"
                onClick={() => window.location.href = getViewUrl()}
              >
                Ver detalhes
              </Button>
            )}
            {point.category === "restaurants" && (
              <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-600">
                Ver menu
              </Button>
            )}
            <Button 
              size="sm" 
              variant="outline" 
              className="min-w-[32px]" 
              onClick={onClose}
            >
              ✕
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPopup;
