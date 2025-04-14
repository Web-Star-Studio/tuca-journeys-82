
import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { publicRoutes } from './routes/publicRoutes';
import { protectedRoutes } from './routes/protectedRoutes';
import { adminRoutes } from './routes/adminRoutes';

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
              <Routes>
                {publicRoutes}
                {protectedRoutes}
                {adminRoutes}
              </Routes>
            </Router>
            <Toaster position="top-center" richColors closeButton />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
