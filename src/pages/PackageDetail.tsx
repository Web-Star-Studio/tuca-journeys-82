
import React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const PackageDetail = () => {
  const { id } = useParams();
  
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-16 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Detalhes do Pacote</h1>
        <p>Detalhes do pacote ID: {id}</p>
      </div>
      <Footer />
    </div>
  );
};

export default PackageDetail;
