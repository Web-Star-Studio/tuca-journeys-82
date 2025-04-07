
export const NORONHA_CENTER: [number, number] = [-32.426, -3.854];

/**
 * Geocode a location string to coordinates
 * In a real application, this would call a geocoding API
 * For this demo, we use a simple approximation algorithm
 */
export const geocodeLocation = async (location: string, token: string): Promise<[number, number]> => {
  try {
    // Try to geocode using Mapbox API if location doesn't contain "Noronha"
    if (token && !location.toLowerCase().includes("noronha")) {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${token}`
      );
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        return [lng, lat];
      }
    }
    
    // Fallback to approximate coordinates for Fernando de Noronha
    const locationHash = location.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    // Create variation within a reasonable radius around the island
    const latVariation = (locationHash % 100) / 1000;
    const lngVariation = ((locationHash % 100) + 50) / 1000;
    
    // Return coordinates with some variation
    return [NORONHA_CENTER[0] + lngVariation, NORONHA_CENTER[1] + latVariation];
  } catch (error) {
    console.error("Error geocoding location:", error);
    // Return default coordinates if geocoding fails
    return NORONHA_CENTER;
  }
};
