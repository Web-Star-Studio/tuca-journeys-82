
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { activityService } from '@/services/activity-service';
import type { Activity } from '@/types/activity';

/**
 * Hook to fetch and manage activities
 */
export const useActivitiesBase = () => {
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    minPrice: null as number | null,
    maxPrice: null as number | null,
    searchQuery: '',
  });

  // Fetch all activities with optional filters
  const {
    data: activities,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['activities', filters],
    queryFn: () => activityService.getActivities(filters),
  });

  return {
    activities,
    isLoading,
    error,
    refetch,
    filters,
    setFilters,
  };
};

/**
 * Hook to fetch a single activity by ID
 */
export const useActivity = (id?: number) => {
  const {
    data: activity,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['activity', id],
    queryFn: () => activityService.getActivityById(id as number),
    enabled: !!id,
  });

  return {
    activity,
    isLoading,
    error,
  };
};
