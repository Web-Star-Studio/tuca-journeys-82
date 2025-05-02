import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, Loader2 } from "lucide-react";
import { toast } from "sonner";

import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import EventForm from "@/components/admin/events/EventForm";
import EventsTable from "@/components/admin/events/EventsTable";
import { eventService } from "@/services/event-service";
import { Event, EventFilters } from "@/types/event";

const Events = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<EventFilters>({
    searchQuery: "",
    sortBy: "date_asc",
    limit: 20
  });
  
  const queryClient = useQueryClient();
  
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['adminEvents', filters],
    queryFn: () => eventService.getEvents(filters)
  });
  
  const createEventMutation = useMutation({
    mutationFn: (eventData: Partial<Event>) => eventService.createEvent(eventData),
    onSuccess: () => {
      toast.success("Evento criado com sucesso!");
      setIsCreateModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['adminEvents'] });
    },
    onError: (err: any) => {
      toast.error("Erro ao criar evento", { 
        description: err.message || "Tente novamente mais tarde" 
      });
    }
  });
  
  const updateEventMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: Partial<Event> }) => 
      eventService.updateEvent(id, data),
    onSuccess: () => {
      toast.success("Evento atualizado com sucesso!");
      setIsEditModalOpen(false);
      setCurrentEvent(null);
      queryClient.invalidateQueries({ queryKey: ['adminEvents'] });
      queryClient.invalidateQueries({ queryKey: ['event'] }); // Invalidate single event queries as well
    },
    onError: (err: any) => {
      toast.error("Erro ao atualizar evento", { 
        description: err.message || "Tente novamente mais tarde" 
      });
    }
  });
  
  const deleteEventMutation = useMutation({
    mutationFn: (eventId: number) => eventService.deleteEvent(eventId),
    onSuccess: () => {
      toast.success("Evento excluído com sucesso!");
      queryClient.invalidateQueries({ queryKey: ['adminEvents'] });
    },
    onError: (err: any) => {
      toast.error("Erro ao excluir evento", { 
        description: err.message || "Tente novamente mais tarde" 
      });
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, searchQuery }));
  };

  const handleCreateEvent = (data: any) => {
    createEventMutation.mutate(data);
  };

  const handleEditEvent = (event: Event) => {
    setCurrentEvent(event);
    setIsEditModalOpen(true);
  };

  const handleUpdateEvent = (data: any) => {
    if (currentEvent) {
      updateEventMutation.mutate({ id: currentEvent.id, data });
    }
  };

  const handleDeleteEvent = (eventId: number) => {
    if (confirm("Tem certeza que deseja excluir este evento?")) {
      deleteEventMutation.mutate(eventId);
    }
  };

  return (
    <AdminLayout pageTitle="Gerenciar Eventos">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">Eventos</h2>
            <p className="text-sm text-muted-foreground">
              Gerencie os eventos disponíveis na plataforma
            </p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Evento
          </Button>
        </div>

        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Buscar eventos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit">
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-md">
            Erro ao carregar eventos. Por favor, tente novamente mais tarde.
          </div>
        ) : (
          <EventsTable 
            events={events || []} 
            onEdit={handleEditEvent} 
            onDelete={handleDeleteEvent}
          />
        )}
      </div>

      {/* Create Event Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Criar Novo Evento</DialogTitle>
            <DialogDescription>
              Preencha os detalhes para criar um novo evento
            </DialogDescription>
          </DialogHeader>
          <EventForm 
            onSubmit={handleCreateEvent} 
            onCancel={() => setIsCreateModalOpen(false)}
            isLoading={createEventMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Event Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Evento</DialogTitle>
            <DialogDescription>
              Atualize os detalhes do evento
            </DialogDescription>
          </DialogHeader>
          {currentEvent && (
            <EventForm 
              event={currentEvent}
              onSubmit={handleUpdateEvent} 
              onCancel={() => setIsEditModalOpen(false)}
              isLoading={updateEventMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Events;
