
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Star, Users } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { format, addDays, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { CreateBookingDTO } from "@/types/bookings";
import { bookingService } from "@/services/booking-service";
import { useAuth } from "@/contexts/AuthContext";

interface AccommodationDetailSidebarProps {
  accommodation: any;
}

const AccommodationDetailSidebar = ({ accommodation }: AccommodationDetailSidebarProps) => {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckInDate(date);
    // If check-out date is before check-in date, reset it
    if (checkOutDate && date && checkOutDate < date) {
      setCheckOutDate(undefined);
    }
  };

  const handleCheckOutSelect = (date: Date | undefined) => {
    setCheckOutDate(date);
  };

  const incrementGuests = () => {
    if (guestCount < accommodation.max_guests || accommodation.capacity) {
      setGuestCount(guestCount + 1);
    } else {
      toast({
        title: "Limite de hóspedes",
        description: `Esta acomodação comporta no máximo ${accommodation.max_guests || accommodation.capacity} hóspedes.`,
        variant: "destructive",
      });
    }
  };

  const decrementGuests = () => {
    if (guestCount > 1) {
      setGuestCount(guestCount - 1);
    }
  };

  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const nights = differenceInDays(checkOutDate, checkInDate);
    return accommodation.price_per_night 
      ? accommodation.price_per_night * nights 
      : accommodation.price * nights;
  };

  const handleBookNow = async () => {
    if (!user) {
      toast({
        title: "Você precisa estar logado",
        description: "Faça login para continuar com a reserva",
        variant: "destructive",
      });
      navigate("/login", { 
        state: { 
          redirectTo: window.location.pathname,
          bookingIntent: {
            type: "accommodation",
            id: accommodation.id,
            checkInDate,
            checkOutDate,
            guestCount
          }
        } 
      });
      return;
    }

    if (!checkInDate || !checkOutDate) {
      toast({
        title: "Datas não selecionadas",
        description: "Por favor, selecione as datas de check-in e check-out",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      const totalPrice = calculateTotalPrice();
      const bookingData: CreateBookingDTO = {
        user_id: user.id, // Changed from user.uid to user.id
        accommodation_id: accommodation.id,
        start_date: checkInDate.toISOString(),
        end_date: checkOutDate.toISOString(),
        guests: guestCount,
        total_price: totalPrice,
        status: 'pending',
        payment_status: 'pending',
        special_requests: ''
      };

      const booking = await bookingService.createBooking(bookingData);
      
      toast({
        title: "Reserva feita com sucesso!",
        description: "Sua reserva foi registrada. Verifique sua página de reservas.",
      });

      // Redirect to booking confirmation or booking list
      navigate("/bookings");
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({
        title: "Erro ao fazer reserva",
        description: "Não foi possível completar sua reserva. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const price = accommodation.price_per_night || accommodation.price;
  const nights = checkInDate && checkOutDate ? differenceInDays(checkOutDate, checkInDate) : 5;
  const totalNights = price * nights;
  const cleaningFee = 150;
  const serviceFee = 200;
  const total = totalNights + cleaningFee + serviceFee;

  return (
    <div className="md:col-span-1">
      <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold">
              R$ {price.toLocaleString('pt-BR')}
            </h3>
            <p className="text-gray-500 text-sm">por noite</p>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="font-medium">{accommodation.rating}</span>
          </div>
        </div>

        <div className="border rounded-lg p-4 mb-6">
          <h4 className="font-medium mb-4">Selecione as datas</h4>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Popover>
              <PopoverTrigger asChild>
                <div className="border rounded p-2 text-sm cursor-pointer">
                  <p className="text-gray-500">Check-in</p>
                  <p>{checkInDate ? format(checkInDate, 'dd/MM/yyyy') : 'Selecione'}</p>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarUI
                  mode="single"
                  selected={checkInDate}
                  onSelect={handleCheckInSelect}
                  disabled={(date) => date < new Date()}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <div className="border rounded p-2 text-sm cursor-pointer">
                  <p className="text-gray-500">Check-out</p>
                  <p>{checkOutDate ? format(checkOutDate, 'dd/MM/yyyy') : 'Selecione'}</p>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarUI
                  mode="single"
                  selected={checkOutDate}
                  onSelect={handleCheckOutSelect}
                  disabled={(date) => date < (checkInDate || new Date())}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="border rounded p-2 text-sm mb-4">
            <p className="text-gray-500">Hóspedes</p>
            <div className="flex items-center justify-between">
              <p>{guestCount} hóspede{guestCount > 1 ? 's' : ''}</p>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-7 w-7 rounded-full" 
                  onClick={decrementGuests}
                  disabled={guestCount <= 1}
                >
                  -
                </Button>
                <span className="mx-2">{guestCount}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-7 w-7 rounded-full" 
                  onClick={incrementGuests}
                  disabled={guestCount >= (accommodation.max_guests || accommodation.capacity || 10)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <p>R$ {price.toLocaleString('pt-BR')} x {nights} noites</p>
            <p>R$ {totalNights.toLocaleString('pt-BR')}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Taxa de limpeza</p>
            <p>R$ {cleaningFee}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Taxa de serviço</p>
            <p>R$ {serviceFee}</p>
          </div>
          <div className="border-t pt-4 mt-4 flex justify-between font-bold">
            <p>Total</p>
            <p>R$ {total.toLocaleString('pt-BR')}</p>
          </div>
        </div>

        <Button 
          className="w-full bg-tuca-ocean-blue hover:bg-tuca-deep-blue text-white flex items-center justify-center gap-2 mb-4"
          onClick={handleBookNow}
          disabled={isLoading || !checkInDate || !checkOutDate}
        >
          {isLoading ? (
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
          ) : (
            <Calendar className="h-4 w-4" />
          )}
          Reservar agora
        </Button>
        
        <p className="text-sm text-center text-gray-500">
          Você não será cobrado ainda
        </p>
      </div>
    </div>
  );
};

export default AccommodationDetailSidebar;

