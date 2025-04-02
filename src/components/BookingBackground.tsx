
import React from "react";

const BookingBackground = () => {
  return (
    <>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/1da99f74-2aae-4813-af7f-d1cd24839a2d.png" 
          alt="Fernando de Noronha" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm" />
      </div>
    </>
  );
};

export default BookingBackground;
