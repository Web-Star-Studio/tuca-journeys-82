
import { BaseApiService } from './base-api';
import { Package } from '@/types/package';
import type { Database } from '@/integrations/supabase/types';

// Create explicit type for database package row
type DBPackage = Database['public']['Tables']['packages']['Row'];

class PackageService extends BaseApiService {
  async getPackages(filters = {}): Promise<Package[]> {
    let query = this.supabase
      .from('packages')
      .select('*');
    
    const { data, error } = await query;

    if (error) {
      console.error('Error fetching packages:', error);
      throw error;
    }

    // Use type assertion to help TypeScript understand the data flow
    return data.map(pkg => this.adaptDBPackageToComponentPackage(pkg as DBPackage));
  }

  async getPackageById(id: number): Promise<Package> {
    const { data, error } = await this.supabase
      .from('packages')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching package ${id}:`, error);
      throw error;
    }

    return this.adaptDBPackageToComponentPackage(data as DBPackage);
  }

  async getFeaturedPackages(limit: number = 3): Promise<Package[]> {
    const { data, error } = await this.supabase
      .from('packages')
      .select('*')
      .eq('is_featured', true)
      .limit(limit);

    if (error) {
      console.error('Error fetching featured packages:', error);
      throw error;
    }

    return data.map(pkg => this.adaptDBPackageToComponentPackage(pkg as DBPackage));
  }
  
  async createPackage(packageData: Omit<Package, 'id'>): Promise<Package> {
    const dbData = this.adaptComponentPackageToDB(packageData);
    
    const { data, error } = await this.supabase
      .from('packages')
      .insert([dbData])
      .select()
      .single();
      
    if (error) {
      console.error('Error creating package:', error);
      throw error;
    }
    
    return this.adaptDBPackageToComponentPackage(data as DBPackage);
  }
  
  async updatePackage(id: number, packageData: Partial<Package>): Promise<Package> {
    const dbData = this.adaptComponentPackageToDB({...packageData, id});
    
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
    
    return this.adaptDBPackageToComponentPackage(data as DBPackage);
  }
  
  async deletePackage(id: number): Promise<void> {
    const { error } = await this.supabase
      .from('packages')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error(`Error deleting package ${id}:`, error);
      throw error;
    }
  }

  // Helper adapter methods moved inside the service to avoid circular dependencies
  private adaptDBPackageToComponentPackage(dbPackage: DBPackage): Package {
    return {
      id: dbPackage.id,
      title: dbPackage.title || dbPackage.name || '',
      description: dbPackage.description || '',
      short_description: dbPackage.short_description || '',
      price: dbPackage.price,
      duration: dbPackage.duration || `${dbPackage.max_guests || 1} days`,
      image_url: dbPackage.image_url || '',
      gallery_images: dbPackage.gallery_images || [],
      category: dbPackage.category || 'Uncategorized',
      includes: dbPackage.includes || [],
      excludes: dbPackage.excludes || [],
      itinerary: dbPackage.itinerary || [],
      rating: dbPackage.rating || 0,
      is_featured: dbPackage.is_featured || false,
      max_participants: dbPackage.max_guests || 0,
      created_at: dbPackage.created_at,
      updated_at: dbPackage.updated_at,
      partner_id: dbPackage.partner_id
    };
  }

  private adaptComponentPackageToDB(packageData: Partial<Package>): Partial<DBPackage> {
    // Create an object with the specific fields needed by the DB
    const dbPackage: Partial<DBPackage> = {
      title: packageData.title,
      name: packageData.title, // Ensure both fields are set
      description: packageData.description,
      short_description: packageData.short_description,
      price: packageData.price,
      duration: packageData.duration,
      image_url: packageData.image_url,
      gallery_images: packageData.gallery_images,
      category: packageData.category,
      includes: packageData.includes,
      excludes: packageData.excludes,
      itinerary: packageData.itinerary,
      max_guests: packageData.max_participants,
      is_featured: packageData.is_featured,
      partner_id: packageData.partner_id
    };

    // Remove undefined fields to avoid overwriting with nulls
    Object.keys(dbPackage).forEach(key => {
      if (dbPackage[key as keyof typeof dbPackage] === undefined) {
        delete dbPackage[key as keyof typeof dbPackage];
      }
    });

    return dbPackage;
  }
}

export const packageService = new PackageService();
