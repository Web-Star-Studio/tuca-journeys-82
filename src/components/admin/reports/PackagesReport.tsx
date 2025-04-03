
import React from "react";
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

interface PackagesReportProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

const PackagesReport = ({ dateRange }: PackagesReportProps) => {
  // Generate data for reports
  const packageSalesData = generatePackageSalesData(packages);
  const categorySalesData = generateCategorySalesData();
  const trendData = generateTrendData();

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
