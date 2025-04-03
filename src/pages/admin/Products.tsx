
import React, { useState } from "react";
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

// Sample product data
const dummyProducts = [
  {
    id: 1,
    name: "Camiseta Noronha",
    image_url: "/product-tshirt.jpg",
    category: "Vestuário",
    price: 89.90,
    stock: 45,
    status: "active",
  },
  {
    id: 2,
    name: "Chapéu de Palha",
    image_url: "/product-hat.jpg",
    category: "Acessórios",
    price: 59.90,
    stock: 30,
    status: "active",
  },
  {
    id: 3,
    name: "Caneca Noronha",
    image_url: "/product-mug.jpg",
    category: "Souvenirs",
    price: 39.90,
    stock: 65,
    status: "active",
  },
  {
    id: 4,
    name: "Guia Fernando de Noronha",
    image_url: "/product-book.jpg",
    category: "Livros",
    price: 79.90,
    stock: 18,
    status: "active",
  },
  {
    id: 5,
    name: "Toalha de Praia",
    image_url: "/placeholder.svg",
    category: "Praia",
    price: 99.90,
    stock: 0,
    status: "out_of_stock",
  },
  {
    id: 6,
    name: "Protetor Solar",
    image_url: "/placeholder.svg",
    category: "Praia",
    price: 45.90,
    stock: 5,
    status: "active",
  }
];

const Products = () => {
  const [products, setProducts] = useState(dummyProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<typeof dummyProducts[0] | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<number | undefined>(undefined);

  // Handle product edit
  const handleEditClick = (product: typeof dummyProducts[0]) => {
    setProductToEdit(product.id);
    setFormDialogOpen(true);
  };

  // Handle product delete
  const handleDeleteClick = (product: typeof dummyProducts[0]) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete.id));
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  // Handle adding new product
  const handleAddNewProduct = () => {
    setProductToEdit(undefined);
    setFormDialogOpen(true);
  };

  // Handle form success
  const handleFormSuccess = () => {
    // Refresh product data
    console.log("Product saved successfully");
  };

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
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
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-10 w-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{product.category}</Badge>
                </TableCell>
                <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  {product.status === "active" ? (
                    <Badge variant="outline" className="border-green-500 text-green-600">
                      Ativo
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-red-500 text-red-600">
                      Sem estoque
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
            ))}
            {filteredProducts.length === 0 && (
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
            >
              Excluir
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
