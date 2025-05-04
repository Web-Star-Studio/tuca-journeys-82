
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export interface WishlistItem {
  id: number;
  type: 'tour' | 'accommodation' | 'package' | 'product' | 'event'; 
  name: string;
  image: string;
  price?: number;
  description?: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { toast } = useToast();

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      try {
        setWishlistItems(JSON.parse(storedWishlist));
      } catch (error) {
        console.error("Error parsing wishlist data from localStorage:", error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (newItem: WishlistItem) => {
    setWishlistItems((prevItems) => {
      // Check if the item already exists in the wishlist
      const existingItem = prevItems.find(
        (item) => item.id === newItem.id && item.type === newItem.type
      );

      if (existingItem) {
        toast({
          title: "Item já está na lista de desejos",
          description: `${newItem.name} já está na sua lista de desejos.`,
        });
        return prevItems;
      }

      toast({
        title: "Item adicionado",
        description: `${newItem.name} foi adicionado à sua lista de desejos.`,
      });
      
      return [...prevItems, newItem];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems((prevItems) => {
      const removedItem = prevItems.find((item) => item.id === id);
      
      const updatedItems = prevItems.filter((item) => item.id !== id);
      
      if (removedItem) {
        toast({
          title: "Item removido",
          description: `${removedItem.name} foi removido da sua lista de desejos.`,
        });
      }
      
      return updatedItems;
    });
  };

  const isInWishlist = (id: number) => {
    return wishlistItems.some(item => item.id === id);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast({
      title: "Lista de desejos limpa",
      description: "Todos os itens foram removidos da sua lista de desejos.",
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
