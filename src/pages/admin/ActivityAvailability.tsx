
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useActivityAvailability } from "@/hooks/activities";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar, AlertCircle, Check } from "lucide-react";

const ActivityAvailability: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const activityId = id ? parseInt(id) : undefined;
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [availableSpots, setAvailableSpots] = useState<number>(10);
  const [customPrice, setCustomPrice] = useState<string>("");
  
  const { 
    availability,
    isLoading,
    updateAvailability,
    isUpdating
  } = activityId ? useActivityAvailability(activityId) : { 
    availability: undefined, 
    isLoading: false, 
    updateAvailability: () => {}, 
    isUpdating: false 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !activityId) return;
    
    updateAvailability({
      date: selectedDate,
      availableSpots,
      customPrice: customPrice ? parseFloat(customPrice) : undefined,
      status: 'available'
    });
  };

  return (
    <AdminLayout pageTitle="Gerenciar Disponibilidade de Atividades">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Disponibilidade de Atividades</h2>
          <p className="text-muted-foreground">
            Gerencie a disponibilidade e preços especiais para datas específicas
          </p>
        </div>

        {!activityId ? (
          <div className="bg-amber-50 p-4 rounded-md border border-amber-200 flex items-center">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
            <p className="text-amber-800">
              Selecione uma atividade para gerenciar sua disponibilidade.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Definir disponibilidade</CardTitle>
                <CardDescription>
                  Ajuste a disponibilidade de vagas para uma data específica
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Data</Label>
                    <DatePicker 
                      date={selectedDate} 
                      onSelect={setSelectedDate} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="spots">Vagas disponíveis</Label>
                    <Input 
                      id="spots"
                      type="number" 
                      value={availableSpots}
                      onChange={(e) => setAvailableSpots(parseInt(e.target.value))}
                      min={0}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço especial (opcional)</Label>
                    <Input 
                      id="price"
                      type="number" 
                      value={customPrice}
                      onChange={(e) => setCustomPrice(e.target.value)}
                      placeholder="Deixe em branco para usar o preço padrão"
                    />
                  </div>
                  
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? "Salvando..." : "Salvar disponibilidade"}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Datas configuradas</CardTitle>
                <CardDescription>
                  Visualize as datas com configurações especiais
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-center py-8 text-muted-foreground">Carregando...</p>
                ) : availability && availability.length > 0 ? (
                  <div className="space-y-2">
                    {availability.map((item: any) => (
                      <div key={item.id} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{new Date(item.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span>{item.available_spots} vagas</span>
                          {item.custom_price && (
                            <span className="text-green-600">
                              R$ {item.custom_price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Nenhuma configuração de disponibilidade encontrada.</p>
                    <p className="text-sm">Configure datas específicas usando o formulário ao lado.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ActivityAvailability;
