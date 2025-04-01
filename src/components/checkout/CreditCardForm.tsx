
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const CreditCardForm: React.FC = () => {
  return (
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
  );
};

export default CreditCardForm;
