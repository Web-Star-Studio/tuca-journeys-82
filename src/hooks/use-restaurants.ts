
import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantService } from '@/services/restaurant-service';
import type { Restaurant, RestaurantFilters, RestaurantTable } from '@/types/restaurant';
import { toast } from 'sonner';

export const useRestaurants = (initialFilters?: RestaurantFilters) => {
  const [filters, setFilters] = useState<RestaurantFilters>(initialFilters || {});
  const queryClient = useQueryClient();

  // Transform the filters to match the service parameters
  const serviceFilters = {
    cuisine_type: filters.cuisine_type?.length === 1 ? filters.cuisine_type[0] : undefined,
    price_range: filters.price_range?.length === 1 ? filters.price_range[0] : undefined,
    name: filters.searchQuery
  };

  const { data: restaurants, isLoading, error } = useQuery({
    queryKey: ['restaurants', serviceFilters],
    queryFn: () => restaurantService.getRestaurants(serviceFilters)
  });

  return {
    restaurants,
    isLoading,
    error,
    filters,
    setFilters,
  };
};

export const useRestaurantDetails = (id: number) => {
  const queryClient = useQueryClient();

  const { data: restaurant, isLoading, error } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => restaurantService.getRestaurantById(id),
    enabled: !!id
  });

  // Get restaurant tables
  const { data: tables, isLoading: tablesLoading } = useQuery({
    queryKey: ['restaurantTables', id],
    queryFn: () => restaurantService.getRestaurantTables(id),
    enabled: !!id
  });

  return {
    restaurant,
    tables,
    isLoading: isLoading || tablesLoading,
    error
  };
};

export const useRestaurantAdmin = () => {
  const queryClient = useQueryClient();

  const createRestaurantMutation = useMutation({
    mutationFn: (restaurantData: Omit<Restaurant, 'id' | 'created_at' | 'updated_at' | 'rating'>) => 
      restaurantService.createRestaurant(restaurantData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      toast.success('Restaurant created successfully!');
    },
    onError: (error) => {
      console.error('Error creating restaurant:', error);
      toast.error('Failed to create restaurant');
    }
  });

  const updateRestaurantMutation = useMutation({
    mutationFn: ({ id, restaurant }: { id: number; restaurant: Partial<Restaurant> }) => 
      restaurantService.updateRestaurant(id, restaurant),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      queryClient.invalidateQueries({ queryKey: ['restaurant', data.id] });
      toast.success('Restaurant updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating restaurant:', error);
      toast.error('Failed to update restaurant');
    }
  });

  // Explicitly type the mutation function to accept a number parameter
  const deleteRestaurantMutation = useMutation<void, Error, number>({
    mutationFn: (id: number) => restaurantService.deleteRestaurant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      toast.success('Restaurant deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting restaurant:', error);
      toast.error('Failed to delete restaurant');
    }
  });

  const addTableMutation = useMutation({
    mutationFn: restaurantService.addTable.bind(restaurantService),
    onSuccess: (data: { restaurant_id: number }) => {
      queryClient.invalidateQueries({ queryKey: ['restaurantTables', data.restaurant_id] });
      toast.success('Table added successfully!');
    },
    onError: (error) => {
      console.error('Error adding table:', error);
      toast.error('Failed to add table');
    }
  });

  const updateTableMutation = useMutation({
    mutationFn: ({ id, table }: { id: number; table: Partial<RestaurantTable> }) => 
      restaurantService.updateTable(id, table),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['restaurantTables', data.restaurant_id] });
      toast.success('Table updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating table:', error);
      toast.error('Failed to update table');
    }
  });

  const deleteTableMutation = useMutation<any, Error, number>({
    mutationFn: (id: number) => restaurantService.deleteTable(id),
    onSuccess: () => {
      // Need to invalidate all restaurant tables since we don't know the restaurant_id here
      queryClient.invalidateQueries({ queryKey: ['restaurantTables'] });
      toast.success('Table deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting table:', error);
      toast.error('Failed to delete table');
    }
  });

  return {
    createRestaurant: createRestaurantMutation.mutate,
    updateRestaurant: updateRestaurantMutation.mutate,
    deleteRestaurant: deleteRestaurantMutation.mutate,
    addTable: addTableMutation.mutate,
    updateTable: updateTableMutation.mutate,
    deleteTable: deleteTableMutation.mutate,
    isLoading: 
      createRestaurantMutation.isPending || 
      updateRestaurantMutation.isPending || 
      deleteRestaurantMutation.isPending ||
      addTableMutation.isPending ||
      updateTableMutation.isPending ||
      deleteTableMutation.isPending
  };
};

export const useRestaurantReservations = (restaurantId: number) => {
  const queryClient = useQueryClient();

  const { data: reservations, isLoading, error } = useQuery({
    queryKey: ['restaurantReservations', restaurantId],
    queryFn: () => restaurantService.getRestaurantReservations(restaurantId),
    enabled: !!restaurantId
  });

  const updateReservationStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => 
      restaurantService.updateReservationStatus(id, status as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurantReservations', restaurantId] });
      toast.success('Reservation status updated!');
    },
    onError: (error) => {
      console.error('Error updating reservation status:', error);
      toast.error('Failed to update reservation status');
    }
  });

  return {
    reservations,
    isLoading,
    error,
    updateReservationStatus: updateReservationStatusMutation.mutate
  };
};
