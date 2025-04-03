
import React from "react";
import SitePerformance from "./SitePerformance";
import RecentActivities from "./RecentActivities";

const DashboardRightColumn = () => {
  return (
    <div className="col-span-1 flex flex-col gap-6 h-full">
      <SitePerformance />
      <RecentActivities />
    </div>
  );
};

export default DashboardRightColumn;
