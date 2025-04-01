
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Receipt, FileText, CheckCircle, Clock, AlertCircle, ArrowRight } from "lucide-react";
import PaymentMethodForm from "@/components/payment/PaymentMethodForm";
import PaymentHistory from "@/components/payment/PaymentHistory";

const Payments = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("methods");
  
  // Simulated pending payment for demonstration
  const pendingPayment = {
    id: "pay_1234567890",
    amount: 325.80,
    description: "Reserva: Pousada do Mar (3 noites)",
    dueDate: "2023-12-10",
    status: "pending"
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-medium mb-2">Pagamentos</h1>
          <p className="text-muted-foreground mb-8">Gerencie seus métodos de pagamento e visualize seu histórico</p>
          
          {!user ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Faça login para acessar seus pagamentos</CardTitle>
                <CardDescription>
                  É necessário estar logado para gerenciar seus pagamentos
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button onClick={() => navigate("/login")} className="bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90">
                  Fazer Login
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <>
              {pendingPayment && (
                <Card className="mb-8 border-l-4 border-l-yellow-500">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center">
                          <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                          Pagamento Pendente
                        </CardTitle>
                        <CardDescription>
                          Você tem um pagamento pendente que precisa ser finalizado
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Aguardando Pagamento
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Descrição</p>
                        <p className="font-medium">{pendingPayment.description}</p>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Valor</p>
                          <p className="font-medium">R$ {pendingPayment.amount.toFixed(2).replace('.', ',')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Vencimento</p>
                          <p className="font-medium">{pendingPayment.dueDate}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-tuca-coral hover:bg-tuca-coral/90">
                      Finalizar Pagamento
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList>
                    <TabsTrigger value="methods" className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Métodos de Pagamento
                    </TabsTrigger>
                    <TabsTrigger value="history" className="flex items-center">
                      <Receipt className="mr-2 h-4 w-4" />
                      Histórico
                    </TabsTrigger>
                    <TabsTrigger value="invoices" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Faturas
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="methods">
                  <PaymentMethodForm />
                </TabsContent>
                
                <TabsContent value="history">
                  <PaymentHistory />
                </TabsContent>
                
                <TabsContent value="invoices">
                  <Card>
                    <CardHeader>
                      <CardTitle>Faturas</CardTitle>
                      <CardDescription>
                        Visualize e baixe suas faturas de pagamentos
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <div className="grid grid-cols-4 p-4 text-sm font-medium">
                          <div>Data</div>
                          <div>Descrição</div>
                          <div>Valor</div>
                          <div>Status</div>
                        </div>
                        <Separator />
                        {[
                          { id: 1, date: "10/11/2023", description: "Reserva: Passeio de Barco", amount: 150.00, status: "paid" },
                          { id: 2, date: "25/10/2023", description: "Reserva: Pousada Villa Mar", amount: 780.50, status: "paid" },
                          { id: 3, date: "15/09/2023", description: "Compra: Produtos da Loja", amount: 125.90, status: "paid" }
                        ].map((invoice) => (
                          <div key={invoice.id} className="grid grid-cols-4 p-4 text-sm items-center">
                            <div>{invoice.date}</div>
                            <div>{invoice.description}</div>
                            <div>R$ {invoice.amount.toFixed(2).replace('.', ',')}</div>
                            <div>
                              {invoice.status === "paid" ? (
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    <CheckCircle className="mr-1 h-3 w-3" />
                                    Pago
                                  </Badge>
                                  <Button variant="outline" size="sm" className="h-7">
                                    Ver fatura
                                  </Button>
                                </div>
                              ) : (
                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                  <AlertCircle className="mr-1 h-3 w-3" />
                                  Pendente
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Payments;
