import React from "react";
import { Tour } from "@/types/database";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, PencilIcon, CalendarIcon, Trash2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/formatters";
import { Switch } from "@/components/ui/switch";
import { useTours } from "@/hooks/use-tours";

interface TourCardProps {
  tour: Tour;
  onEditTour: (tour: Tour) => void;
  onDeleteTour: (tour: Tour) => void;
  disabled?: boolean;
}

const TourCard: React.FC<TourCardProps> = ({
  tour,
  onEditTour,
  onDeleteTour,
  disabled = false,
}) => {
  const { toggleTourFeatured, toggleTourActive } = useTours();

  const handleFeaturedToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    
    toggleTourFeatured({ 
      tourId: tour.id, 
      isFeatured: !(tour.is_featured ?? false) 
    });
  };
  
  const handleActiveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    
    toggleTourActive({ 
      tourId: tour.id, 
      isActive: !(tour.is_active ?? true)  // Default to true if undefined
    });
  };
  
  // We're keeping this card but adding a visual indicator for inactive tours
  return (
    <Card className={`overflow-hidden ${!(tour.is_active ?? true) ? 'opacity-70' : ''}`}>
      <div
        className="h-40 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${tour.image_url || "/placeholder.jpg"})`,
        }}
      >
        {(tour.is_featured ?? false) && (
          <Badge className="absolute top-2 right-2 bg-yellow-500">
            Destaque
          </Badge>
        )}
        {!(tour.is_active ?? true) && (
          <Badge className="absolute top-2 left-2 bg-red-500">
            Desativado
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="truncate">{tour.title}</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm">{tour.rating}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pb-2">
        <div className="text-sm text-muted-foreground line-clamp-2">
          {tour.short_description}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Duração:</span>
          <span className="font-medium">{tour.duration}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Capacidade:</span>
          <span className="font-medium">{tour.max_participants} pessoas</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Preço:</span>
          <span className="font-medium">{formatCurrency(tour.price)}</span>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Destaque:</span>
            <Switch 
              checked={tour.is_featured ?? false} 
              onCheckedChange={() => {}} 
              onClick={handleFeaturedToggle}
              disabled={disabled}
            />
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Ativo:</span>
            <Switch 
              checked={tour.is_active ?? true} 
              onCheckedChange={() => {}} 
              onClick={handleActiveToggle}
              disabled={disabled}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-2 pt-2 border-t">
        <Link to={`/admin/tours/${tour.id}/availability`}>
          <Button 
            variant="outline" 
            className="w-full" 
            size="sm"
            disabled={disabled}
          >
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span className="sr-only sm:not-sr-only sm:inline-block sm:text-xs">Datas</span>
          </Button>
        </Link>
        <Button
          variant="outline"
          className="w-full"
          size="sm"
          onClick={() => onEditTour(tour)}
          disabled={disabled}
        >
          <PencilIcon className="h-4 w-4 mr-1" />
          <span className="sr-only sm:not-sr-only sm:inline-block sm:text-xs">Editar</span>
        </Button>
        <Button
          variant="outline"
          className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
          size="sm"
          onClick={() => onDeleteTour(tour)}
          disabled={disabled}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          <span className="sr-only sm:not-sr-only sm:inline-block sm:text-xs">Excluir</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TourCard;
