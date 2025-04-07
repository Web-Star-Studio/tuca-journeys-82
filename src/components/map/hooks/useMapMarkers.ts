
import { useEffect, RefObject, MutableRefObject } from 'react';
import mapboxgl from 'mapbox-gl';
import { PointData } from '../utils/mapData';

interface UseMapMarkersProps {
  map: MutableRefObject<mapboxgl.Map | null>; // Changed from RefObject to MutableRefObject
  mapToken: string | null;
  filteredMapData: PointData[];
  setActivePopup: (popup: { id: string; lngLat: mapboxgl.LngLat } | null) => void;
}

export const useMapMarkers = ({ map, mapToken, filteredMapData, setActivePopup }: UseMapMarkersProps) => {
  useEffect(() => {
    if (!map.current || !mapToken) return;

    // Remover todos os marcadores existentes
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
    existingMarkers.forEach(marker => marker.remove());
    
    // Adicionar marcadores filtrados
    filteredMapData.forEach(point => {
      const markerElement = document.createElement('div');
      markerElement.className = `marker-container ${point.category}`;
      
      const markerIcon = document.createElement('div');
      markerIcon.className = `
        w-6 h-6 rounded-full flex items-center justify-center 
        ${point.category === 'tours' ? 'bg-tuca-ocean-blue' : ''} 
        ${point.category === 'accommodations' ? 'bg-green-500' : ''} 
        ${point.category === 'restaurants' ? 'bg-amber-500' : ''} 
        ${point.category === 'beaches' ? 'bg-blue-400' : ''} 
        ${point.category === 'attractions' ? 'bg-purple-500' : ''}
        shadow-md cursor-pointer hover:scale-110 transition-all duration-300
      `;
      
      const iconElement = document.createElement('span');
      iconElement.className = 'text-white text-xs font-bold';
      iconElement.textContent = point.category.charAt(0).toUpperCase();
      
      markerIcon.appendChild(iconElement);
      markerElement.appendChild(markerIcon);
      
      // Criar e adicionar o marcador
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([point.lng, point.lat])
        .addTo(map.current!);
      
      // Adicionar evento de clique para exibir popup
      markerElement.addEventListener('click', () => {
        setActivePopup({
          id: point.id,
          lngLat: marker.getLngLat(),
        });
      });
    });
  }, [filteredMapData, mapToken, map, setActivePopup]);
};
