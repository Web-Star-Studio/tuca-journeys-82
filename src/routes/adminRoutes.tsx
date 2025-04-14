
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

// Import reports from the correct locations
import RevenueReport from '@/components/admin/reports/RevenueReport';
import BookingsReport from '@/components/admin/reports/BookingsReport';
import PackagesReport from '@/components/admin/reports/PackagesReport';
import AccommodationsReport from '@/components/admin/reports/AccommodationsReport';
import UsersReport from '@/components/admin/reports/UsersReport';

export const adminRoutes = (
  <>
    <Route path="/setup" element={<InitialSetup />} />
    <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/admin/tours" element={<AdminTours />} />
    <Route path="/admin/tours/new" element={<TourForm onSuccess={() => {}} onCancel={() => {}} />} />
    <Route path="/admin/tours/:id" element={<TourForm onSuccess={() => {}} onCancel={() => {}} />} />
    <Route path="/admin/accommodations" element={<AdminAccommodations />} />
    <Route path="/admin/accommodations/new" element={<AccommodationForm onSuccess={() => {}} onCancel={() => {}} />} />
    <Route path="/admin/accommodations/:id" element={<AccommodationForm onSuccess={() => {}} onCancel={() => {}} />} />
    <Route path="/admin/packages" element={<AdminPackages />} />
    <Route path="/admin/packages/new" element={<PackageForm onCancel={() => {}} onSuccess={() => {}} />} />
    <Route path="/admin/packages/:id" element={<PackageForm onCancel={() => {}} onSuccess={() => {}} />} />
    <Route path="/admin/bookings" element={<AdminBookings />} />
    <Route path="/admin/users" element={<AdminUsers />} />
    <Route path="/admin/products" element={<AdminProducts />} />
    <Route path="/admin/products/new" element={<ProductForm onSuccess={() => {}} onCancel={() => {}} />} />
    <Route path="/admin/products/:id" element={<ProductForm onSuccess={() => {}} onCancel={() => {}} />} />
    <Route path="/admin/settings" element={<AdminSettings />} />
    
    {/* Reports */}
    <Route path="/admin/reports/revenue" element={<RevenueReport dateRange={{from: undefined, to: undefined}} />} />
    <Route path="/admin/reports/bookings" element={<BookingsReport />} />
    <Route path="/admin/reports/packages" element={<PackagesReport dateRange={{from: undefined, to: undefined}} />} />
    <Route path="/admin/reports/accommodations" element={<AccommodationsReport dateRange={{from: undefined, to: undefined}} />} />
    <Route path="/admin/reports/users" element={<UsersReport dateRange={{from: undefined, to: undefined}} />} />
  </>
);
