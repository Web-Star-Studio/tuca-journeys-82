
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertCircle, CreditCard, BanknoteIcon, QrCode } from "lucide-react";
import CreditCardForm from "./CreditCardForm";

interface PaymentMethodsProps {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ 
  paymentMethod, 
  setPaymentMethod 
}) => {
  return (
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
      
      {paymentMethod === "credit-card" && <CreditCardForm />}
      
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
    </>
  );
};

export default PaymentMethods;
