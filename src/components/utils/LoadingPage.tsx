
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-tuca-ocean-blue mx-auto mb-4" />
        <p className="text-gray-600">Carregando...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
