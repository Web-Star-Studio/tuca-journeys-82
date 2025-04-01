
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CreditCard, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentMethodForm = () => {
  const { toast } = useToast();
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  
  // Simulated saved cards
  const [savedCards, setSavedCards] = useState([
    { id: 1, last4: "4242", brand: "visa", expMonth: 12, expYear: 24 }
  ]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate adding a new card
    if (cardNumber && cardName && expiry && cvv) {
      // In a real app, this would send the data to a payment processor
      const newCard = {
        id: Date.now(),
        last4: cardNumber.slice(-4),
        brand: cardNumber.startsWith("4") ? "visa" : 
               cardNumber.startsWith("5") ? "mastercard" : "card",
        expMonth: parseInt(expiry.split("/")[0]),
        expYear: parseInt(expiry.split("/")[1])
      };
      
      setSavedCards([...savedCards, newCard]);
      
      // Reset form
      setCardNumber("");
      setCardName("");
      setExpiry("");
      setCvv("");
      
      toast({
        title: "Cartão adicionado",
        description: "Seu novo método de pagamento foi adicionado com sucesso.",
      });
    } else {
      toast({
        title: "Informações incompletas",
        description: "Por favor, preencha todos os campos do cartão.",
        variant: "destructive"
      });
    }
  };
  
  const handleDeleteCard = (cardId: number) => {
    setSavedCards(savedCards.filter(card => card.id !== cardId));
    toast({
      title: "Cartão removido",
      description: "O método de pagamento foi removido com sucesso.",
    });
  };
  
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };
  
  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Adicionar Novo Cartão</CardTitle>
            <CardDescription>
              Adicione um novo método de pagamento para suas reservas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Número do Cartão</Label>
              <Input 
                id="cardNumber" 
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
                placeholder="1234 5678 9012 3456"
              />
            </div>
            
            <div>
              <Label htmlFor="cardName">Nome no Cartão</Label>
              <Input 
                id="cardName" 
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Ex: JOSE M SILVA"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Validade</Label>
                <Input 
                  id="expiry" 
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  maxLength={5}
                  placeholder="MM/AA"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input 
                  id="cvv"
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                  maxLength={4}
                  placeholder="123"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Adicionar Cartão</Button>
          </CardFooter>
        </form>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Cartões Salvos</CardTitle>
          <CardDescription>
            Seus métodos de pagamento cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {savedCards.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              Nenhum cartão cadastrado
            </div>
          ) : (
            <div className="space-y-4">
              {savedCards.map((card) => (
                <div 
                  key={card.id} 
                  className="flex justify-between items-center p-4 border rounded-md"
                >
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-md mr-3">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium">
                        {card.brand === "visa" ? "Visa" : 
                         card.brand === "mastercard" ? "Mastercard" : 
                         "Cartão"} •••• {card.last4}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Expira em {card.expMonth}/{card.expYear}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethodForm;
