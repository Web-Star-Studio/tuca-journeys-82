
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { CalendarIcon, FilterIcon, Loader2 } from "lucide-react";
import EventsGrid from "@/components/event/EventsGrid";
import EventSearchFilter from "@/components/event/EventSearchFilter";
import { eventService } from "@/services/event-service";
import { EventFilters } from "@/types/event";

const EventsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<EventFilters>({
    searchQuery: searchParams.get("q") || "",
    category: searchParams.get("category") || "Todas",
    sortBy: "date_asc",
    limit: 20,
  });

  // Fetch event categories
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['eventCategories'],
    queryFn: () => eventService.getEventCategories()
  });

  // Fetch events
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['events', filters],
    queryFn: () => eventService.getEvents(filters)
  });

  // Update URL search params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.searchQuery) params.set("q", filters.searchQuery);
    if (filters.category && filters.category !== "Todas") params.set("category", filters.category);
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFilterChange = (newFilters: Partial<EventFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const isLoading = eventsLoading || categoriesLoading;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Eventos em Fernando de Noronha</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore eventos exclusivos na ilha e garanta sua participação em experiências inesquecíveis
        </p>
      </div>

      <EventSearchFilter
        categories={categories || []}
        filters={filters}
        onFilterChange={handleFilterChange}
        isLoading={categoriesLoading}
      />

      <div className="mt-10">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-tuca-ocean-blue" />
          </div>
        ) : !events || events.length === 0 ? (
          <div className="text-center py-16 bg-muted/30 rounded-lg">
            <CalendarIcon className="h-16 w-16 mx-auto text-muted-foreground" />
            <h3 className="text-xl font-medium mt-4 mb-2">Nenhum evento encontrado</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {filters.searchQuery || filters.category !== "Todas" 
                ? "Tente ajustar seus filtros ou buscar por termos diferentes" 
                : "No momento não há eventos disponíveis, volte mais tarde"}
            </p>
            {(filters.searchQuery || filters.category !== "Todas") && (
              <button
                className="mt-4 text-tuca-ocean-blue hover:underline flex items-center mx-auto"
                onClick={() => setFilters({
                  searchQuery: "",
                  category: "Todas",
                  sortBy: "date_asc",
                  limit: 12,
                })}
              >
                <FilterIcon className="h-4 w-4 mr-2" />
                Limpar filtros
              </button>
            )}
          </div>
        ) : (
          <EventsGrid events={events} />
        )}
      </div>
    </div>
  );
};

export default EventsList;
