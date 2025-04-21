
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from "sonner";
import { Product } from "@/types/product";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Minus, Package, RotateCcw } from "lucide-react";
import { useUpdateProductStock } from "@/hooks/use-products";

interface InventoryManagerProps {
  product: Product;
}

const InventoryManager = ({ product }: InventoryManagerProps) => {
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [stockAdjustment, setStockAdjustment] = useState<number>(1);
  const [stockOperation, setStockOperation] = useState<'add' | 'subtract' | 'set'>('add');
  
  const updateStockMutation = useUpdateProductStock();
  
  const handleStockAdjust = () => {
    if (stockAdjustment <= 0) {
      toast.error("O valor deve ser maior que zero");
      return;
    }
    
    updateStockMutation.mutate({
      productId: product.id,
      stock: stockAdjustment,
      operation: stockOperation
    });
    
    setIsStockModalOpen(false);
  };
  
  const getStatusColor = () => {
    switch (product.status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      case 'discontinued':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex justify-between items-center">
          <span>Gestão de Estoque</span>
          <span className={`text-sm px-2 py-1 rounded-full ${getStatusColor()}`}>
            {product.status === 'active' ? 'Em estoque' : 
             product.status === 'out_of_stock' ? 'Sem estoque' : 'Descontinuado'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-medium">Quantidade atual</h4>
            <p className="text-3xl font-bold">{product.stock || 0} unidades</p>
          </div>
          <Package className="h-10 w-10 text-muted-foreground" />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-1 flex-1"
            onClick={() => {
              setStockOperation('add');
              setStockAdjustment(1);
              setIsStockModalOpen(true);
            }}
          >
            <Plus className="h-4 w-4" /> Adicionar
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-1 flex-1"
            onClick={() => {
              setStockOperation('subtract');
              setStockAdjustment(1);
              setIsStockModalOpen(true);
            }}
            disabled={!product.stock || product.stock <= 0}
          >
            <Minus className="h-4 w-4" /> Remover
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-1 flex-1"
            onClick={() => {
              setStockOperation('set');
              setStockAdjustment(product.stock || 0);
              setIsStockModalOpen(true);
            }}
          >
            <RotateCcw className="h-4 w-4" /> Definir
          </Button>
        </div>
      </CardContent>
      
      {/* Stock Adjustment Modal */}
      <Dialog open={isStockModalOpen} onOpenChange={setIsStockModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {stockOperation === 'add' ? 'Adicionar ao estoque' :
               stockOperation === 'subtract' ? 'Remover do estoque' : 'Definir estoque'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="stockAdjustment" className="text-sm font-medium">
                  {stockOperation === 'add' ? 'Quantidade a adicionar' :
                   stockOperation === 'subtract' ? 'Quantidade a remover' : 'Nova quantidade'}
                </label>
                <span className="text-sm text-muted-foreground">
                  Estoque atual: {product.stock || 0}
                </span>
              </div>
              <Input
                id="stockAdjustment"
                type="number"
                min="1"
                value={stockAdjustment}
                onChange={(e) => setStockAdjustment(parseInt(e.target.value) || 0)}
              />
            </div>
            
            {stockOperation === 'subtract' && (
              <div className="text-sm text-muted-foreground">
                {stockAdjustment > (product.stock || 0) ? (
                  <p className="text-red-500">
                    A quantidade a remover é maior que o estoque atual. O estoque será zerado.
                  </p>
                ) : (
                  <p>
                    Novo estoque após remoção: {Math.max(0, (product.stock || 0) - stockAdjustment)} unidades
                  </p>
                )}
              </div>
            )}
            
            {stockOperation === 'add' && (
              <div className="text-sm text-muted-foreground">
                <p>
                  Novo estoque após adição: {(product.stock || 0) + stockAdjustment} unidades
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStockModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleStockAdjust}
              disabled={updateStockMutation.isPending || stockAdjustment <= 0}
            >
              {updateStockMutation.isPending ? "Atualizando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default InventoryManager;
