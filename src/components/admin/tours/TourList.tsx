
import React from "react";
import { Tour } from "@/types/database";
import { Table, TableBody } from "@/components/ui/table";
import TourTableHeader from "./table/TourTableHeader";
import TourTableRow from "./table/TourTableRow";
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
      <div className="rounded-md border bg-white">
        <Table>
          <TourTableHeader />
          <TourEmptyState />
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TourTableHeader />
        <TableBody>
          {tours.map((tour) => (
            <TourTableRow
              key={tour.id}
              tour={tour}
              onEditTour={onEditTour}
              onDeleteTour={onDeleteTour}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TourList;
