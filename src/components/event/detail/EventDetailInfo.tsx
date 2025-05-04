
import React from "react";
import { Event } from "@/types/event";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Info, Share2 } from "lucide-react";

interface EventDetailInfoProps {
  event: Event;
}

const EventDetailInfo = ({ event }: EventDetailInfoProps) => {
  // Format date
  const eventDate = new Date(event.date).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
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
  );
};

export default EventDetailInfo;
