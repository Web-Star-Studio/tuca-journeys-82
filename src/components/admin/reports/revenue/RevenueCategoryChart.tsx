
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ComposedChart, CartesianGrid, XAxis, YAxis, Bar, Legend, Line, Tooltip } from "recharts";
import { revenueData, chartConfig } from "./RevenueDataGenerator";

const RevenueCategoryChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Receita por Categoria</CardTitle>
        <CardDescription>
          Comparativo de receita entre categorias ao longo do tempo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer
            config={chartConfig}
          >
            <ComposedChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    formatter={(value, name) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, name]}
                  />
                }
              />
              <Legend />
              <Bar dataKey="passeios" fill={chartConfig.passeios.color} name="Passeios" />
              <Bar dataKey="hospedagens" fill={chartConfig.hospedagens.color} name="Hospedagens" />
              <Bar dataKey="pacotes" fill={chartConfig.pacotes.color} name="Pacotes" />
              <Bar dataKey="produtos" fill={chartConfig.produtos.color} name="Produtos" />
              <Line
                type="monotone"
                dataKey="total"
                stroke={chartConfig.total.color}
                name="Total"
                strokeWidth={2}
              />
            </ComposedChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueCategoryChart;
