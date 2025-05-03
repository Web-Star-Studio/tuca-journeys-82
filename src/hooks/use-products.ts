
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
      
      return data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        stock: item.stock,
        featured: item.featured || false,
        image_url: item.image_url,
        gallery: item.gallery,
        weight: item.weight,
        dimensions: item.dimensions,
        partner_id: item.partner_id,
        created_at: item.created_at,
        updated_at: item.updated_at,
        status: item.status || 'active',
        is_new: isProductNew(item.created_at),
        benefits: [],
      } as Product));
    },
    staleTime: 5 * 60 * 1000 // Cache for 5 minutes
  });
  
  // Create a new product
  const createProduct = useMutation({
    mutationFn: async (product: Omit<Product, 'id'>) => {
      const productToInsert = {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        featured: product.featured,
        image_url: product.image_url,
        gallery: product.gallery,
        weight: product.weight,
        dimensions: product.dimensions,
        partner_id: product.partner_id,
        status: product.status,
      };
      
      const { data, error } = await supabase
        .from('products')
        .insert(productToInsert)
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
      const productToUpdate = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        featured: product.featured,
        image_url: product.image_url,
        gallery: product.gallery,
        weight: product.weight,
        dimensions: product.dimensions,
        partner_id: product.partner_id,
        status: product.status,
      };
      
      const { data, error } = await supabase
        .from('products')
        .update(productToUpdate)
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
        // Use the select with distinct extension from PostgreSQL
        const { data, error } = await supabase
          .from('products')
          .select('category')
          .order('category');
        
        if (error) {
          console.error('Error fetching product categories:', error);
          throw error;
        }
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data?.map(item => item.category)));
        return uniqueCategories || [];
      }
    });
  };
  
  // Helper function to determine if a product is new
  const isProductNew = (createdAt?: string): boolean => {
    if (!createdAt) return false;
    
    const createdDate = new Date(createdAt);
    const now = new Date();
    // Product is new if created within the last 30 days
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays <= 30;
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
