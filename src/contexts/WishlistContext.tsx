
import React, { createContext, useContext, useState } from 'react';

export interface WishlistItem {
  id: number;
  type: 'activity' | 'accommodation' | 'restaurant' | 'event' | 'product' | 'package' | 'tour';
  title: string;
  image?: string;
}

export interface WishlistContextType {
  wishlist: WishlistItem[];
  wishlistItems: WishlistItem[]; // Alias for backward compatibility
  addToWishlist: (item: Partial<WishlistItem>) => void;
  removeFromWishlist: (id: number, type: string) => void;
  isInWishlist: (id: number, type?: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  wishlistItems: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
});

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const addToWishlist = (item: Partial<WishlistItem>) => {
    if (!item.id || !item.type) return;
    
    if (!isInWishlist(item.id, item.type)) {
      const newItem: WishlistItem = {
        id: item.id,
        type: item.type,
        title: item.title || 'Item sem título',
        image: item.image
      };
      setWishlist([...wishlist, newItem]);
    }
  };

  const removeFromWishlist = (id: number, type: string) => {
    setWishlist(wishlist.filter(item => !(item.id === id && item.type === type)));
  };

  const isInWishlist = (id: number, type?: string) => {
    if (type) {
      return wishlist.some(item => item.id === id && item.type === type);
    }
    return wishlist.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      wishlistItems: wishlist, // Provide alias
      addToWishlist, 
      removeFromWishlist, 
      isInWishlist 
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
