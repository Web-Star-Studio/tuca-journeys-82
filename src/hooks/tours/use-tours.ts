
import { useToursBase, useTour } from './use-tours-base';
import { useTourMutations } from './use-tour-mutations';
import { useTourAvailability } from './use-tour-availability';
import { useSearchTours } from './use-tour-search';

/**
 * Main hook that combines all tour-related hooks
 */
export const useTours = () => {
  const baseHook = useToursBase();
  const mutationsHook = useTourMutations();

  return {
    ...baseHook,
    ...mutationsHook,
  };
};

// Re-export all other hooks for convenience
export { useTour, useTourAvailability, useSearchTours };

// Export types if needed
export type TourAvailabilityParams = {
  date: Date;
  availableSpots: number;
  customPrice?: number;
  status?: 'available' | 'unavailable';
};

export type TourBulkAvailabilityParams = {
  dates: Date[];
  availableSpots: number;
  customPrice?: number;
  status?: 'available' | 'unavailable';
};
