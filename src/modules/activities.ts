
// Re-export all activity-related components and hooks
export { useActivitiesBase, useActivity, useActivityAvailability, useSearchActivities } from '@/hooks/activities';
// Export constants and types
export { ACTIVITY_CATEGORIES, ACTIVITY_DIFFICULTY_LEVELS } from '@/types/activity';
export type { Activity, ActivityAvailability, ActivityFilters, ActivityBooking } from '@/types/activity';
