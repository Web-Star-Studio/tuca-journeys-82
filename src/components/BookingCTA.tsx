
import React from "react";
import BookingContent from "./booking/BookingContent";
import SafeImage from "@/components/ui/safe-image";

const BookingCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <SafeImage
          src="/lovable-uploads/34dbd7a3-684b-48e2-9fbb-bd35909a80a7.png"
          alt="Fernando de Noronha praia"
          className="w-full h-full object-cover"
        />
        {/* Black overlay with 60% opacity */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <BookingContent />
      </div>
    </section>
  );
};

export default BookingCTA;
