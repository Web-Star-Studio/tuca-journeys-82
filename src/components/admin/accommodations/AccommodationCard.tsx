
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Edit, Trash2, Calendar, MapPin, Star } from "lucide-react";
import { Accommodation } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import SafeImage from "@/components/ui/safe-image";

interface AccommodationCardProps {
  accommodation: Accommodation;
  onEditAccommodation: (accommodation: Accommodation) => void;
  onDeleteAccommodation: (accommodation: Accommodation) => void;
  disabled?: boolean;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({
  accommodation,
  onEditAccommodation,
  onDeleteAccommodation,
  disabled = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Handlers with proper event stopping to prevent bubbling
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      onEditAccommodation(accommodation);
    }
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      onDeleteAccommodation(accommodation);
    }
  };
  
  return (
    <Card className="overflow-hidden border-0 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 hover-scale bg-white">
      <div className="relative aspect-[4/3] overflow-hidden">
        <SafeImage
          src={accommodation.image_url}
          alt={accommodation.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${imageLoaded ? 'hover:scale-110' : ''}`}
          onLoadSuccess={() => setImageLoaded(true)}
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-foreground text-xs px-3 py-1.5 rounded-full font-medium">
          {accommodation.type}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium">{accommodation.title}</h3>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{accommodation.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{accommodation.location || accommodation.address}</span>
        </div>
        
        <p className="text-muted-foreground mb-6 line-clamp-2">
          {accommodation.description}
        </p>

        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
            <span className="text-xs font-medium">{accommodation.max_guests}</span>
            <span className="text-xs text-muted-foreground">hóspedes</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
            <span className="text-xs font-medium">{accommodation.bedrooms}</span>
            <span className="text-xs text-muted-foreground">quartos</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
            <span className="text-xs font-medium">{accommodation.bathrooms}</span>
            <span className="text-xs text-muted-foreground">banheiros</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-tuca-ocean-blue">
            <span className="text-sm">Por noite</span>
            <p className="text-xl font-medium">R$ {accommodation.price_per_night.toFixed(2)}</p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-tuca-medium-blue hover:text-tuca-ocean-blue hover:bg-tuca-light-blue/40"
              disabled={disabled}
            >
              <Link to={`/admin/accommodations/${accommodation.id}/availability`}>
                <Calendar className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-tuca-medium-blue hover:text-tuca-ocean-blue hover:bg-tuca-light-blue/40"
              disabled={disabled}
            >
              <Link to={`/hospedagens/${accommodation.id}`} target="_blank">
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-tuca-ocean-blue hover:bg-tuca-light-blue/40"
              onClick={handleEdit}
              disabled={disabled}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleDelete}
              disabled={disabled}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AccommodationCard;
