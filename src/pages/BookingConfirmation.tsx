
import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Calendar, Phone, Mail, Users, Home } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BookingConfirmation = () => {
  const location = useLocation();
  const booking = location.state?.booking;
  
  // If no booking data, redirect to booking page
  if (!booking) {
    return <Navigate to="/reservar" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-medium text-center mb-4">
              Reserva Recebida!
            </h1>
            
            <p className="text-center text-muted-foreground mb-10">
              Obrigado por escolher a Tuca Noronha para sua viagem a Fernando de Noronha.
              Entraremos em contato em breve para confirmar sua reserva.
            </p>
            
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-10">
              <h2 className="text-xl font-medium mb-6 pb-4 border-b">
                Detalhes da Reserva
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <Calendar className="w-5 h-5 text-tuca-ocean-blue" />
                    </div>
                    <div>
                      <p className="font-medium">Check-in / Check-out</p>
                      <p className="text-muted-foreground">
                        {booking.checkIn && format(new Date(booking.checkIn), "dd MMM yyyy", { locale: ptBR })} — {" "}
                        {booking.checkOut && format(new Date(booking.checkOut), "dd MMM yyyy", { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <Users className="w-5 h-5 text-tuca-ocean-blue" />
                    </div>
                    <div>
                      <p className="font-medium">Hóspedes</p>
                      <p className="text-muted-foreground">
                        {booking.guests === "7+" ? "7+ pessoas" : `${booking.guests} ${parseInt(booking.guests) === 1 ? "pessoa" : "pessoas"}`}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <Home className="w-5 h-5 text-tuca-ocean-blue" />
                    </div>
                    <div>
                      <p className="font-medium">Tipo de Reserva</p>
                      <p className="text-muted-foreground capitalize">
                        {booking.accommodationType}
                      </p>
                      {booking.packageDetails && (
                        <p className="text-tuca-ocean-blue font-medium mt-1">
                          {booking.packageDetails.title}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {booking.notes && (
                    <div className="bg-gray-50 p-4 rounded-lg mt-2">
                      <p className="font-medium mb-1">Observações:</p>
                      <p className="text-muted-foreground">{booking.notes}</p>
                    </div>
                  )}
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-4">Informações de Contato</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{booking.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{booking.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{booking.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg flex gap-3">
                  <div className="flex-shrink-0 pt-1">
                    <div className="bg-blue-100 p-1 rounded-md">
                      <Check className="w-4 h-4 text-blue-700" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Número da reserva: {booking.bookingId}</p>
                    <p className="text-blue-700 text-sm">
                      Enviamos um email com os detalhes da sua reserva. Por favor, verifique sua caixa de entrada.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="outline">Voltar para Home</Button>
              </Link>
              {booking.packageDetails ? (
                <Link to="/pacotes">
                  <Button>Ver Mais Pacotes</Button>
                </Link>
              ) : (
                <Link to="/hospedagens">
                  <Button>Ver Hospedagens</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
