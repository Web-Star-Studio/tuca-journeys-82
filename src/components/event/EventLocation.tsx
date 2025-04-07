
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";
import { geocodeLocation, NORONHA_CENTER } from "../map/utils/geocoding";
import MapTokenButton from "../map/MapTokenButton";

interface EventLocationProps {
  location: string;
}

const EventLocation = ({ location }: EventLocationProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [coordinates, setCoordinates] = useState<[number, number]>(NORONHA_CENTER);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapToken, setMapToken] = useState<string | null>(localStorage.getItem('mapbox_token'));
  
  // Initialize or update map when token or location changes
  useEffect(() => {
    if (!mapContainer.current || !mapToken) {
      setIsLoading(false);
      if (!mapToken) setError("Map token missing");
      return;
    }
    
    // Try to geocode the location
    const fetchCoordinates = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const coords = await geocodeLocation(location, mapToken);
        setCoordinates(coords);
        
        // Initialize map
        mapboxgl.accessToken = mapToken;
        
        if (map.current) {
          map.current.remove();
        }
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: coords,
          zoom: 13,
        });
        
        // Add navigation controls
        map.current.addControl(
          new mapboxgl.NavigationControl({ visualizePitch: true }),
          'bottom-right'
        );
        
        // Add a marker
        new mapboxgl.Marker()
          .setLngLat(coords)
          .addTo(map.current);
          
        map.current.on('load', () => {
          setIsLoading(false);
        });
      } catch (err) {
        console.error("Error initializing map:", err);
        setError("Failed to load map");
        setIsLoading(false);
      }
    };
    
    fetchCoordinates();
    
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [location, mapToken]);
  
  // Handle token update
  const handleUpdateToken = (token: string) => {
    localStorage.setItem('mapbox_token', token);
    setMapToken(token);
  };

  if (!mapToken) {
    return (
      <div className="h-64 bg-gray-200 rounded-lg flex flex-col items-center justify-center">
        <MapPin className="h-8 w-8 text-gray-400 mb-2" />
        <span className="text-gray-500 mb-4">Mapa não disponível - Token Mapbox necessário</span>
        <MapTokenButton onUpdateToken={handleUpdateToken} />
      </div>
    );
  }

  return (
    <div className="h-64 rounded-lg overflow-hidden relative">
      <div ref={mapContainer} className="h-full w-full" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <MapPin className="h-8 w-8 text-gray-400 animate-pulse" />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200">
          <MapPin className="h-8 w-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-600 mb-4">{error}</span>
          <MapTokenButton onUpdateToken={handleUpdateToken} />
        </div>
      )}
      
      {/* Always show token update button */}
      <MapTokenButton onUpdateToken={handleUpdateToken} />
    </div>
  );
};

export default EventLocation;
