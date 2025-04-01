
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar, Clock, MapPin, Star, Users, CheckCircle, XCircle, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import { tours } from "@/data/tours";

const TourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [participants, setParticipants] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");

  const tour = tours.find((tour) => tour.id === Number(id));

  if (!tour) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12 mt-16">
          <div className="text-center py-16">
            <h1 className="text-3xl font-serif font-bold mb-4">Passeio não encontrado</h1>
            <p className="text-gray-600 mb-8">O passeio que você está procurando não existe ou foi removido.</p>
            <Button 
              onClick={() => navigate("/passeios")}
              className="bg-tuca-ocean-blue hover:bg-tuca-deep-blue text-white"
            >
              Voltar para Passeios
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) {
      toast({
        title: "Atenção",
        description: "Por favor, selecione uma data para o passeio.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Reserva realizada com sucesso!",
      description: `Seu passeio "${tour.title}" foi reservado para ${selectedDate} com ${participants} ${participants > 1 ? 'pessoas' : 'pessoa'}.`,
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mt-16">
        {/* Hero image */}
        <div className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${tour.image})` }}>
          <div className="absolute inset-0 bg-black/30 flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-lg inline-block">
                <h1 className="text-2xl md:text-4xl font-serif font-bold text-gray-900">{tour.title}</h1>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{tour.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{tour.duration}</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{tour.rating}/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tour info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-bold mb-4">Sobre este passeio</h2>
                <p className="text-gray-700">{tour.description}</p>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-serif font-bold mb-4">O que está incluído</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Incluso:</h4>
                    <ul className="space-y-2">
                      {tour.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Não incluso:</h4>
                    <ul className="space-y-2">
                      {tour.exclusions.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <XCircle className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-serif font-bold mb-4">Cronograma</h3>
                <ul className="space-y-3">
                  {tour.schedule.map((item, index) => (
                    <li key={index} className="flex items-start border-b pb-3 last:border-0">
                      <Clock className="h-5 w-5 text-tuca-ocean-blue mr-2 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-serif font-bold mb-4">Informações importantes</h3>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-lg font-medium text-blue-600 mb-2">O que levar e requisitos</h4>
                      <ul className="list-disc list-inside space-y-1 text-blue-700">
                        {tour.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <Accordion type="single" collapsible>
                <AccordionItem value="cancelation">
                  <AccordionTrigger>Política de Cancelamento</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                      <li>Cancelamento gratuito até 48 horas antes do passeio.</li>
                      <li>Cancelamentos com menos de 48 horas de antecedência não são reembolsáveis.</li>
                      <li>Em caso de condições climáticas adversas, o passeio pode ser remarcado sem custo adicional.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="accessibility">
                  <AccordionTrigger>Acessibilidade</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Nossa empresa se esforça para tornar os passeios acessíveis a todos os visitantes.</p>
                    <p>Por favor, entre em contato conosco antecipadamente para discutir suas necessidades específicas de acessibilidade.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Booking form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-serif font-bold mb-4">Reserve este passeio</h3>
                <div className="flex items-center justify-between mb-6 bg-gray-50 p-4 rounded">
                  <div>
                    <span className="text-gray-500 text-sm">Preço por pessoa</span>
                    <div className="text-2xl font-bold text-gray-900">
                      R$ {tour.price.toLocaleString('pt-BR')}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="ml-1 font-medium">{tour.rating}</span>
                  </div>
                </div>

                <form onSubmit={handleReservation}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="date">Data do passeio</Label>
                      <Input 
                        id="date" 
                        type="date" 
                        min={new Date().toISOString().split('T')[0]}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="participants">Quantidade de pessoas</Label>
                      <div className="flex items-center space-x-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => setParticipants(Math.max(1, participants - 1))}
                        >
                          -
                        </Button>
                        <div className="flex-1 text-center">
                          <Input 
                            id="participants" 
                            type="number" 
                            min="1" 
                            max={tour.maxParticipants}
                            value={participants} 
                            onChange={(e) => setParticipants(Number(e.target.value))}
                            className="text-center" 
                          />
                        </div>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => setParticipants(Math.min(tour.maxParticipants, participants + 1))}
                        >
                          +
                        </Button>
                      </div>
                      <div className="mt-1 text-sm text-gray-500 flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>Máximo de {tour.maxParticipants} pessoas</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded space-y-2">
                      <div className="flex justify-between">
                        <span>Preço unitário</span>
                        <span>R$ {tour.price.toLocaleString('pt-BR')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Número de pessoas</span>
                        <span>{participants}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>R$ {(tour.price * participants).toLocaleString('pt-BR')}</span>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-tuca-coral hover:bg-tuca-coral/90 text-white"
                    >
                      Reservar agora
                    </Button>
                  </div>
                </form>

                <div className="mt-4 text-center text-sm text-gray-500">
                  Sem compromisso - Cancelamento gratuito até 48h antes
                </div>
              </div>
            </div>
          </div>
        </div>

        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default TourDetail;
