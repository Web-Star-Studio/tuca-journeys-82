
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { CreditCard, BanknoteIcon, QrCode, ArrowRight, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample cart items (for demonstration)
const cartItems = [
  {
    id: 1,
    name: "Camiseta Eco Noronha",
    price: 89.90,
    quantity: 1,
    image: "/product-tshirt.jpg",
    variation: "M"
  },
  {
    id: 3,
    name: "Chapéu de Palha Tuca",
    price: 75.90,
    quantity: 2,
    image: "/product-hat.jpg",
    variation: "Único"
  }
];

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
                <div className="flex items-center mb-6">
                  <div className={`rounded-full h-8 w-8 flex items-center justify-center font-medium ${step >= 1 ? 'bg-tuca-ocean-blue text-white' : 'bg-gray-200'}`}>1</div>
                  <div className={`h-1 flex-grow mx-2 ${step >= 2 ? 'bg-tuca-ocean-blue' : 'bg-gray-200'}`}></div>
                  <div className={`rounded-full h-8 w-8 flex items-center justify-center font-medium ${step >= 2 ? 'bg-tuca-ocean-blue text-white' : 'bg-gray-200'}`}>2</div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  {step === 1 ? (
                    <>
                      <h2 className="text-xl font-medium mb-4">Informações de Entrega</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <Label htmlFor="firstName">Nome</Label>
                          <Input id="firstName" required className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Sobrenome</Label>
                          <Input id="lastName" required className="mt-1" />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" required className="mt-1" />
                      </div>
                      
                      <div className="mb-6">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" required className="mt-1" />
                      </div>
                      
                      <div className="mb-6">
                        <Label htmlFor="address">Endereço</Label>
                        <Input id="address" required className="mt-1" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <Label htmlFor="city">Cidade</Label>
                          <Input id="city" required className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="state">Estado</Label>
                          <Input id="state" required className="mt-1" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <Label htmlFor="zipcode">CEP</Label>
                          <Input id="zipcode" required className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="country">País</Label>
                          <Input id="country" defaultValue="Brasil" required className="mt-1" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-medium mb-4">Método de Pagamento</h2>
                      
                      <RadioGroup 
                        value={paymentMethod} 
                        onValueChange={setPaymentMethod}
                        className="mb-6"
                      >
                        <div className="flex items-center space-x-2 border rounded-md p-4 mb-3">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <Label htmlFor="credit-card" className="flex items-center cursor-pointer">
                            <CreditCard className="mr-2 h-5 w-5" />
                            Cartão de Crédito
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 border rounded-md p-4 mb-3">
                          <RadioGroupItem value="bank-slip" id="bank-slip" />
                          <Label htmlFor="bank-slip" className="flex items-center cursor-pointer">
                            <BanknoteIcon className="mr-2 h-5 w-5" />
                            Boleto Bancário
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 border rounded-md p-4">
                          <RadioGroupItem value="pix" id="pix" />
                          <Label htmlFor="pix" className="flex items-center cursor-pointer">
                            <QrCode className="mr-2 h-5 w-5" />
                            PIX
                          </Label>
                        </div>
                      </RadioGroup>
                      
                      {paymentMethod === "credit-card" && (
                        <>
                          <div className="mb-6">
                            <Label htmlFor="card-number">Número do Cartão</Label>
                            <Input id="card-number" placeholder="1234 5678 9012 3456" required className="mt-1" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                              <Label htmlFor="expiry">Data de Validade</Label>
                              <Input id="expiry" placeholder="MM/AA" required className="mt-1" />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" required className="mt-1" />
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <Label htmlFor="card-name">Nome no Cartão</Label>
                            <Input id="card-name" required className="mt-1" />
                          </div>
                        </>
                      )}
                      
                      {paymentMethod === "bank-slip" && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                          <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-yellow-800">Informação sobre Boleto</h3>
                              <p className="text-yellow-700">
                                Após concluir o pedido, você receberá o boleto para pagamento. 
                                Seu pedido será processado após a confirmação do pagamento.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {paymentMethod === "pix" && (
                        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6 text-center">
                          <QrCode className="h-32 w-32 text-green-600 mx-auto mb-4" />
                          <p className="text-green-700 mb-2">
                            Escaneie o código QR com seu aplicativo de banco para pagar via PIX
                          </p>
                          <p className="text-green-800 font-medium">
                            Chave PIX: tucanoronha@exemplo.com.br
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2 mb-6">
                        <Checkbox id="terms" required />
                        <Label htmlFor="terms" className="text-sm">
                          Concordo com os termos e condições e a política de privacidade
                        </Label>
                      </div>
                    </>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full py-6 bg-tuca-coral hover:bg-tuca-coral/90"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processando...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        {step === 1 ? 'Continuar para Pagamento' : 'Finalizar Pedido'}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-medium mb-4">Resumo do Pedido</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.variation}`} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        {item.variation && (
                          <p className="text-sm text-muted-foreground">
                            Variação: {item.variation}
                          </p>
                        )}
                        <div className="flex justify-between">
                          <span className="text-sm">
                            {item.quantity} x R$ {item.price.toFixed(2).replace('.', ',')}
                          </span>
                          <span className="font-medium">
                            R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span>R$ {shipping.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
