import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Edit, Trash, Users, Calendar, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Event } from "@/types/event";

interface EventsTableProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (eventId: number) => void;
}

const getStatusColor = (status: string, date: string) => {
  const eventDate = new Date(date);
  const today = new Date();
  
  if (status === 'cancelled') return "destructive";
  
  if (eventDate < today) return "default";  // Past event
  if (status === 'ongoing') return "secondary";  // Changed from "warning" to "secondary"
  return "default";  // Changed from "success" to "default" for upcoming events
};

const getEventStatus = (event: Event): 'scheduled' | 'ongoing' | 'completed' | 'cancelled' => {
  const eventDate = new Date(event.date);
  const today = new Date();
  
  if (event.status === 'cancelled') return 'cancelled';
  if (eventDate < today) return 'completed';
  
  // Check if event is happening today
  if (eventDate.toDateString() === today.toDateString()) {
    const startTimeParts = event.start_time.split(':');
    const endTimeParts = event.end_time.split(':');
    
    const startTime = new Date(eventDate);
    startTime.setHours(parseInt(startTimeParts[0]), parseInt(startTimeParts[1]));
    
    const endTime = new Date(eventDate);
    endTime.setHours(parseInt(endTimeParts[0]), parseInt(endTimeParts[1]));
    
    if (today >= startTime && today <= endTime) {
      return 'ongoing';
    }
  }
  
  return 'scheduled';
};

const EventsTable = ({ events, onEdit, onDelete }: EventsTableProps) => {
  if (events.length === 0) {
    return (
      <div className="text-center p-8 bg-muted/40 rounded-lg">
        <h3 className="text-xl font-medium mb-2">Nenhum evento encontrado</h3>
        <p className="text-muted-foreground">Adicione novos eventos para gerenciá-los aqui.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Evento</TableHead>
            <TableHead>Data e Hora</TableHead>
            <TableHead>Local</TableHead>
            <TableHead>Disponibilidade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => {
            const status = getEventStatus(event);
            
            return (
              <TableRow key={event.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="h-12 w-12 rounded bg-cover bg-center bg-muted"
                      style={{ backgroundImage: `url(${event.image_url})` }}
                    />
                    <div>
                      <div className="font-medium">{event.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {event.category}
                        {event.featured && (
                          <Badge variant="default" className="ml-2 text-[10px] py-0">
                            Destaque
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      <span className="text-sm">
                        {format(new Date(event.date), "dd MMM yyyy", { locale: ptBR })}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      <span className="text-sm">{event.start_time} - {event.end_time}</span>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <span className="text-sm truncate max-w-[150px] block">
                    {event.location}
                  </span>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center">
                    <Users className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                    <span className="text-sm">
                      {event.available_spots} / {event.capacity}
                    </span>
                  </div>
                </TableCell>
                
                <TableCell>
                  <Badge variant={getStatusColor(status, event.date)}>
                    {status === 'scheduled' && 'Agendado'}
                    {status === 'ongoing' && 'Em andamento'}
                    {status === 'completed' && 'Finalizado'}
                    {status === 'cancelled' && 'Cancelado'}
                  </Badge>
                </TableCell>
                
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(event)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(event.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default EventsTable;
