
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { UIProvider } from './contexts/UIContext';
import publicRoutes from './routes/publicRoutes';
import { protectedRoutes } from './routes/protectedRoutes';
import adminRoutes from './routes/adminRoutes';
import ScrollToTop from './components/utils/ScrollToTop';
import GlobalLoading from './components/utils/GlobalLoading';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Component to render all routes
const AppRoutes = () => {
  // Combine all routes
  const allRoutes = [...publicRoutes, ...protectedRoutes, ...adminRoutes];
  return useRoutes(allRoutes);
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <UIProvider>
            <CartProvider>
              <WishlistProvider>
                <Router>
                  <ScrollToTop />
                  <Suspense fallback={<GlobalLoading />}>
                    <AppRoutes />
                  </Suspense>
                </Router>
                <Toaster position="top-center" richColors closeButton />
              </WishlistProvider>
            </CartProvider>
          </UIProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
