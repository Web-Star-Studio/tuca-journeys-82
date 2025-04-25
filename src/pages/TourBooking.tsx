import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { useCreateBooking } from "@/hooks/use-create-booking";
import { useTour } from "@/hooks/use-tours";

// Mock data for a tour in case the requested one is not found
const mockTourData = {
  id: 999,
  title: "Passeio de Barco ao Pôr do Sol",
  description: "Navegue pelas águas cristalinas e aprecie o espetacular pôr do sol em Fernando de Noronha. Este passeio inesquecível lhe proporcionará vistas deslumbrantes e momentos de pura tranquilidade no oceano.",
  image_url: "/lovable-uploads/29f781ec-249e-490d-b220-30ce02793db1.png",
  price: 350,
  duration: "3 horas",
  location: "Porto de Santo Antônio",
  max_participants: 12
};

const TourBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const createBooking = useCreateBooking();
  
  const tourId = id ? parseInt(id) : undefined;
  const { data: fetchedTour, isLoading, error } = useTour(tourId);
  
  // Use fetched tour if available, otherwise use mock data
  const tour = fetchedTour || mockTourData;
  
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);
  
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-12 pt-24">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!date) {
      toast({
        title: "Selecione uma data",
        description: "Por favor, selecione uma data para o passeio.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Faça login",
        description: "Por favor, faça login para continuar com a reserva.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    try {
      await createBooking.mutateAsync({
        user_id: user.id,
        tour_id: tour.id,
        start_date: date.toISOString(),
        end_date: date.toISOString(),
        guests: guests,
        total_price: tour.price * guests,
        status: "pending",
        payment_status: "pending"
      });

      toast({
        title: "Reserva realizada!",
        description: "Sua reserva foi realizada com sucesso.",
      });

      navigate("/reserva-confirmada", {
        state: { 
          booking: {
            id: crypto.randomUUID(),
            checkIn: date,
            checkOut: date,
            guests: guests,
            accommodationType: tour.title,
            name: user.user_metadata?.name || user.email,
            email: user.email,
            phone: user.user_metadata?.phone || "",
            bookingId: `RES${Math.floor(Math.random() * 10000)}`,
            notes: ""
          }
        }
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Erro ao fazer reserva",
        description: "Ocorreu um erro ao fazer sua reserva. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">{tour.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tour Info */}
            <div>
              <img 
                src={tour.image_url} 
                alt={tour.title} 
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-4">{tour.description}</p>
              <div className="space-y-2">
                <p><strong>Duração:</strong> {tour.duration}</p>
                <p><strong>Local:</strong> {tour.location}</p>
                <p><strong>Preço por pessoa:</strong> R$ {tour.price.toLocaleString('pt-BR')}</p>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Data do passeio</label>
                <div className="grid gap-2">
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                  </Button>
                </div>
                <div className="mt-2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    locale={ptBR}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Número de pessoas</label>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    disabled={guests <= 1}
                  >
                    -
                  </Button>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{guests} {guests === 1 ? 'pessoa' : 'pessoas'}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGuests(Math.min(tour.max_participants || 10, guests + 1))}
                    disabled={guests >= (tour.max_participants || 10)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-4">
                  <span>Subtotal</span>
                  <span>R$ {(tour.price * guests).toLocaleString('pt-BR')}</span>
                </div>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleSubmit}
                >
                  Confirmar reserva
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TourBooking;
