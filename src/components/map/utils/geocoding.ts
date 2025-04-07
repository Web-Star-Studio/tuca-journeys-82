
/**
 * Utility for geocoding location strings to coordinates
 */

import mapboxgl from "mapbox-gl";

// Default Noronha coordinates as fallback
export const NORONHA_CENTER: [number, number] = [-32.426, -3.854];

/**
 * Geocode a location string to coordinates using Mapbox Geocoding API
 * @param location Location string to geocode
 * @param mapToken Mapbox access token
 * @returns Promise with coordinates or default coordinates if geocoding fails
 */
export const geocodeLocation = async (
  location: string,
  mapToken: string
): Promise<[number, number]> => {
  try {
    // Use Mapbox Geocoding API to convert location string to coordinates
    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      location
    )}.json?access_token=${mapToken}&limit=1`;

    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      // Mapbox returns coordinates as [longitude, latitude]
      const [lng, lat] = data.features[0].center;
      return [lng, lat];
    } else {
      console.warn(`Geocoding failed for location: ${location}, using default coordinates`);
      return NORONHA_CENTER;
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    return NORONHA_CENTER;
  }
};
