
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, CreditCard, QrCode, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SelectedTicket } from "@/components/event/EventTicketSelector";
import { useAuth } from "@/contexts/AuthContext";
import { eventService } from "@/services/event-service";

interface EventPurchaseLocationState {
  selectedTickets: SelectedTicket[];
  event: any;
}

const EventPurchase = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");
  const [attendeeInfo, setAttendeeInfo] = useState<{ [key: number]: { name: string; email: string; document?: string }[] }>({});
  
  const state = location.state as EventPurchaseLocationState | undefined;
  
  // If we don't have state, redirect to event detail page
  if (!state || !state.selectedTickets || !state.event) {
    navigate(`/eventos/${id}`);
    return null;
  }
  
  const { selectedTickets, event } = state;
  
  // Initialize attendee info form fields for each ticket
  React.useEffect(() => {
    const initialAttendeeInfo: { [key: number]: { name: string; email: string; document?: string }[] } = {};
    
    selectedTickets.forEach(ticket => {
      initialAttendeeInfo[ticket.ticketId] = Array(ticket.quantity).fill({
        name: user?.displayName || '',
        email: user?.email || '',
        document: ''
      });
    });
    
    setAttendeeInfo(initialAttendeeInfo);
  }, [selectedTickets, user]);
  
  // Calculate total price
  const totalPrice = selectedTickets.reduce(
    (total, ticket) => total + ticket.price * ticket.quantity,
    0
  );
  
  // Calculate total tickets
  const totalTickets = selectedTickets.reduce(
    (total, ticket) => total + ticket.quantity,
    0
  );
  
  const bookEventMutation = useMutation({
    mutationFn: async () => {
      // Format attendee info for API
      const formattedAttendeeInfo = [];
      
      for (const ticketId in attendeeInfo) {
        const ticketType = selectedTickets.find(t => t.ticketId === Number(ticketId))?.name || '';
        
        for (const attendee of attendeeInfo[Number(ticketId)]) {
          formattedAttendeeInfo.push({
            ...attendee,
            ticketType
          });
        }
      }
      
      return eventService.bookEventTickets(
        Number(id), 
        user!.uid, 
        totalTickets, 
        formattedAttendeeInfo
      );
    },
    onSuccess: () => {
      toast.success("Compra realizada com sucesso!", {
        description: "Seus ingressos foram reservados."
      });
      navigate("/meus-ingressos");
    },
    onError: (error: any) => {
      toast.error("Erro ao comprar ingressos", {
        description: error.message || "Tente novamente mais tarde"
      });
    },
  });
  
  const handleAttendeeInfoChange = (
    ticketId: number,
    index: number,
    field: string,
    value: string
  ) => {
    setAttendeeInfo(prev => {
      const updated = { ...prev };
      updated[ticketId][index] = {
        ...updated[ticketId][index],
        [field]: value
      };
      return updated;
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate attendee information
    let isValid = true;
    const requiredFields = ['name', 'email'];
    
    for (const ticketId in attendeeInfo) {
      for (const [index, attendee] of attendeeInfo[Number(ticketId)].entries()) {
        for (const field of requiredFields) {
          if (!attendee[field as keyof typeof attendee]) {
            toast.error(`Preencha todos os campos obrigatórios para cada participante`);
            isValid = false;
            break;
          }
        }
      }
    }
    
    if (isValid) {
      bookEventMutation.mutate();
    }
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para o Evento
      </Button>
      
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-4">Informações do Evento</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-tuca-ocean-blue" />
                  <div>
                    <div className="font-medium">{event.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(event.date), "EEEE, d 'de' MMMM", { locale: ptBR })} • {event.start_time} - {event.end_time}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {event.location}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {selectedTickets.map(ticket => (
                <Card key={ticket.ticketId} className="overflow-hidden">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-medium mb-4">
                      {ticket.quantity}x {ticket.name}
                    </h2>
                    
                    {Array.from({ length: ticket.quantity }).map((_, index) => (
                      <div key={index} className="border rounded-md p-4 mb-4 last:mb-0">
                        <h3 className="text-sm font-medium mb-3">
                          Ingresso #{index + 1}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`name-${ticket.ticketId}-${index}`}>Nome Completo*</Label>
                            <Input
                              id={`name-${ticket.ticketId}-${index}`}
                              value={attendeeInfo[ticket.ticketId]?.[index]?.name || ''}
                              onChange={(e) => handleAttendeeInfoChange(ticket.ticketId, index, 'name', e.target.value)}
                              placeholder="Nome do participante"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor={`email-${ticket.ticketId}-${index}`}>Email*</Label>
                            <Input
                              id={`email-${ticket.ticketId}-${index}`}
                              type="email"
                              value={attendeeInfo[ticket.ticketId]?.[index]?.email || ''}
                              onChange={(e) => handleAttendeeInfoChange(ticket.ticketId, index, 'email', e.target.value)}
                              placeholder="email@exemplo.com"
                              required
                            />
                          </div>
                          <div className="col-span-1 sm:col-span-2">
                            <Label htmlFor={`document-${ticket.ticketId}-${index}`}>Documento (CPF/RG)</Label>
                            <Input
                              id={`document-${ticket.ticketId}-${index}`}
                              value={attendeeInfo[ticket.ticketId]?.[index]?.document || ''}
                              onChange={(e) => handleAttendeeInfoChange(ticket.ticketId, index, 'document', e.target.value)}
                              placeholder="Opcional"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-medium mb-4">Método de Pagamento</h2>
                  
                  <Tabs defaultValue="credit-card" onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="credit-card">Cartão de Crédito</TabsTrigger>
                      <TabsTrigger value="pix">PIX</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="credit-card" className="mt-4 space-y-4">
                      <div>
                        <Label htmlFor="card-name">Nome no Cartão</Label>
                        <Input id="card-name" placeholder="Nome como está no cartão" />
                      </div>
                      
                      <div>
                        <Label htmlFor="card-number">Número do Cartão</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="card-expiry">Data de Validade</Label>
                          <Input id="card-expiry" placeholder="MM/AA" />
                        </div>
                        <div>
                          <Label htmlFor="card-cvc">CVC</Label>
                          <Input id="card-cvc" placeholder="123" />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="pix" className="mt-4">
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="bg-gray-100 p-6 rounded-lg mb-4 flex items-center justify-center">
                          <QrCode className="h-32 w-32 text-tuca-ocean-blue" />
                        </div>
                        <p className="text-sm text-center mb-2">
                          Escaneie o QR code acima para pagar via PIX
                        </p>
                        <p className="text-xs text-muted-foreground text-center">
                          O pagamento será confirmado automaticamente
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <div className="flex justify-end mt-8">
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={bookEventMutation.isPending}
                >
                  {bookEventMutation.isPending ? "Processando..." : "Finalizar Compra"}
                </Button>
              </div>
            </div>
          </form>
        </div>
        
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
            <h2 className="text-lg font-medium mb-4">Resumo da Compra</h2>
            
            <div className="space-y-3">
              {selectedTickets.map(ticket => (
                <div key={ticket.ticketId} className="flex justify-between">
                  <span>
                    {ticket.quantity}x {ticket.name}
                  </span>
                  <span>R$ {(ticket.price * ticket.quantity).toFixed(2).replace('.', ',')}</span>
                </div>
              ))}
              
              <Separator />
              
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
              </div>
              
              <div className="mt-6">
                <RadioGroup defaultValue="full" className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full" id="full-payment" />
                    <Label htmlFor="full-payment">Pagamento à Vista</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="installments" id="installments" />
                    <Label htmlFor="installments">Parcelar em até 3x sem juros</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="mt-6">
                <p className="text-xs text-muted-foreground">
                  Ao finalizar a compra você concorda com os termos de uso e política de privacidade
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPurchase;
