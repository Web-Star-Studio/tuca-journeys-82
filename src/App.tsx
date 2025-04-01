
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext"; 
import { Toaster } from "./components/ui/toaster";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import Hospedagens from "./pages/Hospedagens";
import AccommodationDetail from "./pages/AccommodationDetail";
import Packages from "./pages/Packages";
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
import NotFound from "./pages/NotFound";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/passeios" element={<Tours />} />
            <Route path="/passeios/:id" element={<TourDetail />} />
            <Route path="/hospedagens" element={<Hospedagens />} />
            <Route path="/hospedagens/:id" element={<AccommodationDetail />} />
            <Route path="/pacotes" element={<Packages />} />
            <Route path="/loja" element={<Store />} />
            <Route path="/loja/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/recuperar-senha" element={<ResetPassword />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/reservar" element={<Booking />} />
            <Route path="/reserva-confirmada" element={<BookingConfirmation />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
