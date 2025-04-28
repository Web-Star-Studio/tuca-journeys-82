
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldX, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="flex justify-center">
            <ShieldX className="h-24 w-24 text-red-500" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Acesso Negado
          </h1>
          <p className="mt-2 text-gray-600">
            Você não tem permissão para acessar esta página.
          </p>
          <div className="mt-6">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="mr-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <Button onClick={() => navigate('/dashboard')}>
              Ir para o Dashboard
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Unauthorized;
