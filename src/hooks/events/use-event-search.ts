
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Event, EventFilters } from '@/types/event';
import { eventService } from '@/services/event-service';

/**
 * Hook for searching events with pagination support
 */
export const useEventSearch = (initialFilters: EventFilters = {}) => {
  const [filters, setFilters] = useState<EventFilters>(initialFilters);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const { 
    data, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['events', 'search', filters, page],
    queryFn: async () => {
      const result = await eventService.getEvents({
        ...filters,
        limit: itemsPerPage,
        offset: (page - 1) * itemsPerPage
      });
      
      // Calculate total count or use the length as an estimate
      const totalCount = result.length;
      
      return {
        events: result,
        total: totalCount
      };
    },
    staleTime: 1000 * 60, // Cache for 1 minute
  });

  const totalPages = data?.total ? Math.ceil(data.total / itemsPerPage) : 0;

  const updateFilters = (newFilters: Partial<EventFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
    setPage(1); // Reset to first page when filters change
  };

  return {
    events: data?.events || [],
    isLoading,
    error,
    refetch,
    filters,
    updateFilters,
    pagination: {
      page,
      setPage,
      totalPages,
      itemsPerPage,
      total: data?.total || 0
    }
  };
};

/**
 * Hook for fetching a single event by ID
 */
export const useEventDetail = (eventId: number) => {
  return useQuery({
    queryKey: ['events', eventId],
    queryFn: () => eventService.getEventById(eventId),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

/**
 * Hook for fetching featured events
 */
export const useFeaturedEvents = (limit: number = 4) => {
  return useQuery({
    queryKey: ['events', 'featured', limit],
    queryFn: () => eventService.getFeaturedEvents(limit),
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });
};
