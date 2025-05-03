
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";

const AccommodationBooking = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Reserva de Acomodação</h1>
          <p className="text-muted-foreground">
            Esta página está em desenvolvimento. Em breve você poderá reservar a acomodação {id} aqui.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccommodationBooking;
