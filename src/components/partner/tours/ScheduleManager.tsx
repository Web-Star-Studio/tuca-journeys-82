
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Clock, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface TourSchedule {
  id: number;
  tour_id: number;
  date: string;
  start_time: string;
  end_time: string;
  available_spots: number;
  price_override?: number | null;
  created_at: string;
  updated_at: string;
}

interface ScheduleManagerProps {
  tourId: number;
  defaultCapacity: number;
  defaultPrice: number;
}

const ScheduleManager = ({ tourId, defaultCapacity, defaultPrice }: ScheduleManagerProps) => {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("12:00");
  const [availableSpots, setAvailableSpots] = useState(defaultCapacity);
  const [priceOverride, setPriceOverride] = useState("");

  // Query for fetching tour schedules
  const { data: schedules, isLoading } = useQuery({
    queryKey: ['tour-schedules', tourId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tour_schedules')
        .select('*')
        .eq('tour_id', tourId)
        .order('date', { ascending: true });
        
      if (error) throw error;
      
      return (data || []) as TourSchedule[];
    },
    enabled: !!tourId,
  });

  // Mutation for adding new schedule
  const addSchedule = useMutation({
    mutationFn: async (scheduleData: Omit<TourSchedule, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('tour_schedules')
        .insert(scheduleData)
        .select()
        .single();
        
      if (error) throw error;
      return data as TourSchedule;
    },
    onSuccess: () => {
      toast.success("Horário adicionado com sucesso");
      queryClient.invalidateQueries({ queryKey: ['tour-schedules', tourId] });
    },
    onError: (error) => {
      toast.error("Erro ao adicionar horário: " + error.message);
    }
  });

  // Mutation for deleting schedule
  const deleteSchedule = useMutation({
    mutationFn: async (scheduleId: number) => {
      const { error } = await supabase
        .from('tour_schedules')
        .delete()
        .eq('id', scheduleId);
        
      if (error) throw error;
      return { success: true };
    },
    onSuccess: () => {
      toast.success("Horário removido com sucesso");
      queryClient.invalidateQueries({ queryKey: ['tour-schedules', tourId] });
    },
    onError: (error) => {
      toast.error("Erro ao remover horário: " + error.message);
    }
  });

  // Add a new schedule
  const handleAddSchedule = () => {
    if (!selectedDate) {
      toast.error("Selecione uma data");
      return;
    }

    addSchedule.mutate({
      tour_id: tourId,
      date: selectedDate.toISOString().split('T')[0],
      start_time: startTime,
      end_time: endTime,
      available_spots: availableSpots,
      price_override: priceOverride ? parseFloat(priceOverride) : null
    });
  };

  // Remove a schedule
  const handleRemoveSchedule = (scheduleId: number) => {
    deleteSchedule.mutate(scheduleId);
  };

  // Group schedules by date
  const schedulesByDate = schedules?.reduce((acc, schedule) => {
    const date = schedule.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(schedule);
    return acc;
  }, {} as Record<string, TourSchedule[]>) || {};

  // Check if a date has schedules
  const dateHasSchedule = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return schedulesByDate[dateStr] !== undefined;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Adicionar horário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Data</label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  hasSchedule: dateHasSchedule
                }}
                modifiersClassNames={{
                  hasSchedule: "bg-blue-100 font-bold"
                }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium mb-1">
                  Hora de início
                </label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium mb-1">
                  Hora de término
                </label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="availableSpots" className="block text-sm font-medium mb-1">
                Vagas disponíveis
              </label>
              <Input
                id="availableSpots"
                type="number"
                min="1"
                value={availableSpots}
                onChange={(e) => setAvailableSpots(parseInt(e.target.value))}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Capacidade padrão: {defaultCapacity} pessoas
              </p>
            </div>
            
            <div>
              <label htmlFor="priceOverride" className="block text-sm font-medium mb-1">
                Preço personalizado (opcional)
              </label>
              <div className="flex items-center">
                <span className="mr-2">R$</span>
                <Input
                  id="priceOverride"
                  type="number"
                  step="0.01"
                  min="0"
                  value={priceOverride}
                  onChange={(e) => setPriceOverride(e.target.value)}
                  placeholder={`${defaultPrice.toFixed(2)}`}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Preço padrão: R$ {defaultPrice.toFixed(2)}
              </p>
            </div>
            
            <Button 
              onClick={handleAddSchedule} 
              className="w-full"
              disabled={addSchedule.isPending || !selectedDate}
            >
              {addSchedule.isPending ? "Adicionando..." : (
                <>
                  <Plus className="mr-2 h-4 w-4" /> Adicionar Horário
                </>
              )}
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Horários agendados</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-6 text-muted-foreground">
                Carregando horários...
              </div>
            ) : Object.keys(schedulesByDate).length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                Nenhum horário agendado ainda.
              </div>
            ) : (
              <div className="divide-y">
                {Object.entries(schedulesByDate)
                  .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
                  .map(([date, dateSchedules]) => (
                    <div key={date} className="py-4 first:pt-0 last:pb-0">
                      <h3 className="font-medium mb-2">
                        {new Date(date).toLocaleDateString('pt-BR', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </h3>
                      <div className="space-y-2">
                        {dateSchedules.map((schedule) => (
                          <div key={schedule.id} className="flex items-center justify-between bg-muted p-2 rounded-md">
                            <div>
                              <p className="font-medium">
                                {schedule.start_time} - {schedule.end_time}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {schedule.available_spots} vagas | 
                                R$ {schedule.price_override?.toFixed(2) || defaultPrice.toFixed(2)}
                              </p>
                            </div>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleRemoveSchedule(schedule.id)}
                              disabled={deleteSchedule.isPending}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleManager;
