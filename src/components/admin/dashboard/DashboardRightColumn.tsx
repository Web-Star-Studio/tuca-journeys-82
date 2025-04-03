
import React from "react";
import SitePerformance from "./SitePerformance";
import RecentActivities from "./RecentActivities";

const DashboardRightColumn = () => {
  return (
    <div className="col-span-1 grid gap-6">
      <SitePerformance />
      <RecentActivities />
    </div>
  );
};

export default DashboardRightColumn;
