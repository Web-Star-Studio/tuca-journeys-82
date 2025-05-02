
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { eventService } from '@/services/event-service';
import { Event, EventFilters } from '@/types/event';

export function useFeaturedEvents(limit?: number) {
  const [filters, setFilters] = useState({
    category: '',
    date: null,
    searchQuery: ''
  });

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events', 'featured', filters],
    queryFn: async () => {
      const featuredEvents = await eventService.getFeaturedEvents(filters);
      return limit ? featuredEvents.slice(0, limit) : featuredEvents;
    }
  });

  return {
    events,
    isLoading,
    filters,
    setFilters
  };
}

export function useEventDetail(eventId: number) {
  return useQuery({
    queryKey: ['event', eventId],
    queryFn: () => eventService.getEventById(eventId),
    enabled: !!eventId && eventId > 0
  });
}

export function useEventSearch() {
  const [filters, setFilters] = useState<EventFilters>({
    category: '',
    date: null,
    searchQuery: '',
    sortBy: 'date_asc',
    minPrice: undefined,
    maxPrice: undefined,
    difficulty: ''
  });

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events', filters],
    queryFn: () => eventService.getEvents(filters)
  });

  return {
    events,
    isLoading,
    filters,
    setFilters
  };
}
