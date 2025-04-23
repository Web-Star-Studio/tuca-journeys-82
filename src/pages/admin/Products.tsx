import React, { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, Filter, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
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
import ProductFormDialog from "@/components/admin/products/ProductFormDialog";
import { useProducts } from "@/hooks/use-products";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/types/product";
import SafeImage from "@/components/ui/safe-image";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<number | undefined>(undefined);
  const [filters, setFilters] = useState({
    category: "",
    status: ""
  });
  
  // Use the products hook with search query as filter
  const { products, isLoading, error, deleteProduct, useProductCategories } = useProducts({
    search: searchQuery,
    ...filters
  });
  
  // Get product categories for filter
  const { data: categories } = useProductCategories();
  
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Erro ao carregar produtos",
        description: "Não foi possível carregar os produtos. Por favor, tente novamente.",
        variant: "destructive"
      });
    }
  }, [error, toast]);

  // Handle product edit
  const handleEditClick = (product: Product) => {
    setProductToEdit(product.id);
    setFormDialogOpen(true);
  };

  // Handle product delete
  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct.mutateAsync(productToDelete.id);
        setDeleteDialogOpen(false);
        setProductToDelete(null);
        toast({
          title: "Produto excluído",
          description: "O produto foi excluído com sucesso."
        });
      } catch (error) {
        toast({
          title: "Erro ao excluir produto",
          description: "Não foi possível excluir o produto. Por favor, tente novamente.",
          variant: "destructive"
        });
      }
    }
  };

  // Handle adding new product
  const handleAddNewProduct = () => {
    setProductToEdit(undefined);
    setFormDialogOpen(true);
  };

  // Handle form success
  const handleFormSuccess = () => {
    toast({
      title: productToEdit ? "Produto atualizado" : "Produto criado",
      description: productToEdit 
        ? "O produto foi atualizado com sucesso." 
        : "O produto foi criado com sucesso."
    });
  };
  
  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AdminLayout pageTitle="Gerenciar Produtos">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar produtos..."
              className="pl-10 w-full md:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <div className="p-2">
                <h4 className="mb-2 text-sm font-medium">Categoria</h4>
                <div className="space-y-1">
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => handleFilterChange("category", "")}
                  >
                    Todas
                  </DropdownMenuItem>
                  {categories?.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      className="cursor-pointer"
                      onClick={() => handleFilterChange("category", category)}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </div>
                <h4 className="mb-2 mt-4 text-sm font-medium">Status</h4>
                <div className="space-y-1">
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => handleFilterChange("status", "")}
                  >
                    Todos
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => handleFilterChange("status", "active")}
                  >
                    Ativo
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => handleFilterChange("status", "out_of_stock")}
                  >
                    Sem estoque
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => handleFilterChange("status", "discontinued")}
                  >
                    Descontinuado
                  </DropdownMenuItem>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button className="gap-1" onClick={handleAddNewProduct}>
          <Plus className="h-4 w-4" />
          <span>Novo Produto</span>
        </Button>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading state
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`loading-${index}`}>
                  <TableCell><Skeleton className="h-5 w-8" /></TableCell>
                  <TableCell><Skeleton className="h-10 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-10" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-24 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : products && products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>
                    <SafeImage
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      className="h-10 w-16 object-cover rounded"
                      fallbackSrc="/placeholder.svg"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(product.price)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    {product.status === "active" ? (
                      <Badge variant="outline" className="border-green-500 text-green-600">
                        Ativo
                      </Badge>
                    ) : product.status === "out_of_stock" ? (
                      <Badge variant="outline" className="border-red-500 text-red-600">
                        Sem estoque
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-gray-500 text-gray-600">
                        Descontinuado
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="h-8 w-8"
                      >
                        <Link to={`/loja/${product.id}`} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-600"
                        onClick={() => handleEditClick(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600"
                        onClick={() => handleDeleteClick(product)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o produto "{productToDelete?.name}"?
              Esta ação não pode ser desfeita.
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
              disabled={deleteProduct.isPending}
            >
              {deleteProduct.isPending ? "Excluindo..." : "Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Product Form Dialog */}
      <ProductFormDialog 
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        productId={productToEdit}
        onSuccess={handleFormSuccess}
      />
    </AdminLayout>
  );
};

export default Products;
