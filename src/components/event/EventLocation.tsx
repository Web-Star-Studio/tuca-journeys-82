
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";
import { geocodeLocation, NORONHA_CENTER } from "../map/utils/geocoding";
import MapTokenButton from "../map/MapTokenButton";
import { Link } from "react-router-dom";

interface EventLocationProps {
  location: string;
  eventId?: number;
}

const EventLocation = ({ location, eventId }: EventLocationProps) => {
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
        const markerElement = document.createElement('div');
        markerElement.className = 'marker flex items-center justify-center';
        markerElement.style.width = '36px';
        markerElement.style.height = '36px';
        markerElement.style.transform = 'translate(-50%, -100%)';
        
        // Create pin with green color for events
        markerElement.innerHTML = `
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 3C12.477 3 8 7.477 8 13C8 19.793 18 33 18 33C18 33 28 19.793 28 13C28 7.477 23.523 3 18 3Z" 
                  fill="#4caf50" stroke="white" stroke-width="2"/>
            <circle cx="18" cy="13" r="4.5" fill="white"/>
          </svg>
        `;
        
        new mapboxgl.Marker(markerElement)
          .setLngLat(coords)
          .addTo(map.current);
          
        // Add location popup
        new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: [0, -30]
        })
        .setLngLat(coords)
        .setHTML(`<div class="text-xs font-medium p-1">${location}</div>`)
        .addTo(map.current);
          
        map.current.on('load', () => {
          // Add 3D buildings for a nicer look
          if (map.current?.getLayer('building')) {
            map.current.setLayoutProperty('building', 'visibility', 'visible');
            map.current.setPaintProperty('building', 'fill-extrusion-height', [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ]);
          }
          
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
      
      {/* View on full map link */}
      <Link 
        to={`/mapa?highlight=${eventId ? `event-${eventId}` : ''}`}
        className="absolute bottom-3 left-3 bg-white rounded-md shadow-md px-3 py-1 flex items-center gap-1 text-sm text-gray-700 hover:bg-gray-100"
      >
        <MapPin size={14} />
        Ver no mapa completo
      </Link>
      
      {/* Always show token update button */}
      <MapTokenButton onUpdateToken={handleUpdateToken} />
    </div>
  );
};

export default EventLocation;
