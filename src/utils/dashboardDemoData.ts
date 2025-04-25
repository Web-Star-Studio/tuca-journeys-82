
import { Booking } from "@/types/bookings";

export interface UserMetrics {
  reservasAtivas: number;
  pontosAcumulados: number;
  diasAteProximaViagem: number;
  statusPerfil: number;
}

export const getDashboardMetrics = (bookings: Booking[]): UserMetrics => {
  const activeBookings = bookings.filter(b => b.status === 'confirmed' && new Date(b.start_date) > new Date());
  const nextBooking = activeBookings.sort((a, b) => 
    new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  )[0];

  const daysUntilNextTrip = nextBooking 
    ? Math.ceil((new Date(nextBooking.start_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return {
    reservasAtivas: activeBookings.length,
    pontosAcumulados: calculatePoints(bookings),
    diasAteProximaViagem: daysUntilNextTrip,
    statusPerfil: calculateProfileCompletion()
  };
};

const calculatePoints = (bookings: Booking[]): number => {
  return bookings.reduce((total, booking) => {
    if (booking.status === 'confirmed') {
      // Points calculation: 1 point per R$ 10 spent
      return total + Math.floor(booking.total_price / 10);
    }
    return total;
  }, 0);
};

const calculateProfileCompletion = (): number => {
  // Mock profile completion percentage
  return 65;
};

