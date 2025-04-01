
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

// Sample payment data
const payments = [
  {
    id: "pay_9876543210",
    date: "2023-11-15",
    description: "Reserva: Pousada Mares do Sul (2 noites)",
    amount: 450.00,
    method: "Visa •••• 4242",
    status: "completed"
  },
  {
    id: "pay_8765432109",
    date: "2023-10-22",
    description: "Passeio: Mergulho em Sueste",
    amount: 180.00,
    method: "Mastercard •••• 5678",
    status: "completed"
  },
  {
    id: "pay_7654321098",
    date: "2023-10-05",
    description: "Loja: Camiseta Eco Noronha",
    amount: 89.90,
    method: "PIX",
    status: "completed"
  },
  {
    id: "pay_6543210987",
    date: "2023-09-18",
    description: "Pacote: Aventura em Noronha (4 dias)",
    amount: 1250.00,
    method: "Visa •••• 4242",
    status: "refunded"
  },
  {
    id: "pay_5432109876",
    date: "2023-08-30",
    description: "Reserva: Chalé Vista Mar (cancelada)",
    amount: 350.00,
    method: "Boleto Bancário",
    status: "failed"
  }
];

const PaymentHistory = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Concluído
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertCircle className="mr-1 h-3 w-3" />
            Pendente
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="mr-1 h-3 w-3" />
            Falhou
          </Badge>
        );
      case "refunded":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Reembolsado
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Pagamentos</CardTitle>
        <CardDescription>
          Veja o histórico completo dos seus pagamentos
        </CardDescription>
      </CardHeader>
      <CardContent>
        {payments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Nenhum pagamento encontrado no histórico
          </div>
        ) : (
          <div className="rounded-md border">
            <div className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm font-medium">
              <div>Data</div>
              <div className="md:col-span-2">Detalhes</div>
              <div>Valor</div>
              <div>Status</div>
            </div>
            <Separator />
            {payments.map((payment) => (
              <div key={payment.id} className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm items-center">
                <div>{formatDate(payment.date)}</div>
                <div className="md:col-span-2">
                  <div className="font-medium">{payment.description}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Método: {payment.method} | ID: {payment.id}
                  </div>
                </div>
                <div className="font-medium">
                  R$ {payment.amount.toFixed(2).replace('.', ',')}
                </div>
                <div>
                  {getStatusBadge(payment.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;
