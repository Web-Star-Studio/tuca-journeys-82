
// Sample data - in a real application, this would come from an API
export const revenueData = [
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
export const chartConfig = {
  passeios: { label: "Passeios", color: "#2563eb" },
  hospedagens: { label: "Hospedagens", color: "#10b981" },
  pacotes: { label: "Pacotes", color: "#f59e0b" },
  produtos: { label: "Produtos", color: "#8b5cf6" },
  total: { label: "Total", color: "#ef4444" },
};

// Calculate totals and growth
export const calculateRevenueTotals = () => {
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.total, 0);
  const lastMonthRevenue = revenueData[revenueData.length - 1].total;
  const previousMonthRevenue = revenueData[revenueData.length - 2].total;
  const growthRate = ((lastMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
  const isPositiveGrowth = growthRate >= 0;
  const avgMonthlyRevenue = totalRevenue / revenueData.length;

  // Calculate category totals
  const passeiosTotal = revenueData.reduce((sum, item) => sum + item.passeios, 0);
  const hospedagensTotal = revenueData.reduce((sum, item) => sum + item.hospedagens, 0);
  const pacotesTotal = revenueData.reduce((sum, item) => sum + item.pacotes, 0);
  const produtosTotal = revenueData.reduce((sum, item) => sum + item.produtos, 0);

  return {
    totalRevenue,
    lastMonthRevenue,
    previousMonthRevenue,
    growthRate,
    isPositiveGrowth,
    avgMonthlyRevenue,
    passeiosTotal,
    hospedagensTotal,
    pacotesTotal,
    produtosTotal
  };
};
