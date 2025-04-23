
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/booking/BookingForm";
import BookingsTable from "@/components/booking/BookingsTable";

const Booking = () => {
  const [activeTab, setActiveTab] = useState("new");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-medium text-center mb-2">
              Reservas
            </h1>
            <p className="text-center text-muted-foreground mb-12">
              Faça sua reserva ou acompanhe as reservas existentes
            </p>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="new">Nova Reserva</TabsTrigger>
                  <TabsTrigger value="existing">Minhas Reservas</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="new">
                <BookingForm />
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
