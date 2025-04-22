
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import PartnerRoute from '@/components/partner/PartnerRoute';
import LoadingPage from '@/components/utils/LoadingPage';

// Lazy loaded components
const Dashboard = lazy(() => import('@/pages/partner/Dashboard'));
const Bookings = lazy(() => import('@/pages/partner/Bookings'));
const Clients = lazy(() => import('@/pages/partner/Clients'));
const Coupons = lazy(() => import('@/pages/partner/Coupons'));
const Settings = lazy(() => import('@/pages/partner/Settings'));
const Profile = lazy(() => import('@/pages/partner/Profile'));
const Reports = lazy(() => import('@/pages/partner/Reports'));
const Chat = lazy(() => import('@/pages/partner/Chat'));
const Feedback = lazy(() => import('@/pages/partner/Feedback'));
const Register = lazy(() => import('@/pages/partner/Register'));
const PartnerAccommodations = lazy(() => import('@/pages/partner/accommodations/PartnerAccommodations'));

export const partnerRoutes = (
  <>
    {/* Partner Registration */}
    <Route
      path="/parceiro/cadastro"
      element={
        <React.Suspense fallback={<LoadingPage />}>
          <Register />
        </React.Suspense>
      }
    />

    {/* Protected Partner Routes */}
    <Route
      path="/parceiro/dashboard"
      element={
        <PartnerRoute>
          <React.Suspense fallback={<LoadingPage />}>
            <Dashboard />
          </React.Suspense>
        </PartnerRoute>
      }
    />
    <Route
      path="/parceiro/reservas"
      element={
        <PartnerRoute>
          <React.Suspense fallback={<LoadingPage />}>
            <Bookings />
          </React.Suspense>
        </PartnerRoute>
      }
    />
    <Route
      path="/parceiro/clientes"
      element={
        <PartnerRoute>
          <React.Suspense fallback={<LoadingPage />}>
            <Clients />
          </React.Suspense>
        </PartnerRoute>
      }
    />
    <Route
      path="/parceiro/cupons"
      element={
        <PartnerRoute>
          <React.Suspense fallback={<LoadingPage />}>
            <Coupons />
          </React.Suspense>
        </PartnerRoute>
      }
    />
    <Route
      path="/parceiro/perfil"
      element={
        <PartnerRoute>
          <React.Suspense fallback={<LoadingPage />}>
            <Profile />
          </React.Suspense>
        </PartnerRoute>
      }
    />
    <Route
      path="/parceiro/relatorios"
      element={
        <PartnerRoute>
          <React.Suspense fallback={<LoadingPage />}>
            <Reports />
          </React.Suspense>
        </PartnerRoute>
      }
    />
    <Route
      path="/parceiro/chat"
      element={
        <PartnerRoute>
          <React.Suspense fallback={<LoadingPage />}>
            <Chat />
          </React.Suspense>
        </PartnerRoute>
      }
    />
    <Route
      path="/parceiro/feedback"
      element={
        <PartnerRoute>
          <React.Suspense fallback={<LoadingPage />}>
            <Feedback />
          </React.Suspense>
        </PartnerRoute>
      }
    />
    <Route
      path="/parceiro/configuracoes"
      element={
        <PartnerRoute>
          <React.Suspense fallback={<LoadingPage />}>
            <Settings />
          </React.Suspense>
        </PartnerRoute>
      }
    />
    <Route
      path="/parceiro/hospedagens"
      element={
        <PartnerRoute>
          <React.Suspense fallback={<LoadingPage />}>
            <PartnerAccommodations />
          </React.Suspense>
        </PartnerRoute>
      }
    />
  </>
);
