
import React from 'react';
import { useParams } from 'react-router-dom';
import { useRestaurantDetails } from '@/hooks/use-restaurants';
import RestaurantDetailHeader from '@/components/restaurant/detail/RestaurantDetailHeader';
import RestaurantGallery from '@/components/restaurant/detail/RestaurantGallery';
import RestaurantInfoTabs from '@/components/restaurant/detail/RestaurantInfoTabs';
import RestaurantBookingForm from '@/components/restaurant/booking/RestaurantBookingForm';
import RestaurantReviews from '@/components/restaurant/reviews/RestaurantReviews';
import { Skeleton } from '@/components/ui/skeleton';

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { restaurant, isLoading, error } = useRestaurantDetails(parseInt(id || '0'));

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col gap-6">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-96" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-72" />
              <Skeleton className="h-60" />
            </div>
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Restaurant Not Found</h2>
          <p className="text-muted-foreground">
            The restaurant you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <RestaurantDetailHeader restaurant={restaurant} />
      
      <RestaurantGallery restaurant={restaurant} className="mb-8" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <RestaurantInfoTabs restaurant={restaurant} />
          <RestaurantReviews restaurantId={restaurant.id} />
        </div>
        
        <div className="lg:sticky top-6 self-start">
          <RestaurantBookingForm restaurant={restaurant} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
