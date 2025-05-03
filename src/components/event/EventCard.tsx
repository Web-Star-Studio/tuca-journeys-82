
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/utils/formatters';
import { formatDate } from '@/utils/date';

interface EventCardProps {
  id: number;
  name: string;
  image_url: string;
  date: string;
  location: string;
  price: number;
  short_description?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  name,
  image_url,
  date,
  location,
  price,
  short_description
}) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative">
        <img
          src={image_url}
          alt={name}
          className="w-full h-48 object-cover hover:scale-105 transition-transform"
        />
      </div>
      <CardContent className="flex-grow pt-4">
        <div className="mb-3">
          <h3 className="font-medium text-lg line-clamp-1">{name}</h3>
          {short_description && (
            <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
              {short_description}
            </p>
          )}
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-4 border-t flex items-center justify-between">
        <div>
          <p className="text-tuca-ocean-blue font-medium">
            {formatCurrency(price)}
          </p>
        </div>
        <Link to={`/eventos/${id}`}>
          <Button size="sm" variant="outline">Ver Detalhes</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
