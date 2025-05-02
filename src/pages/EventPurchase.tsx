
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CalendarIcon, Clock, MapPin, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { eventService } from "@/services/event-service";
import { AttendeeInfo, SelectedTicket } from "@/types/event";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EventPurchase = () => {
  const { id } = useParams<{ id: string }>();
  const eventId = parseInt(id || "", 10);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { user } = useAuth();
  if (!user) {
    navigate('/login', { state: { returnTo: `/eventos/${eventId}/comprar` } });
    return null;
  }
  
  const { state } = location;
  const selectedTickets = state?.selectedTickets as SelectedTicket[] || [];
  const eventFromState = state?.event;
  
  const [attendees, setAttendees] = useState<AttendeeInfo[]>([]);
  
  const { data: event, isLoading: isEventLoading } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => eventService.getEventById(eventId),
    enabled: !eventFromState && !!eventId,
    initialData: eventFromState,
  });
  
  const totalTickets = selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0);
  const totalPrice = selectedTickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0);
  
  // Initialize attendees based on selected tickets
  useEffect(() => {
    if (selectedTickets.length > 0) {
      const newAttendees: AttendeeInfo[] = [];
      
      selectedTickets.forEach(ticket => {
        for (let i = 0; i < ticket.quantity; i++) {
          newAttendees.push({
            name: user ? user.email?.split('@')[0] || '' : '',
            email: user ? user.email || '' : '',
            ticketType: ticket.name
          });
        }
      });
      
      setAttendees(newAttendees);
    }
  }, [selectedTickets, user]);
  
  const bookMutation = useMutation({
    mutationFn: async () => {
      if (!user || !user.id) throw new Error('User not authenticated');
      return eventService.bookEventTickets(
        eventId,
        user.id,
        totalTickets,
        attendees
      );
    },
    onSuccess: () => {
      toast.success('Ingressos reservados com sucesso!');
      navigate('/meus-ingressos');
    },
    onError: (error) => {
      toast.error('Erro ao reservar ingressos', { 
        description: (error as Error).message
      });
    }
  });
  
  const updateAttendee = (index: number, field: keyof AttendeeInfo, value: string) => {
    setAttendees(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };
  
  const handleBookTickets = () => {
    // Validate attendee information
    const isValid = attendees.every(a => a.name.trim() && a.email.trim());
    
    if (!isValid) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    bookMutation.mutate();
  };
  
  if (isEventLoading || !event) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container max-w-4xl mx-auto py-12 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!selectedTickets.length) {
    navigate(`/eventos/${eventId}`);
    return null;
  }
  
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">Finalizar compra</h1>
          <p className="text-muted-foreground">
            Complete seus dados para confirmar a reserva dos ingressos
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Informações do evento</h2>
                
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div 
                    className="h-28 w-28 bg-cover bg-center rounded-lg shrink-0"
                    style={{ backgroundImage: `url(${event.image_url})` }}
                  />
                  
                  <div>
                    <h3 className="font-medium text-lg mb-2">{event.name}</h3>
                    
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        <span>
                          {format(new Date(event.date), "EEEE, dd 'de' MMMM", { locale: ptBR })}
                        </span>
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
                
                <Separator className="mb-6" />
                
                <h2 className="text-xl font-semibold mb-4">Ingressos selecionados</h2>
                
                <div className="space-y-4 mb-6">
                  {selectedTickets.map((ticket, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{ticket.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {ticket.quantity}x R$ {ticket.price.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                      <div className="font-medium">
                        R$ {(ticket.quantity * ticket.price).toFixed(2).replace('.', ',')}
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t flex justify-between items-center font-medium text-lg">
                    <span>Total</span>
                    <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
                
                <Separator className="mb-6" />
                
                <h2 className="text-xl font-semibold mb-4">Dados dos participantes</h2>
                
                <div className="space-y-6">
                  {attendees.map((attendee, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">Participante {index + 1}</h3>
                        <span className="text-sm text-muted-foreground">{attendee.ticketType}</span>
                      </div>
                      
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor={`name-${index}`}>Nome completo *</Label>
                          <Input 
                            id={`name-${index}`}
                            value={attendee.name}
                            onChange={(e) => updateAttendee(index, 'name', e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`email-${index}`}>Email *</Label>
                          <Input 
                            id={`email-${index}`}
                            type="email"
                            value={attendee.email}
                            onChange={(e) => updateAttendee(index, 'email', e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`document-${index}`}>Documento (opcional)</Label>
                          <Input 
                            id={`document-${index}`}
                            value={attendee.document || ''}
                            onChange={(e) => updateAttendee(index, 'document', e.target.value)}
                            className="mt-1"
                            placeholder="CPF ou RG"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={handleBookTickets}
                  disabled={bookMutation.isPending}
                  className="w-full sm:w-auto"
                >
                  {bookMutation.isPending ? 'Processando...' : 'Finalizar compra'}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Resumo da compra</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ingressos</span>
                    <span>{totalTickets}</span>
                  </div>
                  
                  {selectedTickets.map((ticket, index) => (
                    <div key={index} className="flex justify-between text-sm text-muted-foreground">
                      <span>{ticket.name}</span>
                      <span>{ticket.quantity}x</span>
                    </div>
                  ))}
                  
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">
                      R$ {totalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t space-y-2 text-sm">
                  <p className="font-medium">Informações importantes</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Os ingressos serão enviados para o email informado</li>
                    <li>• Apresente o ingresso no dia do evento</li>
                    <li>• Cancelamentos são aceitos até 48h antes do evento</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventPurchase;
