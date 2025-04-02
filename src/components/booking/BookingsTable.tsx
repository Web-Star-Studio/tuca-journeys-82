
import React from "react";
import { useUserBookings } from "@/hooks/use-bookings";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BookingsTable = () => {
  const { user } = useAuth();
  const { data: bookings, isLoading, error } = useUserBookings();

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">Você precisa estar logado para ver suas reservas.</p>
        <Link to="/login">
          <Button>Entrar</Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Erro ao carregar reservas. Por favor, tente novamente.</p>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Você ainda não tem reservas.</p>
        <div className="mt-4">
          <Link to="/passeios">
            <Button className="mr-2">Ver passeios</Button>
          </Link>
          <Link to="/hospedagens">
            <Button variant="outline">Ver hospedagens</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500">Confirmado</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case 'canceled':
        return <Badge className="bg-red-500">Cancelado</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Concluído</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Pago</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case 'refunded':
        return <Badge className="bg-purple-500">Reembolsado</Badge>;
      case 'failed':
        return <Badge className="bg-red-500">Falhou</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reserva</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Pagamento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking: any) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">
                #{booking.id.toString().padStart(6, '0')}
              </TableCell>
              <TableCell>
                {format(new Date(booking.start_date), "dd/MM/yyyy", { locale: ptBR })}
                {booking.end_date !== booking.start_date && (
                  <> - {format(new Date(booking.end_date), "dd/MM/yyyy", { locale: ptBR })}</>
                )}
              </TableCell>
              <TableCell>
                {booking.tours ? (
                  <span>Passeio: {booking.tours.title}</span>
                ) : booking.accommodations ? (
                  <span>Hospedagem: {booking.accommodations.title}</span>
                ) : (
                  <span>Reserva</span>
                )}
                <div className="text-xs text-muted-foreground">
                  {booking.guests} {booking.guests > 1 ? 'pessoas' : 'pessoa'}
                </div>
              </TableCell>
              <TableCell>
                R$ {booking.total_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </TableCell>
              <TableCell>
                {getStatusBadge(booking.status)}
              </TableCell>
              <TableCell>
                {getPaymentStatusBadge(booking.payment_status)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsTable;
