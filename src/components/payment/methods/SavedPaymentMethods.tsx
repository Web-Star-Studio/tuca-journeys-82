
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Trash2 } from "lucide-react";

interface PaymentCard {
  id: number;
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
}

interface SavedPaymentMethodsProps {
  savedCards: PaymentCard[];
  onDeleteCard: (cardId: number) => void;
}

const SavedPaymentMethods: React.FC<SavedPaymentMethodsProps> = ({ 
  savedCards,
  onDeleteCard
}) => {
  return (
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
                  onClick={() => onDeleteCard(card.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedPaymentMethods;
