
import React, { useState } from "react";
import { Minus, Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";

export interface EventTicket {
  id: number;
  name: string;
  description?: string;
  price: number;
  available_quantity: number;
  max_per_order: number;
  type: 'regular' | 'vip' | 'discount' | 'free';
  benefits?: string[];
}

export interface SelectedTicket {
  ticketId: number;
  quantity: number;
  price: number;
  name: string;
}

interface EventTicketSelectorProps {
  eventName: string;
  eventDate: string;
  location: string;
  tickets: EventTicket[];
  onTicketSelect: (selected: SelectedTicket[]) => void;
}

const EventTicketSelector = ({
  eventName,
  eventDate,
  location,
  tickets,
  onTicketSelect,
}: EventTicketSelectorProps) => {
  const [selectedTickets, setSelectedTickets] = useState<{ [key: number]: number }>(
    tickets.reduce((acc, ticket) => ({ ...acc, [ticket.id]: 0 }), {})
  );

  const handleQuantityChange = (ticketId: number, change: number) => {
    setSelectedTickets((prev) => {
      const ticket = tickets.find((t) => t.id === ticketId);
      if (!ticket) return prev;
      
      const currentQuantity = prev[ticketId] || 0;
      const newQuantity = Math.max(0, Math.min(currentQuantity + change, ticket.max_per_order, ticket.available_quantity));
      
      const updated = { ...prev, [ticketId]: newQuantity };
      
      // Notify parent component about changes
      const selectedTicketsArray = Object.entries(updated)
        .filter(([_, quantity]) => quantity > 0)
        .map(([id, quantity]) => {
          const ticket = tickets.find((t) => t.id === Number(id))!;
          return {
            ticketId: Number(id),
            quantity,
            price: ticket.price,
            name: ticket.name,
          };
        });
      
      onTicketSelect(selectedTicketsArray);
      
      return updated;
    });
  };

  const getTotalPrice = () => {
    return Object.entries(selectedTickets).reduce((total, [id, quantity]) => {
      const ticket = tickets.find((t) => t.id === Number(id));
      return total + (ticket ? ticket.price * quantity : 0);
    }, 0);
  };

  const getTicketCount = () => {
    return Object.values(selectedTickets).reduce((total, quantity) => total + quantity, 0);
  };

  const getTicketTypeColor = (type: string) => {
    switch (type) {
      case 'vip': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'discount': return 'bg-green-100 text-green-800 border-green-300';
      case 'free': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/30 p-4 rounded-lg">
        <h3 className="font-medium">Resumo do Evento</h3>
        <div className="mt-2 space-y-1 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Evento:</span>
            <span className="font-medium">{eventName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Data:</span>
            <span>
              {format(new Date(eventDate), "dd/MM/yyyy")}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Local:</span>
            <span>{location}</span>
          </div>
        </div>
      </div>

      <h3 className="font-medium text-lg">Selecione seus ingressos</h3>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <h4 className="font-medium">{ticket.name}</h4>
                    <Badge 
                      variant="outline" 
                      className={`ml-2 ${getTicketTypeColor(ticket.type)}`}
                    >
                      {ticket.type === 'regular' && 'Regular'}
                      {ticket.type === 'vip' && 'VIP'}
                      {ticket.type === 'discount' && 'Desconto'}
                      {ticket.type === 'free' && 'Gratuito'}
                    </Badge>
                  </div>
                  {ticket.description && (
                    <p className="text-sm text-muted-foreground">
                      {ticket.description}
                    </p>
                  )}
                  
                  {ticket.benefits && ticket.benefits.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Inclui:
                      </p>
                      <ul className="text-xs space-y-1">
                        {ticket.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-tuca-ocean-blue mr-1.5">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="text-right">
                  <div className="font-bold">
                    {ticket.price === 0 
                      ? "Gratuito" 
                      : `R$ ${ticket.price.toFixed(2).replace('.', ',')}`
                    }
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {ticket.available_quantity <= 10 && ticket.available_quantity > 0 && (
                      <span className="text-amber-600 font-medium">
                        Apenas {ticket.available_quantity} restantes
                      </span>
                    )}
                    {ticket.available_quantity === 0 && (
                      <span className="text-red-600 font-medium">
                        Esgotado
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-xs text-muted-foreground flex items-center">
                  <span>Limite de {ticket.max_per_order} por pedido</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3 w-3 ml-1" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Máximo de {ticket.max_per_order} ingressos por compra</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleQuantityChange(ticket.id, -1)}
                    disabled={selectedTickets[ticket.id] <= 0 || ticket.available_quantity <= 0}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  
                  <span className="w-8 text-center">
                    {selectedTickets[ticket.id] || 0}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleQuantityChange(ticket.id, 1)}
                    disabled={
                      (selectedTickets[ticket.id] || 0) >= ticket.max_per_order ||
                      (selectedTickets[ticket.id] || 0) >= ticket.available_quantity ||
                      ticket.available_quantity <= 0
                    }
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {getTicketCount() > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <h4 className="font-medium">Resumo do pedido</h4>
              
              {Object.entries(selectedTickets)
                .filter(([_, quantity]) => quantity > 0)
                .map(([id, quantity]) => {
                  const ticket = tickets.find((t) => t.id === Number(id))!;
                  return (
                    <div key={id} className="flex justify-between text-sm">
                      <span>
                        {quantity}x {ticket.name}
                      </span>
                      <span>
                        R$ {(ticket.price * quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  );
                })}
              
              <Separator />
              
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>R$ {getTotalPrice().toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 p-4">
            <Button className="w-full" size="lg">
              Continuar para Pagamento
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default EventTicketSelector;
