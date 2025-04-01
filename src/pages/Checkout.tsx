
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentForm from "@/components/checkout/PaymentForm";
import OrderSummary from "@/components/checkout/OrderSummary";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cartItems } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate total price
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const shipping = 25.00;
  const total = subtotal + shipping;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      // Process payment (simulated)
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        toast({
          title: "Pedido Confirmado!",
          description: "Seu pedido foi processado com sucesso.",
        });
        navigate("/checkout/success");
      }, 2000);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-medium mb-8">Finalizar Compra</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main checkout form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <CheckoutSteps step={step} />
                
                {step === 1 ? (
                  <ShippingForm onSubmit={handleSubmit} />
                ) : (
                  <PaymentForm 
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    isProcessing={isProcessing}
                    onSubmit={handleSubmit}
                  />
                )}
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:col-span-1">
              <OrderSummary 
                cartItems={cartItems}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
