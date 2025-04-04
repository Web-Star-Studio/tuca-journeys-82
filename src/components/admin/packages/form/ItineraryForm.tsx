
import React from "react";
import { UseFormReturn, UseFieldArrayReturn } from "react-hook-form";
import { PackageFormValues } from "../types";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

interface ItineraryFormProps {
  form: UseFormReturn<PackageFormValues>;
  itineraryArray: UseFieldArrayReturn<PackageFormValues, "itinerary">;
}

const ItineraryForm = ({ form, itineraryArray }: ItineraryFormProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Itinerário</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const nextDay = itineraryArray.fields.length + 1;
            itineraryArray.append({
              day: nextDay,
              title: "",
              description: "",
            });
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Dia
        </Button>
      </div>

      <div className="space-y-6">
        {itineraryArray.fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-md bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Dia {index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => itineraryArray.remove(index)}
                disabled={itineraryArray.fields.length <= 1}
                className="text-red-500 h-8"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remover
              </Button>
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name={`itinerary.${index}.day`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dia</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="1"
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          field.onChange(value || 1);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`itinerary.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título do Dia</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Chegada a Fernando de Noronha"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`itinerary.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição das Atividades</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Descreva as atividades do dia"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryForm;
