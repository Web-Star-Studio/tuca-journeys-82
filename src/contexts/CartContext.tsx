import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variation?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: number, variation?: string) => void;
  updateQuantity: (itemId: number, quantity: number, variation?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing cart data from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate total number of items in cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price of items in cart
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const addItem = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id && item.variation === newItem.variation
      );

      // If item exists, update quantity
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
        };
        
        toast({
          title: "Carrinho atualizado",
          description: `Quantidade de ${newItem.name} atualizada no carrinho.`,
        });
        
        return updatedItems;
      }

      // Otherwise, add new item to cart
      toast({
        title: "Item adicionado",
        description: `${newItem.name} foi adicionado ao carrinho.`,
      });
      
      return [...prevItems, newItem];
    });
  };

  const removeItem = (itemId: number, variation?: string) => {
    setCartItems((prevItems) => {
      const removedItem = prevItems.find(
        (item) => item.id === itemId && item.variation === variation
      );
      
      const updatedItems = prevItems.filter(
        (item) => !(item.id === itemId && item.variation === variation)
      );
      
      if (removedItem) {
        toast({
          title: "Item removido",
          description: `${removedItem.name} foi removido do carrinho.`,
        });
      }
      
      return updatedItems;
    });
  };

  const updateQuantity = (itemId: number, quantity: number, variation?: string) => {
    if (quantity <= 0) {
      removeItem(itemId, variation);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId && item.variation === variation) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Carrinho limpo",
      description: "Todos os itens foram removidos do carrinho.",
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
