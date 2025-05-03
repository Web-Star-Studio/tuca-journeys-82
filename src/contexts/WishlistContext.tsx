
import React, { createContext, useContext, useState } from 'react';

export interface WishlistItem {
  id: number;
  type: 'activity' | 'accommodation' | 'restaurant';
  title: string;
  image?: string;
}

export interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number, type: string) => void;
  isInWishlist: (id: number, type: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
});

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const addToWishlist = (item: WishlistItem) => {
    if (!isInWishlist(item.id, item.type)) {
      setWishlist([...wishlist, item]);
    }
  };

  const removeFromWishlist = (id: number, type: string) => {
    setWishlist(wishlist.filter(item => !(item.id === id && item.type === type)));
  };

  const isInWishlist = (id: number, type: string) => {
    return wishlist.some(item => item.id === id && item.type === type);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
