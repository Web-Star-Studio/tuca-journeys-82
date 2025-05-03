
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Heart } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Event } from "@/types/event";
import { useWishlist } from "@/contexts/WishlistContext";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const isEventInWishlist = isInWishlist(event.id, "event");
  
  const toggleWishlist = () => {
    if (isEventInWishlist) {
      removeFromWishlist(event.id, "event");
    } else {
      addToWishlist(event.id, "event", {
        title: event.name,
        image: event.image_url
      });
    }
  };
  
  const formattedDate = format(new Date(event.date), "dd 'de' MMMM', 'yyyy", {
    locale: ptBR,
  });
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <Link to={`/eventos/${event.id}`}>
          <img 
            src={event.image_url || "/placeholder-event.jpg"}
            alt={event.name}
            className="w-full h-48 object-cover"
          />
        </Link>
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 rounded-full bg-white bg-opacity-70"
          onClick={toggleWishlist}
        >
          <Heart 
            className={`h-5 w-5 ${isEventInWishlist ? 'fill-tuca-coral text-tuca-coral' : 'text-gray-600'}`}
          />
        </Button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-sm text-tuca-ocean-blue mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          {formattedDate}
        </div>
        
        <Link to={`/eventos/${event.id}`}>
          <h3 className="text-lg font-medium mb-2 hover:text-tuca-ocean-blue">
            {event.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {event.short_description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="text-tuca-coral font-medium">
            {event.price === 0 ? "Grátis" : `R$ ${event.price.toLocaleString('pt-BR')}`}
          </div>
          
          <Link to={`/eventos/${event.id}`}>
            <Button variant="outline" size="sm">Ver Detalhes</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
