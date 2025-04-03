
import React from "react";
import BookingsSummaryCards from "./bookings/BookingsSummaryCards";
import BookingsTrendChart from "./bookings/BookingsTrendChart";
import BookingsStatusChart from "./bookings/BookingsStatusChart";
import BookingsDistributionChart from "./bookings/BookingsDistributionChart";
import { BookingData, StatusData, BookingChartConfig } from "./bookings/BookingsDataTypes";

interface BookingsReportProps {
  bookingsData: BookingData[];
  statusData: StatusData[];
  chartConfig: BookingChartConfig;
  summaryStats: {
    totalBookings: number;
    confirmedBookings: number;
    pendingBookings: number;
    totalVisitors: number;
  };
  distributionTotals: {
    passeiosTotal: number;
    hospedagensTotal: number;
    pacotesTotal: number;
    totalBookings: number;
  };
}

const BookingsReport = ({
  bookingsData,
  statusData,
  chartConfig,
  summaryStats,
  distributionTotals
}: BookingsReportProps) => {
  return (
    <div className="space-y-6">
      <BookingsSummaryCards stats={summaryStats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BookingsTrendChart 
          data={bookingsData} 
          chartConfig={chartConfig} 
        />
        
        <BookingsStatusChart statusData={statusData} />
      </div>
      
      <BookingsDistributionChart 
        data={bookingsData} 
        chartConfig={chartConfig} 
        totals={distributionTotals} 
      />
    </div>
  );
};

export default BookingsReport;
