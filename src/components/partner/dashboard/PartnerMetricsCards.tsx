
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookMarked,
  Users,
  DollarSign,
  Clock,
} from "lucide-react";
import { Partner } from "@/types/partner";
import { usePartnerDashboard } from "@/hooks/use-partner-dashboard";

interface PartnerMetricsCardsProps {
  businessType?: Partner["business_type"];
}

const PartnerMetricsCards = ({ businessType }: PartnerMetricsCardsProps) => {
  const { dashboardData, isLoading } = usePartnerDashboard();

  if (isLoading || !dashboardData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Carregando...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold opacity-30">--</div>
              <p className="text-xs text-muted-foreground">Carregando dados...</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const metrics = [
    {
      title: "Total de Reservas",
      value: dashboardData.totalBookings,
      description: "Total acumulado",
      icon: <BookMarked className="h-4 w-4 text-muted-foreground" />,
      change: "+5.2%",
    },
    {
      title: "Faturamento",
      value: `R$ ${dashboardData.totalRevenue.toLocaleString('pt-BR')}`,
      description: "Até o momento",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      change: "+10.6%",
    },
    {
      title: "Pendentes",
      value: dashboardData.pendingBookings,
      description: "Reservas a confirmar",
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
      change: "-2.3%",
    },
    {
      title: "Clientes",
      value: dashboardData.totalCustomers,
      description: "Total de clientes",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      change: "+12.1%",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex justify-between">
              {metric.title}
              {metric.icon}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground flex items-center justify-between">
              {metric.description}
              <span
                className={`inline-block px-1 py-0.5 rounded text-xs ${
                  metric.change.startsWith("+")
                    ? "text-green-600 bg-green-50"
                    : "text-red-600 bg-red-50"
                }`}
              >
                {metric.change}
              </span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PartnerMetricsCards;
