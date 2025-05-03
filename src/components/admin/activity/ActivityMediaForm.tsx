
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ActivityFormValues } from "./ActivityForm";

interface ActivityMediaFormProps {
  form: UseFormReturn<ActivityFormValues>;
  previewUrl?: string;
}

const ActivityMediaForm: React.FC<ActivityMediaFormProps> = ({
  form,
  previewUrl = "",
}) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="image_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Imagem principal</FormLabel>
            <FormControl>
              <Input placeholder="https://example.com/image.jpg" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {previewUrl && (
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.jpg";
            }}
          />
        </div>
      )}

      <FormField
        control={form.control}
        name="gallery_images"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Galeria de imagens (URLs separadas por vírgula)</FormLabel>
            <FormControl>
              <Input 
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" 
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

export default ActivityMediaForm;
