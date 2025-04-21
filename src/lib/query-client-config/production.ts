
import { CreateQueryClientConfig } from './types';

export const createProdConfig: CreateQueryClientConfig = () => ({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 3,
      staleTime: 1000 * 60 * 2, // 2 minutes
      gcTime: 1000 * 60 * 15, // 15 minutes
    },
  },
});
