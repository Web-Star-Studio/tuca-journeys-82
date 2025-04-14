
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';

// Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Dashboard from './pages/Dashboard';
import Tours from './pages/Tours';
import TourDetail from './pages/TourDetail';
import Accommodations from './pages/Accommodations';
import AccommodationDetail from './pages/AccommodationDetail';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PaymentConfirmation from './pages/PaymentConfirmation';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminTours from './pages/admin/Tours';
import AdminTourForm from './pages/admin/TourForm';
import AdminAccommodations from './pages/admin/Accommodations';
import AdminAccommodationForm from './pages/admin/AccommodationForm';
import AdminPackages from './pages/admin/Packages';
import AdminPackageForm from './pages/admin/PackageForm';
import AdminBookings from './pages/admin/Bookings';
import AdminBookingDetail from './pages/admin/BookingDetail';
import AdminUsers from './pages/admin/Users';
import AdminProducts from './pages/admin/Products';
import AdminProductForm from './pages/admin/ProductForm';
import AdminSettings from './pages/admin/Settings';

// Reports
import RevenueReport from './pages/admin/reports/Revenue';
import BookingsReport from './pages/admin/reports/Bookings';
import PackagesReport from './pages/admin/reports/Packages';
import AccommodationsReport from './pages/admin/reports/Accommodations';
import UsersReport from './pages/admin/reports/Users';

// Setup
import { InitialSetup } from './components/setup/InitialSetup';

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/tours/:id" element={<TourDetail />} />
                <Route path="/accommodations" element={<Accommodations />} />
                <Route path="/accommodations/:id" element={<AccommodationDetail />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/packages/:id" element={<PackageDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                
                {/* Setup route */}
                <Route path="/setup" element={<InitialSetup />} />
                
                {/* Protected routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
                
                {/* Admin routes */}
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/tours" element={<AdminTours />} />
                <Route path="/admin/tours/new" element={<AdminTourForm />} />
                <Route path="/admin/tours/:id" element={<AdminTourForm />} />
                <Route path="/admin/accommodations" element={<AdminAccommodations />} />
                <Route path="/admin/accommodations/new" element={<AdminAccommodationForm />} />
                <Route path="/admin/accommodations/:id" element={<AdminAccommodationForm />} />
                <Route path="/admin/packages" element={<AdminPackages />} />
                <Route path="/admin/packages/new" element={<AdminPackageForm />} />
                <Route path="/admin/packages/:id" element={<AdminPackageForm />} />
                <Route path="/admin/bookings" element={<AdminBookings />} />
                <Route path="/admin/bookings/:id" element={<AdminBookingDetail />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/products/new" element={<AdminProductForm />} />
                <Route path="/admin/products/:id" element={<AdminProductForm />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                
                {/* Reports */}
                <Route path="/admin/reports/revenue" element={<RevenueReport />} />
                <Route path="/admin/reports/bookings" element={<BookingsReport />} />
                <Route path="/admin/reports/packages" element={<PackagesReport />} />
                <Route path="/admin/reports/accommodations" element={<AccommodationsReport />} />
                <Route path="/admin/reports/users" element={<UsersReport />} />
                
                {/* Catch all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
            <Toaster position="top-center" richColors closeButton />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
