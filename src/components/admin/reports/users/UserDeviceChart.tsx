
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dispositivos</CardTitle>
        <CardDescription>
          Distribuição por tipo de dispositivo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex flex-col justify-center">
          <ChartContainer config={deviceChartConfig}>
            <ResponsiveContainer width="100%" height={200}>
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
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Porcentagem']}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          <div className="mt-4 space-y-2">
            {deviceData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.name}</span>
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
