
import React from "react";
import BookingBackground from "./booking/BookingBackground";
import BookingContent from "./booking/BookingContent";

const BookingCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <BookingBackground />
      <div className="container mx-auto px-4 relative z-10">
        <BookingContent />
      </div>
    </section>
  );
};

export default BookingCTA;
