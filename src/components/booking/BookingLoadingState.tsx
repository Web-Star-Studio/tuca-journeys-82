
import React from "react";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const BookingLoadingState = () => {
  return (
    <Card className="bg-white border shadow-sm">
      <div className="text-center py-12">
        <Loader2 className="animate-spin h-10 w-10 mx-auto text-tuca-ocean-blue mb-4" />
        <p className="text-gray-500 font-medium">Carregando suas reservas...</p>
        <p className="text-gray-400 text-sm mt-1">Isso pode levar alguns segundos</p>
      </div>
    </Card>
  );
};

export default BookingLoadingState;
