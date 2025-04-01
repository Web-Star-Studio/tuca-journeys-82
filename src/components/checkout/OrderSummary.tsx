
import React from "react";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/contexts/CartContext";

interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  subtotal,
  shipping,
  total
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
      <h2 className="text-xl font-medium mb-4">Resumo do Pedido</h2>
      
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.variation}`} className="flex gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h4 className="font-medium">{item.name}</h4>
              {item.variation && (
                <p className="text-sm text-muted-foreground">
                  Variação: {item.variation}
                </p>
              )}
              <div className="flex justify-between">
                <span className="text-sm">
                  {item.quantity} x R$ {item.price.toFixed(2).replace('.', ',')}
                </span>
                <span className="font-medium">
                  R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
        </div>
        <div className="flex justify-between">
          <span>Frete</span>
          <span>R$ {shipping.toFixed(2).replace('.', ',')}</span>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex justify-between font-medium text-lg">
        <span>Total</span>
        <span>R$ {total.toFixed(2).replace('.', ',')}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
