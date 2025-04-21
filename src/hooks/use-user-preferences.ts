
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from '@/contexts/AuthContext';
import { UserPreferences } from '@/types/database';
import { toast } from 'sonner';

export const useUserPreferences = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const { data: preferences, isLoading, error } = useQuery({
    queryKey: ['user-preferences', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('preferences')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        return data?.preferences as UserPreferences | null;
      } catch (error: any) {
        console.error('Erro ao carregar preferências:', error);
        return null;
      }
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // Cache por 5 minutos
  });
  
  const updatePreferencesMutation = useMutation({
    mutationFn: async (newPreferences: Partial<UserPreferences>) => {
      if (!user?.id) throw new Error('Usuário não autenticado');
      
      // Mesclar com preferências existentes
      const updatedPreferences = {
        ...(preferences || {}),
        ...newPreferences
      };
      
      // Converter para objeto plano para o Supabase
      const preferencesObj = JSON.parse(JSON.stringify(updatedPreferences));
      
      const { error } = await supabase
        .from('user_profiles')
        .update({ preferences: preferencesObj })
        .eq('id', user.id);
      
      if (error) throw error;
      
      return updatedPreferences;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user-preferences', user?.id], data);
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      toast.success('Preferências atualizadas com sucesso');
    },
    onError: (error: any) => {
      console.error('Erro ao atualizar preferências:', error);
      toast.error(`Erro ao salvar preferências: ${error.message || 'Erro desconhecido'}`);
    },
  });
  
  return {
    preferences,
    isLoading,
    error,
    updatePreferences: updatePreferencesMutation.mutate,
    isUpdating: updatePreferencesMutation.isPending,
  };
};

// Exportar alias para compatibilidade com código existente
export const useTravelerPreferences = useUserPreferences;
