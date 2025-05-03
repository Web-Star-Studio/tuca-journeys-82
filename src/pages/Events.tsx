
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventHero from "@/components/event/EventHero";
import EventsGrid from "@/components/event/EventsGrid";
import EventSearchFilter from "@/components/event/EventSearchFilter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { eventService } from "@/services/event-service";
import { EventFilters } from "@/types/event";

const Events = () => {
  const [filters, setFilters] = useState<EventFilters>({
    category: "",
    date: null,
    searchQuery: ""
  });
  
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events', filters],
    queryFn: () => eventService.getEvents(filters)
  });
  
  const { data: categories = ["Todos", "Festas", "Música", "Cultura", "Gastronomia", "Esporte"] } = useQuery({
    queryKey: ['eventCategories'],
    queryFn: () => eventService.getEventCategories()
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <EventHero 
          title="Eventos em Fernando de Noronha" 
          subtitle="Descubra os melhores eventos e festas na ilha" 
        />
        <div className="container mx-auto py-12 px-4 md:px-6">
          <EventSearchFilter 
            filters={filters}
            onFilterChange={setFilters}
            categories={categories}
          />
          <EventsGrid 
            events={events}
            isLoading={isLoading}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
