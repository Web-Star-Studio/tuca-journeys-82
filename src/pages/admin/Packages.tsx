
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { usePackages } from "@/hooks/use-packages";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PackageForm } from "@/components/admin/packages/PackageForm";
import PackageTable from "@/components/admin/packages/PackageTable";
import PackageSearch from "@/components/admin/packages/PackageSearch";
import PackageDeleteDialog from "@/components/admin/packages/PackageDeleteDialog";

const Packages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [packageToEdit, setPackageToEdit] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  
  const { toast } = useToast();
  const { 
    data: packages, 
    isLoading, 
    error,
    deletePackage: deletePackageMutation
  } = usePackages(categoryFilter);

  // Filter packages based on search query
  const filteredPackages = packages?.filter(
    (pkg) =>
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Handle package edit
  const handleEditClick = (packageId: number) => {
    setPackageToEdit(packageId);
    setShowPackageForm(true);
  };

  // Handle package delete
  const handleDeleteClick = (packageId: number) => {
    setPackageToDelete(packageId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (packageToDelete) {
      deletePackageMutation.mutate(packageToDelete, {
        onSuccess: () => {
          toast({
            title: "Pacote excluído",
            description: "O pacote foi excluído com sucesso."
          });
          setDeleteDialogOpen(false);
          setPackageToDelete(null);
        },
        onError: (error) => {
          toast({
            title: "Erro",
            description: "Não foi possível excluir o pacote. Tente novamente.",
            variant: "destructive"
          });
          console.error("Error deleting package:", error);
        }
      });
    }
  };

  const handleFormClose = () => {
    setShowPackageForm(false);
    setPackageToEdit(null);
  };

  return (
    <AdminLayout pageTitle="Gerenciar Pacotes">
      <PackageSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        onAddNewClick={() => setShowPackageForm(true)}
      />

      <PackageTable
        packages={filteredPackages}
        isLoading={isLoading}
        error={error}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      {/* Package Form Dialog */}
      <Dialog open={showPackageForm} onOpenChange={setShowPackageForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {packageToEdit ? "Editar Pacote" : "Novo Pacote"}
            </DialogTitle>
            <DialogDescription>
              {packageToEdit
                ? "Edite os detalhes do pacote abaixo."
                : "Preencha os detalhes do novo pacote abaixo."}
            </DialogDescription>
          </DialogHeader>
          <PackageForm
            packageId={packageToEdit}
            onCancel={handleFormClose}
            onSuccess={handleFormClose}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <PackageDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirmDelete={confirmDelete}
        isDeleting={deletePackageMutation.isPending}
      />
    </AdminLayout>
  );
};

export default Packages;
