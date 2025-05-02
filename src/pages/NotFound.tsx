
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-16 container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center my-12">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-6">Página não encontrada</h2>
        <p className="text-gray-600 max-w-md mb-8">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        <Button asChild>
          <Link to="/">Voltar para a página inicial</Link>
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
