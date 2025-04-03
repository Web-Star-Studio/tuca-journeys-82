import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Line, ComposedChart } from "recharts";
import { ArrowUpIcon, ArrowDownIcon, DollarSign, TrendingUp, Calendar } from "lucide-react";

// Sample data - in a real application, this would come from an API
const revenueData = [
  {
    month: "Jan",
    passeios: 20000,
    hospedagens: 15000,
    pacotes: 30000,
    produtos: 5000,
    total: 70000,
  },
  {
    month: "Fev",
    passeios: 22000,
    hospedagens: 16000,
    pacotes: 32000,
    produtos: 5500,
    total: 75500,
  },
  {
    month: "Mar",
    passeios: 25000,
    hospedagens: 18000,
    pacotes: 35000,
    produtos: 6000,
    total: 84000,
  },
  {
    month: "Abr",
    passeios: 23000,
    hospedagens: 17000,
    pacotes: 33000,
    produtos: 5800,
    total: 78800,
  },
  {
    month: "Mai",
    passeios: 26000,
    hospedagens: 19000,
    pacotes: 36000,
    produtos: 6200,
    total: 87200,
  },
  {
    month: "Jun",
    passeios: 28000,
    hospedagens: 21000,
    pacotes: 38000,
    produtos: 6500,
    total: 93500,
  },
];

// Color configurations for the chart
const chartConfig = {
  passeios: { label: "Passeios", color: "#2563eb" },
  hospedagens: { label: "Hospedagens", color: "#10b981" },
  pacotes: { label: "Pacotes", color: "#f59e0b" },
  produtos: { label: "Produtos", color: "#8b5cf6" },
  total: { label: "Total", color: "#ef4444" },
};

interface RevenueReportProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

const RevenueReport = ({ dateRange }: RevenueReportProps) => {
  // In a real app, we would filter data based on the date range
  
  // Calculate totals and growth
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.total, 0);
  const lastMonthRevenue = revenueData[revenueData.length - 1].total;
  const previousMonthRevenue = revenueData[revenueData.length - 2].total;
  const growthRate = ((lastMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
  const isPositiveGrowth = growthRate >= 0;

  // Calculate category totals
  const passeiosTotal = revenueData.reduce((sum, item) => sum + item.passeios, 0);
  const hospedagensTotal = revenueData.reduce((sum, item) => sum + item.hospedagens, 0);
  const pacotesTotal = revenueData.reduce((sum, item) => sum + item.pacotes, 0);
  const produtosTotal = revenueData.reduce((sum, item) => sum + item.produtos, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Receita Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="font-bold text-2xl">R$ {totalRevenue.toLocaleString('pt-BR')}</div>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Crescimento Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-bold text-2xl">
                  {growthRate.toFixed(1)}%
                </span>
                {isPositiveGrowth ? (
                  <ArrowUpIcon className="h-4 w-4 ml-1 text-green-500" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 ml-1 text-red-500" />
                )}
              </div>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Mês Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="font-bold text-2xl">
                R$ {lastMonthRevenue.toLocaleString('pt-BR')}
              </div>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Receita Média Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="font-bold text-2xl">
                R$ {(totalRevenue / revenueData.length).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </div>
              <CalculatorIcon className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
      
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
                <ChartTooltip
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Receita</CardTitle>
            <CardDescription>
              Proporção de cada categoria na receita total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: chartConfig.passeios.color }}></div>
                    <span>Passeios</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">R$ {passeiosTotal.toLocaleString('pt-BR')}</span>
                    <span className="text-sm text-muted-foreground">
                      ({((passeiosTotal / totalRevenue) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full" 
                    style={{ 
                      width: `${(passeiosTotal / totalRevenue) * 100}%`,
                      backgroundColor: chartConfig.passeios.color 
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: chartConfig.hospedagens.color }}></div>
                    <span>Hospedagens</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">R$ {hospedagensTotal.toLocaleString('pt-BR')}</span>
                    <span className="text-sm text-muted-foreground">
                      ({((hospedagensTotal / totalRevenue) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full" 
                    style={{ 
                      width: `${(hospedagensTotal / totalRevenue) * 100}%`,
                      backgroundColor: chartConfig.hospedagens.color 
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: chartConfig.pacotes.color }}></div>
                    <span>Pacotes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">R$ {pacotesTotal.toLocaleString('pt-BR')}</span>
                    <span className="text-sm text-muted-foreground">
                      ({((pacotesTotal / totalRevenue) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full" 
                    style={{ 
                      width: `${(pacotesTotal / totalRevenue) * 100}%`,
                      backgroundColor: chartConfig.pacotes.color 
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: chartConfig.produtos.color }}></div>
                    <span>Produtos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">R$ {produtosTotal.toLocaleString('pt-BR')}</span>
                    <span className="text-sm text-muted-foreground">
                      ({((produtosTotal / totalRevenue) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full" 
                    style={{ 
                      width: `${(produtosTotal / totalRevenue) * 100}%`,
                      backgroundColor: chartConfig.produtos.color 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Comparativo Anual</CardTitle>
            <CardDescription>
              Comparação com o mesmo período do ano anterior
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Dados disponíveis a partir de Janeiro/2023</p>
              <p className="mt-2">Comparativo anual será habilitado em 2024</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Define the missing icon
const CalculatorIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="16" height="20" x="4" y="2" rx="2" />
    <line x1="8" x2="16" y1="6" y2="6" />
    <line x1="8" x2="8" y1="14" y2="14" />
    <line x1="8" x2="8" y1="18" y2="18" />
    <line x1="12" x2="12" y1="14" y2="14" />
    <line x1="12" x2="12" y1="18" y2="18" />
    <line x1="16" x2="16" y1="14" y2="14" />
    <line x1="16" x2="16" y1="18" y2="18" />
  </svg>
);

export default RevenueReport;
