import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Partners = () => {
  // Sample partners data
  const partners = [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Nossos Parceiros
          </h1>
          <p className="text-gray-600 mb-10 max-w-3xl">
            Trabalhamos com parceiros locais comprometidos com a sustentabilidade e preservação 
            de Fernando de Noronha, garantindo experiências autênticas e responsáveis.
          </p>

          {partners.length === 0 ? (
            <div className="text-center text-gray-500 text-lg py-24">Nenhum parceiro cadastrado ainda.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner) => (
                <div 
                  key={partner.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={partner.image} 
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium bg-tuca-light-blue text-tuca-ocean-blue px-3 py-1 rounded-full">
                      {partner.category}
                    </span>
                    <h3 className="text-xl font-medium mt-3 mb-2">{partner.name}</h3>
                    <p className="text-gray-600 mb-4">{partner.description}</p>
                    <button className="text-tuca-ocean-blue hover:underline">
                      Ver mais detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-medium mb-4">Torne-se um Parceiro</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Você tem um negócio em Fernando de Noronha e gostaria de se tornar nosso parceiro?
              Entre em contato conosco para sabermos como podemos trabalhar juntos.
            </p>
            <button className="bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90 text-white px-6 py-2 rounded-lg">
              Entre em Contato
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Partners;
