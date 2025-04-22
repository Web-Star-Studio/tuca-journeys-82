
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoadingPage from '@/components/utils/LoadingPage';

// Lazy loaded components
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Profile = lazy(() => import('@/pages/Profile'));
const Wishlist = lazy(() => import('@/pages/Wishlist'));
const Orders = lazy(() => import('@/pages/Orders'));
const OrderDetail = lazy(() => import('@/pages/OrderDetail'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const BookingDetail = lazy(() => import('@/pages/BookingDetail'));
const PreferencesWizard = lazy(() => import('@/components/preferences-wizard/PreferencesWizard'));

export const protectedRoutes = (
  <>
    <Route 
      path="/dashboard" 
      element={
        <ProtectedRoute>
          <React.Suspense fallback={<LoadingPage />}>
            <Dashboard />
          </React.Suspense>
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/profile" 
      element={
        <ProtectedRoute>
          <React.Suspense fallback={<LoadingPage />}>
            <Profile />
          </React.Suspense>
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/wishlist" 
      element={
        <ProtectedRoute>
          <React.Suspense fallback={<LoadingPage />}>
            <Wishlist />
          </React.Suspense>
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/orders" 
      element={
        <ProtectedRoute>
          <React.Suspense fallback={<LoadingPage />}>
            <Orders />
          </React.Suspense>
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/orders/:id" 
      element={
        <ProtectedRoute>
          <React.Suspense fallback={<LoadingPage />}>
            <OrderDetail />
          </React.Suspense>
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/checkout" 
      element={
        <ProtectedRoute>
          <React.Suspense fallback={<LoadingPage />}>
            <Checkout />
          </React.Suspense>
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/bookings/:id" 
      element={
        <ProtectedRoute>
          <React.Suspense fallback={<LoadingPage />}>
            <BookingDetail />
          </React.Suspense>
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/preferences/wizard" 
      element={
        <ProtectedRoute>
          <React.Suspense fallback={<LoadingPage />}>
            <PreferencesWizard />
          </React.Suspense>
        </ProtectedRoute>
      } 
    />
  </>
);
