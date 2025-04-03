
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip, PieChart, Pie, Cell } from "recharts";
import { Calendar, Check, Clock, Users } from "lucide-react";

// Sample data - in a real application, this would come from an API
const bookingsData = [
  { month: "Jan", passeios: 180, hospedagens: 120, pacotes: 80, total: 380 },
  { month: "Fev", passeios: 150, hospedagens: 100, pacotes: 70, total: 320 },
  { month: "Mar", passeios: 190, hospedagens: 130, pacotes: 90, total: 410 },
  { month: "Abr", passeios: 210, hospedagens: 140, pacotes: 95, total: 445 },
  { month: "Mai", passeios: 230, hospedagens: 150, pacotes: 100, total: 480 },
  { month: "Jun", passeios: 250, hospedagens: 170, pacotes: 110, total: 530 },
];

const statusData = [
  { name: "Confirmadas", value: 680, color: "#10b981" },
  { name: "Pendentes", value: 120, color: "#f59e0b" },
  { name: "Canceladas", value: 65, color: "#ef4444" },
];

// Color configurations for the chart
const chartConfig = {
  passeios: { label: "Passeios", color: "#2563eb" },
  hospedagens: { label: "Hospedagens", color: "#10b981" },
  pacotes: { label: "Pacotes", color: "#f59e0b" },
  total: { label: "Total", color: "#ef4444" },
};

interface BookingsReportProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

const BookingsReport = ({ dateRange }: BookingsReportProps) => {
  // In a real app, we would filter data based on the date range
  
  // Calculate totals
  const totalBookings = bookingsData.reduce((sum, item) => sum + item.total, 0);
  const pastMonth = bookingsData[bookingsData.length - 1].total;
  const passeiosTotal = bookingsData.reduce((sum, item) => sum + item.passeios, 0);
  const hospedagensTotal = bookingsData.reduce((sum, item) => sum + item.hospedagens, 0);
  const pacotesTotal = bookingsData.reduce((sum, item) => sum + item.pacotes, 0);
  
  const COLORS = statusData.map(item => item.color);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Reservas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="font-bold text-2xl">{totalBookings}</div>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Reservas Confirmadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="font-bold text-2xl">680</div>
              <Check className="h-4 w-4 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Reservas Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="font-bold text-2xl">120</div>
              <Clock className="h-4 w-4 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Visitantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="font-bold text-2xl">2,450</div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tendência de Reservas</CardTitle>
            <CardDescription>
              Número de reservas por categoria ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer config={chartConfig}>
                <LineChart data={bookingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip 
                    content={
                      <ChartTooltipContent indicator="dot" />
                    }
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="passeios" 
                    stroke={chartConfig.passeios.color} 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                    name="Passeios"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="hospedagens" 
                    stroke={chartConfig.hospedagens.color} 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                    name="Hospedagens"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pacotes" 
                    stroke={chartConfig.pacotes.color} 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                    name="Pacotes"
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Status das Reservas</CardTitle>
            <CardDescription>
              Distribuição por status de confirmação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex flex-col justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} reservas`, 'Quantidade']}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="mt-4 space-y-2">
                {statusData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <div className="text-sm font-medium">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Tipo</CardTitle>
          <CardDescription>
            Comparativo de reservas por tipo de serviço
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig}>
              <BarChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip 
                  content={
                    <ChartTooltipContent indicator="dot" />
                  }
                />
                <Legend />
                <Bar 
                  dataKey="passeios" 
                  name="Passeios" 
                  fill={chartConfig.passeios.color} 
                />
                <Bar 
                  dataKey="hospedagens" 
                  name="Hospedagens" 
                  fill={chartConfig.hospedagens.color} 
                />
                <Bar 
                  dataKey="pacotes" 
                  name="Pacotes" 
                  fill={chartConfig.pacotes.color} 
                />
              </BarChart>
            </ChartContainer>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: chartConfig.passeios.color }}
                ></div>
                <span className="font-medium">Passeios</span>
              </div>
              <span className="text-2xl font-bold">{passeiosTotal}</span>
              <span className="text-sm text-muted-foreground mt-1">
                {((passeiosTotal / totalBookings) * 100).toFixed(1)}% do total
              </span>
            </div>
            
            <div className="flex flex-col p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: chartConfig.hospedagens.color }}
                ></div>
                <span className="font-medium">Hospedagens</span>
              </div>
              <span className="text-2xl font-bold">{hospedagensTotal}</span>
              <span className="text-sm text-muted-foreground mt-1">
                {((hospedagensTotal / totalBookings) * 100).toFixed(1)}% do total
              </span>
            </div>
            
            <div className="flex flex-col p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: chartConfig.pacotes.color }}
                ></div>
                <span className="font-medium">Pacotes</span>
              </div>
              <span className="text-2xl font-bold">{pacotesTotal}</span>
              <span className="text-sm text-muted-foreground mt-1">
                {((pacotesTotal / totalBookings) * 100).toFixed(1)}% do total
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsReport;
