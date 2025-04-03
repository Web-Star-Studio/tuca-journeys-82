
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
import { TourFormValues } from "../TourFormTypes";

interface TourScheduleFormProps {
  form: UseFormReturn<TourFormValues>;
}

const TourScheduleForm: React.FC<TourScheduleFormProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="schedule"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cronograma (uma linha por item)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="09:00 - Saída do hotel&#10;10:00 - Chegada ao local&#10;..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Detalhe o cronograma do passeio. Cada linha será um item.
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
              <FormLabel>Incluso (uma linha por item)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Transporte&#10;Guia&#10;Almoço&#10;..."
                  className="min-h-[100px]"
                  {...field}
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
              <FormLabel>Não Incluso (uma linha por item)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Bebidas&#10;Taxa de conservação&#10;..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
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
            <FormLabel>Observações (uma linha por item)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Protetor solar&#10;Roupas leves&#10;Calçado adequado&#10;..."
                className="min-h-[80px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TourScheduleForm;
