
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Calendar, Clock, Users } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

interface BookingConfirmationProps {
  bookingId: string;
  serviceName: string;
  serviceType: string;
  startDate: string;
  endDate?: string;
  guests: number;
  totalPrice: number;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  bookingId,
  serviceName,
  serviceType,
  startDate,
  endDate,
  guests,
  totalPrice
}) => {
  const navigate = useNavigate();
  const { sendBookingNotification } = useNotifications();

  // Send notification on component mount
  React.useEffect(() => {
    sendBookingNotification(bookingId, serviceName);
  }, [bookingId, serviceName, sendBookingNotification]);

  // Format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getServiceTypeLabel = () => {
    switch (serviceType) {
      case 'tour':
        return 'passeio';
      case 'accommodation':
        return 'hospedagem';
      case 'event':
        return 'evento';
      case 'vehicle':
        return 'veículo';
      default:
        return 'serviço';
    }
  };

  return (
    <Card className="max-w-lg mx-auto text-center">
      <CardHeader className="pb-2">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <CardTitle className="text-2xl">Reserva Confirmada!</CardTitle>
      </CardHeader>
      
      <CardContent className="text-center space-y-4">
        <p className="text-lg">
          Sua reserva para <span className="font-medium">{serviceName}</span> foi confirmada!
        </p>
        
        <div className="mt-6 space-y-2 text-left px-4 py-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">Código da reserva</p>
          <p className="font-medium">{bookingId}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <Calendar className="h-5 w-5 text-gray-500 mb-1" />
            <p className="text-sm text-gray-500">Data de início</p>
            <p className="font-medium">{formatDate(startDate)}</p>
          </div>
          
          {endDate && endDate !== startDate && (
            <div className="flex flex-col items-center">
              <Calendar className="h-5 w-5 text-gray-500 mb-1" />
              <p className="text-sm text-gray-500">Data de término</p>
              <p className="font-medium">{formatDate(endDate)}</p>
            </div>
          )}
          
          <div className="flex flex-col items-center">
            <Users className="h-5 w-5 text-gray-500 mb-1" />
            <p className="text-sm text-gray-500">Pessoas</p>
            <p className="font-medium">{guests}</p>
          </div>
          
          <div className="flex flex-col items-center">
            <Clock className="h-5 w-5 text-gray-500 mb-1" />
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium text-green-600">Confirmada</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Valor total</p>
          <p className="text-xl font-semibold">R$ {totalPrice.toFixed(2)}</p>
        </div>
        
        <div className="text-sm text-gray-500 mt-6">
          <p>
            Enviamos um email com todos os detalhes da sua reserva.
            Você também pode acompanhar suas reservas no seu perfil.
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2">
        <Button onClick={() => navigate('/dashboard')} className="w-full">
          Ir para o Dashboard
        </Button>
        <Button variant="outline" onClick={() => navigate('/reservas')} className="w-full">
          Ver Minhas Reservas
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingConfirmation;
