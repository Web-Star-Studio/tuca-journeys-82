
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MapPin } from "lucide-react";
import { AccommodationRegionData } from "./AccommodationsDataGenerator";

interface AccommodationRegionDistributionProps {
  regionData: AccommodationRegionData[];
}

const AccommodationRegionDistribution = ({ regionData }: AccommodationRegionDistributionProps) => {
  // Ordenar regiões por valor decrescente
  const sortedRegions = [...regionData].sort((a, b) => b.value - a.value);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Distribuição por Região</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedRegions.map((region) => (
            <div key={region.name} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm font-medium">{region.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{region.value}</span>
                  <span className="text-xs text-muted-foreground">({region.percent}%)</span>
                </div>
              </div>
              <Progress value={region.percent} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccommodationRegionDistribution;
