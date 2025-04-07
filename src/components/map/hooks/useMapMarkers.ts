
import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { MutableRefObject } from "react";
import { PointData } from "../utils/mapData";

interface ActivePopup {
  id: string;
  lngLat: mapboxgl.LngLat;
}

interface UseMapMarkersProps {
  map: MutableRefObject<mapboxgl.Map | null>;
  mapToken: string | null;
  filteredMapData: PointData[];
  setActivePopup: React.Dispatch<React.SetStateAction<ActivePopup | null>>;
}

export const useMapMarkers = ({ 
  map, 
  mapToken, 
  filteredMapData, 
  setActivePopup 
}: UseMapMarkersProps) => {
  // Add markers to the map
  useEffect(() => {
    if (!map.current || !mapToken) return;

    // Remove any existing markers
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add markers for filtered data
    filteredMapData.forEach(point => {
      // Create a marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'marker';
      markerElement.style.width = '24px';
      markerElement.style.height = '24px';
      markerElement.style.borderRadius = '50%';
      markerElement.style.backgroundColor = point.color || '#3FB1CE';
      markerElement.style.border = '2px solid white';
      markerElement.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
      markerElement.style.cursor = 'pointer';

      // Create the marker and add it to the map
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(point.coordinates)
        .addTo(map.current);

      // Add click event to show popup
      markerElement.addEventListener('click', () => {
        const lngLat = new mapboxgl.LngLat(
          point.coordinates[0],
          point.coordinates[1]
        );
        
        setActivePopup({
          id: point.id,
          lngLat: lngLat
        });
      });
    });
  }, [map, mapToken, filteredMapData, setActivePopup]);
};
