
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useUserEventBookings } from "@/hooks/events/use-event-booking";
import { Loader2, Calendar, Clock, MapPin, Download, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import SafeImage from "@/components/ui/safe-image";
import { Badge } from "@/components/ui/badge";

const MyEventTickets = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: bookings, isLoading } = useUserEventBookings(user?.id);
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login", { state: { from: "/meus-ingressos" } });
    }
  }, [user, isLoading, navigate]);
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <p>Você precisa estar logado para acessar esta página.</p>
        </main>
        <Footer />
      </div>
    );
  }
  
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
  
  const groupedBookings = {
    upcoming: bookings?.filter(
      (booking) => new Date(booking.events.date) >= new Date()
    ) || [],
    past: bookings?.filter(
      (booking) => new Date(booking.events.date) < new Date()
    ) || [],
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Meus Ingressos</h1>
            <p className="text-gray-600">
              Gerencie seus ingressos de eventos em Fernando de Noronha
            </p>
          </div>
          
          {bookings && bookings.length > 0 ? (
            <>
              {/* Upcoming events */}
              <div className="mb-12">
                <h2 className="text-xl font-medium mb-4">Próximos Eventos</h2>
                
                {groupedBookings.upcoming.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedBookings.upcoming.map((booking) => (
                      <Card key={booking.id} className="overflow-hidden">
                        <div className="h-40 relative">
                          <SafeImage 
                            src={booking.events.image_url} 
                            alt={booking.events.name} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3">
                            <Badge variant="secondary" className="bg-tuca-ocean-blue/90 text-white">
                              {booking.events.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <CardHeader>
                          <CardTitle className="line-clamp-1">{booking.events.name}</CardTitle>
                        </CardHeader>
                        
                        <CardContent className="space-y-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-tuca-ocean-blue" />
                            <span className="text-sm">
                              {format(parseISO(booking.events.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                            </span>
                          </div>
                          
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-tuca-ocean-blue" />
                            <span className="text-sm">{booking.events.start_time} - {booking.events.end_time}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-tuca-ocean-blue" />
                            <span className="text-sm line-clamp-1">{booking.events.location}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Ticket className="h-4 w-4 mr-2 text-tuca-ocean-blue" />
                            <span className="text-sm">{booking.tickets} {booking.tickets > 1 ? 'ingressos' : 'ingresso'}</span>
                          </div>
                        </CardContent>
                        
                        <CardFooter className="flex justify-between border-t pt-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/eventos/${booking.event_id}`)}
                          >
                            Ver Evento
                          </Button>
                          
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="flex items-center gap-1"
                          >
                            <Download className="h-4 w-4" />
                            <span>Ingressos</span>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">Você não tem ingressos para eventos futuros.</p>
                    <Button 
                      variant="link" 
                      className="text-tuca-ocean-blue"
                      onClick={() => navigate('/eventos')}
                    >
                      Explorar eventos
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Past events */}
              {groupedBookings.past.length > 0 && (
                <div>
                  <Separator className="mb-8" />
                  <h2 className="text-xl font-medium mb-4">Eventos Anteriores</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedBookings.past.map((booking) => (
                      <Card key={booking.id} className="overflow-hidden opacity-75">
                        <div className="h-40 relative">
                          <SafeImage 
                            src={booking.events.image_url} 
                            alt={booking.events.name} 
                            className="w-full h-full object-cover grayscale"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Badge variant="secondary" className="bg-gray-500 text-white">
                              Finalizado
                            </Badge>
                          </div>
                        </div>
                        
                        <CardHeader>
                          <CardTitle className="line-clamp-1">{booking.events.name}</CardTitle>
                        </CardHeader>
                        
                        <CardContent className="space-y-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm">
                              {format(parseISO(booking.events.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                            </span>
                          </div>
                          
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm line-clamp-1">{booking.events.location}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <Ticket className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Nenhum ingresso encontrado</h3>
              <p className="text-gray-600 mb-6">
                Você ainda não comprou ingressos para eventos. Explore nossos eventos e garanta sua participação!
              </p>
              <Button onClick={() => navigate('/eventos')}>Explorar Eventos</Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyEventTickets;
