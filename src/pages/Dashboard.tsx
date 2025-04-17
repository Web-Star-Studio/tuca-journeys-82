
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricsCards from "@/components/dashboard/MetricsCards";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import ActivityAnalysis from "@/components/dashboard/ActivityAnalysis";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/use-profile";
import { useBookings } from "@/hooks/use-bookings";
import { Booking } from "@/types/bookings";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);
  
  // Fetch user profile and bookings
  const { profile, isLoading: profileLoading } = useProfile();
  const { bookings: rawBookings, isLoading: bookingsLoading, error: bookingsError } = useBookings();
  
  // Show error toast if bookings fetch fails
  useEffect(() => {
    if (bookingsError) {
      console.error("Error fetching bookings:", bookingsError);
      toast.error("Não foi possível carregar as reservas");
    }
  }, [bookingsError]);
  
  // Transform raw bookings data to match Booking type
  const bookings: Booking[] = React.useMemo(() => {
    if (!rawBookings) return [];
    
    return rawBookings.map(booking => ({
      id: booking.id.toString(),
      user_name: profile?.name || 'User',
      user_email: profile?.email || '',
      item_type: booking.tour_id ? 'tour' : booking.accommodation_id ? 'accommodation' : 'package',
      item_name: booking.tours ? booking.tours.title : 
                 booking.accommodations ? booking.accommodations.title : 'Booking',
      start_date: booking.start_date,
      end_date: booking.end_date,
      guests: booking.guests,
      total_price: booking.total_price,
      status: booking.status as 'confirmed' | 'pending' | 'cancelled',
      payment_status: booking.payment_status as 'paid' | 'pending' | 'refunded',
      created_at: booking.created_at
    }));
  }, [rawBookings, profile]);
  
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
  
  // Generate personalized recommendations based on user behavior
  const recommendations = [
    { id: 1, title: "Passeio de Barco", image: "/tour-sunset.jpg", score: 98 },
    { id: 2, title: "Mergulho", image: "/tour-diving.jpg", score: 87 },
    { id: 3, title: "Trilha Ecológica", image: "/tour-trail.jpg", score: 85 }
  ];

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-tuca-ocean-blue" />
      </div>
    );
  }

  if (!user) {
    return null; // Will be redirected by useEffect
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
                <ActivityAnalysis 
                  recentBookings={bookings || []}
                />
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
