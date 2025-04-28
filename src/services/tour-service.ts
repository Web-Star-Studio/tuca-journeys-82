
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
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching tours:', error);
      throw error;
    }
    
    return data;
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
    const { data, error } = await this.supabase
      .from('tours')
      .insert([tourData]) // Insere como um elemento de array
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
    const { data, error } = await this.supabase
      .from('tours')
      .update(tourData)
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
   * Busca a disponibilidade de um passeio
   */
  async getTourAvailability(tourId: number, startDate?: Date, endDate?: Date): Promise<any[]> {
    let query = supabase
      .from('tour_availability')
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
    
    const { data: existingData, error: checkError } = await supabase
      .from('tour_availability')
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
      const { data, error } = await supabase
        .from('tour_availability')
        .update({
          available_spots: availableSpots,
          custom_price: customPrice,
          status,
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
      const { data, error } = await supabase
        .from('tour_availability')
        .insert([{
          tour_id: tourId,
          date: formattedDate,
          available_spots: availableSpots,
          custom_price: customPrice,
          status
        }])
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
      custom_price: customPrice,
      status,
    }));

    const { error } = await supabase
      .from('tour_availability')
      .upsert(updates, { 
        onConflict: 'tour_id,date',
        ignoreDuplicates: false 
      });
    
    if (error) {
      console.error('Error setting bulk tour availability:', error);
      throw error;
    }
  }
}

export const tourService = new TourService();
