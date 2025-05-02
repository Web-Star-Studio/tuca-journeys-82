
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Ticket, Calendar, Clock, MapPin, AlertCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { eventService } from "@/services/event-service";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EventBooking } from "@/types/event";

const MyEventTickets = () => {
  const { user, isLoading: isLoadingAuth } = useAuth();
  
  const { 
    data: bookings, 
    isLoading,
    error 
  } = useQuery({
    queryKey: ['myEventBookings', user?.id],
    queryFn: async () => {
      if (!user?.id) return Promise.resolve([]);
      const data = await eventService.getUserEventBookings(user.id);
      return data;
    },
    enabled: !!user?.id,
  });
  
  const hasBookings = bookings && bookings.length > 0;
  
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container max-w-5xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Meus Ingressos</h1>
          <Button asChild>
            <Link to="/eventos">Ver Eventos</Link>
          </Button>
        </div>
        
        {(isLoading || isLoadingAuth) && (
          <div className="flex justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-tuca-ocean-blue" />
          </div>
        )}
        
        {error && (
          <Card>
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-3" />
              <h2 className="text-xl font-medium mb-2">Erro ao carregar ingressos</h2>
              <p className="text-muted-foreground">
                Não foi possível carregar seus ingressos. Tente novamente mais tarde.
              </p>
            </CardContent>
          </Card>
        )}
        
        {!isLoading && !error && !hasBookings && (
          <Card>
            <CardContent className="p-6 text-center">
              <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h2 className="text-xl font-medium mb-2">Nenhum Ingresso Encontrado</h2>
              <p className="text-muted-foreground mb-4">
                Você ainda não comprou ingressos para eventos.
              </p>
              <Button asChild>
                <Link to="/eventos">Explorar Eventos</Link>
              </Button>
            </CardContent>
          </Card>
        )}
        
        {hasBookings && bookings && (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div 
                      className="h-48 md:h-full bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url(${booking.event?.image_url})` 
                      }}
                    />
                    <div className="p-6 col-span-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-bold mb-2">{booking.event?.name}</h2>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>
                                {format(new Date(booking.event?.date || new Date()), "EEEE, d 'de' MMMM", { locale: ptBR })}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{booking.event?.start_time} - {booking.event?.end_time}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span>{booking.event?.location}</span>
                            </div>
                          </div>
                        </div>
                        <Badge>{booking.tickets} {booking.tickets > 1 ? 'ingressos' : 'ingresso'}</Badge>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Reserva #{booking.id}</p>
                          <p className="text-sm font-medium">
                            Total: R$ {booking.total_price.toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                        <div className="flex mt-3 sm:mt-0">
                          <Button size="sm" className="mr-2">Ver Ingressos</Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/eventos/${booking.event_id}`}>
                              Detalhes do Evento
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyEventTickets;
