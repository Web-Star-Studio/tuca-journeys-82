
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { PackageFormValues } from "../../types";

interface CategorySelectProps {
  form: UseFormReturn<PackageFormValues>;
}

const CategorySelect = ({ form }: CategorySelectProps) => {
  const categories = [
    { value: "romantic", label: "Romântico" },
    { value: "adventure", label: "Aventura" },
    { value: "family", label: "Família" },
    { value: "premium", label: "Premium" },
    { value: "budget", label: "Econômico" },
  ];

  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Categoria</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CategorySelect;
