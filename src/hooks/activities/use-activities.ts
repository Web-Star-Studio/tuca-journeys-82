
import { useActivitiesBase, useActivity } from './use-activities-base';
import { useActivityMutations } from './use-activity-mutations';
import { useActivityAvailability } from './use-activity-availability';
import { useSearchActivities } from './use-activity-search';

/**
 * Main hook that combines all activity-related hooks
 */
export const useActivities = () => {
  const baseHook = useActivitiesBase();
  const mutationsHook = useActivityMutations();

  return {
    ...baseHook,
    ...mutationsHook,
  };
};

// Re-export all other hooks for convenience
export { useActivity, useActivityAvailability, useSearchActivities };

// Export types if needed
export type ActivityAvailabilityParams = {
  date: Date;
  availableSpots: number;
  customPrice?: number;
  status?: 'available' | 'unavailable';
};

export type ActivityBulkAvailabilityParams = {
  dates: Date[];
  availableSpots: number;
  customPrice?: number;
  status?: 'available' | 'unavailable';
};
