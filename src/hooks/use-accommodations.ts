
import { useQuery } from '@tanstack/react-query';
import { getAccommodationsFromDB, getAccommodationByIdFromDB } from '@/lib/api';
import { useToast } from './use-toast';

export const useAccommodations = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['accommodations'],
    queryFn: getAccommodationsFromDB,
    onError: (error: Error) => {
      toast({
        title: "Erro ao carregar hospedagens",
        description: error.message,
        variant: "destructive",
      });
    }
  });
};

export const useAccommodation = (id: number | undefined) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['accommodation', id],
    queryFn: () => {
      if (!id) throw new Error("ID da hospedagem não fornecido");
      return getAccommodationByIdFromDB(id);
    },
    enabled: !!id,
    onError: (error: Error) => {
      toast({
        title: "Erro ao carregar detalhes da hospedagem",
        description: error.message,
        variant: "destructive",
      });
    }
  });
};
