
import React from 'react';
import { Loader2 } from 'lucide-react';

const GlobalLoading: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-tuca-ocean-blue" />
      <p className="mt-4 text-tuca-ocean-blue font-medium">Carregando...</p>
    </div>
  );
};

export default GlobalLoading;
