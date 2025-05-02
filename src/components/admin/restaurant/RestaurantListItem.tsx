
import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
  Utensils,
  Calendar,
  MapPin,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Restaurant } from '@/types/restaurant';

interface RestaurantListItemProps {
  restaurant: Restaurant;
  onView: (restaurant: Restaurant) => void;
  onEdit: (restaurant: Restaurant) => void;
  onDelete: (restaurant: Restaurant) => void;
}

const RestaurantListItem: React.FC<RestaurantListItemProps> = ({
  restaurant,
  onView,
  onEdit,
  onDelete
}) => {
  return (
    <Card className="overflow-hidden hover:border-muted-foreground/20 transition-colors">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-40 h-32 md:h-full">
          {restaurant.image_url ? (
            <img
              src={restaurant.image_url}
              alt={restaurant.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-muted flex items-center justify-center">
              <Utensils className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>
        
        <CardContent className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg line-clamp-1">{restaurant.name}</h3>
              <div className="flex items-center space-x-2 text-muted-foreground text-sm mb-2">
                <span className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {restaurant.location}
                </span>
                <span className="flex items-center">
                  <Utensils className="h-3 w-3 mr-1" />
                  {restaurant.cuisine_type}
                </span>
              </div>
              <p className="text-sm line-clamp-2 text-muted-foreground">
                {restaurant.short_description}
              </p>
            </div>
            
            <div className="flex space-x-2">
              {restaurant.is_featured && (
                <Badge variant="secondary" className="border-amber-500 text-amber-700">
                  Destaque
                </Badge>
              )}
              {!restaurant.is_active && (
                <Badge variant="secondary" className="border-red-500 text-red-700">
                  Inativo
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </div>
      
      <CardFooter className="flex justify-between items-center p-4 pt-0 border-t mt-2">
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm" onClick={() => onView(restaurant)}>
            <Eye className="h-4 w-4 mr-1" />
            Detalhes
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onEdit(restaurant)}>
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onView(restaurant)}>
              <Eye className="h-4 w-4 mr-2" />
              Ver Detalhes
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(restaurant)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(restaurant)} className="text-red-600 focus:text-red-600">
              <Trash className="h-4 w-4 mr-2" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default RestaurantListItem;
