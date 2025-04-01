
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShoppingBag, Home } from "lucide-react";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const orderNumber = "TN" + Math.floor(100000 + Math.random() * 900000);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
          
          <h1 className="text-3xl font-medium mb-2">Pedido Confirmado!</h1>
          <p className="text-xl text-gray-600 mb-6">
            Obrigado por comprar na Tuca Noronha
          </p>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <p className="text-gray-600 mb-4">
              Seu pedido #{orderNumber} foi recebido e está sendo processado.
              Você receberá um e-mail com os detalhes da sua compra em breve.
            </p>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="font-medium mb-2">Informações do pedido:</h3>
              <p className="text-sm text-gray-600 mb-1"><strong>Número do pedido:</strong> {orderNumber}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Data:</strong> {new Date().toLocaleDateString()}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> customer@example.com</p>
              <p className="text-sm text-gray-600"><strong>Método de pagamento:</strong> Cartão de Crédito</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              className="flex items-center justify-center"
              onClick={() => navigate("/")}
            >
              <Home className="mr-2 h-5 w-5" />
              Voltar ao Início
            </Button>
            <Button 
              className="bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90 flex items-center justify-center"
              onClick={() => navigate("/loja")}
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Continuar Comprando
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
