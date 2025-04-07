
import React from "react";

interface MapContainerProps {
  children: React.ReactNode;
}

const MapContainer = ({ children }: MapContainerProps) => {
  return (
    <div className="absolute inset-0 z-10">
      {children}
    </div>
  );
};

export default MapContainer;
