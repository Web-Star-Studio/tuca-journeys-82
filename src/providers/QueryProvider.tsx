
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query-client-config';
import { handleQueryError, handleMutationError } from '@/lib/query-error-handlers';

interface QueryProviderProps {
  children: React.ReactNode;
}

// Create a client instance
export const queryClient = createQueryClient();

// Configure global error handlers
queryClient.setDefaultOptions({
  queries: {
    ...queryClient.getDefaultOptions().queries,
    meta: {
      onError: handleQueryError
    }
  },
  mutations: {
    ...queryClient.getDefaultOptions().mutations,
    meta: {
      onError: handleMutationError
    }
  }
});

export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;

