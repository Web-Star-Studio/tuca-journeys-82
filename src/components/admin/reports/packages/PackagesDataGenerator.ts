
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
    // Safely get packages by category
    const getSafeCategoryCount = (category: string) => {
      try {
        const packages = getPackagesByCategory(category);
        return packages && Array.isArray(packages) ? packages.length : 0;
      } catch (error) {
        console.error(`Error getting ${category} packages:`, error);
        return 0;
      }
    };

    const adventureCount = getSafeCategoryCount("adventure");
    const romanticCount = getSafeCategoryCount("romantic");
    const familyCount = getSafeCategoryCount("family");
    const premiumCount = getSafeCategoryCount("premium");
    const budgetCount = getSafeCategoryCount("budget");

    return [
      { name: "Romântico", value: romanticCount * (Math.floor(Math.random() * 30) + 10) },
      { name: "Aventura", value: adventureCount * (Math.floor(Math.random() * 30) + 10) },
      { name: "Família", value: familyCount * (Math.floor(Math.random() * 30) + 10) },
      { name: "Premium", value: premiumCount * (Math.floor(Math.random() * 30) + 10) },
      { name: "Econômico", value: budgetCount * (Math.floor(Math.random() * 30) + 10) }
    ];
  } catch (error) {
    console.error("Error generating category sales data:", error);
    return [];
  }
};

export const generateTrendData = (): TrendData[] => {
  try {
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
  } catch (error) {
    console.error("Error generating trend data:", error);
    return [];
  }
};

// Chart colors
export const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
