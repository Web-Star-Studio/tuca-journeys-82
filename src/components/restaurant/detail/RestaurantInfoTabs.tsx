
import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Clock, MapPin, Info } from 'lucide-react';
import type { Restaurant } from '@/types/restaurant';

interface RestaurantInfoTabsProps {
  restaurant: Restaurant;
}

const RestaurantInfoTabs: React.FC<RestaurantInfoTabsProps> = ({ restaurant }) => {
  // Format opening hours for display
  const formatHours = (hours: Restaurant['opening_hours']) => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    return (
      <div className="space-y-2">
        {days.map(day => {
          const dayHours = hours[day as keyof typeof hours];
          const capitalized = day.charAt(0).toUpperCase() + day.slice(1);
          
          if (!dayHours) {
            return (
              <div key={day} className="grid grid-cols-3">
                <span className="font-medium">{capitalized}</span>
                <span className="col-span-2">Closed</span>
              </div>
            );
          }
          
          return (
            <div key={day} className="grid grid-cols-3">
              <span className="font-medium">{capitalized}</span>
              <span className="col-span-2">{dayHours.open} - {dayHours.close}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Tabs defaultValue="info" className="w-full">
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="info" className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          <span>Details</span>
        </TabsTrigger>
        <TabsTrigger value="hours" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Hours</span>
        </TabsTrigger>
        <TabsTrigger value="location" className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>Location</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="info" className="p-4">
        <h3 className="font-semibold mb-3">About {restaurant.name}</h3>
        <p className="mb-4">
          {restaurant.description}
        </p>
        
        {restaurant.reservation_policy && (
          <>
            <Separator className="my-4" />
            <h3 className="font-semibold mb-2">Reservation Policy</h3>
            <p className="text-sm">{restaurant.reservation_policy}</p>
          </>
        )}
      </TabsContent>
      
      <TabsContent value="hours" className="p-4">
        <h3 className="font-semibold mb-3">Opening Hours</h3>
        {formatHours(restaurant.opening_hours)}
      </TabsContent>
      
      <TabsContent value="location" className="p-4">
        <h3 className="font-semibold mb-3">Address</h3>
        <p className="mb-4">{restaurant.address}</p>
        <div className="aspect-video w-full bg-gray-200 rounded-lg">
          {/* Placeholder for map - in a real app, integrate with Google Maps or Mapbox */}
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500">Map view coming soon</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default RestaurantInfoTabs;
