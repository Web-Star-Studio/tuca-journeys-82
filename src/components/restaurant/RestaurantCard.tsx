
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import type { Restaurant } from '@/types/restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={restaurant.image_url} 
          alt={restaurant.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105" 
        />
        {restaurant.is_featured && (
          <Badge className="absolute top-2 right-2 bg-amber-500">
            Featured
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">{restaurant.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-sm font-medium">{restaurant.rating ? restaurant.rating.toFixed(1) : 'New'}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="bg-slate-100 text-slate-800">
            {restaurant.cuisine_type}
          </Badge>
          <Badge variant="outline" className="bg-slate-100 text-slate-800">
            {restaurant.price_range}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {restaurant.short_description}
        </p>
        
        <p className="text-xs text-muted-foreground">
          {restaurant.location}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild className="w-full">
          <Link to={`/restaurantes/${restaurant.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;
