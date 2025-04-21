
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricsCards from "@/components/dashboard/MetricsCards";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import ActivityAnalysis from "@/components/dashboard/ActivityAnalysis";
import { useBookingsList } from "@/hooks/use-bookings-list";
import { useProfile } from "@/hooks/use-profile";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  
  // Only fetch data if user is authenticated
  const { profile, isLoading: isProfileLoading } = useProfile();
  const { bookings = [], isLoading: isBookingsLoading } = useBookingsList();
  
  // Combined loading state
  const isLoading = isAuthLoading || isProfileLoading || isBookingsLoading;
  
  // Calculate user metrics from real or demo data
  const calculateUserMetrics = () => {
    return {
      reservasAtivas: bookings?.filter(b => b.status === 'confirmed').length || 0,
      pontosAcumulados: bookings?.length * 10 || 0,
      diasAteProximaViagem: 0,
      statusPerfil: profile ? 80 : 0
    };
  };

  const userMetrics = calculateUserMetrics();
  
  // Empty recommendations array to avoid unnecessary renders
  const recommendations = [];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow w-full pt-20 py-6 sm:py-8 md:py-12 lg:py-16 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-tuca-ocean-blue mx-auto mb-4" />
            <p className="text-gray-600">Carregando seu painel...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow w-full pt-20 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
            <DashboardHeader notificationCount={0} />
            <MetricsCards metrics={userMetrics} />
            {recommendations.length === 0 ? (
              <div className="text-center text-gray-500">Nenhuma recomendação disponível.</div>
            ) : (
              <DashboardTabs recommendations={recommendations} />
            )}
            <ActivityAnalysis recentBookings={bookings || []} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
