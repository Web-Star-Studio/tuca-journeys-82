
import React from "react";
import { Tour } from "@/types/database";
import TourCard from "./TourCard";
import TourEmptyState from "./table/TourEmptyState";
import TourLoadingState from "./table/TourLoadingState";
import TourErrorState from "./table/TourErrorState";

interface TourListProps {
  tours: Tour[] | undefined;
  isLoading: boolean;
  error: Error | null;
  onEditTour: (tour: Tour) => void;
  onDeleteTour: (tour: Tour) => void;
}

const TourList: React.FC<TourListProps> = ({
  tours,
  isLoading,
  error,
  onEditTour,
  onDeleteTour,
}) => {
  if (isLoading) {
    return <TourLoadingState />;
  }

  if (error) {
    return <TourErrorState />;
  }

  if (!tours || tours.length === 0) {
    return (
      <div className="rounded-md border bg-white p-6">
        <TourEmptyState />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tours.map((tour) => (
        <TourCard
          key={tour.id}
          tour={tour}
          onEditTour={onEditTour}
          onDeleteTour={onDeleteTour}
        />
      ))}
    </div>
  );
};

export default TourList;
