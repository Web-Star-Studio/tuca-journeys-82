
import { Route } from 'react-router-dom';
import Home from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ResetPassword from '@/pages/ResetPassword';
import Tours from '@/pages/Tours';
import TourDetail from '@/pages/TourDetail';
import Packages from '@/pages/Packages';
import PackageDetail from '@/pages/PackageDetail';
import About from '@/pages/About';
import Contact from '@/pages/Contact';

export const publicRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ResetPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/tours" element={<Tours />} />
    <Route path="/tours/:id" element={<TourDetail />} />
    <Route path="/packages" element={<Packages />} />
    <Route path="/packages/:id" element={<PackageDetail />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<NotFound />} />
  </>
);
