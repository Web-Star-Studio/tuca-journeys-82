
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Wifi, Wind, Coffee, Waves, Users, Bed, Bath } from "lucide-react";
import { Accommodation } from "@/data/accommodations";

interface AccommodationCardProps {
  accommodation: Accommodation;
}

const AccommodationCard = ({ accommodation }: AccommodationCardProps) => {
  // Get icon for amenity
  const getAmenityIcon = (amenity: string) => {
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

  return (
    <Card className="overflow-hidden border-0 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 hover-scale bg-white">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={accommodation.image}
          alt={accommodation.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-medium">{accommodation.title}</h3>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{accommodation.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{accommodation.location}</span>
        </div>
        
        <p className="text-muted-foreground mb-6 line-clamp-2">
          {accommodation.description}
        </p>

        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
            <Users className="h-4 w-4 text-muted-foreground mb-1" />
            <span className="text-xs text-center">{accommodation.capacity} pessoas</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
            <Bed className="h-4 w-4 text-muted-foreground mb-1" />
            <span className="text-xs text-center">{accommodation.bedrooms} quartos</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
            <Bath className="h-4 w-4 text-muted-foreground mb-1" />
            <span className="text-xs text-center">{accommodation.bathrooms} banheiros</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-tuca-ocean-blue">
            <span className="text-sm">Por noite</span>
            <p className="text-xl font-medium">R$ {accommodation.price.toLocaleString('pt-BR')}</p>
          </div>
          <Link to={`/hospedagens/${accommodation.id}`}>
            <Button className="rounded-full bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90">
              Ver Detalhes
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default AccommodationCard;
