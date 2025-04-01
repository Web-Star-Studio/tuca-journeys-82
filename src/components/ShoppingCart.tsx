
import React from "react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart as CartIcon, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample cart items (will be replaced with actual state management)
const cartItems = [
  {
    id: 1,
    name: "Camiseta Eco Noronha",
    price: 89.90,
    quantity: 1,
    image: "/product-tshirt.jpg",
    variation: "M"
  },
  {
    id: 3,
    name: "Chapéu de Palha Tuca",
    price: 75.90,
    quantity: 2,
    image: "/product-hat.jpg",
    variation: "Único"
  }
];

const ShoppingCart = () => {
  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  // Calculate total items
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <CartIcon className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-tuca-coral text-white">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Seu Carrinho</SheetTitle>
        </SheetHeader>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <CartIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Seu carrinho está vazio</h3>
            <p className="text-muted-foreground mb-6">
              Adicione produtos para continuar
            </p>
            <Link to="/loja">
              <Button>Ir para a Loja</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.variation}`} className="flex gap-4 border-b pb-4">
                  <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">{item.name}</h4>
                    {item.variation && (
                      <p className="text-sm text-muted-foreground">
                        Variação: {item.variation}
                      </p>
                    )}
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border rounded">
                        <button className="px-2 py-1 text-sm">-</button>
                        <span className="px-2 py-1 text-sm">{item.quantity}</span>
                        <button className="px-2 py-1 text-sm">+</button>
                      </div>
                      <span className="font-medium">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                  <button className="text-red-500 p-1">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
              </div>
              <Link to="/checkout">
                <Button className="w-full bg-tuca-coral hover:bg-tuca-coral/90 py-6">
                  Finalizar Compra
                </Button>
              </Link>
              <Link to="/loja">
                <Button variant="outline" className="w-full">
                  Continuar Comprando
                </Button>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
