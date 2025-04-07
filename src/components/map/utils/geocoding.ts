
export const NORONHA_CENTER: [number, number] = [-32.426, -3.854];

// Map of known locations in Fernando de Noronha for more accurate geocoding
const KNOWN_LOCATIONS: Record<string, [number, number]> = {
  "Praia do Sancho": [-32.436, -3.851],
  "Baía dos Porcos": [-32.439, -3.849],
  "Praia do Leão": [-32.451, -3.868],
  "Praia da Conceição": [-32.416, -3.844],
  "Praia do Cachorro": [-32.410, -3.840],
  "Vila dos Remédios": [-32.418, -3.847],
  "Forte Nossa Senhora dos Remédios": [-32.418, -3.847],
  "Porto de Santo Antônio": [-32.413, -3.839],
  "Praia do Sueste": [-32.435, -3.862],
  "Praia do Boldró": [-32.424, -3.848],
  "Praia do Meio": [-32.413, -3.842],
  "Praia da Atalaia": [-32.425, -3.857],
  "Morro Dois Irmãos": [-32.443, -3.850],
  "Centro de Visitantes do ICMBio": [-32.421, -3.845],
};

/**
 * Geocode a location string to coordinates
 * First checks known locations, then falls back to Mapbox API
 */
export const geocodeLocation = async (location: string, token: string): Promise<[number, number]> => {
  try {
    // Check if this is a known location first
    for (const [knownLocation, coordinates] of Object.entries(KNOWN_LOCATIONS)) {
      if (location.toLowerCase().includes(knownLocation.toLowerCase())) {
        return coordinates;
      }
    }
    
    // Check if location contains "Noronha" to determine if we should look on the island
    const isOnIsland = location.toLowerCase().includes("noronha");
    
    // Try to geocode using Mapbox API if token is provided and not specifically on Noronha
    if (token && !isOnIsland) {
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
