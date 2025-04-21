
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-client';
import { Product } from '@/types';

export const useProducts = () => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Product[];
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (product: Partial<Product>) => {
      const requiredFields = {
        name: product.name || 'New Product',
        description: product.description || 'Product description',
        price: product.price || 0,
        image_url: product.image_url || '/placeholder.jpg',
        category: product.category || 'general',
        stock: product.stock || 0,
        status: product.status || 'active'
      };

      const { data, error } = await supabase
        .from('products')
        .insert([{ ...requiredFields, ...product }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async (product: Product) => {
      const { data, error } = await supabase
        .from('products')
        .update(product)
        .eq('id', product.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

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
    },
  });
  
  const updateProductStockMutation = useMutation({
    mutationFn: async ({ id, stock }: { id: number, stock: number }) => {
      const { error } = await supabase
        .from('products')
        .update({ stock })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const getPartnerProductsMutation = useMutation({
    mutationFn: async (partnerId: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('partner_id', partnerId);

      if (error) throw error;
      return data as Product[];
    },
  });

  return {
    products: productsQuery.data || [],
    isLoading: productsQuery.isLoading,
    error: productsQuery.error,
    createProduct: createProductMutation.mutate,
    updateProduct: updateProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
    updateProductStock: updateProductStockMutation.mutate,
    getPartnerProducts: getPartnerProductsMutation.mutate,
    isPending: createProductMutation.isPending || updateProductMutation.isPending || deleteProductMutation.isPending
  };
};

// Hook for fetching a single product
export const useProduct = (id: number | string | undefined) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) return null;
      
      const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', numericId)
        .single();
      
      if (error) throw error;
      return data as Product;
    },
    enabled: !!id,
  });
};

// Alias for deleteProduct
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

// Alias for updateProductStock
export const useUpdateProductStock = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, stock }: { id: number, stock: number }) => {
      const { error } = await supabase
        .from('products')
        .update({ stock })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
