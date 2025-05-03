
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useActivity } from "@/hooks/activities";
import { useActivityAvailability } from "@/hooks/activities/use-activity-availability";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { ActivityAvailability as ActivityAvailabilityType } from "@/types/activity";

const ActivityAvailability = () => {
  const { id } = useParams<{ id: string }>();
  const activityId = id ? parseInt(id) : undefined;
  
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [spots, setSpots] = useState<number>(10);
  const [customPrice, setCustomPrice] = useState<string>("");

  const { activity, isLoading: isActivityLoading } = useActivity(activityId);
  const { 
    availability, 
    isLoading: isAvailabilityLoading,
    updateAvailability,
    bulkUpdateAvailability,
    isUpdating
  } = useActivityAvailability(activityId);

  const handleBulkUpdate = async () => {
    if (!activityId || !selectedDates.length) return;
    
    await bulkUpdateAvailability({
      activityId,
      dates: selectedDates,
      availableSpots: spots,
      customPrice: customPrice ? parseFloat(customPrice) : undefined,
      status: 'available'
    });
    
    setSelectedDates([]);
  };

  const getDateAvailability = (date: Date): ActivityAvailabilityType | undefined => {
    if (!availability) return undefined;
    const dateStr = format(date, 'yyyy-MM-dd');
    return availability.find(a => a.date === dateStr);
  };

  // Custom renderer for calendar dates to show availability
  const renderDay = (date: Date) => {
    const dateAvailability = getDateAvailability(date);
    
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {date.getDate()}
        {dateAvailability && (
          <span 
            className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 rounded-full ${
              dateAvailability.status === 'available' ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
        )}
        {selectedDates.some(d => 
          d.getDate() === date.getDate() && 
          d.getMonth() === date.getMonth() && 
          d.getFullYear() === date.getFullYear()
        ) && (
          <div className="absolute inset-0 border-2 border-tuca-ocean-blue rounded-md pointer-events-none" />
        )}
      </div>
    );
  };

  const isLoading = isActivityLoading || isAvailabilityLoading;

  if (isLoading) {
    return (
      <AdminLayout pageTitle="Carregando...">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
        </div>
      </AdminLayout>
    );
  }

  if (!activity) {
    return (
      <AdminLayout pageTitle="Atividade não encontrada">
        <div className="p-6 bg-red-50 text-red-800 rounded-md">
          A atividade solicitada não foi encontrada.
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout pageTitle={`Disponibilidade: ${activity.title}`}>
      <div className="mb-6">
        <Button variant="outline" className="mb-4" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5" />
              Calendário de Disponibilidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-sm text-muted-foreground">
              Selecione uma ou mais datas para definir a disponibilidade.
            </div>
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={setSelectedDates}
              className="border rounded-md p-3"
              components={{
                Day: ({ date, ...props }) => (
                  <button {...props}>
                    {renderDay(date)}
                  </button>
                ),
              }}
              disabled={{ before: new Date() }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurar Disponibilidade</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDates.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Selecione datas no calendário para configurar sua disponibilidade
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Datas selecionadas:</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedDates.map((date, index) => (
                      <div key={index} className="bg-tuca-light-blue/20 px-2 py-1 rounded text-sm">
                        {format(date, 'dd/MM/yyyy')}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="spots">Vagas disponíveis</Label>
                  <Input
                    id="spots"
                    type="number"
                    value={spots}
                    onChange={(e) => setSpots(parseInt(e.target.value) || 0)}
                    min={0}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">
                    Preço personalizado (opcional)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">R$</span>
                    <Input
                      id="price"
                      type="text"
                      value={customPrice}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9,.]/g, '');
                        setCustomPrice(value);
                      }}
                      className="pl-8"
                      placeholder={`${activity.price?.toLocaleString('pt-BR') || '0,00'}`}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Deixe em branco para usar o preço padrão da atividade (R$ {activity.price?.toLocaleString('pt-BR') || '0,00'})
                  </p>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleBulkUpdate}
                  disabled={isUpdating || selectedDates.length === 0}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Atualizando...
                    </>
                  ) : (
                    <>
                      {selectedDates.length > 1 ? 'Atualizar todas as datas selecionadas' : 'Atualizar data'}
                    </>
                  )}
                </Button>
              </div>
            )}

            <div className="mt-8 pt-4 border-t">
              <h3 className="font-medium mb-2">Legenda</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span>Com disponibilidade</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                  <span>Sem disponibilidade</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-tuca-ocean-blue rounded-md mr-2"></div>
                  <span>Selecionada para edição</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ActivityAvailability;
