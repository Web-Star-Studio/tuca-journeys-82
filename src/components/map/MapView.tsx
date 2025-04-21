
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useTours } from "@/hooks/use-tours";
import "mapbox-gl/dist/mapbox-gl.css";
import { Loader2 } from "lucide-react";

// Set Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || "";

interface MapViewProps {
  center?: [number, number];
  zoom?: number;
  interactive?: boolean;
  className?: string;
  height?: string;
}

const MapView: React.FC<MapViewProps> = ({
  center = [-32.424, -3.849], // Fernando de Noronha coordinates
  zoom = 12,
  interactive = true,
  className = "",
  height = "500px",
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const toursHook = useTours();
  const { tours, isLoading } = toursHook;

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      // Initialize map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: center,
        zoom: zoom,
        interactive,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl());
    }

    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [center, zoom, interactive]);

  // Add markers for tours when data is loaded
  useEffect(() => {
    if (map.current && tours && tours.length > 0) {
      // Remove any existing markers first
      const existingMarkers = document.querySelectorAll(".mapboxgl-marker");
      existingMarkers.forEach((marker) => marker.remove());

      // Add markers for each tour
      tours.forEach((tour) => {
        if (tour.location) {
          try {
            // Parse location string into coordinates
            const locationCoords = typeof tour.location === 'string' ? 
              JSON.parse(tour.location) : tour.location;

            if (Array.isArray(locationCoords) && locationCoords.length === 2) {
              const [lng, lat] = locationCoords;

              // Create marker element
              const el = document.createElement("div");
              el.className = "tour-marker";
              el.style.width = "25px";
              el.style.height = "25px";
              el.style.borderRadius = "50%";
              el.style.background = "#0EA5E9";
              el.style.border = "2px solid white";
              el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";
              el.style.cursor = "pointer";

              // Add popup
              const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<h3>${tour.title}</h3><p>${tour.short_description}</p>`
              );

              // Add marker to map
              new mapboxgl.Marker(el)
                .setLngLat([lng, lat])
                .setPopup(popup)
                .addTo(map.current!);
            }
          } catch (error) {
            console.error(`Error parsing location for tour ${tour.id}:`, error);
          }
        }
      });
    }
  }, [tours]);

  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div
      ref={mapContainer}
      className={`rounded-lg overflow-hidden ${className}`}
      style={{ height }}
    />
  );
};

export default MapView;
