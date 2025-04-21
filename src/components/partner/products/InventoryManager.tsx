
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Plus, Minus } from "lucide-react";
import { Product } from "@/types/database";
import { useProducts } from "@/hooks/use-products";
import { toast } from "sonner";

const InventoryManager: React.FC = () => {
  const [editableStock, setEditableStock] = useState<Record<number, number>>({});
  const { products, isLoading, updateProductStock } = useProducts();
  
  const handleStockChange = (productId: number, value: string) => {
    const stockValue = parseInt(value, 10);
    if (!isNaN(stockValue) && stockValue >= 0) {
      setEditableStock({ ...editableStock, [productId]: stockValue });
    }
  };
  
  const saveStockChange = async (product: Product) => {
    const newStock = editableStock[product.id];
    
    if (newStock === undefined || newStock === product.stock) {
      // No change or invalid value
      return;
    }
    
    try {
      await updateProductStock({ id: product.id, stock: newStock });
      toast.success("Estoque atualizado com sucesso");
      
      // Clear the editable state for this product
      const updatedEditableStock = { ...editableStock };
      delete updatedEditableStock[product.id];
      setEditableStock(updatedEditableStock);
    } catch (error) {
      console.error("Error updating stock:", error);
      toast.error("Erro ao atualizar o estoque");
    }
  };
  
  const incrementStock = (product: Product) => {
    const currentStock = editableStock[product.id] !== undefined 
      ? editableStock[product.id] 
      : product.stock;
    setEditableStock({ ...editableStock, [product.id]: currentStock + 1 });
  };
  
  const decrementStock = (product: Product) => {
    const currentStock = editableStock[product.id] !== undefined 
      ? editableStock[product.id] 
      : product.stock;
    if (currentStock > 0) {
      setEditableStock({ ...editableStock, [product.id]: currentStock - 1 });
    }
  };
  
  const cancelStockChange = (productId: number) => {
    const updatedEditableStock = { ...editableStock };
    delete updatedEditableStock[productId];
    setEditableStock(updatedEditableStock);
  };
  
  const isStockChanged = (product: Product) => {
    return editableStock[product.id] !== undefined && editableStock[product.id] !== product.stock;
  };
  
  if (isLoading) {
    return <div>Carregando inventário...</div>;
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Estoque Atual</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => decrementStock(product)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        className="w-20 text-center"
                        value={editableStock[product.id] !== undefined ? editableStock[product.id] : product.stock}
                        onChange={(e) => handleStockChange(product.id, e.target.value)}
                        min={0}
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => incrementStock(product)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    {isStockChanged(product) && (
                      <div className="flex space-x-2">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="text-green-600"
                          onClick={() => saveStockChange(product)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="text-red-600"
                          onClick={() => cancelStockChange(product.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryManager;
