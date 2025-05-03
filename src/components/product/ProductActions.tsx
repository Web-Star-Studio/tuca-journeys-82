
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, ShoppingCart, MinusCircle, PlusCircle } from 'lucide-react';
import { Product } from '@/types/product';
import { formatCurrency } from '@/utils/formatters';

interface ProductActionsProps {
  product: Product;
  isInWishlist: boolean;
  toggleWishlist: () => void;
  addToCart: (quantity: number) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({ 
  product, 
  isInWishlist,
  toggleWishlist,
  addToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (quantity < (product.stock || 10)) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= (product.stock || 10)) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(quantity);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-3xl font-semibold text-tuca-ocean-blue">
            {formatCurrency(product.price)}
          </span>
          <span className="text-sm text-gray-500">
            {product.stock ? `${product.stock} em estoque` : 'Em estoque'}
          </span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded-md">
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            className="px-2"
          >
            <MinusCircle className="h-4 w-4" />
          </Button>
          <Input
            type="text"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-12 text-center border-0 focus-visible:ring-0"
          />
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={increaseQuantity}
            disabled={quantity >= (product.stock || 10)}
            className="px-2"
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={handleAddToCart} 
          className="flex-1"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Adicionar ao Carrinho
        </Button>
        <Button 
          variant="outline" 
          onClick={toggleWishlist}
          className={`${isInWishlist ? 'text-red-500 border-red-500 hover:bg-red-50' : ''}`}
        >
          <Heart className={`mr-2 h-5 w-5 ${isInWishlist ? 'fill-red-500' : ''}`} />
          {isInWishlist ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </Button>
      </div>
    </div>
  );
};

export default ProductActions;
