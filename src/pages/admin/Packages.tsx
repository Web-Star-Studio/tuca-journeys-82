
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { usePackages } from "@/hooks/use-packages";
import { useToast } from "@/hooks/use-toast";
import { Dialog } from "@/components/ui/dialog";
import PackageForm from "@/components/admin/packages/PackageForm";
import PackageSearch from "@/components/admin/packages/PackageSearch";
import PackageDeleteDialog from "@/components/admin/packages/PackageDeleteDialog";
import PackageGrid from "@/components/admin/packages/PackageGrid";

const AdminPackages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [packageToEdit, setPackageToEdit] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  const { toast } = useToast();
  const { 
    data: packages, 
    isLoading, 
    isError,
    error,
    deletePackage: deletePackageMutation
  } = usePackages(categoryFilter === "all" ? "" : categoryFilter);

  // Filter packages based on search query
  const filteredPackages = packages?.filter(
    (pkg) =>
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Handle package edit
  const handleEditClick = (pkg: any) => {
    setPackageToEdit(pkg.id);
    setShowPackageForm(true);
  };

  // Handle package delete
  const handleDeleteClick = (pkg: any) => {
    setPackageToDelete(pkg.id);
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

  return (
    <AdminLayout pageTitle="Gerenciar Pacotes">
      <div className="space-y-6">
        <PackageSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          onAddNewClick={() => {
            setPackageToEdit(null);
            setShowPackageForm(true);
          }}
        />

        <PackageGrid
          packages={filteredPackages}
          isLoading={isLoading}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />

        {/* Package Form Dialog */}
        <Dialog open={showPackageForm} onOpenChange={setShowPackageForm}>
          <PackageForm
            packageId={packageToEdit}
            onCancel={() => setShowPackageForm(false)}
            onSuccess={() => {
              setShowPackageForm(false);
              toast({
                title: packageToEdit ? "Pacote atualizado" : "Pacote criado",
                description: packageToEdit 
                  ? "O pacote foi atualizado com sucesso." 
                  : "O pacote foi criado com sucesso."
              });
            }}
          />
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <PackageDeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirmDelete={confirmDelete}
          isDeleting={deletePackageMutation.isPending}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminPackages;
