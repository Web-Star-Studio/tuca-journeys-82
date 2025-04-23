
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Partners = () => {
  // Sample partners data
  const partners = [
    {
      id: 1,
      name: "Pousada do Vale",
      image: "/lovable-uploads/1ed8fc0e-6277-4755-8c6e-88af20896e06.png",
      description: "Hospedagem sustentável com vista para o mar.",
      category: "Hospedagem"
    },
    {
      id: 2,
      name: "Restaurante Mirante",
      image: "/lovable-uploads/cd81e007-b687-426e-9059-a599e95ea9f8.png",
      description: "Gastronomia local com ingredientes orgânicos.",
      category: "Gastronomia"
    },
    {
      id: 3,
      name: "Mergulho Noronha",
      image: "/lovable-uploads/fa98842d-11c7-407f-80d4-096d976437d9.png",
      description: "Experiências de mergulho guiadas por especialistas.",
      category: "Atividades"
    },
    {
      id: 4,
      name: "Artesanato Ilha",
      image: "/lovable-uploads/7b44c0fe-f8a4-490f-bc6d-4dd7e025c278.png",
      description: "Produtos artesanais feitos por artistas locais.",
      category: "Comércio"
    },
    {
      id: 5,
      name: "Transporte Ecológico",
      image: "/lovable-uploads/534474aa-fd6f-45c3-9cee-b4fa0aa10f59.png",
      description: "Serviços de transporte com baixa emissão de carbono.",
      category: "Transporte"
    },
    {
      id: 6,
      name: "Projeto Tamar",
      image: "/lovable-uploads/3e37da64-d22a-4127-8447-69d6e3c61dc4.png",
      description: "Proteção e conservação das tartarugas marinhas.",
      category: "Conservação"
    }
  ];

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
