
import React from "react";
import { ExternalLink, Ban, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface BookingRowProps {
  booking: {
    id: string;
    item_name: string;
    start_date?: string;
    total_price?: number;
    status: string;
  };
  cancelBooking: (id: string) => void;
  compact?: boolean;
}

const BookingRow = ({ booking, cancelBooking, compact = false }: BookingRowProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmada</Badge>;
      case "pending":
        return <Badge className="bg-amber-500">Pendente</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelada</Badge>;
      default:
        return <Badge className="bg-gray-500">Desconhecido</Badge>;
    }
  };

  const handleViewBooking = () => {
    window.open(`/booking/${booking.id}`, '_blank');
  };

  const handleCancel = () => {
    cancelBooking(booking.id);
    toast.success('Reserva cancelada com sucesso');
  };

  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell className="font-medium">{booking.item_name}</TableCell>
      <TableCell>
        {booking.start_date ? new Date(booking.start_date).toLocaleDateString() : 'Data não disponível'}
      </TableCell>
      {!compact && (
        <TableCell>
          {typeof booking.total_price === 'number' 
            ? `R$ ${booking.total_price.toFixed(2)}` 
            : 'Valor não disponível'}
        </TableCell>
      )}
      <TableCell>{getStatusBadge(booking.status)}</TableCell>
      <TableCell className="text-right space-x-1 sm:space-x-2 whitespace-nowrap">
        {compact ? (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleViewBooking}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleViewBooking}
              className="text-tuca-ocean-blue hover:text-tuca-ocean-blue hover:bg-tuca-light-blue/20"
            >
              <ExternalLink className="h-4 w-4 mr-1" /> Ver
            </Button>
            
            {booking.status !== "cancelled" && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Ban className="h-4 w-4 mr-1" /> Cancelar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar cancelamento</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja cancelar esta reserva? Esta ação não poderá ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Voltar</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleCancel}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Confirmar Cancelamento
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default BookingRow;
