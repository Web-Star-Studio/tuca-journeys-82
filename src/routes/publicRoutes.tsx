
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import LoadingPage from '@/components/utils/LoadingPage';

// Lazy loaded components
const Home = lazy(() => import('@/pages/Index'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword'));
const Tours = lazy(() => import('@/pages/Tours'));
const TourDetail = lazy(() => import('@/pages/TourDetail'));
const Packages = lazy(() => import('@/pages/Packages'));
const PackageDetail = lazy(() => import('@/pages/PackageDetail'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Events = lazy(() => import('@/pages/Events'));
const EventDetail = lazy(() => import('@/pages/EventDetail'));
const Mapa = lazy(() => import('@/pages/Mapa'));
const Hospedagens = lazy(() => import('@/pages/Hospedagens'));
const Wishlist = lazy(() => import('@/pages/Wishlist'));
const Loja = lazy(() => import('@/pages/Loja'));
const ProductDetails = lazy(() => import('@/pages/ProductDetails'));
const Partners = lazy(() => import('@/pages/Partners'));
const AccommodationDetail = lazy(() => import('@/pages/AccommodationDetail'));
const Reservar = lazy(() => import('@/pages/Reservar'));

export const publicRoutes = (
  <>
    <Route 
      path="/" 
      element={<React.Suspense fallback={<LoadingPage />}><Home /></React.Suspense>} 
    />
    <Route 
      path="/login" 
      element={<React.Suspense fallback={<LoadingPage />}><Login /></React.Suspense>} 
    />
    <Route 
      path="/cadastro" 
      element={<React.Suspense fallback={<LoadingPage />}><Register /></React.Suspense>} 
    />
    <Route 
      path="/esqueci-senha" 
      element={<React.Suspense fallback={<LoadingPage />}><ResetPassword /></React.Suspense>} 
    />
    <Route 
      path="/redefinir-senha" 
      element={<React.Suspense fallback={<LoadingPage />}><ResetPassword /></React.Suspense>} 
    />
    <Route 
      path="/reservar" 
      element={<React.Suspense fallback={<LoadingPage />}><Reservar /></React.Suspense>} 
    />
    
    {/* Portuguese Routes */}
    <Route 
      path="/passeios" 
      element={<React.Suspense fallback={<LoadingPage />}><Tours /></React.Suspense>} 
    />
    <Route 
      path="/passeios/:id" 
      element={<React.Suspense fallback={<LoadingPage />}><TourDetail /></React.Suspense>} 
    />
    <Route 
      path="/hospedagens" 
      element={<React.Suspense fallback={<LoadingPage />}><Hospedagens /></React.Suspense>} 
    />
    <Route 
      path="/hospedagens/:id" 
      element={<React.Suspense fallback={<LoadingPage />}><AccommodationDetail /></React.Suspense>} 
    />
    <Route 
      path="/pacotes" 
      element={<React.Suspense fallback={<LoadingPage />}><Packages /></React.Suspense>} 
    />
    <Route 
      path="/pacotes/:id" 
      element={<React.Suspense fallback={<LoadingPage />}><PackageDetail /></React.Suspense>} 
    />
    <Route 
      path="/sobre" 
      element={<React.Suspense fallback={<LoadingPage />}><About /></React.Suspense>} 
    />
    <Route 
      path="/contato" 
      element={<React.Suspense fallback={<LoadingPage />}><Contact /></React.Suspense>} 
    />
    <Route 
      path="/eventos" 
      element={<React.Suspense fallback={<LoadingPage />}><Events /></React.Suspense>} 
    />
    <Route 
      path="/eventos/:id" 
      element={<React.Suspense fallback={<LoadingPage />}><EventDetail /></React.Suspense>} 
    />
    <Route 
      path="/mapa" 
      element={<React.Suspense fallback={<LoadingPage />}><Mapa /></React.Suspense>} 
    />
    <Route 
      path="/parceiros" 
      element={<React.Suspense fallback={<LoadingPage />}><Partners /></React.Suspense>} 
    />
    <Route 
      path="/loja" 
      element={<React.Suspense fallback={<LoadingPage />}><Loja /></React.Suspense>} 
    />
    <Route 
      path="/loja/:id" 
      element={<React.Suspense fallback={<LoadingPage />}><ProductDetails /></React.Suspense>} 
    />
    <Route 
      path="/produto/:id" 
      element={<React.Suspense fallback={<LoadingPage />}><ProductDetails /></React.Suspense>} 
    />
    <Route 
      path="/lista-de-desejos" 
      element={<React.Suspense fallback={<LoadingPage />}><Wishlist /></React.Suspense>} 
    />
    
    {/* English Routes (for backward compatibility) */}
    <Route 
      path="/tours" 
      element={<React.Suspense fallback={<LoadingPage />}><Tours /></React.Suspense>} 
    />
    <Route 
      path="/tours/:id" 
      element={<React.Suspense fallback={<LoadingPage />}><TourDetail /></React.Suspense>} 
    />
    <Route 
      path="/packages" 
      element={<React.Suspense fallback={<LoadingPage />}><Packages /></React.Suspense>} 
    />
    <Route 
      path="/packages/:id" 
      element={<React.Suspense fallback={<LoadingPage />}><PackageDetail /></React.Suspense>} 
    />
    <Route 
      path="/about" 
      element={<React.Suspense fallback={<LoadingPage />}><About /></React.Suspense>} 
    />
    <Route 
      path="/contact" 
      element={<React.Suspense fallback={<LoadingPage />}><Contact /></React.Suspense>} 
    />
    <Route 
      path="/store" 
      element={<React.Suspense fallback={<LoadingPage />}><Loja /></React.Suspense>} 
    />
    <Route 
      path="/store/:id" 
      element={<React.Suspense fallback={<LoadingPage />}><ProductDetails /></React.Suspense>} 
    />
    
    <Route 
      path="*" 
      element={<React.Suspense fallback={<LoadingPage />}><NotFound /></React.Suspense>} 
    />
  </>
);
