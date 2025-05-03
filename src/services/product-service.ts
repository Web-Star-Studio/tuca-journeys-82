
import { BaseApiService } from './base-api';
import { Product } from '@/types/product';

class ProductService extends BaseApiService {
  async getProducts(filters = {}) {
    let query = this.supabase
      .from('products')
      .select('*');
    
    const { data, error } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

    return data as Product[];
  }

  async getProductById(id: number) {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }

    return data as Product;
  }

  async getFeaturedProducts(limit: number = 4) {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(limit);

    if (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }

    return data as Product[];
  }
  
  async getRelatedProducts(productId: number, categoryId: string, limit: number = 4) {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .eq('category', categoryId)
      .neq('id', productId)
      .limit(limit);

    if (error) {
      console.error('Error fetching related products:', error);
      throw error;
    }

    return data as Product[];
  }
}

export const productService = new ProductService();
