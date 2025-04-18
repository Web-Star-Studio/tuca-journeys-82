import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Globe, 
  MapPin, 
  Tag, 
  Copy as CopyIcon,
  ExternalLink,
  Phone,
  Mail,
  Calendar,
  Check,
  Info
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Partner, DiscountCode } from "@/types/partner";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

// Sample partners data (same as in Partners.tsx) but aligned with our Partner type
const partners: Array<Partner & { 
  category?: string;
  name?: string;
  featured?: boolean;
  discount_codes?: DiscountCode[] 
}> = [
  {
    id: "1", // Changed from number to string to match Partner type
    user_id: "user-1",
    business_name: "Mergulho Noronha",
    business_type: "tour",
    name: "Mergulho Noronha", // Added for backward compatibility
    description: "Empresa especializada em mergulhos guiados e cursos de mergulho em Fernando de Noronha.",
    logo_url: "/tour-diving.jpg",
    website: "https://www.mergulhonoronha.com.br",
    category: "Aventura", // Added for UI compatibility
    featured: true, // Added for UI compatibility
    is_verified: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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
    id: "2", // Changed from number to string
    user_id: "user-2",
    business_name: "Pousada Maravilha",
    business_type: "accommodation",
    name: "Pousada Maravilha", // Added for backward compatibility
    description: "Pousada luxuosa com vista para o mar e serviço premium em Fernando de Noronha.",
    logo_url: "/accommodation-luxury.jpg",
    website: "https://www.pousadamaravilha.com.br",
    category: "Hospedagem", // Added for UI compatibility
    address: "Rua da Praia, 123, Fernando de Noronha",
    is_verified: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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
    id: "3",
    user_id: "user-3",
    business_name: "Restaurante Mar Azul",
    business_type: "restaurant",
    name: "Restaurante Mar Azul", // Added for backward compatibility
    description: "Restaurante especializado em frutos do mar frescos com vista panorâmica para o oceano.",
    logo_url: "/product-tshirt.jpg",
    website: "https://www.restaurantemarazul.com.br",
    category: "Gastronomia", // Added for UI compatibility
    address: "Av. Beira Mar, 500, Fernando de Noronha",
    featured: true, // Added for UI compatibility
    is_verified: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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
    id: "4",
    user_id: "user-4",
    business_name: "Buggy Noronha Tours",
    business_type: "vehicle",
    name: "Buggy Noronha Tours", // Added for backward compatibility
    description: "Aluguel de buggys e tours guiados por toda a ilha de Fernando de Noronha.",
    logo_url: "/tour-buggy.jpg",
    website: "https://www.buggynoronhatours.com.br",
    category: "Transporte", // Added for UI compatibility
    is_verified: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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
    id: "5",
    user_id: "user-5",
    business_name: "Eco Ilha Souvenirs",
    business_type: "product",
    name: "Eco Ilha Souvenirs", // Added for backward compatibility
    description: "Loja de lembranças e produtos sustentáveis produzidos por artesãos locais.",
    logo_url: "/product-hat.jpg",
    website: "https://www.ecoilhasouvenirs.com.br",
    category: "Compras", // Added for UI compatibility
    is_verified: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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
    id: "6",
    user_id: "user-6",
    business_name: "SPA Oceânico",
    business_type: "service",
    name: "SPA Oceânico", // Added for backward compatibility
    description: "Spa de luxo oferecendo tratamentos relaxantes e terapêuticos com vista para o oceano.",
    logo_url: "/tour-sunset.jpg",
    website: "https://www.spaoceaniconoronha.com.br",
    category: "Bem-estar", // Added for UI compatibility
    featured: true, // Added for UI compatibility
    is_verified: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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

// Extended detailed information for partners (in a real app, this would come from the database)
const partnerDetails: Record<string, any> = {
  "1": { // Changed from number to string to match Partner type
    longDescription: "Mergulho Noronha é a empresa líder em mergulho autônomo e livre em Fernando de Noronha, com mais de 15 anos de experiência. Oferecemos cursos para todos os níveis, desde iniciantes até mergulhadores avançados, sempre com equipamentos de última geração e instrutores certificados internacionalmente. Nossa equipe de biólogos marinhos garante uma experiência educativa, ajudando a identificar espécies e explicando sobre o ecossistema único de Noronha. Priorizamos a segurança e o respeito ao meio ambiente em todas as nossas operações.",
    gallery: ["/tour-diving.jpg", "/tour-underwater.jpg", "/tour-turtles.jpg"],
    contactInfo: {
      phone: "+55 81 99999-1000",
      email: "contato@mergulhonoronha.com.br",
      hours: "Segunda a Domingo, 7h às 18h"
    },
    highlights: [
      "Mergulho em 12 pontos diferentes ao redor da ilha",
      "Instrutores certificados PADI e SSI",
      "Equipamentos de última geração",
      "Cursos para todos os níveis",
      "Fotografia submarina profissional disponível"
    ]
  },
  "2": {
    longDescription: "A Pousada Maravilha é um refúgio de luxo em Fernando de Noronha, oferecendo acomodações exclusivas com vista panorâmica para o mar. Nossas suítes e bangalôs são espaçosos e decorados com elegância, combinando o conforto moderno com elementos naturais da ilha. O restaurante da pousada serve gastronomia contemporânea com ingredientes locais e o nosso spa oferece tratamentos relaxantes inspirados nas tradições brasileiras. Localizada próxima às principais praias, a Pousada Maravilha é o local perfeito para uma estadia inesquecível no paraíso.",
    gallery: ["/accommodation-luxury.jpg", "/hero-noronha-beach.jpg", "/hero-noronha-1.jpg"],
    contactInfo: {
      phone: "+55 81 99999-2000",
      email: "reservas@pousadamaravilha.com.br",
      hours: "Check-in: 14h / Check-out: 11h"
    },
    highlights: [
      "Suítes e bangalôs de luxo com vista para o mar",
      "Restaurante gourmet com culinária contemporânea",
      "Spa com tratamentos exclusivos",
      "Piscina de borda infinita",
      "Traslados gratuitos de/para o aeroporto"
    ]
  },
  "3": {
    longDescription: "O Restaurante Mar Azul é conhecido como o melhor restaurante de frutos do mar em Fernando de Noronha. Com uma localização privilegiada à beira-mar, oferecemos uma experiência gastronômica única com vista para o pôr do sol. Nossa cozinha é liderada pelo Chef Paulo Santos, que combina técnicas contemporâneas com sabores tradicionais, sempre utilizando peixes e frutos do mar frescos capturados diariamente. O cardápio é complementado por uma extensa carta de vinhos nacionais e importados. Nosso ambiente é elegante mas descontraído, perfeito para jantares românticos ou celebrações especiais.",
    gallery: ["/hero-noronha-2.jpg", "/hero-noronha-sunset.jpg", "/hero-noronha-aerial.jpg"],
    contactInfo: {
      phone: "+55 81 99999-3000",
      email: "reservas@restaurantemarazul.com.br",
      hours: "Terça a Domingo, 12h às 23h"
    },
    highlights: [
      "Vista panorâmica para o oceano e pôr do sol",
      "Frutos do mar frescos capturados diariamente",
      "Cardápio sazonal com ingredientes locais",
      "Extensa carta de vinhos",
      "Música ao vivo nos fins de semana"
    ]
  },
  "4": {
    longDescription: "Buggy Noronha Tours oferece a maneira mais conveniente e divertida de explorar Fernando de Noronha. Com nossa frota de buggys modernos e bem mantidos, você terá a liberdade de visitar todas as praias e mirantes no seu próprio ritmo. Além do aluguel de veículos, oferecemos tours guiados com motoristas locais experientes que conhecem todos os segredos da ilha. Nossos pacotes incluem mapas detalhados, dicas personalizadas e assistência 24 horas. Todos os nossos buggys são revisados diariamente para garantir sua segurança e conforto durante sua aventura em Noronha.",
    gallery: ["/tour-buggy.jpg", "/tour-trail.jpg", "/hero-noronha-1.jpg"],
    contactInfo: {
      phone: "+55 81 99999-4000",
      email: "reservas@buggynoronhatours.com.br",
      hours: "Segunda a Sábado, 8h às 18h"
    },
    highlights: [
      "Frota de buggys novos e bem mantidos",
      "Opções de aluguel por hora, dia ou semana",
      "Tours guiados com motoristas locais",
      "Assistência 24 horas na ilha",
      "Preços especiais para hospedagens parceiras"
    ]
  },
  "5": {
    longDescription: "A Eco Ilha Souvenirs é uma loja de presentes e lembranças com forte compromisso ambiental. Todos os nossos produtos são cuidadosamente selecionados ou produzidos para refletir a beleza natural e cultural de Fernando de Noronha, sempre com foco na sustentabilidade. Trabalhamos com artesãos locais para criar peças exclusivas como joias, esculturas, pinturas e têxteis que capturam a essência da ilha. Também oferecemos uma linha de produtos ecológicos como garrafas reutilizáveis, protetores solares naturais e roupas feitas com materiais sustentáveis. Uma porcentagem de todas as vendas é destinada a projetos de conservação ambiental em Noronha.",
    gallery: ["/product-hat.jpg", "/product-tshirt.jpg", "/product-mug.jpg"],
    contactInfo: {
      phone: "+55 81 99999-5000",
      email: "contato@ecoilhasouvenirs.com.br",
      hours: "Segunda a Sábado, 9h às 20h | Domingo, 10h às 16h"
    },
    highlights: [
      "Produtos sustentáveis e ecológicos",
      "Artesanato local exclusivo",
      "Souvenirs personalizados",
      "Contribuição para projetos ambientais",
      "Embalagens biodegradáveis"
    ]
  },
  "6": {
    longDescription: "O SPA Oceânico é um oásis de tranquilidade em Fernando de Noronha, projetado para rejuvenescer corpo e mente enquanto você contempla vistas deslumbrantes do oceano Atlântico. Nossos tratamentos exclusivos utilizam ingredientes naturais da ilha, como algas marinhas, areia vulcânica e óleos essenciais de plantas locais. Oferecemos uma ampla gama de serviços, desde massagens terapêuticas e tratamentos faciais até rituais de bem-estar inspirados em tradições antigas. Nossas instalações incluem saunas, hidromassagem com vista para o mar, sala de relaxamento e uma piscina de imersão natural. Nossos terapeutas são altamente qualificados e treinados nas melhores técnicas de spa do mundo.",
    gallery: ["/tour-sunset.jpg", "/hero-noronha-beach.jpg", "/hero-noronha-2.jpg"],
    contactInfo: {
      phone: "+55 81 99999-6000",
      email: "agendamento@spaoceaniconoronha.com.br",
      hours: "Todos os dias, 10h às 21h"
    },
    highlights: [
      "Tratamentos exclusivos com ingredientes naturais",
      "Vista panorâmica para o oceano",
      "Terapeutas certificados internacionalmente",
      "Sauna, hidromassagem e piscina natural",
      "Pacotes personalizados para casais e grupos"
    ]
  }
};

// Cast our partner to include additional UI properties
type ExtendedPartner = Partner & {
  category?: string;
  name?: string;
  featured?: boolean;
  discount_codes?: DiscountCode[];
};

const PartnerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the partner by ID
  const partner = partners.find(p => p.id === id) as ExtendedPartner | undefined;
  
  // If partner not found, show error
  if (!partner) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Parceiro não encontrado</h1>
          <p className="mb-6">O parceiro que você está procurando não existe.</p>
          <Button onClick={() => navigate("/parceiros")}>Voltar para Parceiros</Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Get additional details
  const details = partnerDetails[partner?.id as string];
  
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
  
  // Find other partners in the same category
  const relatedPartners = partners
    .filter(p => p.category === partner?.category && p.id !== partner?.id)
    .slice(0, 3);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link to="/parceiros" className="flex items-center text-tuca-ocean-blue hover:underline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para parceiros
            </Link>
          </div>
          
          {/* Partner Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="relative h-48 md:h-64 bg-gray-100">
              <img 
                src={partner?.logo_url} 
                alt={partner?.business_name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <Badge className="mb-2 bg-tuca-green">{partner?.category}</Badge>
                  <h1 className="text-3xl font-bold mb-1">{partner?.business_name}</h1>
                  {partner?.featured && (
                    <Badge className="bg-tuca-coral">Parceiro Destaque</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Partner Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* About */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Sobre o Parceiro</h2>
                <p className="text-gray-700 whitespace-pre-line mb-6">
                  {details.longDescription || partner?.description}
                </p>
                
                {/* Highlights */}
                {details.highlights && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Destaques</h3>
                    <ul className="space-y-2">
                      {details.highlights.map((highlight: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-tuca-green mr-2 flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Contact Information */}
                {details.contactInfo && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-3">Informações de Contato</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {details.contactInfo.phone && (
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-tuca-ocean-blue mr-2" />
                          <span>{details.contactInfo.phone}</span>
                        </div>
                      )}
                      
                      {details.contactInfo.email && (
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-tuca-ocean-blue mr-2" />
                          <a href={`mailto:${details.contactInfo.email}`} className="hover:underline">
                            {details.contactInfo.email}
                          </a>
                        </div>
                      )}
                      
                      {partner?.address && (
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-tuca-ocean-blue mr-2" />
                          <span>{partner?.address}</span>
                        </div>
                      )}
                      
                      {details.contactInfo.hours && (
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-tuca-ocean-blue mr-2" />
                          <span>{details.contactInfo.hours}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 flex items-center">
                      <Globe className="h-5 w-5 text-tuca-ocean-blue mr-2" />
                      <a 
                        href={partner?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-tuca-ocean-blue hover:underline flex items-center"
                      >
                        {partner?.website}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Gallery */}
              {details.gallery && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4">Galeria</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {details.gallery.map((image: string, index: number) => (
                      <div key={index} className="rounded-lg overflow-hidden h-48">
                        <img 
                          src={image} 
                          alt={`${partner?.business_name} - Imagem ${index + 1}`} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Related Partners */}
              {relatedPartners.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4">Parceiros Semelhantes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {relatedPartners.map((relPartner) => (
                      <div 
                        key={relPartner.id} 
                        className="border rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer"
                        onClick={() => navigate(`/parceiros/${relPartner.id}`)}
                      >
                        <div className="h-32">
                          <img 
                            src={relPartner.logo_url} 
                            alt={relPartner.business_name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-1">{relPartner.business_name}</h3>
                          <Badge variant="outline" className="text-xs">{relPartner.category}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div>
              {/* Discount Codes Card */}
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="flex items-center mb-4">
                  <Tag className="h-5 w-5 text-tuca-green mr-2" />
                  <h2 className="text-xl font-bold">Códigos de Desconto</h2>
                </div>
                
                <div className="space-y-4">
                  {partner?.discount_codes?.map((code) => {
                    const expired = isCodeExpired(code.expires_at);
                    
                    return (
                      <div 
                        key={code.id} 
                        className={`border rounded-lg p-4 ${expired ? 'bg-gray-50 border-gray-200' : 'border-tuca-green/40'}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <Badge className={`${expired ? 'bg-gray-400' : 'bg-tuca-green'} text-lg px-4 py-1`}>
                            {code.discount_percentage}% OFF
                          </Badge>
                          {!expired && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-500 hover:text-tuca-ocean-blue"
                              onClick={() => copyToClipboard(code.code)}
                            >
                              <CopyIcon className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="font-mono font-bold text-xl text-center mb-3 py-2 bg-gray-50 rounded border">
                          {code.code}
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-3">{code.description}</p>
                        
                        <div className="text-xs text-gray-500 space-y-1">
                          <div className="flex justify-between">
                            <span>Válido até:</span>
                            <span className="font-medium">{new Date(code.expires_at).toLocaleDateString('pt-BR')}</span>
                          </div>
                          
                          {code.minimum_purchase && (
                            <div className="flex justify-between">
                              <span>Compra mínima:</span>
                              <span className="font-medium">R$ {code.minimum_purchase.toFixed(2).replace('.', ',')}</span>
                            </div>
                          )}
                          
                          {code.max_uses && (
                            <div className="flex justify-between">
                              <span>Limite de usos:</span>
                              <span className="font-medium">{code.current_uses} de {code.max_uses}</span>
                            </div>
                          )}
                          
                          {expired && (
                            <div className="mt-2 bg-red-50 text-red-600 p-2 rounded text-center font-medium">
                              CÓDIGO EXPIRADO
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex gap-2">
                    <Info className="h-5 w-5 text-tuca-ocean-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-800">
                        Para usar os códigos de desconto, copie-os e apresente no estabelecimento parceiro ou utilize-os nos respectivos sites durante a finalização da compra.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    className="w-full bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90"
                    onClick={() => {
                      window.open(partner?.website, '_blank');
                    }}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Visitar Website
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PartnerDetail;
