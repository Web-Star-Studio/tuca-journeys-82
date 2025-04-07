
import { useEffect, RefObject } from 'react';
import mapboxgl from 'mapbox-gl';
import { NORONHA_CENTER } from '../utils/mapData';

interface UseMapInitializationProps {
  mapContainer: RefObject<HTMLDivElement>;
  map: RefObject<mapboxgl.Map | null>;
  mapToken: string | null;
}

export const useMapInitialization = ({ mapContainer, map, mapToken }: UseMapInitializationProps) => {
  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;
    
    if (map.current) return; // Não reinicializar o mapa se já existir
    
    mapboxgl.accessToken = mapToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: NORONHA_CENTER,
      zoom: 12.5,
      pitch: 40,
      attributionControl: false,
    });
    
    // Adicionar controles de navegação
    map.current.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: true }),
      'bottom-right'
    );
    
    // Adicionar efeitos de atmosphere e fog
    map.current.on('style.load', () => {
      map.current?.setFog({
        color: 'rgb(220, 230, 240)',
        'high-color': 'rgb(180, 200, 225)',
        'horizon-blend': 0.4,
        'space-color': 'rgb(100, 150, 200)',
        'star-intensity': 0.6
      });
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [mapToken, mapContainer, map]);
};
