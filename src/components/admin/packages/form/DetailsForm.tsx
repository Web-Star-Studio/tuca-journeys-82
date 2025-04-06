
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { PackageFormValues } from "../types";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import { IncludesFieldArray, ExcludesFieldArray } from "@/hooks/packages/usePackageForm";

interface DetailsFormProps {
  form: UseFormReturn<PackageFormValues>;
  includesArray: IncludesFieldArray;
  excludesArray: ExcludesFieldArray;
}

const DetailsForm = ({ form, includesArray, excludesArray }: DetailsFormProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">O que Inclui</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => includesArray.append({ title: "" })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Item
          </Button>
        </div>
        
        <div className="space-y-3">
          {includesArray.fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <FormField
                control={form.control}
                name={`includes.${index}.title`}
                render={({ field }) => (
                  <FormItem className="flex-1 mb-0">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Item incluído no pacote"
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
                onClick={() => includesArray.remove(index)}
                disabled={includesArray.fields.length <= 1}
                className="h-10 w-10 text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">O que Não Inclui</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => excludesArray.append({ title: "" })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Item
          </Button>
        </div>
        
        <div className="space-y-3">
          {excludesArray.fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <FormField
                control={form.control}
                name={`excludes.${index}.title`}
                render={({ field }) => (
                  <FormItem className="flex-1 mb-0">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Item não incluído no pacote"
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
                onClick={() => excludesArray.remove(index)}
                disabled={excludesArray.fields.length <= 1}
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

export default DetailsForm;
