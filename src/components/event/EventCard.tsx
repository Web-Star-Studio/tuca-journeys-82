
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin, Users, Heart } from "lucide-react";
import { Event } from "@/types/event";
import { useWishlist } from "@/contexts/WishlistContext";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(event.id);
  
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(event.id);
    } else {
      addToWishlist({
        id: event.id,
        name: event.name,
        image: event.image_url,
        type: 'event',
        price: event.price,
        description: event.description.substring(0, 100) + '...'
      });
    }
  };
  
  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer group"
      onClick={() => navigate(`/eventos/${event.id}`)}
    >
      <div className="relative h-56">
        <img
          src={event.image_url}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {event.featured && (
          <div className="absolute top-3 right-3 bg-tuca-ocean-blue/90 text-white text-xs font-medium px-2 py-1 rounded">
            Destaque
          </div>
        )}
        <div className="absolute top-3 left-3 bg-tuca-green/90 text-white text-xs font-medium px-2 py-1 rounded">
          {event.category}
        </div>
        
        <button 
          onClick={handleWishlistClick}
          className="absolute top-3 right-16 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full transition-all hover:bg-white"
        >
          <Heart 
            className={`h-4 w-4 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
      </div>

      <div className="p-5">
        <h3 className="font-medium text-lg mb-2">{event.name}</h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <CalendarDays className="h-4 w-4 mr-1.5 text-tuca-ocean-blue" />
          <span>
            {new Date(event.date).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Clock className="h-4 w-4 mr-1.5 text-tuca-ocean-blue" />
          <span>{event.start_time} - {event.end_time}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1.5 text-tuca-ocean-blue" />
          <span>{event.location}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Users className="h-4 w-4 mr-1.5 text-tuca-ocean-blue" />
          <span>
            {event.available_spots} vagas disponíveis
          </span>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="text-tuca-deep-blue font-bold text-lg">
            {event.price > 0 ? `R$ ${event.price.toFixed(2).replace('.', ',')}` : 'Gratuito'}
          </span>
          
          <Button 
            variant="ghost"
            className="text-tuca-ocean-blue hover:text-tuca-deep-blue hover:bg-tuca-light-blue"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/eventos/${event.id}`);
            }}
          >
            Ver Detalhes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
