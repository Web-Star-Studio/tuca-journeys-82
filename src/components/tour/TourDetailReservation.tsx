
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Users, Star } from "lucide-react";
import { Tour } from "@/types/database";
import { useToast } from "@/hooks/use-toast";
import { useCreateBooking } from "@/hooks/use-create-booking";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface TourDetailReservationProps {
  tour: Tour;
}

const TourDetailReservation = ({ tour }: TourDetailReservationProps) => {
  const [participants, setParticipants] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();
  const createBookingMutation = useCreateBooking();
  const navigate = useNavigate();

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) {
      toast({
        title: "Atenção",
        description: "Por favor, selecione uma data para o passeio.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Autenticação necessária",
        description: "Você precisa estar logado para fazer uma reserva.",
        variant: "destructive",
      });
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    // Calculate total price
    const totalPrice = tour.price * participants;

    try {
      await createBookingMutation.mutateAsync({
        user_id: user.id,
        tour_id: tour.id,
        accommodation_id: undefined,
        start_date: selectedDate,
        end_date: selectedDate, // For tours, start and end date are the same
        number_of_guests: participants,
        guests: participants,
        total_price: totalPrice,
        status: 'pending',
        payment_status: 'pending',
        payment_method: undefined,
        special_requests: undefined
      });

      navigate("/reserva-confirmada");
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h3 className="text-xl font-serif font-bold mb-4">Reserve este passeio</h3>
      <div className="flex items-center justify-between mb-6 bg-gray-50 p-4 rounded">
        <div>
          <span className="text-gray-500 text-sm">Preço por pessoa</span>
          <div className="text-2xl font-bold text-gray-900">
            R$ {tour.price.toLocaleString('pt-BR')}
          </div>
        </div>
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-500" />
          <span className="ml-1 font-medium">{tour.rating}</span>
        </div>
      </div>

      <form onSubmit={handleReservation}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="date">Data do passeio</Label>
            <Input 
              id="date" 
              type="date" 
              min={new Date().toISOString().split('T')[0]}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required 
            />
          </div>
          <div>
            <Label htmlFor="participants">Quantidade de pessoas</Label>
            <div className="flex items-center space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => setParticipants(Math.max(tour.min_participants, participants - 1))}
              >
                -
              </Button>
              <div className="flex-1 text-center">
                <Input 
                  id="participants" 
                  type="number" 
                  min={tour.min_participants} 
                  max={tour.max_participants}
                  value={participants} 
                  onChange={(e) => setParticipants(Number(e.target.value))}
                  className="text-center" 
                />
              </div>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => setParticipants(Math.min(tour.max_participants, participants + 1))}
              >
                +
              </Button>
            </div>
            <div className="mt-1 text-sm text-gray-500 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>Máximo de {tour.max_participants} pessoas</span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded space-y-2">
            <div className="flex justify-between">
              <span>Preço unitário</span>
              <span>R$ {tour.price.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex justify-between">
              <span>Número de pessoas</span>
              <span>{participants}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>R$ {(tour.price * participants).toLocaleString('pt-BR')}</span>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-tuca-coral hover:bg-tuca-coral/90 text-white"
            disabled={createBookingMutation.isPending}
          >
            {createBookingMutation.isPending ? "Processando..." : "Reservar agora"}
          </Button>
        </div>
      </form>

      <div className="mt-4 text-center text-sm text-gray-500">
        Sem compromisso - Cancelamento gratuito até 48h antes
      </div>
    </div>
  );
};

export default TourDetailReservation;
