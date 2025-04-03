
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DashboardMetrics from "@/components/admin/dashboard/DashboardMetrics";
import BookingOverviewChart from "@/components/admin/dashboard/BookingOverviewChart";
import SitePerformance from "@/components/admin/dashboard/SitePerformance";
import RecentActivities from "@/components/admin/dashboard/RecentActivities";

const Dashboard = () => {
  return (
    <AdminLayout pageTitle="Dashboard">
      <DashboardMetrics />

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <BookingOverviewChart />

        <div className="col-span-1 grid gap-6">
          <SitePerformance />
          <RecentActivities />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
