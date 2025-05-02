
import React, { useState } from 'react';
import RestaurantsGrid from '@/components/restaurant/RestaurantsGrid';
import RestaurantFilters from '@/components/restaurant/RestaurantFilters';
import { useRestaurants } from '@/hooks/use-restaurants';
import type { RestaurantFilters as FilterType } from '@/types/restaurant';

const Restaurants: React.FC = () => {
  const [filters, setFilters] = useState<FilterType>({});
  const { restaurants, isLoading } = useRestaurants(filters);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Restaurants</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <RestaurantFilters 
            filters={filters} 
            onFilterChange={setFilters} 
          />
        </aside>
        
        {/* Main content */}
        <main className="flex-1">
          <RestaurantsGrid 
            restaurants={restaurants || []}
            isLoading={isLoading}
          />
        </main>
      </div>
    </div>
  );
};

export default Restaurants;
