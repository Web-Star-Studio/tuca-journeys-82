
import { Package } from "@/data/types/packageTypes";
import { getPackagesByCategory } from "@/data/packages";

export interface PackageSaleData {
  name: string;
  vendas: number;
  receita: number;
}

export interface CategorySaleData {
  name: string;
  value: number;
}

export interface TrendData {
  month: string;
  "Romântico": number;
  "Aventura": number;
  "Família": number;
  "Premium": number;
  "Econômico": number;
  "Total": number;
}

export const generatePackageSalesData = (packages: Package[]): PackageSaleData[] => {
  return packages.map(pkg => ({
    name: pkg.title,
    vendas: Math.floor(Math.random() * 50) + 5, // Simulating sales between 5 and 55
    receita: Math.floor(pkg.price * (Math.random() * 50 + 5))
  })).sort((a, b) => b.vendas - a.vendas);
};

export const generateCategorySalesData = (): CategorySaleData[] => {
  const adventurePackages = getPackagesByCategory("adventure");
  const romanticPackages = getPackagesByCategory("romantic");
  const familyPackages = getPackagesByCategory("family");
  const premiumPackages = getPackagesByCategory("premium");
  const budgetPackages = getPackagesByCategory("budget");

  return [
    { name: "Romântico", value: romanticPackages.length * (Math.floor(Math.random() * 30) + 10) },
    { name: "Aventura", value: adventurePackages.length * (Math.floor(Math.random() * 30) + 10) },
    { name: "Família", value: familyPackages.length * (Math.floor(Math.random() * 30) + 10) },
    { name: "Premium", value: premiumPackages.length * (Math.floor(Math.random() * 30) + 10) },
    { name: "Econômico", value: budgetPackages.length * (Math.floor(Math.random() * 30) + 10) }
  ];
};

export const generateTrendData = (): TrendData[] => {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
  
  return months.map(month => {
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
};

// Chart colors
export const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
