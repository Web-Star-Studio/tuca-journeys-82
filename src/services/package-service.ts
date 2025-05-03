
import { BaseApiService } from './base-api';
import { Package } from '@/types/package';

class PackageService extends BaseApiService {
  async getPackages(filters = {}) {
    let query = this.supabase
      .from('packages')
      .select('*');
    
    const { data, error } = await query;

    if (error) {
      console.error('Error fetching packages:', error);
      throw error;
    }

    return data as Package[];
  }

  async getPackageById(id: number) {
    const { data, error } = await this.supabase
      .from('packages')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching package ${id}:`, error);
      throw error;
    }

    return data as Package;
  }

  async getFeaturedPackages(limit: number = 3) {
    const { data, error } = await this.supabase
      .from('packages')
      .select('*')
      .eq('is_featured', true)
      .limit(limit);

    if (error) {
      console.error('Error fetching featured packages:', error);
      throw error;
    }

    return data as Package[];
  }
}

export const packageService = new PackageService();
