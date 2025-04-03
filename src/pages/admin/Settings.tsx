
import React, { useState } from "react";
import { Clock, Globe, Mail, Save } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Configurações salvas",
        description: "Suas configurações foram atualizadas com sucesso.",
      });
    }, 800);
  };

  return (
    <AdminLayout pageTitle="Configurações">
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-white border">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configure os detalhes básicos da sua plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Nome do Site</Label>
                  <Input id="site-name" defaultValue="Tucano Turismo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email de Administração</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@tucanoronha.com" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select defaultValue="pt-BR">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Selecione um idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select defaultValue="America/Sao_Paulo">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Selecione um fuso horário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">Brasília (GMT-3)</SelectItem>
                      <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo (GMT+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Recursos do Site</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reservations">Reservas Online</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir que usuários façam reservas diretamente no site.
                    </p>
                  </div>
                  <Switch id="reservations" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reviews">Avaliações de Usuários</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir que usuários avaliem passeios e hospedagens.
                    </p>
                  </div>
                  <Switch id="reviews" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance">Modo de Manutenção</Label>
                    <p className="text-sm text-muted-foreground">
                      Ativar modo de manutenção do site para todos os usuários.
                    </p>
                  </div>
                  <Switch id="maintenance" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" /> Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Contato e Redes Sociais</CardTitle>
              <CardDescription>
                Configure informações de contato e links para redes sociais.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email de Contato</Label>
                  <Input id="contact-email" type="email" defaultValue="contato@tucanoronha.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" type="tel" defaultValue="+55 81 99999-9999" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" defaultValue="https://instagram.com/tucanoronha" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input id="facebook" defaultValue="https://facebook.com/tucanoronha" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" /> Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>
                Gerencie como e quando as notificações são enviadas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-sm font-medium">Notificações por Email</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Novas Reservas</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba um email quando uma nova reserva for feita.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cancelamentos</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba um email quando uma reserva for cancelada.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Novos Usuários</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba um email quando um novo usuário se registrar.
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="text-sm font-medium">Notificações do Sistema</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações no Painel</Label>
                    <p className="text-sm text-muted-foreground">
                      Mostrar notificações no painel administrativo.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sons de Notificação</Label>
                    <p className="text-sm text-muted-foreground">
                      Tocar um som quando novas notificações chegarem.
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <Label htmlFor="summary-email">Email de Resumo</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="summary-email">
                    <SelectValue placeholder="Selecione a frequência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diário</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                    <SelectItem value="never">Nunca</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Receba um email resumindo a atividade do site.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" /> Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
              <CardDescription>
                Personalize a aparência do seu painel administrativo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tema</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-md p-3 cursor-pointer bg-white flex items-center justify-center hover:border-tuca-ocean-blue">
                    <span className="text-sm font-medium">Claro</span>
                  </div>
                  <div className="border rounded-md p-3 cursor-pointer bg-gray-900 text-white flex items-center justify-center hover:border-tuca-ocean-blue">
                    <span className="text-sm font-medium">Escuro</span>
                  </div>
                  <div className="border rounded-md p-3 cursor-pointer bg-gradient-to-r from-white to-gray-900 text-gray-800 flex items-center justify-center hover:border-tuca-ocean-blue">
                    <span className="text-sm font-medium">Sistema</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <Label>Densidade</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-md p-3 cursor-pointer bg-white flex items-center justify-center hover:border-tuca-ocean-blue">
                    <span className="text-sm font-medium">Compacto</span>
                  </div>
                  <div className="border rounded-md p-3 cursor-pointer bg-white flex items-center justify-center border-tuca-ocean-blue">
                    <span className="text-sm font-medium">Padrão</span>
                  </div>
                  <div className="border rounded-md p-3 cursor-pointer bg-white flex items-center justify-center hover:border-tuca-ocean-blue">
                    <span className="text-sm font-medium">Confortável</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <Label>Cor Principal</Label>
                <div className="grid grid-cols-6 gap-4">
                  <div className="h-10 rounded-md bg-blue-500 cursor-pointer border-2 border-white hover:border-gray-300"></div>
                  <div className="h-10 rounded-md bg-teal-500 cursor-pointer border-2 border-white hover:border-gray-300"></div>
                  <div className="h-10 rounded-md bg-tuca-ocean-blue cursor-pointer border-2 border-tuca-deep-blue"></div>
                  <div className="h-10 rounded-md bg-purple-500 cursor-pointer border-2 border-white hover:border-gray-300"></div>
                  <div className="h-10 rounded-md bg-orange-500 cursor-pointer border-2 border-white hover:border-gray-300"></div>
                  <div className="h-10 rounded-md bg-red-500 cursor-pointer border-2 border-white hover:border-gray-300"></div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" /> Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>
                Configure as opções de segurança da sua conta e do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <Input id="current-password" type="password" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Senha</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="text-sm font-medium">Autenticação de Dois Fatores</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autenticação de Dois Fatores</Label>
                    <p className="text-sm text-muted-foreground">
                      Ativar verificação em dois fatores para sua conta.
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="text-sm font-medium">Configurações de Sessão</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sessões Simultâneas</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir múltiplas sessões ativas ao mesmo tempo.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Tempo Limite de Sessão</Label>
                  <Select defaultValue="30">
                    <SelectTrigger id="session-timeout">
                      <SelectValue placeholder="Selecione o tempo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="240">4 horas</SelectItem>
                      <SelectItem value="1440">24 horas</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Tempo de inatividade antes de desconectar automaticamente.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" /> Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default Settings;
