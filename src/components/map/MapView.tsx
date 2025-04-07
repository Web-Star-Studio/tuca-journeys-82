
import React, { useRef, useState, useEffect, useMemo } from "react";
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
import { convertEventsToPoints } from "./MapEventPoints";
import { adaptFiltersForMap } from "./utils/mapFilterAdapter";
import MapContainer from "./MapContainer";

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

  // Get all map data including events
  const mapData = useMemo(() => {
    const baseMapData = getMapData();
    const eventPoints = convertEventsToPoints(events);
    return [...baseMapData, ...eventPoints];
  }, []);
  
  // Filter map data based on applied filters
  const filteredMapData = useMemo(() => {
    const adaptedFilters = adaptFiltersForMap(filters);
    return filterMapData(mapData, adaptedFilters);
  }, [filters, mapData]);

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

  return <MapContainer />;
};

export default MapView;
