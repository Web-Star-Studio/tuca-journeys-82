
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip
} from 'recharts';

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
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Tendência de Vendas</CardTitle>
        <CardDescription>
          Evolução das vendas nos últimos 6 meses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer
            config={{
              "Romântico": { color: COLORS[0] },
              "Aventura": { color: COLORS[1] },
              "Família": { color: COLORS[2] },
              "Premium": { color: COLORS[3] },
              "Econômico": { color: COLORS[4] },
              "Total": { color: "#666" }
            }}
          >
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                content={props => (
                  <ChartTooltipContent
                    {...props}
                    formatter={(value, name) => [`${value} vendas`, name]}
                  />
                )}
              />
              <Legend />
              <Bar dataKey="Total" fill="#666" />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendSalesChart;
