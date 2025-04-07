
import React from "react";
import { useBookings } from "@/hooks/use-bookings";
import { Loader2, Calendar, Ban, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

const BookingsTable = () => {
  const { bookings, isLoading, cancelBooking } = useBookings();

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

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <Loader2 className="animate-spin h-8 w-8 mx-auto text-tuca-ocean-blue" />
        <p className="mt-2 text-gray-500">Carregando suas reservas...</p>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border">
        <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhuma reserva encontrada</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-4">
          Você ainda não possui nenhuma reserva. Que tal explorar nossas opções de passeios e hospedagens?
        </p>
        <Button 
          onClick={() => window.location.href = '/tours'}
          className="bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90"
        >
          Ver Passeios
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.item_name}</TableCell>
                <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                <TableCell>R$ {booking.price.toFixed(2)}</TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                <TableCell className="text-right space-x-2 whitespace-nowrap">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => window.open(`/booking/${booking.id}`, '_blank')}
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
                            onClick={() => cancelBooking(booking.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Confirmar Cancelamento
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BookingsTable;
