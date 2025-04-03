
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Booking } from "@/types/bookings";

interface BookingDetailDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  booking: Booking | null;
  getStatusBadgeColor: (status: string) => string;
  getPaymentBadgeColor: (status: string) => string;
}

const BookingDetailDrawer = ({
  open,
  setOpen,
  booking,
  getStatusBadgeColor,
  getPaymentBadgeColor,
}: BookingDetailDrawerProps) => {
  if (!booking) return null;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="border-b pb-4">
          <DrawerTitle>Detalhes da Reserva</DrawerTitle>
          <DrawerDescription>Reserva #{booking.id}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Informações da Reserva</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Tipo:</span>
                  <span className="font-medium capitalize">
                    {booking.item_type === "tour" && "Passeio"}
                    {booking.item_type === "accommodation" && "Hospedagem"}
                    {booking.item_type === "package" && "Pacote"}
                  </span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Nome:</span>
                  <span className="font-medium">{booking.item_name}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Data de Início:</span>
                  <span>{new Date(booking.start_date).toLocaleDateString("pt-BR")}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Data de Término:</span>
                  <span>{new Date(booking.end_date).toLocaleDateString("pt-BR")}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Hóspedes:</span>
                  <span>{booking.guests}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge 
                    variant="outline" 
                    className={getStatusBadgeColor(booking.status)}
                  >
                    {booking.status === "confirmed" && "Confirmada"}
                    {booking.status === "pending" && "Pendente"}
                    {booking.status === "cancelled" && "Cancelada"}
                  </Badge>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Criada em:</span>
                  <span>{new Date(booking.created_at).toLocaleString("pt-BR")}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Cliente</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Nome:</span>
                  <span className="font-medium">{booking.user_name}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Email:</span>
                  <span>{booking.user_email}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold border-b pb-2 mt-6">Pagamento</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Valor Total:</span>
                  <span className="font-medium">R$ {booking.total_price.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className={getPaymentBadgeColor(booking.payment_status)}>
                    {booking.payment_status === "paid" && "Pago"}
                    {booking.payment_status === "pending" && "Pendente"}
                    {booking.payment_status === "refunded" && "Reembolsado"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter className="border-t pt-4">
          <div className="flex gap-2">
            <Button variant="outline">Alterar Status</Button>
            <Button variant="outline">Enviar Email</Button>
          </div>
          <DrawerClose asChild>
            <Button variant="outline">Fechar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default BookingDetailDrawer;
