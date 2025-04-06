
import React, { useState, useEffect } from "react";
import { revenueData, calculateRevenueTotals } from "./revenue/RevenueDataGenerator";
import RevenueSummaryCards from "./revenue/RevenueSummaryCards";
import RevenueCategoryChart from "./revenue/RevenueCategoryChart";
import RevenueDistribution from "./revenue/RevenueDistribution";
import YearlyComparison from "./revenue/YearlyComparison";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface RevenueReportProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onError?: (error: Error) => void;
}

const RevenueReport = ({ dateRange, onError }: RevenueReportProps) => {
  const [error, setError] = useState<string | null>(null);
  const [totals, setTotals] = useState<any>(null);
  
  useEffect(() => {
    try {
      if (!revenueData || revenueData.length === 0) {
        throw new Error("Dados de receita não disponíveis");
      }
      
      const calculatedTotals = calculateRevenueTotals();
      setTotals(calculatedTotals);
      setError(null);
    } catch (err) {
      console.error("Error in RevenueReport:", err);
      setError(err.message || "Falha ao carregar dados de receita");
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

  if (!totals) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-center">
          <p className="text-muted-foreground">Carregando dados de receita...</p>
        </div>
      </div>
    );
  }

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
  } = totals;

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
