
import React, { createContext, useContext, useState } from 'react';

export interface UIContextType {
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  showGlobalSpinner?: (show: boolean) => void;
  toggleCart: () => void;
  toggleWishlist: () => void;
}

const UIContext = createContext<UIContextType>({
  isCartOpen: false,
  isWishlistOpen: false,
  toggleCart: () => {},
  toggleWishlist: () => {},
  showGlobalSpinner: () => {}
});

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (!isCartOpen) setIsWishlistOpen(false);
  };

  const toggleWishlist = () => {
    setIsWishlistOpen(!isWishlistOpen);
    if (!isWishlistOpen) setIsCartOpen(false);
  };
  
  const showGlobalSpinner = (show: boolean) => {
    setIsLoading(show);
  };

  return (
    <UIContext.Provider value={{ 
      isCartOpen, 
      isWishlistOpen, 
      toggleCart, 
      toggleWishlist,
      showGlobalSpinner
    }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-tuca-ocean-blue"></div>
        </div>
      )}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
