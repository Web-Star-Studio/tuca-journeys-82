
import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';

// Admin pages
import Dashboard from '@/pages/admin/Dashboard';
import Tours from '@/pages/admin/Tours';
import Accommodations from '@/pages/admin/Accommodations';
import Bookings from '@/pages/admin/Bookings';
import Packages from '@/pages/admin/Packages';
import Products from '@/pages/admin/Products';
import Users from '@/pages/admin/Users';
import Media from '@/pages/admin/Media';
import Reports from '@/pages/admin/Reports';
import Settings from '@/pages/admin/Settings';

export const adminRoutes = (
  <>
    <Route path="/admin" element={
      <ProtectedRoute requiredPermission="admin">
        <Dashboard />
      </ProtectedRoute>
    } />
    <Route path="/admin/tours" element={
      <ProtectedRoute requiredPermission="admin">
        <Tours />
      </ProtectedRoute>
    } />
    <Route path="/admin/accommodations" element={
      <ProtectedRoute requiredPermission="admin">
        <Accommodations />
      </ProtectedRoute>
    } />
    <Route path="/admin/bookings" element={
      <ProtectedRoute requiredPermission="admin">
        <Bookings />
      </ProtectedRoute>
    } />
    <Route path="/admin/packages" element={
      <ProtectedRoute requiredPermission="admin">
        <Packages />
      </ProtectedRoute>
    } />
    <Route path="/admin/products" element={
      <ProtectedRoute requiredPermission="admin">
        <Products />
      </ProtectedRoute>
    } />
    <Route path="/admin/users" element={
      <ProtectedRoute requiredPermission="admin">
        <Users />
      </ProtectedRoute>
    } />
    <Route path="/admin/media" element={
      <ProtectedRoute requiredPermission="admin">
        <Media />
      </ProtectedRoute>
    } />
    <Route path="/admin/reports" element={
      <ProtectedRoute requiredPermission="admin">
        <Reports />
      </ProtectedRoute>
    } />
    <Route path="/admin/settings" element={
      <ProtectedRoute requiredPermission="admin">
        <Settings />
      </ProtectedRoute>
    } />
  </>
);
