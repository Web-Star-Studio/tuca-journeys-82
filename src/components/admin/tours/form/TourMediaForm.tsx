
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { TourFormValues } from "../TourFormTypes";

interface TourMediaFormProps {
  form: UseFormReturn<TourFormValues>;
  previewUrl: string;
  setPreviewUrl: (url: string) => void;
}

const TourMediaForm: React.FC<TourMediaFormProps> = ({
  form,
  previewUrl,
  setPreviewUrl,
}) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="image_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL da Imagem Principal</FormLabel>
            <FormControl>
              <Input placeholder="URL da imagem principal" {...field} />
            </FormControl>
            <FormMessage />
            {previewUrl && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground mb-1">Preview:</p>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="rounded-md h-40 object-cover"
                  onError={() => setPreviewUrl("")}
                />
              </div>
            )}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gallery_images"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Galeria de Imagens (URLs separadas por vírgula)</FormLabel>
            <FormControl>
              <Input
                placeholder="/imagem1.jpg, /imagem2.jpg, /imagem3.jpg"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Lista de imagens adicionais para a galeria do passeio
            </FormDescription>
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
                type="number"
                step="0.1"
                min="0"
                max="5"
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

export default TourMediaForm;
