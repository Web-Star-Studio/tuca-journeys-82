
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarDays, Mail, MapPin, Loader2 } from "lucide-react";
import { useCustomers } from "@/hooks/use-customers";

const PartnerCustomersTable = () => {
  const { data: customers, isLoading } = useCustomers();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!customers?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhum cliente registrado ainda.</p>
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead className="hidden md:table-cell">Localização</TableHead>
            <TableHead className="hidden lg:table-cell">Última Reserva</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={customer.avatar} alt={customer.name} />
                    <AvatarFallback>
                      {customer.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-gray-500 text-xs flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {customer.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center text-gray-500 text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  {customer.location}
                </div>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {customer.lastBooking && (
                  <div className="flex items-center text-gray-500 text-xs">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    {new Date(customer.lastBooking).toLocaleDateString("pt-BR")}
                  </div>
                )}
              </TableCell>
              <TableCell>
                <div className="bg-blue-100 text-blue-700 text-xs font-medium inline-flex items-center justify-center px-2 py-1 rounded-full">
                  {customer.totalBookings} reservas
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Detalhes
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PartnerCustomersTable;
