
import React, { createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

type NavigationContextType = {
  previousPath: string | null;
  setPreviousPath: (path: string) => void;
  isMaintenanceModeActive: boolean;
  toggleMaintenanceMode: () => void;
};

const NavigationContext = createContext<NavigationContextType>({
  previousPath: null,
  setPreviousPath: () => {},
  isMaintenanceModeActive: false,
  toggleMaintenanceMode: () => {},
});

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  const [isMaintenanceModeActive, setIsMaintenanceModeActive] = useState(false);
  const location = useLocation();

  const toggleMaintenanceMode = () => {
    setIsMaintenanceModeActive(!isMaintenanceModeActive);
  };

  React.useEffect(() => {
    setPreviousPath(location.pathname);
  }, [location]);

  return (
    <NavigationContext.Provider
      value={{
        previousPath,
        setPreviousPath,
        isMaintenanceModeActive,
        toggleMaintenanceMode,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
