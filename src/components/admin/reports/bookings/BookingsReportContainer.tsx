
import React, { useState, useEffect } from "react";
import BookingsReport from "../BookingsReport";
import { generateBookingsReportData } from "./BookingsDataGenerator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface BookingsReportContainerProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onError?: (error: Error) => void;
}

const BookingsReportContainer = ({ dateRange, onError }: BookingsReportContainerProps) => {
  const [reportData, setReportData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    try {
      // Generate report data (in a real app, we'd fetch from API)
      const data = generateBookingsReportData();
      
      if (!data || !data.bookingsData || !data.statusData) {
        throw new Error("Dados de reservas não disponíveis ou incompletos");
      }
      
      setReportData(data);
      setError(null);
    } catch (err) {
      console.error("Error in BookingsReportContainer:", err);
      setError(err.message || "Falha ao carregar dados de reservas");
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

  if (!reportData) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-center">
          <p className="text-muted-foreground">Carregando dados de reservas...</p>
        </div>
      </div>
    );
  }
  
  const summaryStats = {
    totalBookings: reportData.totalBookings,
    confirmedBookings: reportData.confirmedBookings,
    pendingBookings: reportData.pendingBookings,
    totalVisitors: reportData.totalVisitors
  };
  
  const distributionTotals = {
    passeiosTotal: reportData.passeiosTotal,
    hospedagensTotal: reportData.hospedagensTotal,
    pacotesTotal: reportData.pacotesTotal,
    totalBookings: reportData.totalBookings
  };

  return (
    <BookingsReport
      bookingsData={reportData.bookingsData}
      statusData={reportData.statusData}
      chartConfig={reportData.chartConfig}
      summaryStats={summaryStats}
      distributionTotals={distributionTotals}
    />
  );
};

export default BookingsReportContainer;
