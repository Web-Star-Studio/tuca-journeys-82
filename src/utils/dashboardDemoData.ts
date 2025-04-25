
import { Booking } from "@/types/bookings";

export interface UserMetrics {
  reservasAtivas: number;
  pontosAcumulados: number;
  diasAteProximaViagem: number;
  statusPerfil: number;
}

export const getDashboardMetrics = (bookings: Booking[]): UserMetrics => {
  console.log("Calculating metrics from bookings:", bookings);
  
  const today = new Date();
  // Filter for active (confirmed) bookings with future dates
  const activeBookings = bookings.filter(b => 
    b.status === 'confirmed' && 
    new Date(b.start_date) > today
  );
  
  console.log("Active bookings:", activeBookings);

  // Sort bookings by date to find the next upcoming one
  const sortedFutureBookings = [...activeBookings].sort((a, b) => 
    new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  );
  
  const nextBooking = sortedFutureBookings[0];
  console.log("Next booking:", nextBooking);

  // Calculate days until next trip
  const daysUntilNextTrip = nextBooking 
    ? Math.ceil((new Date(nextBooking.start_date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  // Calculate metrics
  return {
    reservasAtivas: activeBookings.length,
    pontosAcumulados: calculatePoints(bookings),
    diasAteProximaViagem: daysUntilNextTrip,
    statusPerfil: calculateProfileCompletion()
  };
};

const calculatePoints = (bookings: Booking[]): number => {
  console.log("Calculating points for bookings:", bookings);
  
  return bookings.reduce((total, booking) => {
    if (booking.status === 'confirmed') {
      // Base points from price (1 point per R$ 10)
      const pricePoints = Math.floor(booking.total_price / 10);
      
      // Bonus points for early bookings (30+ days in advance)
      const bookingAdvanceDays = booking.created_at && booking.start_date ? Math.ceil(
        (new Date(booking.start_date).getTime() - new Date(booking.created_at).getTime()) / (1000 * 60 * 60 * 24)
      ) : 0;
      
      const earlyBookingBonus = bookingAdvanceDays >= 30 ? 100 : 0;
      
      const bookingPoints = pricePoints + earlyBookingBonus;
      console.log(`Booking ${booking.id}: ${pricePoints} price points + ${earlyBookingBonus} early booking bonus = ${bookingPoints} total`);
      
      return total + bookingPoints;
    }
    return total;
  }, 0);
};

const calculateProfileCompletion = (): number => {
  return 65; // Mock profile completion percentage
};
