
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AddPaymentMethodFormProps {
  onAddCard: (newCard: {
    id: number;
    last4: string;
    brand: string;
    expMonth: number;
    expYear: number;
  }) => void;
}

const AddPaymentMethodForm: React.FC<AddPaymentMethodFormProps> = ({ onAddCard }) => {
  const { toast } = useToast();
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all card fields are filled
    if (cardNumber && cardName && expiry && cvv) {
      // Simulate adding a new card
      const newCard = {
        id: Date.now(),
        last4: cardNumber.slice(-4),
        brand: cardNumber.startsWith("4") ? "visa" : 
               cardNumber.startsWith("5") ? "mastercard" : "card",
        expMonth: parseInt(expiry.split("/")[0]),
        expYear: parseInt(expiry.split("/")[1])
      };
      
      onAddCard(newCard);
      
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
  );
};

export default AddPaymentMethodForm;
