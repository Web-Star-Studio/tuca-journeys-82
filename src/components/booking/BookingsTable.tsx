
import React from 'react';
import { useUserBookings } from '@/hooks/use-bookings';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/contexts/AuthContext';

const BookingsTable = () => {
  const { user } = useAuth();
  const { data: bookings, isLoading, error } = useUserBookings();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'refunded':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Você precisa estar logado para ver suas reservas.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Erro ao carregar suas reservas. Por favor, tente novamente.</p>
        <p className="text-sm text-gray-500 mt-2">{(error as Error).message}</p>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Você ainda não tem reservas.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>Lista de suas reservas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Reserva</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Pessoas</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Pagamento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking: any) => {
            // Determine the name of the reserved item (tour or accommodation)
            let itemName = 'Desconhecido';
            let itemType = '';
            
            if (booking.tour_id && booking.tours) {
              itemName = booking.tours.title;
              itemType = 'Passeio';
            } else if (booking.accommodation_id && booking.accommodations) {
              itemName = booking.accommodations.title;
              itemType = 'Hospedagem';
            }

            return (
              <TableRow key={booking.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{itemName}</p>
                    <p className="text-xs text-gray-500">{itemType}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {format(new Date(booking.start_date), 'PP', { locale: ptBR })}
                  {booking.end_date && booking.end_date !== booking.start_date && (
                    <> até {format(new Date(booking.end_date), 'PP', { locale: ptBR })}</>
                  )}
                </TableCell>
                <TableCell>{booking.guests}</TableCell>
                <TableCell>
                  R$ {parseFloat(booking.total_price).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(booking.status)} border`}>
                    {booking.status === 'confirmed' && 'Confirmada'}
                    {booking.status === 'pending' && 'Pendente'}
                    {booking.status === 'cancelled' && 'Cancelada'}
                    {booking.status === 'completed' && 'Concluída'}
                    {!['confirmed', 'pending', 'cancelled', 'completed'].includes(booking.status) && booking.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={`${getPaymentStatusColor(booking.payment_status)} border`}>
                    {booking.payment_status === 'paid' && 'Pago'}
                    {booking.payment_status === 'pending' && 'Pendente'}
                    {booking.payment_status === 'refunded' && 'Reembolsado'}
                    {booking.payment_status === 'failed' && 'Falhou'}
                    {!['paid', 'pending', 'refunded', 'failed'].includes(booking.payment_status) && booking.payment_status}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsTable;
