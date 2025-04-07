
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ComposedChart, CartesianGrid, XAxis, YAxis, Bar, Legend, Line, Tooltip } from "recharts";
import { revenueData, chartConfig } from "./RevenueDataGenerator";
import { useIsMobile } from "@/hooks/use-mobile";

const RevenueCategoryChart = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Receita por Categoria</CardTitle>
        <CardDescription>
          Comparativo de receita entre categorias
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 sm:h-80 w-full relative">
          <ChartContainer
            config={chartConfig}
            height="100%"
          >
            <ComposedChart 
              data={isMobile ? revenueData.slice(-6) : revenueData}
              margin={{ 
                top: 5, 
                right: isMobile ? 5 : 30, 
                left: isMobile ? 5 : 20, 
                bottom: 5 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: isMobile ? 8 : 10 }}
                tickMargin={5}
                interval={isMobile ? 1 : 0}
              />
              <YAxis 
                tick={{ fontSize: isMobile ? 8 : 10 }}
                tickFormatter={(value) => `R$${value/1000}k`}
                width={isMobile ? 40 : 60}
              />
              <Tooltip
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    formatter={(value, name) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, name]}
                  />
                }
              />
              <Legend wrapperStyle={{ fontSize: isMobile ? 8 : 10 }} />
              <Bar dataKey="passeios" fill={chartConfig.passeios.color} name="Passeios" barSize={isMobile ? 8 : 15} />
              <Bar dataKey="hospedagens" fill={chartConfig.hospedagens.color} name="Hospedagens" barSize={isMobile ? 8 : 15} />
              <Bar dataKey="pacotes" fill={chartConfig.pacotes.color} name="Pacotes" barSize={isMobile ? 8 : 15} />
              <Bar dataKey="produtos" fill={chartConfig.produtos.color} name="Produtos" barSize={isMobile ? 8 : 15} />
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
