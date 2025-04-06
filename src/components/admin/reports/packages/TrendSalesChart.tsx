
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  TooltipProps
} from 'recharts';

interface TrendData {
  month: string;
  "Romântico": number;
  "Aventura": number;
  "Família": number;
  "Premium": number;
  "Econômico": number;
  "Total": number;
}

interface TrendSalesChartProps {
  trendData: TrendData[];
  COLORS: string[];
}

const TrendSalesChart = ({ trendData, COLORS }: TrendSalesChartProps) => {
  // Validate input data
  if (!trendData || trendData.length === 0 || !COLORS || COLORS.length === 0) {
    return (
      <Card className="col-span-1 shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">Tendência de Vendas</CardTitle>
          <CardDescription className="text-muted-foreground">
            Evolução das vendas nos últimos 6 meses
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-80 flex items-center justify-center">
            <p className="text-muted-foreground">Dados não disponíveis</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Create config for chart
  const chartConfig = {
    "Romântico": { color: COLORS[0], label: "Romântico" },
    "Aventura": { color: COLORS[1], label: "Aventura" },
    "Família": { color: COLORS[2], label: "Família" },
    "Premium": { color: COLORS[3], label: "Premium" },
    "Econômico": { color: COLORS[4], label: "Econômico" },
    "Total": { color: "#666", label: "Total" }
  };

  // Create a custom tooltip component to avoid type errors
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          {payload.map((item, index) => (
            <p key={index} className="text-sm" style={{ color: item.color }}>
              {`${item.name}: ${item.value} vendas`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-1 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Tendência de Vendas</CardTitle>
        <CardDescription className="text-muted-foreground">
          Evolução das vendas nos últimos 6 meses
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-80">
          {trendData && trendData.length > 0 ? (
            <ChartContainer config={chartConfig}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#e0e0e0' }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ 
                    paddingTop: 15,
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="Total" 
                  fill="#666" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                />
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground">Nenhum dado disponível</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendSalesChart;
