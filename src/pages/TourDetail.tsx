
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTour } from "@/hooks/use-tours";
import { adaptDBTourToComponentTour } from "@/utils/tourAdapter";
import { useToast } from "@/hooks/use-toast";
import { useWishlist } from "@/contexts/WishlistContext";
import { Heart, MapPin, Users, Clock, Calendar, CheckCircle, XCircle, Info } from "lucide-react";
import ContactCTA from "@/components/ContactCTA";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";

const TourDetail = () => {
  const { id } = useParams();
  const tourId = id ? parseInt(id) : undefined;
  const { data: dbTour, isLoading, error } = useTour(tourId);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  // If it's a 404 error, redirect to the 404 page
  useEffect(() => {
    if (error) {
      toast({
        title: "Passeio não encontrado",
        description: "O passeio que você está procurando não existe.",
        variant: "destructive",
      });
      navigate("/passeios");
    }
  }, [error, navigate, toast]);

  const handleBookClick = () => {
    if (!user) {
      toast({
        title: "Faça login",
        description: "Por favor, faça login para reservar este passeio.",
        variant: "destructive",
      });
      navigate("/login", { state: { from: `/passeios/${tourId}` } });
      return;
    }

    navigate(`/reservar/passeio/${tourId}`);
  };

  // Loading state
  if (isLoading || !dbTour) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <Skeleton className="h-96 w-full" />
              <div className="p-6">
                <Skeleton className="h-10 w-2/3 mb-4" />
                <Skeleton className="h-6 w-1/3 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                  <div>
                    <Skeleton className="h-64 w-full rounded-xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Convert to component format
  const tour = adaptDBTourToComponentTour(dbTour);
  const isWishlisted = isInWishlist(tour.id);
  
  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(tour.id);
      toast({
        title: "Removido dos favoritos",
        description: "O passeio foi removido da sua lista de favoritos.",
      });
    } else {
      addToWishlist({
        id: tour.id,
        type: 'tour',
        name: tour.title,
        image: tour.image
      });
      toast({
        title: "Adicionado aos favoritos",
        description: "O passeio foi adicionado à sua lista de favoritos.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Tour Title and Basic Info */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="relative aspect-[21/9] overflow-hidden">
              <img
                src={tour.image}
                alt={tour.title}
                className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'scale-100' : 'scale-105 blur-sm'}`}
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{tour.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-white">
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-5 w-5" />
                    <span>{tour.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-5 w-5" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-5 w-5" />
                    <span>Até {tour.maxParticipants} pessoas</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleWishlistToggle}
                className={`absolute top-4 right-4 rounded-full ${isWishlisted ? "bg-red-500 hover:bg-red-600" : "bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800"}`}
                size="icon"
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-white text-white" : ""}`} />
                <span className="sr-only">
                  {isWishlisted ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                </span>
              </Button>
            </div>
          </div>

          {/* Main Content and Booking */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Tabs for different content */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <div className="px-6 pt-6">
                    <TabsList className="w-full justify-start space-x-4 border-b-0">
                      <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                      <TabsTrigger value="includes">O que inclui</TabsTrigger>
                      <TabsTrigger value="schedule">Programação</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="overview" className="p-6 pt-4">
                    <h2 className="text-2xl font-semibold mb-4">Sobre este passeio</h2>
                    <p className="text-gray-700 whitespace-pre-line mb-6">{tour.description}</p>
                    
                    <h3 className="text-xl font-semibold mb-3">Detalhes</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <Clock className="text-tuca-ocean-blue h-5 w-5 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Duração</p>
                          <p className="font-medium">{tour.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <MapPin className="text-tuca-ocean-blue h-5 w-5 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Ponto de Encontro</p>
                          <p className="font-medium">{tour.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <Users className="text-tuca-ocean-blue h-5 w-5 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Participantes</p>
                          <p className="font-medium">{tour.minParticipants}-{tour.maxParticipants} pessoas</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <Calendar className="text-tuca-ocean-blue h-5 w-5 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Disponibilidade</p>
                          <p className="font-medium">Ver datas disponíveis na reserva</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="includes" className="p-6 pt-4 space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center">
                        <CheckCircle className="text-green-500 h-5 w-5 mr-2" />
                        <span>O que está incluído</span>
                      </h3>
                      <ul className="space-y-2 ml-8">
                        {tour.inclusions && tour.inclusions.map((item, index) => (
                          <li key={`includes-${index}`} className="text-gray-700 list-disc">{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center">
                        <XCircle className="text-red-500 h-5 w-5 mr-2" />
                        <span>O que não está incluído</span>
                      </h3>
                      <ul className="space-y-2 ml-8">
                        {tour.exclusions && tour.exclusions.map((item, index) => (
                          <li key={`excludes-${index}`} className="text-gray-700 list-disc">{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {tour.requirements && tour.requirements.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold mb-3 flex items-center">
                          <Info className="text-blue-500 h-5 w-5 mr-2" />
                          <span>O que você deve trazer</span>
                        </h3>
                        <ul className="space-y-2 ml-8">
                          {tour.requirements.map((item, index) => (
                            <li key={`requires-${index}`} className="text-gray-700 list-disc">{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="schedule" className="p-6 pt-4">
                    <h3 className="text-xl font-semibold mb-4">Programação</h3>
                    {tour.schedule && tour.schedule.length > 0 ? (
                      <ol className="relative border-l border-gray-200 ml-3 space-y-6">
                        {tour.schedule.map((item, index) => (
                          <li key={`schedule-${index}`} className="mb-6 ml-6">
                            <div className="absolute w-3 h-3 bg-tuca-ocean-blue rounded-full mt-1.5 -left-1.5 border border-white"></div>
                            <p className="text-gray-700">{item}</p>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-gray-600 italic">Programação detalhada não disponível.</p>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24 border border-gray-100">
                <div className="text-center mb-4">
                  <div className="text-gray-500 mb-1">A partir de</div>
                  <div className="text-3xl font-bold text-tuca-ocean-blue">
                    R$ {tour.price.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-gray-500 text-sm">por pessoa</div>
                </div>
                
                <div className="space-y-4 mt-6 mb-6">
                  <Button 
                    onClick={handleBookClick}
                    className="w-full bg-tuca-coral hover:bg-tuca-coral/90 text-white"
                  >
                    Reservar Agora
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleWishlistToggle}
                  >
                    {isWishlisted ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                  </Button>
                </div>
                
                <div className="text-center text-sm text-gray-500 mt-6">
                  <p>Precisa de ajuda com a reserva?</p>
                  <Button variant="link" className="text-tuca-ocean-blue p-0 h-auto" onClick={() => navigate('/contato')}>
                    Entre em contato conosco
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact CTA */}
        <div className="mt-16">
          <ContactCTA />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TourDetail;
