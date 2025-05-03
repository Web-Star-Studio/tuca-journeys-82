
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

    return this.mapProductsFromDB(data);
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

    return this.mapProductFromDB(data);
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

    return this.mapProductsFromDB(data);
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

    return this.mapProductsFromDB(data);
  }

  // Helper methods to map database objects to our Product interface
  private mapProductFromDB(dbProduct: any): Product {
    return {
      id: dbProduct.id,
      name: dbProduct.name,
      description: dbProduct.description,
      price: dbProduct.price,
      category: dbProduct.category,
      stock: dbProduct.stock,
      featured: dbProduct.featured || false,
      image_url: dbProduct.image_url,
      gallery: dbProduct.gallery,
      weight: dbProduct.weight,
      dimensions: dbProduct.dimensions,
      partner_id: dbProduct.partner_id,
      created_at: dbProduct.created_at,
      updated_at: dbProduct.updated_at,
      status: dbProduct.status || 'active',
      is_new: this.isProductNew(dbProduct.created_at),
      benefits: [], // Default empty benefits array
    };
  }

  private mapProductsFromDB(dbProducts: any[]): Product[] {
    return dbProducts.map(p => this.mapProductFromDB(p));
  }

  private isProductNew(createdAt?: string): boolean {
    if (!createdAt) return false;
    
    const createdDate = new Date(createdAt);
    const now = new Date();
    // Product is new if created within the last 30 days
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays <= 30;
  }
}

export const productService = new ProductService();
