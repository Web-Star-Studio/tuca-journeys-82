
import React from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BookingLoadingState: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-center py-2 mb-4">
          <Loader2 className="h-5 w-5 text-tuca-ocean-blue animate-spin mr-2" />
          <span className="text-sm text-tuca-ocean-blue">Carregando reservas...</span>
        </div>
        
        <div className="space-y-4">
          {Array(3).fill(0).map((_, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2 mb-3 sm:mb-0">
                  <Skeleton className="h-5 w-48" />
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-32 mr-2" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-8 w-16 mr-2" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingLoadingState;
