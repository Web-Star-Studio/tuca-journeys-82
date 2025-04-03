
import React from "react";
import { Users, ShoppingCart, Home, Calendar } from "lucide-react";
import DashboardCard from "./DashboardCard";

const DashboardMetrics = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <DashboardCard 
        title="Total de Usuários" 
        value="842" 
        trend="+12.5%" 
        description="Desde o último mês" 
        icon={<Users className="h-5 w-5" />}
        trendUp={true}
      />
      <DashboardCard 
        title="Reservas Novas" 
        value="45" 
        trend="+32.1%" 
        description="Últimos 7 dias" 
        icon={<ShoppingCart className="h-5 w-5" />}
        trendUp={true}
      />
      <DashboardCard 
        title="Taxa de Ocupação" 
        value="78%" 
        trend="+8.3%" 
        description="Hospedagens" 
        icon={<Home className="h-5 w-5" />}
        trendUp={true}
      />
      <DashboardCard 
        title="Passeios Populares" 
        value="12" 
        trend="+5 passeios" 
        description="Acima da média" 
        icon={<Calendar className="h-5 w-5" />}
        trendUp={true}
      />
    </div>
  );
};

export default DashboardMetrics;
