
export interface BookingData {
  month: string;
  passeios: number;
  hospedagens: number;
  pacotes: number;
  total: number;
}

export interface StatusData {
  name: string;
  value: number;
  color: string;
}

export interface BookingChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

export interface BookingsReportData {
  bookingsData: BookingData[];
  statusData: StatusData[];
  chartConfig: BookingChartConfig;
  totalBookings: number;
  confirmedBookings: number;
  pendingBookings: number;
  canceledBookings: number;
  totalVisitors: number;
  passeiosTotal: number;
  hospedagensTotal: number;
  pacotesTotal: number;
}
