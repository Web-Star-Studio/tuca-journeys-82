
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a local navigation context instead of importing from AuthContext
export const NavigationContext = createContext<{
  navigateToLogin: () => void;
}>({
  navigateToLogin: () => {},
});

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const contextValue = {
    navigateToLogin,
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }

  return context;
};

// Add default export
export default NavigationProvider;
