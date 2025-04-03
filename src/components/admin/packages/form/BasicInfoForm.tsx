
import React, { useEffect } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SafeImage from "@/components/ui/safe-image";
import { UseFormReturn } from "react-hook-form";
import { PackageFormValues } from "../types";

interface BasicInfoFormProps {
  form: UseFormReturn<PackageFormValues>;
  previewUrl: string;
}

const BasicInfoForm = ({ form, previewUrl }: BasicInfoFormProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título do Pacote</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Escapada Romântica" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Descreva o pacote de viagem"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                    placeholder="0.00"
                    step="0.01"
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
                    step="0.1"
                    min="0"
                    max="5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="romantic">Romântico</SelectItem>
                  <SelectItem value="adventure">Aventura</SelectItem>
                  <SelectItem value="family">Família</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="budget">Econômico</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da Imagem</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://example.com/image.jpg" />
              </FormControl>
              <FormDescription>
                Informe a URL da imagem principal do pacote
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4 border rounded-md overflow-hidden bg-gray-50 aspect-video flex items-center justify-center">
          {previewUrl ? (
            <SafeImage
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              fallbackSrc="/placeholder.svg"
            />
          ) : (
            <div className="text-gray-400 text-center p-4">
              <p>Pré-visualização da imagem</p>
              <p className="text-sm">Informe uma URL válida para ver a imagem aqui</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;
