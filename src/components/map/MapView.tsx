
import React, { useRef, useState, useEffect, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMapFilters } from "@/contexts/MapFilterContext";
import MapTokenInput from "./MapTokenInput";
import MapContainer from "./MapContainer";
import MapTokenButton from "./MapTokenButton";
import "./createRoot";
import { getMapData, PointData } from "./utils/mapData";
import { filterMapData } from "./utils/mapFilter";
import { useMapInitialization } from "./hooks/useMapInitialization";
import { useMapMarkers } from "./hooks/useMapMarkers";
import { useMapPopup } from "./hooks/useMapPopup";
import { events } from "@/data/events";
import { accommodations } from "@/data/accommodations";
import { adaptFiltersForMap } from "./utils/mapFilterAdapter";
import { getAllMapPoints } from "./utils/dataToMapPoints";
import { useToast } from "@/components/ui/use-toast";
import { useTours } from "@/hooks/use-tours";

interface ActivePopup {
  id: string;
  lngLat: mapboxgl.LngLat;
}

const MapView = () => {
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapToken, setMapToken] = useState<string | null>(localStorage.getItem('mapbox_token'));
  const { filters } = useMapFilters();
  const [activePopup, setActivePopup] = useState<ActivePopup | null>(null);
  const { toast } = useToast();
  
  // Get tours data using the existing hook
  const { tours, isLoading, error } = useTours();

  // Get all map data including base locations, events, accommodations, and tours
  const mapData = useMemo(() => {
    const baseMapData = getMapData();
    
    // Combine all data sources
    let allPoints: PointData[] = [...baseMapData];
    
    try {
      if (tours) {
        allPoints = getAllMapPoints(accommodations, tours, events);
      } else {
        // If tours aren't loaded yet, just use what we have
        allPoints = getAllMapPoints(accommodations, [], events);
      }
    } catch (error) {
      console.error("Error combining map data:", error);
    }
    
    return allPoints;
  }, [tours]);
  
  useEffect(() => {
    if (error) {
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar todos os dados para o mapa.",
        variant: "destructive"
      });
    }
  }, [error, toast]);
  
  // Filter map data based on applied filters
  const filteredMapData = useMemo(() => {
    const adaptedFilters = adaptFiltersForMap(filters);
    return filterMapData(mapData, adaptedFilters);
  }, [filters, mapData]);

  // Save token to localStorage
  const handleTokenSubmit = (token: string) => {
    localStorage.setItem('mapbox_token', token);
    setMapToken(token);
    toast({
      title: "Token atualizado",
      description: "O token do Mapbox foi atualizado com sucesso.",
    });
  };

  if (!mapToken) {
    return <MapTokenInput onSubmit={handleTokenSubmit} />;
  }

  return (
    <MapContainer>
      {/* Initialize map */}
      <MapViewContent 
        map={map}
        mapToken={mapToken}
        filteredMapData={filteredMapData}
        mapData={mapData}
        activePopup={activePopup}
        setActivePopup={setActivePopup}
      />
      
      {/* Token update button */}
      <MapTokenButton onUpdateToken={handleTokenSubmit} />
    </MapContainer>
  );
};

// Separate component to handle map initialization and data
interface MapViewContentProps {
  map: React.MutableRefObject<mapboxgl.Map | null>;
  mapToken: string;
  filteredMapData: PointData[];
  mapData: PointData[];
  activePopup: ActivePopup | null;
  setActivePopup: React.Dispatch<React.SetStateAction<ActivePopup | null>>;
}

const MapViewContent: React.FC<MapViewContentProps> = ({
  map,
  mapToken,
  filteredMapData,
  mapData,
  activePopup,
  setActivePopup
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  
  // Initialize map
  useMapInitialization({ mapContainer, map, mapToken });
  
  // Handle markers
  useMapMarkers({ map, mapToken, filteredMapData, setActivePopup });
  
  // Handle popup
  useMapPopup({ map, activePopup, mapData, setActivePopup });

  return <div ref={mapContainer} className="h-full w-full rounded-lg shadow-xl" />;
};

export default MapView;
