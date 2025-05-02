
import React from 'react';
import RestaurantListItem from './RestaurantListItem';
import type { Restaurant } from '@/types/restaurant';
import { TableSkeleton } from '@/components/ui/skeleton';

interface RestaurantsListProps {
  restaurants: Restaurant[];
  isLoading: boolean;
  onView: (restaurant: Restaurant) => void;
  onEdit: (restaurant: Restaurant) => void;
  onDelete: (restaurant: Restaurant) => void;
}

const RestaurantsList: React.FC<RestaurantsListProps> = ({
  restaurants,
  isLoading,
  onView,
  onEdit,
  onDelete
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <TableSkeleton rows={3} columns={4} />
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="text-center py-8 bg-muted/20 rounded-lg">
        <p className="text-muted-foreground">Nenhum restaurante encontrado</p>
        <p className="text-sm text-muted-foreground mt-2">
          Tente ajustar seus filtros ou criar um novo restaurante
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {restaurants.map(restaurant => (
        <RestaurantListItem 
          key={restaurant.id}
          restaurant={restaurant}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default RestaurantsList;
