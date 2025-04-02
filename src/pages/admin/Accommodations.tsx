
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
import { useAccommodations } from "@/hooks/use-accommodations";
import { Accommodation } from "@/types/database";

const Accommodations = () => {
  const { data: accommodations, isLoading, error } = useAccommodations();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [accommodationToDelete, setAccommodationToDelete] = useState<Accommodation | null>(null);

  // Handle accommodation delete
  const handleDeleteClick = (accommodation: Accommodation) => {
    setAccommodationToDelete(accommodation);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting accommodation:", accommodationToDelete?.id);
    // Here we would call the API to delete the accommodation
    setDeleteDialogOpen(false);
    setAccommodationToDelete(null);
  };

  // Filter accommodations based on search query
  const filteredAccommodations = accommodations?.filter(
    (accommodation) =>
      accommodation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      accommodation.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout pageTitle="Gerenciar Hospedagens">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar hospedagens..."
              className="pl-10 w-full md:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          <span>Nova Hospedagem</span>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <p>Carregando hospedagens...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center p-8 text-red-500">
          <p>Erro ao carregar hospedagens. Tente novamente mais tarde.</p>
        </div>
      ) : (
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Imagem</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Preço/Noite</TableHead>
                <TableHead>Quartos</TableHead>
                <TableHead>Avaliação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccommodations?.map((accommodation) => (
                <TableRow key={accommodation.id}>
                  <TableCell className="font-medium">{accommodation.id}</TableCell>
                  <TableCell>
                    <img
                      src={accommodation.image_url}
                      alt={accommodation.title}
                      className="h-10 w-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{accommodation.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{accommodation.type}</Badge>
                  </TableCell>
                  <TableCell>R$ {accommodation.price_per_night.toFixed(2)}</TableCell>
                  <TableCell>{accommodation.bedrooms}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="mr-1 text-yellow-500">★</span>
                      {accommodation.rating}
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
                        <Link to={`/hospedagens/${accommodation.id}`} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600"
                        onClick={() => handleDeleteClick(accommodation)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredAccommodations?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    Nenhuma hospedagem encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir a hospedagem "{accommodationToDelete?.title}"?
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
    </AdminLayout>
  );
};

export default Accommodations;
