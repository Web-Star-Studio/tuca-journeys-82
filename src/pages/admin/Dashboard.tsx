
import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/admin/AdminLayout";
import { Users, ShoppingCart, Home, Calendar, TrendingUp, Eye, DollarSign, ArrowUpRight } from "lucide-react";

// Dummy data for demonstration
const bookingData = [
  { month: "Jan", passeios: 65, hospedagens: 45, pacotes: 30 },
  { month: "Fev", passeios: 59, hospedagens: 40, pacotes: 32 },
  { month: "Mar", passeios: 80, hospedagens: 55, pacotes: 40 },
  { month: "Abr", passeios: 81, hospedagens: 60, pacotes: 35 },
  { month: "Mai", passeios: 90, hospedagens: 70, pacotes: 50 },
  { month: "Jun", passeios: 100, hospedagens: 85, pacotes: 65 },
];

const Dashboard = () => {
  return (
    <AdminLayout pageTitle="Dashboard">
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

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Visão Geral de Reservas</CardTitle>
            <CardDescription>Reservas de passeios, hospedagens e pacotes nos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="passeios" name="Passeios" fill="#2563eb" />
                <Bar dataKey="hospedagens" name="Hospedagens" fill="#10b981" />
                <Bar dataKey="pacotes" name="Pacotes" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="col-span-1 grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Desempenho do Site</CardTitle>
              <CardDescription>Métricas do site nos últimos 30 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <MetricItem 
                  icon={<Eye className="text-tuca-ocean-blue" />} 
                  label="Visualizações de Página" 
                  value="24,562" 
                  change="+15.6%" 
                  positive
                />
                <MetricItem 
                  icon={<TrendingUp className="text-tuca-ocean-blue" />} 
                  label="Taxa de Conversão" 
                  value="3.2%" 
                  change="+0.8%" 
                  positive
                />
                <MetricItem 
                  icon={<DollarSign className="text-tuca-ocean-blue" />} 
                  label="Receita Total" 
                  value="R$ 125.670,00" 
                  change="+23.5%" 
                  positive
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Atividades Recentes</CardTitle>
              <CardDescription>Últimas atualizações e atividades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityItem 
                  title="Nova reserva de passeio"
                  description="João Silva reservou o passeio 'Mergulho em Noronha'"
                  time="Há 2 horas"
                />
                <ActivityItem 
                  title="Nova hospedagem adicionada"
                  description="'Pousada Vista Mar' foi adicionada ao catálogo"
                  time="Ontem"
                />
                <ActivityItem 
                  title="Atualização de pacote"
                  description="Pacote 'Noronha Completo' foi atualizado"
                  time="2 dias atrás"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

// Card component for dashboard metrics
interface DashboardCardProps {
  title: string;
  value: string;
  trend: string;
  description: string;
  icon: React.ReactNode;
  trendUp: boolean;
}

const DashboardCard = ({ title, value, trend, description, icon, trendUp }: DashboardCardProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="rounded-full p-2 bg-tuca-light-blue/50">{icon}</div>
        <span className={`text-xs font-medium flex items-center ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trend} 
          <ArrowUpRight className="ml-1 h-3 w-3" />
        </span>
      </div>
      <div className="mt-3">
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-sm text-muted-foreground mt-1">{title}</p>
      </div>
      <p className="text-xs text-muted-foreground mt-3">{description}</p>
    </CardContent>
  </Card>
);

// Metric item component
interface MetricItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

const MetricItem = ({ icon, label, value, change, positive }: MetricItemProps) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <div className="rounded-full p-2 bg-tuca-light-blue/30">
        {icon}
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
    <span className={`text-xs font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
      {change}
    </span>
  </div>
);

// Activity item component
interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
}

const ActivityItem = ({ title, description, time }: ActivityItemProps) => (
  <div className="border-l-2 border-tuca-ocean-blue pl-3 py-1">
    <h4 className="text-sm font-medium">{title}</h4>
    <p className="text-xs text-muted-foreground">{description}</p>
    <p className="text-xs text-gray-400 mt-1">{time}</p>
  </div>
);

export default Dashboard;
