
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Accommodation } from '@/types/database';
import { supabase } from '@/lib/supabase';
import { useCurrentPartner } from './use-partner';
import { toast } from 'sonner';

export const useAccommodations = (partnerId?: string) => {
  const { data: currentPartner } = useCurrentPartner();
  const partnerIdToUse = partnerId || currentPartner?.id;
  const queryClient = useQueryClient();
  
  const { data: accommodations, isLoading, error } = useQuery({
    queryKey: ['accommodations', partnerIdToUse],
    queryFn: async () => {
      // If no partner ID, fetch all accommodations
      let query = supabase.from('accommodations').select('*');
      
      // If partner ID is provided, filter by that partner
      if (partnerIdToUse) {
        query = query.eq('partner_id', partnerIdToUse);
      }
      
      // Execute query
      const { data, error } = await query;
      if (error) throw error;
      
      return data as Accommodation[];
    },
    enabled: true,
  });
  
  const refetch = async () => {
    await queryClient.invalidateQueries({ queryKey: ['accommodations', partnerIdToUse] });
  };

  // Get single accommodation by ID
  const getAccommodationById = async (accommodationId: number) => {
    const { data, error } = await supabase
      .from('accommodations')
      .select('*')
      .eq('id', accommodationId)
      .single();
      
    if (error) throw error;
    return data as Accommodation;
  };

  // Save (create or update) accommodation
  const saveAccommodation = async (accommodationData: Partial<Accommodation> & { id?: number }) => {
    if (accommodationData.id) {
      // Update existing accommodation
      const { data, error } = await supabase
        .from('accommodations')
        .update({
          ...accommodationData,
          updated_at: new Date().toISOString(),
          rating: accommodationData.rating || 0,
        })
        .eq('id', accommodationData.id)
        .select();
        
      if (error) throw error;
      return data[0] as Accommodation;
    } else {
      // Create new accommodation with all required fields
      const newAccommodationData: Omit<Accommodation, 'id' | 'created_at' | 'updated_at'> = {
        title: accommodationData.title || '',
        description: accommodationData.description || '',
        short_description: accommodationData.short_description || '',
        price_per_night: accommodationData.price_per_night || 0,
        type: accommodationData.type || '',
        address: accommodationData.address || '',
        bedrooms: accommodationData.bedrooms || 1,
        bathrooms: accommodationData.bathrooms || 1,
        max_guests: accommodationData.max_guests || 2,
        amenities: accommodationData.amenities || [],
        image_url: accommodationData.image_url || '',
        partner_id: accommodationData.partner_id,
        rating: accommodationData.rating || 0,
        gallery_images: accommodationData.gallery_images || []
      };
      
      const { data, error } = await supabase
        .from('accommodations')
        .insert({
          ...newAccommodationData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select();
        
      if (error) throw error;
      return data[0] as Accommodation;
    }
  };

  // Delete accommodation
  const deleteAccommodation = async (accommodationId: number) => {
    const { error } = await supabase
      .from('accommodations')
      .delete()
      .eq('id', accommodationId);
      
    if (error) throw error;
    return { success: true };
  };
  
  return { 
    accommodations, 
    isLoading, 
    error, 
    getAccommodationById, 
    saveAccommodation, 
    deleteAccommodation,
    refetch
  };
};

export const useAccommodation = (accommodationId: number | string) => {
  return useQuery({
    queryKey: ['accommodation', accommodationId],
    queryFn: async () => {
      const id = typeof accommodationId === 'string' ? parseInt(accommodationId, 10) : accommodationId;
      
      const { data, error } = await supabase
        .from('accommodations')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      return data as Accommodation;
    },
    enabled: !!accommodationId,
  });
};

export const useCreateAccommodation = () => {
  const queryClient = useQueryClient();
  const { data: partner } = useCurrentPartner();
  
  return useMutation({
    mutationFn: async (accommodationData: Omit<Accommodation, 'id' | 'created_at' | 'updated_at'>) => {
      if (!partner?.id) {
        throw new Error('Partner ID is required');
      }
      
      const { data, error } = await supabase
        .from('accommodations')
        .insert({
          ...accommodationData,
          partner_id: partner.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();
        
      if (error) throw error;
      return data as Accommodation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
      toast.success('Hospedagem criada com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao criar hospedagem: ${error.message}`);
    },
  });
};

export const useUpdateAccommodation = (accommodationId: number) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (accommodationData: Partial<Accommodation>) => {
      const { data, error } = await supabase
        .from('accommodations')
        .update({
          ...accommodationData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', accommodationId)
        .select()
        .single();
        
      if (error) throw error;
      return data as Accommodation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
      queryClient.invalidateQueries({ queryKey: ['accommodation', accommodationId] });
      toast.success('Hospedagem atualizada com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar hospedagem: ${error.message}`);
    },
  });
};

export const useDeleteAccommodation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (accommodationId: number) => {
      const { error } = await supabase
        .from('accommodations')
        .delete()
        .eq('id', accommodationId);
        
      if (error) throw error;
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
      toast.success('Hospedagem excluída com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao excluir hospedagem: ${error.message}`);
    },
  });
};
