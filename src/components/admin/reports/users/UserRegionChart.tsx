
import React from "react";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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
    <div className="h-80 pt-4">
      <ChartContainer config={chartConfig}>
        <BarChart 
          data={regionData} 
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            horizontal={true}
            stroke="#f0f0f0"
          />
          <XAxis 
            type="number"
            tickLine={false}
            axisLine={{ stroke: '#e0e0e0' }}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            type="category" 
            dataKey="regiao"
            width={80}
            tickLine={false}
            axisLine={{ stroke: '#e0e0e0' }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            content={(props) => (
              <ChartTooltipContent 
                {...props} 
                indicator="line"
                formatter={(value) => [`${value} usuários`, 'Total']} 
              />
            )}
          />
          <Bar 
            dataKey="usuarios" 
            name="Usuários" 
            fill={chartConfig.usuarios.color}
            radius={[0, 4, 4, 0]}
            animationDuration={1000}
            animationBegin={200}
            label={{ 
              position: 'right', 
              fill: '#666',
              fontSize: 12,
              formatter: (value: any) => value
            }}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default UserRegionChart;
