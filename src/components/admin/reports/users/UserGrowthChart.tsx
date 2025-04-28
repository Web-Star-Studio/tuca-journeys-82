
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { XAxis, YAxis } from "@/components/ui/chart/RechartsWrappers";

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
    <Card className="lg:col-span-2 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Crescimento de Usuários</CardTitle>
        <CardDescription className="text-muted-foreground">
          Novos usuários cadastrados por mês
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-80">
          <ChartContainer config={{ usuarios: chartConfig.usuarios }}>
            <AreaChart 
              data={growthData}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorUsuarios" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartConfig.usuarios.color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={chartConfig.usuarios.color} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false}
                stroke="#f0f0f0" 
              />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                content={
                  <ChartTooltipContent 
                    indicator="dot" 
                    formatter={(value) => [`${value} usuários`, 'Novos Usuários']}
                  />
                }
              />
              <Area 
                type="monotone" 
                dataKey="usuarios" 
                stroke={chartConfig.usuarios.color}
                fillOpacity={1}
                fill="url(#colorUsuarios)"
                name="Novos Usuários"
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1500}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserGrowthChart;
