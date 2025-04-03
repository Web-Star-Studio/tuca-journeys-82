
import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Dummy data for demonstration
const bookingData = [
  { month: "Jan", passeios: 65, hospedagens: 45, pacotes: 30 },
  { month: "Fev", passeios: 59, hospedagens: 40, pacotes: 32 },
  { month: "Mar", passeios: 80, hospedagens: 55, pacotes: 40 },
  { month: "Abr", passeios: 81, hospedagens: 60, pacotes: 35 },
  { month: "Mai", passeios: 90, hospedagens: 70, pacotes: 50 },
  { month: "Jun", passeios: 100, hospedagens: 85, pacotes: 65 },
];

const BookingOverviewChart = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Visão Geral de Reservas</CardTitle>
        <CardDescription>Reservas de passeios, hospedagens e pacotes nos últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={bookingData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="passeios" name="Passeios" fill="#2563eb" />
            <Bar dataKey="hospedagens" name="Hospedagens" fill="#10b981" />
            <Bar dataKey="pacotes" name="Pacotes" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BookingOverviewChart;
