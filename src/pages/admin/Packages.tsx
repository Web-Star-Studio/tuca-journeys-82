
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  Package,
  ExternalLink,
} from "lucide-react";
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
import SafeImage from "@/components/ui/safe-image";
import { Package as PackageType } from "@/data/types/packageTypes";
import { PackageForm } from "@/components/admin/packages/PackageForm";
import { usePackages } from "@/hooks/use-packages";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  // Get package categories
  const categories = [
    { value: "", label: "Todos" },
    { value: "romantic", label: "Romântico" },
    { value: "adventure", label: "Aventura" },
    { value: "family", label: "Família" },
    { value: "premium", label: "Premium" },
    { value: "budget", label: "Econômico" },
  ];

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

  // Get category badge styling
  const getCategoryBadge = (pkg: PackageType) => {
    let category = "";
    let variant: "default" | "secondary" | "outline" | "destructive" = "default";
    
    if (pkg.id >= 1 && pkg.id <= 2 || pkg.id === 6) {
      category = "Romântico";
      variant = "default";
    } else if (pkg.id >= 3 && pkg.id <= 4) {
      category = "Aventura";
      variant = "secondary";
    } else if (pkg.id === 5) {
      category = "Família";
      variant = "outline";
    } else if (pkg.id === 6) {
      category = "Premium";
      variant = "destructive";
    } else {
      category = "Econômico";
      variant = "outline";
    }
    
    return <Badge variant={variant}>{category}</Badge>;
  };

  return (
    <AdminLayout pageTitle="Gerenciar Pacotes">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar pacotes..."
              className="pl-10 w-full md:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button className="gap-1" onClick={() => setShowPackageForm(true)}>
          <Plus className="h-4 w-4" />
          <span>Novo Pacote</span>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
          <span className="ml-2 text-lg">Carregando pacotes...</span>
        </div>
      ) : error ? (
        <div className="rounded-md border bg-white p-8 text-center">
          <p className="text-red-500">Erro ao carregar pacotes. Por favor, tente novamente.</p>
          <p className="text-sm text-gray-500 mt-2">{String(error)}</p>
        </div>
      ) : (
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Imagem</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Dias</TableHead>
                <TableHead>Pessoas</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Avaliação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPackages.length > 0 ? (
                filteredPackages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell className="font-medium">{pkg.id}</TableCell>
                    <TableCell>
                      <SafeImage
                        src={pkg.image}
                        alt={pkg.title}
                        className="h-10 w-16 object-cover rounded"
                        fallbackSrc="/placeholder.svg"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{pkg.title}</TableCell>
                    <TableCell>{getCategoryBadge(pkg)}</TableCell>
                    <TableCell>{pkg.days} dias</TableCell>
                    <TableCell>{pkg.persons} pessoas</TableCell>
                    <TableCell>R$ {pkg.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-1 text-yellow-500">★</span>
                        {pkg.rating}
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
                          <Link to={`/pacotes/${pkg.id}`} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600"
                          onClick={() => handleEditClick(pkg.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600"
                          onClick={() => handleDeleteClick(pkg.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    Nenhum pacote encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

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
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este pacote? Esta ação não pode ser
              desfeita.
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
              disabled={deletePackageMutation.isPending}
            >
              {deletePackageMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                "Excluir"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Packages;
