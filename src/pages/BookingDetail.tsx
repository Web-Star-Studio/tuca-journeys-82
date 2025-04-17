
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, Calendar, MapPin, Users, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useBookings } from '@/hooks/use-bookings';

const BookingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { bookings, isLoading } = useBookings();
  
  const booking = bookings?.find(b => b.id.toString() === id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-20 py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4">Carregando detalhes da reserva...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-20 py-12">
          <div className="container mx-auto px-4 text-center">
            <AlertCircle className="h-16 w-16 mx-auto text-red-500 mb-4" />
            <h1 className="text-3xl font-bold mb-4">Reserva não encontrada</h1>
            <p className="mb-6 text-gray-600">
              A reserva que você está procurando não existe ou foi removida.
            </p>
            <Button asChild>
              <Link to="/dashboard">Voltar para o Dashboard</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/dashboard">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Voltar para o Dashboard
              </Link>
            </Button>
            
            <h1 className="text-3xl font-bold">Detalhes da Reserva</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Informações da Reserva</CardTitle>
                    <div className="flex space-x-2">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status === 'confirmed' ? 'Confirmada' : 
                         booking.status === 'pending' ? 'Pendente' : 'Cancelada'}
                      </Badge>
                      <Badge className={getPaymentStatusColor(booking.payment_status)}>
                        {booking.payment_status === 'paid' ? 'Pago' : 
                         booking.payment_status === 'pending' ? 'Pagamento Pendente' : 'Reembolsado'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {booking.tours?.title || booking.accommodations?.title || 'Reserva'}
                    </h3>
                    
                    {booking.tours && (
                      <p className="text-gray-600">{booking.tours.short_description}</p>
                    )}
                    
                    {booking.accommodations && (
                      <p className="text-gray-600">{booking.accommodations.short_description}</p>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start space-x-2">
                      <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Data de início</p>
                        <p className="text-gray-600">{formatDate(booking.start_date)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Data de término</p>
                        <p className="text-gray-600">{formatDate(booking.end_date)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Número de hóspedes</p>
                        <p className="text-gray-600">{booking.guests} pessoa{booking.guests !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Data da reserva</p>
                        <p className="text-gray-600">{formatDate(booking.created_at)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {booking.accommodations && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Detalhes da Acomodação</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Endereço</p>
                        <p className="text-gray-600">{booking.accommodations.address}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">Quartos</p>
                        <p className="text-gray-600">{booking.accommodations.bedrooms}</p>
                      </div>
                      <div>
                        <p className="font-medium">Banheiros</p>
                        <p className="text-gray-600">{booking.accommodations.bathrooms}</p>
                      </div>
                      <div>
                        <p className="font-medium">Capacidade máxima</p>
                        <p className="text-gray-600">{booking.accommodations.max_guests} pessoas</p>
                      </div>
                      <div>
                        <p className="font-medium">Tipo</p>
                        <p className="text-gray-600">{booking.accommodations.type}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Resumo da Reserva</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Valor total</span>
                    <span className="font-semibold">R$ {booking.total_price.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Button className="w-full" disabled={booking.status === 'cancelled'}>
                      {booking.status === 'pending' ? 'Confirmar Pagamento' : 
                       booking.status === 'cancelled' ? 'Reserva Cancelada' : 'Fazer uma nova reserva'}
                    </Button>
                    
                    {booking.status !== 'cancelled' && (
                      <Button variant="outline" className="w-full">
                        {booking.status === 'confirmed' ? 'Cancelar Reserva' : 'Modificar Reserva'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingDetail;
