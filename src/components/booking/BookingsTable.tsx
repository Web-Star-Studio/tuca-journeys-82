
import React, { useMemo } from "react";
import { useUserBookings } from "@/hooks/use-bookings";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Status badge components for better reusability
const StatusBadge = ({ status }: { status: string }) => {
  const statusMap: Record<string, { color: string, label: string }> = {
    confirmed: { color: "bg-green-500", label: "Confirmado" },
    pending: { color: "bg-yellow-500", label: "Pendente" },
    canceled: { color: "bg-red-500", label: "Cancelado" },
    completed: { color: "bg-blue-500", label: "Concluído" }
  };

  const { color, label } = statusMap[status] || { color: "", label: status };
  
  return <Badge className={color}>{label}</Badge>;
};

const PaymentStatusBadge = ({ status }: { status: string }) => {
  const statusMap: Record<string, { color: string, label: string }> = {
    paid: { color: "bg-green-500", label: "Pago" },
    pending: { color: "bg-yellow-500", label: "Pendente" },
    refunded: { color: "bg-purple-500", label: "Reembolsado" },
    failed: { color: "bg-red-500", label: "Falhou" }
  };

  const { color, label } = statusMap[status] || { color: "", label: status };
  
  return <Badge className={color}>{label}</Badge>;
};

const BookingsTable = () => {
  const { user } = useAuth();
  const { data: bookings, isLoading, error } = useUserBookings();

  // Empty state component for better readability
  const EmptyState = () => (
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

  // Loading state component
  const LoadingState = () => (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="text-center py-8">
      <p className="text-red-500">Erro ao carregar reservas. Por favor, tente novamente.</p>
    </div>
  );

  // Not logged in state component
  const NotLoggedInState = () => (
    <div className="text-center py-8">
      <p className="text-muted-foreground mb-4">Você precisa estar logado para ver suas reservas.</p>
      <Link to="/login">
        <Button>Entrar</Button>
      </Link>
    </div>
  );

  // Format booking dates with memoization
  const formatBookingDate = useMemo(() => (startDate: string, endDate?: string) => {
    const start = format(new Date(startDate), "dd/MM/yyyy", { locale: ptBR });
    if (!endDate || endDate === startDate) return start;
    return `${start} - ${format(new Date(endDate), "dd/MM/yyyy", { locale: ptBR })}`;
  }, []);

  // Render based on state
  if (!user) return <NotLoggedInState />;
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!bookings || bookings.length === 0) return <EmptyState />;

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
                {formatBookingDate(booking.start_date, booking.end_date)}
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
                <StatusBadge status={booking.status} />
              </TableCell>
              <TableCell>
                <PaymentStatusBadge status={booking.payment_status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsTable;
