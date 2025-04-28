
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const TravelPreferences = () => {
  const [priceRange, setPriceRange] = useState([1000, 5000]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Preferências de Viagem</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 lg:col-span-2">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Tipos de Experiência</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="aventura" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="aventura" className="font-medium">Aventura</Label>
                      <p className="text-sm text-gray-500">Trilhas, rapel, mergulho</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="relaxamento" defaultChecked />
                    <div className="grid gap-1.5">
                      <Label htmlFor="relaxamento" className="font-medium">Relaxamento</Label>
                      <p className="text-sm text-gray-500">Praias, spas, piscinas</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="cultural" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="cultural" className="font-medium">Cultural</Label>
                      <p className="text-sm text-gray-500">Museus, história, culinária</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="natureza" defaultChecked />
                    <div className="grid gap-1.5">
                      <Label htmlFor="natureza" className="font-medium">Natureza</Label>
                      <p className="text-sm text-gray-500">Parques, vida selvagem, florestas</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="gastronomia" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="gastronomia" className="font-medium">Gastronomia</Label>
                      <p className="text-sm text-gray-500">Restaurantes, vinícolas, tours culinários</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="festas" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="festas" className="font-medium">Vida Noturna</Label>
                      <p className="text-sm text-gray-500">Bares, clubes, entretenimento</p>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mb-4">Estilo de Acomodação</h2>
                <RadioGroup defaultValue="conforto" className="mb-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="economico" id="economico" />
                    <Label htmlFor="economico">Econômico (Hostels, pousadas simples)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="conforto" id="conforto" />
                    <Label htmlFor="conforto">Confortável (Hotéis 3-4 estrelas)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="luxo" id="luxo" />
                    <Label htmlFor="luxo">Luxuoso (Resorts, hotéis 5 estrelas)</Label>
                  </div>
                </RadioGroup>
                
                <h2 className="text-xl font-semibold mb-4">Faixa de Preço</h2>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span>R$ {priceRange[0]}</span>
                    <span>R$ {priceRange[1]}</span>
                  </div>
                  <Slider 
                    defaultValue={priceRange} 
                    max={10000} 
                    step={100}
                    minStepsBetweenThumbs={5}
                    onValueChange={(values) => setPriceRange(values)}
                  />
                  <p className="text-sm text-gray-500 mt-2">Faixa de preço por pessoa para pacotes de viagem</p>
                </div>
                
                <h2 className="text-xl font-semibold mb-4">Preferências Adicionais</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="wi-fi" defaultChecked />
                    <Label htmlFor="wi-fi">Wi-Fi gratuito</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cafe" defaultChecked />
                    <Label htmlFor="cafe">Café da manhã incluso</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="transporte" />
                    <Label htmlFor="transporte">Transporte do aeroporto</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="pets" />
                    <Label htmlFor="pets">Aceita animais</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ac" defaultChecked />
                    <Label htmlFor="ac">Ar-condicionado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="piscina" />
                    <Label htmlFor="piscina">Piscina</Label>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Salvar Preferências</Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Por que isto é importante?</h3>
                  <p className="text-gray-600">
                    Ao nos informar suas preferências de viagem, podemos recomendar os melhores pacotes, tours e acomodações que correspondem ao seu estilo de viagem ideal.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Recomendações Personalizadas</h3>
                  <p className="text-gray-600 mb-4">
                    Com base nas suas preferências, apresentaremos opções de viagem que se alinham às suas expectativas e desejos.
                  </p>
                  <Button variant="outline" className="w-full">
                    Ver Recomendações
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TravelPreferences;
