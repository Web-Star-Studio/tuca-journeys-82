
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface CategorySalesChartProps {
  categorySalesData: {
    name: string;
    value: number;
  }[];
  COLORS: string[];
}

const CategorySalesChart = ({ categorySalesData, COLORS }: CategorySalesChartProps) => {
  // Safety check: ensure data is valid
  const validData = Array.isArray(categorySalesData) && categorySalesData.length > 0 
    ? categorySalesData 
    : [{ name: "Sem dados", value: 100 }];
  
  // Ensure we have colors for each category
  const safeColors = COLORS && COLORS.length > 0 
    ? COLORS 
    : ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Vendas por Categoria</CardTitle>
        <CardDescription>
          Distribuição de vendas entre categorias de pacotes
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={validData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {validData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={safeColors[index % safeColors.length]} 
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value} vendas`, 'Quantidade']} 
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategorySalesChart;
