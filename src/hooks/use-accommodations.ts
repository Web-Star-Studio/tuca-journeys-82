
import { useState } from 'react';
import { Accommodation } from '@/types/database';
import { getAccommodationsFromDB, getAccommodationByIdFromDB } from '@/lib/api';

export const useAccommodations = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAccommodations = async () => {
    setIsLoading(true);
    try {
      const data = await getAccommodationsFromDB();
      setAccommodations(data);
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch accommodations');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getAccommodationById = async (id: number): Promise<Accommodation> => {
    try {
      return await getAccommodationByIdFromDB(id);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(`Failed to fetch accommodation with ID ${id}`);
      throw error;
    }
  };

  const createAccommodation = async (accommodation: Omit<Accommodation, "id" | "created_at" | "updated_at" | "short_description" | "max_guests" | "gallery_images" | "address"> & { 
    location?: string;
    capacity?: number;
    gallery?: string[];
  }) => {
    // In a real application, this would make an API call
    console.log('Creating accommodation:', accommodation);
    // Convert the accommodation object to match the database structure
    const newAccommodation = {
      ...accommodation,
      id: Math.floor(Math.random() * 1000),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      short_description: accommodation.description?.substring(0, 100) || '',
      max_guests: accommodation.capacity || 2,
      gallery_images: accommodation.gallery || [],
      address: accommodation.location || '',
    } as Accommodation;
    
    setAccommodations([...accommodations, newAccommodation]);
    return newAccommodation;
  };

  const updateAccommodation = async (accommodation: Partial<Accommodation> & { 
    id: number;
    location?: string;
    capacity?: number;
    gallery?: string[];
  }) => {
    // In a real application, this would make an API call
    console.log('Updating accommodation:', accommodation);
    // Convert the accommodation object to match the database structure
    const updatedAccommodation = {
      ...accommodation,
      updated_at: new Date().toISOString(),
      short_description: accommodation.description?.substring(0, 100) || '',
      max_guests: accommodation.capacity || 2,
      gallery_images: accommodation.gallery || [],
      address: accommodation.location || '',
    } as Accommodation;
    
    setAccommodations(accommodations.map(acc => 
      acc.id === accommodation.id ? updatedAccommodation : acc
    ));
    
    return updatedAccommodation;
  };

  return {
    accommodations,
    isLoading,
    error,
    fetchAccommodations,
    getAccommodationById,
    createAccommodation,
    updateAccommodation
  };
};
