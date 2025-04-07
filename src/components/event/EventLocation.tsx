
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";

interface EventLocationProps {
  location: string;
}

const EventLocation = ({ location }: EventLocationProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  
  useEffect(() => {
    const mapToken = localStorage.getItem('mapbox_token');
    
    if (!mapContainer.current || !mapToken) return;
    if (map.current) return; // Don't reinitialize
    
    // Initialize map
    mapboxgl.accessToken = mapToken;
    
    // For demonstration purposes, we're using a default location for Fernando de Noronha
    // In a production app, you would geocode the location string to get coordinates
    const coordinates: [number, number] = [-32.426, -3.854]; // Fernando de Noronha approximate coordinates
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: coordinates,
      zoom: 13,
    });
    
    // Add a marker
    new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(map.current);
      
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [location]);
  
  if (!localStorage.getItem('mapbox_token')) {
    return (
      <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <MapPin className="h-8 w-8 text-gray-400 mr-2" />
        <span className="text-gray-500">Mapa não disponível - Token Mapbox necessário</span>
      </div>
    );
  }

  return (
    <div className="h-64 rounded-lg overflow-hidden relative">
      <div ref={mapContainer} className="h-full w-full" />
      {!map.current && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <MapPin className="h-8 w-8 text-gray-400 animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default EventLocation;
