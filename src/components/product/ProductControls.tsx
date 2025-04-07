
import React from "react";
import { Button } from "@/components/ui/button";

interface ProductControlsProps {
  variations?: string[];
  selectedVariation: string | null;
  setSelectedVariation: (variation: string) => void;
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  inStock: boolean;
}

const ProductControls = ({
  variations,
  selectedVariation,
  setSelectedVariation,
  quantity,
  incrementQuantity,
  decrementQuantity,
  inStock
}: ProductControlsProps) => {
  return (
    <>
      <div className="mb-6">
        <p className="font-medium mb-2">Disponibilidade:</p>
        {inStock ? (
          <span className="text-green-600 flex items-center">
            <span className="w-3 h-3 bg-green-600 rounded-full mr-2"></span>
            Em estoque
          </span>
        ) : (
          <span className="text-red-600 flex items-center">
            <span className="w-3 h-3 bg-red-600 rounded-full mr-2"></span>
            Fora de estoque
          </span>
        )}
      </div>
      
      {variations && variations.length > 0 && (
        <div className="mb-6">
          <p className="font-medium mb-2">Variação:</p>
          <div className="flex flex-wrap gap-2">
            {variations.map(variation => (
              <Button
                key={variation}
                variant={selectedVariation === variation ? "default" : "outline"}
                className={selectedVariation === variation ? "bg-tuca-ocean-blue text-white" : ""}
                onClick={() => setSelectedVariation(variation)}
              >
                {variation}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <div className="mb-8">
        <p className="font-medium mb-2">Quantidade:</p>
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <span className="mx-4 text-lg">{quantity}</span>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={incrementQuantity}
          >
            +
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductControls;
