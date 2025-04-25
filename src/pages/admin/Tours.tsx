
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useTours } from "@/hooks/use-tours";
import { Tour } from "@/types/database";
import { toast } from "sonner";

import TourSearch from "@/components/admin/tours/TourSearch";
import TourList from "@/components/admin/tours/TourList";
import TourActionButton from "@/components/admin/tours/TourActionButton";
import DeleteTourDialog from "@/components/admin/tours/DeleteTourDialog";
import TourFormDialog from "@/components/admin/tours/TourFormDialog";

const Tours = () => {
  const { tours, isLoading, error, deleteTour } = useTours();
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
    if (tourToDelete) {
      deleteTour(tourToDelete.id);
      setDeleteDialogOpen(false);
      setTourToDelete(null);
    }
  };

  // Handle adding new tour
  const handleAddNewTour = () => {
    setTourToEdit(undefined);
    setFormDialogOpen(true);
  };

  // Handle form success
  const handleFormSuccess = () => {
    setFormDialogOpen(false);
    toast.success(tourToEdit ? "Passeio atualizado com sucesso" : "Passeio criado com sucesso");
  };

  // Filter tours based on search query
  const filteredTours = tours?.filter(
    (tour) =>
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.short_description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout pageTitle="Gerenciar Passeios">
      <div className="w-full overflow-x-hidden">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TourSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <TourActionButton onClick={handleAddNewTour} />
        </div>

        <TourList
          tours={filteredTours}
          isLoading={isLoading}
          error={error}
          onEditTour={handleEditClick}
          onDeleteTour={handleDeleteClick}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteTourDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          tourToDelete={tourToDelete}
          onConfirmDelete={confirmDelete}
        />

        {/* Tour Form Dialog */}
        <TourFormDialog
          open={formDialogOpen}
          onOpenChange={setFormDialogOpen}
          tourId={tourToEdit}
          onSuccess={handleFormSuccess}
        />
      </div>
    </AdminLayout>
  );
};

export default Tours;
