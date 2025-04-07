
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Filter, ExternalLink, Copy, Globe, Tag, Copy as CopyIcon } from "lucide-react";
import { Partner } from "@/types/partner";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

// Sample partners data
const partners: Partner[] = [
  {
    id: 1,
    name: "Mergulho Noronha",
    description: "Empresa especializada em mergulhos guiados e cursos de mergulho em Fernando de Noronha.",
    logo_url: "/tour-diving.jpg",
    website: "https://www.mergulhonoronha.com.br",
    category: "Aventura",
    featured: true,
    discount_codes: [
      {
        id: 101,
        code: "TUCADIVE10",
        discount_percentage: 10,
        expires_at: "2024-12-31",
        minimum_purchase: 200,
        max_uses: 100,
        current_uses: 45,
        description: "10% de desconto em todos os pacotes de mergulho"
      },
      {
        id: 102,
        code: "NORONHADIVE20",
        discount_percentage: 20,
        expires_at: "2024-08-30",
        minimum_purchase: 500,
        max_uses: 50,
        current_uses: 12,
        description: "20% de desconto em cursos de mergulho para certificação"
      }
    ]
  },
  {
    id: 2,
    name: "Pousada Maravilha",
    description: "Pousada luxuosa com vista para o mar e serviço premium em Fernando de Noronha.",
    logo_url: "/accommodation-luxury.jpg",
    website: "https://www.pousadamaravilha.com.br",
    category: "Hospedagem",
    address: "Rua da Praia, 123, Fernando de Noronha",
    discount_codes: [
      {
        id: 201,
        code: "TUCAMARAVILHA15",
        discount_percentage: 15,
        expires_at: "2024-10-15",
        minimum_purchase: 1000,
        max_uses: 30,
        current_uses: 8,
        description: "15% de desconto em reservas de 3 ou mais diárias"
      }
    ]
  },
  {
    id: 3,
    name: "Restaurante Mar Azul",
    description: "Restaurante especializado em frutos do mar frescos com vista panorâmica para o oceano.",
    logo_url: "/product-tshirt.jpg",
    website: "https://www.restaurantemarazul.com.br",
    category: "Gastronomia",
    address: "Av. Beira Mar, 500, Fernando de Noronha",
    featured: true,
    discount_codes: [
      {
        id: 301,
        code: "TUCAFOOD10",
        discount_percentage: 10,
        expires_at: "2024-11-30",
        current_uses: 67,
        description: "10% de desconto no cardápio completo (exceto bebidas alcoólicas)"
      },
      {
        id: 302,
        code: "JANTARNORONHA",
        discount_percentage: 15,
        expires_at: "2024-09-15",
        minimum_purchase: 150,
        current_uses: 23,
        description: "15% de desconto para jantar ao pôr do sol (reservas das 17h às 19h)"
      }
    ]
  },
  {
    id: 4,
    name: "Buggy Noronha Tours",
    description: "Aluguel de buggys e tours guiados por toda a ilha de Fernando de Noronha.",
    logo_url: "/tour-buggy.jpg",
    website: "https://www.buggynoronhatours.com.br",
    category: "Transporte",
    discount_codes: [
      {
        id: 401,
        code: "TUCABUGGY2024",
        discount_percentage: 12,
        expires_at: "2024-12-31",
        current_uses: 56,
        description: "12% de desconto em aluguéis de buggy para 3 ou mais dias"
      }
    ]
  },
  {
    id: 5,
    name: "Eco Ilha Souvenirs",
    description: "Loja de lembranças e produtos sustentáveis produzidos por artesãos locais.",
    logo_url: "/product-hat.jpg",
    website: "https://www.ecoilhasouvenirs.com.br",
    category: "Compras",
    discount_codes: [
      {
        id: 501,
        code: "TUCAECO5",
        discount_percentage: 5,
        expires_at: "2025-01-10",
        current_uses: 89,
        description: "5% de desconto em qualquer compra"
      },
      {
        id: 502,
        code: "ARTESANATONORONHA",
        discount_percentage: 15,
        expires_at: "2024-08-20",
        minimum_purchase: 100,
        max_uses: 200,
        current_uses: 134,
        description: "15% de desconto em produtos artesanais"
      }
    ]
  },
  {
    id: 6,
    name: "SPA Oceânico",
    description: "Spa de luxo oferecendo tratamentos relaxantes e terapêuticos com vista para o oceano.",
    logo_url: "/tour-sunset.jpg",
    website: "https://www.spaoceaniconoronha.com.br",
    category: "Bem-estar",
    featured: true,
    discount_codes: [
      {
        id: 601,
        code: "TUCASPA20",
        discount_percentage: 20,
        expires_at: "2024-10-31",
        minimum_purchase: 300,
        max_uses: 75,
        current_uses: 28,
        description: "20% de desconto em pacotes de spa completos"
      }
    ]
  }
];

