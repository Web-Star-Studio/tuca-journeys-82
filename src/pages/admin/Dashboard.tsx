
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DashboardMetrics from "@/components/admin/dashboard/DashboardMetrics";
import BookingOverviewChart from "@/components/admin/dashboard/BookingOverviewChart";
import DashboardRow from "@/components/admin/dashboard/DashboardRow";
import DashboardRightColumn from "@/components/admin/dashboard/DashboardRightColumn";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

const Dashboard = () => {
  // Ensure only admin users can access this page
  useAuthRedirect({
    requiredAuth: true,
    requiredAdmin: true
  });

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
