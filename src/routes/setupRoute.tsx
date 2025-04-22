
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import LoadingPage from '@/components/utils/LoadingPage';

// Lazy loaded components
const SetupPage = lazy(() => import('@/pages/SetupPage'));
const CreateAccountsPage = lazy(() => import('@/pages/setup/CreateAccountsPage'));

export const setupRoute = (
  <>
    <Route 
      path="/setup" 
      element={
        <React.Suspense fallback={<LoadingPage />}>
          <SetupPage />
        </React.Suspense>
      }
    />
    <Route 
      path="/setup/accounts" 
      element={
        <React.Suspense fallback={<LoadingPage />}>
          <CreateAccountsPage />
        </React.Suspense>
      }
    />
  </>
);
