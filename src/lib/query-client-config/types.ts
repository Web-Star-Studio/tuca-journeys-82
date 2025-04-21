
import { QueryClientConfig } from '@tanstack/react-query';

export interface QueryConfigOptions {
  refetchOnWindowFocus: boolean;
  retry: number;
  staleTime: number;
  gcTime: number;
}

export type CreateQueryClientConfig = () => QueryClientConfig;
