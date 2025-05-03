
// Re-export all activity-related components and hooks
export { useActivitiesBase, useActivity } from '@/hooks/activities';
export { useActivityAvailability } from '@/hooks/activities/use-activity-availability';
export { useSearchActivities } from '@/hooks/activities/use-activity-search';
export { useActivityMutations } from '@/hooks/activities/use-activity-mutations';
// Export constants and types
export { ACTIVITY_CATEGORIES, ACTIVITY_DIFFICULTY_LEVELS } from '@/types/activity';
export type { Activity, ActivityAvailability, ActivityFilters, ActivityBooking } from '@/types/activity';
