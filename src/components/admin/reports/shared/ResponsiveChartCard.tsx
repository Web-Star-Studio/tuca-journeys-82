
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface ResponsiveChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const ResponsiveChartCard = ({ 
  title, 
  description, 
  children,
  className 
}: ResponsiveChartCardProps) => {
  return (
    <Card className={`shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="min-w-[280px] w-full">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponsiveChartCard;
