
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
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
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { packages, getPackagesByCategory } from "@/data/packages";

interface PackagesReportProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

const PackagesReport = ({ dateRange }: PackagesReportProps) => {
  // Generate sales data by package
  const packageSalesData = packages.map(pkg => ({
    name: pkg.title,
    vendas: Math.floor(Math.random() * 50) + 5, // Simulating sales between 5 and 55
    receita: Math.floor(pkg.price * (Math.random() * 50 + 5))
  })).sort((a, b) => b.vendas - a.vendas);

  // Calculate sales by category
  const adventurePackages = getPackagesByCategory("adventure");
  const romanticPackages = getPackagesByCategory("romantic");
  const familyPackages = getPackagesByCategory("family");
  const premiumPackages = getPackagesByCategory("premium");
  const budgetPackages = getPackagesByCategory("budget");

  const categorySalesData = [
    { name: "Romântico", value: romanticPackages.length * (Math.floor(Math.random() * 30) + 10) },
    { name: "Aventura", value: adventurePackages.length * (Math.floor(Math.random() * 30) + 10) },
    { name: "Família", value: familyPackages.length * (Math.floor(Math.random() * 30) + 10) },
    { name: "Premium", value: premiumPackages.length * (Math.floor(Math.random() * 30) + 10) },
    { name: "Econômico", value: budgetPackages.length * (Math.floor(Math.random() * 30) + 10) }
  ];

  // Monthly trend data
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
  const trendData = months.map(month => {
    // Calculate random values for each category
    const romantic = Math.floor(Math.random() * 40) + 20;
    const adventure = Math.floor(Math.random() * 35) + 15;
    const family = Math.floor(Math.random() * 30) + 10;
    const premium = Math.floor(Math.random() * 25) + 5;
    const budget = Math.floor(Math.random() * 50) + 30;
    
    return {
      month,
      "Romântico": romantic,
      "Aventura": adventure,
      "Família": family,
      "Premium": premium,
      "Econômico": budget,
      "Total": romantic + adventure + family + premium + budget
    };
  });

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total de Pacotes</CardTitle>
            <CardDescription>Número de pacotes vendidos no período</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categorySalesData.reduce((acc, curr) => acc + curr.value, 0)}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 30) + 5}% em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Receita Total</CardTitle>
            <CardDescription>Valor total gerado no período</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {packageSalesData.reduce((acc, curr) => acc + curr.receita, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 20) + 10}% em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Ticket Médio</CardTitle>
            <CardDescription>Valor médio por venda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {Math.floor(
                packageSalesData.reduce((acc, curr) => acc + curr.receita, 0) / 
                packageSalesData.reduce((acc, curr) => acc + curr.vendas, 0)
              ).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 15) + 2}% em relação ao período anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Vendas por Categoria</CardTitle>
            <CardDescription>
              Distribuição das vendas por tipo de pacote
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
                  "Econômico": { color: COLORS[4] }
                }}
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
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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
                  <ChartTooltip
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Desempenho por Pacote</CardTitle>
          <CardDescription>
            Lista dos pacotes mais vendidos no período
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pacote</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Vendas</TableHead>
                <TableHead>Receita</TableHead>
                <TableHead>% do Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packageSalesData.slice(0, 5).map((pkg, index) => {
                const totalSales = packageSalesData.reduce((acc, curr) => acc + curr.vendas, 0);
                const percentage = ((pkg.vendas / totalSales) * 100).toFixed(1);
                
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{pkg.name}</TableCell>
                    <TableCell>
                      R$ {packages.find(p => p.title === pkg.name)?.price.toLocaleString()}
                    </TableCell>
                    <TableCell>{pkg.vendas}</TableCell>
                    <TableCell>R$ {pkg.receita.toLocaleString()}</TableCell>
                    <TableCell>{percentage}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackagesReport;
