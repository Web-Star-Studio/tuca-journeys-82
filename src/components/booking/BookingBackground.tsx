
import React from "react";

const BookingBackground = () => {
  return (
    <>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-noronha-sunset.jpg" 
          alt="Fernando de Noronha Sunset" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm" />
      </div>
    </>
  );
};

export default BookingBackground;
