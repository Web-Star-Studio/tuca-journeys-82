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
  
  // Query to fetch profile data
  const { data: profile, isLoading, error, refetch } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      // In a real app, we'd fetch from an API
      // For demo, return a placeholder user with all required fields
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
        bio: "Olá, sou um usuário demonstrativo.",
        preferences: {
          travelStyle: "relaxation",
          budget_range: "medium",
          activities: ["beach", "hiking"],
          notifications: {
            marketing: true,
            booking_updates: true,
            recommendations: true
          },
          transportModes: [],
          dietaryRestrictions: {
            vegetarian: false,
            vegan: false,
            glutenFree: false,
            dairyFree: false,
          },
          accessibility: {
            mobilitySupport: false,
            visualAids: false,
            hearingAids: false,
          }
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as ExtendedUserProfile;
    },
    enabled: !!user,
  });

  // Mutation to update profile
  const updateProfileMutation = useMutation({
    mutationFn: async (profileData: ExtendedUserProfile) => {
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
    updateProfile: (data: ExtendedUserProfile) => updateProfileMutation.mutate(data)
  };
};
