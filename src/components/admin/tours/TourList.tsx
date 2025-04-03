
import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Edit, Trash2 } from "lucide-react";
import { Tour } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    return (
      <div className="flex justify-center p-8">
        <p>Carregando passeios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center p-8 text-red-500">
        <p>Erro ao carregar passeios. Tente novamente mais tarde.</p>
      </div>
    );
  }

  if (!tours || tours.length === 0) {
    return (
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Duração</TableHead>
              <TableHead>Avaliação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                Nenhum passeio encontrado.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Imagem</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Duração</TableHead>
            <TableHead>Avaliação</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tours.map((tour) => (
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TourList;
