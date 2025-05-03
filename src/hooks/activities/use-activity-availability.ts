
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { activityService } from '@/services/activity-service';
import { toast } from 'sonner';
import { ActivityAvailabilityParams, ActivityBulkAvailabilityParams } from './use-activities';

/**
 * Hook to manage activity availability
 */
export const useActivityAvailability = (activityId: number) => {
  const queryClient = useQueryClient();

  // Fetch availability for a specific activity
  const { data: availability, isLoading } = useQuery({
    queryKey: ['activity-availability', activityId],
    queryFn: () => activityService.getActivityAvailability(activityId),
    enabled: !!activityId,
  });

  // Add or update availability for a specific date
  const updateAvailabilityMutation = useMutation({
    mutationFn: ({ date, availableSpots, customPrice, status }: ActivityAvailabilityParams) =>
      activityService.updateActivityAvailability(
        activityId, 
        date, 
        availableSpots, 
        customPrice, 
        status || 'available'
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activity-availability', activityId] });
      toast.success('Availability updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating availability:', error);
      toast.error('Failed to update availability');
    },
  });

  // Bulk update availability for multiple dates
  const bulkUpdateAvailabilityMutation = useMutation({
    mutationFn: ({ dates, availableSpots, customPrice, status }: ActivityBulkAvailabilityParams) =>
      // Since bulk update isn't implemented yet, we'll use the single update for now
      Promise.all(
        dates.map(date => 
          activityService.updateActivityAvailability(
            activityId, 
            date, 
            availableSpots, 
            customPrice, 
            status || 'available'
          )
        )
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activity-availability', activityId] });
      toast.success('Availability bulk updated successfully!');
    },
    onError: (error) => {
      console.error('Error bulk updating availability:', error);
      toast.error('Failed to bulk update availability');
    },
  });

  return {
    availability,
    isLoading,
    updateAvailability: updateAvailabilityMutation.mutate,
    bulkUpdateAvailability: bulkUpdateAvailabilityMutation.mutate,
    isUpdating: updateAvailabilityMutation.isPending || bulkUpdateAvailabilityMutation.isPending,
  };
};
