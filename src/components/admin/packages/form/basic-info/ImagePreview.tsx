
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SafeImage from "@/components/ui/safe-image";
import { UseFormReturn } from "react-hook-form";
import { PackageFormValues } from "../../types";

interface ImagePreviewProps {
  form: UseFormReturn<PackageFormValues>;
  previewUrl: string;
}

const ImagePreview = ({ form, previewUrl }: ImagePreviewProps) => {
  return (
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
  );
};

export default ImagePreview;
