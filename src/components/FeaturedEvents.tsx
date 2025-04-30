
import React from "react";
import { Button } from "@/components/ui/button";
import { Ticket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useFeaturedEvents } from "@/hooks/events/use-event-search";
import EventCard from "@/components/event/EventCard";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedEvents = () => {
  const { data: events = [], isLoading } = useFeaturedEvents(3);

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-3">Eventos em Destaque</h2>
            <p className="text-gray-600 max-w-2xl">
              Descubra experiências exclusivas em Fernando de Noronha. Nossos eventos destacados oferecem momentos inesquecíveis na ilha.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg overflow-hidden bg-white shadow-md">
                <Skeleton className="h-56 w-full" />
                <div className="p-5">
                  <Skeleton className="h-7 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-3" />
                  <div className="flex items-center justify-between pt-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Skeleton className="h-10 w-48 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-3">Eventos em Destaque</h2>
            <p className="text-gray-600 max-w-2xl">
              Descubra experiências exclusivas em Fernando de Noronha. Nossos eventos destacados oferecem momentos inesquecíveis na ilha.
            </p>
          </div>

          <Link to="/eventos" className="mt-4 md:mt-0 inline-flex items-center text-tuca-ocean-blue hover:text-tuca-deep-blue transition-colors">
            <span className="mr-2">Ver todos os eventos</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild size="lg" className="gap-2">
            <Link to="/eventos">
              <Ticket className="h-5 w-5" />
              <span>Explorar Todos os Eventos</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
