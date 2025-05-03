
import { BaseApiService } from './base-api';
import { Package } from '@/types/package';
import { adaptDBPackageToComponentPackage, adaptComponentPackageToDB } from '@/utils/packageAdapter';

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

    return data.map(adaptDBPackageToComponentPackage);
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

    return adaptDBPackageToComponentPackage(data);
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

    return data.map(adaptDBPackageToComponentPackage);
  }

  // Add methods to create, update, and delete packages
  async createPackage(packageData: Omit<Package, 'id'>) {
    const dbData = adaptComponentPackageToDB(packageData);
    
    const { data, error } = await this.supabase
      .from('packages')
      .insert([dbData])
      .select()
      .single();
      
    if (error) {
      console.error('Error creating package:', error);
      throw error;
    }
    
    return adaptDBPackageToComponentPackage(data);
  }
  
  async updatePackage(id: number, packageData: Partial<Package>) {
    const dbData = adaptComponentPackageToDB(packageData);
    
    const { data, error } = await this.supabase
      .from('packages')
      .update(dbData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error(`Error updating package ${id}:`, error);
      throw error;
    }
    
    return adaptDBPackageToComponentPackage(data);
  }
  
  async deletePackage(id: number) {
    const { error } = await this.supabase
      .from('packages')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error(`Error deleting package ${id}:`, error);
      throw error;
    }
  }
}

export const packageService = new PackageService();
