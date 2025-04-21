
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Product } from '@/types/product';
import { supabase } from '@/lib/supabase';
import { useCurrentPartner } from './use-partner';
import { toast } from 'sonner';

export const usePartnerProducts = () => {
  const { data: partner } = useCurrentPartner();
  const partnerId = partner?.id;
  
  return useQuery({
    queryKey: ['partner-products', partnerId],
    queryFn: async () => {
      if (!partnerId) return [];
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('partner_id', partnerId);
        
      if (error) throw error;
      return data as Product[];
    },
    enabled: !!partnerId,
  });
};

export const useProduct = (productId: number | string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();
        
      if (error) throw error;
      return data as Product;
    },
    enabled: !!productId,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { data: partner } = useCurrentPartner();
  
  return useMutation({
    mutationFn: async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      if (!partner?.id) {
        throw new Error('Partner ID is required');
      }
      
      const { data, error } = await supabase
        .from('products')
        .insert({
          ...productData,
          partner_id: partner.id,
        })
        .select()
        .single();
        
      if (error) throw error;
      return data as Product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partner-products'] });
      toast.success('Produto criado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(`Erro ao criar produto: ${error.message}`);
    },
  });
};

export const useUpdateProduct = (productId: number) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (productData: Partial<Product>) => {
      const { data, error } = await supabase
        .from('products')
        .update({
          ...productData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', productId)
        .select()
        .single();
        
      if (error) throw error;
      return data as Product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partner-products'] });
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
      toast.success('Produto atualizado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar produto: ${error.message}`);
    },
  });
};

export const useUpdateProductStock = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      productId, 
      stock, 
      operation 
    }: { 
      productId: number; 
      stock: number;
      operation: 'set' | 'add' | 'subtract'
    }) => {
      // First, get the current stock
      const { data: currentData, error: fetchError } = await supabase
        .from('products')
        .select('stock')
        .eq('id', productId)
        .single();
        
      if (fetchError) throw fetchError;
      
      let newStock = stock;
      
      // Calculate new stock based on operation
      if (operation === 'add') {
        newStock = (currentData.stock || 0) + stock;
      } else if (operation === 'subtract') {
        newStock = Math.max(0, (currentData.stock || 0) - stock);
      }
      
      // Update the stock
      const { data, error } = await supabase
        .from('products')
        .update({
          stock: newStock,
          updated_at: new Date().toISOString(),
          // If stock is 0, update status to out_of_stock
          status: newStock <= 0 ? 'out_of_stock' : 'active'
        })
        .eq('id', productId)
        .select()
        .single();
        
      if (error) throw error;
      return data as Product;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['partner-products'] });
      queryClient.invalidateQueries({ queryKey: ['product', data.id] });
      toast.success('Estoque atualizado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar estoque: ${error.message}`);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (productId: number) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
        
      if (error) throw error;
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partner-products'] });
      toast.success('Produto excluído com sucesso!');
    },
    onError: (error: any) => {
      toast.error(`Erro ao excluir produto: ${error.message}`);
    },
  });
};
