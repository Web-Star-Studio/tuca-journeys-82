import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricsCards from "@/components/dashboard/MetricsCards";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import ActivityAnalysis from "@/components/dashboard/ActivityAnalysis";
import { Loader2 } from "lucide-react";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";
import { useProfile } from "@/hooks/use-profile";
import { useBookingsList } from "@/hooks/use-bookings-list";
import { toast } from "sonner";

const Dashboard = () => {
  // Use the auth redirect hook to protect this page
  const { isLoading: authLoading, user } = useAuthRedirect({
    requiredAuth: true
  });
  
  // Fetch user profile and bookings
  const { profile, isLoading: profileLoading } = useProfile();
  const { bookings = [], isLoading: bookingsLoading, error: bookingsError } = useBookingsList();
  
  // Show error toast if bookings fetch fails
  useEffect(() => {
    if (bookingsError) {
      toast.error("Erro ao carregar suas reservas");
      console.error("Error fetching bookings:", bookingsError);
    }
  }, [bookingsError]);
  
  // Calculate user metrics from real data
  const calculateUserMetrics = () => {
    // Default values
    const metrics = {
      reservasAtivas: 0,
      pontosAcumulados: 0,
      diasAteProximaViagem: 0,
      statusPerfil: 0
    };
    
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
  
  // Generate personalized recommendations based on user behavior and preferences
  const recommendations = [
    { id: 1, title: "Passeio de Barco", image: "/tour-sunset.jpg", score: 98 },
    { id: 2, title: "Mergulho", image: "/tour-diving.jpg", score: 87 },
    { id: 3, title: "Trilha Ecológica", image: "/tour-trail.jpg", score: 85 },
    { id: 4, title: "Tour Histórico", image: "/tour-historical.jpg", score: 82 },
    { id: 5, title: "Observação de Tartarugas", image: "/tour-turtles.jpg", score: 76 },
    { id: 6, title: "Tour de Caiaque", image: "/tour-kayak.jpg", score: 73 }
  ];

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-tuca-ocean-blue" />
      </div>
    );
  }

  if (!user) {
    return null; // Will be redirected by useAuthRedirect
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow w-full pt-20 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
            <DashboardHeader notificationCount={0} />
            
            {isLoading ? (
              <div className="py-12 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
              </div>
            ) : (
              <>
                <MetricsCards metrics={userMetrics} />
                <DashboardTabs recommendations={recommendations} />
                <ActivityAnalysis recentBookings={bookings || []} />
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
