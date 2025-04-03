
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
  Tooltip
} from 'recharts';

interface TrendSalesChartProps {
  trendData: {
    month: string;
    "Romântico": number;
    "Aventura": number;
    "Família": number;
    "Premium": number;
    "Econômico": number;
    "Total": number;
  }[];
  COLORS: string[];
}

const TrendSalesChart = ({ trendData, COLORS }: TrendSalesChartProps) => {
  // Create config for chart
  const chartConfig = {
    "Romântico": { color: COLORS[0], label: "Romântico" },
    "Aventura": { color: COLORS[1], label: "Aventura" },
    "Família": { color: COLORS[2], label: "Família" },
    "Premium": { color: COLORS[3], label: "Premium" },
    "Econômico": { color: COLORS[4], label: "Econômico" },
    "Total": { color: "#666", label: "Total" }
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
              <Tooltip
                content={(props) => (
                  <ChartTooltipContent
                    {...props}
                    formatter={(value, name) => [`${value} vendas`, name]}
                  />
                )}
              />
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
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendSalesChart;
