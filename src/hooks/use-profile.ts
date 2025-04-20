
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useProfile = () => {
  const { user } = useAuth();
  
  // Query to fetch profile data
  const { data: profile, isLoading, error, refetch } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      // In a real app, we'd fetch from an API
      // For demo, return a placeholder user
      return {
        id: "demo-user",
        name: "Usuário Demo",
        email: "demo@example.com",
        phone: "+55 11 99999-9999",
        address: "Av. Exemplo, 123",
        city: "São Paulo",
        state: "SP",
        zip_code: "01234-567",
        country: "Brasil",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    },
    enabled: !!user,
  });

  // Mutation to update profile
  const updateProfileMutation = useMutation({
    mutationFn: async (profileData: any) => {
      // In a real app, we'd call an API
      console.log('Updating profile:', profileData);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      toast.success('Perfil atualizado com sucesso');
      refetch();
    },
    onError: (error) => {
      toast.error('Erro ao atualizar o perfil');
      console.error('Error updating profile:', error);
    }
  });

  return {
    profile,
    isLoading,
    error,
    updateProfile: (data: any) => updateProfileMutation.mutate(data)
  };
};
