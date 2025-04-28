
import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Edit, Trash2, Calendar } from "lucide-react";
import { Accommodation } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <div className="relative h-48">
        <img
          src={accommodation.image_url}
          alt={accommodation.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg"; // Fallback para imagem padrão
          }}
        />
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm"
        >
          {accommodation.type}
        </Badge>
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-tuca-deep-blue">{accommodation.title}</h3>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <span className="mr-3">R$ {accommodation.price_per_night.toFixed(2)}/noite</span>
              <div className="flex items-center">
                <span className="mr-1 text-yellow-500">★</span>
                {accommodation.rating}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
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
              onClick={() => onEditAccommodation(accommodation)}
              disabled={disabled}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => onDeleteAccommodation(accommodation)}
              disabled={disabled}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccommodationCard;
