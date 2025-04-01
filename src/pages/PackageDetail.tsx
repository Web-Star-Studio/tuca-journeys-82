
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Users, Clock, Star, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, packages } from "@/data/packages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/components/ui/use-toast";

const PackageDetail = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToWishlist, wishlistItems, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const foundPackage = packages.find((pkg) => pkg.id === Number(id));
    setPackageData(foundPackage || null);
    setIsLoading(false);

    // Check if package is in wishlist
    if (foundPackage) {
      const inWishlist = wishlistItems.some(
        (item) => item.id === foundPackage.id && item.type === "package"
      );
      setIsInWishlist(inWishlist);
    }
  }, [id, wishlistItems]);

  const handleWishlistToggle = () => {
    if (!packageData) return;

    if (isInWishlist) {
      removeFromWishlist(packageData.id, "package");
      toast({
        title: "Removido da lista de desejos",
        description: `${packageData.title} foi removido da sua lista de desejos.`,
      });
    } else {
      addToWishlist({
        id: packageData.id,
        type: "package",
        name: packageData.title, // Changed from title to name to match WishlistItem interface
        image: packageData.image,
        price: packageData.price,
      });
      toast({
        title: "Adicionado à lista de desejos",
        description: `${packageData.title} foi adicionado à sua lista de desejos.`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Carregando...</div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen pt-20">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Pacote não encontrado</h1>
          <p className="mb-6">O pacote que você está procurando não existe.</p>
          <Link to="/pacotes">
            <Button className="bg-tuca-ocean-blue">Ver todos os pacotes</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <div 
          className="relative h-[60vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${packageData.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60">
            <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12">
              <div className="max-w-3xl">
                <Link 
                  to="/pacotes" 
                  className="inline-flex items-center text-white mb-4 hover:text-tuca-coral transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar para pacotes
                </Link>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                  {packageData.title}
                </h1>
                <p className="text-xl text-white/90 mb-6">
                  {packageData.description}
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center">
                    <Calendar className="h-4 w-4 text-white mr-2" />
                    <span className="text-white text-sm font-medium">{packageData.days} dias</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center">
                    <Users className="h-4 w-4 text-white mr-2" />
                    <span className="text-white text-sm font-medium">
                      {packageData.persons} {packageData.persons === 1 ? 'pessoa' : 'pessoas'}
                    </span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-2" />
                    <span className="text-white text-sm font-medium">{packageData.rating}/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="itinerary">Roteiro</TabsTrigger>
                    <TabsTrigger value="includes">Inclui/Não Inclui</TabsTrigger>
                    <TabsTrigger value="dates">Datas</TabsTrigger>
                  </TabsList>
                  
                  {/* Overview Tab */}
                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-serif font-medium mb-4">Destaques do Pacote</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {packageData.highlights?.map((highlight, index) => (
                            <div key={index} className="flex items-start">
                              <div className="bg-tuca-ocean-blue/10 p-2 rounded-full mr-3">
                                <Check className="h-4 w-4 text-tuca-ocean-blue" />
                              </div>
                              <p className="text-gray-700">{highlight}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />

                      <div>
                        <h2 className="text-2xl font-serif font-medium mb-4">Sobre este Pacote</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          Descubra o paraíso de Fernando de Noronha com este pacote exclusivo, especialmente criado para proporcionar uma experiência inesquecível. Você terá a oportunidade de conhecer as praias mais bonitas do arquipélago, fazer trilhas com vistas deslumbrantes e mergulhar em águas cristalinas.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          Nosso pacote foi cuidadosamente elaborado para garantir conforto e praticidade, permitindo que você aproveite ao máximo sua estadia neste santuário ecológico. Com acomodação em pousadas charmosas e passeios guiados por profissionais experientes, sua viagem será completa e sem preocupações.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Itinerary Tab */}
                  <TabsContent value="itinerary" className="mt-6">
                    <h2 className="text-2xl font-serif font-medium mb-6">Roteiro Detalhado</h2>
                    <div className="space-y-8">
                      {packageData.itinerary?.map((day, index) => (
                        <div key={index} className="border-l-2 border-tuca-ocean-blue pl-6 pb-6 relative">
                          <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-tuca-ocean-blue flex items-center justify-center text-white text-sm">
                            {day.day}
                          </div>
                          <h3 className="text-xl font-medium mb-2">{day.title}</h3>
                          <p className="text-gray-700">{day.description}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  {/* Includes Tab */}
                  <TabsContent value="includes" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h2 className="text-2xl font-serif font-medium mb-4 flex items-center">
                          <Check className="h-5 w-5 text-tuca-ocean-blue mr-2" />
                          O Pacote Inclui
                        </h2>
                        <ul className="space-y-3">
                          {packageData.includes?.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-4 w-4 text-tuca-ocean-blue mr-3 mt-1" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h2 className="text-2xl font-serif font-medium mb-4 flex items-center">
                          <X className="h-5 w-5 text-red-500 mr-2" />
                          O Pacote Não Inclui
                        </h2>
                        <ul className="space-y-3">
                          {packageData.excludes?.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <X className="h-4 w-4 text-red-500 mr-3 mt-1" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Dates Tab */}
                  <TabsContent value="dates" className="mt-6">
                    <h2 className="text-2xl font-serif font-medium mb-6">Próximas Datas Disponíveis</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {packageData.dates?.map((date, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:border-tuca-ocean-blue transition-colors cursor-pointer group">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Calendar className="h-5 w-5 text-gray-500 group-hover:text-tuca-ocean-blue transition-colors mr-2" />
                              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{date}</span>
                            </div>
                            <div className="text-tuca-ocean-blue opacity-0 group-hover:opacity-100 transition-opacity">
                              Selecionar
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-white rounded-lg shadow-md p-6 border border-gray-100">
                  <div className="text-center mb-4">
                    <div className="text-gray-500 mb-1">A partir de</div>
                    <div className="text-3xl font-bold text-tuca-ocean-blue">
                      R$ {packageData.price.toLocaleString('pt-BR')}
                    </div>
                    <div className="text-gray-500 text-sm mb-4">por pessoa</div>
                    <Separator className="my-4" />
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Duração:</span>
                      <span className="font-medium">{packageData.days} dias</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Pessoas:</span>
                      <span className="font-medium">{packageData.persons}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Avaliação:</span>
                      <span className="font-medium flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1 inline" />
                        {packageData.rating}/5
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Link to="/reservar">
                      <Button className="w-full bg-tuca-coral hover:bg-tuca-coral/90 text-white">
                        Reservar Agora
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleWishlistToggle}
                    >
                      {isInWishlist ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                    </Button>
                  </div>
                  
                  <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Precisa de ajuda para decidir?</p>
                    <Link to="/contato" className="text-tuca-ocean-blue hover:underline font-medium">
                      Entre em contato conosco
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default PackageDetail;
