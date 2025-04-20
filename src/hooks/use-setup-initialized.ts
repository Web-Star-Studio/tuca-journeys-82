
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const useSetupInitialized = () => {
  const [isInitialized, setIsInitialized] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkInitialization = async () => {
      try {
        // Check if we have any tours in the database as a simple initialization check
        const { count, error } = await supabase
          .from('tours')
          .select('*', { count: 'exact', head: true });

        if (error) throw error;
        
        setIsInitialized(count ? count > 0 : false);
      } catch (error) {
        console.error('Error checking initialization:', error);
        setIsInitialized(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkInitialization();
  }, []);

  return { isInitialized, isLoading };
};
