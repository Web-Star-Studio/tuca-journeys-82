
import React from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { 
  MoreHorizontal, 
  Check, 
  X, 
  Clock,
  Info,
  Phone,
  Mail
} from 'lucide-react';
import type { RestaurantReservation } from '@/types/restaurant';

interface ReservationListProps {
  reservations: RestaurantReservation[];
  isLoading: boolean;
  onStatusChange: (id: number, status: string) => void;
  onViewDetails: (reservation: RestaurantReservation) => void;
}

const ReservationList: React.FC<ReservationListProps> = ({
  reservations,
  isLoading,
  onStatusChange,
  onViewDetails
}) => {
  if (isLoading) {
    return <div className="text-center py-8">Carregando reservas...</div>;
  }

  if (reservations.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/20 rounded-lg">
        <p className="text-muted-foreground mb-2">Nenhuma reserva encontrada</p>
        <p className="text-sm text-muted-foreground">
          Não há reservas para o período selecionado
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Data e Hora</TableHead>
          <TableHead className="text-center">Pessoas</TableHead>
          <TableHead>Mesa</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Contato</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.map((reservation) => (
          <TableRow key={reservation.id}>
            <TableCell className="font-medium">
              {reservation.contact_email.split('@')[0]}
            </TableCell>
            <TableCell>
              {format(parseISO(reservation.reservation_date), 'dd/MM/yyyy', { locale: ptBR })}
              <br />
              <span className="text-muted-foreground">
                {reservation.reservation_time}
              </span>
            </TableCell>
            <TableCell className="text-center">{reservation.guests}</TableCell>
            <TableCell>
              {reservation.restaurant_table_id || '-'}
            </TableCell>
            <TableCell>
              <ReservationStatusBadge status={reservation.status} />
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Phone className="h-3 w-3" />
                <span className="text-xs">{formatPhone(reservation.contact_phone)}</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onViewDetails(reservation)}>
                    <Info className="mr-2 h-4 w-4" />
                    Detalhes
                  </DropdownMenuItem>
                  {reservation.status === 'pending' && (
                    <DropdownMenuItem onClick={() => onStatusChange(reservation.id, 'confirmed')}>
                      <Check className="mr-2 h-4 w-4" />
                      Confirmar Reserva
                    </DropdownMenuItem>
                  )}
                  {(reservation.status === 'pending' || reservation.status === 'confirmed') && (
                    <DropdownMenuItem onClick={() => onStatusChange(reservation.id, 'completed')}>
                      <Check className="mr-2 h-4 w-4 text-green-600" />
                      Marcar como Concluída
                    </DropdownMenuItem>
                  )}
                  {['pending', 'confirmed'].includes(reservation.status) && (
                    <DropdownMenuItem onClick={() => onStatusChange(reservation.id, 'cancelled')}>
                      <X className="mr-2 h-4 w-4 text-red-600" />
                      Cancelar Reserva
                    </DropdownMenuItem>
                  )}
                  {['pending', 'confirmed'].includes(reservation.status) && (
                    <DropdownMenuItem onClick={() => onStatusChange(reservation.id, 'no_show')}>
                      <Clock className="mr-2 h-4 w-4 text-amber-600" />
                      Marcar como No-show
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const ReservationStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'confirmed':
      return <Badge className="bg-green-600">Confirmada</Badge>;
    case 'completed':
      return <Badge className="bg-blue-600">Concluída</Badge>;
    case 'cancelled':
      return <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">Cancelada</Badge>;
    case 'no_show':
      return <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">No-show</Badge>;
    case 'pending':
    default:
      return <Badge variant="secondary" className="bg-amber-600">Pendente</Badge>;
  }
};

const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`;
  }
  if (cleaned.length === 10) {
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6)}`;
  }
  return phone;
};

export default ReservationList;
