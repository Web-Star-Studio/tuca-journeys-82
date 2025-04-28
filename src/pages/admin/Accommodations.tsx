
import React, { useState, useEffect, useRef } from "react";
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
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  
  // Use a ref to track component mount state
  const isMounted = useRef(true);
  
  const { showGlobalSpinner } = useUI();
  const { 
    accommodations,
    isLoading, 
    error,
    refetch,
    deleteAccommodation
  } = useAccommodations();

  // Effect for initial data loading - only runs once
  useEffect(() => {
    const fetchData = async () => {
      if (initialLoadComplete) return;
      
      try {
        setIsProcessing(true);
        showGlobalSpinner(true);
        
        await withTimeout(() => refetch(), 12000);
        
        if (isMounted.current) {
          setInitialLoadComplete(true);
        }
      } catch (error) {
        console.error("Error fetching accommodations:", error);
        toast.error("Não foi possível carregar as hospedagens. Tente novamente.");
      } finally {
        // Only update states if component is still mounted
        if (isMounted.current) {
          showGlobalSpinner(false);
          setIsProcessing(false);
        }
      }
    };
    
    fetchData();
    
    // Cleanup function to prevent state updates if unmounted
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  // Effect that handles type filter changes (separate from initial load)
  useEffect(() => {
    // Skip on first render - only run when typeFilter changes
    if (!initialLoadComplete) return;
    
    const applyFilter = async () => {
      if (isProcessing) return;
      
      try {
        setIsProcessing(true);
        // Short loading spinner for filter changes
        showGlobalSpinner(true);
        
        await refetch();
      } catch (error) {
        console.error("Error applying filter:", error);
        toast.error("Não foi possível filtrar as hospedagens. Tente novamente.");
      } finally {
        if (isMounted.current) {
          showGlobalSpinner(false);
          setIsProcessing(false);
        }
      }
    };
    
    applyFilter();
  }, [typeFilter]);

  // Filter accommodations based on search query
  const filteredAccommodations = accommodations?.filter(
    (acc) =>
      acc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Handle accommodation edit with improved error handling
  const handleEditClick = (accommodation: Accommodation) => {
    if (isProcessing || isDeleting) return;
    
    try {
      // Set the accommodation ID to be edited
      setAccommodationToEdit(accommodation.id);
      
      // Use a small delay to ensure UI updates before opening modal
      setTimeout(() => {
        setShowAccommodationForm(true);
      }, 100);
    } catch (error) {
      console.error("Error while trying to edit accommodation:", error);
      toast.error("Erro ao tentar editar a hospedagem. Tente novamente.");
    }
  };

  // Handle accommodation delete with improved error handling
  const handleDeleteClick = (accommodation: Accommodation) => {
    if (isProcessing || isDeleting) return;
    
    try {
      setAccommodationToDelete(accommodation);
      setDeleteDialogOpen(true);
    } catch (error) {
      console.error("Error while preparing to delete accommodation:", error);
      toast.error("Erro ao preparar exclusão. Tente novamente.");
    }
  };

  const confirmDelete = async () => {
    if (!accommodationToDelete || isDeleting) return;
    
    try {
      setIsDeleting(true);
      showGlobalSpinner(true);
      
      await deleteAccommodation(accommodationToDelete.id);
      
      if (isMounted.current) {
        setDeleteDialogOpen(false);
        setAccommodationToDelete(null);
        toast.success("Hospedagem excluída com sucesso");
      }
    } catch (error) {
      console.error("Error deleting accommodation:", error);
      toast.error("Não foi possível excluir a hospedagem. Tente novamente.");
    } finally {
      if (isMounted.current) {
        setIsDeleting(false);
        showGlobalSpinner(false);
      }
    }
  };

  const handleFormClose = () => {
    if (isProcessing || isDeleting) return;
    setShowAccommodationForm(false);
    setAccommodationToEdit(null);
  };

  // Combined processing state
  const isAnyProcessing = isProcessing || isDeleting || isLoading;

  return (
    <AdminLayout pageTitle="Gerenciar Hospedagens">
      <div className="w-full overflow-hidden">
        <AccommodationSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          onAddNewClick={() => {
            if (!isAnyProcessing) {
              setShowAccommodationForm(true);
            }
          }}
        />

        <AccommodationList
          accommodations={filteredAccommodations}
          isLoading={isLoading && !isAnyProcessing}
          error={error}
          onEditAccommodation={handleEditClick}
          onDeleteAccommodation={handleDeleteClick}
          isProcessing={isAnyProcessing}
        />

        {/* Accommodation Form Dialog */}
        <Dialog 
          open={showAccommodationForm} 
          onOpenChange={(open) => {
            if (!isAnyProcessing) {
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
