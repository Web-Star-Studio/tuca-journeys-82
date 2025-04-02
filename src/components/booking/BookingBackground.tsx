
import React from "react";

const BookingBackground = () => {
  return (
    <>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/1058335/pexels-photo-1058335.jpeg?auto=compress&cs=tinysrgb&w=1920" 
          alt="Fernando de Noronha Sunset" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm" />
      </div>
    </>
  );
};

export default BookingBackground;