// Available partner categories
const categories = ["Todas", "Aventura", "Hospedagem", "Gastronomia", "Transporte", "Compras", "Bem-estar"];

const Partners = () => {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Filter partners by category and search query
  const filteredPartners = partners.filter(partner => {
    const matchesCategory = activeCategory === "Todas" || partner.category === activeCategory;
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         partner.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Function to copy discount code to clipboard
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      toast({
        title: "Código copiado!",
        description: `O código "${code}" foi copiado para a área de transferência.`,
      });
    });
  };

  // Function to check if a discount code is expired
  const isCodeExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative">
          <div 
            className="h-[40vh] bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-noronha-3.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Parceiros Tuca Noronha</h1>
                <p className="text-xl max-w-2xl mx-auto">
                  Descontos exclusivos e benefícios especiais com nossos parceiros
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Partners Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar parceiros..."
                  className="pl-10 pr-4 py-2 border rounded-full w-full md:w-80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === activeCategory ? "default" : "outline"}
                    className={
                      category === activeCategory
                        ? "rounded-full bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90 text-white"
                        : "rounded-full text-foreground hover:bg-background hover:text-tuca-ocean-blue"
                    }
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Partners Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Partner Logo */}
                    <div className="md:w-1/3 h-56 md:h-auto">
                      <img
                        src={partner.logo_url}
                        alt={partner.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Partner Info */}
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-xl">{partner.name}</h3>
                        {partner.featured && (
                          <Badge className="bg-tuca-coral">Parceiro Destaque</Badge>
                        )}
                      </div>
                      
                      <Badge variant="outline" className="mb-2">{partner.category}</Badge>
                      
                      <p className="text-gray-600 mb-4">{partner.description}</p>
                      
                      {partner.address && (
                        <p className="text-sm text-gray-500 mb-4">
                          <span className="font-medium">Endereço:</span> {partner.address}
                        </p>
                      )}
                      
                      <div className="flex items-center mb-6">
                        <Globe className="h-4 w-4 text-tuca-ocean-blue mr-2" />
                        <a 
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-tuca-ocean-blue hover:underline flex items-center"
                        >
                          Visitar website
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                      
                      {/* Discount Codes */}
                      <div>
                        <h4 className="font-medium flex items-center mb-3">
                          <Tag className="h-4 w-4 mr-2 text-tuca-green" />
                          Códigos de Desconto
                        </h4>
                        
                        <div className="space-y-3">
                          {partner.discount_codes.map((code) => {
                            const expired = isCodeExpired(code.expires_at);
                            
                            return (
                              <div 
                                key={code.id} 
                                className={`border rounded-lg p-3 ${expired ? 'bg-gray-50 border-gray-200' : 'border-tuca-green/30'}`}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center">
                                      <span className="font-mono font-bold text-lg text-tuca-ocean-blue">
                                        {code.code}
                                      </span>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-gray-500 hover:text-tuca-ocean-blue ml-2"
                                        onClick={() => copyToClipboard(code.code)}
                                        disabled={expired}
                                      >
                                        <CopyIcon className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    <p className="text-sm mt-1">{code.description}</p>
                                  </div>
                                  <Badge className={expired ? 'bg-gray-400' : 'bg-tuca-green'}>
                                    {code.discount_percentage}% OFF
                                  </Badge>
                                </div>
                                
                                <div className="mt-2 text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
                                  <span>
                                    Válido até: {new Date(code.expires_at).toLocaleDateString('pt-BR')}
                                  </span>
                                  {code.minimum_purchase && (
                                    <span>
                                      Compra mínima: R$ {code.minimum_purchase.toFixed(2).replace('.', ',')}
                                    </span>
                                  )}
                                  {expired && (
                                    <span className="text-red-500 font-medium">EXPIRADO</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <Button 
                        className="mt-6 bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90 text-white"
                        onClick={() => navigate(`/parceiros/${partner.id}`)}
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredPartners.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-lg font-medium text-gray-700">Nenhum parceiro encontrado</h3>
                  <p className="text-gray-500">
                    Tente ajustar seus filtros ou buscar por termos diferentes.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Partners;
