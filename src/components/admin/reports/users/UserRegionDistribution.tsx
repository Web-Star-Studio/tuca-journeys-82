
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserRegionChart from "./UserRegionChart";
import UserRegionInsights from "./UserRegionInsights";

interface RegionData {
  regiao: string;
  usuarios: number;
}

interface RegionChartConfig {
  usuarios: {
    label: string;
    color: string;
  };
  [key: string]: {
    label: string;
    color: string;
  };
}

interface UserRegionDistributionProps {
  regionData: RegionData[];
  chartConfig: RegionChartConfig;
}

const UserRegionDistribution = ({ regionData, chartConfig }: UserRegionDistributionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição por Região</CardTitle>
        <CardDescription>
          Número de usuários por região geográfica
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserRegionChart regionData={regionData} chartConfig={chartConfig} />
        <UserRegionInsights />
      </CardContent>
    </Card>
  );
};

export default UserRegionDistribution;
