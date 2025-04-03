
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, BookOpen, Calendar, MapPin, ShoppingBag, Heart } from "lucide-react";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-20 md:py-32 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-tuca-ocean-blue" />
            <h2 className="text-2xl font-bold mb-2">Carregando...</h2>
            <p className="text-lg text-gray-600">Verificando seu login</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Olá, {user?.user_metadata?.name || user?.email?.split('@')[0] || 'Viajante'}!</h1>
            <p className="text-gray-600 mt-2">Bem-vindo ao seu dashboard. Aqui você pode gerenciar suas atividades.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-tuca-ocean-blue" />
                  Minhas Reservas
                </CardTitle>
                <CardDescription>Gerencie suas reservas atuais</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">Você tem 0 reservas ativas.</p>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => navigate("/reservar")}
                >
                  Ver Reservas
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-tuca-ocean-blue" />
                  Passeios Reservados
                </CardTitle>
                <CardDescription>Seus passeios agendados</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">Nenhum passeio agendado no momento.</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/passeios")}
                >
                  Explorar Passeios
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-tuca-ocean-blue" />
                  Minhas Hospedagens
                </CardTitle>
                <CardDescription>Hospedagens reservadas</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">Nenhuma hospedagem reservada.</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/hospedagens")}
                >
                  Ver Hospedagens
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-tuca-ocean-blue" />
                  Lista de Desejos
                </CardTitle>
                <CardDescription>Itens salvos para depois</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">0 itens na sua lista de desejos.</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/lista-de-desejos")}
                >
                  Ver Lista de Desejos
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <ShoppingBag className="mr-2 h-5 w-5 text-tuca-ocean-blue" />
                  Compras Recentes
                </CardTitle>
                <CardDescription>Seus produtos adquiridos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">Nenhuma compra recente.</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/loja")}
                >
                  Visitar Loja
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-tuca-ocean-blue" />
                  Meu Perfil
                </CardTitle>
                <CardDescription>Gerencie suas informações</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">Atualize suas informações pessoais.</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/perfil")}
                >
                  Editar Perfil
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
