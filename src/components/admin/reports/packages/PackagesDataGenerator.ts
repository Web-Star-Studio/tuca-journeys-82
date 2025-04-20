
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
  if (!packages || !Array.isArray(packages) || packages.length === 0) {
    console.error("No valid packages data provided");
    return [];
  }

  try {
    return packages.map(pkg => ({
      name: pkg.title || "Sem título",
      vendas: Math.floor(Math.random() * 50) + 5, // Simulating sales between 5 and 55
      receita: Math.floor((pkg.price || 0) * (Math.random() * 50 + 5))
    })).sort((a, b) => b.vendas - a.vendas);
  } catch (error) {
    console.error("Error generating package sales data:", error);
    return [];
  }
};

export const generateCategorySalesData = (): CategorySaleData[] => {
  try {
    // Using fixed data for more consistency
    return [
      { name: "Romântico", value: 120 },
      { name: "Aventura", value: 95 },
      { name: "Família", value: 75 },
      { name: "Premium", value: 45 },
      { name: "Econômico", value: 85 }
    ];
  } catch (error) {
    console.error("Error generating category sales data:", error);
    return [];
  }
};

export const generateTrendData = (): TrendData[] => {
  try {
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
    
    // Using fixed data for more consistency
    return [
      {
        month: "Jan",
        "Romântico": 25,
        "Aventura": 18,
        "Família": 12,
        "Premium": 8,
        "Econômico": 32,
        "Total": 95
      },
      {
        month: "Fev",
        "Romântico": 20,
        "Aventura": 15,
        "Família": 10,
        "Premium": 5,
        "Econômico": 30,
        "Total": 80
      },
      {
        month: "Mar",
        "Romântico": 30,
        "Aventura": 20,
        "Família": 15,
        "Premium": 10,
        "Econômico": 35,
        "Total": 110
      },
      {
        month: "Abr",
        "Romântico": 35,
        "Aventura": 25,
        "Família": 18,
        "Premium": 12,
        "Econômico": 40,
        "Total": 130
      },
      {
        month: "Mai",
        "Romântico": 40,
        "Aventura": 30,
        "Família": 20,
        "Premium": 15,
        "Econômico": 45,
        "Total": 150
      },
      {
        month: "Jun",
        "Romântico": 45,
        "Aventura": 32,
        "Família": 22,
        "Premium": 18,
        "Econômico": 48,
        "Total": 165
      }
    ];
  } catch (error) {
    console.error("Error generating trend data:", error);
    return [];
  }
};

// Chart colors
export const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
