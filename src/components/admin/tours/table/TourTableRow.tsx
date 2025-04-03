
import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Edit, Trash2 } from "lucide-react";
import { Tour } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";

interface TourTableRowProps {
  tour: Tour;
  onEditTour: (tour: Tour) => void;
  onDeleteTour: (tour: Tour) => void;
}

const TourTableRow: React.FC<TourTableRowProps> = ({
  tour,
  onEditTour,
  onDeleteTour,
}) => {
  return (
    <TableRow key={tour.id}>
      <TableCell className="font-medium">{tour.id}</TableCell>
      <TableCell>
        <img
          src={tour.image_url}
          alt={tour.title}
          className="h-10 w-16 object-cover rounded"
        />
      </TableCell>
      <TableCell className="font-medium">{tour.title}</TableCell>
      <TableCell>
        <Badge variant="outline">{tour.category}</Badge>
      </TableCell>
      <TableCell>R$ {tour.price.toFixed(2)}</TableCell>
      <TableCell>{tour.duration}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <span className="mr-1 text-yellow-500">★</span>
          {tour.rating}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="h-8 w-8"
          >
            <Link to={`/passeios/${tour.id}`} target="_blank">
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-blue-600"
            onClick={() => onEditTour(tour)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-600"
            onClick={() => onDeleteTour(tour)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TourTableRow;
