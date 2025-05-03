
import React, { createContext, useContext, useState } from 'react';

export interface UIContextType {
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  toggleCart: () => void;
  toggleWishlist: () => void;
}

const UIContext = createContext<UIContextType>({
  isCartOpen: false,
  isWishlistOpen: false,
  toggleCart: () => {},
  toggleWishlist: () => {}
});

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (!isCartOpen) setIsWishlistOpen(false);
  };

  const toggleWishlist = () => {
    setIsWishlistOpen(!isWishlistOpen);
    if (!isWishlistOpen) setIsCartOpen(false);
  };

  return (
    <UIContext.Provider value={{ isCartOpen, isWishlistOpen, toggleCart, toggleWishlist }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
