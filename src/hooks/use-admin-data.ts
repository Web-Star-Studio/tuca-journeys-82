
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useAdminData = () => {
  const fetchDashboardMetrics = async () => {
    // These would typically be separate queries to the database
    // For performance, we'd ideally use database functions to calculate these metrics
    
    const [
      usersResult, 
      toursResult, 
      accommodationsResult, 
      bookingsResult,
      recentBookingsResult,
      pendingBookingsResult
    ] = await Promise.all([
      // Count users
      supabase.from('user_profiles').select('id', { count: 'exact', head: true }),
      // Count tours
      supabase.from('tours').select('id', { count: 'exact', head: true }),
      // Count accommodations
      supabase.from('accommodations').select('id', { count: 'exact', head: true }),
      // Count bookings
      supabase.from('bookings').select('id', { count: 'exact', head: true }),
      // Recent bookings (last 5)
      supabase
        .from('bookings')
        .select(`
          *,
          user_profiles (name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(5),
      // Pending bookings
      supabase
        .from('bookings')
        .select('id', { count: 'exact' })
        .eq('status', 'pending')
    ]);

    // Check for errors
    [usersResult, toursResult, accommodationsResult, bookingsResult, recentBookingsResult, pendingBookingsResult].forEach(result => {
      if (result.error) throw result.error;
    });

    // Calculate revenue (in a real app, we'd use a database query for this)
    const { data: revenueData } = await supabase
      .from('bookings')
      .select('total_price')
      .eq('status', 'confirmed');
    
    const totalRevenue = revenueData?.reduce((acc, booking) => acc + Number(booking.total_price), 0) || 0;

    return {
      counts: {
        users: usersResult.count || 0,
        tours: toursResult.count || 0,
        accommodations: accommodationsResult.count || 0,
        bookings: bookingsResult.count || 0,
        pendingBookings: pendingBookingsResult.count || 0,
        totalRevenue
      },
      recentBookings: recentBookingsResult.data || []
    };
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['adminDashboardMetrics'],
    queryFn: fetchDashboardMetrics,
  });

  return {
    metrics: data?.counts,
    recentBookings: data?.recentBookings,
    isLoading,
    error
  };
};
