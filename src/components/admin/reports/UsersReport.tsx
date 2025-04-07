
import React, { useState, useEffect } from "react";
import UserMetricsCards from "./users/UserMetricsCards";
import UserGrowthChart from "./users/UserGrowthChart";
import UserDeviceChart from "./users/UserDeviceChart";
import UserRegionDistribution from "./users/UserRegionDistribution";
import { 
  userGrowthData, 
  userRegionData, 
  userDeviceData, 
  userChartConfig,
  getUserData,
  UserGrowthData
} from "./users/UserData";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface UsersReportProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onError?: (error: Error) => void;
}

const UsersReport = ({ dateRange, onError }: UsersReportProps) => {
  const [error, setError] = useState<string | null>(null);
  const [reportData, setReportData] = useState<{
    growthData: any[];
    regionData: any[];
    deviceData: any[];
    config: any;
    totals: {
      totalUsers: number;
      totalNewUsers: number;
      totalRegions: number;
      conversionRate: number;
    };
  } | null>(null);

  useEffect(() => {
    try {
      // Get user data from our data generator
      const userData = getUserData();
      
      if (!userData.growthData || !userData.regionData || !userData.deviceData) {
        throw new Error("Dados de usuários não disponíveis");
      }

      // Calculate totals
      const totalUsers = 800;
      // Corrigido: Usando propriamente o reduce para somar números
      const totalNewUsers = userData.growthData.reduce((sum, item) => sum + item.usuarios, 0);
      const totalRegions = userData.regionData.length;
      const conversionRate = 28; // In percentage, would be calculated in a real app
      
      setReportData({
        growthData: userData.growthData,
        regionData: userData.regionData,
        deviceData: userData.deviceData,
        config: userData.config,
        totals: {
          totalUsers,
          totalNewUsers,
          totalRegions,
          conversionRate
        }
      });
      
      setError(null);
    } catch (err) {
      console.error("Error in UsersReport:", err);
      const errorMessage = err instanceof Error ? err.message : "Falha ao carregar dados de usuários";
      setError(errorMessage);
      if (onError && err instanceof Error) {
        onError(err);
      }
    }
  }, [dateRange, onError]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (!reportData) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-center">
          <p className="text-muted-foreground">Carregando dados de usuários...</p>
        </div>
      </div>
    );
  }

  const { totalUsers, totalNewUsers, totalRegions, conversionRate } = reportData.totals;

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
          growthData={reportData.growthData} 
          chartConfig={reportData.config} 
        />
        
        <UserDeviceChart deviceData={reportData.deviceData} />
      </div>
      
      <UserRegionDistribution 
        regionData={reportData.regionData} 
        chartConfig={reportData.config} 
      />
    </div>
  );
};

export default UsersReport;
