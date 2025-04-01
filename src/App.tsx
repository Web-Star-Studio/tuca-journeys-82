
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Packages from "./pages/Packages";
import Hospedagens from "./pages/Hospedagens";
import AccommodationDetail from "./pages/AccommodationDetail";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import Booking from "./pages/Booking";
import BookingConfirmation from "./pages/BookingConfirmation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/pacotes" element={<Packages />} />
            <Route path="/hospedagens" element={<Hospedagens />} />
            <Route path="/hospedagens/:id" element={<AccommodationDetail />} />
            <Route path="/passeios" element={<Tours />} />
            <Route path="/passeios/:id" element={<TourDetail />} />
            <Route path="/reservar" element={<Booking />} />
            <Route path="/reserva-confirmada" element={<BookingConfirmation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/recuperar-senha" element={<ResetPassword />} />
            <Route path="/perfil" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
