
import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Check } from "lucide-react";

interface AvailabilityCalendarProps {
  accommodationId: number;
}

interface Availability {
  date: Date;
  status: "available" | "unavailable" | "booked";
  customPrice: number | null;
}

const AvailabilityCalendar = ({ accommodationId }: AvailabilityCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availabilityData, setAvailabilityData] = useState<Record<string, Availability>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [customPrice, setCustomPrice] = useState<string>("");
  const [status, setStatus] = useState<"available" | "unavailable">("available");
  const { toast } = useToast();

  // Load availability data
  useEffect(() => {
    const fetchAvailability = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("accommodation_availability")
          .select("*")
          .eq("accommodation_id", accommodationId);

        if (error) throw error;

        const availabilityMap: Record<string, Availability> = {};
        
        data?.forEach((item) => {
          const dateString = new Date(item.date).toISOString().split("T")[0];
          availabilityMap[dateString] = {
            date: new Date(item.date),
            status: item.status,
            customPrice: item.custom_price,
          };
        });

        setAvailabilityData(availabilityMap);
      } catch (error) {
        console.error("Error loading availability:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados de disponibilidade.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailability();
  }, [accommodationId, toast]);

  // Save availability for a date
  const saveAvailability = async () => {
    if (!selectedDate) return;

    setIsSaving(true);
    const dateString = selectedDate.toISOString().split("T")[0];

    try {
      // Check if date already exists in the database
      const { data: existingData } = await supabase
        .from("accommodation_availability")
        .select("id")
        .eq("accommodation_id", accommodationId)
        .eq("date", dateString)
        .single();

      const customPriceValue = customPrice ? parseFloat(customPrice) : null;

      if (existingData) {
        // Update existing record
        const { error } = await supabase
          .from("accommodation_availability")
          .update({
            status,
            custom_price: customPriceValue,
          })
          .eq("id", existingData.id);

        if (error) throw error;
      } else {
        // Insert new record
        const { error } = await supabase
          .from("accommodation_availability")
          .insert({
            accommodation_id: accommodationId,
            date: dateString,
            status,
            custom_price: customPriceValue,
          });

        if (error) throw error;
      }

      // Update local state
      setAvailabilityData({
        ...availabilityData,
        [dateString]: {
          date: selectedDate,
          status,
          customPrice: customPriceValue,
        },
      });

      toast({
        title: "Sucesso",
        description: "Disponibilidade atualizada com sucesso.",
      });
    } catch (error) {
      console.error("Error saving availability:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar a disponibilidade.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const dateString = date.toISOString().split("T")[0];
      const dateData = availabilityData[dateString];
      if (dateData) {
        setStatus(dateData.status);
        setCustomPrice(dateData.customPrice ? String(dateData.customPrice) : "");
      } else {
        setStatus("available");
        setCustomPrice("");
      }
    }
  };

  // Custom day rendering for the calendar
  const renderDay = (day: Date) => {
    const dateString = day.toISOString().split("T")[0];
    const dateData = availabilityData[dateString];

    let className = "";
    if (dateData) {
      className = dateData.status === "available" 
        ? "bg-green-100 hover:bg-green-200" 
        : "bg-red-100 hover:bg-red-200";
      
      if (dateData.customPrice) {
        className += " font-bold border-2 border-blue-300";
      }
    }

    return <div className={`w-full h-full ${className}`}>{day.getDate()}</div>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calendário de Disponibilidade</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                  components={{
                    Day: ({ day, ...props }) => (
                      <div {...props}>
                        {renderDay(day)}
                      </div>
                    ),
                  }}
                />
              </div>

              <div className="space-y-4 border rounded-md p-4">
                <h3 className="font-medium">
                  {selectedDate
                    ? `Configurar: ${selectedDate.toLocaleDateString('pt-BR')}`
                    : "Selecione uma data"}
                </h3>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={status}
                      onValueChange={(value) =>
                        setStatus(value as "available" | "unavailable")
                      }
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Disponível</SelectItem>
                        <SelectItem value="unavailable">Indisponível</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="custom-price">Preço personalizado (opcional)</Label>
                    <Input
                      id="custom-price"
                      type="number"
                      placeholder="Deixe vazio para usar o preço padrão"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Deixe vazio para usar o preço padrão da hospedagem.
                    </p>
                  </div>

                  <Button 
                    onClick={saveAvailability}
                    disabled={!selectedDate || isSaving}
                    className="w-full"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Salvar disponibilidade
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 rounded"></div>
          <span>Disponível</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 rounded"></div>
          <span>Indisponível</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-blue-300 rounded"></div>
          <span>Preço personalizado</span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
