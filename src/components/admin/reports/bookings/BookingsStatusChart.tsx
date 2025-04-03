
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { StatusData } from "./BookingsDataTypes";

interface BookingsStatusChartProps {
  statusData: StatusData[];
}

const BookingsStatusChart = ({ statusData }: BookingsStatusChartProps) => {
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
          <ResponsiveContainer width="100%" height={200}>
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
              <Tooltip 
                formatter={(value) => [`${value} reservas`, 'Quantidade']}
              />
            </PieChart>
          </ResponsiveContainer>
          
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
