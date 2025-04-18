
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { partnerService } from '@/services';
import { Partner } from '@/types/partner';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Hook for getting a partner by ID
 */
export const usePartner = (id?: string) => {
  return useQuery({
    queryKey: ['partner', id],
    queryFn: () => id ? partnerService.getPartnerById(id) : null,
    enabled: !!id,
  });
};

/**
 * Hook for getting current user's partner profile
 */
export const useCurrentPartner = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['currentPartner', user?.id],
    queryFn: () => user?.id ? partnerService.getPartnerByUserId(user.id) : null,
    enabled: !!user?.id,
  });
};

/**
 * Hook for creating a new partner
 */
export const useCreatePartner = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: (partnerData: Omit<Partner, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'is_verified' | 'is_active'>) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      return partnerService.createPartner({
        ...partnerData,
        user_id: user.id,
        is_verified: false,
        is_active: true
      });
    },
    onSuccess: () => {
      toast.success('Perfil de parceiro criado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['currentPartner'] });
    },
    onError: (error: any) => {
      toast.error(`Erro ao criar perfil de parceiro: ${error.message}`);
    }
  });
};

/**
 * Hook for updating a partner
 */
export const useUpdatePartner = (id?: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (partnerData: Partial<Partner>) => {
      if (!id) throw new Error('Partner ID is required');
      return partnerService.updatePartner(id, partnerData);
    },
    onSuccess: () => {
      toast.success('Perfil de parceiro atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['partner', id] });
      queryClient.invalidateQueries({ queryKey: ['currentPartner'] });
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar perfil de parceiro: ${error.message}`);
    }
  });
};

/**
 * Hook for getting all partners
 */
export const useAllPartners = () => {
  return useQuery({
    queryKey: ['partners'],
    queryFn: () => partnerService.getPartners(),
  });
};
