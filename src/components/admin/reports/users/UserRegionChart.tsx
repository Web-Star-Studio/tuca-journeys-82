
import React from "react";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  // Reduce text length for mobile
  const formattedData = regionData.map(item => ({
    ...item,
    regiao: isMobile && item.regiao.length > 8 ? item.regiao.substring(0, 8) + '..' : item.regiao
  }));
  
  return (
    <div className="h-64 sm:h-80 pt-4">
      <ChartContainer config={chartConfig} height="100%">
        <BarChart 
          data={formattedData} 
          layout="vertical"
          margin={{ top: 5, right: 20, left: isMobile ? 50 : 70, bottom: 5 }}
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
            tick={{ fontSize: 10 }}
          />
          <YAxis 
            type="category" 
            dataKey="regiao"
            width={isMobile ? 50 : 70}
            tickLine={false}
            axisLine={{ stroke: '#e0e0e0' }}
            tick={{ fontSize: 10 }}
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
              fontSize: 10,
              formatter: (value: any) => isMobile ? value : value
            }}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default UserRegionChart;
