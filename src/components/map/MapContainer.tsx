
import React, { useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapContainerProps {
  children?: React.ReactNode;
}

const MapContainer = ({ children }: MapContainerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  return (
    <div className="absolute inset-0 z-10">
      <div ref={mapContainer} className="h-full w-full rounded-lg shadow-xl" />
      {children}
    </div>
  );
};

export default MapContainer;
