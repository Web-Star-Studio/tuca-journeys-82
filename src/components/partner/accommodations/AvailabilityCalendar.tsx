
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

// Database Row Type (from Supabase)
// These types must match what is in the Supabase table.
type AvailabilityStatus = "available" | "booked" | "maintenance" | "blocked";

interface AccommodationAvailabilityRow {
  id: number;
  accommodation_id: number;
  date: string; // string (ISO date)
  status: AvailabilityStatus;
  custom_price: number | null;
  created_at: string;
  updated_at: string;
}

interface DayAvailability {
  date: Date;
  status: AvailabilityStatus;
  price?: number;
}

const AvailabilityCalendar = ({ accommodationId }: { accommodationId: number }) => {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedStatus, setSelectedStatus] = useState<AvailabilityStatus>("available");
  const [customPrice, setCustomPrice] = useState<string>("");

  // Fetch availability for this accommodation from table
  const { data: availability, isLoading } = useQuery({
    queryKey: ['accommodation-availability', accommodationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('accommodation_availability')
        .select('*')
        .eq('accommodation_id', accommodationId);

      if (error) throw error;

      // Map data by date for easier lookups
      const result: Record<string, DayAvailability> = {};
      (data as AccommodationAvailabilityRow[] | null)?.forEach(item => {
        const dateStr = item.date;
        result[dateStr] = {
          date: new Date(dateStr),
          status: item.status,
          price: item.custom_price ?? undefined,
        };
      });

      return result;
    },
    enabled: !!accommodationId,
  });

  // Save (insert or update) availability
  const updateAvailability = useMutation({
    mutationFn: async ({ date, status, price }: { 
      date: Date; 
      status: AvailabilityStatus;
      price?: number;
    }) => {
      const dateStr = date.toISOString().split('T')[0];

      // First check if an entry exists for this date
      const { data: entry, error: selError } = await supabase
        .from('accommodation_availability')
        .select('*')
        .eq('accommodation_id', accommodationId)
        .eq('date', dateStr)
        .maybeSingle();

      if (selError) throw selError;

      if (entry) {
        // Update
        const { error: updError } = await supabase
          .from('accommodation_availability')
          .update({
            status,
            custom_price: price === undefined ? null : price,
            updated_at: new Date().toISOString()
          })
          .eq('id', entry.id);

        if (updError) throw updError;
      } else {
        // Insert
        const { error: insError } = await supabase
          .from('accommodation_availability')
          .insert({
            accommodation_id: accommodationId,
            date: dateStr,
            status,
            custom_price: price === undefined ? null : price,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (insError) throw insError;
      }

      return { date, status, price };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['accommodation-availability', accommodationId]});
      toast.success("Disponibilidade atualizada com sucesso");
    },
    onError: (error: any) => {
      toast.error("Erro ao atualizar disponibilidade: " + (error.message ?? error.toString()));
    }
  });

  const handleUpdateAvailability = () => {
    if (!selectedDate) return;

    updateAvailability.mutate({
      date: selectedDate,
      status: selectedStatus,
      price: customPrice ? parseFloat(customPrice) : undefined
    });
  };

  // Calendar coloring for different statuses
  const getDayClass = (date: Date): string => {
    const dateStr = date.toISOString().split('T')[0];
    const dayAvailability = availability?.[dateStr];

    if (!dayAvailability) return "";

    switch (dayAvailability.status) {
      case "available":
        return "bg-green-100 hover:bg-green-200";
      case "booked":
        return "bg-red-100 hover:bg-red-200";
      case "maintenance":
        return "bg-orange-100 hover:bg-orange-200";
      case "blocked":
        return "bg-gray-200 hover:bg-gray-300";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Disponibilidade</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              booked: (date) => {
                const dateStr = date.toISOString().split('T')[0];
                return availability?.[dateStr]?.status === 'booked' || false;
              },
              maintenance: (date) => {
                const dateStr = date.toISOString().split('T')[0];
                return availability?.[dateStr]?.status === 'maintenance' || false;
              },
              blocked: (date) => {
                const dateStr = date.toISOString().split('T')[0];
                return availability?.[dateStr]?.status === 'blocked' || false;
              }
            }}
            modifiersClassNames={{
              booked: "bg-red-100",
              maintenance: "bg-orange-100",
              blocked: "bg-gray-200"
            }}
            disabled={isLoading}
            modifiersStyles={{
              booked: { backgroundColor: "#fee2e2" },
              maintenance: { backgroundColor: "#ffedd5" },
              blocked: { backgroundColor: "#e5e7eb" }
            }}
          />
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">
              {selectedDate ? selectedDate.toLocaleDateString() : 'Selecione uma data'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={selectedStatus === "available" ? "default" : "outline"}
                    className={selectedStatus === "available" ? "bg-green-500 hover:bg-green-600" : ""}
                    onClick={() => setSelectedStatus("available")}
                  >
                    Disponível
                  </Button>
                  <Button
                    type="button"
                    variant={selectedStatus === "blocked" ? "default" : "outline"}
                    className={selectedStatus === "blocked" ? "bg-gray-500 hover:bg-gray-600" : ""}
                    onClick={() => setSelectedStatus("blocked")}
                  >
                    Bloqueado
                  </Button>
                  <Button
                    type="button"
                    variant={selectedStatus === "maintenance" ? "default" : "outline"}
                    className={selectedStatus === "maintenance" ? "bg-orange-500 hover:bg-orange-600" : ""}
                    onClick={() => setSelectedStatus("maintenance")}
                  >
                    Manutenção
                  </Button>
                  <Button
                    type="button"
                    variant={selectedStatus === "booked" ? "default" : "outline"}
                    className={selectedStatus === "booked" ? "bg-red-500 hover:bg-red-600" : ""}
                    onClick={() => setSelectedStatus("booked")}
                  >
                    Reservado
                  </Button>
                </div>
              </div>
              <div>
                <label htmlFor="customPrice" className="block text-sm font-medium mb-1">
                  Preço Personalizado (opcional)
                </label>
                <div className="flex items-center">
                  <span className="mr-2">R$</span>
                  <input
                    id="customPrice"
                    type="number"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    placeholder="Preço padrão"
                    className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Deixe em branco para usar o preço padrão da hospedagem
                </p>
              </div>
              <Button 
                className="w-full"
                onClick={handleUpdateAvailability}
                disabled={updateAvailability.isPending || !selectedDate}
              >
                {updateAvailability.isPending ? "Salvando..." : "Salvar Disponibilidade"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityCalendar;
