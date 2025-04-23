import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { UIProvider } from './contexts/UIContext';
import { CartProvider } from './contexts/CartContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { publicRoutes } from './routes/publicRoutes';
import { protectedRoutes } from './routes/protectedRoutes';
import { adminRoutes } from './routes/adminRoutes';
import { partnerRoutes } from './routes/partnerRoutes';
import { setupRoute } from './routes/setupRoute';
import ScrollToTop from './components/utils/ScrollToTop';
import GlobalLoading from './components/utils/GlobalLoading';
import RequireSetup from './components/utils/RequireSetup';

const App: React.FC = () => {
  return (
    <UIProvider>
      <CartProvider>
        <NotificationProvider>
          <ScrollToTop />
          <Suspense fallback={<GlobalLoading />}>
            <Routes>
              {/* Setup routes take precedence */}
              {setupRoute}
              
              {/* Other routes require system initialization */}
              <Route element={<RequireSetup />}>
                {publicRoutes}
                {protectedRoutes}
                {adminRoutes}
                {partnerRoutes}
              </Route>
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
          <Toaster position="top-center" richColors closeButton />
        </NotificationProvider>
      </CartProvider>
    </UIProvider>
  );
};

export default App;
