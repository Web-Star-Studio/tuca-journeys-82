
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getToursFromDB, getTourByIdFromDB } from '@/lib/api';
import { useToast } from './use-toast';

export const useTours = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['tours'],
    queryFn: getToursFromDB,
    meta: {
      onError: (error: Error) => {
        toast({
          title: "Erro ao carregar passeios",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  });
};

export const useTour = (id: number | undefined) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['tour', id],
    queryFn: () => {
      if (!id) throw new Error("ID do passeio não fornecido");
      return getTourByIdFromDB(id);
    },
    enabled: !!id,
    meta: {
      onError: (error: Error) => {
        toast({
          title: "Erro ao carregar detalhes do passeio",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  });
};
