
import { BaseApiService } from './base-api';
import { Package } from '@/types/package';

// Define an explicit type for database package row
export type DBPackage = {
  id: number;
  title: string;
  name: string;
  description: string;
  short_description: string;
  price: number;
  image_url: string;
  duration: string; // Changed from number to string to match database structure
  max_guests: number;
  itinerary: any;
  includes: string[];
  excludes: string[];
  category: string;
  is_featured: boolean;
  gallery_images: string[];
  rating: number;
  created_at: string;
  updated_at: string;
  partner_id?: string;
};

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

    // Convert the database packages to our component package type
    return (data || []).map(pkg => this.adaptDBPackageToComponentPackage(pkg as unknown as DBPackage));
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

    return this.adaptDBPackageToComponentPackage(data as unknown as DBPackage);
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

    return (data || []).map(pkg => this.adaptDBPackageToComponentPackage(pkg as unknown as DBPackage));
  }
  
  async createPackage(packageData: Omit<Package, 'id'>): Promise<Package> {
    // Convert from canonical Package type to DB format
    const dbData = this.adaptComponentPackageToDB(packageData);
    
    // Remove the array wrapper as we're inserting a single item
    const { data, error } = await this.supabase
      .from('packages')
      .insert([dbData as any])
      .select()
      .single();
      
    if (error) {
      console.error('Error creating package:', error);
      throw error;
    }
    
    return this.adaptDBPackageToComponentPackage(data as unknown as DBPackage);
  }
  
  async updatePackage(id: number, packageData: Partial<Package>): Promise<Package> {
    // Convert from canonical Package type to DB format
    const dbData = this.adaptComponentPackageToDB({...packageData, id});
    
    const { data, error } = await this.supabase
      .from('packages')
      .update(dbData as any)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error(`Error updating package ${id}:`, error);
      throw error;
    }
    
    return this.adaptDBPackageToComponentPackage(data as unknown as DBPackage);
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

  // Helper adapter methods inside the service
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

  private adaptComponentPackageToDB(packageData: Partial<Package> & {id?: number}): Partial<DBPackage> {
    // Create an object with the specific fields needed by the DB
    return {
      id: packageData.id,
      title: packageData.title || '',
      name: packageData.title || '', // Ensure both fields are set
      description: packageData.description || '',
      short_description: packageData.short_description || '',
      price: packageData.price || 0,
      duration: packageData.duration || '',
      image_url: packageData.image_url || '',
      gallery_images: packageData.gallery_images || [],
      category: packageData.category || 'Uncategorized',
      includes: packageData.includes || [],
      excludes: packageData.excludes || [],
      itinerary: packageData.itinerary || [],
      max_guests: packageData.max_participants || 0,
      is_featured: packageData.is_featured || false,
      partner_id: packageData.partner_id,
      rating: packageData.rating || 0
    };
  }
}

export const packageService = new PackageService();
