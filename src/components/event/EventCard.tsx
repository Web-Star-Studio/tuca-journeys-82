
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { Event } from "@/types/event";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const navigate = useNavigate();
  
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all hover-scale"
      onClick={() => navigate(`/eventos/${event.id}`)}
    >
      <div className="relative h-56">
        <img
          src={event.image_url}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        {event.featured && (
          <div className="absolute top-3 right-3 bg-tuca-coral/90 text-white text-xs px-2 py-1 rounded">
            Destaque
          </div>
        )}
        <div className="absolute top-3 left-3 bg-tuca-green/80 text-white text-xs px-2 py-1 rounded">
          {event.category}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-serif font-bold text-lg mb-2">{event.name}</h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <CalendarDays className="h-4 w-4 mr-1" />
          <span>
            {new Date(event.date).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Clock className="h-4 w-4 mr-1" />
          <span>{event.start_time} - {event.end_time}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{event.location}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Users className="h-4 w-4 mr-1" />
          <span>
            {event.available_spots} vagas disponíveis de {event.capacity}
          </span>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-tuca-deep-blue font-bold">
            {event.price > 0 ? `R$ ${event.price.toFixed(2).replace('.', ',')}` : 'Gratuito'}
          </span>
        </div>
        
        <Button 
          className="w-full bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90 text-white"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/eventos/${event.id}`);
          }}
        >
          Ver Detalhes
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
