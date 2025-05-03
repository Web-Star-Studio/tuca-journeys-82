
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  showGlobalSpinner: (show: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  
  const showGlobalSpinner = (show: boolean) => {
    setIsLoading(show);
  };
  
  const value = {
    isSidebarOpen,
    toggleSidebar,
    isLoading,
    setIsLoading,
    showGlobalSpinner,
  };
  
  return (
    <UIContext.Provider value={value}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-tuca-ocean-blue"></div>
            <p className="text-sm font-medium">Carregando...</p>
          </div>
        </div>
      )}
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  
  return context;
};
