
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-client';
import { Product } from '@/types/database';

export const useProductCategories = () => {
  return useQuery({
    queryKey: ['product-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('category')
        .order('category', { ascending: true });
      
      if (error) throw error;
      
      // Extract unique categories
      const categories = Array.from(new Set(data.map(item => item.category)));
      return categories;
    }
  });
};

export const useProducts = (filterParams?: {
  category?: string;
  status?: string;
  search?: string;
}) => {
  const queryClient = useQueryClient();
  
  // Query for fetching products
  const productsQuery = useQuery({
    queryKey: ['products', filterParams],
    queryFn: async () => {
      let query = supabase.from('products').select('*');
      
      // Apply filters if provided
      if (filterParams?.category && filterParams.category !== 'all') {
        query = query.eq('category', filterParams.category);
      }
      
      if (filterParams?.status && filterParams.status !== 'all') {
        query = query.eq('status', filterParams.status);
      }
      
      if (filterParams?.search) {
        query = query.ilike('name', `%${filterParams.search}%`);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Product[];
    }
  });
  
  // Mutation for creating/updating products
  const saveProductMutation = useMutation({
    mutationFn: async (productData: Partial<Product>) => {
      if (productData.id) {
        // Update existing product
        const { data, error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', productData.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        // Create new product
        const { data, error } = await supabase
          .from('products')
          .insert([productData])
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
  
  // Mutation for deleting products
  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  // Mutation for updating product stock
  const updateProductStockMutation = useMutation({
    mutationFn: async ({ id, stock }: { id: number; stock: number }) => {
      const { data, error } = await supabase
        .from('products')
        .update({ stock })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  // Mutation for updating product availability by partner
  const updatePartnerProductsMutation = useMutation({
    mutationFn: async ({ partner_id, updates }: { partner_id: string, updates: Partial<Product> }) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('partner_id', partner_id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
  
  return {
    products: productsQuery.data || [],
    isLoading: productsQuery.isLoading,
    error: productsQuery.error,
    saveProduct: saveProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
    updateProductStock: updateProductStockMutation.mutate,
    updatePartnerProducts: updatePartnerProductsMutation.mutate,
    useProductCategories
  };
};
