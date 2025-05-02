
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, Ticket, Download, ArrowLeft, Loader2 } from "lucide-react";
import { ptBR } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

interface EventBooking {
  id: number;
  event_id: number;
  user_id: string;
  tickets: number;
  status: string;
  payment_status: string;
  created_at: string;
  attendee_info: any[];
  event: {
    id: number;
    name: string;
    date: string;
    start_time: string;
    end_time: string;
    location: string;
    image_url: string;
    category: string;
  };
}

const MyEventTickets = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ['userEventBookings', user?.uid],
    queryFn: async () => {
      if (!user) throw new Error("Usuário não autenticado");
      
      // Fetch user's event bookings with related event data
      const { data, error } = await supabase
        .from('event_bookings')
        .select(`
          *,
          event:events (
            id, name, date, start_time, end_time, location, image_url, category
          )
        `)
        .eq('user_id', user.uid)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data as EventBooking[];
    },
    enabled: !!user
  });
  
  // Group bookings by status
  const upcomingBookings = bookings?.filter(booking => 
    new Date(booking.event.date) >= new Date() && booking.status !== 'cancelled'
  ) || [];
  
  const pastBookings = bookings?.filter(booking => 
    new Date(booking.event.date) < new Date() && booking.status !== 'cancelled'
  ) || [];
  
  const cancelledBookings = bookings?.filter(booking => 
    booking.status === 'cancelled'
  ) || [];
  
  if (!user) {
    navigate('/login?returnTo=/meus-ingressos');
    return null;
  }

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para a Página Inicial
      </Button>
      
      <h1 className="text-3xl font-bold mb-2">Meus Ingressos</h1>
      <p className="text-muted-foreground mb-8">
        Gerencie seus ingressos para eventos em Fernando de Noronha
      </p>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-tuca-ocean-blue" />
        </div>
      ) : error ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-red-600">Ocorreu um erro ao carregar seus ingressos. Tente novamente mais tarde.</p>
            </div>
          </CardContent>
        </Card>
      ) : bookings?.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center">
            <Ticket className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-medium mb-2">Você ainda não tem ingressos</h2>
            <p className="text-muted-foreground mb-6">
              Explore eventos em Fernando de Noronha e compre seus ingressos
            </p>
            <Button onClick={() => navigate('/eventos')}>
              Ver Eventos Disponíveis
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">
              Próximos Eventos 
              {upcomingBookings.length > 0 && (
                <Badge variant="secondary" className="ml-2">{upcomingBookings.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="past">
              Eventos Passados
              {pastBookings.length > 0 && (
                <Badge variant="secondary" className="ml-2">{pastBookings.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelados
              {cancelledBookings.length > 0 && (
                <Badge variant="secondary" className="ml-2">{cancelledBookings.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="space-y-6">
              {upcomingBookings.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">Você não possui ingressos para eventos futuros.</p>
                    <Button variant="link" onClick={() => navigate('/eventos')}>
                      Ver eventos disponíveis
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                upcomingBookings.map((booking) => (
                  <EventTicketCard key={booking.id} booking={booking} />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="space-y-6">
              {pastBookings.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">Você não possui ingressos para eventos passados.</p>
                  </CardContent>
                </Card>
              ) : (
                pastBookings.map((booking) => (
                  <EventTicketCard key={booking.id} booking={booking} isPast />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="cancelled">
            <div className="space-y-6">
              {cancelledBookings.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">Você não possui ingressos cancelados.</p>
                  </CardContent>
                </Card>
              ) : (
                cancelledBookings.map((booking) => (
                  <EventTicketCard key={booking.id} booking={booking} isCancelled />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

const EventTicketCard = ({ booking, isPast = false, isCancelled = false }: { booking: EventBooking, isPast?: boolean, isCancelled?: boolean }) => {
  const navigate = useNavigate();
  
  if (!booking.event) return null;
  
  return (
    <Card className={isCancelled ? "border-red-200" : ""}>
      <CardContent className="p-0">
        <div className="md:flex">
          <div 
            className="h-40 md:h-auto md:w-52 bg-cover bg-center"
            style={{ backgroundImage: `url(${booking.event.image_url})` }}
          />
          <div className="p-6 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="text-xl font-medium mb-1">
                  {booking.event.name}
                </h2>
                <div className="flex items-center text-sm mb-1">
                  <Calendar className="h-4 w-4 mr-1.5 text-tuca-ocean-blue" />
                  <span>
                    {format(new Date(booking.event.date), "EEEE, d 'de' MMMM", { locale: ptBR })}
                  </span>
                </div>
                <div className="flex items-center text-sm mb-1">
                  <Clock className="h-4 w-4 mr-1.5 text-tuca-ocean-blue" />
                  <span>{booking.event.start_time} - {booking.event.end_time}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1.5 text-tuca-ocean-blue" />
                  <span>{booking.event.location}</span>
                </div>
              </div>
              
              <div className="text-right">
                <Badge variant={isCancelled ? "destructive" : isPast ? "outline" : "default"}>
                  {isCancelled ? "Cancelado" : isPast ? "Concluído" : "Confirmado"}
                </Badge>
                <div className="mt-2 text-sm">
                  <span className="text-muted-foreground">Reserva #:</span> {booking.id}
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Ingressos:</span> {booking.tickets}
                </div>
              </div>
            </div>
            
            {booking.attendee_info && booking.attendee_info.length > 0 && (
              <div className="mt-4">
                <Separator className="mb-3" />
                <h3 className="text-sm font-medium mb-2">Participantes:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                  {booking.attendee_info.map((attendee, index) => (
                    <div key={index} className="text-sm">
                      {attendee.name}
                      {attendee.ticketType && (
                        <span className="text-muted-foreground ml-1">
                          ({attendee.ticketType})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-muted/30 px-6 py-3">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate(`/eventos/${booking.event_id}`)}
        >
          Ver Evento
        </Button>
        
        {!isCancelled && !isPast && (
          <Button variant="outline" size="sm" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Baixar Ingressos
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MyEventTickets;
