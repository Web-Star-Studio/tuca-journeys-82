
import React from 'react';
import { Route } from 'react-router-dom';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Tours from '@/pages/Tours';
import TourDetail from '@/pages/TourDetail';
import TourBooking from '@/pages/TourBooking';
import Events from '@/pages/Events';
import EventDetail from '@/pages/EventDetail';
import Packages from '@/pages/Packages';
import PackageDetail from '@/pages/PackageDetail';
import Hospedagens from '@/pages/Hospedagens';
import AccommodationDetail from '@/pages/AccommodationDetail';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ResetPassword from '@/pages/ResetPassword';
import NotFound from '@/pages/NotFound';
import Unauthorized from '@/pages/Unauthorized';
import Mapa from '@/pages/Mapa';
import Partners from '@/pages/Partners';
import PartnerDetail from '@/pages/PartnerDetail';
import Store from '@/pages/Store';
import ProductDetails from '@/pages/ProductDetails';
import Cart from '@/pages/Cart';

export const publicRoutes = (
  <>
    <Route path="/" element={<Index />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/map" element={<Mapa />} />
    <Route path="/tours" element={<Tours />} />
    <Route path="/tours/:id" element={<TourDetail />} />
    <Route path="/tours/:id/booking" element={<TourBooking />} />
    <Route path="/events" element={<Events />} />
    <Route path="/events/:id" element={<EventDetail />} />
    <Route path="/packages" element={<Packages />} />
    <Route path="/packages/:id" element={<PackageDetail />} />
    <Route path="/accommodations" element={<Hospedagens />} />
    <Route path="/accommodations/:id" element={<AccommodationDetail />} />
    <Route path="/partners" element={<Partners />} />
    <Route path="/partners/:id" element={<PartnerDetail />} />
    <Route path="/store" element={<Store />} />
    <Route path="/products/:id" element={<ProductDetails />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/login" element={<Login />} />
    <Route path="/registro" element={<Register />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/unauthorized" element={<Unauthorized />} />
    <Route path="*" element={<NotFound />} />
  </>
);
