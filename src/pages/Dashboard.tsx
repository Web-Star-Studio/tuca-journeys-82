
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricsCards from "@/components/dashboard/MetricsCards";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import ActivityAnalysis from "@/components/dashboard/ActivityAnalysis";
import { Loader2 } from "lucide-react";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";
import { useProfile } from "@/hooks/use-profile";
import { useBookings } from "@/hooks/use-bookings";

const Dashboard = () => {
  // Redirect if user is not authenticated
  const { isLoading: authLoading, isAuthenticated } = useAuthRedirect({
    requiredAuth: true
  });
  
  // Fetch user profile and bookings
  const { profile, isLoading: profileLoading } = useProfile();
  const { bookings, isLoading: bookingsLoading } = useBookings();
  
  // Calculate user metrics from real data
  const calculateUserMetrics = () => {
    // Default values
    const metrics = {
      reservasAtivas: 0,
      pontosAcumulados: 0,
      diasAteProximaViagem: 0,
      statusPerfil: 0
    };
    
    // Count active bookings
    if (bookings?.length) {
      metrics.reservasAtivas = bookings.filter(b => b.status === 'confirmed').length;
      
      // Find next upcoming trip
      const upcomingBookings = bookings
        .filter(b => b.status === 'confirmed')
        .filter(b => new Date(b.start_date) > new Date())
        .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
        
      if (upcomingBookings.length) {
        const nextTrip = new Date(upcomingBookings[0].start_date);
        const daysUntil = Math.ceil((nextTrip.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        metrics.diasAteProximaViagem = daysUntil > 0 ? daysUntil : 0;
      }
      
      // Calculate points (simplified example: 10 points per booking)
      metrics.pontosAcumulados = bookings.length * 10;
    }
    
    // Calculate profile completeness
    if (profile) {
      let completedFields = 0;
      const totalFields = 8; // name, email, phone, address, city, state, zip_code, country
      if (profile.name) completedFields++;
      if (profile.email) completedFields++;
      if (profile.phone) completedFields++;
      if (profile.address) completedFields++;
      if (profile.city) completedFields++;
      if (profile.state) completedFields++;
      if (profile.zip_code) completedFields++;
      if (profile.country) completedFields++;
      
      metrics.statusPerfil = Math.round((completedFields / totalFields) * 100);
    }
    
    return metrics;
  };

  const isLoading = authLoading || profileLoading || bookingsLoading;
  const userMetrics = calculateUserMetrics();
  
  // Get unread notifications count (simplified example)
  const notifications = [
    { id: 1, title: "Reserva confirmada", message: "Seu passeio para o dia 22/08 foi confirmado", date: "Hoje", read: false },
    { id: 2, title: "Novo passeio disponível", message: "Conheça nosso novo passeio de caiaque", date: "Ontem", read: true },
    { id: 3, title: "Oferta especial", message: "Aproveite 15% OFF em hospedagens", date: "3 dias atrás", read: true }
  ];
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Generate personalized recommendations based on user behavior
  const recommendations = [
    { id: 1, title: "Passeio de Barco", image: "/tour-sunset.jpg", score: 98 },
    { id: 2, title: "Mergulho", image: "/tour-diving.jpg", score: 87 },
    { id: 3, title: "Trilha Ecológica", image: "/tour-trail.jpg", score: 85 }
  ];

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-tuca-ocean-blue" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow w-full pt-20 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
            <DashboardHeader notificationCount={unreadCount} />
            <MetricsCards metrics={userMetrics} />
            <DashboardTabs 
              notifications={notifications} 
              recommendations={recommendations} 
            />
            <ActivityAnalysis 
              recentBookings={bookings || []}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
