
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { XAxis, YAxis } from "@/components/ui/chart/RechartsWrappers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccommodationTrendData, AccommodationChartConfig } from "./AccommodationsDataGenerator";

interface AccommodationTrendChartProps {
  data: AccommodationTrendData[];
  chartConfig: AccommodationChartConfig;
}

const AccommodationTrendChart = ({ data, chartConfig }: AccommodationTrendChartProps) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Tendências de Hospedagens</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="ocupacao"
                name={chartConfig.ocupacao.label}
                stroke={chartConfig.ocupacao.color}
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="reservas"
                name={chartConfig.reservas.label}
                stroke={chartConfig.reservas.color}
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avaliacao"
                name={chartConfig.avaliacao.label}
                stroke={chartConfig.avaliacao.color}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccommodationTrendChart;
