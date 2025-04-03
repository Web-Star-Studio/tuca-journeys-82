
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  borderColor: string;
  iconColor: string;
  gradientFrom: string;
  gradientTo: string;
}

const MetricCard = ({ 
  title, 
  value, 
  icon: Icon,
  borderColor,
  iconColor,
  gradientFrom,
  gradientTo
}: MetricCardProps) => {
  return (
    <Card className={`border-l-4 ${borderColor} bg-gradient-to-br from-${gradientFrom} to-${gradientTo}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="font-bold text-2xl">{value}</div>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
