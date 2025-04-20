
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface UseSetupInitializedResult {
  isInitialized: boolean;
  isLoading: boolean;
  error: Error | null;
}

export const useSetupInitialized = (): UseSetupInitializedResult => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkSetupStatus = async () => {
      try {
        setIsLoading(true);
        
        // Verificar no localStorage para demonstração (em produção, verificaríamos no banco)
        const setupCompleted = localStorage.getItem('setupCompleted');
        
        if (setupCompleted === 'true') {
          setIsInitialized(true);
          return;
        }

        // Em um ambiente real, verificaríamos no Supabase
        // const { data, error } = await supabase
        //   .from('system_settings')
        //   .select('value')
        //   .eq('key', 'setup_completed')
        //   .single();
        //
        // if (error) throw error;
        // setIsInitialized(data?.value === 'true');

        // Para demonstração, assumimos que não está inicializado
        setIsInitialized(false);
      } catch (err) {
        console.error('Erro ao verificar status de inicialização:', err);
        setError(err as Error);
        // Em caso de erro, permitimos o acesso à aplicação
        setIsInitialized(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkSetupStatus();
  }, []);

  return { isInitialized, isLoading, error };
};
