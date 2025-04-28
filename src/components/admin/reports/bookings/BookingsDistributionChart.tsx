
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, CartesianGrid, Legend, Tooltip } from "recharts";
import { XAxis, YAxis } from "@/components/ui/chart/RechartsWrappers";
import { BookingData, BookingChartConfig } from "./BookingsDataTypes";

interface BookingsDistributionChartProps {
  data: BookingData[];
  chartConfig: BookingChartConfig;
  totals: {
    passeiosTotal: number;
    hospedagensTotal: number;
    pacotesTotal: number;
    totalBookings: number;
  };
}

const BookingsDistributionChart = ({ data, chartConfig, totals }: BookingsDistributionChartProps) => {
  const { passeiosTotal, hospedagensTotal, pacotesTotal, totalBookings } = totals;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição por Tipo</CardTitle>
        <CardDescription>
          Comparativo de reservas por tipo de serviço
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer config={chartConfig}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                content={
                  <ChartTooltipContent indicator="dot" />
                }
              />
              <Legend />
              <Bar 
                dataKey="passeios" 
                name="Passeios" 
                fill={chartConfig.passeios.color} 
              />
              <Bar 
                dataKey="hospedagens" 
                name="Hospedagens" 
                fill={chartConfig.hospedagens.color} 
              />
              <Bar 
                dataKey="pacotes" 
                name="Pacotes" 
                fill={chartConfig.pacotes.color} 
              />
            </BarChart>
          </ChartContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col p-4 border rounded-lg">
            <div className="flex items-center mb-2">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: chartConfig.passeios.color }}
              ></div>
              <span className="font-medium">Passeios</span>
            </div>
            <span className="text-2xl font-bold">{passeiosTotal}</span>
            <span className="text-sm text-muted-foreground mt-1">
              {((passeiosTotal / totalBookings) * 100).toFixed(1)}% do total
            </span>
          </div>
          
          <div className="flex flex-col p-4 border rounded-lg">
            <div className="flex items-center mb-2">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: chartConfig.hospedagens.color }}
              ></div>
              <span className="font-medium">Hospedagens</span>
            </div>
            <span className="text-2xl font-bold">{hospedagensTotal}</span>
            <span className="text-sm text-muted-foreground mt-1">
              {((hospedagensTotal / totalBookings) * 100).toFixed(1)}% do total
            </span>
          </div>
          
          <div className="flex flex-col p-4 border rounded-lg">
            <div className="flex items-center mb-2">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: chartConfig.pacotes.color }}
              ></div>
              <span className="font-medium">Pacotes</span>
            </div>
            <span className="text-2xl font-bold">{pacotesTotal}</span>
            <span className="text-sm text-muted-foreground mt-1">
              {((pacotesTotal / totalBookings) * 100).toFixed(1)}% do total
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingsDistributionChart;
