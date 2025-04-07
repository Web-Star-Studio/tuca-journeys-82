
import React from "react";
import { useBookings } from "@/hooks/use-bookings";
import {
  Table,
  TableBody,
} from "@/components/ui/table";
import BookingEmptyState from "./BookingEmptyState";
import BookingLoadingState from "./BookingLoadingState";
import BookingRow from "./BookingRow";
import BookingsTableHeader from "./BookingsTableHeader";

const BookingsTable = () => {
  const { bookings, isLoading, cancelBooking } = useBookings();

  if (isLoading) {
    return <BookingLoadingState />;
  }

  if (!bookings || bookings.length === 0) {
    return <BookingEmptyState />;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border">
      <div className="overflow-x-auto">
        <Table>
          <BookingsTableHeader />
          <TableBody>
            {bookings.map((booking) => (
              <BookingRow 
                key={booking.id} 
                booking={booking} 
                cancelBooking={cancelBooking} 
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BookingsTable;
