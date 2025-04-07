
import React from "react";
import EventCard from "./EventCard";
import { Event } from "@/types/event";

interface EventsGridProps {
  events: Event[];
}

const EventsGrid = ({ events }: EventsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
      
      {events.length === 0 && (
        <div className="col-span-full text-center py-12">
          <h3 className="text-lg font-medium text-gray-700">Nenhum evento encontrado</h3>
          <p className="text-gray-500">
            Tente ajustar seus filtros ou buscar por termos diferentes.
          </p>
        </div>
      )}
    </div>
  );
};

export default EventsGrid;
