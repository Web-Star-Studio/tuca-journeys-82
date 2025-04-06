
import React, { useEffect, useState } from "react";
import { packages } from "@/data/packages";
import {
  generatePackageSalesData,
  generateCategorySalesData,
  generateTrendData,
  CHART_COLORS
} from "./packages/PackagesDataGenerator";
import PackageSummaryCards from "./packages/PackageSummaryCards";
import CategorySalesChart from "./packages/CategorySalesChart";
import TrendSalesChart from "./packages/TrendSalesChart";
import PackagePerformanceTable from "./packages/PackagePerformanceTable";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface PackagesReportProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onError?: (error: Error) => void;
}

const PackagesReport = ({ dateRange, onError }: PackagesReportProps) => {
  const [packageSalesData, setPackageSalesData] = useState([]);
  const [categorySalesData, setCategorySalesData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    try {
      // Make sure packages data is available
      if (!packages || packages.length === 0) {
        throw new Error("Dados de pacotes não estão disponíveis");
      }
      
      // Generate data for reports
      const packageSales = generatePackageSalesData(packages);
      const categoryData = generateCategorySalesData();
      const trendingData = generateTrendData();
      
      if (!packageSales || !categoryData || !trendingData) {
        throw new Error("Falha ao gerar os dados dos relatórios");
      }
      
      setPackageSalesData(packageSales);
      setCategorySalesData(categoryData);
      setTrendData(trendingData);
      setError(null);
    } catch (err) {
      console.error("Error in PackagesReport:", err);
      setError(err.message || "Erro ao carregar dados dos pacotes");
      if (onError && err instanceof Error) {
        onError(err);
      }
    }
  }, [dateRange, onError]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (!packageSalesData.length || !categorySalesData.length || !trendData.length) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-center">
          <p className="text-muted-foreground">Carregando dados dos relatórios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <PackageSummaryCards 
        packageSalesData={packageSalesData} 
        categorySalesData={categorySalesData} 
      />

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <CategorySalesChart 
          categorySalesData={categorySalesData} 
          COLORS={CHART_COLORS} 
        />
        <TrendSalesChart 
          trendData={trendData} 
          COLORS={CHART_COLORS} 
        />
      </div>

      {/* Performance Table */}
      <PackagePerformanceTable 
        packageSalesData={packageSalesData} 
        packages={packages} 
      />
    </div>
  );
};

export default PackagesReport;
