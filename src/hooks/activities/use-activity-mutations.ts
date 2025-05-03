
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { activityService } from '@/services/activity-service';
import { toast } from 'sonner';
import type { Activity } from '@/types/activity';

/**
 * Hook for activity mutations (create, update, delete)
 */
export const useActivityMutations = () => {
  const queryClient = useQueryClient();

  // Create activity mutation
  const createMutation = useMutation({
    mutationFn: (data: Omit<Activity, 'id' | 'created_at' | 'updated_at'>) =>
      activityService.createActivity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast.success('Activity created successfully!');
    },
    onError: (error) => {
      console.error('Error creating activity:', error);
      toast.error('Failed to create activity');
    },
  });

  // Update activity mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Activity> }) =>
      activityService.updateActivity(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['activity', data.id] });
      toast.success('Activity updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating activity:', error);
      toast.error('Failed to update activity');
    },
  });

  // Delete activity mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => activityService.deleteActivity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast.success('Activity deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting activity:', error);
      toast.error('Failed to delete activity');
    },
  });

  // Toggle activity featured status
  const toggleFeaturedMutation = useMutation({
    mutationFn: ({
      activityId,
      isFeatured,
    }: {
      activityId: number;
      isFeatured: boolean;
    }) => activityService.updateActivity(activityId, { is_featured: isFeatured }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['activity', data.id] });
      toast.success(
        data.is_featured
          ? 'Activity set as featured!'
          : 'Activity removed from featured!'
      );
    },
    onError: (error) => {
      console.error('Error toggling featured status:', error);
      toast.error('Failed to update featured status');
    },
  });

  // Toggle activity active status
  const toggleActiveMutation = useMutation({
    mutationFn: ({
      activityId,
      isActive,
    }: {
      activityId: number;
      isActive: boolean;
    }) => activityService.updateActivity(activityId, { is_active: isActive }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['activity', data.id] });
      toast.success(
        data.is_active
          ? 'Activity is now active!'
          : 'Activity deactivated!'
      );
    },
    onError: (error) => {
      console.error('Error toggling active status:', error);
      toast.error('Failed to update activity status');
    },
  });

  return {
    createActivity: createMutation.mutate,
    updateActivity: updateMutation.mutate,
    deleteActivity: deleteMutation.mutate,
    toggleActivityFeatured: toggleFeaturedMutation.mutate,
    toggleActivityActive: toggleActiveMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isSaving: createMutation.isPending || updateMutation.isPending,
  };
};
