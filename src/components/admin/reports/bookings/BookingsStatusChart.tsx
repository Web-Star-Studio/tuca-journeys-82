
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, TooltipProps, ResponsiveContainer } from "recharts";
import { StatusData } from "./BookingsDataTypes";

interface BookingsStatusChartProps {
  statusData: StatusData[];
}

const BookingsStatusChart = ({ statusData }: BookingsStatusChartProps) => {
  // Create a config object for the chart colors
  const chartConfig = Object.fromEntries(
    statusData.map(item => [item.name, { 
      label: item.name, 
      color: item.color 
    }])
  );

  // Custom tooltip component to fix type errors
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-md shadow-md">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">{`${payload[0].value} reservas`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status das Reservas</CardTitle>
        <CardDescription>
          Distribuição por status de confirmação
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex flex-col justify-center">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 space-y-2">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.name}</span>
                </div>
                <div className="text-sm font-medium">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingsStatusChart;
