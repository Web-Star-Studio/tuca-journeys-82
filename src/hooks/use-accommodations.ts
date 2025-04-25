
import { useState } from 'react';
import { Accommodation } from '@/types/database';
import { getAccommodationsFromDB, getAccommodationByIdFromDB } from '@/lib/api';

interface AccommodationCreate {
  title: string;
  description: string;
  short_description: string;
  price_per_night: number;
  image_url: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  address: string;
  amenities: string[];
  gallery_images: string[];
  rating: number;
}

interface AccommodationUpdate extends Partial<AccommodationCreate> {
  id: number;
}

export const useAccommodations = (typeFilter: string = '') => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAccommodations = async () => {
    setIsLoading(true);
    try {
      const data = await getAccommodationsFromDB();
      
      // Apply type filter if provided
      const filteredData = typeFilter 
        ? data.filter(acc => acc.type === typeFilter)
        : data;
        
      setAccommodations(filteredData);
      return filteredData;
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

  const createAccommodation = async (accommodation: AccommodationCreate) => {
    // In a real application, this would make an API call
    console.log('Creating accommodation:', accommodation);
    // Convert the accommodation object to match the database structure
    const newAccommodation = {
      ...accommodation,
      id: Math.floor(Math.random() * 1000),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Accommodation;
    
    setAccommodations([...accommodations, newAccommodation]);
    return newAccommodation;
  };

  const updateAccommodation = async (accommodation: AccommodationUpdate) => {
    // In a real application, this would make an API call
    console.log('Updating accommodation:', accommodation);
    
    // Find the existing accommodation
    const existingAccommodation = accommodations.find(acc => acc.id === accommodation.id);
    
    if (!existingAccommodation) {
      throw new Error(`Accommodation with ID ${accommodation.id} not found`);
    }
    
    // Merge the updated fields with the existing accommodation
    const updatedAccommodation = {
      ...existingAccommodation,
      ...accommodation,
      updated_at: new Date().toISOString()
    } as Accommodation;
    
    // Update the local state
    setAccommodations(accommodations.map(acc => 
      acc.id === accommodation.id ? updatedAccommodation : acc
    ));
    
    return updatedAccommodation;
  };

  const deleteAccommodation = async (id: number) => {
    // In a real application, this would make an API call
    console.log('Deleting accommodation with ID:', id);
    
    // Update the local state by filtering out the deleted accommodation
    setAccommodations(accommodations.filter(acc => acc.id !== id));
    
    return { success: true };
  };

  // Add the isError property for consistency with React Query pattern
  const isError = error !== null;

  return {
    data: accommodations,
    accommodations,
    isLoading,
    error,
    isError,
    fetchAccommodations,
    getAccommodationById,
    createAccommodation,
    updateAccommodation,
    deleteAccommodation: {
      mutate: deleteAccommodation,
      isPending: false, // Simplified - in a real app this would be stateful
    }
  };
};
