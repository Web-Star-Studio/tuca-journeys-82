
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRestaurantBooking } from '@/hooks/use-restaurant-booking';
import { useAuth } from '@/contexts/AuthContext';
import { Restaurant } from '@/types/restaurant';
import { toast } from 'sonner';

interface BookingFormProps {
  restaurant: Restaurant;
}

const TIME_SLOTS = [
  '11:30', '12:00', '12:30', '13:00', '13:30', 
  '14:00', '18:00', '18:30', '19:00', '19:30', 
  '20:00', '20:30', '21:00', '21:30'
];

const RestaurantBookingForm: React.FC<BookingFormProps> = ({ restaurant }) => {
  const { user, isLoading: authLoading } = useAuth();
  
  const {
    bookingDate,
    setBookingDate,
    bookingTime,
    setBookingTime,
    guestCount,
    setGuestCount,
    specialRequests,
    setSpecialRequests,
    hasAvailableTables,
    checkingAvailability,
    bookRestaurant,
    isBooking
  } = useRestaurantBooking(restaurant.id);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      contactPhone: '',
      contactEmail: user?.email || '',
    }
  });

  const onSubmit = (data: any) => {
    if (!user) {
      toast.error('Please sign in to make a reservation');
      return;
    }

    if (!bookingDate) {
      toast.error('Please select a date');
      return;
    }

    if (!bookingTime) {
      toast.error('Please select a time');
      return;
    }

    bookRestaurant({
      contact_phone: data.contactPhone,
      contact_email: data.contactEmail
    });
  };

  if (authLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="p-4 border rounded-lg bg-muted/20">
        <h3 className="font-semibold text-lg mb-2">Make a Reservation</h3>
        <p className="mb-4">Please sign in to book a table at {restaurant.name}.</p>
        <Button asChild>
          <a href="/login?redirect=/restaurantes">Sign In</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold text-lg mb-4">Book a Table</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !bookingDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {bookingDate ? format(bookingDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={bookingDate}
                onSelect={setBookingDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <div className="grid grid-cols-4 gap-2">
            {TIME_SLOTS.map((time) => (
              <Button
                key={time}
                type="button"
                variant={bookingTime === time ? "default" : "outline"}
                className="text-center flex justify-center"
                onClick={() => setBookingTime(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="guests">Number of Guests</Label>
          <div className="flex">
            <Button
              type="button"
              variant="outline"
              className="rounded-r-none"
              onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
            >
              -
            </Button>
            <div className="flex-1 flex items-center justify-center border-y">
              {guestCount}
            </div>
            <Button
              type="button"
              variant="outline"
              className="rounded-l-none"
              onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
            >
              +
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPhone">Phone Number</Label>
          <Input
            id="contactPhone"
            {...register('contactPhone', { required: true })}
            placeholder="Enter phone number"
            aria-invalid={errors.contactPhone ? 'true' : 'false'}
          />
          {errors.contactPhone && (
            <p className="text-sm text-red-500">Phone number is required</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactEmail">Email</Label>
          <Input
            id="contactEmail"
            type="email"
            {...register('contactEmail', { required: true })}
            placeholder="Enter email"
            aria-invalid={errors.contactEmail ? 'true' : 'false'}
            defaultValue={user.email || ''}
          />
          {errors.contactEmail && (
            <p className="text-sm text-red-500">Email is required</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="specialRequests">Special Requests</Label>
          <Textarea
            id="specialRequests"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="E.g. dietary requirements, special occasions, seating preferences"
            rows={3}
          />
        </div>
        
        {bookingDate && bookingTime && (
          <div className="rounded-lg bg-muted p-3">
            {checkingAvailability ? (
              <p className="text-center">Checking availability...</p>
            ) : hasAvailableTables ? (
              <p className="text-center text-green-600">Tables available!</p>
            ) : (
              <p className="text-center text-red-500">No tables available for this time. Please try another time.</p>
            )}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full"
          disabled={!hasAvailableTables || isBooking || !bookingDate || !bookingTime}
        >
          {isBooking ? "Booking..." : "Book Now"}
        </Button>
      </form>
    </div>
  );
};

export default RestaurantBookingForm;
