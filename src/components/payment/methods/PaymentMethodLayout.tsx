
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import AddPaymentMethodForm from "./AddPaymentMethodForm";
import SavedPaymentMethods from "./SavedPaymentMethods";

interface PaymentCard {
  id: number;
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
}

const PaymentMethodLayout: React.FC = () => {
  const { toast } = useToast();
  
  // Simulated saved cards
  const [savedCards, setSavedCards] = useState<PaymentCard[]>([
    { id: 1, last4: "4242", brand: "visa", expMonth: 12, expYear: 24 }
  ]);
  
  const handleAddCard = (newCard: PaymentCard) => {
    setSavedCards([...savedCards, newCard]);
  };
  
  const handleDeleteCard = (cardId: number) => {
    setSavedCards(savedCards.filter(card => card.id !== cardId));
    toast({
      title: "Cartão removido",
      description: "O método de pagamento foi removido com sucesso.",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AddPaymentMethodForm onAddCard={handleAddCard} />
      <SavedPaymentMethods 
        savedCards={savedCards} 
        onDeleteCard={handleDeleteCard} 
      />
    </div>
  );
};

export default PaymentMethodLayout;
