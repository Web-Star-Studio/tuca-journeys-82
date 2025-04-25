
import React from "react";
import { Accommodation } from "@/types/database";
import AccommodationCard from "./AccommodationCard";
import AccommodationEmptyState from "./state/AccommodationEmptyState";
import AccommodationLoadingState from "./state/AccommodationLoadingState";
import AccommodationErrorState from "./state/AccommodationErrorState";

interface AccommodationListProps {
  accommodations: Accommodation[] | undefined;
  isLoading: boolean;
  error: Error | null;
  onEditAccommodation: (accommodation: Accommodation) => void;
  onDeleteAccommodation: (accommodation: Accommodation) => void;
}

const AccommodationList: React.FC<AccommodationListProps> = ({
  accommodations,
  isLoading,
  error,
  onEditAccommodation,
  onDeleteAccommodation,
}) => {
  if (isLoading) {
    return <AccommodationLoadingState />;
  }

  if (error) {
    return <AccommodationErrorState />;
  }

  if (!accommodations || accommodations.length === 0) {
    return (
      <div className="rounded-md border bg-white p-6">
        <AccommodationEmptyState />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {accommodations.map((accommodation) => (
        <AccommodationCard
          key={accommodation.id}
          accommodation={accommodation}
          onEditAccommodation={onEditAccommodation}
          onDeleteAccommodation={onDeleteAccommodation}
        />
      ))}
    </div>
  );
};

export default AccommodationList;
