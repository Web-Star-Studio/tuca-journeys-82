
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { activityService } from "@/services/activity-service";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Clock, MapPin, MinusCircle, PlusCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/formatters";
import { useAuth } from "@/contexts/AuthContext";

const ActivityBooking = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [guestCount, setGuestCount] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [contactName, setContactName] = useState(user?.user_metadata?.name || "");
  const [contactEmail, setContactEmail] = useState(user?.email || "");
  const [contactPhone, setContactPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { data: activity, isLoading } = useQuery({
    queryKey: ['activity', Number(id)],
    queryFn: () => activityService.getActivityById(Number(id)),
    enabled: !!id && !isNaN(Number(id))
  });

  if (isLoading || !activity) {
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

  const increaseGuests = () => {
    if (guestCount < activity.max_participants) {
      setGuestCount(prev => prev + 1);
    }
  };

  const decreaseGuests = () => {
    if (guestCount > 1) {
      setGuestCount(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) {
      toast.error("Por favor, selecione uma data para a atividade.");
      return;
    }

    if (!user) {
      toast.error("Você precisa estar logado para fazer uma reserva.");
      navigate("/login", { state: { from: `/reservar/atividade/${id}` } });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate booking process
    setTimeout(() => {
      toast.success("Reserva realizada com sucesso!");
      setIsSubmitting(false);
      navigate("/perfil");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Reservar Atividade</h1>
            <p className="text-gray-600">Preencha os dados abaixo para reservar sua atividade</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulário de Reserva */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">Detalhes da reserva</h2>
                
                <form onSubmit={handleSubmit}>
                  {/* Data e Participantes */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Escolha a data e número de participantes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Data da atividade</label>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : "Selecione uma data"}
                        </Button>
                        <div className="mt-2">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md border"
                            locale={ptBR}
                            disabled={(date) => date < new Date()}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Número de participantes</label>
                        <div className="flex items-center justify-between border rounded-md p-3">
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm"
                            onClick={decreaseGuests}
                            disabled={guestCount <= 1}
                          >
                            <MinusCircle className="h-5 w-5" />
                          </Button>
                          <div className="flex items-center">
                            <Users className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="text-lg font-medium">{guestCount}</span>
                          </div>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm"
                            onClick={increaseGuests}
                            disabled={guestCount >= activity.max_participants}
                          >
                            <PlusCircle className="h-5 w-5" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Capacidade: {activity.min_participants} - {activity.max_participants} pessoas
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  {/* Informações de Contato */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Informações de contato</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Nome completo</label>
                        <Input 
                          value={contactName} 
                          onChange={(e) => setContactName(e.target.value)} 
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">E-mail</label>
                        <Input 
                          type="email" 
                          value={contactEmail} 
                          onChange={(e) => setContactEmail(e.target.value)} 
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Telefone</label>
                        <Input 
                          value={contactPhone} 
                          onChange={(e) => setContactPhone(e.target.value)} 
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm text-gray-600 mb-2">Requisitos especiais ou comentários</label>
                    <Textarea
                      placeholder="Informe quaisquer requisitos especiais, alergias ou observações importantes..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="button"
                      variant="outline" 
                      className="mr-2"
                      onClick={() => navigate(`/atividades/${id}`)}
                      disabled={isSubmitting}
                    >
                      Voltar
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !selectedDate}
                    >
                      {isSubmitting ? "Processando..." : "Confirmar reserva"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Resumo da Atividade */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-bold mb-4">Resumo da atividade</h2>
                
                <div className="mb-4">
                  <img 
                    src={activity.image_url} 
                    alt={activity.title}
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                  <h3 className="font-bold text-lg">{activity.title}</h3>
                  <Badge variant="outline" className="mt-1">{activity.category}</Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">{activity.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">{activity.meeting_point || "Local designado"}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Preço por pessoa</span>
                    <span>{formatCurrency(activity.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Número de pessoas</span>
                    <span>x {guestCount}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(activity.price * guestCount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ActivityBooking;
