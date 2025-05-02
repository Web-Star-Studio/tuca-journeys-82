
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';
import type { RestaurantTable } from '@/types/restaurant';

interface TableFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  table: RestaurantTable | null;
  restaurantId: number;
  onSave: (data: any) => void;
}

const formSchema = z.object({
  table_number: z.string().min(1, { message: "Número da mesa é obrigatório" }),
  capacity: z.coerce.number().min(1, { message: "Capacidade deve ser pelo menos 1" }),
  location: z.string().min(1, { message: "Localização é obrigatória" }),
  is_active: z.boolean().default(true),
});

const locationOptions = [
  { value: 'indoor', label: 'Interno' },
  { value: 'outdoor', label: 'Externo' },
  { value: 'terrace', label: 'Terraço' },
  { value: 'window', label: 'Janela' },
  { value: 'bar', label: 'Bar' },
  { value: 'private', label: 'Área Privativa' }
];

const TableFormDialog: React.FC<TableFormDialogProps> = ({
  isOpen,
  onOpenChange,
  table,
  restaurantId,
  onSave
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      table_number: table?.table_number || "",
      capacity: table?.capacity || 2,
      location: table?.location || "indoor",
      is_active: table?.is_active ?? true,
    }
  });
  
  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (table) {
      // Update existing table
      onSave({ 
        id: table.id, 
        table: values 
      });
    } else {
      // Create new table
      onSave({
        ...values,
        restaurant_id: restaurantId
      });
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {table ? 'Editar Mesa' : 'Adicionar Nova Mesa'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="table_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número/Identificação da Mesa</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Mesa 1, A12, VIP 3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacidade (lugares)</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a localização" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locationOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Mesa Disponível</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <DialogFooter className="mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {table ? 'Salvar Alterações' : 'Adicionar Mesa'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TableFormDialog;
