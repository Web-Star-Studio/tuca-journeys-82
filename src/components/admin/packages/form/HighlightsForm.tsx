
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { PackageFormValues } from "../types";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

interface HighlightsFormProps {
  form: UseFormReturn<PackageFormValues>;
  highlightsArray: {
    fields: Array<{ id: string }>;
    append: (value: string) => void;
    remove: (index: number) => void;
  };
  datesArray: {
    fields: Array<{ id: string }>;
    append: (value: string) => void;
    remove: (index: number) => void;
  };
}

const HighlightsForm = ({ form, highlightsArray, datesArray }: HighlightsFormProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Destaques</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => highlightsArray.append("")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Destaque
          </Button>
        </div>

        <div className="space-y-3">
          {highlightsArray.fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <FormField
                control={form.control}
                name={`highlights.${index}`}
                render={({ field }) => (
                  <FormItem className="flex-1 mb-0">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Destaque do pacote"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => highlightsArray.remove(index)}
                disabled={highlightsArray.fields.length <= 1}
                className="h-10 w-10 text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Datas Disponíveis</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => datesArray.append("")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Data
          </Button>
        </div>

        <div className="space-y-3">
          {datesArray.fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <FormField
                control={form.control}
                name={`dates.${index}`}
                render={({ field }) => (
                  <FormItem className="flex-1 mb-0">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Data disponível"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => datesArray.remove(index)}
                disabled={datesArray.fields.length <= 1}
                className="h-10 w-10 text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighlightsForm;
