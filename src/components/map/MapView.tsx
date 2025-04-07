
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMapFilters } from "@/contexts/MapFilterContext";
import { tours } from "@/data/tours";
import { accommodations } from "@/data/accommodations";
import MapPopup from "./MapPopup";
import MapTokenInput from "./MapTokenInput";
import "./createRoot";

// Point data interface
interface PointData {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  rating: number;
  image: string;
  price?: number;
}

// Todos os pontos de interesse em Fernando de Noronha
const poiData: PointData[] = [
  // Praias
  { id: "beach-1", name: "Praia do Sancho", category: "beaches", lat: -3.851389, lng: -32.442222, rating: 5, image: "/lovable-uploads/1da99f74-2aae-4813-af7f-d1cd24839a2d.png" },
  { id: "beach-2", name: "Baía dos Porcos", category: "beaches", lat: -3.854444, lng: -32.444444, rating: 5, image: "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png" },
  { id: "beach-3", name: "Praia do Leão", category: "beaches", lat: -3.863611, lng: -32.422222, rating: 4.5, image: "/lovable-uploads/1ee83aef-4d58-4201-9998-59a29833ea4e.png" },
  { id: "beach-4", name: "Praia da Cacimba do Padre", category: "beaches", lat: -3.840833, lng: -32.439444, rating: 4.7, image: "/lovable-uploads/949f8aa0-19c8-4df4-b751-b730f41db238.png" },
  
  // Atrações
  { id: "attr-1", name: "Forte Nossa Senhora dos Remédios", category: "attractions", lat: -3.836111, lng: -32.423611, rating: 4.2, image: "/lovable-uploads/29f781ec-249e-490d-b220-30ce02793db1.png" },
  { id: "attr-2", name: "Mirante dos Golfinhos", category: "attractions", lat: -3.840000, lng: -32.428333, rating: 4.8, image: "/lovable-uploads/1ee83aef-4d58-4201-9998-59a29833ea4e.png" },
  { id: "attr-3", name: "Morro Dois Irmãos", category: "attractions", lat: -3.840278, lng: -32.441944, rating: 4.9, image: "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png" },
  
  // Restaurantes
  { id: "rest-1", name: "Restaurante Mergulhão", category: "restaurants", lat: -3.836667, lng: -32.416111, rating: 4.6, image: "/lovable-uploads/949f8aa0-19c8-4df4-b751-b730f41db238.png" },
  { id: "rest-2", name: "Restaurante Tartaruga", category: "restaurants", lat: -3.839444, lng: -32.419722, rating: 4.4, image: "/lovable-uploads/1da99f74-2aae-4813-af7f-d1cd24839a2d.png" },
  { id: "rest-3", name: "Bar do Meio", category: "restaurants", lat: -3.835000, lng: -32.417222, rating: 4.0, image: "/lovable-uploads/29f781ec-249e-490d-b220-30ce02793db1.png" },
];

// Posição central de Fernando de Noronha
const NORONHA_CENTER: [number, number] = [-32.423611, -3.8425];

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

  // Transformar dados de tours e acomodações para o formato do mapa
  const mapData = React.useMemo(() => {
    const transformedTours = tours.map(tour => ({
      id: `tour-${tour.id}`,
      name: tour.title,
      category: "tours" as const,
      lat: -3.835 - Math.random() * 0.03, // Posição aproximada em Fernando de Noronha
      lng: -32.42 - Math.random() * 0.03,  // Posição aproximada em Fernando de Noronha
      rating: tour.rating,
      image: tour.image,
      price: tour.price,
    }));

    const transformedAccommodations = accommodations.map(acc => ({
      id: `acc-${acc.id}`,
      name: acc.title,
      category: "accommodations" as const,
      lat: -3.835 - Math.random() * 0.03, // Posição aproximada em Fernando de Noronha
      lng: -32.42 - Math.random() * 0.03,  // Posição aproximada em Fernando de Noronha
      rating: acc.rating,
      image: acc.image,
      price: acc.price,
    }));

    return [...poiData, ...transformedTours, ...transformedAccommodations];
  }, []);
  
  // Filtrar os pontos do mapa com base nos filtros aplicados
  const filteredMapData = React.useMemo(() => {
    return mapData.filter(point => {
      // Filtrar por categoria
      if (!filters.categories.includes(point.category as any)) {
        return false;
      }
      
      // Filtrar por busca
      if (filters.searchQuery && !point.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filtrar por avaliação
      if (filters.rating && point.rating < filters.rating) {
        return false;
      }
      
      // Filtrar por faixa de preço
      if ('price' in point && filters.priceRange !== 'all') {
        if (filters.priceRange === 'low' && point.price && point.price > 300) return false;
        if (filters.priceRange === 'medium' && point.price && (point.price <= 300 || point.price > 800)) return false;
        if (filters.priceRange === 'high' && point.price && point.price <= 800) return false;
      }
      
      return true;
    });
  }, [filters, mapData]);

  // Salvar token no localStorage
  const handleTokenSubmit = (token: string) => {
    localStorage.setItem('mapbox_token', token);
    setMapToken(token);
  };

  // Inicializar e atualizar o mapa
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
  }, [mapToken]);

  // Adicionar ou atualizar marcadores quando os filtros mudarem
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

  }, [filteredMapData, mapToken]);
  
  // Renderizar popup quando um marcador for clicado
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
  }, [activePopup, mapData]);

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
