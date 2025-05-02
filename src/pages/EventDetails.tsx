import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useFeaturedEvents } from "@/hooks/events/use-event-search";
import { useEventBooking } from "@/hooks/events/use-event-booking";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Clock, MapPin, Users, Calendar, Share2, Heart } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import { AttendeeInfo } from "@/types/event";
import { useQuery } from "@tanstack/react-query";
import { eventService } from "@/services/event-service";

const EventBreadcrumb = ({ category, eventName }: { category: string; eventName: string }) => (
  <div className="flex text-sm text-gray-500 mb-6">
    <a href="/" className="hover:text-tuca-ocean-blue">Início</a>
    <span className="mx-2">/</span>
    <a href="/eventos" className="hover:text-tuca-ocean-blue">Eventos</a>
    <span className="mx-2">/</span>
    <a href={`/eventos?category=${category}`} className="hover:text-tuca-ocean-blue">{category}</a>
    <span className="mx-2">/</span>
    <span className="text-gray-700 font-medium">{eventName}</span>
  </div>
);

const EventDetailHeader = ({ event }: { event: any }) => (
  <div className="mb-8">
    <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.name}</h1>
    <div className="flex items-center gap-4">
      <span className="px-3 py-1 rounded-full bg-tuca-ocean-blue text-white text-sm font-medium">
        {event.category}
      </span>
      {event.status === 'scheduled' && (
        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
          Agendado
        </span>
      )}
      {event.status === 'ongoing' && (
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
          Em andamento
        </span>
      )}
      {event.status === 'completed' && (
        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
          Finalizado
        </span>
      )}
      {event.status === 'cancelled' && (
        <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium">
          Cancelado
        </span>
      )}
    </div>
  </div>
);

