
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { activityService } from '@/services/activity-service';
import { Activity } from '@/types/activity';
import { useState } from 'react';
import { toast } from 'sonner';

export const useActivityMutations = () => {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  // Create activity
  const createActivityMutation = useMutation({
    mutationFn: (activityData: Partial<Activity>) => 
      activityService.createActivity(activityData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast.success('Atividade criada com sucesso');
    },
    onError: (error) => {
      console.error('Error creating activity:', error);
      toast.error('Erro ao criar atividade');
    }
  });

  // Update activity
  const updateActivityMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: Partial<Activity> }) => 
      activityService.updateActivity(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast.success('Atividade atualizada com sucesso');
    },
    onError: (error) => {
      console.error('Error updating activity:', error);
      toast.error('Erro ao atualizar atividade');
    }
  });

  // Delete activity
  const deleteActivityMutation = useMutation({
    mutationFn: async (activityId: number) => {
      setIsDeleting(true);
      try {
        await activityService.deleteActivity(activityId);
        return activityId;
      } finally {
        setIsDeleting(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast.success('Atividade excluída com sucesso');
    },
    onError: (error) => {
      console.error('Error deleting activity:', error);
      toast.error('Erro ao excluir atividade');
    }
  });

  // Toggle featured status
  const toggleActivityFeatured = (activity: Activity) => {
    updateActivityMutation.mutate({
      id: activity.id,
      data: {
        ...activity,
        is_featured: !(activity.is_featured ?? false)
      }
    });
  };

  // Toggle active status
  const toggleActivityActive = (activity: Activity) => {
    updateActivityMutation.mutate({
      id: activity.id,
      data: {
        ...activity,
        is_active: !(activity.is_active ?? true)
      }
    });
  };

  return {
    createActivity: createActivityMutation.mutate,
    updateActivity: updateActivityMutation.mutate,
    deleteActivity: deleteActivityMutation.mutate,
    toggleActivityFeatured,
    toggleActivityActive,
    isCreating: createActivityMutation.isPending,
    isUpdating: updateActivityMutation.isPending,
    isDeleting,
  };
};
