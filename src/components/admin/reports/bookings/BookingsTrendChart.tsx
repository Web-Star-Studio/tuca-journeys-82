
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from "recharts";
import { BookingData, BookingChartConfig } from "./BookingsDataTypes";

interface BookingsTrendChartProps {
  data: BookingData[];
  chartConfig: BookingChartConfig;
}

const BookingsTrendChart = ({ data, chartConfig }: BookingsTrendChartProps) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Tendência de Reservas</CardTitle>
        <CardDescription>
          Número de reservas por categoria ao longo do tempo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer config={chartConfig}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                content={
                  <ChartTooltipContent indicator="dot" />
                }
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="passeios" 
                stroke={chartConfig.passeios.color} 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
                name="Passeios"
              />
              <Line 
                type="monotone" 
                dataKey="hospedagens" 
                stroke={chartConfig.hospedagens.color} 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
                name="Hospedagens"
              />
              <Line 
                type="monotone" 
                dataKey="pacotes" 
                stroke={chartConfig.pacotes.color} 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
                name="Pacotes"
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingsTrendChart;
