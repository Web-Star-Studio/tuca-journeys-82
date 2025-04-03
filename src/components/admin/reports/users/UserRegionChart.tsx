
import React from "react";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface RegionData {
  regiao: string;
  usuarios: number;
}

interface RegionChartConfig {
  usuarios: {
    label: string;
    color: string;
  };
  [key: string]: {
    label: string;
    color: string;
  };
}

interface UserRegionChartProps {
  regionData: RegionData[];
  chartConfig: RegionChartConfig;
}

const UserRegionChart = ({ regionData, chartConfig }: UserRegionChartProps) => {
  return (
    <div className="h-80">
      <ChartContainer config={chartConfig}>
        <BarChart data={regionData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="regiao" />
          <Tooltip 
            content={(props) => (
              <ChartTooltipContent {...props} indicator="line" />
            )}
          />
          <Bar 
            dataKey="usuarios" 
            name="Usuários" 
            fill={chartConfig.usuarios.color} 
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default UserRegionChart;
