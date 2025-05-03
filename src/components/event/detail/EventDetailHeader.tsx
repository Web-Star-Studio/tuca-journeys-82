
import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/event";

interface EventDetailHeaderProps {
  event: Event;
}

const EventDetailHeader = ({ event }: EventDetailHeaderProps) => {
  return (
    <div className="relative">
      {/* Event Image */}
      <div className="w-full h-72 sm:h-96 relative rounded-lg overflow-hidden">
        <img
          src={event.image_url}
          alt={event.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {event.featured && (
          <Badge className="absolute top-4 right-4 bg-tuca-ocean-blue">
            Evento em Destaque
          </Badge>
        )}
      </div>

      {/* Event Information */}
      <div className="mt-6">
        <h1 className="text-3xl sm:text-4xl font-bold">{event.name}</h1>
        
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1.5 text-tuca-ocean-blue" />
            <span>
              {format(new Date(event.date), "EEEE, d 'de' MMMM", { locale: ptBR })}
            </span>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1.5 text-tuca-ocean-blue" />
            <span>{event.start_time} - {event.end_time}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1.5 text-tuca-ocean-blue" />
            <span>{event.location}</span>
          </div>
          
          <Badge variant="outline" className="ml-auto">
            {event.category}
          </Badge>
        </div>
        
        <p className="mt-4 text-muted-foreground">
          {event.short_description}
        </p>
      </div>
    </div>
  );
};

export default EventDetailHeader;
