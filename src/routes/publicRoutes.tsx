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
import Events from '@/pages/Events';
import EventDetail from '@/pages/EventDetail';
import Mapa from '@/pages/Mapa';
import Hospedagens from '@/pages/Hospedagens';
import Wishlist from '@/pages/Wishlist';
import Loja from '@/pages/Loja';
import ProductDetails from '@/pages/ProductDetails';
import Partners from '@/pages/Partners';
import AccommodationDetail from '@/pages/AccommodationDetail';
import Reservar from '@/pages/Reservar';

export const publicRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/cadastro" element={<Register />} />
    <Route path="/esqueci-senha" element={<ResetPassword />} />
    <Route path="/redefinir-senha" element={<ResetPassword />} />
    <Route path="/reservar" element={<Reservar />} />
    
    {/* Portuguese Routes */}
    <Route path="/passeios" element={<Tours />} />
    <Route path="/passeios/:id" element={<TourDetail />} />
    <Route path="/hospedagens" element={<Hospedagens />} />
    <Route path="/hospedagens/:id" element={<AccommodationDetail />} />
    <Route path="/pacotes" element={<Packages />} />
    <Route path="/pacotes/:id" element={<PackageDetail />} />
    <Route path="/sobre" element={<About />} />
    <Route path="/contato" element={<Contact />} />
    <Route path="/eventos" element={<Events />} />
    <Route path="/eventos/:id" element={<EventDetail />} />
    <Route path="/mapa" element={<Mapa />} />
    <Route path="/parceiros" element={<Partners />} />
    <Route path="/loja" element={<Loja />} />
    <Route path="/loja/:id" element={<ProductDetails />} />
    <Route path="/produto/:id" element={<ProductDetails />} />
    <Route path="/lista-de-desejos" element={<Wishlist />} />
    
    {/* English Routes (for backward compatibility) */}
    <Route path="/tours" element={<Tours />} />
    <Route path="/tours/:id" element={<TourDetail />} />
    <Route path="/packages" element={<Packages />} />
    <Route path="/packages/:id" element={<PackageDetail />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/store" element={<Loja />} />
    <Route path="/store/:id" element={<ProductDetails />} />
    
    <Route path="*" element={<NotFound />} />
  </>
);
