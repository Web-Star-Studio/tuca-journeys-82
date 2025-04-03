
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: string;
  trend: string;
  description: string;
  icon: React.ReactNode;
  trendUp: boolean;
}

const DashboardCard = ({ title, value, trend, description, icon, trendUp }: DashboardCardProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="rounded-full p-2 bg-tuca-light-blue/50">{icon}</div>
        <span className={`text-xs font-medium flex items-center ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trend} 
          <ArrowUpRight className="ml-1 h-3 w-3" />
        </span>
      </div>
      <div className="mt-3">
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-sm text-muted-foreground mt-1">{title}</p>
      </div>
      <p className="text-xs text-muted-foreground mt-3">{description}</p>
    </CardContent>
  </Card>
);

export default DashboardCard;
