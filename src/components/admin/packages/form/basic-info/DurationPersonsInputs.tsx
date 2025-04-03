
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

interface DurationPersonsInputsProps {
  form: UseFormReturn<PackageFormValues>;
}

const DurationPersonsInputs = ({ form }: DurationPersonsInputsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="days"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Duração (dias)</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                placeholder="3"
                min="1"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="persons"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pessoas</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                placeholder="2"
                min="1"
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

export default DurationPersonsInputs;
