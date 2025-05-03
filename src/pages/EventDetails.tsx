import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin, Users, Link as LinkIcon, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useWishlist } from "@/contexts/WishlistContext";
import { Event } from "@/types/event";
import { eventService } from "@/services/event-service";
import SafeImage from "@/components/ui/safe-image";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [imageLoaded, setImageLoaded] = React.useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) {
        setError("ID do evento não fornecido.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const eventData = await eventService.getEventById(parseInt(id));
        setEvent(eventData);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar detalhes do evento.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando detalhes do evento...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {error || "Evento não encontrado."}
      </div>
    );
  }

  const startDate = event.start_date ? parseISO(event.start_date) : null;
  const endDate = event.end_date ? parseISO(event.end_date) : null;

  const formattedDate = startDate
    ? endDate
      ? `${format(startDate, 'd MMM', { locale: ptBR })} - ${format(endDate, 'd MMM yyyy', { locale: ptBR })}`
      : format(startDate, 'd MMM yyyy', { locale: ptBR })
    : 'Data não especificada';

  const handleBookingClick = () => {
    if (!user) {
      toast({
        title: "Faça login",
        description: "Por favor, faça login para reservar este evento.",
        variant: "destructive",
      });
      navigate("/login", { state: { from: `/eventos/${event.id}` } });
      return;
    }
    navigate(`/reservar/evento/${event.id}`);
  };

  const handleWishlistToggle = () => {
    if (!event) return;
    
    if (isInWishlist(event.id, 'event')) {
      removeFromWishlist(event.id, 'event');
    } else {
      addToWishlist({
        id: event.id,
        type: 'event',
        title: event.name,
        image: event.image_url
      });
    }
  };

  const isWishlisted = isInWishlist(event.id, 'event');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Event Image */}
            <div className="md:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-md">
                <SafeImage
                  src={event.image_url}
                  alt={event.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ${imageLoaded ? 'hover:scale-110' : ''}`}
                  onLoadSuccess={() => setImageLoaded(true)}
                />
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
            </div>

            {/* Event Details */}
            <div className="md:order-1">
              <h1 className="text-3xl font-semibold mb-4">{event.name}</h1>
              <p className="text-gray-600 mb-5">{event.description}</p>

              <div className="flex items-center gap-3 mb-3">
                <CalendarDays className="h-5 w-5 text-gray-500" />
                <span>{formattedDate}</span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <span>{event.duration || 'Duração não especificada'}</span>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>{event.location || 'Local não especificado'}</span>
              </div>

              {event.website && (
                <div className="flex items-center gap-3 mb-5">
                  <LinkIcon className="h-5 w-5 text-gray-500" />
                  <a href={event.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Website do Evento
                  </a>
                </div>
              )}

              <div className="flex items-center gap-3 mb-5">
                <Users className="h-5 w-5 text-gray-500" />
                <span>{event.max_participants ? `Até ${event.max_participants} participantes` : 'Número de participantes não especificado'}</span>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-medium mb-2">Preços:</h3>
                <p className="text-gray-700">
                  {event.price ? `A partir de R$ ${event.price.toLocaleString('pt-BR')}` : 'Gratuito'}
                </p>
              </div>

              <Button className="w-full rounded-full" onClick={handleBookingClick}>
                Reservar Agora
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetails;
