
import React, { useState } from "react";
import PartnerLayout from "@/components/partner/PartnerLayout";
import { useCurrentPartner } from "@/hooks/use-partner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Filter, Search, Trash2, Edit, Eye, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const PartnerBookings: React.FC = () => {
  const { data: partner } = useCurrentPartner();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Generate demo bookings data
  const generateDemoBookings = () => {
    const getItemName = () => {
      if (!partner?.business_type) return "Produto";
      
      switch (partner.business_type) {
        case "accommodation": return "Quarto Standard";
        case "tour": return "Passeio de Barco";
        case "vehicle": return "SUV Econômico";
        case "event": return "Workshop de Fotografia";
        case "product": return "Kit Souvenirs";
        case "restaurant": return "Mesa para 4";
        case "service": return "Massagem Relaxante";
        default: return "Produto";
      }
    };

    // Generate 10 bookings with different statuses and dates
    const statuses = ["confirmed", "pending", "cancelled"];
    const now = new Date();
    
    return Array.from({ length: 10 }, (_, i) => {
      // Random date within last 30 days
      const randomDaysOffset = Math.floor(Math.random() * 30);
      const date = new Date();
      date.setDate(now.getDate() - randomDaysOffset);
      
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      return {
        id: i + 1,
        customerName: `Cliente ${i + 1}`,
        itemName: getItemName(),
        bookingDate: date,
        startDate: new Date(date.getTime() + 1000 * 60 * 60 * 24 * 7),  // 7 days after booking
        endDate: new Date(date.getTime() + 1000 * 60 * 60 * 24 * 10),  // 10 days after booking
        status,
        totalAmount: Math.floor(Math.random() * 500) + 100, // Random amount between 100-599
        guests: Math.floor(Math.random() * 5) + 1, // Random number of guests between 1-5
      };
    });
  };

  const bookings = generateDemoBookings();

  // Filter bookings based on search query and status filter
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         booking.itemName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    
    const matchesDate = dateFilter === "all" || 
      (dateFilter === "upcoming" && booking.startDate >= new Date()) ||
      (dateFilter === "past" && booking.endDate < new Date());
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmada</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pendente</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelada</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <PartnerLayout pageTitle="Minhas Reservas">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Reservas</CardTitle>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar reservas..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="w-40">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="confirmed">Confirmadas</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="cancelled">Canceladas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-40">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Datas</SelectItem>
                  <SelectItem value="upcoming">Futuras</SelectItem>
                  <SelectItem value="past">Passadas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredBookings.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>{booking.customerName}</TableCell>
                      <TableCell>{booking.itemName}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Reserva: {formatDate(booking.bookingDate)}</span>
                          <span className="text-xs">
                            {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell>R$ {booking.totalAmount.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Nenhuma reserva encontrada</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Não encontramos reservas que correspondam aos seus filtros de pesquisa.
                Tente ajustar seus filtros ou criar uma nova reserva.
              </p>
              <Button className="mt-4">
                Criar Reserva
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </PartnerLayout>
  );
};

export default PartnerBookings;
