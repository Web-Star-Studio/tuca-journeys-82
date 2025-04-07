import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/use-profile";
import { Bell, Calendar, TrendingUp, Activity } from "lucide-react";
import BookingsTable from "@/components/booking/BookingsTable";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { demoData } from "@/utils/demoDataGenerator";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  
  const userMetrics = {
    reservasAtivas: 2,
    pontosAcumulados: 750,
    diasAteProximaViagem: 15,
    statusPerfil: 70
  };
  
  const notifications = [
    { id: 1, title: "Reserva confirmada", message: "Seu passeio para o dia 22/08 foi confirmado", date: "Hoje", read: false },
    { id: 2, title: "Novo passeio disponível", message: "Conheça nosso novo passeio de caiaque", date: "Ontem", read: true },
    { id: 3, title: "Oferta especial", message: "Aproveite 15% OFF em hospedagens", date: "3 dias atrás", read: true }
  ];
  
  const recommendations = [
    { id: 1, title: "Passeio de Barco", image: "/tour-sunset.jpg", score: 98 },
    { id: 2, title: "Mergulho", image: "/tour-diving.jpg", score: 87 },
    { id: 3, title: "Trilha Ecológica", image: "/tour-trail.jpg", score: 85 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tuca-ocean-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-medium mb-2">Meu Painel</h1>
                {profile && (
                  <p className="text-gray-500">
                    Bem-vindo, {profile.name || "Visitante"}! Veja suas atividades e recomendações.
                  </p>
                )}
              </div>
              <div className="relative">
                <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Reservas Ativas</CardTitle>
                  <CardDescription>Seus agendamentos atuais</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{userMetrics.reservasAtivas}</span>
                    <Calendar className="h-8 w-8 text-tuca-ocean-blue opacity-80" />
                  </div>
                  <p className="text-sm mt-2 text-gray-500">
                    Próxima viagem em {userMetrics.diasAteProximaViagem} dias
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Pontos Acumulados</CardTitle>
                  <CardDescription>Programa de fidelidade</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{userMetrics.pontosAcumulados}</span>
                    <TrendingUp className="h-8 w-8 text-green-500 opacity-80" />
                  </div>
                  <p className="text-sm mt-2 text-gray-500">
                    Faltam 250 pontos para o próximo nível
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Perfil</CardTitle>
                  <CardDescription>Status de preenchimento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-bold">{userMetrics.statusPerfil}%</span>
                    <Activity className="h-8 w-8 text-amber-500 opacity-80" />
                  </div>
                  <Progress value={userMetrics.statusPerfil} className="h-2" />
                  <p className="text-sm mt-2 text-gray-500">
                    Complete seu perfil para melhores recomendações
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="reservas" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="reservas">Minhas Reservas</TabsTrigger>
                <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
                <TabsTrigger value="recomendacoes">Para Você</TabsTrigger>
              </TabsList>
              
              <TabsContent value="reservas" className="space-y-4">
                <BookingsTable />
              </TabsContent>
              
              <TabsContent value="notificacoes">
                <Card>
                  <CardContent className="p-4">
                    <ul className="divide-y">
                      {notifications.map(notification => (
                        <li key={notification.id} className={`py-4 ${!notification.read ? "bg-tuca-light-blue/10" : ""}`}>
                          <div className="flex flex-col space-y-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{notification.title}</h4>
                              <span className="text-xs text-gray-500">{notification.date}</span>
                            </div>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="recomendacoes">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendations.map(rec => (
                    <Card key={rec.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <img 
                        src={rec.image} 
                        alt={rec.title} 
                        className="h-40 w-full object-cover"
                      />
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{rec.title}</h3>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            {rec.score}% match
                          </span>
                        </div>
                        <button className="mt-3 w-full bg-tuca-ocean-blue text-white py-1.5 rounded-md text-sm hover:bg-tuca-ocean-blue/90 transition-colors">
                          Ver detalhes
                        </button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <section className="mb-8">
              <h2 className="text-xl font-medium mb-4">Análise de Uso</h2>
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Atividades recentes</h3>
                      <ul className="space-y-2">
                        {demoData.bookings.slice(0, 3).map((booking, i) => (
                          <li key={i} className="text-sm flex justify-between border-b pb-2">
                            <span>{booking.item_name}</span>
                            <span className="text-gray-500">
                              {new Date(booking.start_date).toLocaleDateString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Preferências</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Passeios</span>
                            <span>65%</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Hospedagens</span>
                            <span>25%</span>
                          </div>
                          <Progress value={25} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Pacotes</span>
                            <span>10%</span>
                          </div>
                          <Progress value={10} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
