
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import { accommodations as staticAccommodations } from "@/data/accommodations";
import AccommodationDetailHeader from "@/components/accommodation/AccommodationDetailHeader";
import AccommodationDetailGallery from "@/components/accommodation/AccommodationDetailGallery";
import AccommodationDetailInfo from "@/components/accommodation/AccommodationDetailInfo";
import AccommodationDetailSidebar from "@/components/accommodation/AccommodationDetailSidebar";
import { accommodationService } from "@/services/accommodation-service";
import { Accommodation } from "@/types/database";
import { useToast } from "@/hooks/use-toast";

// Create a type that combines both the database Accommodation type and the static Accommodation type
interface AccommodationWithUIFields extends Accommodation {
  capacity?: number;
  perNight?: boolean;
  featured?: boolean;
  image?: string;
  price?: number;
}

const AccommodationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [accommodation, setAccommodation] = useState<AccommodationWithUIFields | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        if (!id) {
          throw new Error("No accommodation ID provided");
        }
        
        const accommodationId = parseInt(id, 10);
        
        if (isNaN(accommodationId)) {
          throw new Error("Invalid accommodation ID");
        }

        // Try to fetch from API
        try {
          const data = await accommodationService.getAccommodationById(accommodationId);
          setAccommodation({
            ...data,
            // Add UI fields for compatibility with the components
            capacity: data.max_guests,
            price: data.price_per_night,
            perNight: true,
            featured: false,
            image: data.image_url
          });
        } catch (apiError) {
          console.error("Error fetching from API:", apiError);
          
          // Fallback to static data
          const staticAccommodation = staticAccommodations.find(acc => acc.id === accommodationId);
          
          if (!staticAccommodation) {
            throw new Error("Accommodation not found");
          }
          
          // Map static data to database format + UI fields
          setAccommodation({
            id: staticAccommodation.id,
            title: staticAccommodation.title,
            description: staticAccommodation.description,
            short_description: staticAccommodation.description.substring(0, 100),
            price_per_night: staticAccommodation.price,
            image_url: staticAccommodation.image,
            location: staticAccommodation.location,
            address: staticAccommodation.location,
            bedrooms: staticAccommodation.bedrooms,
            bathrooms: staticAccommodation.bathrooms,
            max_guests: staticAccommodation.capacity,
            amenities: staticAccommodation.amenities,
            gallery_images: [staticAccommodation.image],
            rating: staticAccommodation.rating,
            type: "hotel",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            // UI fields
            capacity: staticAccommodation.capacity,
            price: staticAccommodation.price,
            perNight: true,
            featured: staticAccommodation.featured,
            image: staticAccommodation.image
          });
        }
      } catch (err) {
        console.error("Error fetching accommodation:", err);
        const error = err instanceof Error ? err : new Error("Failed to fetch accommodation");
        setError(error);
        
        toast({
          title: "Erro ao carregar hospedagem",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodation();
  }, [id, toast]);
  
  // If accommodation not found, show error
  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              Carregando...
            </h2>
            <div className="flex justify-center">
              <div className="animate-spin h-10 w-10 border-4 border-tuca-ocean-blue border-t-transparent rounded-full"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !accommodation) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              Hospedagem não encontrada
            </h2>
            <p className="text-gray-600 mb-8">
              A hospedagem solicitada não foi encontrada ou não está mais disponível.
            </p>
            <Button 
              onClick={() => navigate('/hospedagens')}
              className="bg-tuca-ocean-blue hover:bg-tuca-deep-blue text-white"
            >
              Ver outras hospedagens
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <AccommodationDetailHeader accommodation={accommodation} />
        <AccommodationDetailGallery accommodation={accommodation} />

        {/* Accommodation Details */}
        <div className="container mx-auto px-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AccommodationDetailInfo accommodation={accommodation} />
            <AccommodationDetailSidebar accommodation={accommodation} />
          </div>
        </div>

        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default AccommodationDetail;

