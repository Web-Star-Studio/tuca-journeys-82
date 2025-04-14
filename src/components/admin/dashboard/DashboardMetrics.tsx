
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  CalendarDays,
  Home,
  ShoppingCart,
  Clock,
  DollarSign
} from "lucide-react";
import { useAdminData } from "@/hooks/use-admin-data";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardMetrics = () => {
  const { metrics, isLoading, error } = useAdminData();

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
        <p>Erro ao carregar métricas. Por favor, tente novamente mais tarde.</p>
      </div>
    );
  }

  const metricCards = [
    {
      title: "Usuários",
      value: metrics?.users || 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Passeios",
      value: metrics?.tours || 0,
      icon: CalendarDays,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Hospedagens",
      value: metrics?.accommodations || 0,
      icon: Home,
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      title: "Reservas",
      value: metrics?.bookings || 0,
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Pendentes",
      value: metrics?.pendingBookings || 0,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "Receita",
      value: `R$ ${(metrics?.totalRevenue || 0).toLocaleString('pt-BR')}`,
      icon: DollarSign,
      color: "text-tuca-ocean-blue",
      bgColor: "bg-tuca-light-blue"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {metricCards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <div className={`${card.bgColor} ${card.color} p-2 rounded-full`}>
              <card.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-7 w-20" />
            ) : (
              <div className="text-2xl font-bold">{card.value}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardMetrics;
