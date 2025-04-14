
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/product';

// Type for the filter parameters
interface ProductFilters {
  category?: string;
  status?: string;
  search?: string;
}

export function useProducts(filters?: ProductFilters) {
  const queryClient = useQueryClient();
  
  // Fetch products with optional filtering
  const { data, error, isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      let query = supabase.from('products').select('*');
      
      // Apply filters if provided
      if (filters?.category) {
        query = query.eq('category', filters.category);
      }
      
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters?.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }
      
      const { data, error } = await query.order('id', { ascending: true });
      
      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
      
      return data || [];
    }
  });
  
  // Create a new product
  const createProduct = useMutation({
    mutationFn: async (product: Omit<Product, 'id'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert(product)
        .select()
        .single();
      
      if (error) {
        console.error('Error creating product:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      // Invalidate products query to refetch data
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
  
  // Update an existing product
  const updateProduct = useMutation({
    mutationFn: async (product: Product) => {
      const { data, error } = await supabase
        .from('products')
        .update(product)
        .eq('id', product.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating product:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
  
  // Delete a product
  const deleteProduct = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting product:', error);
        throw error;
      }
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
  
  // Get product categories
  const useProductCategories = () => {
    return useQuery({
      queryKey: ['product-categories'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('products')
          .select('category')
          .distinct();
        
        if (error) {
          console.error('Error fetching product categories:', error);
          throw error;
        }
        
        return data?.map(item => item.category) || [];
      }
    });
  };
  
  return {
    products: data as Product[],
    error,
    isLoading,
    createProduct,
    updateProduct,
    deleteProduct,
    useProductCategories
  };
}
