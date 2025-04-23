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
import { useUserLocation } from "./hooks/useUserLocation";
import { useMapClustering } from "./hooks/useMapClustering";
import LocationControl from "./controls/LocationControl";
import MapControls from "./controls/MapControls";
import { Navigation, Layers } from "lucide-react";

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
  const [useClustering, setUseClustering] = useState<boolean>(true);
  
  // Get user location
  const { userLocation, isLocating, getUserLocation } = useUserLocation();
  
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

  // Center map on user location when available
  useEffect(() => {
    if (map.current && userLocation) {
      map.current.flyTo({
        center: userLocation,
        zoom: 15,
        essential: true
      });
      
      // Add a user marker
      const el = document.createElement('div');
      el.className = 'user-location-marker';
      el.innerHTML = `
        <div class="relative">
          <div class="absolute -inset-1 rounded-full bg-blue-500 opacity-30 animate-ping"></div>
          <div class="relative rounded-full h-5 w-5 bg-blue-500 border-2 border-white"></div>
        </div>
      `;
      
      new mapboxgl.Marker(el)
        .setLngLat(userLocation)
        .addTo(map.current);
      
      toast({
        title: "Localização encontrada",
        description: "O mapa foi centralizado na sua localização atual.",
      });
    }
  }, [userLocation, toast]);

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
        useClustering={useClustering}
        setUseClustering={setUseClustering}
      />
      
      {/* Map Controls */}
      <MapControls position="top-right">
        <LocationControl 
          isLocating={isLocating} 
          getUserLocation={getUserLocation} 
        />
      </MapControls>
      
      {/* Layer Controls */}
      <MapControls position="bottom-left">
        <div className="flex flex-col gap-2">
          <button
            className={`p-2 rounded-full ${useClustering ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} shadow-md`}
            onClick={() => setUseClustering(!useClustering)}
            title={useClustering ? 'Desativar agrupamento' : 'Ativar agrupamento'}
          >
            <Layers size={18} />
          </button>
          <button
            className="p-2 rounded-full bg-white text-gray-700 shadow-md"
            onClick={() => {
              if (map.current) {
                map.current.flyTo({
                  center: [-32.426, -3.854],
                  zoom: 12.5,
                  pitch: 40,
                  essential: true
                });
              }
            }}
            title="Centralizar mapa"
          >
            <Navigation size={18} />
          </button>
        </div>
      </MapControls>
      
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
  useClustering: boolean;
  setUseClustering: React.Dispatch<React.SetStateAction<boolean>>;
}

const MapViewContent: React.FC<MapViewContentProps> = ({
  map,
  mapToken,
  filteredMapData,
  mapData,
  activePopup,
  setActivePopup,
  useClustering
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  
  // Initialize map
  useMapInitialization({ mapContainer, map, mapToken });
  
  // Use markers or clustering based on preference
  if (!useClustering) {
    // Use markers
    useMapMarkers({ map, mapToken, filteredMapData, setActivePopup });
  } else {
    // Use clustering
    useMapClustering({ map, points: filteredMapData, setActivePopup });
  }
  
  // Handle popup
  useMapPopup({ map, activePopup, mapData, setActivePopup });

  return (
    <>
      <div ref={mapContainer} className="h-full w-full rounded-lg shadow-xl" />
      <style>
        {`
        .user-location-marker {
          width: 20px;
          height: 20px;
          z-index: 100;
        }
        `}
      </style>
    </>
  );
};

export default MapView;
