
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const UserProfile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>
          <p className="text-muted-foreground">
            Esta página está em desenvolvimento. Em breve você poderá gerenciar seu perfil aqui.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;
