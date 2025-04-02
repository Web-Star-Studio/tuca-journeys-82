
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, MapPin, Heart } from "lucide-react";
import { Tour } from "@/data/tours";
import { useWishlist } from "@/contexts/WishlistContext";
import SafeImage from "@/components/ui/safe-image";

interface TourCardProps {
  tour: Tour;
}

const TourCard = ({ tour }: TourCardProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(tour.id, 'tour')) {
      removeFromWishlist(tour.id, 'tour');
    } else {
      addToWishlist({
        id: tour.id,
        type: 'tour',
        name: tour.title,
        image: tour.image
      });
    }
  };

  const isWishlisted = isInWishlist(tour.id, 'tour');

  return (
    <Card className="overflow-hidden border-0 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 hover-scale bg-white">
      <div className="relative aspect-[4/3] overflow-hidden">
        <SafeImage
          src={tour.image}
          alt={tour.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${imageLoaded ? 'hover:scale-110' : ''}`}
          onLoadSuccess={() => setImageLoaded(true)}
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-foreground text-xs px-3 py-1.5 rounded-full font-medium">
          {tour.category}
        </div>
        <button 
          onClick={handleWishlistToggle}
          className="absolute top-4 left-4 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
          aria-label={isWishlisted ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart 
            className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} 
          />
        </button>
      </div>
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-medium">{tour.title}</h3>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{tour.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{tour.location}</span>
        </div>
        
        <p className="text-muted-foreground mb-6 line-clamp-2">
          {tour.description}
        </p>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center text-muted-foreground text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>{tour.duration}</span>
          </div>
          <Badge variant="outline" className="text-xs bg-transparent">
            Até {tour.maxParticipants} pessoas
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-tuca-ocean-blue">
            <p className="text-xl font-medium">R$ {tour.price.toLocaleString('pt-BR')}</p>
          </div>
          <Link to={`/passeios/${tour.id}`}>
            <Button className="rounded-full bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90">
              Reservar
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default TourCard;
