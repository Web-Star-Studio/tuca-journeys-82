
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip, TooltipProps } from "recharts";

interface DeviceData {
  name: string;
  value: number;
  color: string;
}

interface UserDeviceChartProps {
  deviceData: DeviceData[];
}

const UserDeviceChart = ({ deviceData }: UserDeviceChartProps) => {
  const deviceChartConfig = Object.fromEntries(
    deviceData.map(item => [item.name, { 
      label: item.name, 
      color: item.color 
    }])
  );

  // Create custom tooltip component to fix type errors
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-md shadow-md">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">{`${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Dispositivos</CardTitle>
        <CardDescription className="text-muted-foreground">
          Distribuição por tipo de dispositivo
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[260px] flex flex-col justify-center">
          <ChartContainer config={deviceChartConfig}>
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
                animationDuration={1000}
                animationBegin={200}
              >
                {deviceData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ChartContainer>
          
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2">
            {deviceData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="text-sm font-medium">{item.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDeviceChart;
