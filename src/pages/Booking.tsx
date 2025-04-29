
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/booking/BookingForm";
import BookingsTable from "@/components/booking/BookingsTable";
import { getPackageById } from "@/data/packages";
import { useToast } from "@/hooks/use-toast";

const Booking = () => {
  const [activeTab, setActiveTab] = useState("new");
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [packageData, setPackageData] = useState(null);
  
  // Fetch package data when ID is available
  useEffect(() => {
    if (id) {
      const packageId = parseInt(id, 10);
      const foundPackage = getPackageById(packageId);
      
      if (foundPackage) {
        setPackageData(foundPackage);
      } else {
        toast({
          title: "Pacote não encontrado",
          description: "O pacote selecionado não foi encontrado.",
          variant: "destructive",
        });
        navigate("/pacotes");
      }
    }
  }, [id, navigate, toast]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-medium text-center mb-2">
              {packageData ? `Reservar ${packageData.title}` : "Reservas"}
            </h1>
            <p className="text-center text-muted-foreground mb-12">
              {packageData 
                ? "Complete o formulário abaixo para reservar este pacote" 
                : "Faça sua reserva ou acompanhe as reservas existentes"}
            </p>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="new">Nova Reserva</TabsTrigger>
                  <TabsTrigger value="existing">Minhas Reservas</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="new">
                <BookingForm selectedPackageId={packageData ? packageData.id : null} />
              </TabsContent>
              
              <TabsContent value="existing">
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
                  <h2 className="text-xl font-medium mb-6">Minhas Reservas</h2>
                  <BookingsTable />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
