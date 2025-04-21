
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from '@/types';
import { toast } from 'sonner';

export const useProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const { 
    data: profile, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        return data as UserProfile;
      } catch (error: any) {
        console.error('Erro ao carregar perfil:', error.message);
        // Não exibimos toast aqui para evitar mensagens excessivas em cada carregamento
        return null;
      }
    },
    enabled: !!user?.id,
    staleTime: 60 * 1000, // Cache por 1 minuto
  });
  
  const updateProfile = useMutation({
    mutationFn: async (updates: Partial<UserProfile>) => {
      if (!user?.id) throw new Error('Usuário não autenticado');
      
      // Converter updates para um objeto simples que o Supabase pode processar
      const supabaseUpdates: Record<string, any> = { ...updates };
      
      // Verificar se há preferências e convertê-las para objeto JSON
      if (updates.preferences) {
        supabaseUpdates.preferences = JSON.parse(JSON.stringify(updates.preferences));
      }
      
      const { data, error } = await supabase
        .from('user_profiles')
        .update(supabaseUpdates)
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      toast.success('Perfil atualizado com sucesso');
    },
    onError: (error: any) => {
      console.error('Erro ao atualizar perfil:', error);
      toast.error(`Erro ao atualizar perfil: ${error.message || 'Erro desconhecido'}`);
    }
  });
  
  return {
    profile,
    isLoading,
    error,
    updateProfile: updateProfile.mutate,
    isUpdating: updateProfile.isPending,
    refetchProfile: refetch
  };
};
