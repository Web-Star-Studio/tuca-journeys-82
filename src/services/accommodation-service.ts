
import { BaseApiService } from './base-api';
import { Accommodation } from '@/types/database';
import { supabase } from '@/lib/supabase';

/**
 * Serviço para gerenciar operações relacionadas a hospedagens
 */
export class AccommodationService extends BaseApiService {
  /**
   * Busca todas as hospedagens
   */
  async getAccommodations(): Promise<Accommodation[]> {
    const { data, error } = await this.supabase
      .from('accommodations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching accommodations:', error);
      throw error;
    }
    
    return data;
  }

  /**
   * Busca uma hospedagem específica por ID
   */
  async getAccommodationById(id: number): Promise<Accommodation> {
    const { data, error } = await this.supabase
      .from('accommodations')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching accommodation ${id}:`, error);
      throw error;
    }
    
    return data;
  }

  /**
   * Cria uma nova hospedagem
   */
  async createAccommodation(accommodationData: Partial<Accommodation>): Promise<Accommodation> {
    // Convertendo Partial<Accommodation> para um objeto que não é um array
    const { data, error } = await this.supabase
      .from('accommodations')
      .insert([accommodationData]) // Insere como um elemento de array
      .select()
      .single();
    
    if (error) {
      console.error('Error creating accommodation:', error);
      throw error;
    }
    
    return data;
  }

  /**
   * Atualiza uma hospedagem existente
   */
  async updateAccommodation(id: number, accommodationData: Partial<Accommodation>): Promise<Accommodation> {
    const { data, error } = await this.supabase
      .from('accommodations')
      .update(accommodationData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating accommodation ${id}:`, error);
      throw error;
    }
    
    return data;
  }

  /**
   * Exclui uma hospedagem
   */
  async deleteAccommodation(id: number): Promise<void> {
    const { error } = await this.supabase
      .from('accommodations')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting accommodation ${id}:`, error);
      throw error;
    }
  }

  /**
   * Busca a disponibilidade de uma hospedagem
   */
  async getAccommodationAvailability(accommodationId: number, startDate?: Date, endDate?: Date): Promise<any[]> {
    let query = this.supabase
      .from('accommodation_availability')
      .select('*')
      .eq('accommodation_id', accommodationId);
    
    if (startDate) {
      query = query.gte('date', startDate.toISOString().split('T')[0]);
    }
    
    if (endDate) {
      query = query.lte('date', endDate.toISOString().split('T')[0]);
    }
    
    const { data, error } = await query.order('date', { ascending: true });
    
    if (error) {
      console.error(`Error fetching availability for accommodation ${accommodationId}:`, error);
      throw error;
    }
    
    return data;
  }

  /**
   * Atualiza a disponibilidade de uma hospedagem
   */
  async updateAccommodationAvailability(
    accommodationId: number, 
    date: Date, 
    customPrice?: number, 
    status: 'available' | 'unavailable' = 'available'
  ): Promise<any> {
    const formattedDate = date.toISOString().split('T')[0];
    
    const { data: existingData, error: checkError } = await this.supabase
      .from('accommodation_availability')
      .select('id')
      .eq('accommodation_id', accommodationId)
      .eq('date', formattedDate)
      .maybeSingle();
    
    if (checkError) {
      console.error('Error checking accommodation availability:', checkError);
      throw checkError;
    }
    
    if (existingData) {
      // Atualizar registro existente
      const { data, error } = await this.supabase
        .from('accommodation_availability')
        .update({
          custom_price: customPrice,
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingData.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating accommodation availability:', error);
        throw error;
      }
      
      return data;
    } else {
      // Criar novo registro
      const { data, error } = await this.supabase
        .from('accommodation_availability')
        .insert([{
          accommodation_id: accommodationId,
          date: formattedDate,
          custom_price: customPrice,
          status
        }])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating accommodation availability:', error);
        throw error;
      }
      
      return data;
    }
  }

  /**
   * Define a disponibilidade de uma hospedagem para várias datas
   */
  async setBulkAccommodationAvailability(
    accommodationId: number, 
    dates: Date[], 
    customPrice?: number,
    status: 'available' | 'unavailable' = 'available'
  ): Promise<void> {
    const updates = dates.map(date => ({
      accommodation_id: accommodationId,
      date: date.toISOString().split('T')[0],
      custom_price: customPrice,
      status,
    }));

    const { error } = await this.supabase
      .from('accommodation_availability')
      .upsert(updates, { 
        onConflict: 'accommodation_id,date',
        ignoreDuplicates: false 
      });
    
    if (error) {
      console.error('Error setting bulk accommodation availability:', error);
      throw error;
    }
  }
}

export const accommodationService = new AccommodationService();
