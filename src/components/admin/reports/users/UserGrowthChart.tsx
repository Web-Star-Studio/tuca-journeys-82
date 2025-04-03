
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

interface GrowthData {
  month: string;
  usuarios: number;
}

interface UserGrowthChartProps {
  growthData: GrowthData[];
  chartConfig: {
    usuarios: {
      label: string;
      color: string;
    }
  };
}

const UserGrowthChart = ({ growthData, chartConfig }: UserGrowthChartProps) => {
  return (
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
            <AreaChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
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
  );
};

export default UserGrowthChart;
