
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ActivityFormValues } from "./ActivityForm";

interface ActivityScheduleFormProps {
  form: UseFormReturn<ActivityFormValues>;
}

const ActivityScheduleForm: React.FC<ActivityScheduleFormProps> = ({
  form,
}) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="schedule"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cronograma (uma etapa por linha)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="09:00 - Encontro no ponto de partida
10:00 - Início da trilha
12:00 - Almoço
15:00 - Retorno" 
                {...field}
                rows={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="includes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>O que está incluído (um item por linha)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Transporte
Guia local
Equipamentos de segurança
Lanche" 
                {...field}
                rows={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="excludes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>O que não está incluído (um item por linha)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Refeições principais
Bebidas alcoólicas
Gorjetas" 
                {...field}
                rows={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Observações importantes (um item por linha)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Traga protetor solar
Use roupas adequadas para caminhada
Atividade não recomendada para pessoas com mobilidade reduzida" 
                {...field}
                rows={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ActivityScheduleForm;
