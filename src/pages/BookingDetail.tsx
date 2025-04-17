import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookings } from '@/hooks/use-bookings';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CalendarDays, Users, CreditCard, Clock } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import BookingDetailSkeleton from '@/components/booking/BookingDetailSkeleton';
import BookingDetailError from '@/components/booking/BookingDetailError';

/**
 * BookingDetail displays the details of a specific booking
 */
const BookingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { bookings, isLoading, error, cancelBooking, isCancelling } = useBookings();
  
  // Find the specific booking - compare id as string
  const booking = bookings?.find(b => b.id === id);
  
  // Handle cancellation request
  const handleCancelBooking = async () => {
    if (booking && window.confirm('Tem certeza que deseja cancelar esta reserva?')) {
      cancelBooking(booking.id);
      // Navigate back after success
      setTimeout(() => navigate('/dashboard'), 1500);
    }
  };
  
  if (isLoading) {
    return <BookingDetailSkeleton />;
  }
  
  if (error || !booking) {
    return (
      <BookingDetailError 
        error={error ? "Erro ao carregar reserva" : "Reserva não encontrada"} 
        message={error 
          ? "Ocorreu um erro ao carregar os detalhes desta reserva. Por favor, tente novamente mais tarde."
          : "A reserva que você está procurando não foi encontrada ou pode ter sido removida."
        }
        onBack={() => navigate('/dashboard')}
      />
    );
  }
  
  // Format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };
  
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get payment status color
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'refunded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 py-12">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para o dashboard
          </Button>
          
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle>Detalhes da Reserva #{booking.id}</CardTitle>
                <span className={`text-sm px-3 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                  {booking.status === 'confirmed' ? 'Confirmada' : 
                   booking.status === 'pending' ? 'Pendente' : 'Cancelada'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">{booking.item_name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <CalendarDays className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Data de início</p>
                        <p className="font-medium">{formatDate(booking.start_date)}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CalendarDays className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Data de término</p>
                        <p className="font-medium">{formatDate(booking.end_date)}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Hóspedes</p>
                        <p className="font-medium">{booking.guests} pessoas</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CreditCard className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Status do pagamento</p>
                        <p className={`inline-block px-2 py-1 rounded text-xs ${getPaymentStatusColor(booking.payment_status)}`}>
                          {booking.payment_status === 'paid' ? 'Pago' : 
                           booking.payment_status === 'pending' ? 'Pendente' : 'Reembolsado'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Resumo do pedido</h3>
                  <div className="border rounded-md">
                    <div className="border-b px-4 py-3 flex justify-between">
                      <span>Subtotal</span>
                      <span>R$ {(booking.total_price * 0.9).toFixed(2)}</span>
                    </div>
                    <div className="border-b px-4 py-3 flex justify-between">
                      <span>Taxas</span>
                      <span>R$ {(booking.total_price * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="px-4 py-3 flex justify-between font-medium">
                      <span>Total</span>
                      <span>R$ {booking.total_price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Informações adicionais</h3>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Reserva criada em</p>
                      <p className="font-medium">{formatDate(booking.created_at)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-end space-x-2">
              <Button variant="outline">Entrar em contato</Button>
              {booking.status === 'confirmed' && (
                <Button 
                  variant="destructive"
                  onClick={handleCancelBooking}
                  disabled={isCancelling}
                >
                  {isCancelling ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Cancelando...
                    </>
                  ) : 'Cancelar reserva'}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingDetail;
