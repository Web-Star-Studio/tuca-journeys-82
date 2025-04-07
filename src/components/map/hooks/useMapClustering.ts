
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { PointData } from '../utils/mapData';
import { MutableRefObject } from 'react';

interface UseMapClusteringProps {
  map: MutableRefObject<mapboxgl.Map | null>;
  points: PointData[];
  sourceId?: string;
  setActivePopup: (popup: { id: string, lngLat: mapboxgl.LngLat } | null) => void;
}

export const useMapClustering = ({
  map,
  points,
  sourceId = 'clustered-points',
  setActivePopup
}: UseMapClusteringProps) => {
  useEffect(() => {
    if (!map.current) return;
    
    // Check if source already exists
    if (map.current.getSource(sourceId)) {
      // Update data if source exists
      const source = map.current.getSource(sourceId) as mapboxgl.GeoJSONSource;
      const geoJson = createGeoJson(points);
      source.setData(geoJson);
      return;
    }

    // Wait for map to be loaded before adding source and layers
    if (!map.current.isStyleLoaded()) {
      map.current.once('load', () => setupClusteredMap(map.current!, points, sourceId, setActivePopup));
    } else {
      setupClusteredMap(map.current, points, sourceId, setActivePopup);
    }

    return () => {
      if (map.current) {
        if (map.current.getSource(sourceId)) {
          map.current.removeLayer('clusters');
          map.current.removeLayer('cluster-count');
          map.current.removeLayer('unclustered-point');
          map.current.removeSource(sourceId);
        }
      }
    };
  }, [map, points, sourceId, setActivePopup]);
};

// Helper function to create GeoJSON from points
const createGeoJson = (points: PointData[]) => {
  return {
    type: 'FeatureCollection',
    features: points.map(point => ({
      type: 'Feature',
      properties: {
        id: point.id,
        name: point.name,
        category: point.category,
        description: point.description || '',
        color: point.color || '#3FB1CE',
        price: point.price,
        rating: point.rating
      },
      geometry: {
        type: 'Point',
        coordinates: point.coordinates
      }
    }))
  } as GeoJSON.FeatureCollection;
};

const setupClusteredMap = (
  map: mapboxgl.Map,
  points: PointData[],
  sourceId: string,
  setActivePopup: (popup: { id: string, lngLat: mapboxgl.LngLat } | null) => void
) => {
  const geoJson = createGeoJson(points);
  
  // Add a new source from our GeoJSON data
  map.addSource(sourceId, {
    type: 'geojson',
    data: geoJson,
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50
  });
  
  // Add clustered points layer
  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: sourceId,
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#51bbd6', // Small clusters
        10,
        '#42A5F5', // Medium clusters
        30,
        '#1976D2' // Large clusters
      ],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        20, // Radius for clusters with < 10 points
        10,
        25, // Radius for clusters with < 30 points
        30,
        30 // Radius for clusters with >= 30 points
      ],
      'circle-stroke-width': 2,
      'circle-stroke-color': '#fff'
    }
  });
  
  // Add cluster count text layer
  map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: sourceId,
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12
    },
    paint: {
      'text-color': '#ffffff'
    }
  });
  
  // Add individual point layer
  map.addLayer({
    id: 'unclustered-point',
    type: 'circle',
    source: sourceId,
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': ['get', 'color'],
      'circle-radius': 10,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#fff'
    }
  });
  
  // Handle clicks on clusters
  map.on('click', 'clusters', (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['clusters']
    });
    
    const clusterId = features[0].properties?.cluster_id;
    if (!clusterId) return;
    
    const source = map.getSource(sourceId) as mapboxgl.GeoJSONSource;
    source.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) return;
      
      const coordinates = features[0].geometry.type === 'Point' 
        ? (features[0].geometry as GeoJSON.Point).coordinates 
        : [0, 0];
        
      map.easeTo({
        center: [coordinates[0], coordinates[1]],
        zoom: zoom + 1
      });
    });
  });
  
  // Handle clicks on individual points
  map.on('click', 'unclustered-point', (e) => {
    if (!e.features || e.features.length === 0) return;
    
    const feature = e.features[0];
    const properties = feature.properties;
    
    if (properties && properties.id) {
      const coordinates = feature.geometry.type === 'Point' 
        ? (feature.geometry as GeoJSON.Point).coordinates 
        : [0, 0];
      
      const lngLat = new mapboxgl.LngLat(coordinates[0], coordinates[1]);
      setActivePopup({
        id: properties.id,
        lngLat
      });
    }
  });
  
  // Change cursor when hovering over clusters or points
  map.on('mouseenter', 'clusters', () => {
    map.getCanvas().style.cursor = 'pointer';
  });
  
  map.on('mouseleave', 'clusters', () => {
    map.getCanvas().style.cursor = '';
  });
  
  map.on('mouseenter', 'unclustered-point', () => {
    map.getCanvas().style.cursor = 'pointer';
  });
  
  map.on('mouseleave', 'unclustered-point', () => {
    map.getCanvas().style.cursor = '';
  });
};
