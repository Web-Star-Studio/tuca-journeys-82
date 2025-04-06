
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TrendSalesChartProps {
  trendData: {
    month: string;
    "Romântico": number;
    "Aventura": number;
    "Família": number;
    "Premium": number;
    "Econômico": number;
    "Total": number;
  }[];
  COLORS: string[];
}

const TrendSalesChart = ({ trendData, COLORS }: TrendSalesChartProps) => {
  // Safety check: ensure data is valid
  const validData = Array.isArray(trendData) && trendData.length > 0 
    ? trendData 
    : [{ 
        month: "Jan", 
        "Romântico": 0, 
        "Aventura": 0, 
        "Família": 0, 
        "Premium": 0, 
        "Econômico": 0, 
        "Total": 0 
      }];

  // Ensure we have colors
  const safeColors = COLORS && COLORS.length > 0 
    ? COLORS 
    : ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Tendência de Vendas</CardTitle>
        <CardDescription>
          Evolução das vendas de pacotes ao longo do tempo
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={validData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="Total" 
              stroke="#8884d8" 
              fill="#8884d8" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TrendSalesChart;
