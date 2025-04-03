
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DashboardMetrics from "@/components/admin/dashboard/DashboardMetrics";
import BookingOverviewChart from "@/components/admin/dashboard/BookingOverviewChart";
import DashboardRow from "@/components/admin/dashboard/DashboardRow";
import DashboardRightColumn from "@/components/admin/dashboard/DashboardRightColumn";

const Dashboard = () => {
  return (
    <AdminLayout pageTitle="Dashboard">
      <DashboardMetrics />
      
      <DashboardRow>
        <BookingOverviewChart />
        <DashboardRightColumn />
      </DashboardRow>
    </AdminLayout>
  );
};

export default Dashboard;
