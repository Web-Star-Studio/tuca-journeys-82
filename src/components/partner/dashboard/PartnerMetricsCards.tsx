import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Partner } from "@/types/partner";
import { 
  CalendarDays, 
  DollarSign, 
  Users, 
  Package, 
  Home, 
  Truck, 
  Clock 
} from "lucide-react";

interface PartnerMetricsCardsProps {
  businessType?: Partner["business_type"];
}

const PartnerMetricsCards: React.FC<PartnerMetricsCardsProps> = ({ businessType }) => {
  // Generate cards based on business type
  const getMetricsCards = () => {
    const commonCards = [
      {
        title: "Reservas do Mês",
        value: "0",
        icon: <CalendarDays className="h-4 w-4" />,
        description: "Total de reservas neste mês",
      },
      {
        title: "Faturamento do Mês",
        value: "R$ 0",
        icon: <DollarSign className="h-4 w-4" />,
        description: "Receita total neste mês",
      },
      {
        title: "Clientes Atendidos",
        value: "0",
        icon: <Users className="h-4 w-4" />,
        description: "Total de clientes únicos",
      },
    ];

    // Add business-specific fourth card
    let specificCard = {
      title: "Produtos Cadastrados",
      value: "0",
      icon: <Package className="h-4 w-4" />,
      description: "Total de itens cadastrados",
    };

    switch (businessType) {
      case "accommodation":
        specificCard = {
          title: "Quartos Disponíveis",
          value: "0",
          icon: <Home className="h-4 w-4" />,
          description: "Quartos disponíveis para reserva",
        };
        break;
      case "tour":
        specificCard = {
          title: "Passeios Ativos",
          value: "0",
          icon: <CalendarDays className="h-4 w-4" />,
          description: "Passeios disponíveis para reserva",
        };
        break;
      case "vehicle":
        specificCard = {
          title: "Veículos Disponíveis",
          value: "0",
          icon: <Truck className="h-4 w-4" />,
          description: "Veículos disponíveis para reserva",
        };
        break;
      case "event":
        specificCard = {
          title: "Eventos Agendados",
          value: "0",
          icon: <Clock className="h-4 w-4" />,
          description: "Eventos programados ativos",
        };
        break;
      // Other business types can be added here
    }

    return [...commonCards, specificCard];
  };

  const metricCards = getMetricsCards();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricCards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{card.title}</CardTitle>
            <div className="rounded-md bg-blue-50 p-2 text-tuca-ocean-blue">{card.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-gray-500 mt-1">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PartnerMetricsCards;
