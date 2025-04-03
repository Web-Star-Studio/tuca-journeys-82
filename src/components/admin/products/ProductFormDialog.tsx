
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId?: number;
  onSuccess: () => void;
}

const ProductFormDialog: React.FC<ProductFormDialogProps> = ({
  open,
  onOpenChange,
  productId,
  onSuccess,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {productId ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>
          <DialogDescription>
            {productId
              ? "Edite os detalhes do produto abaixo."
              : "Preencha os detalhes do novo produto abaixo."}
          </DialogDescription>
        </DialogHeader>
        <ProductForm
          productId={productId}
          onCancel={() => onOpenChange(false)}
          onSuccess={() => {
            onSuccess();
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
