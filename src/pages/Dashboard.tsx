
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { demoData } from "@/utils/demoDataGenerator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricsCards from "@/components/dashboard/MetricsCards";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import ActivityAnalysis from "@/components/dashboard/ActivityAnalysis";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  
  const userMetrics = {
    reservasAtivas: 2,
    pontosAcumulados: 750,
    diasAteProximaViagem: 15,
    statusPerfil: 70
  };
  
  const notifications = [
    { id: 1, title: "Reserva confirmada", message: "Seu passeio para o dia 22/08 foi confirmado", date: "Hoje", read: false },
    { id: 2, title: "Novo passeio disponível", message: "Conheça nosso novo passeio de caiaque", date: "Ontem", read: true },
    { id: 3, title: "Oferta especial", message: "Aproveite 15% OFF em hospedagens", date: "3 dias atrás", read: true }
  ];
  
  const recommendations = [
    { id: 1, title: "Passeio de Barco", image: "/tour-sunset.jpg", score: 98 },
    { id: 2, title: "Mergulho", image: "/tour-diving.jpg", score: 87 },
    { id: 3, title: "Trilha Ecológica", image: "/tour-trail.jpg", score: 85 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tuca-ocean-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow w-full pt-20 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
            <DashboardHeader notificationCount={notifications.filter(n => !n.read).length} />
            <MetricsCards metrics={userMetrics} />
            <DashboardTabs 
              notifications={notifications} 
              recommendations={recommendations} 
            />
            <ActivityAnalysis 
              recentBookings={demoData.bookings}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
