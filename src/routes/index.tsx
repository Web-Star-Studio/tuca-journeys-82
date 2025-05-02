
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Main pages
import Home from '@/pages/Home';
import Accommodations from '@/pages/Hospedagens';
import Activities from '@/pages/Activities';
import Events from '@/pages/Events';
import Restaurants from '@/pages/Restaurants';

// Admin pages
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminAccommodations from '@/pages/admin/Accommodations';
import AdminActivities from '@/pages/admin/Activities';
import AdminEvents from '@/pages/admin/Events';
import AdminRestaurants from '@/pages/admin/Restaurants';

// Auth pages
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Unauthorized from '@/pages/Unauthorized';
import NotFound from '@/pages/NotFound';

// Protected route wrapper
import ProtectedRoute from '@/components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/hospedagens" element={<Accommodations />} />
      <Route path="/atividades" element={<Activities />} />
      <Route path="/eventos" element={<Events />} />
      <Route path="/restaurantes" element={<Restaurants />} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Admin routes - protected */}
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/hospedagens" element={<ProtectedRoute><AdminAccommodations /></ProtectedRoute>} />
      <Route path="/admin/atividades" element={<ProtectedRoute><AdminActivities /></ProtectedRoute>} />
      <Route path="/admin/eventos" element={<ProtectedRoute><AdminEvents /></ProtectedRoute>} />
      <Route path="/admin/restaurantes" element={<ProtectedRoute><AdminRestaurants /></ProtectedRoute>} />

      {/* Catch all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
