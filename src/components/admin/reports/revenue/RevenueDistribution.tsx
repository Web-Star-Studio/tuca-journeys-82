
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip, TooltipProps } from "recharts";

interface RevenueDistributionProps {
  totalRevenue: number;
  passeiosTotal: number;
  hospedagensTotal: number;
  pacotesTotal: number;
  produtosTotal: number;
}

const RevenueDistribution = ({
  totalRevenue,
  passeiosTotal,
  hospedagensTotal,
  pacotesTotal,
  produtosTotal,
}: RevenueDistributionProps) => {
  const data = [
    { name: "Passeios", value: passeiosTotal },
    { name: "Hospedagens", value: hospedagensTotal },
    { name: "Pacotes", value: pacotesTotal },
    { name: "Produtos", value: produtosTotal },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  
  // Create config object for ChartContainer
  const chartConfig = Object.fromEntries(
    data.map((item, index) => [item.name, { 
      label: item.name, 
      color: COLORS[index % COLORS.length] 
    }])
  );

  // Create a custom tooltip component to fix type errors
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-md shadow-md">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">{`R$ ${Number(payload[0].value).toLocaleString('pt-BR')}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição da Receita</CardTitle>
        <CardDescription>
          Percentual de receita por categoria de serviço
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex flex-col items-center justify-center">
          {totalRevenue > 0 ? (
            <ChartContainer config={chartConfig} className="w-full h-[300px]">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ChartContainer>
          ) : (
            <div className="text-center text-muted-foreground">
              Nenhuma receita registrada no período selecionado.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueDistribution;
