
import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { MutableRefObject } from "react";
import { PointData } from "../utils/mapData";
import { getCategoryIcon } from "../utils/dataToMapPoints";

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
      markerElement.className = 'marker flex items-center justify-center';
      markerElement.style.width = '36px';
      markerElement.style.height = '36px';
      markerElement.style.transform = 'translate(-50%, -100%)';
      
      // Create SVG for marker (pin shape)
      const color = point.color || '#3FB1CE';
      
      // Create pin with category icon if available
      markerElement.innerHTML = `
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 3C12.477 3 8 7.477 8 13C8 19.793 18 33 18 33C18 33 28 19.793 28 13C28 7.477 23.523 3 18 3Z" 
                fill="${color}" stroke="white" stroke-width="2"/>
          <circle cx="18" cy="13" r="4.5" fill="white"/>
        </svg>
      `;
      
      markerElement.style.cursor = 'pointer';
      markerElement.style.pointerEvents = 'auto';

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
