
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ActivityFormValues } from "../../../components/admin/activity/ActivityForm";

interface ActivityScheduleFormProps {
  form: UseFormReturn<ActivityFormValues>;
}

const ActivityScheduleForm: React.FC<ActivityScheduleFormProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="schedule"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cronograma</FormLabel>
            <FormControl>
              <Textarea
                placeholder="09:00 - Encontro no ponto de partida
10:00 - Início do passeio
12:00 - Parada para almoço
15:00 - Retorno"
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Adicione uma linha para cada item do cronograma.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="includes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>O que está incluído</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Guia turístico
Equipamentos
Lanche"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Adicione uma linha para cada item incluído.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="excludes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>O que não está incluído</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Bebidas alcoólicas
Despesas pessoais
Transporte até o ponto de encontro"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Adicione uma linha para cada item não incluído.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Observações importantes</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Usar roupas confortáveis
Levar protetor solar
Hidratação recomendada"
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Adicione uma linha para cada observação importante.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ActivityScheduleForm;
