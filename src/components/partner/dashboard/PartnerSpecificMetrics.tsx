
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building,
  Compass,
  CalendarDays,
  Car,
  ShoppingBag,
  Utensils,
  Tag,
  Users,
  Percent,
  Clock,
  Calendar,
  LineChart
} from "lucide-react";
import { Partner } from "@/types/partner";
import { usePartnerDashboard } from "@/hooks/use-partner-dashboard";

interface PartnerSpecificMetricsProps {
  businessType: Partner["business_type"];
}

const PartnerSpecificMetrics = ({ businessType }: PartnerSpecificMetricsProps) => {
  const { specificData, isLoading } = usePartnerDashboard();

  if (isLoading || !specificData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Carregando métricas específicas...</CardTitle>
        </CardHeader>
        <CardContent className="h-24 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  const renderAccommodationMetrics = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Quartos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{specificData.totalRooms}</div>
              <Building className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{specificData.occupancyRate}%</div>
              <Percent className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Média de Estadia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{specificData.averageStayDuration} dias</div>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderTourMetrics = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Passeios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{specificData.totalTours}</div>
              <Compass className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Participantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{specificData.totalParticipants}</div>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Passeios Agendados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{specificData.upcomingTours}</div>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Mais popular: {specificData.mostPopularTour}
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderEventMetrics = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{specificData.totalEvents}</div>
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Participantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{specificData.totalAttendees}</div>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Próximos Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{specificData.upcomingEvents}</div>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Média de participantes: {specificData.averageAttendance}
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderVehicleMetrics = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Veículos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{specificData.totalVehicles}</div>
              <Car className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{specificData.availableVehicles}</div>
              <Tag className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Veículos Reservados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{specificData.reservedVehicles}</div>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Mais requisitado: {specificData.mostRequestedVehicle}
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderProductMetrics = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{specificData.totalProducts}</div>
              <ShoppingBag className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{specificData.totalOrders}</div>
              <Tag className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{specificData.lowStockProducts}</div>
            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Produtos esgotados: {specificData.outOfStockProducts}
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderRestaurantMetrics = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Mesas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{specificData.totalTables}</div>
              <Utensils className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Duração Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{specificData.averageReservationTime} min</div>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Horários de Pico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium">
              {specificData.peakHours?.join(", ")}
            </div>
            <LineChart className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Pratos populares: {specificData.topSellingItems?.[0]}, {specificData.topSellingItems?.[1]}
          </div>
        </CardContent>
      </Card>
    </>
  );

  // Renderiza as métricas baseando-se no tipo de parceiro
  const renderMetrics = () => {
    switch (businessType) {
      case 'accommodation':
        return renderAccommodationMetrics();
      case 'tour':
        return renderTourMetrics();
      case 'event':
        return renderEventMetrics();
      case 'vehicle':
        return renderVehicleMetrics();
      case 'product':
        return renderProductMetrics();
      case 'restaurant':
        return renderRestaurantMetrics();
      default:
        return (
          <Card>
            <CardContent className="py-4">
              <p className="text-center text-muted-foreground">Nenhuma métrica específica disponível</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Métricas específicas</h2>
      {renderMetrics()}
    </div>
  );
};

export default PartnerSpecificMetrics;
