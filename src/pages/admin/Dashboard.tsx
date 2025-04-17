
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DashboardMetrics from "@/components/admin/dashboard/DashboardMetrics";
import BookingOverviewChart from "@/components/admin/dashboard/BookingOverviewChart";
import DashboardRow from "@/components/admin/dashboard/DashboardRow";
import DashboardRightColumn from "@/components/admin/dashboard/DashboardRightColumn";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";
import { toast } from "sonner";

const Dashboard = () => {
  // Ensure only admin users can access this page
  const { isLoading, isAdmin, isAuthenticated } = useAuthRedirect({
    requiredAuth: true,
    requiredAdmin: true
  });

  // Show feedback if there's an issue with authentication
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error("Você precisa estar autenticado para acessar esta página");
    } else if (!isLoading && !isAdmin) {
      toast.error("Você não tem permissão para acessar esta página");
    }
  }, [isLoading, isAuthenticated, isAdmin]);

  // State for date range filtering if needed
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date()
  });

  return (
    <AdminLayout pageTitle="Dashboard">
      <div className="space-y-6 pb-6">
        <DashboardMetrics />
        
        <DashboardRow>
          <BookingOverviewChart dateRange={dateRange} />
          <DashboardRightColumn />
        </DashboardRow>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
