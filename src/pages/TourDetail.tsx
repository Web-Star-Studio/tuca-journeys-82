import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tour } from "@/data/tours";
import { tourService } from "@/services/tour-service";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Star, Users, CalendarDays, CheckCircle, AlertTriangle, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SafeImage from "@/components/ui/safe-image";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const TourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [tour, setTour] = useState<Tour | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (!id) throw new Error("Tour ID is required");
        const tourData = await tourService.getTourById(parseInt(id));
        setTour(tourData);
      } catch (err: any) {
        setError(err.message || "Failed to load tour");
        console.error("Error fetching tour:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  const handleWishlistToggle = () => {
    if (!tour) return;
    
    if (isInWishlist(tour.id, 'tour')) {
      removeFromWishlist(tour.id, 'tour');
    } else {
      addToWishlist({
        id: tour.id,
        type: 'tour',
        title: tour.title,
        image: tour.image_url
      });
    }
  };

  const handleBookClick = () => {
    if (!user) {
      toast({
        title: "Faça login",
        description: "Por favor, faça login para reservar este passeio.",
        variant: "destructive",
      });
      navigate("/login", { state: { from: `/passeios/${tour?.id}` } });
      return;
    }

    if (tour) {
      navigate(`/reservar/passeio/${tour.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <p>Carregando detalhes do passeio...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <AlertTriangle className="mx-auto h-10 w-10 text-red-500 mb-4" />
          <p className="text-red-500">Erro ao carregar o passeio.</p>
          {error && <p className="text-sm">{error}</p>}
        </div>
        <Footer />
      </div>
    );
  }

  const isWishlisted = isInWishlist(tour.id, 'tour');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="md:order-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
                <SafeImage
                  src={tour.image_url}
                  alt={tour.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${imageLoaded ? 'hover:scale-110' : ''}`}
                  onLoadSuccess={() => setImageLoaded(true)}
                />
                <button 
                  onClick={handleWishlistToggle}
                  className="absolute top-4 left-4 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
                  aria-label={isWishlisted ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                  <Heart 
                    className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} 
                  />
                </button>
              </div>
            </div>

            {/* Details Section */}
            <div className="md:order-2">
              <h1 className="text-3xl font-semibold mb-4">{tour.title}</h1>
              <div className="flex items-center space-x-2 mb-3">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">{tour.rating}</span>
                <span className="text-gray-500">({tour.rating})</span>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Até {tour.max_participants} pessoas</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  <span>{tour.category}</span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">{tour.description}</p>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-xl font-medium text-tuca-ocean-blue">
                    R$ {tour.price.toLocaleString('pt-BR')}
                  </p>
                </div>
                <Button 
                  className="rounded-full bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90"
                  onClick={handleBookClick}
                >
                  Reservar Agora
                </Button>
              </div>
            </div>
          </div>

          {/* Highlights Section */}
          <div className="py-12">
            <h2 className="text-2xl font-semibold mb-6">Destaques do Passeio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tour.includes?.map((highlight, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TourDetail;
