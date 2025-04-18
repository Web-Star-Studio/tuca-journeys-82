
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricsCards from "@/components/dashboard/MetricsCards";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import ActivityAnalysis from "@/components/dashboard/ActivityAnalysis";
import { useBookingsList } from "@/hooks/use-bookings-list";
import { useProfile } from "@/hooks/use-profile";

const Dashboard = () => {
  // Fetch user profile and bookings (will work with demo data)
  const { profile } = useProfile();
  const { bookings = [] } = useBookingsList();
  
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
  
  // Demo recommendations
  const recommendations = [
    { id: 1, title: "Passeio de Barco", image: "/tour-sunset.jpg", score: 98 },
    { id: 2, title: "Mergulho", image: "/tour-diving.jpg", score: 87 },
    { id: 3, title: "Trilha Ecológica", image: "/tour-trail.jpg", score: 85 },
    { id: 4, title: "Tour Histórico", image: "/tour-historical.jpg", score: 82 },
    { id: 5, title: "Observação de Tartarugas", image: "/tour-turtles.jpg", score: 76 },
    { id: 6, title: "Tour de Caiaque", image: "/tour-kayak.jpg", score: 73 }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow w-full pt-20 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
            <DashboardHeader notificationCount={0} />
            <MetricsCards metrics={userMetrics} />
            <DashboardTabs recommendations={recommendations} />
            <ActivityAnalysis recentBookings={bookings || []} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
