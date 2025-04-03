
import React from "react";
import BookingsReport from "../BookingsReport";
import { generateBookingsReportData } from "./BookingsDataGenerator";

interface BookingsReportContainerProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

const BookingsReportContainer = ({ dateRange }: BookingsReportContainerProps) => {
  // In a real app, we would filter data based on the date range
  // and potentially use useQuery or another data fetching mechanism
  const reportData = generateBookingsReportData();
  
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
