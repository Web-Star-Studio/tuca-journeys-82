
import React from 'react';
import RestaurantListItem from './RestaurantListItem';
import type { Restaurant } from '@/types/restaurant';

interface RestaurantsListProps {
  restaurants: Restaurant[];
  isLoading: boolean;
  onEdit: (restaurant: Restaurant) => void;
  onDelete: (restaurant: Restaurant) => void;
}

const RestaurantsList: React.FC<RestaurantsListProps> = ({
  restaurants,
  isLoading,
  onEdit,
  onDelete
}) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading restaurants...</div>;
  }

  if (restaurants.length === 0) {
    return (
      <div className="text-center py-8 bg-muted/20 rounded-lg">
        <p className="text-muted-foreground">No restaurants found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {restaurants.map(restaurant => (
        <RestaurantListItem 
          key={restaurant.id}
          restaurant={restaurant}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default RestaurantsList;
