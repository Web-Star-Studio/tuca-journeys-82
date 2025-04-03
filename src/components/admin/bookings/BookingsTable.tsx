
import React from "react";
import { Eye, Calendar, Home, Package } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Booking } from "@/types/bookings";
import BookingsPagination from "./BookingsPagination";

interface BookingsTableProps {
  bookings: Booking[];
  onViewBooking: (booking: Booking) => void;
  getStatusBadgeColor: (status: string) => string;
  getPaymentBadgeColor: (status: string) => string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalBookings: number;
}

const BookingsTable = ({
  bookings,
  onViewBooking,
  getStatusBadgeColor,
  getPaymentBadgeColor,
  currentPage,
  totalPages,
  onPageChange,
  totalBookings,
}: BookingsTableProps) => {
  // Get icon based on item type
  const getItemIcon = (type: string) => {
    switch (type) {
      case "tour":
        return <Calendar className="h-4 w-4" />;
      case "accommodation":
        return <Home className="h-4 w-4" />;
      case "package":
        return <Package className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Pagamento</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.user_name}</p>
                      <p className="text-sm text-muted-foreground">{booking.user_email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full p-1 bg-tuca-light-blue/50">
                        {getItemIcon(booking.item_type)}
                      </div>
                      <span className="text-sm font-medium">{booking.item_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>
                        {new Date(booking.start_date).toLocaleDateString("pt-BR")}
                      </p>
                      {booking.start_date !== booking.end_date && (
                        <p className="text-muted-foreground">
                          até {new Date(booking.end_date).toLocaleDateString("pt-BR")}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      R$ {booking.total_price.toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {booking.guests} {booking.guests === 1 ? "pessoa" : "pessoas"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={getStatusBadgeColor(booking.status)}
                    >
                      {booking.status === "confirmed" && "Confirmada"}
                      {booking.status === "pending" && "Pendente"}
                      {booking.status === "cancelled" && "Cancelada"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPaymentBadgeColor(booking.payment_status)}>
                      {booking.payment_status === "paid" && "Pago"}
                      {booking.payment_status === "pending" && "Pendente"}
                      {booking.payment_status === "refunded" && "Reembolsado"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onViewBooking(booking)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Nenhuma reserva encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
        <div>
          {totalBookings > 0 ? (
            <p>
              Mostrando {(currentPage - 1) * 10 + 1}-
              {Math.min(currentPage * 10, totalBookings)} de {totalBookings} reservas
            </p>
          ) : (
            <p>Nenhuma reserva encontrada</p>
          )}
        </div>
        
        <BookingsPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default BookingsTable;
