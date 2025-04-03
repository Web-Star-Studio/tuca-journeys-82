
import React from "react";
import { revenueData, calculateRevenueTotals } from "./revenue/RevenueDataGenerator";
import RevenueSummaryCards from "./revenue/RevenueSummaryCards";
import RevenueCategoryChart from "./revenue/RevenueCategoryChart";
import RevenueDistribution from "./revenue/RevenueDistribution";
import YearlyComparison from "./revenue/YearlyComparison";

interface RevenueReportProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

const RevenueReport = ({ dateRange }: RevenueReportProps) => {
  // In a real app, we would filter data based on the date range
  const {
    totalRevenue,
    lastMonthRevenue,
    growthRate,
    isPositiveGrowth,
    avgMonthlyRevenue,
    passeiosTotal,
    hospedagensTotal,
    pacotesTotal,
    produtosTotal
  } = calculateRevenueTotals();

  return (
    <div className="space-y-6">
      <RevenueSummaryCards
        totalRevenue={totalRevenue}
        lastMonthRevenue={lastMonthRevenue}
        growthRate={growthRate}
        isPositiveGrowth={isPositiveGrowth}
        avgMonthlyRevenue={avgMonthlyRevenue}
      />
      
      <RevenueCategoryChart />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RevenueDistribution
          totalRevenue={totalRevenue}
          passeiosTotal={passeiosTotal}
          hospedagensTotal={hospedagensTotal}
          pacotesTotal={pacotesTotal}
          produtosTotal={produtosTotal}
        />
        
        <YearlyComparison />
      </div>
    </div>
  );
};

export default RevenueReport;
