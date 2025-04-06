
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const bookingOverviewData = [
  { month: "Jan", passeios: 65, hospedagens: 48, pacotes: 35 },
  { month: "Fev", passeios: 50, hospedagens: 40, pacotes: 30 },
  { month: "Mar", passeios: 75, hospedagens: 55, pacotes: 40 },
  { month: "Abr", passeios: 90, hospedagens: 60, pacotes: 50 },
  { month: "Mai", passeios: 100, hospedagens: 65, pacotes: 55 },
  { month: "Jun", passeios: 120, hospedagens: 85, pacotes: 65 },
  { month: "Jul", passeios: 140, hospedagens: 95, pacotes: 75 },
  { month: "Ago", passeios: 130, hospedagens: 90, pacotes: 70 },
  { month: "Set", passeios: 115, hospedagens: 80, pacotes: 60 },
];

const BookingOverviewChart = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Visão Geral de Reservas</CardTitle>
        <CardDescription>
          Reservas mensais por categoria de produto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={bookingOverviewData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="passeios"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="hospedagens"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="pacotes"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingOverviewChart;
