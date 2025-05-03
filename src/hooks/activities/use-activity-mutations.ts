
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { activityService } from '@/services/activity-service';
import { Activity } from '@/types/activity';
import { useState } from 'react';
import { toast } from 'sonner';

export const useActivityMutations = () => {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    mutateAsync: createActivity,
    isPending: isCreating
  } = useMutation({
    mutationFn: activityService.createActivity.bind(activityService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast.success('Atividade criada com sucesso');
    },
    onError: (error) => {
      console.error('Error creating activity:', error);
      toast.error('Erro ao criar atividade');
    }
  });

  const {
    mutateAsync: updateActivity,
    isPending: isUpdating
  } = useMutation({
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

  const deleteActivity = async (id: number) => {
    try {
      setIsDeleting(true);
      await activityService.deleteActivity(id);
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast.success('Atividade excluída com sucesso');
    } catch (error) {
      console.error('Error deleting activity:', error);
      toast.error('Erro ao excluir atividade');
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleActivityFeatured = async (activity: Activity) => {
    try {
      await updateActivity({
        id: activity.id,
        data: { is_featured: !activity.is_featured }
      });
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const toggleActivityActive = async (activity: Activity) => {
    try {
      await updateActivity({
        id: activity.id,
        data: { is_active: !activity.is_active }
      });
    } catch (error) {
      console.error('Error toggling active status:', error);
    }
  };

  return {
    createActivity,
    updateActivity,
    deleteActivity,
    toggleActivityFeatured,
    toggleActivityActive,
    isCreating,
    isUpdating,
    isDeleting
  };
};
