
import { BookingsReportData, BookingData, StatusData } from "./BookingsDataTypes";

// Sample data generator for the bookings report
export function generateBookingsReportData(): BookingsReportData {
  // Sample booking data
  const bookingsData: BookingData[] = [
    { month: "Jan", passeios: 180, hospedagens: 120, pacotes: 80, total: 380 },
    { month: "Fev", passeios: 150, hospedagens: 100, pacotes: 70, total: 320 },
    { month: "Mar", passeios: 190, hospedagens: 130, pacotes: 90, total: 410 },
    { month: "Abr", passeios: 210, hospedagens: 140, pacotes: 95, total: 445 },
    { month: "Mai", passeios: 230, hospedagens: 150, pacotes: 100, total: 480 },
    { month: "Jun", passeios: 250, hospedagens: 170, pacotes: 110, total: 530 },
  ];

  // Status data
  const statusData: StatusData[] = [
    { name: "Confirmadas", value: 680, color: "#10b981" },
    { name: "Pendentes", value: 120, color: "#f59e0b" },
    { name: "Canceladas", value: 65, color: "#ef4444" },
  ];

  // Chart configuration
  const chartConfig = {
    passeios: { label: "Passeios", color: "#2563eb" },
    hospedagens: { label: "Hospedagens", color: "#10b981" },
    pacotes: { label: "Pacotes", color: "#f59e0b" },
    total: { label: "Total", color: "#ef4444" },
  };

  // Calculate totals
  const totalBookings = bookingsData.reduce((sum, item) => sum + item.total, 0);
  const confirmedBookings = 680;
  const pendingBookings = 120;
  const canceledBookings = 65;
  const totalVisitors = 2450;
  const passeiosTotal = bookingsData.reduce((sum, item) => sum + item.passeios, 0);
  const hospedagensTotal = bookingsData.reduce((sum, item) => sum + item.hospedagens, 0);
  const pacotesTotal = bookingsData.reduce((sum, item) => sum + item.pacotes, 0);

  return {
    bookingsData,
    statusData,
    chartConfig,
    totalBookings,
    confirmedBookings,
    pendingBookings,
    canceledBookings,
    totalVisitors,
    passeiosTotal,
    hospedagensTotal,
    pacotesTotal
  };
}
