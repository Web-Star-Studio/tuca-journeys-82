
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';
import { useIsMobile } from "@/hooks/use-mobile";

interface CategorySalesChartProps {
  categorySalesData: {
    name: string;
    value: number;
  }[];
  COLORS: string[];
}

const CategorySalesChart = ({ categorySalesData, COLORS }: CategorySalesChartProps) => {
  const isMobile = useIsMobile();
  
  const renderLabel = ({ name, percent }: { name: string, percent: number }) => {
    if (isMobile && name.length > 8) {
      name = name.substring(0, 8) + '..';
    }
    return `${name}: ${(percent * 100).toFixed(0)}%`;
  };
  
  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Vendas por Categoria</CardTitle>
        <CardDescription>
          Distribuição das vendas por tipo de pacote
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 sm:h-80">
          <ChartContainer
            config={{
              "Romântico": { color: COLORS[0] },
              "Aventura": { color: COLORS[1] },
              "Família": { color: COLORS[2] },
              "Premium": { color: COLORS[3] },
              "Econômico": { color: COLORS[4] }
            }}
            height="100%"
          >
            <PieChart>
              <ChartTooltip
                content={props => (
                  <ChartTooltipContent
                    {...props}
                    formatter={(value, name) => [`${value} vendas`, name]}
                  />
                )}
              />
              <Pie
                data={categorySalesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={isMobile ? 70 : 100}
                fill="#8884d8"
                dataKey="value"
                label={renderLabel}
              >
                {categorySalesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySalesChart;
