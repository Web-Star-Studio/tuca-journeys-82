
import { useBookingsList } from './use-bookings-list';
import { useBookingDetails } from './use-booking-details';
import { useCancelBooking } from './use-cancel-booking';
import { useCreateBooking } from './use-create-booking';

/**
 * @deprecated Use specific hooks instead:
 * - useBookingsList for listing bookings
 * - useBookingDetails for getting booking details
 * - useCancelBooking for cancelling bookings
 * - useCreateBooking for creating bookings
 */
export const useBookings = () => {
  const { bookings, isLoading, error } = useBookingsList();
  const { cancelBooking, isCancelling } = useCancelBooking();
  
  return {
    bookings,
    isLoading,
    error,
    cancelBooking,
    isCancelling
  };
};

// Re-export all booking hooks for backward compatibility
export { useBookingsList } from './use-bookings-list';
export { useBookingDetails } from './use-booking-details';
export { useCancelBooking } from './use-cancel-booking';
export { useCreateBooking } from './use-create-booking';
