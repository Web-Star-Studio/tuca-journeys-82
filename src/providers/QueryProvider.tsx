
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from 'sonner';

interface QueryProviderProps {
  children: React.ReactNode;
}

// Create a client with better defaults for performance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
    },
    mutations: {
      onError: (error: any) => {
        // Global error handling for mutations
        const errorMessage = error?.message || 'An error occurred while updating data';
        console.error('Mutation error:', error);
        toast.error(errorMessage);
      }
    }
  }
});

// Global query error handler
const globalQueryErrorHandler = (error: any) => {
  // Global error handling for queries
  const errorMessage = error?.message || 'An error occurred while fetching data';
  console.error('Query error:', error);
  toast.error(errorMessage);
};

export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider 
      client={queryClient} 
      errorHandler={globalQueryErrorHandler}
    >
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
