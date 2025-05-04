
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
    <Card className="overflow-hidden hover:shadow-sm transition-shadow">
      <CardContent className="p-0 flex">
        <div 
          className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${restaurant.image_url})` }}
        />
        
        <div className="p-4 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-1">
                <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                {restaurant.is_featured && (
                  <Badge variant="outline" className="ml-2 bg-yellow-100 text-yellow-800 border-yellow-300">
                    Destaque
                  </Badge>
                )}
                {!restaurant.is_active && (
                  <Badge variant="outline" className="ml-2 bg-red-100 text-red-800 border-red-300">
                    Inativo
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center text-muted-foreground text-xs mt-1 space-x-4">
                <div className="flex items-center">
                  <Utensils className="h-3 w-3 mr-1" />
                  <span>{restaurant.cuisine_type}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{restaurant.location}</span>
                </div>
                <div>
                  <span>{restaurant.price_range}</span>
                </div>
              </div>
            </div>
            
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onView(restaurant)}>
                    <Eye className="h-4 w-4 mr-2" /> Ver Detalhes
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(restaurant)}>
                    <Edit className="h-4 w-4 mr-2" /> Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-600" 
                    onClick={() => onDelete(restaurant)}
                  >
                    <Trash className="h-4 w-4 mr-2" /> Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <p className="text-sm mt-2 text-muted-foreground line-clamp-2">
            {restaurant.short_description}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted/20 px-4 py-2 flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onView(restaurant)}
        >
          <Eye className="h-4 w-4 mr-2" /> 
          Ver
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onEdit(restaurant)}
        >
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-red-600"
          onClick={() => onDelete(restaurant)}
        >
          <Trash className="h-4 w-4 mr-2" />
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RestaurantListItem;
