
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
import { withTimeout } from "@/utils/asyncUtils";
import { usePermission } from "@/hooks/use-permission";

const Tours = () => {
  const { tours, isLoading, error, deleteTour } = useTours();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState<Tour | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [tourToEdit, setTourToEdit] = useState<number | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Pre-check write permission
  const { hasPermission: canEdit, isLoading: permissionLoading } = usePermission('write');

  // Handle tour edit with error handling and timeout
  const handleEditClick = async (tour: Tour) => {
    if (isProcessing) return; // Prevent multiple rapid clicks
    
    setIsProcessing(true);
    
    try {
      // First, check permissions before proceeding
      if (!canEdit) {
        toast.error("Você não tem permissão para editar passeios");
        setIsProcessing(false);
        return;
      }
      
      // Set the tour ID to be edited
      setTourToEdit(tour.id);
      
      // Use a small delay to ensure UI updates before heavy operations
      setTimeout(() => {
        setFormDialogOpen(true);
        setIsProcessing(false);
      }, 100);
      
    } catch (error) {
      console.error("Error while trying to edit tour:", error);
      toast.error("Erro ao tentar editar o passeio. Tente novamente.");
      setIsProcessing(false);
    }
  };

  // Handle tour delete with improved error handling
  const handleDeleteClick = (tour: Tour) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      setTourToDelete(tour);
      setDeleteDialogOpen(true);
    } catch (error) {
      console.error("Error while preparing to delete tour:", error);
      toast.error("Erro ao preparar exclusão. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  const confirmDelete = async () => {
    if (!tourToDelete) return;
    
    setIsProcessing(true);
    
    try {
      await withTimeout(
        () => deleteTour(tourToDelete.id), 
        5000
      );
      setDeleteDialogOpen(false);
      setTourToDelete(null);
      toast.success("Passeio excluído com sucesso");
    } catch (error) {
      console.error("Error deleting tour:", error);
      toast.error("Erro ao excluir o passeio. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle adding new tour
  const handleAddNewTour = () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      // Check permissions
      if (!canEdit) {
        toast.error("Você não tem permissão para criar passeios");
        setIsProcessing(false);
        return;
      }
      
      setTourToEdit(undefined);
      setFormDialogOpen(true);
    } catch (error) {
      console.error("Error while trying to add new tour:", error);
      toast.error("Erro ao tentar adicionar novo passeio. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
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
          <TourActionButton onClick={handleAddNewTour} disabled={isProcessing} />
        </div>

        <TourList
          tours={filteredTours}
          isLoading={isLoading || permissionLoading}
          error={error}
          onEditTour={handleEditClick}
          onDeleteTour={handleDeleteClick}
          isProcessing={isProcessing}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteTourDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          tourToDelete={tourToDelete}
          onConfirmDelete={confirmDelete}
          isDeleting={isProcessing}
        />

        {/* Tour Form Dialog */}
        <TourFormDialog
          open={formDialogOpen}
          onOpenChange={(open) => {
            if (!isProcessing) {
              setFormDialogOpen(open);
            }
          }}
          tourId={tourToEdit}
          onSuccess={handleFormSuccess}
        />
      </div>
    </AdminLayout>
  );
};

export default Tours;
