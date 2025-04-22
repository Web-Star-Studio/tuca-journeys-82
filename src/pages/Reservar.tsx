
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarCheck } from 'lucide-react';
import { toast } from 'sonner';

const ReservarPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleReservaClick = () => {
    if (!user) {
      toast.error("Você precisa estar logado para fazer uma reserva");
      navigate('/login?returnTo=/reservar');
      return;
    }
    navigate('/passeios');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center space-y-8 mt-12">
          <h1 className="text-4xl font-bold text-gray-900">Reserve sua Experiência</h1>
          <p className="text-xl text-gray-600">
            Escolha entre nossas diversas opções de passeios, hospedagens e pacotes
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Button
              onClick={() => navigate('/passeios')}
              size="lg"
              className="w-full py-8"
            >
              <CalendarCheck className="mr-2" />
              Passeios
            </Button>

            <Button
              onClick={() => navigate('/hospedagens')}
              size="lg"
              className="w-full py-8"
            >
              <CalendarCheck className="mr-2" />
              Hospedagens
            </Button>

            <Button
              onClick={() => navigate('/pacotes')}
              size="lg"
              className="w-full py-8"
            >
              <CalendarCheck className="mr-2" />
              Pacotes
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReservarPage;
