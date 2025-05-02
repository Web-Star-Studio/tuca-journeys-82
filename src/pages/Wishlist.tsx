
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const Wishlist = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-16 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Meus Favoritos</h1>
        <p>Página de favoritos em construção</p>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
