
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, MapPin } from "lucide-react";
import { Tour } from "@/data/tours";

interface TourCardProps {
  tour: Tour;
}

const TourCard = ({ tour }: TourCardProps) => {
  return (
    <Card className="overflow-hidden border-0 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 hover-scale bg-white">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-foreground text-xs px-3 py-1.5 rounded-full font-medium">
          {tour.category}
        </div>
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
