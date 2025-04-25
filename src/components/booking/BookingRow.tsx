import React from "react";
import { ExternalLink, Ban, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
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
import { useNavigate } from "react-router-dom";
import { UIBooking } from "@/types";
import { useCancelBooking } from "@/hooks/use-cancel-booking";

interface BookingRowProps {
  booking: UIBooking;
  cancelBooking?: (id: string) => void;
  compact?: boolean;
}

const BookingRow: React.FC<BookingRowProps> = ({ 
  booking, 
  cancelBooking: propsCancelBooking, 
  compact = false 
}) => {
  const navigate = useNavigate();
  const { cancelBooking: hookCancelBooking, isCancelling } = useCancelBooking();
  
  // Use the cancelBooking function from props if provided, otherwise use the one from the hook
  const cancelBooking = propsCancelBooking || hookCancelBooking;
  
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
    navigate(`/bookings/${booking.id}`);
  };

  const handleCancel = () => {
    if (cancelBooking && window.confirm('Tem certeza que deseja cancelar esta reserva?')) {
      cancelBooking(booking.id);
    }
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
            onClick={() => navigate(`/bookings/${booking.id}`)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(`/bookings/${booking.id}`)}
              className="text-tuca-ocean-blue hover:text-tuca-ocean-blue hover:bg-tuca-light-blue/20"
            >
              <ExternalLink className="h-4 w-4 mr-1" /> Ver
            </Button>
            
            {booking.status !== "cancelled" && cancelBooking && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    disabled={isCancelling}
                  >
                    {isCancelling ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-1" />
                    ) : (
                      <Ban className="h-4 w-4 mr-1" />
                    )}
                    {isCancelling ? 'Cancelando...' : 'Cancelar'}
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
