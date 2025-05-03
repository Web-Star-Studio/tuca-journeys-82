
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { activityService } from '@/services/activity-service';
import { toast } from 'sonner';

export interface ActivityAvailabilityParams {
  date: Date;
  availableSpots: number;
  customPrice?: number;
  status?: 'available' | 'unavailable';
}

export interface ActivityBulkAvailabilityParams {
  dates: Date[];
  availableSpots: number;
  customPrice?: number;
  status?: 'available' | 'unavailable';
  activityId: number; // Added to match the expected type
}

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
    mutationFn: (params: ActivityAvailabilityParams) =>
      activityService.updateActivityAvailability(
        activityId, 
        params.date, 
        params.availableSpots, 
        params.customPrice, 
        params.status || 'available'
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activity-availability', activityId] });
      toast.success('Disponibilidade atualizada com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao atualizar disponibilidade:', error);
      toast.error('Falha ao atualizar disponibilidade');
    },
  });

  // Bulk update availability for multiple dates
  const bulkUpdateAvailabilityMutation = useMutation({
    mutationFn: (params: ActivityBulkAvailabilityParams) =>
      activityService.bulkUpdateActivityAvailability(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activity-availability', activityId] });
      toast.success('Disponibilidade atualizada com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao atualizar disponibilidade em massa:', error);
      toast.error('Falha ao atualizar disponibilidade');
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
