
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PartnerLayout from "@/components/partner/PartnerLayout";
import { useCurrentPartner } from "@/hooks/use-partner";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  Calendar,
  CreditCard,
  DollarSign,
  Package,
  ShoppingCart,
  Truck,
  Users,
  CalendarDays,
  Clock,
  Smile,
  AlertTriangle
} from "lucide-react";
import PartnerMetricsCards from "@/components/partner/dashboard/PartnerMetricsCards";
import PartnerBookingsChart from "@/components/partner/dashboard/PartnerBookingsChart";
import PartnerCustomersTable from "@/components/partner/dashboard/PartnerCustomersTable";
import PartnerUpcomingBookings from "@/components/partner/dashboard/PartnerUpcomingBookings";

const PartnerDashboard: React.FC = () => {
  const { data: partner } = useCurrentPartner();

  const getBusinessTypeInfo = () => {
    if (!partner?.business_type) return { icon: Package, label: 'Produtos' };
    
    switch (partner.business_type) {
      case 'accommodation': 
        return { icon: Calendar, label: 'Hospedagens' };
      case 'tour': 
        return { icon: Calendar, label: 'Passeios' };
      case 'vehicle': 
        return { icon: Truck, label: 'Veículos' };
      case 'event': 
        return { icon: CalendarDays, label: 'Eventos' };
      case 'product': 
        return { icon: Package, label: 'Produtos' };
      case 'restaurant': 
        return { icon: CreditCard, label: 'Reservas' };
      case 'service': 
        return { icon: Calendar, label: 'Serviços' };
      default: 
        return { icon: Package, label: 'Produtos' };
    }
  };

  const businessTypeInfo = getBusinessTypeInfo();

  return (
    <PartnerLayout pageTitle="Dashboard">
      <div className="grid gap-4 md:gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            Bem-vindo, {partner?.business_name || "Parceiro"}
          </h1>
          <div className="flex items-center gap-2">
            {!partner?.is_verified && (
              <div className="bg-amber-50 text-amber-600 px-3 py-1 rounded-md text-sm flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" /> Aguardando verificação
              </div>
            )}
            {partner?.is_verified && (
              <div className="bg-green-50 text-green-600 px-3 py-1 rounded-md text-sm flex items-center">
                <Smile className="w-4 h-4 mr-1" /> Verificado
              </div>
            )}
          </div>
        </div>

        {!partner?.is_verified && (
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <AlertTriangle className="h-8 w-8 text-amber-600" />
                <div>
                  <h3 className="text-lg font-semibold text-amber-800">Perfil em análise</h3>
                  <p className="text-amber-700">
                    Seu cadastro como parceiro está sob análise. Você receberá uma notificação quando for aprovado.
                    Enquanto isso, você já pode cadastrar seus {businessTypeInfo.label.toLowerCase()}.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <PartnerMetricsCards businessType={partner?.business_type} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Reservas Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <PartnerBookingsChart businessType={partner?.business_type} />
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Clientes por Região</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-6">
                  <BarChart2 className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-2 text-muted-foreground">Dados insuficientes para exibir o gráfico</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Últimos Clientes</span>
                <Button variant="outline" size="sm" className="text-xs">Ver todos</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PartnerCustomersTable />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">Próximas Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              <PartnerUpcomingBookings businessType={partner?.business_type} />
            </CardContent>
          </Card>
        </div>
      </div>
    </PartnerLayout>
  );
};

export default PartnerDashboard;
