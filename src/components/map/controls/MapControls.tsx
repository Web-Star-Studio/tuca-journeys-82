
import React from 'react';

interface MapControlsProps {
  children: React.ReactNode;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const MapControls = ({ children, position }: MapControlsProps) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  return (
    <div className={`absolute z-30 ${getPositionClasses()} flex flex-col gap-2`}>
      {children}
    </div>
  );
};

export default MapControls;
