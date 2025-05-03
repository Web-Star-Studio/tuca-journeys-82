
import React from "react";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/event";
import { useWishlist } from "@/contexts/WishlistContext";
import { formatCurrency } from "@/utils/formatters";
import { formatDate } from "@/utils/date";
import SafeImage from "@/components/ui/safe-image";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isInWishlist(event.id, "event")) {
      removeFromWishlist(event.id, "event");
    } else {
      addToWishlist({
        id: event.id,
        type: "event",
        title: event.name,
        image: event.image_url
      });
    }
  };
  
  const isWishlisted = isInWishlist(event.id, "event");

  return (
    <Link to={`/eventos/${event.id}`}>
      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
        <div className="relative h-48">
          <SafeImage
            src={event.image_url}
            alt={event.name}
            className="h-full w-full object-cover"
          />
          <button
            onClick={handleWishlistClick}
            className="absolute top-2 right-2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </button>
          {event.is_featured && (
            <Badge className="absolute top-2 left-2 bg-yellow-500">Destaque</Badge>
          )}
        </div>
        <CardContent className="pt-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{event.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-2">
            {event.short_description}
          </p>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <CalendarDays className="h-4 w-4 mr-1" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{event.location}</span>
          </div>
          <div className="flex justify-between items-center">
            <Badge variant="outline">
              {event.category}
            </Badge>
            <p className="font-semibold text-tuca-ocean-blue">
              {formatCurrency(event.price)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
