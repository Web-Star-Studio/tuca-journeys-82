
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantService } from '@/services/restaurant-service';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { format } from 'date-fns';

export const useRestaurantBooking = (restaurantId: number) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [bookingDate, setBookingDate] = useState<Date | undefined>(undefined);
  const [bookingTime, setBookingTime] = useState<string | undefined>(undefined);
  const [guestCount, setGuestCount] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');

  // Format date and time for availability check
  const formattedDate = bookingDate ? format(bookingDate, 'yyyy-MM-dd') : '';
  
  // Check availability when date and time are selected
  const { data: availableTables, isLoading: checkingAvailability } = useQuery({
    queryKey: ['restaurantAvailability', restaurantId, formattedDate, bookingTime, guestCount],
    queryFn: () => restaurantService.checkAvailability(
      restaurantId, 
      formattedDate, 
      bookingTime || '', 
      guestCount
    ),
    enabled: !!(restaurantId && formattedDate && bookingTime && guestCount > 0),
  });

  // Determine if tables are available
  const hasAvailableTables = !!(availableTables && availableTables.some(table => table.available));
  
  // Mutation for booking
  const bookingMutation = useMutation({
    mutationFn: (reservationData: {
      contact_phone: string;
      contact_email: string;
    }) => {
      if (!user || !bookingDate || !bookingTime) {
        throw new Error('Missing required booking information');
      }
      
      return restaurantService.createReservation({
        restaurant_id: restaurantId,
        user_id: user.id,
        reservation_date: formattedDate,
        reservation_time: bookingTime,
        guests: guestCount,
        status: 'confirmed',
        special_requests: specialRequests || undefined,
        contact_phone: reservationData.contact_phone,
        contact_email: reservationData.contact_email
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userReservations'] });
      toast.success('Reservation booked successfully!');
    },
    onError: (error: any) => {
      console.error('Error booking reservation:', error);
      toast.error(error?.message || 'Failed to book reservation');
    }
  });

  return {
    bookingDate,
    setBookingDate,
    bookingTime,
    setBookingTime,
    guestCount, 
    setGuestCount,
    specialRequests,
    setSpecialRequests,
    availableTables,
    hasAvailableTables,
    checkingAvailability,
    bookRestaurant: bookingMutation.mutate,
    isBooking: bookingMutation.isPending
  };
};

export const useUserReservations = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: userReservations, isLoading, error } = useQuery({
    queryKey: ['userReservations'],
    queryFn: () => user ? restaurantService.getUserReservations(user.id) : Promise.resolve([]),
    enabled: !!user
  });

  const cancelReservationMutation = useMutation({
    mutationFn: (reservationId: number) => restaurantService.cancelReservation(reservationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userReservations'] });
      toast.success('Reservation cancelled successfully!');
    },
    onError: (error) => {
      console.error('Error cancelling reservation:', error);
      toast.error('Failed to cancel reservation');
    }
  });

  return {
    userReservations,
    isLoading,
    error,
    cancelReservation: cancelReservationMutation.mutate,
    isCancelling: cancelReservationMutation.isPending
  };
};
