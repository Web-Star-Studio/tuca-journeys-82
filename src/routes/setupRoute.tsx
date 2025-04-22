
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import LoadingPage from '@/components/utils/LoadingPage';

// Lazy loaded component
const SetupPage = lazy(() => import('@/pages/SetupPage'));

export const setupRoute = (
  <Route 
    path="/setup" 
    element={
      <React.Suspense fallback={<LoadingPage />}>
        <SetupPage />
      </React.Suspense>
    }
  />
);
