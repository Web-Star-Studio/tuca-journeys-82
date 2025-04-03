
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
    <Card className={`border-l-4 ${borderColor} shadow-sm hover:shadow-md transition-all duration-300`}>
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center">
          {title}
          <Icon className={`h-4 w-4 ml-2 ${iconColor}`} />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="flex items-center">
          <div className="font-bold text-xl sm:text-2xl">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
