
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

interface BookingDetailErrorProps {
  error: string;
  message: string;
  onBack: () => void;
}

const BookingDetailError: React.FC<BookingDetailErrorProps> = ({ 
  error, 
  message, 
  onBack 
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 py-12">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para o dashboard
          </Button>
          
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-10 text-center">
              <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-3" />
              <h2 className="text-xl font-medium mb-2">{error}</h2>
              <p className="text-gray-500 mb-4">{message}</p>
              <Button onClick={onBack}>
                Voltar para minhas reservas
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingDetailError;
