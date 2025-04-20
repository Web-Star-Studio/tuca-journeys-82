
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarDays, Mail, MapPin } from "lucide-react";

const PartnerCustomersTable: React.FC = () => {
  // Demo data for customers
  const customers = [
    {
      id: 1,
      name: "Carlos Silva",
      email: "carlos.silva@example.com",
      location: "Rio de Janeiro, RJ",
      lastBooking: "2023-04-10",
      totalBookings: 3,
      avatar: "",
    },
    {
      id: 2,
      name: "Maria Oliveira",
      email: "maria.oliveira@example.com",
      location: "São Paulo, SP",
      lastBooking: "2023-04-15",
      totalBookings: 2,
      avatar: "",
    },
    {
      id: 3,
      name: "João Santos",
      email: "joao.santos@example.com",
      location: "Belo Horizonte, MG",
      lastBooking: "2023-04-18",
      totalBookings: 1,
      avatar: "",
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (!customers.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhum cliente registrado ainda.</p>
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      <table className="w-full">
        <thead>
          <tr className="text-xs font-medium text-gray-500 border-b">
            <th className="text-left py-3 px-4">Cliente</th>
            <th className="text-left py-3 px-4 hidden md:table-cell">Localização</th>
            <th className="text-left py-3 px-4 hidden lg:table-cell">Última Reserva</th>
            <th className="text-left py-3 px-4">Total</th>
            <th className="text-right py-3 px-4">Ação</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="text-sm border-b hover:bg-gray-50">
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={customer.avatar} alt={customer.name} />
                    <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-gray-500 text-xs flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {customer.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 hidden md:table-cell">
                <div className="flex items-center text-gray-500 text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  {customer.location}
                </div>
              </td>
              <td className="py-3 px-4 hidden lg:table-cell">
                <div className="flex items-center text-gray-500 text-xs">
                  <CalendarDays className="h-3 w-3 mr-1" />
                  {new Date(customer.lastBooking).toLocaleDateString("pt-BR")}
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="bg-blue-100 text-blue-700 text-xs font-medium inline-flex items-center justify-center px-2 py-1 rounded-full">
                  {customer.totalBookings} reservas
                </div>
              </td>
              <td className="py-3 px-4 text-right">
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Detalhes
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartnerCustomersTable;
