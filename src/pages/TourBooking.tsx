import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useCreateBooking } from "@/hooks/use-create-booking";
import { useTour } from "@/hooks/use-tours";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TourBookingLoader } from "@/components/tour/TourBookingLoader";
import { TourBookingForm } from "@/components/tour/TourBookingForm";
import { TourBookingInfo } from "@/components/tour/TourBookingInfo";

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
  
  const tour = fetchedTour || mockTourData;
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);
  
  if (isLoading) {
    return <TourBookingLoader />;
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
            <TourBookingInfo
              image={tour.image_url}
              title={tour.title}
              description={tour.description}
              duration={tour.duration}
              location={tour.location}
              price={tour.price}
            />

            <TourBookingForm
              date={date}
              setDate={setDate}
              guests={guests}
              setGuests={setGuests}
              maxParticipants={tour.max_participants}
              price={tour.price}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TourBooking;
