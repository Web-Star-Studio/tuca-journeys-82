
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { activityService } from "@/services/activity-service";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock, MapPin, Star, Users, Shield } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const ActivityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: activity, isLoading } = useQuery({
    queryKey: ['activity', Number(id)],
    queryFn: () => activityService.getActivityById(Number(id)),
    enabled: !!id && !isNaN(Number(id))
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-tuca-ocean-blue"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Atividade não encontrada</h1>
            <p className="mb-6">A atividade que você está procurando não existe ou foi removida.</p>
            <Button asChild>
              <Link to="/atividades">Ver todas as atividades</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleBookNow = () => {
    navigate(`/reservar/atividade/${activity.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${activity.image_url})` }}>
          <div className="absolute inset-0 bg-black/50 flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <Link to="/atividades" className="inline-flex items-center text-white mb-4 hover:underline">
                <ArrowLeft className="mr-2" size={18} />
                Voltar para atividades
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{activity.title}</h1>
              <div className="flex flex-wrap gap-4 text-white">
                <div className="flex items-center">
                  <Badge className="bg-tuca-ocean-blue">{activity.category}</Badge>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-1" size={16} />
                  <span>{activity.meeting_point || "Local designado"}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1" size={16} />
                  <span>{activity.duration}</span>
                </div>
                <div className="flex items-center">
                  <Star className="mr-1 text-yellow-400" size={16} />
                  <span>{activity.rating}/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="description">Descrição</TabsTrigger>
                  <TabsTrigger value="includes">O que inclui</TabsTrigger>
                  <TabsTrigger value="details">Detalhes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="py-4">
                  <h2 className="text-2xl font-bold mb-4">Sobre esta atividade</h2>
                  <p className="text-gray-700">{activity.description}</p>
                  
                  {activity.schedule && activity.schedule.length > 0 && (
                    <>
                      <Separator className="my-6" />
                      <h3 className="text-xl font-bold mb-4">Cronograma</h3>
                      <ul className="space-y-3">
                        {activity.schedule.map((item, index) => (
                          <li key={index} className="flex items-start border-b pb-3 last:border-0">
                            <Clock className="h-5 w-5 text-tuca-ocean-blue mr-2 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </TabsContent>
                
                <TabsContent value="includes" className="py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Incluso:</h3>
                      <ul className="space-y-2">
                        {activity.includes && activity.includes.length > 0 ? 
                          activity.includes.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <div className="mr-2 rounded-full bg-green-100 p-1">
                                <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span>{item}</span>
                            </li>
                          )) : 
                          <li>Nenhum item incluso mencionado</li>
                        }
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4">Não incluso:</h3>
                      <ul className="space-y-2">
                        {activity.excludes && activity.excludes.length > 0 ? 
                          activity.excludes.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <div className="mr-2 rounded-full bg-red-100 p-1">
                                <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </div>
                              <span>{item}</span>
                            </li>
                          )) : 
                          <li>Nenhum item não incluso mencionado</li>
                        }
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="py-4">
                  <h3 className="text-xl font-bold mb-4">Detalhes da atividade</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Duração</p>
                        <p className="font-medium">{activity.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Capacidade</p>
                        <p className="font-medium">
                          {activity.min_participants} - {activity.max_participants} pessoas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Ponto de encontro</p>
                        <p className="font-medium">{activity.meeting_point || "A confirmar"}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Nível de dificuldade</p>
                        <p className="font-medium capitalize">{activity.difficulty || "Normal"}</p>
                      </div>
                    </div>
                  </div>
                  
                  {activity.notes && activity.notes.length > 0 && (
                    <>
                      <Separator className="my-6" />
                      <h3 className="text-xl font-bold mb-4">Dicas importantes</h3>
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-sm">
                        <ul className="list-disc pl-5 space-y-2">
                          {activity.notes.map((note, index) => (
                            <li key={index}>{note}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Booking Card */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-lg border">
                <h3 className="text-2xl font-bold text-tuca-ocean-blue mb-4">
                  {formatCurrency(activity.price)}
                  <span className="text-base font-normal text-gray-500"> / pessoa</span>
                </h3>
                
                <Separator className="my-4" />
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Categoria</span>
                    <span>{activity.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Duração</span>
                    <span>{activity.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Dificuldade</span>
                    <span className="capitalize">{activity.difficulty || "Normal"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Avaliação</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{activity.rating}/5</span>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleBookNow} className="w-full bg-tuca-ocean-blue hover:bg-tuca-deep-blue">
                  <Calendar className="mr-2" size={18} />
                  Reservar agora
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ActivityDetail;
