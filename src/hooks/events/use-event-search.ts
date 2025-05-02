
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { eventService } from '@/services/event-service';
import { Event } from '@/types/event';

export function useFeaturedEvents() {
  const [filters, setFilters] = useState({
    category: '',
    date: null,
    searchQuery: ''
  });

  const { data: events, isLoading } = useQuery({
    queryKey: ['events', 'featured', filters],
    queryFn: () => eventService.getFeaturedEvents(filters)
  });

  return {
    events,
    isLoading,
    filters,
    setFilters
  };
}
