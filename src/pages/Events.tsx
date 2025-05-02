
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventHero from "@/components/event/EventHero";
import EventsGrid from "@/components/event/EventsGrid";
import EventSearchFilter from "@/components/event/EventSearchFilter";
import { useFeaturedEvents } from "@/hooks/events/use-event-search";

const Events = () => {
  const { events = [], isLoading, filters, setFilters } = useFeaturedEvents();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <EventHero />
        <div className="container mx-auto py-12 px-4 md:px-6">
          <EventSearchFilter 
            filters={filters}
            onFilterChange={setFilters}
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
