
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import { tours } from "@/data/tours";
import TourDetailHero from "@/components/tour/TourDetailHero";
import TourDetailInfo from "@/components/tour/TourDetailInfo";
import TourDetailSchedule from "@/components/tour/TourDetailSchedule";
import TourDetailReservation from "@/components/tour/TourDetailReservation";
import TourDetailAccordion from "@/components/tour/TourDetailAccordion";

const TourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const tour = tours.find((tour) => tour.id === Number(id));

  if (!tour) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12 mt-16">
          <div className="text-center py-16">
            <h1 className="text-3xl font-serif font-bold mb-4">Passeio não encontrado</h1>
            <p className="text-gray-600 mb-8">O passeio que você está procurando não existe ou foi removido.</p>
            <Button 
              onClick={() => navigate("/passeios")}
              className="bg-tuca-ocean-blue hover:bg-tuca-deep-blue text-white"
            >
              Voltar para Passeios
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mt-16">
        <TourDetailHero tour={tour} />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tour info */}
            <div className="lg:col-span-2 space-y-8">
              <TourDetailInfo tour={tour} />
              
              <Separator />
              
              <TourDetailSchedule tour={tour} />
              
              <Separator />
              
              <TourDetailAccordion />
            </div>

            {/* Booking form */}
            <div className="lg:col-span-1">
              <TourDetailReservation tour={tour} />
            </div>
          </div>
        </div>

        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default TourDetail;
