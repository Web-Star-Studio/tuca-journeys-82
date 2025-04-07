import React, { useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMapFilters } from "@/contexts/MapFilterContext";
import MapTokenInput from "./MapTokenInput";
import "./createRoot";
import { getMapData } from "./utils/mapData";
import { filterMapData } from "./utils/mapFilter";
import { useMapInitialization } from "./hooks/useMapInitialization";
import { useMapMarkers } from "./hooks/useMapMarkers";
import { useMapPopup } from "./hooks/useMapPopup";

interface ActivePopup {
  id: string;
  lngLat: mapboxgl.LngLat;
}

const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapToken, setMapToken] = useState<string | null>(localStorage.getItem('mapbox_token'));
  const { filters } = useMapFilters();
  const [activePopup, setActivePopup] = useState<ActivePopup | null>(null);

  // Get all map data
  const mapData = React.useMemo(() => getMapData(), []);
  
  // Filter map data based on applied filters
  const filteredMapData = React.useMemo(
    () => filterMapData(mapData, filters), 
    [filters, mapData]
  );

  // Initialize map
  useMapInitialization({ mapContainer, map, mapToken });
  
  // Handle markers
  useMapMarkers({ map, mapToken, filteredMapData, setActivePopup });
  
  // Handle popup
  useMapPopup({ map, activePopup, mapData, setActivePopup });

  // Save token to localStorage
  const handleTokenSubmit = (token: string) => {
    localStorage.setItem('mapbox_token', token);
    setMapToken(token);
  };

  if (!mapToken) {
    return <MapTokenInput onSubmit={handleTokenSubmit} />;
  }

  return (
    <div className="absolute inset-0 z-10">
      <div ref={mapContainer} className="h-full w-full rounded-lg shadow-xl" />
    </div>
  );
};

export default MapView;
