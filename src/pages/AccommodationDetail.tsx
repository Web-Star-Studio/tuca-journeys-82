
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import { accommodations } from "@/data/accommodations";
import AccommodationDetailHeader from "@/components/accommodation/AccommodationDetailHeader";
import AccommodationDetailGallery from "@/components/accommodation/AccommodationDetailGallery";
import AccommodationDetailInfo from "@/components/accommodation/AccommodationDetailInfo";
import AccommodationDetailSidebar from "@/components/accommodation/AccommodationDetailSidebar";

const AccommodationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the accommodation by ID
  const accommodation = accommodations.find(
    (acc) => acc.id === Number(id)
  );

  // If accommodation not found, show error
  if (!accommodation) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              Hospedagem não encontrada
            </h2>
            <p className="text-gray-600 mb-8">
              A hospedagem solicitada não foi encontrada ou não está mais disponível.
            </p>
            <Button 
              onClick={() => navigate('/hospedagens')}
              className="bg-tuca-ocean-blue hover:bg-tuca-deep-blue text-white"
            >
              Ver outras hospedagens
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
      <main>
        <AccommodationDetailHeader accommodation={accommodation} />
        <AccommodationDetailGallery accommodation={accommodation} />

        {/* Accommodation Details */}
        <div className="container mx-auto px-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AccommodationDetailInfo accommodation={accommodation} />
            <AccommodationDetailSidebar accommodation={accommodation} />
          </div>
        </div>

        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default AccommodationDetail;
