
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Configurações da Conta</h1>
          
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList>
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="account">Conta</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
              <TabsTrigger value="privacy">Privacidade</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input id="name" placeholder="Seu nome" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="seu.email@exemplo.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" placeholder="(00) 00000-0000" />
                    </div>
                    
                    <div className="pt-4">
                      <Button>Salvar Alterações</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Senha Atual</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nova Senha</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    
                    <div className="pt-4">
                      <Button>Atualizar Senha</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Emails de Promoções</p>
                        <p className="text-sm text-gray-500">Receba emails sobre ofertas e pacotes promocionais.</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Confirmações de Reserva</p>
                        <p className="text-sm text-gray-500">Receba emails de confirmação quando fizer uma reserva.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notificação de Viagem</p>
                        <p className="text-sm text-gray-500">Lembretes sobre suas próximas viagens.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="pt-4">
                      <Button>Salvar Preferências</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Perfil Público</p>
                        <p className="text-sm text-gray-500">Permitir que outros usuários vejam seu perfil.</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Histórico de Busca</p>
                        <p className="text-sm text-gray-500">Salvar seu histórico de busca para recomendações personalizadas.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Cookies de Marketing</p>
                        <p className="text-sm text-gray-500">Permitir cookies para marketing personalizado.</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="pt-4">
                      <Button variant="destructive">Excluir Minha Conta</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
