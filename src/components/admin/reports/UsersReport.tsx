
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip, PieChart, Pie, Cell } from "recharts";
import { Users, UserPlus, MapPin, Globe } from "lucide-react";

// Sample data - in a real application, this would come from an API
const newUsersData = [
  { month: "Jan", usuarios: 50 },
  { month: "Fev", usuarios: 40 },
  { month: "Mar", usuarios: 60 },
  { month: "Abr", usuarios: 65 },
  { month: "Mai", usuarios: 70 },
  { month: "Jun", usuarios: 80 },
];

const usersByRegion = [
  { regiao: "Sudeste", usuarios: 280 },
  { regiao: "Nordeste", usuarios: 180 },
  { regiao: "Sul", usuarios: 150 },
  { regiao: "Centro-Oeste", usuarios: 90 },
  { regiao: "Norte", usuarios: 60 },
  { regiao: "Internacional", usuarios: 40 },
];

const deviceData = [
  { name: "Desktop", value: 45, color: "#2563eb" },
  { name: "Mobile", value: 50, color: "#f59e0b" },
  { name: "Tablet", value: 5, color: "#10b981" },
];

// Color configurations for the chart
const chartConfig = {
  usuarios: { label: "Usuários", color: "#2563eb" },
  sudeste: { label: "Sudeste", color: "#2563eb" },
  nordeste: { label: "Nordeste", color: "#10b981" },
  sul: { label: "Sul", color: "#f59e0b" },
  centro: { label: "Centro-Oeste", color: "#8b5cf6" },
  norte: { label: "Norte", color: "#ec4899" },
  internacional: { label: "Internacional", color: "#6b7280" },
};

interface UsersReportProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

const UsersReport = ({ dateRange }: UsersReportProps) => {
  // In a real app, we would filter data based on the date range
  
  // Calculate totals
  const totalUsers = 800;
  const totalNewUsers = newUsersData.reduce((sum, item) => sum + item.usuarios, 0);
  const totalRegions = usersByRegion.length;
  const conversionRate = 28; // In percentage, would be calculated in a real app
  
  const deviceChartConfig = Object.fromEntries(
    deviceData.map(item => [item.name, { 
      label: item.name, 
      color: item.color 
    }])
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Usuários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="font-bold text-2xl">{totalUsers}</div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Novos Usuários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="font-bold text-2xl">{totalNewUsers}</div>
              <UserPlus className="h-4 w-4 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Regiões Atendidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="font-bold text-2xl">{totalRegions}</div>
              <MapPin className="h-4 w-4 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taxa de Conversão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="font-bold text-2xl">{conversionRate}%</div>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Crescimento de Usuários</CardTitle>
            <CardDescription>
              Novos usuários cadastrados por mês
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer config={{ usuarios: chartConfig.usuarios }}>
                <AreaChart data={newUsersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip 
                    content={
                      <ChartTooltipContent indicator="dot" />
                    }
                  />
                  <Area 
                    type="monotone" 
                    dataKey="usuarios" 
                    fill={chartConfig.usuarios.color + "80"} // Adding transparency
                    stroke={chartConfig.usuarios.color}
                    name="Novos Usuários"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Dispositivos</CardTitle>
            <CardDescription>
              Distribuição por tipo de dispositivo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex flex-col justify-center">
              <ChartContainer config={deviceChartConfig}>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Porcentagem']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              
              <div className="mt-4 space-y-2">
                {deviceData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <div className="text-sm font-medium">{item.value}%</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Região</CardTitle>
          <CardDescription>
            Número de usuários por região geográfica
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig}>
              <BarChart data={usersByRegion} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="regiao" />
                <ChartTooltip 
                  content={
                    <ChartTooltipContent indicator="line" />
                  }
                />
                <Bar 
                  dataKey="usuarios" 
                  name="Usuários" 
                  fill={chartConfig.usuarios.color} 
                />
              </BarChart>
            </ChartContainer>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border border-blue-200 bg-blue-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Região com Mais Usuários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-bold text-xl">Sudeste</div>
                <div className="text-sm text-muted-foreground">280 usuários (35%)</div>
              </CardContent>
            </Card>
            
            <Card className="border border-yellow-200 bg-yellow-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Maior Crescimento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-bold text-xl">Nordeste</div>
                <div className="text-sm text-muted-foreground">+32% no último mês</div>
              </CardContent>
            </Card>
            
            <Card className="border border-purple-200 bg-purple-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Maior Conversão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-bold text-xl">Sul</div>
                <div className="text-sm text-muted-foreground">34% de taxa de conversão</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersReport;
