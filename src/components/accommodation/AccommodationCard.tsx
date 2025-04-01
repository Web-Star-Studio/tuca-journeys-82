
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        return <Wifi className="h-4 w-4" />;
      case "Ar-condicionado":
        return <Wind className="h-4 w-4" />;
      case "Café da manhã":
        return <Coffee className="h-4 w-4" />;
      case "Piscina":
      case "Piscina privativa":
        return <Waves className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={accommodation.image}
          alt={accommodation.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-tuca-coral text-white px-3 py-1 rounded-full text-sm font-medium">
          R$ {accommodation.price.toLocaleString('pt-BR')}/noite
        </div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="font-serif">{accommodation.title}</CardTitle>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{accommodation.rating}</span>
          </div>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{accommodation.location}</span>
        </div>
        <CardDescription>{accommodation.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <Users className="h-4 w-4 text-gray-500 mb-1" />
            <span className="text-xs text-center">{accommodation.capacity} pessoas</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <Bed className="h-4 w-4 text-gray-500 mb-1" />
            <span className="text-xs text-center">{accommodation.bedrooms} quartos</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <Bath className="h-4 w-4 text-gray-500 mb-1" />
            <span className="text-xs text-center">{accommodation.bathrooms} banheiros</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {accommodation.amenities.slice(0, 4).map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {accommodation.amenities.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{accommodation.amenities.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-tuca-ocean-blue hover:bg-tuca-deep-blue text-white">
          Ver Detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccommodationCard;
