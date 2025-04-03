
import React from "react";
import UserMetricsCards from "./users/UserMetricsCards";
import UserGrowthChart from "./users/UserGrowthChart";
import UserDeviceChart from "./users/UserDeviceChart";
import UserRegionDistribution from "./users/UserRegionDistribution";
import { 
  userGrowthData, 
  userRegionData, 
  userDeviceData, 
  userChartConfig 
} from "./users/UserData";

interface UsersReportProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

const UsersReport = ({ dateRange }: UsersReportProps) => {
  // In a real app, we would filter data based on the date range
  
  // Calculate totals
  const totalUsers = 800;
  const totalNewUsers = userGrowthData.reduce((sum, item) => sum + item.usuarios, 0);
  const totalRegions = userRegionData.length;
  const conversionRate = 28; // In percentage, would be calculated in a real app

  return (
    <div className="space-y-6">
      <UserMetricsCards 
        totalUsers={totalUsers}
        totalNewUsers={totalNewUsers}
        totalRegions={totalRegions}
        conversionRate={conversionRate}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UserGrowthChart 
          growthData={userGrowthData} 
          chartConfig={userChartConfig} 
        />
        
        <UserDeviceChart deviceData={userDeviceData} />
      </div>
      
      <UserRegionDistribution 
        regionData={userRegionData} 
        chartConfig={userChartConfig} 
      />
    </div>
  );
};

export default UsersReport;
