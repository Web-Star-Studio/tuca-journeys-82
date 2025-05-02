
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Restaurant } from '@/types/restaurant';

interface RestaurantListItemProps {
  restaurant: Restaurant;
  onEdit: (restaurant: Restaurant) => void;
  onDelete: (restaurant: Restaurant) => void;
}

const RestaurantListItem: React.FC<RestaurantListItemProps> = ({
  restaurant,
  onEdit,
  onDelete
}) => {
  return (
    <Card key={restaurant.id}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
            <img
              src={restaurant.image_url}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{restaurant.name}</h3>
                <p className="text-sm text-muted-foreground">{restaurant.cuisine_type}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => onEdit(restaurant)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-red-500 hover:text-red-700" 
                  onClick={() => onDelete(restaurant)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-sm mt-2">{restaurant.location}</div>
            <div className="flex gap-2 mt-2">
              {restaurant.is_featured && (
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded">
                  Featured
                </span>
              )}
              {!restaurant.is_active && (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded">
                  Inactive
                </span>
              )}
              <span className="bg-slate-100 text-slate-800 text-xs px-2 py-0.5 rounded">
                {restaurant.price_range}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantListItem;
