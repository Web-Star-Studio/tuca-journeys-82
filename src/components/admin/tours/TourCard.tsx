
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tour } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

interface TourCardProps {
  tour: Tour;
  onEditTour: (tour: Tour) => void;
  onDeleteTour: (tour: Tour) => void;
  disabled?: boolean;
}

const TourCard = ({ 
  tour, 
  onEditTour, 
  onDeleteTour, 
  disabled = false 
}: TourCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img
          src={tour.image_url || "/placeholder.jpg"}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 right-2 flex space-x-1">
          <Button
            size="icon"
            variant="ghost"
            className="bg-white/90 hover:bg-white text-gray-800 h-8 w-8"
            onClick={() => !disabled && onEditTour(tour)}
            disabled={disabled}
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Editar</span>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="bg-white/90 hover:bg-white text-red-800 h-8 w-8"
            onClick={() => !disabled && onDeleteTour(tour)}
            disabled={disabled}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Excluir</span>
          </Button>
        </div>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1 text-lg">{tour.title}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {tour.short_description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-sm space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Categoria</span>
          <span className="font-medium">{tour.category}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Duração</span>
          <span className="font-medium">{tour.duration}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Participantes</span>
          <span className="font-medium">
            {tour.min_participants} - {tour.max_participants}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="w-full flex justify-between items-center">
          <div className="text-muted-foreground text-sm">Valor por pessoa</div>
          <div className="text-lg font-semibold">{formatCurrency(tour.price)}</div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TourCard;
