
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import SafeImage from "@/components/ui/safe-image";
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
            <FormMessage />
          </FormItem>
        )}
      />

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-video w-full overflow-hidden">
            <SafeImage
              src={previewUrl || "/placeholder.svg"}
              alt="Imagem do pacote"
              className="w-full h-full object-cover transition-opacity"
              fallbackSrc="/placeholder.svg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImagePreview;
