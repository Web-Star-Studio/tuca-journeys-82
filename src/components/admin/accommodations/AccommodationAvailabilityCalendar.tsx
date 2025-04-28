
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Save } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { useAccommodationAvailability } from '@/hooks/use-accommodations';

interface AccommodationAvailabilityCalendarProps {
  accommodationId?: number;
}

const AccommodationAvailabilityCalendar: React.FC<AccommodationAvailabilityCalendarProps> = ({ accommodationId }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [customPrice, setCustomPrice] = useState<string>('');
  const [status, setStatus] = useState<'available' | 'unavailable'>('available');

  const { 
    availability,
    isLoading, 
    updateBulkAvailability, 
    isUpdating
  } = useAccommodationAvailability(accommodationId);

  const handleSave = () => {
    if (!dateRange?.from) {
      return;
    }

    // Gere um array de datas com base no intervalo selecionado
    const dates: Date[] = [];
    const currentDate = new Date(dateRange.from);
    const endDate = dateRange.to || dateRange.from;

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Atualize a disponibilidade em lote
    updateBulkAvailability({
      dates,
      customPrice: customPrice ? parseFloat(customPrice) : undefined,
      status
    });

    // Feche o diálogo
    setDialogOpen(false);
  };

  // Formatação para exibir informações de disponibilidade no calendário
  const getDayContent = (day: Date) => {
    const dateString = day.toISOString().split('T')[0];
    const dayAvailability = availability?.find(a => a.date === dateString);
    
    if (dayAvailability) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className={`text-xs font-medium ${dayAvailability.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>
            {dayAvailability.status === 'available' ? 'Disponível' : 'Indisponível'}
          </div>
          {dayAvailability.custom_price && (
            <div className="text-xs font-bold mt-0.5">
              R$ {dayAvailability.custom_price}
            </div>
          )}
        </div>
      );
    }
    
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          <span>Disponibilidade da Hospedagem</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tuca-ocean-blue"></div>
          </div>
        ) : (
          <>
            <Calendar 
              mode="range" 
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              disabled={{ before: new Date() }}
              modifiersClassNames={{
                selected: 'bg-tuca-ocean-blue text-white',
                today: 'bg-tuca-light-blue text-tuca-deep-blue',
              }}
              components={{
                DayContent: ({ date }) => getDayContent(date),
              }}
            />
            
            <div className="mt-6">
              <Button 
                onClick={() => setDialogOpen(true)} 
                className="w-full"
                disabled={!accommodationId}
              >
                Definir Disponibilidade
              </Button>
            </div>
          </>
        )}
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Definir Disponibilidade</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={status} 
                onValueChange={(value: 'available' | 'unavailable') => setStatus(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Disponível</SelectItem>
                  <SelectItem value="unavailable">Indisponível</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {status === 'available' && (
              <div className="space-y-2">
                <Label htmlFor="customPrice">
                  Preço Personalizado (Opcional)
                </Label>
                <Input
                  id="customPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  placeholder="Deixe em branco para usar o preço padrão"
                />
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <Button onClick={handleSave} disabled={isUpdating || !dateRange?.from}>
                {isUpdating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AccommodationAvailabilityCalendar;
