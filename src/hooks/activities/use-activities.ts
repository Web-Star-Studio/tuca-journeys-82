
import { useActivitiesBase } from './use-activities-base';
import { useActivityMutations } from './use-activity-mutations';

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
