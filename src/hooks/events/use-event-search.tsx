
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { eventService } from "@/services/event-service";
import { EventFilters, Event } from "@/types/event";
import { adaptDBEventToComponentEvent } from "@/utils/eventAdapter";

export const useEvents = (initialFilters: EventFilters = {}) => {
  const [filters, setFilters] = useState<EventFilters>(initialFilters);
  
  // Query event data
  const { data, isLoading, error } = useQuery({
    queryKey: ['events', filters],
    queryFn: () => eventService.getEvents(filters),
  });
  
  // Process events
  const events = data?.map(event => adaptDBEventToComponentEvent(event)) || [];
  
  return {
    events,
    isLoading,
    error,
    filters,
    setFilters
  };
};

export const useFeaturedEvents = (limit: number = 3) => {
  // Query featured events with the specified limit
  const { data, isLoading, error } = useQuery({
    queryKey: ['featuredEvents', limit],
    queryFn: () => eventService.getFeaturedEvents(limit),
  });
  
  // Process events
  const events = data?.map(event => adaptDBEventToComponentEvent(event)) || [];
  
  return {
    events,
    isLoading,
    error
  };
};

export const useEventCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['eventCategories'],
    queryFn: () => eventService.getEventCategories(),
  });
  
  return {
    categories: data || [],
    isLoading,
    error
  };
};
