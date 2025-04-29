import { BaseApiService } from './base-api';
import { Tour } from '@/types/database';
import { supabase } from '@/lib/supabase';

/**
 * Serviço para gerenciar operações relacionadas a passeios (tours)
 */
export class TourService extends BaseApiService {
  /**
   * Busca todos os passeios
   */
  async getTours(): Promise<Tour[]> {
    const { data, error } = await this.supabase
      .from('tours')
      .select('*')
      // Removed the filter for is_active to include all tours
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching tours:', error);
      throw error;
    }
    
    return data || [];
  }

  /**
   * Busca passeios em destaque
   */
  async getFeaturedTours(): Promise<Tour[]> {
    const { data, error } = await this.supabase
      .from('tours')
      .select('*')
      .eq('is_featured', true)
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching featured tours:', error);
      throw error;
    }
    
    return data || [];
  }

  /**
   * Busca passeios por categoria
   */
  async getToursByCategory(category: string): Promise<Tour[]> {
    const { data, error } = await this.supabase
      .from('tours')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching tours by category ${category}:`, error);
      throw error;
    }
    
    return data || [];
  }

  /**
   * Busca um passeio específico por ID
   */
  async getTourById(id: number): Promise<Tour> {
    const { data, error } = await this.supabase
      .from('tours')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching tour ${id}:`, error);
      throw error;
    }
    
    return data;
  }

  /**
   * Cria um novo passeio
   */
  async createTour(tourData: Partial<Tour>): Promise<Tour> {
    // Ensure required fields are present - these fields are required by the database schema
    if (!tourData.title || !tourData.description || !tourData.image_url || 
        !tourData.duration || !tourData.category || tourData.price === undefined) {
      throw new Error('Missing required fields for tour creation');
    }

    // Create an object with all fields needed by the database schema
    const dataToInsert = {
      title: tourData.title,
      description: tourData.description,
      short_description: tourData.short_description || `${tourData.description.substring(0, 150)}...`,
      image_url: tourData.image_url,
      price: tourData.price,
      duration: tourData.duration,
      category: tourData.category,
      difficulty: tourData.difficulty || 'normal', // Ensure difficulty is always provided
      includes: tourData.includes || [],
      excludes: tourData.excludes || [],
      notes: tourData.notes || [],
      gallery_images: tourData.gallery_images || [],
      min_participants: tourData.min_participants || 1,
      max_participants: tourData.max_participants || 10,
      rating: tourData.rating || 0,
      schedule: tourData.schedule || [],
      meeting_point: tourData.meeting_point || null,
      is_featured: tourData.is_featured || false,
      is_active: tourData.is_active !== false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data, error } = await this.supabase
      .from('tours')
      .insert(dataToInsert)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating tour:', error);
      throw error;
    }
    
    return data;
  }

  /**
   * Atualiza um passeio existente
   */
  async updateTour(id: number, tourData: Partial<Tour>): Promise<Tour> {
    // Always update the timestamp
    const dataWithTimestamp = {
      ...tourData,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await this.supabase
      .from('tours')
      .update(dataWithTimestamp)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating tour ${id}:`, error);
      throw error;
    }
    
    return data;
  }

  /**
   * Exclui um passeio
   */
  async deleteTour(id: number): Promise<void> {
    const { error } = await this.supabase
      .from('tours')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting tour ${id}:`, error);
      throw error;
    }
  }

  /**
   * Atualiza o status de destaque de um passeio
   */
  async toggleTourFeatured(id: number, isFeatured: boolean): Promise<Tour> {
    const { data, error } = await this.supabase
      .from('tours')
      .update({ is_featured: isFeatured, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating tour featured status ${id}:`, error);
      throw error;
    }
    
    return data;
  }

  /**
   * Atualiza o status de ativação de um passeio
   */
  async toggleTourActive(id: number, isActive: boolean): Promise<Tour> {
    const { data, error } = await this.supabase
      .from('tours')
      .update({ is_active: isActive, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating tour active status ${id}:`, error);
      throw error;
    }
    
    return data;
  }

  /**
   * Busca a disponibilidade de um passeio
   */
  async getTourAvailability(tourId: number, startDate?: Date, endDate?: Date): Promise<any[]> {
    // Usando tour_schedules em vez de tour_availability
    let query = this.supabase
      .from('tour_schedules')
      .select('*')
      .eq('tour_id', tourId);
    
    if (startDate) {
      query = query.gte('date', startDate.toISOString().split('T')[0]);
    }
    
    if (endDate) {
      query = query.lte('date', endDate.toISOString().split('T')[0]);
    }
    
    const { data, error } = await query.order('date', { ascending: true });
    
    if (error) {
      console.error(`Error fetching availability for tour ${tourId}:`, error);
      throw error;
    }
    
    return data;
  }

  /**
   * Atualiza a disponibilidade de um passeio
   */
  async updateTourAvailability(
    tourId: number, 
    date: Date, 
    availableSpots: number, 
    customPrice?: number, 
    status: 'available' | 'unavailable' = 'available'
  ): Promise<any> {
    const formattedDate = date.toISOString().split('T')[0];
    
    // Usar tour_schedules em vez de tour_availability
    const { data: existingData, error: checkError } = await this.supabase
      .from('tour_schedules')
      .select('id')
      .eq('tour_id', tourId)
      .eq('date', formattedDate)
      .maybeSingle();
    
    if (checkError) {
      console.error('Error checking tour availability:', checkError);
      throw checkError;
    }
    
    if (existingData) {
      // Atualizar registro existente
      const { data, error } = await this.supabase
        .from('tour_schedules')
        .update({
          available_spots: availableSpots,
          price_override: customPrice,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingData.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating tour availability:', error);
        throw error;
      }
      
      return data;
    } else {
      // Criar novo registro
      const { data, error } = await this.supabase
        .from('tour_schedules')
        .insert({
          tour_id: tourId,
          date: formattedDate,
          available_spots: availableSpots,
          price_override: customPrice,
          start_time: '09:00',  // Valores padrão necessários para tour_schedules
          end_time: '17:00'     // Valores padrão necessários para tour_schedules
        } as any)
        .select()
        .single();
      
      if (error) {
        console.error('Error creating tour availability:', error);
        throw error;
      }
      
      return data;
    }
  }

  /**
   * Define a disponibilidade de um passeio para várias datas
   */
  async setBulkTourAvailability(
    tourId: number, 
    dates: Date[], 
    availableSpots: number, 
    customPrice?: number,
    status: 'available' | 'unavailable' = 'available'
  ): Promise<void> {
    const updates = dates.map(date => ({
      tour_id: tourId,
      date: date.toISOString().split('T')[0],
      available_spots: availableSpots,
      price_override: customPrice,
      start_time: '09:00',  // Valores padrão necessários para tour_schedules
      end_time: '17:00'     // Valores padrão necessários para tour_schedules
    }));

    const { error } = await this.supabase
      .from('tour_schedules')
      .upsert(updates as any[], { 
        onConflict: 'tour_id,date',
        ignoreDuplicates: false 
      });
    
    if (error) {
      console.error('Error setting bulk tour availability:', error);
      throw error;
    }
  }

  /**
   * Pesquisa por passeios
   */
  async searchTours(query: string): Promise<Tour[]> {
    if (!query.trim()) {
      return this.getTours();
    }
    
    const { data, error } = await this.supabase
      .from('tours')
      .select('*')
      .textSearch('search_vector', query)
      .eq('is_active', true);
    
    if (error) {
      console.error('Error searching tours:', error);
      throw error;
    }
    
    return data || [];
  }
}

export const tourService = new TourService();
