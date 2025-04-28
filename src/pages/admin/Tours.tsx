
import React, { useState, useEffect } from "react";
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
import { preloadUserPermissions } from "@/lib/role-helpers";
import { useAuth } from "@/contexts/AuthContext";
import { useUI } from "@/contexts/UIContext";

const Tours = () => {
  const { tours, isLoading, error, deleteTour, isDeleting, isSaving } = useTours();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState<Tour | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [tourToEdit, setTourToEdit] = useState<number | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { user } = useAuth();
  const { showGlobalSpinner } = useUI();
  
  // Pre-check write permission
  const { hasPermission: canEdit, isLoading: permissionLoading } = usePermission('write');
  
  // Preload permissions for better performance
  useEffect(() => {
    if (user?.id) {
      // Preload permissions in background
      preloadUserPermissions(user.id).catch(console.error);
    }
  }, [user]);

  // Handle tour edit with improved performance and error handling
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
      
      // Set the tour ID to be edited (asynchronously load the tour data)
      setTourToEdit(tour.id);
      
      // Use a small delay to ensure UI updates before opening modal
      setTimeout(() => {
        setFormDialogOpen(true);
        setIsProcessing(false);
      }, 100);
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error while trying to edit tour:", error);
      toast.error("Erro ao tentar editar o passeio. Tente novamente.");
      setIsProcessing(false);
      return Promise.reject(error);
    }
  };

  // Handle tour delete with improved error handling and loading state
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

  // Confirmation with proper Promise handling and timeout
  const confirmDelete = async () => {
    if (!tourToDelete) return Promise.resolve();
    
    setIsProcessing(true);
    showGlobalSpinner(true);
    
    try {
      await withTimeout(
        () => deleteTour(tourToDelete.id), 
        10000
      );
      
      setDeleteDialogOpen(false);
      setTourToDelete(null);
      return Promise.resolve();
    } catch (error) {
      console.error("Error deleting tour:", error);
      toast.error("Erro ao excluir o passeio. Tente novamente.");
      return Promise.reject(error);
    } finally {
      setIsProcessing(false);
      showGlobalSpinner(false);
    }
  };

  // Handle adding new tour with optimizations
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
      
      // Use setTimeout to prevent UI blocking
      setTimeout(() => {
        setFormDialogOpen(true);
        setIsProcessing(false);
      }, 100);
    } catch (error) {
      console.error("Error while trying to add new tour:", error);
      toast.error("Erro ao tentar adicionar novo passeio. Tente novamente.");
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
      (tour.short_description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Combined processing state
  const isAnyProcessing = isProcessing || isDeleting || isSaving;

  return (
    <AdminLayout pageTitle="Gerenciar Passeios">
      <div className="w-full overflow-x-hidden">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TourSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <TourActionButton onClick={handleAddNewTour} disabled={isAnyProcessing} />
        </div>

        <TourList
          tours={filteredTours}
          isLoading={isLoading || permissionLoading}
          error={error}
          onEditTour={handleEditClick}
          onDeleteTour={handleDeleteClick}
          isProcessing={isAnyProcessing}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteTourDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          tourToDelete={tourToDelete}
          onConfirmDelete={confirmDelete}
          isDeleting={isProcessing || isDeleting}
        />

        {/* Tour Form Dialog */}
        <TourFormDialog
          open={formDialogOpen}
          onOpenChange={(open) => {
            if (!isAnyProcessing) {
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
