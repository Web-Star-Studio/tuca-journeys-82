
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, MapPin, Users, Info, ArrowLeft, CalendarIcon } from "lucide-react";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import EventNotFound from "@/components/event/detail/EventNotFound";
import EventTicketSelector, { SelectedTicket } from "@/components/event/EventTicketSelector";
import EventBreadcrumb from "@/components/event/detail/EventBreadcrumb";
import EventDetailHeader from "@/components/event/detail/EventDetailHeader";
import EventLocationSection from "@/components/event/detail/EventLocationSection";
import { useAuth } from "@/contexts/AuthContext";
import { eventService } from "@/services/event-service";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedTickets, setSelectedTickets] = useState<SelectedTicket[]>([]);
  
  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: () => eventService.getEventById(Number(id)),
    enabled: !!id
  });
  
  // Fetch tickets for this event
  const { data: tickets } = useQuery({
    queryKey: ['eventTickets', id],
    queryFn: async () => {
      // In a real app, this would fetch from the database
      // For now, creating sample tickets based on the event data
      if (!event) return [];
      
      return [
        {
          id: 1,
          name: "Ingresso Regular",
          price: event.price,
          available_quantity: event.available_spots,
          max_per_order: 4,
          type: "regular" as const,
          description: "Acesso padrão ao evento"
        },
        {
          id: 2,
          name: "Ingresso VIP",
          price: event.price * 2,
          available_quantity: Math.floor(event.available_spots * 0.2),
          max_per_order: 2,
          type: "vip" as const,
          description: "Inclui área VIP e welcome drink",
          benefits: ["Acesso à área VIP", "Welcome drink", "Kit de brindes"]
        }
      ];
    },
    enabled: !!event
  });

  useEffect(() => {
    // Scroll to top when loading a new event
    window.scrollTo(0, 0);
  }, [id]);

  const handleTicketSelect = (tickets: SelectedTicket[]) => {
    setSelectedTickets(tickets);
  };
  
  const handleBookTickets = () => {
    if (!user) {
      toast.error("É necessário estar logado para comprar ingressos", {
        description: "Faça login para continuar com a compra",
        action: {
          label: "Login",
          onClick: () => navigate(`/login?returnTo=/eventos/${id}`),
        },
      });
      return;
    }
    
    if (selectedTickets.length === 0) {
      toast.error("Selecione pelo menos um ingresso para continuar");
      return;
    }
    
    // Process booking
    // In a real app, we'd redirect to a checkout page or process the payment
    navigate(`/eventos/${id}/comprar`, { 
      state: { 
        selectedTickets,
        event 
      } 
    });
  };

  if (isLoading) {
    return (
      <div className="container max-w-5xl mx-auto py-12">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tuca-ocean-blue"></div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return <EventNotFound />;
  }

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <EventBreadcrumb name={event.name} />
      
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>
      
      <EventDetailHeader event={event} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="policies">Políticas</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <div className="prose max-w-none">
                <h3>Sobre o Evento</h3>
                <p>{event.description}</p>
              </div>

              <div className="my-8">
                <EventLocationSection location={event.location} />
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Informações do Evento</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex">
                      <Calendar className="h-5 w-5 mr-3 text-tuca-ocean-blue" />
                      <div>
                        <strong>Data:</strong> {format(new Date(event.date), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </div>
                    </li>
                    <li className="flex">
                      <Clock className="h-5 w-5 mr-3 text-tuca-ocean-blue" />
                      <div>
                        <strong>Horário:</strong> {event.start_time} - {event.end_time}
                      </div>
                    </li>
                    <li className="flex">
                      <MapPin className="h-5 w-5 mr-3 text-tuca-ocean-blue" />
                      <div>
                        <strong>Local:</strong> {event.location}
                      </div>
                    </li>
                    <li className="flex">
                      <Users className="h-5 w-5 mr-3 text-tuca-ocean-blue" />
                      <div>
                        <strong>Vagas:</strong> {event.available_spots} disponíveis de {event.capacity} no total
                      </div>
                    </li>
                    <li className="flex">
                      <Info className="h-5 w-5 mr-3 text-tuca-ocean-blue" />
                      <div>
                        <strong>Organizador:</strong> {event.organizer}
                      </div>
                    </li>
                  </ul>
                </div>
                
                {event.category && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Categoria</h3>
                    <Badge>{event.category}</Badge>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="policies" className="mt-6">
              {event.policies ? (
                <div className="prose max-w-none">
                  <h3>Políticas do Evento</h3>
                  <p>{event.policies}</p>
                </div>
              ) : (
                <Alert>
                  <AlertDescription>
                    Não há políticas específicas para este evento.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Cancelamento</h3>
                <p className="text-sm text-muted-foreground">
                  O cancelamento é permitido com até 48 horas de antecedência ao evento, com reembolso de 70% do valor pago.
                  Após este prazo, não haverá reembolso.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <div className="bg-white p-5 rounded-lg shadow-md sticky top-20">
            <ScrollArea className="h-[70vh] pr-4">
              {tickets && tickets.length > 0 ? (
                <EventTicketSelector
                  eventName={event.name}
                  eventDate={event.date}
                  location={event.location}
                  tickets={tickets}
                  onTicketSelect={handleTicketSelect}
                />
              ) : (
                <div className="text-center p-8">
                  <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">Ingressos não disponíveis</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Não há ingressos disponíveis para este evento no momento.
                  </p>
                </div>
              )}
            </ScrollArea>
            
            {selectedTickets.length > 0 && (
              <div className="mt-4">
                <Button className="w-full" size="lg" onClick={handleBookTickets}>
                  Comprar Ingressos
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
