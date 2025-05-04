
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Share2 } from "lucide-react";

interface ProductActionsProps {
  productName: string;
  inStock: boolean;
}

const ProductActions = ({ productName, inStock }: ProductActionsProps) => {
  return (
    <div className="flex gap-4 mb-8">
      <Button 
        className="flex-1 py-6 bg-tuca-coral hover:bg-tuca-coral/90" 
        disabled={!inStock}
        onClick={() => {
          // Will be implemented with actual cart functionality
          alert(`${productName} adicionado ao carrinho!`);
        }}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Adicionar ao Carrinho
      </Button>
      <Button variant="outline" size="icon" className="border-tuca-ocean-blue">
        <Heart className="h-5 w-5 text-tuca-ocean-blue" />
      </Button>
      <Button variant="outline" size="icon" className="border-tuca-ocean-blue">
        <Share2 className="h-5 w-5 text-tuca-ocean-blue" />
      </Button>
    </div>
  );
};

export default ProductActions;
