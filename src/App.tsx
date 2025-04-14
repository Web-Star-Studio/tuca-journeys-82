import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext"; 
import { WishlistProvider } from "./contexts/WishlistContext";
import { QueryProvider } from "./providers/QueryProvider";
import { NavigationProvider } from "./providers/NavigationProvider";
import { Toaster } from "./components/ui/toaster";
import ScrollToTop from "./components/utils/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import Hospedagens from "./pages/Hospedagens";
import AccommodationDetail from "./pages/AccommodationDetail";
import Packages from "./pages/Packages";
import PackageDetail from "./pages/PackageDetail";
import Store from "./pages/Store";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Booking from "./pages/Booking";
import BookingConfirmation from "./pages/BookingConfirmation";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Wishlist from "./pages/Wishlist";
import Payments from "./pages/Payments";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Partners from "./pages/Partners";
import PartnerDetail from "./pages/PartnerDetail";
import Mapa from "./pages/Mapa";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminTours from "./pages/admin/Tours";
import AdminAccommodations from "./pages/admin/Accommodations";
import AdminPackages from "./pages/admin/Packages";
import AdminUsers from "./pages/admin/Users";
import AdminBookings from "./pages/admin/Bookings";
import AdminMedia from "./pages/admin/Media";
import AdminProducts from "./pages/admin/Products";
import AdminReports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";

import "./App.css";

const App = () => {
  return (
    <QueryProvider>
      <Router>
        <NavigationProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/sobre" element={<About />} />
                  <Route path="/contato" element={<Contact />} />
                  <Route path="/passeios" element={<Tours />} />
                  <Route path="/passeios/:id" element={<TourDetail />} />
                  <Route path="/hospedagens" element={<Hospedagens />} />
                  <Route path="/hospedagens/:id" element={<AccommodationDetail />} />
                  <Route path="/pacotes" element={<Packages />} />
                  <Route path="/pacotes/:id" element={<PackageDetail />} />
                  <Route path="/loja" element={<Store />} />
                  <Route path="/loja/:id" element={<ProductDetail />} />
                  <Route path="/eventos" element={<Events />} />
                  <Route path="/eventos/:id" element={<EventDetail />} />
                  <Route path="/parceiros" element={<Partners />} />
                  <Route path="/parceiros/:id" element={<PartnerDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/cadastro" element={<Register />} />
                  <Route path="/recuperar-senha" element={<ResetPassword />} />
                  <Route path="/perfil" element={<Profile />} />
                  <Route path="/lista-de-desejos" element={<Wishlist />} />
                  <Route path="/reservar" element={<Booking />} />
                  <Route path="/reserva-confirmada" element={<BookingConfirmation />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/checkout/success" element={<CheckoutSuccess />} />
                  <Route path="/pagamentos" element={<Payments />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/mapa" element={<Mapa />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/tours" element={<AdminTours />} />
                  <Route path="/admin/accommodations" element={<AdminAccommodations />} />
                  <Route path="/admin/packages" element={<AdminPackages />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route path="/admin/bookings" element={<AdminBookings />} />
                  <Route path="/admin/media" element={<AdminMedia />} />
                  <Route path="/admin/products" element={<AdminProducts />} />
                  <Route path="/admin/reports" element={<AdminReports />} />
                  <Route path="/admin/settings" element={<AdminSettings />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </NavigationProvider>
      </Router>
    </QueryProvider>
  );
};

export default App;
