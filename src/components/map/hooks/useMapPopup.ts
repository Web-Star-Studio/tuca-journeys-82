
import { useEffect, RefObject } from 'react';
import mapboxgl from 'mapbox-gl';
import { PointData } from '../utils/mapData';
import MapPopup from '../MapPopup';
import '../createRoot';

interface UseMapPopupProps {
  map: RefObject<mapboxgl.Map | null>;
  activePopup: { id: string; lngLat: mapboxgl.LngLat } | null;
  mapData: PointData[];
  setActivePopup: (popup: { id: string; lngLat: mapboxgl.LngLat } | null) => void;
}

export const useMapPopup = ({ map, activePopup, mapData, setActivePopup }: UseMapPopupProps) => {
  useEffect(() => {
    if (!map.current || !activePopup) return;
    
    const point = mapData.find(p => p.id === activePopup.id);
    if (!point) return;
    
    const popupNode = document.createElement('div');
    const root = document.createRoot(popupNode);
    
    root.render(
      <MapPopup 
        point={point} 
        onClose={() => setActivePopup(null)} 
      />
    );
    
    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(activePopup.lngLat)
      .setDOMContent(popupNode)
      .addTo(map.current);
    
    popup.on('close', () => setActivePopup(null));
    
    return () => {
      popup.remove();
      root.unmount();
    };
  }, [activePopup, mapData, map, setActivePopup]);
};
