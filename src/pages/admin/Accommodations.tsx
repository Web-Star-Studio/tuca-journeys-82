import React, { useState, useEffect, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAccommodations } from "@/hooks/use-accommodations";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AccommodationForm } from "@/components/admin/accommodations/AccommodationForm";
import AccommodationList from "@/components/admin/accommodations/AccommodationList";
import AccommodationSearch from "@/components/admin/accommodations/AccommodationSearch";
import AccommodationDeleteDialog from "@/components/admin/accommodations/AccommodationDeleteDialog";
import { Accommodation } from "@/types/database";
import { useUI } from "@/contexts/UIContext";
import { toast } from "sonner";
import PopulateDbButton from "@/components/admin/accommodations/PopulateDbButton";
import AccommodationFormDialog from "@/components/admin/accommodations/AccommodationFormDialog";

const AdminAccommodations = () => {
  // State management for UI
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
    deleteAccommodation,
    filters,
    applyFilters,
    accommodationTypes,
    priceRange,
    isDeleting: isDeletingMutation,
    isSaving
  } = useAccommodations();

  // Effect for initial data loading - only runs once
  useEffect(() => {
    const fetchData = async () => {
      if (initialLoadComplete) return;
      
      try {
        setIsProcessing(true);
        showGlobalSpinner(true);
        
        // Instead of creating a complex fallback object, let's just call refetch directly
        // and handle any errors or timeouts separately
        try {
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error("Timeout exceeded")), 12000);
          });
          
          await Promise.race([refetch(), timeoutPromise]);
        } catch (error) {
          console.error("Error or timeout fetching accommodations:", error);
        }
        
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
    
    // Update filters when typeFilter changes
    applyFilters({ type: typeFilter });
    
  }, [typeFilter, initialLoadComplete]);

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
  const isAnyProcessing = isProcessing || isDeleting || isDeletingMutation || isSaving || isLoading;

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
          filters={filters}
          applyFilters={applyFilters}
          accommodationTypes={accommodationTypes}
          priceRange={priceRange}
          isProcessing={isAnyProcessing}
        >
          <div className="mt-2 flex justify-end">
            <PopulateDbButton />
          </div>
        </AccommodationSearch>

        <AccommodationList
          accommodations={accommodations || []}
          isLoading={isLoading && !isAnyProcessing}
          error={error}
          onEditAccommodation={handleEditClick}
          onDeleteAccommodation={handleDeleteClick}
          isProcessing={isAnyProcessing}
        />

        {/* Use the AccommodationFormDialog component which handles fetching the data properly */}
        <AccommodationFormDialog
          open={showAccommodationForm}
          onOpenChange={(open) => {
            if (!isAnyProcessing) {
              setShowAccommodationForm(open);
              if (!open) {
                setAccommodationToEdit(null);
              }
            }
          }}
          accommodationId={accommodationToEdit}
          onSuccess={handleFormClose}
        />

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
