
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ShippingFormProps {
  onSubmit: (e: React.FormEvent) => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
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
      
      <button 
        type="submit" 
        className="w-full py-6 bg-tuca-coral hover:bg-tuca-coral/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white"
      >
        <span className="flex items-center">
          Continuar para Pagamento
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-5 w-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </span>
      </button>
    </form>
  );
};

export default ShippingForm;
