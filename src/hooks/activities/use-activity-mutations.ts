
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Activity } from '@/types/activity';
import { activityService } from '@/services/activity-service';
import { toast } from 'sonner';

/**
 * Hook for activity mutations (create, update, delete)
 */
export const useActivityMutations = () => {
  const queryClient = useQueryClient();

  // Create activity mutation
  const createMutation = useMutation({
    mutationFn: (activityData: Partial<Activity>) => {
      return activityService.createActivity(activityData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast.success('Atividade criada com sucesso');
    },
    onError: (error: any) => {
      toast.error(`Erro ao criar atividade: ${error.message}`);
    }
  });

  // Update activity mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Activity> }) => {
      return activityService.updateActivity(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast.success('Atividade atualizada com sucesso');
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar atividade: ${error.message}`);
    }
  });

  // Delete activity mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return activityService.deleteActivity(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast.success('Atividade excluída com sucesso');
    },
    onError: (error: any) => {
      toast.error(`Erro ao excluir atividade: ${error.message}`);
    }
  });

  // Toggle activity featured status
  const toggleFeaturedMutation = useMutation({
    mutationFn: ({ activityId, isFeatured }: { activityId: number; isFeatured: boolean }) => {
      return activityService.updateActivity(activityId, { is_featured: isFeatured });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar destaque da atividade: ${error.message}`);
    }
  });

  // Toggle activity active status
  const toggleActiveMutation = useMutation({
    mutationFn: ({ activityId, isActive }: { activityId: number; isActive: boolean }) => {
      return activityService.updateActivity(activityId, { is_active: isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar status da atividade: ${error.message}`);
    }
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
