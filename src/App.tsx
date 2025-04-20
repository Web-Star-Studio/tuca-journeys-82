
import React, { Suspense, lazy } from 'react';
import { Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { UIProvider } from './contexts/UIContext';
import { CartProvider } from './contexts/CartContext';
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
        <ScrollToTop />
        <Suspense fallback={<GlobalLoading />}>
          <Routes>
            {setupRoute}
            <RequireSetup>
              {publicRoutes}
              {protectedRoutes}
              {adminRoutes}
              {partnerRoutes}
            </RequireSetup>
          </Routes>
        </Suspense>
        <Toaster position="top-center" richColors closeButton />
      </CartProvider>
    </UIProvider>
  );
};

export default App;
