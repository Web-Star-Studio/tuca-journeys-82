
import { Route, Navigate } from 'react-router-dom';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminTours from '@/pages/admin/Tours';
import { TourForm } from '@/components/admin/tours/TourForm';
import AdminAccommodations from '@/pages/admin/Accommodations';
import { AccommodationForm } from '@/components/admin/accommodations/AccommodationForm';
import AdminPackages from '@/pages/admin/Packages';
import PackageForm from '@/components/admin/packages/PackageForm';
import AdminBookings from '@/pages/admin/Bookings';
import AdminUsers from '@/pages/admin/Users';
import AdminProducts from '@/pages/admin/Products';
import { ProductForm } from '@/components/admin/products/ProductForm';
import AdminSettings from '@/pages/admin/Settings';
import { InitialSetup } from '@/components/setup/InitialSetup';
import SystemHealth from '@/pages/admin/SystemHealth';
import AdminGuard from '@/components/auth/AdminGuard';

// Import reports from the correct locations
import RevenueReport from '@/components/admin/reports/RevenueReport';
import BookingsReport from '@/components/admin/reports/BookingsReport';
import PackagesReport from '@/components/admin/reports/PackagesReport';
import AccommodationsReport from '@/components/admin/reports/AccommodationsReport';
import UsersReport from '@/components/admin/reports/UsersReport';
import BookingsReportContainer from '@/components/admin/reports/bookings/BookingsReportContainer';

export const adminRoutes = (
  <>
    <Route path="/setup" element={<InitialSetup />} />
    <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
    <Route path="/admin/dashboard" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
    <Route path="/admin/tours" element={<AdminGuard><AdminTours /></AdminGuard>} />
    <Route path="/admin/tours/new" element={<AdminGuard><TourForm onSuccess={() => {}} onCancel={() => {}} /></AdminGuard>} />
    <Route path="/admin/tours/:id" element={<AdminGuard><TourForm onSuccess={() => {}} onCancel={() => {}} /></AdminGuard>} />
    <Route path="/admin/accommodations" element={<AdminGuard><AdminAccommodations /></AdminGuard>} />
    <Route path="/admin/accommodations/new" element={<AdminGuard><AccommodationForm onSuccess={() => {}} onCancel={() => {}} /></AdminGuard>} />
    <Route path="/admin/accommodations/:id" element={<AdminGuard><AccommodationForm onSuccess={() => {}} onCancel={() => {}} /></AdminGuard>} />
    <Route path="/admin/packages" element={<AdminGuard><AdminPackages /></AdminGuard>} />
    <Route path="/admin/packages/new" element={<AdminGuard><PackageForm packageId={null} onCancel={() => {}} onSuccess={() => {}} /></AdminGuard>} />
    <Route path="/admin/packages/:id" element={<AdminGuard><PackageForm packageId={0} onCancel={() => {}} onSuccess={() => {}} /></AdminGuard>} />
    <Route path="/admin/bookings" element={<AdminGuard><AdminBookings /></AdminGuard>} />
    <Route path="/admin/users" element={<AdminGuard><AdminUsers /></AdminGuard>} />
    <Route path="/admin/products" element={<AdminGuard><AdminProducts /></AdminGuard>} />
    <Route path="/admin/products/new" element={<AdminGuard><ProductForm onSuccess={() => {}} onCancel={() => {}} /></AdminGuard>} />
    <Route path="/admin/products/:id" element={<AdminGuard><ProductForm onSuccess={() => {}} onCancel={() => {}} /></AdminGuard>} />
    <Route path="/admin/settings" element={<AdminGuard><AdminSettings /></AdminGuard>} />
    <Route path="/admin/system-health" element={<AdminGuard><SystemHealth /></AdminGuard>} />
    
    {/* Reports */}
    <Route path="/admin/reports/revenue" element={<AdminGuard><RevenueReport dateRange={{from: undefined, to: undefined}} /></AdminGuard>} />
    <Route path="/admin/reports/bookings" element={<AdminGuard><BookingsReportContainer dateRange={{from: undefined, to: undefined}} /></AdminGuard>} />
    <Route path="/admin/reports/packages" element={<AdminGuard><PackagesReport dateRange={{from: undefined, to: undefined}} /></AdminGuard>} />
    <Route path="/admin/reports/accommodations" element={<AdminGuard><AccommodationsReport dateRange={{from: undefined, to: undefined}} /></AdminGuard>} />
    <Route path="/admin/reports/users" element={<AdminGuard><UsersReport dateRange={{from: undefined, to: undefined}} /></AdminGuard>} />
  </>
);
