
import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Edit, Trash2 } from "lucide-react";
import { Tour } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface TourCardProps {
  tour: Tour;
  onEditTour: (tour: Tour) => void;
  onDeleteTour: (tour: Tour) => void;
}

const TourCard: React.FC<TourCardProps> = ({
  tour,
  onEditTour,
  onDeleteTour,
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <div className="relative h-48">
        <img
          src={tour.image_url}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm"
        >
          {tour.category}
        </Badge>
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-tuca-deep-blue">{tour.title}</h3>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <span className="mr-3">R$ {tour.price.toFixed(2)}</span>
              <span className="mr-3">{tour.duration}</span>
              <div className="flex items-center">
                <span className="mr-1 text-yellow-500">★</span>
                {tour.rating}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-tuca-medium-blue hover:text-tuca-ocean-blue hover:bg-tuca-light-blue/40"
            >
              <Link to={`/passeios/${tour.id}`} target="_blank">
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-tuca-ocean-blue hover:bg-tuca-light-blue/40"
              onClick={() => onEditTour(tour)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => onDeleteTour(tour)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TourCard;
