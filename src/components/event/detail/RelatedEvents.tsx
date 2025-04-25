
import React from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "@/types/event";
import { CalendarDays } from "lucide-react";
import SafeImage from "@/components/ui/safe-image";

interface RelatedEventsProps {
  events: Event[];
}

const RelatedEvents = ({ events }: RelatedEventsProps) => {
  const navigate = useNavigate();

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-8">Eventos Relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div
            key={event.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
            onClick={() => navigate(`/eventos/${event.id}`)}
          >
            <div className="relative h-48">
              <SafeImage
                src={event.image_url}
                alt={event.name}
                className="w-full h-full object-cover"
                fallbackSrc="/placeholder.svg"
              />
              <div className="absolute top-3 left-3 bg-tuca-green/80 text-white text-xs px-2 py-1 rounded">
                {event.category}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg mb-2">{event.name}</h3>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <CalendarDays className="h-4 w-4 mr-1" />
                <span>
                  {new Date(event.date).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long'
                  })}
                </span>
              </div>
              <div className="text-tuca-ocean-blue font-bold">
                {event.price > 0 ? `R$ ${event.price.toFixed(2).replace('.', ',')}` : 'Gratuito'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedEvents;
