import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  CalendarDays, 
  Clock, 
  MapPin, 
  Users, 
  Share2, 
  CalendarCheck, 
  Info 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Event } from "@/types/event";
import { events } from "@/data/events";
import EventLocation from "@/components/event/EventLocation";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  
  // Find the event by ID
  const event = events.find(e => e.id === Number(id));
  
  // If event not found, show error
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Evento não encontrado</h1>
          <p className="mb-6">O evento que você está procurando não existe.</p>
          <Button onClick={() => navigate("/eventos")}>Voltar para Eventos</Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Find related events (same category, excluding current event)
  const relatedEvents = events.filter(e => e.category === event.category && e.id !== event.id).slice(0, 3);

  // Handle quantity changes
  const incrementQuantity = () => {
    if (ticketQuantity < event.available_spots) {
      setTicketQuantity(prev => prev + 1);
    }
  };
  
  const decrementQuantity = () => {
    setTicketQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  // Calculate total price
  const totalPrice = event.price * ticketQuantity;
  
  // Format date
  const eventDate = new Date(event.date).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link to="/eventos" className="flex items-center text-tuca-ocean-blue hover:underline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para eventos
            </Link>
          </div>
          
          {/* Event Hero */}
          <div className="relative h-[40vh] md:h-[50vh] rounded-xl overflow-hidden mb-8">
            <img 
              src={event.image_url} 
              alt={event.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 md:p-10 text-white">
                <div className="inline-block px-3 py-1 bg-tuca-green/80 rounded text-white text-sm mb-4">
                  {event.category}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.name}</h1>
                <div className="flex flex-wrap gap-4 text-white/90">
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    <span>{eventDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.start_time} - {event.end_time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Event Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Detalhes do Evento</h2>
                <p className="text-gray-700 whitespace-pre-line mb-6">{event.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <CalendarCheck className="h-5 w-5 mr-2 text-tuca-ocean-blue" />
                      Informações do Evento
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li><span className="font-medium">Data:</span> {eventDate}</li>
                      <li><span className="font-medium">Horário:</span> {event.start_time} - {event.end_time}</li>
                      <li><span className="font-medium">Local:</span> {event.location}</li>
                      <li><span className="font-medium">Categoria:</span> {event.category}</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <Info className="h-5 w-5 mr-2 text-tuca-ocean-blue" />
                      Organizador
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li><span className="font-medium">Nome:</span> {event.organizer}</li>
                      <li><span className="font-medium">Capacidade:</span> {event.capacity} pessoas</li>
                      <li><span className="font-medium">Vagas disponíveis:</span> {event.available_spots}</li>
                      <li><span className="font-medium">Status:</span> {
                        event.status === 'scheduled' ? 'Agendado' :
                        event.status === 'ongoing' ? 'Em andamento' :
                        event.status === 'completed' ? 'Finalizado' : 'Cancelado'
                      }</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-center md:justify-start">
                  <Button 
                    variant="outline"
                    className="flex items-center border-tuca-ocean-blue text-tuca-ocean-blue hover:bg-tuca-ocean-blue hover:text-white"
                    onClick={() => {
                      // Share functionality would go here
                      alert("Compartilhar evento: " + event.name);
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar Evento
                  </Button>
                </div>
              </div>
              
              {/* Location Map (placeholder) */}
              
            </div>
            
            {/* Reservation Card */}
            
            {/* Location Map (updated) */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Localização</h2>
              <EventLocation location={event.location} />
            </div>
          </div>
          
          {/* Related Events */}
          {relatedEvents.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-8">Eventos Relacionados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedEvents.map(relEvent => (
                  <div
                    key={relEvent.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => navigate(`/eventos/${relEvent.id}`)}
                  >
                    <div className="relative h-48">
                      <img
                        src={relEvent.image_url}
                        alt={relEvent.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-tuca-green/80 text-white text-xs px-2 py-1 rounded">
                        {relEvent.category}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-2">{relEvent.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        <span>
                          {new Date(relEvent.date).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'long'
                          })}
                        </span>
                      </div>
                      <div className="text-tuca-ocean-blue font-bold">
                        {relEvent.price > 0 ? `R$ ${relEvent.price.toFixed(2).replace('.', ',')}` : 'Gratuito'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetail;
