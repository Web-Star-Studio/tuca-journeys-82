
import React, { useState, useEffect } from "react";
import AccommodationMetricsCards from "./accommodations/AccommodationMetricsCards";
import AccommodationTrendChart from "./accommodations/AccommodationTrendChart";
import AccommodationTypeChart from "./accommodations/AccommodationTypeChart";
import AccommodationRegionDistribution from "./accommodations/AccommodationRegionDistribution";
import { generateAccommodationsReportData } from "./accommodations/AccommodationsDataGenerator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface AccommodationsReportProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onError?: (error: Error) => void;
}

const AccommodationsReport = ({ dateRange, onError }: AccommodationsReportProps) => {
  const [error, setError] = useState<string | null>(null);
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => {
    try {
      // Gerar dados do relatório
      const data = generateAccommodationsReportData();
      
      if (!data || !data.trendData || !data.typeData || !data.regionData) {
        throw new Error("Dados de hospedagens não disponíveis");
      }

      setReportData(data);
      setError(null);
    } catch (err) {
      console.error("Erro em AccommodationsReport:", err);
      const errorMessage = err instanceof Error ? err.message : "Falha ao carregar dados de hospedagens";
      setError(errorMessage);
      if (onError && err instanceof Error) {
        onError(err);
      }
    }
  }, [dateRange, onError]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!reportData) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-center">
          <p className="text-muted-foreground">Carregando dados de hospedagens...</p>
        </div>
      </div>
    );
  }

  const { 
    totalAccommodations, 
    avgOccupancy, 
    avgRating, 
    totalReservations,
    avgPricePerNight
  } = reportData.summaryData;

  return (
    <div className="space-y-6">
      <AccommodationMetricsCards 
        totalAccommodations={totalAccommodations}
        avgOccupancy={avgOccupancy}
        avgRating={avgRating}
        totalReservations={totalReservations}
        avgPricePerNight={avgPricePerNight}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <AccommodationTrendChart 
          data={reportData.trendData} 
          chartConfig={reportData.chartConfig} 
        />
        
        <AccommodationTypeChart typeData={reportData.typeData} />
      </div>
      
      <AccommodationRegionDistribution regionData={reportData.regionData} />
    </div>
  );
};

export default AccommodationsReport;
