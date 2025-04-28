
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAccommodations } from "@/hooks/use-accommodations";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AccommodationForm } from "@/components/admin/accommodations/AccommodationForm";
import AccommodationList from "@/components/admin/accommodations/AccommodationList";
import AccommodationSearch from "@/components/admin/accommodations/AccommodationSearch";
import AccommodationDeleteDialog from "@/components/admin/accommodations/AccommodationDeleteDialog";
import { Accommodation } from "@/types/database";
import { withTimeout } from "@/utils/asyncUtils";
import { useUI } from "@/contexts/UIContext";
import { toast } from "sonner";

const AdminAccommodations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAccommodationForm, setShowAccommodationForm] = useState(false);
  const [accommodationToEdit, setAccommodationToEdit] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [accommodationToDelete, setAccommodationToDelete] = useState<Accommodation | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { showGlobalSpinner } = useUI();
  const { 
    accommodations,
    isLoading, 
    error,
    refetch,
    deleteAccommodation
  } = useAccommodations();

  useEffect(() => {
    // Fetch accommodations when component mounts or type filter changes
    const fetchData = async () => {
      if (isProcessing) return;
      
      setIsProcessing(true);
      showGlobalSpinner(true);
      
      try {
        await withTimeout(() => refetch(), 8000);
      } catch (error) {
        console.error("Error fetching accommodations:", error);
        toast.error("Não foi possível carregar as hospedagens. Tente novamente.");
      } finally {
        showGlobalSpinner(false);
        setIsProcessing(false);
      }
    };
    
    fetchData();
  }, [typeFilter, refetch, showGlobalSpinner]);

  // Filter accommodations based on search query
  const filteredAccommodations = accommodations?.filter(
    (acc) =>
      acc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Handle accommodation edit with improved performance and error handling
  const handleEditClick = async (accommodation: Accommodation) => {
    if (isProcessing) return; // Prevent multiple rapid clicks
    
    setIsProcessing(true);
    
    try {
      // Set the accommodation ID to be edited
      setAccommodationToEdit(accommodation.id);
      
      // Use a small delay to ensure UI updates before opening modal
      setTimeout(() => {
        setShowAccommodationForm(true);
        setIsProcessing(false);
      }, 100);
    } catch (error) {
      console.error("Error while trying to edit accommodation:", error);
      toast.error("Erro ao tentar editar a hospedagem. Tente novamente.");
      setIsProcessing(false);
    }
  };

  // Handle accommodation delete with improved error handling and loading state
  const handleDeleteClick = (accommodation: Accommodation) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      setAccommodationToDelete(accommodation);
      setDeleteDialogOpen(true);
    } catch (error) {
      console.error("Error while preparing to delete accommodation:", error);
      toast.error("Erro ao preparar exclusão. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  const confirmDelete = async () => {
    if (accommodationToDelete) {
      try {
        setIsDeleting(true);
        setIsProcessing(true);
        
        await deleteAccommodation(accommodationToDelete.id);
        
        setDeleteDialogOpen(false);
        setAccommodationToDelete(null);
        toast.success("Hospedagem excluída com sucesso");
      } catch (error) {
        console.error("Error deleting accommodation:", error);
        toast.error("Não foi possível excluir a hospedagem. Tente novamente.");
      } finally {
        setIsDeleting(false);
        setIsProcessing(false);
      }
    }
  };

  const handleFormClose = () => {
    if (isProcessing) return;
    setShowAccommodationForm(false);
    setAccommodationToEdit(null);
  };

  // Combined processing state
  const isAnyProcessing = isProcessing || isDeleting;

  return (
    <AdminLayout pageTitle="Gerenciar Hospedagens">
      <div className="w-full overflow-hidden">
        <AccommodationSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          onAddNewClick={() => {
            if (!isProcessing) {
              setShowAccommodationForm(true);
            }
          }}
        />

        <AccommodationList
          accommodations={filteredAccommodations}
          isLoading={isLoading}
          error={error}
          onEditAccommodation={handleEditClick}
          onDeleteAccommodation={handleDeleteClick}
          isProcessing={isAnyProcessing}
        />

        {/* Accommodation Form Dialog */}
        <Dialog 
          open={showAccommodationForm} 
          onOpenChange={(open) => {
            if (!isProcessing) {
              setShowAccommodationForm(open);
              if (!open) {
                setAccommodationToEdit(null);
              }
            }
          }}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {accommodationToEdit ? "Editar Hospedagem" : "Nova Hospedagem"}
              </DialogTitle>
              <DialogDescription>
                {accommodationToEdit
                  ? "Edite os detalhes da hospedagem abaixo."
                  : "Preencha os detalhes da nova hospedagem abaixo."}
              </DialogDescription>
            </DialogHeader>
            <AccommodationForm
              accommodationId={accommodationToEdit}
              onCancel={handleFormClose}
              onSuccess={handleFormClose}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AccommodationDeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirmDelete={confirmDelete}
          isDeleting={isDeleting}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminAccommodations;
