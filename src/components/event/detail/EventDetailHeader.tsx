
import React from "react";
import { Event } from "@/types/event";
import { CalendarDays, Clock, MapPin } from "lucide-react";

interface EventDetailHeaderProps {
  event: Event;
}

const EventDetailHeader = ({ event }: EventDetailHeaderProps) => {
  // Format date
  const eventDate = new Date(event.date).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="relative h-[40vh] md:h-[50vh] rounded-xl overflow-hidden mb-8">
      <img 
        src={event.image_url} 
        alt={event.name} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
        <div className="p-6 md:p-10 text-white">
          <div className="inline-block px-3 py-1 bg-tuca-green/80 rounded text-white text-sm mb-4">
            {event.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.name}</h1>
          <div className="flex flex-wrap gap-4 text-white/90">
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-2" />
              <span>{eventDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{event.start_time} - {event.end_time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailHeader;
