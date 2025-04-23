
import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Wishlist from '@/pages/Wishlist';
import Orders from '@/pages/Orders';
import OrderDetail from '@/pages/OrderDetail';
import Checkout from '@/pages/Checkout';
import BookingDetail from '@/pages/BookingDetail';

export const protectedRoutes = (
  <>
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
    <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
    <Route path="/orders/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
    <Route path="/bookings/:id" element={<ProtectedRoute><BookingDetail /></ProtectedRoute>} />
  </>
);
