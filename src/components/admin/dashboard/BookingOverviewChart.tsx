import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { XAxis, YAxis } from "@/components/ui/chart/RechartsWrappers";

interface DateRange {
  from: Date;
  to: Date;
}

interface BookingOverviewChartProps {
  dateRange?: DateRange;
}

const BookingOverviewChart = ({ dateRange }: BookingOverviewChartProps) => {
  // Dummy data for bookings overview chart
  const data = [
    { name: "Jan", total: 12, tours: 8, accommodations: 4 },
    { name: "Fev", total: 18, tours: 10, accommodations: 8 },
    { name: "Mar", total: 24, tours: 15, accommodations: 9 },
    { name: "Abr", total: 32, tours: 20, accommodations: 12 },
    { name: "Mai", total: 28, tours: 16, accommodations: 12 },
    { name: "Jun", total: 36, tours: 22, accommodations: 14 },
    { name: "Jul", total: 48, tours: 30, accommodations: 18 },
    { name: "Ago", total: 52, tours: 32, accommodations: 20 },
    { name: "Set", total: 38, tours: 24, accommodations: 14 },
    { name: "Out", total: 30, tours: 18, accommodations: 12 },
    { name: "Nov", total: 26, tours: 16, accommodations: 10 },
    { name: "Dez", total: 34, tours: 20, accommodations: 14 },
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Visão Geral de Reservas</CardTitle>
        <CardDescription>
          {dateRange ? 
            `De ${dateRange.from.toLocaleDateString()} a ${dateRange.to.toLocaleDateString()}` : 
            "Visualização anual"}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3498db" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#3498db" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2ecc71" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#2ecc71" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAccommodations" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f1c40f" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#f1c40f" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "white", 
                borderColor: "#e5e7eb",
                fontSize: "12px",
                borderRadius: "6px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
              }}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#3498db"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTotal)"
              name="Total"
            />
            <Area
              type="monotone"
              dataKey="tours"
              stroke="#2ecc71"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTours)"
              name="Passeios"
            />
            <Area
              type="monotone"
              dataKey="accommodations"
              stroke="#f1c40f"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAccommodations)"
              name="Hospedagens"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BookingOverviewChart;
