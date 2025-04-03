
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { PackageFormValues } from "../../types";

interface PriceRatingInputsProps {
  form: UseFormReturn<PackageFormValues>;
}

const PriceRatingInputs = ({ form }: PriceRatingInputsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preço (R$)</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                type="number" 
                placeholder="1000" 
                min="0"
                step="0.01"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="rating"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Avaliação (0-5)</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                type="number" 
                placeholder="4.5" 
                min="0" 
                max="5" 
                step="0.1"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PriceRatingInputs;
