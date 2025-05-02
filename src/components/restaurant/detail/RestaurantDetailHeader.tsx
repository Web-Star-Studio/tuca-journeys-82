
import React from 'react';
import { Star, MapPin, Clock, Utensils, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Restaurant } from '@/types/restaurant';

interface RestaurantDetailHeaderProps {
  restaurant: Restaurant;
}

const RestaurantDetailHeader: React.FC<RestaurantDetailHeaderProps> = ({ restaurant }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-3xl font-bold">{restaurant.name}</h1>
        <div className="flex items-center bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
          <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
          <span className="font-medium">{restaurant.rating ? restaurant.rating.toFixed(1) : 'New'}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm mb-4">
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1 text-gray-500" />
          <span>{restaurant.location}</span>
        </div>
        <div className="flex items-center">
          <Utensils className="h-4 w-4 mr-1 text-gray-500" />
          <span>{restaurant.cuisine_type}</span>
        </div>
        <div className="flex items-center">
          <CreditCard className="h-4 w-4 mr-1 text-gray-500" />
          <span>{restaurant.price_range}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {restaurant.payment_methods?.map(method => (
          <Badge key={method} variant="outline" className="bg-slate-100">
            {method}
          </Badge>
        ))}
      </div>

      <p className="text-gray-700 mb-8">
        {restaurant.short_description}
      </p>
    </div>
  );
};

export default RestaurantDetailHeader;
