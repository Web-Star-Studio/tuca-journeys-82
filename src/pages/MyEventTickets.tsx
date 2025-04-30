
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUserEventBookings } from "@/hooks/events/use-event-booking";
import { useAuth } from "@/contexts/AuthContext";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2, CalendarCheck, ChevronRight, Filter, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const MyEventTickets = () => {
  const { user } = useAuth();
  const { data: bookings, isLoading } = useUserEventBookings(user?.id);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16 flex flex-col items-center justify-center p-4">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
            <p className="mb-8">Você precisa estar logado para acessar seus ingressos.</p>
            <Button asChild>
              <a href="/login?redirect=/meus-ingressos">Fazer Login</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const upcomingBookings = bookings?.filter(booking => 
    booking.events && new Date(booking.events.date) >= new Date() && 
    booking.status !== 'cancelled'
  );

  const pastBookings = bookings?.filter(booking => 
    booking.events && new Date(booking.events.date) < new Date() || 
    booking.status === 'cancelled'
  );

  const getStatusBadge = (status: string, isPast: boolean) => {
    if (status === 'cancelled') {
      return <Badge variant="destructive">Cancelado</Badge>;
    } else if (isPast) {
      return <Badge variant="secondary">Concluído</Badge>;
    } else {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Confirmado</Badge>;
    }
  };

  const renderBookings = (bookingsList: any[], isPast = false) => {
    if (!bookingsList || bookingsList.length === 0) {
      return (
        <div className="text-center py-12">
          <Ticket className="w-12 h-12 mx-auto opacity-20 mb-4" />
          <h3 className="text-xl font-medium mb-2">
            {isPast ? "Você ainda não participou de eventos" : "Você não tem ingressos para eventos futuros"}
          </h3>
          <p className="text-gray-500 mb-6">
            {isPast 
              ? "Quando você participar de eventos, eles aparecerão aqui." 
              : "Confira nossos eventos e garanta sua participação!"}
          </p>
          <Button asChild>
            <a href="/eventos">Ver Eventos Disponíveis</a>
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bookingsList.map(booking => (
          <Card key={booking.id} className="overflow-hidden">
            {booking.events && (
              <div className="h-40 bg-gray-200">
                <img 
                  src={booking.events.image_url} 
                  alt={booking.events.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
            )}
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{booking.events?.name}</CardTitle>
                  <CardDescription>
                    {booking.events && (
                      <div className="flex items-center mt-1">
                        <CalendarCheck className="h-4 w-4 mr-1.5 text-tuca-ocean-blue" />
                        {format(parseISO(booking.events.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </div>
                    )}
                  </CardDescription>
                </div>
                {getStatusBadge(booking.status, isPast)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Ingressos:</span>
                  <span className="font-medium">{booking.tickets}x</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Valor:</span>
                  <span className="font-medium">
                    R$ {Number(booking.total_price).toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Data da compra:</span>
                  <span className="font-medium">
                    {format(parseISO(booking.created_at), "dd/MM/yyyy", { locale: ptBR })}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" size="sm">
                Ver ingresso
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center">
                Detalhes <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Meus Ingressos</h1>
                <p className="text-gray-600">
                  Gerencie seus ingressos para eventos em Fernando de Noronha
                </p>
              </div>
              
              <Button variant="outline" className="mt-4 md:mt-0 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filtrar</span>
              </Button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-tuca-ocean-blue" />
              </div>
            ) : (
              <Tabs defaultValue="upcoming">
                <TabsList className="mb-6">
                  <TabsTrigger value="upcoming">
                    Próximos ({upcomingBookings?.length || 0})
                  </TabsTrigger>
                  <TabsTrigger value="past">
                    Passados ({pastBookings?.length || 0})
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                  {renderBookings(upcomingBookings || [])}
                </TabsContent>
                <TabsContent value="past">
                  {renderBookings(pastBookings || [], true)}
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyEventTickets;
