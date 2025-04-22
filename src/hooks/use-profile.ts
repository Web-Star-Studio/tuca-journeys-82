
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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
          .maybeSingle(); // Using maybeSingle instead of single for safety
        
        if (error) throw error;
        
        // If no profile exists yet, return null instead of throwing an error
        if (!data) return null;
        
        return data as UserProfile;
      } catch (error: any) {
        console.error('Erro ao carregar perfil:', error.message);
        // We're rethrowing to let react-query handle retries
        throw new Error(`Falha ao carregar perfil: ${error.message}`);
      }
    },
    enabled: !!user?.id,
    staleTime: 60 * 1000, // Cache por 1 minuto
    retry: 1, // Tenta uma vez mais em caso de falha, evitando muitas tentativas
    meta: {
      onError: (error: any) => {
        // Toast error só é exibido se houver realmente um problema
        // e não apenas devido a perfil não encontrado
        if (!error.message.includes("não encontrado")) {
          toast.error(error.message || "Erro ao carregar perfil");
        }
      }
    }
  });
  
  const updateProfile = useMutation({
    mutationFn: async (updates: Partial<UserProfile>) => {
      if (!user?.id) throw new Error('Usuário não autenticado');
      
      // Verificar se o perfil existe antes de tentar atualizar
      const { data: existingProfile, error: fetchError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();
      
      if (fetchError) throw fetchError;
      
      // Se o perfil não existir, criar um novo
      if (!existingProfile) {
        // Converter updates para um objeto simples que o Supabase pode processar
        const supabaseUpdates: Record<string, any> = { ...updates };
      
        // Converter preferências para JSON se existirem
        if (updates.preferences) {
          supabaseUpdates.preferences = JSON.parse(JSON.stringify(updates.preferences));
        }
        
        const { data, error } = await supabase
          .from('user_profiles')
          .insert({ id: user.id, ...supabaseUpdates })
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
      
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
    onSuccess: (data) => {
      queryClient.setQueryData(['profile', user?.id], data);
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      toast.success('Perfil atualizado com sucesso');
    },
    onError: (error: any) => {
      console.error('Erro ao atualizar perfil:', error);
      toast.error(`Erro ao atualizar perfil: ${error.message || 'Erro desconhecido'}`);
    },
    retry: 0, // Sem retry para mutations para evitar operações duplicadas
  });
  
  return {
    profile,
    isLoading,
    error,
    updateProfile: updateProfile.mutate,
    isUpdating: updateProfile.isPending,
    refetchProfile: refetch,
    createProfile: (data: Partial<UserProfile>) => updateProfile.mutate(data)
  };
};
