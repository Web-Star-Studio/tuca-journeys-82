
import React, { useState } from 'react';
import { format, isSameDay, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ChevronLeft, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRestaurantReservations } from '@/hooks/use-restaurants';
import type { RestaurantReservation } from '@/types/restaurant';

interface ReservationCalendarProps {
  onDateSelect: (date: Date) => void;
}

const ReservationCalendar: React.FC<ReservationCalendarProps> = ({ onDateSelect }) => {
  const { id } = useParams<{ id: string }>();
  const restaurantId = id ? parseInt(id) : 0;
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { reservations, isLoading } = useRestaurantReservations(restaurantId);
  const navigate = useNavigate();

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      onDateSelect(newDate);
    }
  };

  // Get counts of reservations by date
  const getReservationsByDate = () => {
    if (!reservations) return {};
    
    return reservations.reduce((acc: Record<string, number>, reservation) => {
      const dateStr = reservation.reservation_date;
      if (dateStr) {
        if (!acc[dateStr]) {
          acc[dateStr] = 0;
        }
        acc[dateStr]++;
      }
      return acc;
    }, {});
  };
  
  const reservationsByDate = getReservationsByDate();

  return (
    <Card className="p-4 overflow-hidden">
      <div className="mb-4 space-y-3">
        <h3 className="font-medium text-lg">Calendário de Reservas</h3>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(`/admin/restaurants/${restaurantId}/reservations/novo`)}
          >
            Nova Reserva
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDateChange}
        className="rounded-md border"
        classNames={{
          nav_button_previous: "bg-transparent text-black hover:bg-gray-100",
          nav_button_next: "bg-transparent text-black hover:bg-gray-100",
          caption: "text-lg font-medium",
          day: "h-10 w-10",
        }}
        locale={ptBR}
        modifiers={{
          highlighted: (date) => {
            const formattedDate = format(date, 'yyyy-MM-dd');
            return !!reservationsByDate[formattedDate];
          }
        }}
        modifiersClassNames={{
          highlighted: "bg-blue-100 font-bold relative reservation-day",
        }}
        components={{
          DayContent: (props) => {
            // Fixed: Correctly access the day from props
            const dayDate = props.date;
            const formattedDate = format(dayDate, 'yyyy-MM-dd');
            const count = reservationsByDate[formattedDate] || 0;
            
            return (
              <div className="relative h-full w-full flex items-center justify-center">
                <span>{dayDate.getDate()}</span>
                {count > 0 && (
                  <span className="absolute bottom-0.5 text-[9px] text-blue-700">
                    {count} reserv.
                  </span>
                )}
              </div>
            );
          }
        }}
      />
    </Card>
  );
};

export default ReservationCalendar;
