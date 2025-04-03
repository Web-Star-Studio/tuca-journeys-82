
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipProps
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
  
  // Custom tooltip component to fix type errors
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-md shadow-md">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">{`${payload[0].value} vendas`}</p>
        </div>
      );
    }
    return null;
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
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
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
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySalesChart;
