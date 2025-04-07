
import React, { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMapFilters } from "@/contexts/MapFilterContext";
import MapTokenInput from "./MapTokenInput";
import "./createRoot";
import { getMapData, PointData } from "./utils/mapData";
import { filterMapData } from "./utils/mapFilter";
import { useMapInitialization } from "./hooks/useMapInitialization";
import { useMapMarkers } from "./hooks/useMapMarkers";
import { useMapPopup } from "./hooks/useMapPopup";
import { events } from "@/data/events";
import { Event } from "@/types/event";

interface ActivePopup {
  id: string;
  lngLat: mapboxgl.LngLat;
}

// Convert events to map point data
const convertEventsToPoints = (events: Event[]): PointData[] => {
  return events.map(event => ({
    id: `event-${event.id}`,
    name: event.name,
    category: event.category,
    description: `${event.date} - ${event.start_time}`,
    // For demonstration, we're using approximate coordinates
    // In a real app, these would come from geocoding or a database
    coordinates: [-32.426 + (Math.random() * 0.02 - 0.01), -3.854 + (Math.random() * 0.02 - 0.01)] as [number, number],
    color: '#4caf50' // Green color for events
  }));
};

const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapToken, setMapToken] = useState<string | null>(localStorage.getItem('mapbox_token'));
  const { filters } = useMapFilters();
  const [activePopup, setActivePopup] = useState<ActivePopup | null>(null);

  // Get all map data including events
  const mapData = React.useMemo(() => {
    const baseMapData = getMapData();
    const eventPoints = convertEventsToPoints(events);
    return [...baseMapData, ...eventPoints];
  }, []);
  
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
