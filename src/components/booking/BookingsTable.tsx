
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useBookings } from '@/hooks/use-bookings';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';

const BookingsTable = () => {
  const { bookings, isLoading, error, cancelBooking } = useBookings();
  
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3 p-4 border rounded-md">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex space-x-2 items-center">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 rounded-md text-red-800">
        <p>Erro ao carregar reservas. Por favor, tente novamente mais tarde.</p>
      </div>
    );
  }

  if (!bookings?.length) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-md">
        <p className="text-gray-500">Você ainda não tem reservas.</p>
        <Button 
          variant="link" 
          className="mt-2 text-tuca-ocean-blue"
          onClick={() => window.location.href = "/passeios"}
        >
          Explorar passeios
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Confirmada</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pendente</span>;
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Cancelada</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">{status}</span>;
    }
  };

  const getItemTypeName = (type: string) => {
    switch (type) {
      case 'tour':
        return 'Passeio';
      case 'accommodation':
        return 'Hospedagem';
      case 'package':
        return 'Pacote';
      default:
        return type;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reserva</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{booking.item_name}</p>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs mr-2">
                      {getItemTypeName(booking.item_type)}
                    </span>
                    <Users className="h-3 w-3 mr-1" />
                    <span className="mr-2">{booking.guests} pessoas</span>
                    {booking.tour?.meeting_point && (
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {booking.tour.meeting_point}
                      </span>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span>
                    {formatDate(booking.start_date)}
                    {booking.end_date && booking.end_date !== booking.start_date && (
                      <> - {formatDate(booking.end_date)}</>
                    )}
                  </span>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(booking.status)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.location.href = `/reserva/${booking.id}`}
                  >
                    Detalhes
                  </Button>
                  {booking.status === 'pending' && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        if (confirm("Tem certeza que deseja cancelar esta reserva?")) {
                          cancelBooking(booking.id);
                        }
                      }}
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsTable;
