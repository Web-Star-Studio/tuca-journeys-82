
import React from "react";
import { Loader2 } from "lucide-react";

const BookingLoadingState = () => {
  return (
    <div className="text-center py-8">
      <Loader2 className="animate-spin h-8 w-8 mx-auto text-tuca-ocean-blue" />
      <p className="mt-2 text-gray-500">Carregando suas reservas...</p>
    </div>
  );
};

export default BookingLoadingState;
