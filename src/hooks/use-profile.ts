
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { UserPreferences } from '@/types/database';

// Extend the UserProfile type to include the missing fields
export interface ExtendedUserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  bio?: string;
  preferences?: {
    travelStyle: string;
    budget_range: string;
    activities: string[];
    notifications: {
      marketing: boolean;
      booking_updates: boolean;
      recommendations: boolean;
    };
    transportModes?: string[];
    dietaryRestrictions?: {
      vegetarian: boolean;
      vegan: boolean;
      glutenFree: boolean;
      dairyFree: boolean;
    };
    accessibility?: {
      mobilitySupport: boolean;
      visualAids: boolean;
      hearingAids: boolean;
    };
  };
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();

  const { data: profile, isLoading, error, refetch } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      // Query actual user_profiles table
      const { data, error } = await import('@/lib/supabase').then(mod =>
        mod.supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle()
      );
      if (error) throw error;
      if (!data) return null;
      return {
        id: data.id,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        city: data.city || "",
        state: data.state || "",
        zip_code: data.zip_code || "",
        country: data.country || "",
        bio: "",
        preferences: data.preferences || undefined,
        created_at: data.created_at,
        updated_at: data.updated_at,
      } as ExtendedUserProfile;
    },
    enabled: !!user,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (profileData: ExtendedUserProfile) => {
      if (!user?.id) throw new Error('Sem usuário autenticado');
      // Update at Supabase
      const { error } = await import('@/lib/supabase').then(mod =>
        mod.supabase
          .from('user_profiles')
          .update({
            name: profileData.name,
            phone: profileData.phone,
            address: profileData.address,
            city: profileData.city,
            state: profileData.state,
            zip_code: profileData.zip_code,
            country: profileData.country,
            updated_at: new Date().toISOString(),
            // preferences and bio can be added here if needed
          })
          .eq('id', user.id)
      );
      if (error) throw error;
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
    updateProfile: (data: ExtendedUserProfile) => updateProfileMutation.mutate(data)
  };
};
