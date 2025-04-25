
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TourBookingFormProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  guests: number;
  setGuests: (guests: number) => void;
  maxParticipants: number;
  price: number;
  handleSubmit: () => void;
}

export const TourBookingForm = ({
  date,
  setDate,
  guests,
  setGuests,
  maxParticipants,
  price,
  handleSubmit
}: TourBookingFormProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Data do passeio</label>
        <div className="grid gap-2">
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
          </Button>
        </div>
        <div className="mt-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            locale={ptBR}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Número de pessoas</label>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setGuests(Math.max(1, guests - 1))}
            disabled={guests <= 1}
          >
            -
          </Button>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            <span>{guests} {guests === 1 ? 'pessoa' : 'pessoas'}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setGuests(Math.min(maxParticipants, guests + 1))}
            disabled={guests >= maxParticipants}
          >
            +
          </Button>
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between mb-4">
          <span>Subtotal</span>
          <span>R$ {(price * guests).toLocaleString('pt-BR')}</span>
        </div>
        <Button 
          className="w-full" 
          size="lg"
          onClick={handleSubmit}
        >
          Confirmar reserva
        </Button>
      </div>
    </div>
  );
};
