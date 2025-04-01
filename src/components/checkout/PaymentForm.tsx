
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PaymentMethods from "./PaymentMethods";

interface PaymentFormProps {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
  isProcessing: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentMethod,
  setPaymentMethod,
  isProcessing,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit}>
      <PaymentMethods 
        paymentMethod={paymentMethod} 
        setPaymentMethod={setPaymentMethod} 
      />
      
      <div className="flex items-center space-x-2 mb-6">
        <Checkbox id="terms" required />
        <Label htmlFor="terms" className="text-sm">
          Concordo com os termos e condições e a política de privacidade
        </Label>
      </div>
      
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
            Finalizar Pedido
            <ArrowRight className="ml-2 h-5 w-5" />
          </span>
        )}
      </Button>
    </form>
  );
};

export default PaymentForm;
