
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { Partner } from "@/types/partner";
import { Button } from "@/components/ui/button";

interface PartnerUpcomingBookingsProps {
  businessType?: Partner["business_type"];
}

const PartnerUpcomingBookings: React.FC<PartnerUpcomingBookingsProps> = ({ businessType }) => {
  // Generate demo data based on business type
  const generateDemoBookings = () => {
    const getBookingType = () => {
      switch (businessType) {
        case "accommodation": return "Quarto Standard";
        case "tour": return "Passeio de Barco";
        case "vehicle": return "SUV Econômico";
        case "event": return "Workshop de Fotografia";
        case "product": return "Kit Souvenirs";
        case "restaurant": return "Jantar";
        case "service": return "Massagem Relaxante";
        default: return "Reserva";
      }
    };

    // Create 3 upcoming bookings for demo
    return [
      {
        id: 1,
        customerName: "Ana Beatriz",
        date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
        time: "14:00",
        type: getBookingType(),
        status: "confirmed",
        guests: 2,
      },
      {
        id: 2,
        customerName: "Marcos Paulo",
        date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
        time: "10:30",
        type: getBookingType(),
        status: "confirmed",
        guests: 4,
      },
      {
        id: 3,
        customerName: "Camila Ferreira",
        date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
        time: "16:45",
        type: getBookingType(),
        status: "pending",
        guests: 1,
      },
    ];
  };

  const bookings = generateDemoBookings();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  if (!bookings.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhuma reserva agendada.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div 
          key={booking.id} 
          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium">{booking.customerName}</h4>
            <Badge variant={booking.status === "confirmed" ? "default" : "outline"}>
              {booking.status === "confirmed" ? "Confirmada" : "Pendente"}
            </Badge>
          </div>
          
          <div className="text-sm text-gray-500 mb-2">
            {booking.type}
          </div>
          
          <div className="text-xs text-gray-500 flex flex-wrap gap-y-1">
            <div className="flex items-center mr-3">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(booking.date)}
            </div>
            <div className="flex items-center mr-3">
              <Clock className="h-3 w-3 mr-1" />
              {booking.time}
            </div>
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              {booking.guests} {booking.guests === 1 ? "pessoa" : "pessoas"}
            </div>
          </div>
          
          <div className="mt-3 flex justify-end">
            <Button variant="outline" size="sm" className="text-xs">
              Ver detalhes
            </Button>
          </div>
        </div>
      ))}
      
      <div className="mt-2 text-center">
        <Button variant="outline" size="sm" className="text-xs w-full">
          Ver todas as reservas
        </Button>
      </div>
    </div>
  );
};

export default PartnerUpcomingBookings;
