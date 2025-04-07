
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
import { useIsBelowBreakpoint } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";

const BookingsTable = () => {
  const { bookings, isLoading, cancelBooking } = useBookings();
  const isMobile = useIsBelowBreakpoint("md");

  if (isLoading) {
    return <BookingLoadingState />;
  }

  if (!bookings || bookings.length === 0) {
    return <BookingEmptyState />;
  }

  return (
    <Card className="bg-white rounded-lg shadow-sm overflow-hidden border">
      <div className="overflow-x-auto">
        <Table>
          <BookingsTableHeader />
          <TableBody>
            {bookings.map((booking) => (
              <BookingRow 
                key={booking.id} 
                booking={booking} 
                cancelBooking={cancelBooking}
                compact={isMobile}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default BookingsTable;
