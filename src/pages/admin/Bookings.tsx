
import React, { useState } from "react";
import { Search, Filter, Eye, Calendar, Home, Package } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

// Dummy bookings data
const dummyBookings = [
  {
    id: "B1234",
    user_name: "Maria Silva",
    user_email: "maria@example.com",
    item_type: "tour",
    item_name: "Mergulho em Noronha",
    start_date: "2023-09-10",
    end_date: "2023-09-10",
    guests: 2,
    total_price: 450.0,
    status: "confirmed",
    payment_status: "paid",
    created_at: "2023-08-25T14:30:00",
  },
  {
    id: "B1235",
    user_name: "João Oliveira",
    user_email: "joao@example.com",
    item_type: "accommodation",
    item_name: "Pousada Vista Mar",
    start_date: "2023-10-15",
    end_date: "2023-10-20",
    guests: 3,
    total_price: 2500.0,
    status: "pending",
    payment_status: "pending",
    created_at: "2023-08-28T09:15:00",
  },
  {
    id: "B1236",
    user_name: "Ana Santos",
    user_email: "ana@example.com",
    item_type: "package",
    item_name: "Noronha Completo",
    start_date: "2023-11-05",
    end_date: "2023-11-12",
    guests: 2,
    total_price: 5800.0,
    status: "confirmed",
    payment_status: "paid",
    created_at: "2023-08-30T16:45:00",
  },
  {
    id: "B1237",
    user_name: "Carlos Pereira",
    user_email: "carlos@example.com",
    item_type: "tour",
    item_name: "Passeio de Buggy",
    start_date: "2023-09-05",
    end_date: "2023-09-05",
    guests: 4,
    total_price: 600.0,
    status: "cancelled",
    payment_status: "refunded",
    created_at: "2023-08-20T11:30:00",
  },
];

const Bookings = () => {
  const [bookings] = useState(dummyBookings);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<typeof dummyBookings[0] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Handle booking view
  const handleViewBooking = (booking: typeof dummyBookings[0]) => {
    setSelectedBooking(booking);
    setDrawerOpen(true);
  };

  // Filter bookings based on search query and status
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.user_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.item_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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

  // Get badge color based on status
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "border-green-500 text-green-600";
      case "pending":
        return "border-yellow-500 text-yellow-600";
      case "cancelled":
        return "border-red-500 text-red-600";
      default:
        return "border-gray-500 text-gray-600";
    }
  };

  // Get payment badge color based on payment status
  const getPaymentBadgeColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout pageTitle="Gerenciar Reservas">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar reservas..."
              className="pl-10 w-full md:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="confirmed">Confirmado</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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
            {filteredBookings.map((booking) => (
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
                    onClick={() => handleViewBooking(booking)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredBookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Nenhuma reserva encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <DrawerHeader className="border-b pb-4">
            <DrawerTitle>Detalhes da Reserva</DrawerTitle>
            <DrawerDescription>Reserva #{selectedBooking?.id}</DrawerDescription>
          </DrawerHeader>
          {selectedBooking && (
            <div className="px-4 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Informações da Reserva</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground">Tipo:</span>
                      <span className="font-medium capitalize">
                        {selectedBooking.item_type === "tour" && "Passeio"}
                        {selectedBooking.item_type === "accommodation" && "Hospedagem"}
                        {selectedBooking.item_type === "package" && "Pacote"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground">Nome:</span>
                      <span className="font-medium">{selectedBooking.item_name}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground">Data de Início:</span>
                      <span>{new Date(selectedBooking.start_date).toLocaleDateString("pt-BR")}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground">Data de Término:</span>
                      <span>{new Date(selectedBooking.end_date).toLocaleDateString("pt-BR")}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground">Hóspedes:</span>
                      <span>{selectedBooking.guests}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge 
                        variant="outline" 
                        className={getStatusBadgeColor(selectedBooking.status)}
                      >
                        {selectedBooking.status === "confirmed" && "Confirmada"}
                        {selectedBooking.status === "pending" && "Pendente"}
                        {selectedBooking.status === "cancelled" && "Cancelada"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground">Criada em:</span>
                      <span>{new Date(selectedBooking.created_at).toLocaleString("pt-BR")}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Cliente</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground">Nome:</span>
                      <span className="font-medium">{selectedBooking.user_name}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{selectedBooking.user_email}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold border-b pb-2 mt-6">Pagamento</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground">Valor Total:</span>
                      <span className="font-medium">R$ {selectedBooking.total_price.toFixed(2)}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className={getPaymentBadgeColor(selectedBooking.payment_status)}>
                        {selectedBooking.payment_status === "paid" && "Pago"}
                        {selectedBooking.payment_status === "pending" && "Pendente"}
                        {selectedBooking.payment_status === "refunded" && "Reembolsado"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
    </AdminLayout>
  );
};

export default Bookings;
