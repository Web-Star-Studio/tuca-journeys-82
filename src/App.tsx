
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { UIProvider } from './contexts/UIContext';
import { publicRoutes } from './routes/publicRoutes';
import { protectedRoutes } from './routes/protectedRoutes';
import { adminRoutes } from './routes/adminRoutes';
import ScrollToTop from './components/utils/ScrollToTop';
import GlobalLoading from './components/utils/GlobalLoading';

// Create a client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <AuthProvider>
            <UIProvider>
              <CartProvider>
                <WishlistProvider>
                  <ScrollToTop />
                  <Suspense fallback={<GlobalLoading />}>
                    <Routes>
                      {publicRoutes}
                      {protectedRoutes}
                      {adminRoutes}
                    </Routes>
                  </Suspense>
                  <Toaster position="top-center" richColors closeButton />
                </WishlistProvider>
              </CartProvider>
            </UIProvider>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
