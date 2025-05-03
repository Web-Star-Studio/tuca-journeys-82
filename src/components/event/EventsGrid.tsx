
import React from "react";
import EventCard from "./EventCard";
import { Event } from "@/types/event";
import { Loader2 } from "lucide-react";

interface EventsGridProps {
  events: Event[];
  isLoading?: boolean;
}

const EventsGrid = ({ events, isLoading = false }: EventsGridProps) => {
  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-tuca-ocean-blue" />
      </div>
    );
  }
  
  if (events.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-100">
        <h3 className="text-xl font-medium text-gray-800 mb-2">Nenhum evento encontrado</h3>
        <p className="text-gray-500">
          Tente ajustar seus filtros ou buscar por termos diferentes.
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {events.map((event) => (
        <EventCard 
          key={event.id}
          id={event.id}
          name={event.name}
          image_url={event.image_url}
          date={event.date}
          location={event.location}
          price={event.price}
          short_description={event.short_description}
        />
      ))}
    </div>
  );
};

export default EventsGrid;
