
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import AccommodationDetailHeader from "@/components/accommodation/AccommodationDetailHeader";
import AccommodationDetailGallery from "@/components/accommodation/AccommodationDetailGallery";
import AccommodationDetailInfo from "@/components/accommodation/AccommodationDetailInfo";
import AccommodationDetailSidebar from "@/components/accommodation/AccommodationDetailSidebar";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const AccommodationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: accommodation, isLoading, error } = useQuery({
    queryKey: ['accommodation', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('accommodations')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
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
