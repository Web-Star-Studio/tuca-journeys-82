import React, { lazy } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminGuard from '@/components/auth/AdminGuard';
import LoadingPage from '@/components/utils/LoadingPage';

// Lazy loaded components
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AdminTours = lazy(() => import('@/pages/admin/Tours'));
const TourForm = lazy(() => import('@/components/admin/tours/TourForm').then(module => ({ default: module.TourForm })));
const AdminAccommodations = lazy(() => import('@/pages/admin/Accommodations'));
const AccommodationForm = lazy(() => import('@/components/admin/accommodations/AccommodationForm').then(module => ({ default: module.AccommodationForm })));
const AdminPackages = lazy(() => import('@/pages/admin/Packages'));
const PackageForm = lazy(() => import('@/components/admin/packages/PackageForm'));
const AdminBookings = lazy(() => import('@/pages/admin/Bookings'));
const AdminUsers = lazy(() => import('@/pages/admin/Users'));
const AdminProducts = lazy(() => import('@/pages/admin/Products'));
const ProductForm = lazy(() => import('@/components/admin/products/ProductForm').then(module => ({ default: module.ProductForm })));
const AdminSettings = lazy(() => import('@/pages/admin/Settings'));
const SystemHealth = lazy(() => import('@/pages/admin/SystemHealth'));

// Convert InitialSetup to lazy loaded component properly
// Removed the direct import of InitialSetup, will use the route from setupRoute.tsx instead

// Reports components
const RevenueReport = lazy(() => import('@/components/admin/reports/RevenueReport'));
const BookingsReport = lazy(() => import('@/components/admin/reports/BookingsReport'));
const PackagesReport = lazy(() => import('@/components/admin/reports/PackagesReport'));
const AccommodationsReport = lazy(() => import('@/components/admin/reports/AccommodationsReport'));
const UsersReport = lazy(() => import('@/components/admin/reports/UsersReport'));
const BookingsReportContainer = lazy(() => import('@/components/admin/reports/bookings/BookingsReportContainer'));

export const adminRoutes = (
  <>
    {/* Removed the duplicate /setup route since it's already defined in setupRoute.tsx */}
    <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
    <Route 
      path="/admin/dashboard" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <AdminDashboard />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    <Route 
      path="/admin/tours" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <AdminTours />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    <Route 
      path="/admin/tours/new" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <TourForm onSuccess={() => {}} onCancel={() => {}} />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    <Route 
      path="/admin/tours/:id" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <TourForm onSuccess={() => {}} onCancel={() => {}} />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    <Route 
      path="/admin/accommodations" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <AdminAccommodations />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    <Route 
      path="/admin/accommodations/new" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <AccommodationForm onSuccess={() => {}} onCancel={() => {}} />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    <Route 
      path="/admin/accommodations/:id" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <AccommodationForm onSuccess={() => {}} onCancel={() => {}} />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    <Route 
      path="/admin/packages" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <AdminPackages />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    <Route 
      path="/admin/packages/new" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <PackageForm packageId={null} onCancel={() => {}} onSuccess={() => {}} />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    <Route 
      path="/admin/packages/:id" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <PackageForm packageId={0} onCancel={() => {}} onSuccess={() => {}} />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    <Route 
      path="/admin/bookings" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <AdminBookings />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    <Route 
      path="/admin/users" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <AdminUsers />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    <Route 
      path="/admin/products" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <AdminProducts />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    <Route 
      path="/admin/products/new" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <ProductForm onSuccess={() => {}} onCancel={() => {}} />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    <Route 
      path="/admin/products/:id" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <ProductForm onSuccess={() => {}} onCancel={() => {}} />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    <Route 
      path="/admin/settings" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <AdminSettings />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    <Route 
      path="/admin/system-health" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <SystemHealth />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    
    {/* Reports */}
    <Route 
      path="/admin/reports/revenue" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <RevenueReport dateRange={{from: undefined, to: undefined}} />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    <Route 
      path="/admin/reports/bookings" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <BookingsReportContainer dateRange={{from: undefined, to: undefined}} />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    <Route 
      path="/admin/reports/packages" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <PackagesReport dateRange={{from: undefined, to: undefined}} />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    <Route 
      path="/admin/reports/accommodations" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <AccommodationsReport dateRange={{from: undefined, to: undefined}} />
          </React.Suspense>
        </AdminGuard>
      } 
    />
    <Route 
      path="/admin/reports/users" 
      element={
        <AdminGuard>
          <React.Suspense fallback={<LoadingPage />}>
            <UsersReport dateRange={{from: undefined, to: undefined}} />
          </React.Suspense>
        </AdminGuard>
      } 
    />
  </>
);
