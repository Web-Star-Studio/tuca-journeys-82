
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

const AdminAccommodations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAccommodationForm, setShowAccommodationForm] = useState(false);
  const [accommodationToEdit, setAccommodationToEdit] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [accommodationToDelete, setAccommodationToDelete] = useState<Accommodation | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  
  const { toast } = useToast();
  const { 
    data: accommodations,
    isLoading, 
    error,
    isError,
    deleteAccommodation
  } = useAccommodations(typeFilter === "all" ? "" : typeFilter);

  useEffect(() => {
    // Fetch accommodations when component mounts or type filter changes
    const fetchData = async () => {
      try {
        await fetchAccommodations();
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    };
    
    fetchData();
  }, [typeFilter]);

  // Filter accommodations based on search query
  const filteredAccommodations = accommodations?.filter(
    (acc) =>
      acc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Handle accommodation edit
  const handleEditClick = (accommodation: Accommodation) => {
    setAccommodationToEdit(accommodation.id);
    setShowAccommodationForm(true);
  };

  // Handle accommodation delete
  const handleDeleteClick = (accommodation: Accommodation) => {
    setAccommodationToDelete(accommodation);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (accommodationToDelete) {
      deleteAccommodation.mutate(accommodationToDelete.id, {
        onSuccess: () => {
          toast({
            title: "Hospedagem excluída",
            description: "A hospedagem foi excluída com sucesso."
          });
          setDeleteDialogOpen(false);
          setAccommodationToDelete(null);
        },
        onError: (error) => {
          toast({
            title: "Erro",
            description: "Não foi possível excluir a hospedagem. Tente novamente.",
            variant: "destructive"
          });
          console.error("Error deleting accommodation:", error);
        }
      });
    }
  };

  const handleFormClose = () => {
    setShowAccommodationForm(false);
    setAccommodationToEdit(null);
  };

  return (
    <AdminLayout pageTitle="Gerenciar Hospedagens">
      <div className="w-full overflow-hidden">
        <AccommodationSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          onAddNewClick={() => setShowAccommodationForm(true)}
        />

        <AccommodationList
          accommodations={filteredAccommodations}
          isLoading={isLoading}
          error={error}
          onEditAccommodation={handleEditClick}
          onDeleteAccommodation={handleDeleteClick}
        />

        {/* Accommodation Form Dialog */}
        <Dialog open={showAccommodationForm} onOpenChange={setShowAccommodationForm}>
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
          isDeleting={deleteAccommodation.isPending}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminAccommodations;