const EventDetailInfo = ({ event }: { event: any }) => (
  <div className="mb-10">
    <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-8">
      <div className="h-96 relative">
        <img 
          src={event.image_url} 
          alt={event.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-medium mb-4">Sobre o evento</h2>
        <div className="prose prose-slate max-w-none">
          <p>{event.description}</p>
        </div>
      </div>
    </div>
  </div>
);

const EventLocationSection = ({ location }: { location: string }) => (
  <div className="mb-10">
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-medium mb-4">Localização</h2>
        <div className="flex items-start">
          <MapPin className="h-5 w-5 mt-0.5 mr-3 text-tuca-ocean-blue" />
          <div>
            <p className="text-gray-700">{location}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const EventNotFound = () => (
  <div className="container mx-auto px-4 py-16 text-center">
    <h2 className="text-2xl font-bold mb-4">Evento não encontrado</h2>
    <p className="mb-8">O evento que você está procurando não existe ou foi removido.</p>
    <Button asChild>
      <a href="/eventos">Ver outros eventos</a>
    </Button>
  </div>
);

const RelatedEvents = ({ events }: { events: any[] }) => {
  if (!events || events.length === 0) return null;
  
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Eventos relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map(event => (
          <a 
            href={`/eventos/${event.id}`} 
            key={event.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-48 relative">
              <img 
                src={event.image_url} 
                alt={event.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2">{event.name}</h3>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <Calendar className="h-4 w-4 mr-1.5" />
                <span>
                  {format(parseISO(event.date), "dd MMM yyyy", { locale: ptBR })}
                </span>
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                <span className="font-bold text-tuca-deep-blue">
                  {event.price > 0 ? `R$ ${event.price.toFixed(2).replace('.', ',')}` : 'Gratuito'}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const eventId = parseInt(id || "0", 10);
  
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // State for ticket booking
  const [ticketCount, setTicketCount] = useState(1);
  const [attendees, setAttendees] = useState<AttendeeInfo[]>([{ name: "", email: "" }]);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  
  // Fetch event details directly
  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => eventService.getEventById(eventId),
    enabled: !!eventId && eventId > 0
  });
  
  // Fetch related events
  const { events: featuredEvents = [] } = useFeaturedEvents(3);
  const relatedEvents = featuredEvents.filter(featEvent => featEvent.id !== eventId);
  
  // Booking mutation
  const { bookTickets, isLoading: isBooking } = useEventBooking();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-tuca-ocean-blue" />
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16">
          <EventNotFound />
        </main>
        <Footer />
      </div>
    );
  }
  
  // Check if event is in wishlist
  const inWishlist = isInWishlist(event.id);
  
  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(event.id);
      toast.success("Evento removido dos favoritos");
    } else {
      addToWishlist({
        id: event.id,
        name: event.name,
        image: event.image_url,
        type: 'event',
        price: event.price,
        description: event.description.substring(0, 100) + '...'
      });
      toast.success("Evento adicionado aos favoritos");
    }
  };
  
  const handleBuyTickets = () => {
    if (!user) {
      toast.error("Você precisa estar logado para comprar ingressos");
      navigate("/login", { state: { from: `/eventos/${event.id}` } });
      return;
    }
    setShowBookingDialog(true);
  };
  
  const handleTicketCountChange = (value: number) => {
    if (value < 1) value = 1;
    if (event.available_spots && value > event.available_spots) {
      value = event.available_spots;
    }
    
    setTicketCount(value);
    
    // Update attendee array size
    const newAttendees = [...attendees];
    if (newAttendees.length < value) {
      // Add more attendee slots
      while (newAttendees.length < value) {
        newAttendees.push({ name: "", email: "" });
      }
    } else if (newAttendees.length > value) {
      // Remove excess attendee slots
      newAttendees.splice(value);
    }
    
    setAttendees(newAttendees);
  };
  
  const updateAttendee = (index: number, field: keyof AttendeeInfo, value: string) => {
    const newAttendees = [...attendees];
    newAttendees[index] = { ...newAttendees[index], [field]: value };
    setAttendees(newAttendees);
  };
  
  const handleSubmitBooking = () => {
    if (!user) {
      toast.error("Você precisa estar logado para comprar ingressos");
      return;
    }
    
    // Validate attendee information
    const isValid = attendees.every(a => a.name.trim() && a.email.trim());
    if (!isValid) {
      toast.error("Preencha todos os campos de informação dos participantes");
      return;
    }
    
    bookTickets({
      eventId: event.id,
      userId: user.id,
      ticketCount,
      attendeeInfo: attendees
    });
    
    setShowBookingDialog(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 pb-16">
          <EventBreadcrumb category={event.category} eventName={event.name} />
          
          <EventDetailHeader event={event} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event information */}
            <div className="lg:col-span-2">
              <EventDetailInfo event={event} />
              
              <EventLocationSection location={event.location} />
            </div>
            
            {/* Event booking sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-5 w-5 mr-2 text-tuca-ocean-blue" />
                      <span className="font-medium">
                        {format(parseISO(event.date), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </span>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 mr-2 text-tuca-ocean-blue" />
                      <span>{event.start_time} - {event.end_time}</span>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <MapPin className="h-5 w-5 mr-2 text-tuca-ocean-blue" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-tuca-ocean-blue" />
                      <span>
                        {event.available_spots} vagas disponíveis
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <div className="text-2xl font-bold text-tuca-deep-blue mb-2">
                      {event.price > 0 ? `R$ ${event.price.toFixed(2).replace('.', ',')}` : 'Gratuito'}
                    </div>
                    
                    <Button 
                      className="w-full mb-3"
                      onClick={handleBuyTickets}
                      disabled={event.available_spots <= 0 || event.status === 'cancelled'}
                    >
                      {event.available_spots <= 0 ? 'Esgotado' : 'Comprar Ingressos'}
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={handleWishlistToggle}
                    >
                      <Heart 
                        className={`h-5 w-5 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} 
                      />
                      {inWishlist ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                    </Button>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="font-medium mb-2">Organizado por</h3>
                    <p>{event.organizer}</p>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full mt-4 text-tuca-ocean-blue hover:text-tuca-deep-blue hover:bg-tuca-light-blue"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartilhar Evento
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <RelatedEvents events={relatedEvents} />
          
        </div>
      </main>
      
      {/* Ticket booking dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Comprar Ingressos - {event.name}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center justify-between mb-6">
              <Label>Quantidade de Ingressos</Label>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => handleTicketCountChange(ticketCount - 1)}
                  disabled={ticketCount <= 1}
                >
                  -
                </Button>
                <span className="mx-4 text-lg font-medium">{ticketCount}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => handleTicketCountChange(ticketCount + 1)}
                  disabled={event.available_spots <= ticketCount}
                >
                  +
                </Button>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">
                Por favor, preencha os dados para cada participante
              </p>
              
              {attendees.map((attendee, index) => (
                <div key={index} className="mb-4 p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Participante {index + 1}</h4>
                  
                  <div className="grid gap-3">
                    <div className="grid gap-1.5">
                      <Label htmlFor={`name-${index}`}>Nome completo</Label>
                      <Input 
                        id={`name-${index}`} 
                        value={attendee.name}
                        onChange={(e) => updateAttendee(index, 'name', e.target.value)}
                        placeholder="Nome completo"
                      />
                    </div>
                    
                    <div className="grid gap-1.5">
                      <Label htmlFor={`email-${index}`}>Email</Label>
                      <Input 
                        id={`email-${index}`} 
                        type="email"
                        value={attendee.email}
                        onChange={(e) => updateAttendee(index, 'email', e.target.value)}
                        placeholder="Email para envio do ingresso"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center border-t border-gray-100 pt-4">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl font-bold">
                  R$ {(event.price * ticketCount).toFixed(2).replace('.', ',')}
                </p>
              </div>
              
              <Button 
                onClick={handleSubmitBooking}
                disabled={isBooking}
              >
                {isBooking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Finalizar Compra
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default EventDetails;
