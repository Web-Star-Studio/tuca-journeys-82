
import { Booking } from "@/types/bookings";

export interface UserMetrics {
  reservasAtivas: number;
  pontosAcumulados: number;
  diasAteProximaViagem: number;
  statusPerfil: number;
}

export const getDashboardMetrics = (bookings: Booking[]): UserMetrics => {
  const today = new Date();
  const activeBookings = bookings.filter(b => 
    b.status === 'confirmed' && 
    new Date(b.start_date) > today
  );

  const nextBooking = activeBookings.sort((a, b) => 
    new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  )[0];

  const daysUntilNextTrip = nextBooking 
    ? Math.ceil((new Date(nextBooking.start_date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
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
      // Base points from price (1 point per R$ 10)
      const pricePoints = Math.floor(booking.total_price / 10);
      
      // Bonus points for early bookings (30+ days in advance)
      const bookingAdvanceDays = Math.ceil(
        (new Date(booking.start_date).getTime() - new Date(booking.created_at).getTime()) / (1000 * 60 * 60 * 24)
      );
      const earlyBookingBonus = bookingAdvanceDays >= 30 ? 100 : 0;
      
      return total + pricePoints + earlyBookingBonus;
    }
    return total;
  }, 0);
};

const calculateProfileCompletion = (): number => {
  return 65; // Mock profile completion percentage
};
