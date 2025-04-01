
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, MapPin } from "lucide-react";
import { Tour } from "@/data/tours";

interface TourCardProps {
  tour: Tour;
}

const TourCard = ({ tour }: TourCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-56 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-tuca-green text-white text-xs px-2 py-1 rounded">
          {tour.category}
        </div>
        <div className="absolute top-4 right-4 bg-tuca-coral text-white px-3 py-1 rounded-full text-sm font-medium">
          R$ {tour.price.toLocaleString('pt-BR')}
        </div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-serif font-bold">{tour.title}</CardTitle>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium ml-1">{tour.rating}</span>
          </div>
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{tour.location}</span>
        </div>
        <CardDescription className="line-clamp-2">
          {tour.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{tour.duration}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            Até {tour.maxParticipants} pessoas
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/passeios/${tour.id}`} className="w-full">
          <Button className="w-full bg-tuca-coral hover:bg-tuca-coral/90 text-white">
            Reservar
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TourCard;
