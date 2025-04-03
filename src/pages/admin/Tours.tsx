
import React, { useState } from "react";
import { Search, Plus, Edit, Trash2, Filter, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useTours } from "@/hooks/use-tours";
import { Tour } from "@/types/database";
import TourFormDialog from "@/components/admin/tours/TourFormDialog";

const Tours = () => {
  const { data: tours, isLoading, error } = useTours();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState<Tour | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [tourToEdit, setTourToEdit] = useState<number | undefined>(undefined);

  // Handle tour edit
  const handleEditClick = (tour: Tour) => {
    setTourToEdit(tour.id);
    setFormDialogOpen(true);
  };

  // Handle tour delete
  const handleDeleteClick = (tour: Tour) => {
    setTourToDelete(tour);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting tour:", tourToDelete?.id);
    // Here we would call the API to delete the tour
    setDeleteDialogOpen(false);
    setTourToDelete(null);
  };

  // Handle adding new tour
  const handleAddNewTour = () => {
    setTourToEdit(undefined);
    setFormDialogOpen(true);
  };

  // Handle form success
  const handleFormSuccess = () => {
    // Refresh tour data
    console.log("Tour saved successfully");
  };

  // Filter tours based on search query
  const filteredTours = tours?.filter(
    (tour) =>
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout pageTitle="Gerenciar Passeios">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar passeios..."
              className="pl-10 w-full md:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button className="gap-1" onClick={handleAddNewTour}>
          <Plus className="h-4 w-4" />
          <span>Novo Passeio</span>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <p>Carregando passeios...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center p-8 text-red-500">
          <p>Erro ao carregar passeios. Tente novamente mais tarde.</p>
        </div>
      ) : (
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
              {filteredTours?.map((tour) => (
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
                        onClick={() => handleEditClick(tour)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600"
                        onClick={() => handleDeleteClick(tour)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTours?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    Nenhum passeio encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o passeio "{tourToDelete?.title}"?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tour Form Dialog */}
      <TourFormDialog 
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        tourId={tourToEdit}
        onSuccess={handleFormSuccess}
      />
    </AdminLayout>
  );
};

export default Tours;
