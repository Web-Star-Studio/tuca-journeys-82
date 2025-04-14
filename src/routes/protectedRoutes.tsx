
import { Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Bookings from '@/pages/Booking';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import PaymentConfirmation from '@/pages/CheckoutSuccess';

export const protectedRoutes = (
  <>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/bookings" element={<Bookings />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
  </>
);
