
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Activities from './pages/Activities';
import ActivityDetail from './pages/ActivityDetail';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Accommodations from './pages/Accommodations';
import AccommodationDetail from './pages/AccommodationDetail';
import Restaurants from './pages/Restaurants';
import UserProfile from './pages/UserProfile';
import ActivityBooking from './pages/ActivityBooking';
import AccommodationBooking from './pages/AccommodationBooking';
import About from './pages/About';
import Contact from './pages/Contact';
import adminRoutes from './routes/adminRoutes';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <WishlistProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/atividades" element={<Activities />} />
                <Route path="/atividades/:id" element={<ActivityDetail />} />
                <Route path="/eventos" element={<Events />} />
                <Route path="/eventos/:id" element={<EventDetail />} />
                <Route path="/acomodacoes" element={<Accommodations />} />
                <Route path="/acomodacoes/:id" element={<AccommodationDetail />} />
                <Route path="/restaurantes" element={<Restaurants />} />
                <Route path="/perfil" element={<UserProfile />} />
                <Route path="/reservar/atividade/:id" element={<ActivityBooking />} />
                <Route path="/reservar/acomodacao/:id" element={<AccommodationBooking />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/contato" element={<Contact />} />
                
                {/* Admin routes */}
                {adminRoutes.map((route) => (
                  <Route key={route.path} path={route.path} element={route.element} />
                ))}
              </Routes>
              <Toaster />
            </WishlistProvider>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
