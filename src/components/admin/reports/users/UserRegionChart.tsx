
import React from "react";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, TooltipProps } from "recharts";
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
    regiao: isMobile && item.regiao.length > 8 ? item.regiao.substring(0, 8) + '..' : item.regiao,
    // Add display name for tooltip
    displayName: item.regiao
  }));

  // Custom tooltip to fix type errors
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-md shadow-md z-50">
          <p className="font-medium">{data.displayName || data.regiao}</p>
          <p className="text-sm">{`${payload[0].value} usuários`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="h-64 sm:h-80 w-full relative">
      <ChartContainer config={chartConfig} height="100%">
        <BarChart 
          data={formattedData} 
          layout="vertical"
          margin={{ 
            top: 5, 
            right: 30, 
            left: isMobile ? 60 : 80, 
            bottom: 5 
          }}
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
            width={isMobile ? 60 : 80}
            tickLine={false}
            axisLine={{ stroke: '#e0e0e0' }}
            tick={{ fontSize: 10 }}
          />
          <Tooltip content={<CustomTooltip />} />
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
              formatter: (value: any) => value
            }}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default UserRegionChart;
